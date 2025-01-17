// خدمة CartService
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private orderUrl = 'http://localhost:3000/orders';
  private cartItems: CartItem[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private _http: HttpClient) {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = savedCart;
    this.updateCartCount(); 
  }


  addToCart(item: CartItem): void {
    const existingItemIndex = this.cartItems.findIndex(
      (product) =>
        product.id === item.id &&
        product.size === item.size &&
        product.color === item.color
    );

    if (existingItemIndex >= 0) {
      this.cartItems[existingItemIndex].quantity += item.quantity; 
    } else {
      this.cartItems.push(item);
    }

    this.saveCart(); 
    this.updateCartCount(); 
  }


  getCartItems(): CartItem[] {
    return this.cartItems;
  }


  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex(
      (product) =>
        product.id === item.id &&
        product.size === item.size &&
        product.color === item.color
    );

    if (index >= 0) {
      this.cartItems.splice(index, 1); 
      this.saveCart(); 
      this.updateCartCount(); 
    }
  }


  private updateCartCount(): void {
    const totalCount = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartCount.next(totalCount);
  }


  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }


  submitOrder(orderData: any): Observable<any> {
    return this._http.post(this.orderUrl, orderData); 
  }
}
