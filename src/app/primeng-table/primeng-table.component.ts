import {Component, OnInit} from '@angular/core';
import { ProductserviceService } from '../services/productservice.service';
import { Product } from '../product';
import { LazyLoadEvent, SelectItemGroup } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

interface City{
    name: string;
    code: string;
}

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  providers: [MessageService],
  styleUrls: ['./primeng-table.component.scss'],
  styles:[`
            :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            position: -webkit-sticky;
            position: sticky;
            top: 69px;
        }
  `]
})
export class PrimengTableComponent implements OnInit { 

    cities1: SelectItem[];

    cities2: City[];

    selectedCity1!: City;

    selectedCity2!: SelectItem;

    products2: Product[] = [];

    statuses: SelectItem[] = [];
    public productData:any;
    public productMessage!:string;
    // loading: boolean = true;


    clonedProducts: { [s: string]: Product; } = {};
    groupedCars: SelectItemGroup[];

    selectedCar!: string;

    constructor(private productService: ProductserviceService, private messageService: MessageService) {
                //SelectItem API with label-value pairs
                this.cities1 = [
                    {label:'Select City', value:null},
                    {label:'New York', value:{id:1, name: 'New York', code: 'NY'}, styleClass:"test"},
                    {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
                    {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
                    {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
                    {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}},
                    {label:'Hyderabad', value:{id:6, name: 'Hyderabad', code: 'HYD'}},
                    {label:'Warangal', value:{id:7, name: 'Warangal', code: 'WRL'}}
                ];
        
                //An array of cities
                this.cities2 = [
                    {name: 'New York', code: 'NY'},
                    {name: 'Rome', code: 'RM'},
                    {name: 'London', code: 'LDN'},
                    {name: 'Istanbul', code: 'IST'},
                    {name: 'Paris', code: 'PRS'}
                ];

                this.groupedCars = [
                    {
                        label: 'Germany',
                        items: [
                            {label: 'Audi', value: 'Audi'},
                            {label: 'BMW', value: 'BMW'},
                            {label: 'Mercedes', value: 'Mercedes'}
                        ]
                    },
                    {
                        label: 'USA',
                        items: [
                            {label: 'Cadillac', value: 'Cadillac'},
                            {label: 'Ford', value: 'Ford'},
                            {label: 'GMC', value: 'GMC'}
                        ]
                    },
                    {
                        label: 'Japan',
                        items: [
                            {label: 'Honda', value: 'Honda'},
                            {label: 'Mazda', value: 'Mazda'},
                            {label: 'Toyota', value: 'Toyota'}
                        ]
                    }
                ];
        
     }

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
        // this.cols = [
        //     { field: "Code", header: "Code" },
        //     { field: "Name", header: "Name" },
        //     { field: "Price", header: "Age" },
        //     { field: "State", header: "State"},
        //     { field: "City", header: "City"},
        //   ];
        this.productService.getProductsSmall().subscribe(data => this.products2 = data);
        console.log(this.productService.getProducts());       
        this.productService.getProduct();
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
    }

    onRowEditCancel(product: Product, index: number) {
        this.products2[index] = this.clonedProducts[product.id];
        delete this.products2[product.id];
    }

    //Reactive Forms
    form = new FormGroup({
        city: new FormControl()
    });
  
    get city(): any {
      return this.form.get('city');
    }
    
    onSubmit(): void {
      console.log(this.form.value); 
    }
}