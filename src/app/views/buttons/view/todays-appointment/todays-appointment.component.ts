import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../api-service.service';
import { ApiResponse } from '../../../../interfaces/api-response';

@Component({
  selector: 'app-todays-appointment',
  templateUrl: './todays-appointment.component.html',
  styleUrls: ['./todays-appointment.component.scss']
})
export class TodaysAppointmentComponent implements OnInit {
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
