import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable, catchError, of } from 'rxjs';
import { employees } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class CodefirstService {
  selectedFile: File | null = null;
  constructor(private http:HttpClient, private messageService:MessageService) { }

  getEmployees(){
    return this.http.get<any>('https://localhost:44389/GetEmployees');
  
  }

  downloadEmployees(){
    return this.http.get('https://localhost:44389/DownloadEmployees', { responseType: 'blob'});
  }

  downloadSelectedEmployees(Employeeselected:employees){
    return this.http.post('https://localhost:44389/ExportSeleteddData',Employeeselected,{ responseType: 'blob'});
  }

  // upload(file:any):Observable<any>{
  //   const formdata =new FormData;
  //   formdata.append("file",file, file.xlsx);
  //   return this.http.post('http://localhost:43359/api/Products/importProducts', formdata)
  // }

  getProducts(){
    return this.http.get<any>('http://localhost:43359/api/Products/GetProducts')
  }

  uploadExcelFile(selectedFile:any) {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);
    return this.http.post<any>('http://localhost:43359/api/Products/importProducts', formData)
  }





  private log(message: any) {
    this.messageService.add(message);
    console.log(message);
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
