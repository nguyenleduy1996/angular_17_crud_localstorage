import { CommonModule } from '@angular/common';
import { Element } from '@angular/compiler';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model:ElementRef | undefined
  studentObj: Student = new Student();
  studentList:Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud")
    if(localData != null){
      this.studentList = JSON.parse(localData)
    }
  }
  updateStud() {
    const currentRecord =  this.studentList.find(m=> m.id === this.studentObj.id);
    if(currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address =  this.studentObj.address;
      currentRecord.mobileNo =  this.studentObj.mobileNo;
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel()
}
 
  openModel(){
  
    const model = document.getElementById("myModal");
    if(model != null){
      model.style.display = 'block'
    }
  }
  onDelete(item: Student) {
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      const currentRecord =  this.studentList.findIndex(m=> m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }
  closeModel(){
    this.studentObj =  new Student();
    if(this.model != null){
      this.model.nativeElement.style.display = 'none';
    }
    
  }
  onEdit(item: Student){
    this.studentObj = item;
    this.openModel()
  }
  saveStudent(){
    debugger
    const isLocalPresent = localStorage.getItem("angular17crud");
    if(isLocalPresent != null){
        const oldArr = JSON.parse(isLocalPresent)
        this.studentObj.id = oldArr.lenght + 1
        oldArr.push(this.studentObj);
        this.studentList = oldArr
        localStorage.setItem("angular17crud", JSON.stringify(oldArr))
    }else{
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id =  1
      this.studentList = newArr
      localStorage.setItem("angular17crud", JSON.stringify(newArr))
    }
    this.closeModel()
    
  }
}


export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }

}