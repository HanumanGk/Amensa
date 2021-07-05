import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../api-service.service';
import { CrudService } from '../../../../crud.service';
import { ApiResponse } from '../../../../interfaces/api-response';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.scss']
})
export class AllReportsComponent implements OnInit {
  listAppointment: any = {};

  constructor(private apiService:ApiServiceService,private crud:CrudService) { }

  ngOnInit(): void {
    this.getAllAppointment();
  }
  getAllAppointment(){
    this.apiService.getallAppointmentsData().subscribe(
      (res: ApiResponse) => {
        console.log("New Update Today Data=>",res);
          this.listAppointment = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  reportInvoice(testId){
    this.crud.postData("Mastertest/reportInvoicePrint",testId).subscribe(
      (res: ApiResponse) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
