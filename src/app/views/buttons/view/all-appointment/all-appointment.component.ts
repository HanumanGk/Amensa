import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../../../api-service.service';
import { CrudService } from '../../../../crud.service';
import { ApiResponse } from '../../../../interfaces/api-response';

@Component({
  selector: 'app-all-appointment',
  templateUrl: './all-appointment.component.html',
  styleUrls: ['./all-appointment.component.scss']
})
export class AllAppointmentComponent implements OnInit {
  listAppointment: any;
  pname = '';
  adminLogin:any;
  constructor(private apiService:ApiServiceService,private crud:CrudService,private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAppointment();
    let u = JSON.parse(localStorage.getItem('u'));
    if(u.role == 0){
      this.adminLogin = true;
    }else{
      this.adminLogin = false;
    }

  }
  getAllAppointment(){
    this.apiService.getallAppointmentsData().subscribe(
      (res: ApiResponse) => {
          this.listAppointment = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  deleteTest(testId){
    console.log(testId)
    this.crud.deleteData("Mastertest/deletebookTest/",testId).subscribe(
      (res: ApiResponse) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      },
    );
  }

  statusUpdateGenerated(testId){
    this.crud.postData("Mastertest/statusUpdateGenerated",testId).subscribe(
      (res: ApiResponse) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      },
    );
  }
  statusUpdateProcessing(testId){
    this.crud.postData("Mastertest/statusUpdateProcessing",testId).subscribe(
      (res: ApiResponse) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      },
    );
  }

}
