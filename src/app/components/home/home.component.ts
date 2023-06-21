import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompaniesListService } from 'src/app/services/companies-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companyName: string='';
  jobTitle: string='';

  constructor(private router: Router, private http: HttpClient,private toastr:ToastrService,private companiesService:CompaniesListService) {}

  ngOnInit(): void {
  }
  searchJobs(): void {
    this.companiesService.companiesList().subscribe((companiesList: any) => {
      
      const matchingJob = companiesList.find((job: any) => job.companyName.trim().toLowerCase() === this.companyName.trim().toLowerCase() && job.jobTitle.trim().toLowerCase() === this.jobTitle.trim().toLowerCase());      
      if (matchingJob) {
        this.router.navigate(['/companiesList', matchingJob.id]);
      } else {
        this.toastr.warning("No matching job found.")        
      }
    });
  }
}
