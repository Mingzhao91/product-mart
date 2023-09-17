import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';
import { CartItemsCountComponent } from './cart/cart-items-count/cart-items-count.component';
import { AddToCartDialogComponent } from './cart/add-to-cart-dialog/add-to-cart-dialog.component';

@NgModule({
  declarations: [
    AddToCartComponent,
    CartItemsCountComponent,
    AddToCartDialogComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CartItemsCountComponent,
    AddToCartComponent,
    AddToCartDialogComponent,
  ],
})
export class SharedModule {}
