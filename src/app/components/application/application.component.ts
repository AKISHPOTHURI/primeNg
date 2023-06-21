import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';

import {  ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompaniesListService } from 'src/app/services/companies-list.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit{

  companyId: number=1;
  companyData:any
  applicationForm !: FormGroup;
  minDate: Date;
  maxDate: Date;
  currentDate= new Date();
 

  constructor(private http:HttpClient,private toastr:ToastrService,private formBuilder: FormBuilder,private companiesList:CompaniesListService,private route: ActivatedRoute) {
    //mat date picker
    this.minDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.maxDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1,0);
   

   
    this.route.params.subscribe(params => {
      this.companyId = +params['id'];
      this.fetchCompanyData();
    })
  }
  
 
  ngOnInit(): void {
    
    this.applicationForm = this.formBuilder.group({
      startDate:[''],
      areasofInterest:[''],
      resume:[''],
      linkedlnProfile: [''],
    });
  }

 
  
  fetchCompanyData(){
    this.companiesList.getCompanyById(this.companyId).subscribe(response=>{
      this.companyData=response
      console.log(this.companyData);
      this.applicationForm.patchValue({
        companyName: this.companyData.companyName,
      });
    })
  }
  submit(){
    this.http.post<any>('http://localhost:3000/applicationForm',this.applicationForm.value).subscribe(res=>{
      this.toastr.success("Application Successfully Submitted");
    })
  }
 
}
