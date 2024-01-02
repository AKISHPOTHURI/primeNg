import { Component, OnInit } from '@angular/core';
import { PrimecrudService } from '../services/primecrud.service';
import { student } from '../student';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-primecurd',
  templateUrl: './primecurd.component.html',
  styleUrls: ['./primecurd.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class PrimecurdComponent implements OnInit {

  students:any = [];
  selectedStudents:any = [];
  student:any
  submitted:boolean = false;
  studentDialog:boolean = false
  studentCreateDialog:boolean = false;
  data:any ;
  idList:any;
  public responseData1: any;
  public responseData2: any;
  public responseData3: any;
  skeleton:boolean = false;
  skeletonTable:boolean = true;

  constructor(private service:PrimecrudService,private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  openNew() {
    this.student = {};
    this.submitted = false;
    this.studentCreateDialog = true;
}

hideDialog() {
  this.studentDialog = false;
  this.studentCreateDialog = false;
  this.submitted = false;
}

  deleteSelectedProducts(){

}
editStudent(student:student){
  this.studentDialog = true;
  this.data = {...student};
  this.student = {...student};
  console.log(student)
}
deleteStudent(student:any) {
  this.service.deleteStudent(student.studentID).subscribe((data) => {
    if (data == true) {
      console.log("Student deleted")
      this.students.pop(student);
    }
    else {
      console.log("Got error")
    }
  });
}

deleteBulk() {
  console.log(this.selectedStudents);
  this.idList = this.selectedStudents.map((x: { studentID: any; }) => x.studentID);
  console.log(this.idList)
  this.students = this.students.filter((val: any) => !this.selectedStudents.includes(val));
  this.selectedStudents = null;
  this.service.deleteBulk(this.idList).subscribe((data) => {
    if (data == true){
      console.log("Bulk delete successfull");
    }
  })
}

saveProduct() {
  console.log(this.student);
  this.studentDialog = false;
  this.service.editStudent(this.student).subscribe((data) => {
    if (data == true){
      console.log('Data Successfully Edited')
      this.students[this.findIndexById(this.student.studentID)] = this.student; 
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Data Successfully Edited', life: 3000});
    }
    else{
      console.log('Data Not Found')
    }
  })
}

createStudent() {
  this.service.createStudent(this.student).subscribe((data) => {
    if (data == true){
      console.log("Data is inserted")
      this.students.push(this.student);
      this.studentCreateDialog = false
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Student created', life: 3000});
    }
    else{
      console.log("Data is not created")
      this.studentCreateDialog = false
    }
  })
}

first(){
  this.service.requestDataFromMultipleSources().subscribe((data) => {
    console.log(data)
  })
}

second() {
  this.service.getAllEmployees().subscribe((data) => {
    console.log(data)
  })
}

fullfunction(){
  console.log("execute")
  // this.service.requestDataFromMultipleSources().subscribe(responseList => {
  //   this.responseData1 = responseList[0];
  //   this.responseData2 = responseList[1];
  //   this.responseData3 = responseList[2];
  //   console.log("responseData1",this.responseData1)
  //   console.log("responseData2",this.responseData2)
  this.service.requestDataFromMultipleSources().pipe(
    switchMap(() => this.service.getAllEmployees())
  ).subscribe(
    response => { 
      console.log(response)
    },
    error => {
      // handle errors
    }
  );
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].studentID === id) {
          index = i;
          break;
      }
  }

  return index;
}

  getStudents(){
      this.service.getStudents().subscribe((data) => {
        this.students = data;
        if (this.students){
          setTimeout(() => {
            this.skeletonTable = false;
            this.skeleton = !this.skeletonTable;
          },5000)

        }
      })
  }

}
