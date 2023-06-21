import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.scss']
})
export class SigupComponent implements OnInit {

  public signupForm !: FormGroup
 user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;
  
  constructor(private readonly _authService: SocialAuthService,private formBuilder: FormBuilder, private http:HttpClient,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group
      ({
        fullname: [''],
        email: [''],
        password: [''],
        mobile: ['']
      })
      this._authService.authState.subscribe((user) => {
        this.user = user;
      });
  }
  signUp(){
    this.http.post<any>('http://localhost:3000/signupUsers',this.signupForm.value).subscribe(res=>{
      this.toastr.success("SignUp Successfully");
      this.signupForm.reset();
      this.router.navigate(['login'])
    })
  }

  signOut(): void {
    this._authService.signOut();
  }
}
