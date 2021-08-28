import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public employee: Employee = new Employee();
  public employeeFormGroup: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    profilePic: new FormControl('../assets/profile-images/Ellipse -4.png'),
    gender: new FormControl(''),
    hr: new FormControl(false),
    sales: new FormControl(false),
    finance: new FormControl(false),
    engineer: new FormControl(false),
    other: new FormControl(false)
  })

  constructor() { }

  ngOnInit(): void {
    console.log(this.employee);
  }
  
}
