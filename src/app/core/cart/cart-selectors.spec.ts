import { CartItem } from './cart-item';
import { getCartItemsCount, getIsItemAlreadyInCart } from './cart-selector';
import { CartState } from './cart-state';

const given = beforeEach;
const when = beforeEach;
const then = it;

describe('Cart Store Selectors', () => {
  describe('Get Cart Items Count', () => {
    let cartState: CartState;
    let result: number;

    given(() => {
      const tenApples: CartItem = {
        id: 1,
        quantity: 10,
        imgUrl: 'img/apple',
        itemTotal: 20,
        name: 'apple',
        price: 2,
      };

      const fiveOranges: CartItem = {
        id: 2,
        quantity: 5,
        imgUrl: 'img/orange',
        itemTotal: 20,
        name: 'orange',
        price: 2,
      };

      cartState = {
        cartItems: [tenApples, fiveOranges],
      };
    });
    when(() => {
      result = getCartItemsCount(cartState);
    });
    then('I can see my total cart items count', () => {
      expect(result).toBe(15);
    });
  });

  it('can find cart item', () => {
    const tenApples: CartItem = {
      id: 1,
      quantity: 10,
      imgUrl: 'img/apple',
      itemTotal: 20,
      name: 'apple',
      price: 2,
    };

    const fiveOranges: CartItem = {
      id: 2,
      quantity: 5,
      imgUrl: 'img/orange',
      itemTotal: 20,
      name: 'orange',
      price: 2,
    };

    const state: CartState = {
      cartItems: [tenApples, fiveOranges],
    };

    const itemExist = getIsItemAlreadyInCart(2)(state);
    expect(itemExist).toBeTrue();

    const itemExist1 = getIsItemAlreadyInCart(3)(state);
    expect(itemExist1).toBeFalse();
  });
});
