import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpService } from '../../service/http.service';

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
      },
      {
        id: 2,
        name: "Sales",
        value: "Sales",
  
      },
      {
        id: 3,
        name: "Finance",
        value: "Finance",
  
      },
      {
        id: 4,
        name: "Engineer",
        value: "Engineer",
  
      },
      {
        id: 5,
        name: "Other",
        value: "Other",
  
      }
    ]
  
    /**
     * Creates the object of employee form on submit 
     * @param fb FormBulider object
     */
    constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
      this.employeeFormGroup = this.formBuilder.group({
        name: new FormControl(''),
        profilePic: new FormControl(''),
        gender: new FormControl(''),
        department: this.formBuilder.array([], [Validators.required]),
        salary: new FormControl(''),
        startDate: new FormControl(''),
        note: new FormControl('') 
      })
    }

  ngOnInit(): void {
    console.log(this.employee);
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

   onSubmit() {
     this.employee = this.employeeFormGroup.value;
     console.log(this.employeeFormGroup);
     console.log(this.employee);
     this.httpService.addEmployeeData(this.employee).subscribe(response => {
       console.log(response);
     })
  }
  
}
