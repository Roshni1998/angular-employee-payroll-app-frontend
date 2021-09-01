import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public employee: Employee = new Employee();
  employeeFormGroup: FormGroup;
  

   /**
   * Array of objects to store departments
   */
    departments: Array<any> = [
      {
        id: 1,
        name: "HR",
        value: "HR",
        checked: false
      },
      {
        id: 2,
        name: "Sales",
        value: "Sales",
        checked: false 
      },
      {
        id: 3,
        name: "Finance",
        value: "Finance",
        checked: false  
      },
      {
        id: 4,
        name: "Engineer",
        value: "Engineer",
        checked: false
      },
      {
        id: 5,
        name: "Other",
        value: "Other",
        checked: false 
      }
    ]
  
    /**
     * Creates the object of employee form on submit 
     * @param fb FormBulider object
     */
    constructor(private formBuilder: FormBuilder, 
                private httpService: HttpService, 
                private router: Router,
                private dataService: DataService, 
                private activatedRoute: ActivatedRoute,
                private snackBar: MatSnackBar) {
      this.employeeFormGroup = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
        profilePic: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        department: this.formBuilder.array([], [Validators.required]),
        salary: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        note: new FormControl('', [Validators.required]) 
      })
    }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe(employee => {
        if(Object.keys(employee).length !== 0) {
          console.log(employee);
          this.employeeFormGroup.get('name').setValue(employee.name);
          this.employeeFormGroup.get('profilePic').setValue(employee.profilePic);
          this.employeeFormGroup.get('gender').setValue(employee.gender);
          this.employeeFormGroup.get('salary').setValue(employee.salary);
          this.employeeFormGroup.get('startDate').setValue(employee.startDate);
          this.employeeFormGroup.get('note').setValue(employee.note);
          const department: FormArray = this.employeeFormGroup.get('department') as FormArray;
          employee.department.forEach(departmentElement => {
            for (let index = 0; index < this.departments.length; index++) {
              if(this.departments[index].name === departmentElement) {
                this.departments[index].checked = true;
                department.push(new FormControl(this.departments[index].value));
              }
            }
          })
        }
      });
    }
  }

  
  /**
   * On change event for checkbox. In this we can select multiple checkobox 
   * for department and store is as an array.
   * @param event 
   */
   onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }

  /**
   * To read Salary value from slider
   */
   salary: number = 400000;
   updateSetting(event) {
     this.salary = event.value;
   }
 
   formatLabel(value: number) {
     if (value >= 1000) {
       return Math.round(value / 1000) + 'k';
     }
     return value;
   }

  onSubmit(){
    if(this.employeeFormGroup.invalid){
      if(this.employeeFormGroup.get('profilePic').untouched) {
        this.snackBar.open('Select the Profile Pic', '', {duration: 4000, verticalPosition: 'top'});
      }
      if(this.employeeFormGroup.get('gender').untouched) {
        this.snackBar.open('Select the Gender', '', {duration: 4000, verticalPosition: 'top'});
      }
      if(this.employeeFormGroup.get('department').value.length == 0) {
            this.snackBar.open('Deparment needs to be filled!', '', {duration: 4000, verticalPosition: 'top'});
      }
    } else{
      this.employee = this.employeeFormGroup.value;
      if(this.activatedRoute.snapshot.params['id'] != undefined){
        this.httpService.updateEmployeData(this.activatedRoute.snapshot.params['id'], this.employee).subscribe(response => {
          console.log(response);
          this.ngOnInit();
          this.router.navigateByUrl("/home");
          this.snackBar.open('Updated Successfully!', 'OK', {duration: 4000, verticalPosition: 'top'});
        });
      }else {
        this.httpService.addEmployeeData(this.employee).subscribe(response => {
          console.log(response);
          this.router.navigateByUrl("/home");
          this.snackBar.open('Employee Added Successfully!', 'OK', {duration: 4000, verticalPosition: 'top'});
        });
      }
    }
  }
}