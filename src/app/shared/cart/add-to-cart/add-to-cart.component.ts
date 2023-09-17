import { Component, Input, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

import { CartStore } from '@core/cart/cart-store';
import {
  ALLOWED_PRODUCT_QUANTITIES,
  CartService,
} from '@core/cart/cart.service';
import { Product } from '@core/products/product';
import { getIsItemAlreadyInCart } from '@core/cart/cart-selector';
import { CartItem } from '@core/cart/cart-item';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';

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
    private cartService: CartService,
    private dialog: MatDialog
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
        this.openDialog(cartItem);
      });
  }

  openDialog(cartItem: CartItem) {
    const dialogRef = this.dialog.open(AddToCartDialogComponent, {
      width: '350px',
      height: '250px',
      data: { cartItem },
      disableClose: true,
    });
  }
}
