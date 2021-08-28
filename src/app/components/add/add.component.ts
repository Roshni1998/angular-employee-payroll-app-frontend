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
    profilePic: new FormControl(''),
    gender: new FormControl('')
  });
  

  constructor() { }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  // onSubmit(){
  //   console.log(this.employee);
  // }

  ngOnInit(): void {
  }
}
