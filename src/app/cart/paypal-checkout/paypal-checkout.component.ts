import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { environment } from 'src/environments/environment.development';

import {
  getCartItems,
  getCartItemsCount,
  getCartSubTotal,
  getEstimatedTax,
  getOrderTotal,
  getShippingCost,
} from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { CartService } from '@core/cart/cart.service';
import { OrderService } from '@core/orders/order.service';
import { CartItem } from '@core/cart/cart-item';
import { combineLatest } from 'rxjs';

declare let paypal: any;
@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalCheckoutComponent {
  orderTotal: number = 0;
  cartItems!: CartItem[];
  shippingCost!: number;
  itemsCount!: number;
  orderSubTotal!: number;
  estimatedTax!: number;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private cartStore: CartStore,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    combineLatest([
      this.cartStore.select(getOrderTotal),
      this.cartStore.select(getCartItems),
      this.cartStore.select(getShippingCost),
      this.cartStore.select(getCartItemsCount),
      this.cartStore.select(getEstimatedTax),
      this.cartStore.select(getCartSubTotal),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        ([
          orderTotal,
          cartItems,
          shippingCost,
          itemsCount,
          estimatedTax,
          orderSubTotal,
        ]: any) => {
          console.log(`Order Total is `, orderTotal);
          console.log(`Cart Items `, cartItems);
          this.orderTotal = orderTotal;
          this.cartItems = cartItems;
          this.shippingCost = shippingCost;
          this.itemsCount = itemsCount;
          this.estimatedTax = estimatedTax;
          this.orderSubTotal = orderSubTotal;
        }
      );

    // get order total
    this.cartStore
      .select<number>(getOrderTotal)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((orderTotal: number) => {
        console.log('total: ', orderTotal);
        this.orderTotal = orderTotal;
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
                  total: this.orderTotal,
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

        const { cart: cartId, id: paymentId } = payment;
        const {
          orderTotal,
          cartItems,
          shippingCost,
          itemsCount,
          estimatedTax,
          orderSubTotal,
        } = this;

        this.orderService
          .submitOrder({
            cartId,
            cartItems,
            orderTotal,
            paymentId,
            shippingCost,
            itemsCount,
            estimatedTax,
            orderSubTotal,
          })
          .subscribe((orderId) => {
            console.log('Order created successfully', orderId);
            console.log('redirecting to thank you page');
            this.cartService.clearCart();
            this.router.navigate(['products']);
          });
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
