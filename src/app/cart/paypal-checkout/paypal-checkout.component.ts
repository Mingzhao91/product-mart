import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { getOrderTotal } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { CartService } from '@core/cart/cart.service';
import { environment } from 'src/environments/environment.development';

declare let paypal: any;

@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalCheckoutComponent {
  orderTotalToCharge!: number;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartStore: CartStore,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    // get order total
    this.cartStore
      .select<number>(getOrderTotal)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((orderTotal: number) => {
        console.log('total: ', orderTotal);
        this.orderTotalToCharge = orderTotal;
      });
    // render paypal button pass paypal configuration
    paypal.Button.render(this.paypalConfig, '#paypal-button-container');
  }

  get paypalConfig() {
    return {
      style: { size: 'responsive' },
      env: 'sandbox',
      client: {
        sandbox: environment.paypalClientId,
      },
      commit: true,
      payment: (data: any, actions: any) => {
        return actions.payment.create({
          payment: {
            transactions: [
              {
                amount: {
                  total: this.orderTotalToCharge,
                  currency: 'GBP',
                },
              },
            ],
          },
        });
      },
      onAuthorize: async (data: any, actions: any) => {
        const payment = await actions.payment.execute();
        console.log(`The payment is successful`, payment);
        this.cartService.clearCart();
        this.router.navigate(['products']);
      },
      onCancel: (data: any) => {
        console.log(`The payment is cancelled`, data);
      },
      onError: (error: any) => {
        console.log(`Payment Error`, error);
      },
    };
  }
}
