import {Component, OnInit} from '@angular/core';
import { ProductserviceService } from '../services/productservice.service';
import { Product } from '../product';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  providers: [MessageService],
  styleUrls: ['./primeng-table.component.scss']
})
export class PrimengTableComponent implements OnInit { 

    products2: Product[] = [];

    statuses: SelectItem[] = [];
    public productData:any;
    public productMessage!:string;


    clonedProducts: { [s: string]: Product; } = {};

    constructor(private productService: ProductserviceService, private messageService: MessageService) { }

    cities: SelectItem[] = [];
    selectedState!: string;
    selectedProducts!:Product;
    cols: any[] = [];
    // selectedCity!:string;
    stateNames = ['Alabama', 'Alaska', 'California'];

    states = this.stateNames.map((val, i, stateNames) => {
        return { label: val, value: val }

    });  
    cityNames = [
      {state: 'Alabama', city: 'Birmingham'}, 
      {state: 'Alabama', city: 'Huntsville'}, 
      {state: 'Alabama', city: 'Montgomery'},
      {state: 'Alaska', city: 'Anchorage'}, 
      {state: 'Alaska', city: 'Juneau'},
      {state: 'California', city: 'Fresno'},
      {state: 'California', city: 'Perris'}
    ];

    ngOnInit() {
        // this.productService.getProductsSmall().subscribe(data => this.products1 = data,
        //     );
        this.cols = [
            { field: "Code", header: "Code" },
            { field: "Name", header: "Name" },
            { field: "Price", header: "Age" },
            { field: "State", header: "State"},
            { field: "City", header: "City"},
          ];
        this.productService.getProductsSmall().subscribe(data => this.products2 = data);
        // console.log(this.products2)
        this.getCities(this.selectedState);
        // this.getStates()
        // this.onStateSelectionChange()
        
        
               
    }

    getCities(state:any) {
        this.cities = this.cityNames
                          .filter((el) => { return el.state === state })
                          .map((el) => {return { label: el.city, value: el.city } });
    }
    // getCities(state:any) {
    //     this.cities = this.cityNames
    //                       .filter((el) => { return el.state === state })
    //                       .map((el) => {return { label: el.city, value: el.city } });
    // }
    


        


    onRowEditInit(product: Product) {
        this.clonedProducts[product.id] = {...product};
        // this.getCities(this.selectedState);
    }

    onRowEditSave(product: Product) {
        
        if (product.price > 0){
            // product.state = this.selectedState;
            // product.city = this.selectedCity
            product.id && this.productService.updateProducts(product.id,product).subscribe((data) => {
                this.productData = data;
                if (this.productData){
                 this.productMessage="Product updated";
                 console.log(this.productMessage);                
                }
                else {
                    console.log("Not Updated");             
                }
               });
               delete this.clonedProducts[product.id]
        }
        else {
            console.log("Enter the price more than zero.");             
        }
        
        // if (product.price > 0) {
        //     delete this.clonedProducts[product.id];
        // }  
        // else {
        //     console.log("Enter the price more than zero.");
            
        // }
    }

    onRowEditCancel(product: Product, index: number) {
        this.products2[index] = this.clonedProducts[product.id];
        delete this.products2[product.id];
    }
}