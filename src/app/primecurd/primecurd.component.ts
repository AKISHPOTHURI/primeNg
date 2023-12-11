import { Component, OnInit } from '@angular/core';
import { PrimecrudService } from '../services/primecrud.service';
import { student } from '../student';
import { ConfirmationService, MessageService } from 'primeng/api';

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

deleteSelectedStudents() {

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
    })
  }

}
