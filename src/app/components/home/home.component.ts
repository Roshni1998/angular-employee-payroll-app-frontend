import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-home',
  template: '<app-add [employeeData]="employee"></app-add>',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount: number = 0; 
  public employeeDetails: Employee[] = [];

  constructor(private httpService: HttpService, 
              private router: Router,
              private dataService: DataService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      //console.log(this.employeeDetails);
    } );
  }

  remove(id: number): void {
    this.httpService.deleteEmployeeData(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
      this.snackBar.open('Deleted Successfully!', '', {duration: 4000, verticalPosition: 'top'});
    });
  }

  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/add/' + employee.id);
    this.httpService.updateEmployeData(employee.id, employee).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }
}
