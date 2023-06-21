import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CompaniesListService } from 'src/app/services/companies-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
  returnUrl: string='';
  public loginForm !: FormGroup
  constructor(private route: ActivatedRoute,
    private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private companyService: CompaniesListService) {

   }
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }
  login(data: any) {
    console.log(data);
    this.authService.login(data);
  }
}
