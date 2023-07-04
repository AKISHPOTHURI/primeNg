import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';

interface City {
  name: string;
  code: string;
}


@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent implements OnInit {

  cities1!: SelectItem[];

  cities2!: City[];

  selectedCity1!: City;

  selectedCity2!: City;

  selectedCar!: string;
  selectedCar1!:string;

  groupedCars!: SelectItemGroup[];

  a!:string;

  constructor() { }

  ngOnInit(): void {
     
  
              //SelectItem API with label-value pairs
              this.cities1 = [
                {label:'Select City', value:null},
                {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
                {label:'ireland', value:{id:2, name: 'Rome', code: 'RM'}},
                {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
                {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
                {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}},
                {label:'Nerth', value:{id:6, name: 'Nerth', code: 'NT'}},
                {label: 'Nea Zealand', value:{id:7, name: 'Nea Zealand', code: 'NZ'}}
            ];
  //              //An array of cities

      this.cities2 = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'},
        {name: 'North', code: 'NT'},
        {name: 'Nea Zealand', code: 'NZ'}
    ];

  //   this.groupedCars = [
  //     {
  //         label: 'Germany',
  //         items: [
  //             {label: 'Audi', value: 'Audi'},
  //             {label: 'BMW', value: 'BMW'},
  //             {label: 'Mercedes', value: 'Mercedes'}
  //         ]
  //     },
  //     {
  //         label: 'USA',
  //         items: [
  //             {label: 'Cadillac', value: 'Cadillac'},
  //             {label: 'Ford', value: 'Ford'},
  //             {label: 'GMC', value: 'GMC'}
  //         ]
  //     },
  //     {
  //         label: 'Japan',
  //         items: [
  //             {label: 'Honda', value: 'Honda'},
  //             {label: 'Mazda', value: 'Mazda'},
  //             {label: 'Toyota', value: 'Toyota'}
  //         ]
  //     }
  // ];

  //           console.log(this.selectedCity1?.name);
  //           console.log("oninit");
            
  //           console.log(this.selectedCity2);
  }

  getvar(){
    console.log("selectedCity1",this.selectedCity1?.name);
    console.log("selectedCity2",this.selectedCity2?.name);
    

    
  }

//   clearFilter(dropdown: Dropdown) {
//     console.log(dropdown);
//     dropdown.resetFilter();
//     console.log(dropdown);
    
// }



}
