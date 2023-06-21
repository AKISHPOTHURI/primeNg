import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './models';

@Injectable({
  providedIn: 'root'
})
export class CompaniesListService {

  constructor(private http:HttpClient) { }

  companiesList(){
    return this.http.get<any>("http://localhost:3000/companiesList")
  }

  loginDetails(){
    return this.http.get<any>("http://localhost:3000/signupUsers")
  }
  getCompanyById(id: number) {
    return this.http.get<Company>(`http://localhost:3000/companiesList/${id}`);
  }
  
  getEmployees(){
    return this.http.get<any>("http://localhost:3000/About")
  }
  // getLevel(){
  //   return this.http.get<any>("http://localhost:3000/Level")
  // }
}
