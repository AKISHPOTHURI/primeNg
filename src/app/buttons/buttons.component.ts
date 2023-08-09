import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  btnName:string[] = ['BU','ELE MD','ELE HRBP','LM','DLM'];
  buttonName:any = "Download "+ this.btnName[0];
  constructor() { }

  ngOnInit(): void {
  }

  loadEmployee(name:string){
    console.log(name);
    this.buttonName = document.getElementById('btn-name')?.innerHTML
    this.buttonName = "Download "+ name;
    console.log(this.buttonName);
    
  }
}
