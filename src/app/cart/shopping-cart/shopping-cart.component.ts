import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CartStore } from '@core/cart/cart-store';
import { getCartItemsCount } from '@core/cart/cart-selector';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cartItemsCount!: Observable<number>;

  constructor(private cartStore: CartStore) {}

  ngOnInit() {
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
  }
}
