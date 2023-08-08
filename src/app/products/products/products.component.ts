import { Component, DestroyRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ProductDataService } from '@core/products/product-data.service';
import { Product } from '@core/products/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDataLoad(products: Product[]) {
    this.dataSource.data = products;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
