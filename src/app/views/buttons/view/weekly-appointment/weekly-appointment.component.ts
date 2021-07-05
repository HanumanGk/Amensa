import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../api-service.service';
import { ApiResponse } from '../../../../interfaces/api-response';

@Component({
  selector: 'app-weekly-appointment',
  templateUrl: './weekly-appointment.component.html',
  styleUrls: ['./weekly-appointment.component.scss']
})
export class WeeklyAppointmentComponent implements OnInit {

  listAppointment: any = {};
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.getweeklyAppointment();
  }
  getweeklyAppointment(){
    this.apiService.getweeklyAppointmentData().subscribe(
      (res: ApiResponse) => {
          this.listAppointment = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
