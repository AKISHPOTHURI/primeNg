import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private previousUrl: string='';

  private apiUrl = 'http://localhost:3000/signupUsers';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { 
   
  }

  
  login(data: any) {
    this.http.get(`${this.apiUrl}?email=${data.email}&password=${data.password}`, { observe: 'response' })

      .subscribe((result: any) => {

        if (result && result.body && result.body.length) {
          localStorage.setItem('currentUser',btoa(JSON.stringify(result.body)));
          this.router.navigate(['joblistPage']);
        }
        else {
          this.toastr.warning("User not Found")
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(atob(user)) : null;
  }
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
