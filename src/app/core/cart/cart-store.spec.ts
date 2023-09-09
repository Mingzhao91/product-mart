import { TestBed } from '@angular/core/testing';

import { CartStore } from './cart-store';
import { CartState, initialState } from './cart-state';
import { CartItem } from './cart-item';

describe('CartStore', () => {
  let cartStore: CartStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStore],
    });

    cartStore = TestBed.inject(CartStore);
  });

  it('should create an instance', () => {
    expect(cartStore).toBeTruthy();
  });

  it('can add item into cart state', () => {
    const currentState = initialState;
    expect(currentState.cartItems.length).toBe(0);

    const cartItem: CartItem = {
      productId: 1,
      name: 'apple',
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
    };

    cartStore.addCartItem(cartItem);

    const expectedState: CartState = {
      cartItems: [cartItem],
    };

    expect(cartStore.state).toEqual(expectedState);
  });

  it('can clear cart', () => {
    const cartItem: CartItem = {
      productId: 1,
      name: 'apple',
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
    };
    cartStore.addCartItem(cartItem);

    const currentState: CartState = {
      cartItems: [cartItem],
    };

    expect(cartStore.state).toEqual(currentState);

    cartStore.clearCart();

    expect(cartStore.state).toEqual(initialState);
  });

  it('can restore cart', () => {
    const currentState = initialState;

    expect(cartStore.state).toEqual(currentState);

    const cartItem: CartItem = {
      productId: 1,
      name: 'apple',
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
    };
    cartStore.addCartItem(cartItem);

    const expectedState: CartState = {
      cartItems: [cartItem],
    };

    cartStore.restoreCart(expectedState);

    expect(cartStore.state).toEqual(expectedState);
  });

  it('can remove cart item', () => {
    const cartItem1: CartItem = {
      productId: 1,
      name: 'apple',
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
    };

    const cartItem2: CartItem = {
      productId: 2,
      name: 'orange',
      imgUrl: 'img/orange',
      price: 5,
      quantity: 2,
      itemTotal: 10,
    };

    const currentState: CartState = {
      cartItems: [cartItem1, cartItem2],
    };

    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);

    cartStore.removeCartItem(cartItem1);

    const expectedState: CartState = {
      cartItems: [cartItem2],
    };

    expect(cartStore.state).toEqual(expectedState);
  });

  it('can update cart item', () => {
    const cartItem1: CartItem = {
      productId: 1,
      name: 'apple',
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
    };

    const cartItem2: CartItem = {
      productId: 2,
      name: 'orange',
      imgUrl: 'img/orange',
      price: 5,
      quantity: 2,
      itemTotal: 10,
    };

    const currentState: CartState = {
      cartItems: [cartItem1, cartItem2],
    };

    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);

    const cartItemToUpdate: CartItem = {
      productId: 2,
      name: 'orange',
      imgUrl: 'img/orange',
      price: 5,
      quantity: 8,
      itemTotal: 40,
    };
    cartStore.updateCartItem(cartItemToUpdate);

    const expectedState: CartState = {
      cartItems: [cartItem1, cartItemToUpdate],
    };

    expect(cartStore.state).toEqual(expectedState);
  });
});
