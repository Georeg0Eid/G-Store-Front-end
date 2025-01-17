import { Component, NgModule, OnInit } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartItemCount: number = 0;
  showCheckoutForm = false;
  successMessage = '';
  errorMessage = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  onQuantityChange(item: CartItem): void {
    const updatedItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (updatedItem) {
      updatedItem.quantity = item.quantity;
      this.cartService.saveCart();
    }
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      this.errorMessage =
        'Your cart is empty. Please add products to your cart before proceeding.';
      this.showCheckoutForm = false;
    } else {
      this.showCheckoutForm = true;
      this.errorMessage = '';
    }
  }

  submitCheckoutForm(formData: any) {
    if (formData.name && formData.email && formData.address && formData.phone) {
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
        },
        cartItems: this.cartItems,
        totalAmount: this.getTotal()
      };

      this.cartService.submitOrder(orderData).subscribe(
        (orderResponse) => {
          this.successMessage =
            'Your order has been successfully submitted! Thank you for your purchase.';
          this.errorMessage = '';
          this.clearCart();
        },
        // (error) => {
        //   this.errorMessage =
        //     'There was an error processing your order. Please try again.';
        //   this.successMessage = '';
        // }
      );
    } else {
      this.errorMessage = 'Please fill out all the fields.';
      this.successMessage = '';
    }
  }

  clearCart() {
    this.cartItems = [];
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }
}

