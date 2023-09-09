import { Injectable } from '@angular/core';
import { Store } from '@core/store';

import { CartState, initialState } from './cart-state';

@Injectable({ providedIn: 'root' })
export class CartStore extends Store<CartState> {
  constructor() {
    super(initialState);
  }
}
