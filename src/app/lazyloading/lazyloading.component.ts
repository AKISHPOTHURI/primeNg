import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { ProductserviceService } from '../services/productservice.service';
import { Product } from '../product';
import { Customer } from '../customer';
import { Row } from 'jspdf-autotable';
import { first } from 'rxjs';

@Component({
  selector: 'app-lazyloading',
  templateUrl: './lazyloading.component.html',
  styleUrls: ['./lazyloading.component.scss']
})
export class LazyloadingComponent implements OnInit {


  datasource!: Customer[];

  customers!: Customer[];

  totalRecords!: number;
  row = 10;

  cols!: any[];

  loading!: boolean;

  constructor(private productservice:ProductserviceService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
      //datasource imitation
      this.productservice.getCustomersLarge().then(data => {
          this.datasource = data;
          this.totalRecords = data.length;
          console.log(this.totalRecords);
          
      });

      this.loading = true;
      this.primengConfig.ripple = true;
  }

  loadCustomers(event: LazyLoadEvent) {  
      this.loading = true;

      //in a real application, make a remote request to load data using state metadata from event
      //event.first = First row offset
      //event.rows = Number of rows per page
      //event.sortField = Field name to sort with
      //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

      //imitate db connection over a network
      setTimeout(() => {
          if (this.datasource) {
              this.customers = this.datasource.slice(event.first,(event.rows+event.first));
              console.log(this.customers);
              console.log(event);
              
              
              this.loading = false;
          }
      },1000);
  }
}
