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

    // btnName:string[] = ['BU','ELE MD','ELE HRBP','LM','DLM'];
  // buttonName:any = "Download "+ this.btnName[0];
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
  // loadEmployee(name:string){
  //   console.log(name);
  //   this.buttonName = document.getElementById('btn-name')?.innerHTML
  //   this.buttonName = "Download "+ name;
  //   console.log(this.buttonName);
    
  // }
  loadSales(role:string){
    console.log(role);
    if (role == this.roles[0] && this.bumaData == null){
      this.productService.getSales(role).subscribe(data => 
        {
          this.bumaData = data;
          return this.bumaData;
        });           
    }
    if (role == this.roles[1] && this.eleData == null){
      this.productService.getSales(role).subscribe(data => 
        {
          this.eleData = data;
          return this.eleData;
        });           
    }
    if (role == this.roles[2] && this.lmData == null){
      this.productService.getSales(role).subscribe(data => 
        {
          this.lmData = data;
          return this.lmData;
        });           
    }
    if (role == this.roles[3] && this.dlmData == null){
      this.productService.getSales(role).subscribe(data => 
        {
          this.dlmData = data;
          return this.dlmData;
        });           
    }
  }

}