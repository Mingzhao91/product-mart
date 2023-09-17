import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { CartStore } from './cart-store';
import { Product } from '@core/products/product';
import { CartItem } from './cart-item';

export const ALLOWED_PRODUCT_QUANTITIES = Array.from(
  { length: 30 },
  (el, idx) => idx + 1
);

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cartStore: CartStore) {}

  addToCart(product: Product, quantity: number) {
    const cartItemToAdd = {
      ...product,
      quantity,
      itemTotal: product.price * quantity,
    };
    this.cartStore.addCartItem(cartItemToAdd);
    return of(cartItemToAdd);
  }

  updateCart(cartItemToUpdate: CartItem) {
    cartItemToUpdate = {
      ...cartItemToUpdate,
      itemTotal: cartItemToUpdate.price * cartItemToUpdate.quantity,
    };

    this.cartStore.updateCartItem(cartItemToUpdate);

    return of(cartItemToUpdate);
  }

  removeCartItem(itemToRemove: CartItem) {
    this.cartStore.removeCartItem(itemToRemove);

    return of(itemToRemove);
  }

  clearCart() {
    this.cartStore.clearCart();
  }
}
