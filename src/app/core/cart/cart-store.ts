import { Injectable } from '@angular/core';
import { Store } from '@core/store';

import { CartState, initialState } from './cart-state';
import { CartItem } from './cart-item';

@Injectable({ providedIn: 'root' })
export class CartStore extends Store<CartState> {
  constructor() {
    super(initialState);
  }

  addCartItem(cartItemToAdd: CartItem) {
    const newState: CartState = {
      ...this.state,
      cartItems: [...this.state.cartItems, cartItemToAdd],
    };

    this.setState(newState);
  }

  clearCart() {
    const newState: CartState = initialState;
    this.setState(newState);
  }

  restoreCart(stateToRestore: CartState) {
    this.setState(stateToRestore);
  }

  removeCartItem(cartItemToRemove: CartItem) {
    const newState: CartState = {
      ...this.state,
      cartItems: this.state.cartItems.filter(
        (cartItem) => cartItem.id !== cartItemToRemove.id
      ),
    };

    this.setState(newState);
  }

  updateCartItem(cartItemToUpdate: CartItem) {
    const newState: CartState = {
      ...this.state,
      cartItems: this.state.cartItems.map((cartItem) =>
        cartItem.id === cartItemToUpdate.id ? cartItemToUpdate : cartItem
      ),
    };

    this.setState(newState);
  }
}
