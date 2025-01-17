import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  productURL = 'http://localhost:3000/products';



  getProducts(): Observable<any> {
    return this._http.get<any>(this.productURL);
  }


  getProductById(id: string | number): Observable<any> {
    return this._http.get<any>(`${this.productURL}/${id}`);
  }

  addProduct(product: FormData): Observable<any> {
    return this._http.post(this.productURL, product);
  }


  updateProduct(id: number, productData: any): Observable<any> {
    return this._http.put(`${this.productURL}/${id}`, productData);
  }


  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${this.productURL}/${id}`);
  }
}
