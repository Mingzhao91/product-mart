import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductDataService } from '@core/products/product-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products!: Observable<any>;
  constructor(private productDataService: ProductDataService) {}

  ngOnInit() {
    this.products = this.productDataService.getAllProducts();
  }
}
