import { Component, OnInit } from '@angular/core';
import { CompaniesListService } from '../services/companies-list.service';
import { combineLatest, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { about, level } from './interface';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.scss']
})
export class PrimengTableComponent implements OnInit {

  data!: about[]
  statuses!:SelectItem[];
  clonedProducts: { [s: string]: about } = {};

  constructor(private companyService: CompaniesListService, private http: HttpClient, private messageService: MessageService) { }
 
  ngOnInit(): void {
    
    // const levels = this.http.get("http://localhost:3000/About")
    // const employees = this.http.get("http://localhost:3000/Level")
    // forkJoin(levels, employees).subscribe(response => {
    //   console.log(response);
    // })
    this.companyService.getEmployees().subscribe(response=>{
      this.data=response
    })
    
    this.statuses = [
      { label: 'L1', value: 'L1' },
      { label: 'L2', value: 'L2' },
      { label: 'L3', value: 'L3' }
  ];
  }
  onRowEditInit(details: about) {
    this.clonedProducts[details.EmployeeName as string] = { ...details };
}

onRowEditSave(details: about) {
    // if (product.price > 0) {
    //     delete this.clonedProducts[product.id as string];
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    // } else {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    // }
}

onRowEditCancel(product: about, index: number) {
    // this.data[index] = this.clonedProducts[product.id as string];
    // delete this.clonedProducts[product.id as string];
}
}
