import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  data = {
    name: 'Arnold',
    title: 'Web Developers'
   }

  country = ['India', 'USA', 'Dubai']
  constructor() { }

  ngOnInit(): void {
  }

  Add(value:string){
    this.country.push(value);
  }
}
