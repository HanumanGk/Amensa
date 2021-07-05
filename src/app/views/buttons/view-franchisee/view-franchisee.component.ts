import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../api-service.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-view-franchisee',
  templateUrl: './view-franchisee.component.html',
  styleUrls: ['./view-franchisee.component.scss']
})
export class ViewFranchiseeComponent implements OnInit {
  listFranchisee: any = {};
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.getfranchisee();
  }

  getfranchisee(){
    this.apiService.getFranchiseeData().subscribe(
      (res: ApiResponse) => {
        console.log(res);
          this.listFranchisee = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteFranchisee(testId) {
    console.log(testId)
    this.apiService.deleteFranchiseeData(testId).subscribe(
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
