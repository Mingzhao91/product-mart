import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CartItem } from '@core/cart/cart-item';

interface AddToCartDialogData {
  cartItem: CartItem;
}

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.scss'],
})
export class AddToCartDialogComponent {
  cartItem: CartItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddToCartDialogData,
    private router: Router,
    private dialogRef: MatDialogRef<AddToCartDialogComponent>
  ) {
    this.cartItem = data.cartItem;
  }

  async goToCart() {
    await this.router.navigate(['cart']);
    this.closeDialog();
  }

  async continueShopping() {
    await this.router.navigate(['products']);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
