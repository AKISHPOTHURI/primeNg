import { Component, Input, OnInit } from '@angular/core';
import { ProductserviceService } from '../services/productservice.service';
declare const genRandomNumbers:any;
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  rNum = <[]>genRandomNumbers();
  public studCode!: any;  
  private studName!: any;  
  studCode1 = 14981981;  
  cols!: any[];
  roles!:any[];
  value!: string;
  bumaData!:any[];
  eleData!:any[];
  lmData!:any[];
  dlmData!:any[];
  birthday = new Date(1988, 11, 21);
  roleData:{ [index: string]: [[string, string]]; }  = {};
  role!:any;


  constructor(private productService:ProductserviceService) {
  this.studName! = "DELL"; 
  this.roles = ['BUMA','ELE','LM','DLM'];
  this.loadSales(this.roles[0]);
  }

  ngOnInit(): void {
    this.cols = [
      {field: 'brand',header: 'Brand',isShow:true},
      {field: 'lastYearProfit',header: 'Last Year Profit',isShow:false},
      {field: 'lastYearSale',header: 'Last Year Sale',isShow:false},
      {field: 'thisYearProfit',header: 'This Year Profit',isShow:true},
      {field: 'thisYearSale',header: 'This Year Sale',isShow:true}
    ];
  }    

  loadSales(role:string){
    this.role = role;
    console.log(this.roleData);
  
    if (this.roles.indexOf(role) >= 0 && this.roleData[role] == null){
      this.productService.getSales(role).subscribe(data => 
        {
          this.roleData[role] = data;
          return this.roleData[role];
        });           
    }
  }

}