import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../services/order.service';
import { ProductsService } from '../services/products.service';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgFor, NgIf, ReactiveFormsModule],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  orders: any[] = [];
  users: any[] = [];
  totalProductsCount: number = 0;
  totalOrdersCount: number = 0;
  totalUsersCount: number = 0;
  showAddProductForm = false;
  selectedProduct: any = null; 

  constructor(
    private productService: ProductsService,
    private userService: UserService 
  ) {}

  ngOnInit(): void {    this.loadProducts();
    this.loadUsers();  }
  openAddProductModal() {
    this.showAddProductForm = true;
  }
  closeAddProductForm() {
    this.showAddProductForm = false;
  }

  addproductForm = new FormGroup({
    name: new FormControl(''),
    new_price: new FormControl(''),
    old_price: new FormControl(''),
    productImage: new FormControl(null),
    category: new FormControl(''),
  });

  onFilleChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addproductForm.patchValue({ productImage: file });
    }
  }

  addproduct() {
    let formData = new FormData();
    formData.append('name', this.addproductForm.get('name')?.value || '');
    formData.append(
      'new_price',
      this.addproductForm.get('new_price')?.value || ''
    );
    formData.append(
      'old_price',
      this.addproductForm.get('old_price')?.value || ''
    );
    formData.append(
      'description',
      this.addproductForm.get('description')?.value || ''
    );
    formData.append(
      'category',
      this.addproductForm.get('category')?.value || ''
    );
    formData.append(
      'productImage',
      this.addproductForm.get('productImage')?.value || ''
    );

    this.productService.addProduct(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.showAddProductForm = false;      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  editProductForm = new FormGroup({
    name: new FormControl(''),
    new_price: new FormControl(''),
    old_price: new FormControl(''),
    category: new FormControl(''),
    productImage: new FormControl(null),
  });
  openEditProductModal(product: any) {
    this.selectedProduct = product;
    this.editProductForm.setValue({
      name: product.name,
      new_price: product.new_price,
      old_price: product.old_price,
      category: product.category,
      productImage: null,
    });
    this.showAddProductForm = true;
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.totalProductsCount = data.length;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.totalUsersCount = data.length;
    });
  }

  updateProduct() {
    if (this.editProductForm.valid) {
      const updatedProduct = this.editProductForm.value;
      this.productService
        .updateProduct(this.selectedProduct.id, updatedProduct)
        .subscribe((response) => {
          console.log('Product updated:', response);
        });
    }
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editProductForm.patchValue({ productImage: file });
    }
  }
  deleteProduct(id: number) {
    const confirmationMessage = 'Are you sure you want to delete this product?';
    if (confirm(confirmationMessage)) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          console.log('Product deleted:', response);
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}


