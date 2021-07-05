import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../api-service.service';
import { ApiResponse } from '../../../../interfaces/api-response';

@Component({
  selector: 'app-new-reports',
  templateUrl: './new-reports.component.html',
  styleUrls: ['./new-reports.component.scss']
})
export class NewReportsComponent implements OnInit {
  listAppointment: any = {};

  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.getAllAppointment();
  }
  getAllAppointment(){
    this.apiService.gettodayAppointmentData().subscribe(
      (res: ApiResponse) => {
        console.log("New Update Today Data=>",res);
          this.listAppointment = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
