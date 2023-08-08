import { Component, DestroyRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ProductDataService } from '@core/products/product-data.service';
import { Product } from '@core/products/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Product>();
  loading = false;
  displayedColumns = ['imgUrl', 'name', 'price', 'addToCart'];

  constructor(
    private productDataService: ProductDataService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.productDataService
      .getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          console.log(products);
          this.onDataLoad(products);
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  onDataLoad(products: Product[]) {
    this.dataSource.data = products;
    this.dataSource.sort = this.sort;
  }
}
