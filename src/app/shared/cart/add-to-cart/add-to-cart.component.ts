import { Component } from '@angular/core';

import { CartStore } from '@core/cart/cart-store';
import { CartService } from '@core/cart/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent {
  constructor(private cartStore: CartStore, private cartService: CartService) {}
}
