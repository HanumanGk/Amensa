import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../api-service.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-view-labs',
  templateUrl: './view-labs.component.html',
  styleUrls: ['./view-labs.component.scss']
})
export class ViewLabsComponent implements OnInit {
  listLabs: any;
  constructor(private apiService:ApiServiceService) { }

  ngOnInit() {
    this.apiService.getLabsData().subscribe(
      (res: ApiResponse) => {
        console.log(res);
          this.listLabs = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  deletelabs(testId) {
    console.log(testId)
    this.apiService.deleteLabsData(testId).subscribe(
      res => {
        this.ngOnInit();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
