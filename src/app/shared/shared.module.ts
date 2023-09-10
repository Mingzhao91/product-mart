import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';
import { CartItemsCountComponent } from './cart/cart-items-count/cart-items-count.component';

@NgModule({
  declarations: [AddToCartComponent, CartItemsCountComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CartItemsCountComponent,
  ],
})
export class SharedModule {}
