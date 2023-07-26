import { Component, OnInit } from '@angular/core';
import { CodefirstService } from '../services/codefirst.service';
import { Blob } from 'buffer'
import { employees } from '../employee';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-codefirst',
  templateUrl: './codefirst.component.html',
  styleUrls: ['./codefirst.component.scss']
})
export class CodefirstComponent implements OnInit {
  public Employeedata!:any;
  public Productsdata!:any;
  selectedFile: File | null = null;

  public selectedEmployees:any = [];
  errors: any;
  file: any;
  // selectedFile!: any;
  loading:boolean=false;

  constructor(private codefirstService:CodefirstService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.codefirstService.getEmployees().subscribe(data => {
      this.Employeedata = data
      console.log(this.Employeedata);
      return this.Employeedata
    });
    
    this.codefirstService.getProducts().subscribe(data => {
      this.Productsdata = data
      console.log(this.Productsdata);
      return this.Productsdata
    });
  }

  downloadEmployees(){
    this.codefirstService.downloadEmployees().subscribe((blob) => {
      let a = document.createElement('a');
        a.download='Employees.xlsx';
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });

  }

  selectedEmployee(employee:employees){
    if (this.selectedEmployees.includes(employee)){
      // console.log("included");
      delete this.selectedEmployees[this.selectedEmployees.indexOf(employee)] 
      this.selectedEmployees = this.selectedEmployees.filter(Boolean); 
    }
    else{
      this.selectedEmployees.push(employee);
    }
    console.log(this.selectedEmployees);   
  }

  downloadSelectedEmployees(){
    this.codefirstService.downloadSelectedEmployees(this.selectedEmployees).subscribe(
      (blob) => {
      let a = document.createElement('a');
      a.download='Employees.xlsx';
      a.href = window.URL.createObjectURL(blob);
      a.click();
    }
      // response => console.log("success",response)
      
    );
  }

  // getEmployees(){
    
  // }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
  }

  uploadExcelFile(){
    if (!this.selectedFile) {
      console.log('No file selected.');
      return;
    }
    this.codefirstService.uploadExcelFile(this.selectedFile).subscribe(response => {
          console.log('File uploaded successfully:', response);
          this.messageService.add({severity: 'info', summary: 'Data Updated Successfully', detail: ''});
          location.reload();
          // Handle success response...
        },
        error => {
          console.error('Error uploading file:', error);
          // Handle error response...
        }
      );
  }

//   uploadfile() {
//     this.loading = !this.loading;
//     this.codefirstService.upload(this.file).subscribe((event: Response) => {
//       if (typeof (event) === 'object') {
//         this.loading = false;
//       }
//       this.selectedFile = '';
//       // this.responsePopup(event);
//     },
//       error => {
//         if (error.status == 400) {
//           console.log(error.error[0])
//           this.selectedFile = '';
//           this.errors=error.error[0].message;
//         };

//       }
// )}

// responsePopup(apidata: any) {
//   this.responsePopupRef = this._dialog.open(ResponsePopupComponent, {
//   height: 'auto',
//   width: '1000px',
//   maxHeight: '600px',
//   data: apidata
// });

}
