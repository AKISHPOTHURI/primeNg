// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product';
import { P } from '../classdatatype';
import { Customer } from '../customer';
import { Observable, catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',

})
export class ProductserviceService {
    products!: any;
    public productDetails!: Product[];

    // status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    // productNames: string[] = [
    //     "Bamboo Watch", 
    //     "Black Watch", 
    //     "Blue Band", 
    //     "Blue T-Shirt", 
    //     "Bracelet", 
    //     "Brown Purse", 
    //     "Chakra Bracelet",
    //     "Galaxy Earrings",
    //     "Game Controller",
    //     "Gaming Set",
    //     "Gold Phone Case",
    //     "Green Earbuds",
    //     "Green T-Shirt",
    //     "Grey T-Shirt",
    //     "Headphones",
    //     "Light Green T-Shirt",
    //     "Lime Band",
    //     "Mini Speakers",
    //     "Painted Phone Case",
    //     "Pink Band",
    //     "Pink Purse",
    //     "Purple Band",
    //     "Purple Gemstone Necklace",
    //     "Purple T-Shirt",
    //     "Shoes",
    //     "Sneakers",
    //     "Teal T-Shirt",
    //     "Yellow Earbuds",
    //     "Yoga Mat",
    //     "Yoga Set",
    // ];

    constructor(private http: HttpClient, private messageService:MessageService) { }

    private log(message: any) {
      this.messageService.add(message);
      console.log(message);
      
    }
    

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }


    getProductsSmall() {
        return this.http.get<any>('http://localhost:3000/data')
        .pipe(
          catchError(this.handleError<any>('getProductsSmall'))
        );
        // .toPromise()
        // .then(res => <Product[]>res.data)
        // .then(data => { 
        //     console.log(data)
        //     return data; });
    }

    updateProducts(id:number,data:Product){
        return this.http.put<Product[]>(`http://localhost:3000/data/${id}`,data)
    }

    // getstatesdup(){
    //     return this.http.get<any>('http://localhost:3000/states')
    // }

    // getCitiesdup(id:number){
    //     return this.http.get(`http://localhost:3000/cities/${id}`)
    // }

    // getProducts() {
    //     return this.http.get<any>('http://localhost:3000/data')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // getProductsWithOrdersSmall() {
    //     return this.http.get<any>('http://localhost:3000/data')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // generatePrduct(): Product {
    //     const product: Product =  {
    //         id: this.generateId(),
    //         name: this.generateName(),
    //         description: "Product Description",
    //         price: this.generatePrice(),
    //         quantity: this.generateQuantity(),
    //         category: "Product Category",
    //         inventoryStatus: this.generateStatus(),
    //         rating: this.generateRating()
    //     };

    //     product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
    //     return product;
    // }

    // generateId() {
    //     let text = "";
    //     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
    //     for (var i = 0; i < 5; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
        
    //     return text;
    // }

    // generateName() {
    //     return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    // }

    // generatePrice() {
    //     return Math.floor(Math.random() * Math.floor(299)+1);
    // }

    // generateQuantity() {
    //     return Math.floor(Math.random() * Math.floor(75)+1);
    // }

    // generateStatus() {
    //     return this.status[Math.floor(Math.random() * Math.floor(3))];
    // }

    // generateRating() {
    //     return Math.floor(Math.random() * Math.floor(5)+1);
    // }
    getCustomersLarge() {
      return this.http.get<any>('assets/customers-large.json')
          .toPromise()
          .then(res => <Customer[]>res.data)
          .then(data => { return data; });
  }
  getProducts() {
    return this.http.get<any>('http://localhost:3000/productsdata')
    .pipe(
      catchError(this.handleError<any>('getProducts'))
    );
  }

    getProduct(){
        return this.productDetails = 
            [
                {
                //   id: new P(100,"Bamboo Watch").id,
                  id:new P().id,
                  code: "f230fh0g3",
                  name: "Mobile",
                //   name: new P(100,"Bamboo Watch").name,
                  price: 64,
                  state: "California",
                  city: "Fresno"
                },
                {
                  id: 1001,
                  code: "nvklal433",
                  name: "Black Watch",
                  price: 72,
                  state: "Alabama",
                  city: "Huntsville"
                }
              ]
        
    }
}