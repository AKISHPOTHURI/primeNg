import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesListService } from 'src/app/services/companies-list.service';
import { Company } from 'src/app/services/models';

@Component({
  selector: 'app-joblist-page',
  templateUrl: './joblist-page.component.html',
  styleUrls: ['./joblist-page.component.scss']
})
export class JoblistPageComponent implements OnInit {

  public companyData: any
  

  constructor(private route: ActivatedRoute,private http: HttpClient, private companiesService:CompaniesListService) {
    this.companyData = [];
   }

  ngOnInit() {
   this.companiesService.companiesList().subscribe(res => {
      this.companyData = res;
      return res
    })  ;
      
  }
 
  
}
