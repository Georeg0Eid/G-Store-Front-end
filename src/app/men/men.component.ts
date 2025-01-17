import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-men',
  standalone: false,

  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent implements OnInit {
products: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      console.log(data);

      this.products = data;
      this.products.forEach((product) => {
        console.log(product);
        console.log(product.image);
      });
    });
  }
}
