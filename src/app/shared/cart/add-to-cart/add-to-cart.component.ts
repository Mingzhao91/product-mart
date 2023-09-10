import { Component, Input, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';

import { CartStore } from '@core/cart/cart-store';
import {
  ALLOWED_PRODUCT_QUANTITIES,
  CartService,
} from '@core/cart/cart.service';
import { Product } from '@core/products/product';
import { getIsItemAlreadyInCart } from '@core/cart/cart-selector';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent {
  @Input() product!: Product;
  availableQuantities!: number[];
  quantity!: number;
  isItemAlreadyInCart!: Observable<boolean>;

  constructor(
    private destroyRef: DestroyRef,
    private cartStore: CartStore,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.isItemAlreadyInCart = this.cartStore.select(
      getIsItemAlreadyInCart(this.product.id)
    );
    this.quantity = 1;
  }

  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cartItem) => {
        console.log('added to cart', cartItem);
      });
  }
}
