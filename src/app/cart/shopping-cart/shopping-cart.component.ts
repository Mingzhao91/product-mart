import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CartStore } from '@core/cart/cart-store';
import { getCartItems, getCartItemsCount } from '@core/cart/cart-selector';
import { CartItem } from '@core/cart/cart-item';
import {
  ALLOWED_PRODUCT_QUANTITIES,
  CartService,
} from '@core/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cartItemsCount!: Observable<number>;
  cartItems!: Observable<CartItem[]>;
  availableQuantities!: number[];
  displayedColumns = ['imgUrl', 'name', 'price', 'quantity', 'remove'];

  constructor(private cartStore: CartStore, private cartService: CartService) {}

  ngOnInit() {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
    this.cartItems = this.cartStore.select(getCartItems);
  }

  updateCartItem({ value }: { value: number }, cartItem: CartItem) {
    this.cartService.updateCart({ ...cartItem, quantity: value });
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
  }
}
