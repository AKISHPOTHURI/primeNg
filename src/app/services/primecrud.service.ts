import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { student } from '../student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimecrudService {

  constructor(private http:HttpClient) { }

  a ='https://localhost:44366/api/Student/EditStudent';
  getStudents() {
    // let userStore = localStorage.getItem('user');
    // let userData = userStore && JSON.parse(userStore);
    return this.http.get('https://localhost:44366/api/Student/GetStudents');
  }

  editStudent(student:student) : Observable<boolean> {
   var a = this.http.post<boolean>('https://localhost:44366/api/Student/EditStudent',student);
   return a;
  }

  createStudent(student:student) : Observable<boolean> {
    return this.http.post<boolean>('https://localhost:44366/api/Student/CreateStudent',student);
  }

  deleteStudent(id:any) : Observable<boolean> {
    return this.http.delete<boolean>(`https://localhost:44366/api/Student/DeleteById?id=${id}`);
  }

  deleteBulk(student:any) : Observable<boolean> {
    return this.http.post<boolean>('https://localhost:44366/api/Student/DeleteBulk',student);

  }

}
