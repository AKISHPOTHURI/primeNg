import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CompaniesListService } from 'src/app/services/companies-list.service';
import { Company } from 'src/app/services/models';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  companyId: number = 1;
  appcompanyId:number=1
  company!: Company;
  error: string='';

  constructor(private authService: AuthService,private route: ActivatedRoute, private companiesService: CompaniesListService,private router: Router) {
    debugger
    this.route.params.subscribe(params => {
      this.appcompanyId = +params['id'];
    });
   }

  ngOnInit(): void {
    const companyIdParam = this.route.snapshot.paramMap.get('id');
    if (companyIdParam !== null) {
      this.companyId = parseInt(companyIdParam);
      
      this.companiesService.getCompanyById(this.companyId).subscribe(
        (company: Company) => {
         this.company  = company;
        },
        (error: any) => {
          this.error = 'Company not found'; 
          console.error(error);
        }
      );
    } else {
      this.error = 'Invalid company'; 
    }
  }
   applyNow() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/login']); 
    }
    else{
      this.router.navigate(['/application',this.appcompanyId]); 
    }
   }
  
}
