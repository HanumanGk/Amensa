import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../../api-service.service';
import { CrudService } from '../../../crud.service';
import { TagModel } from "ngx-chips/core/accessor";
import { Observable } from "rxjs";
import { ApiResponse } from '../../../interfaces/api-response';
import { TagInputComponent } from 'ngx-chips';

@Component({
  selector: 'app-labcomparision',
  templateUrl: './labcomparision.component.html',
  styleUrls: ['./labcomparision.component.scss']
})
export class LabcomparisionComponent implements OnInit{
  filterOption: string = 'all';
  selectedTagItems = [];
  @ViewChild('myname') input:ElementRef;
  @ViewChild('username') inputTestid: TagInputComponent;
  searchValue: string = '';
  labsTest: any = [];
  labsList: any = [];
  selectedReports: any = [];
  testTableData: any = [];
  newArray: any = [];
  newIds: any = [];

  items = [{
    project: 'THYROCARE',
    type: 'ionic',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Thyrocare_Logo.png'
  }, {
    project: 'METROPOLIS',
    type: 'angular',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Metropolis_Healthcare_Logo.png'
  }, {
    project: 'H S PATHOLOGY',
    type: 'angular',
    image: 'https://www.hsppl.com/Images/logonew.jpg'
  }, {
    project: 'GENERAL DIAGONOSTICS',
    type: 'react',
    image: 'https://www.preventine.org/Images/PreventineLogo.png'
  }];

  filteredItems = [];
  constructor(private apiService:ApiServiceService,private crud:CrudService) {
    this.updateResults();
   }

   ngOnInit() {
    this.getTestList();
    this.getLabList();
  }
  async updateResults() {
    this.filteredItems = this.filterByOption(this.searchByValue(this.items));
  }


  getTestList() {
    this.crud.select("Mastertest/getTestlist").subscribe(
      (res: ApiResponse) => {
        this.labsTest = res.data;
        // console.log(this.labsTest)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getLabList() {
    this.crud.select("Mastertest/getLablist").subscribe(
      (res: ApiResponse) => {
        this.labsList = res.data;
        // console.log(this.labsTest)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onItemAdded(e) {
    this.newArray = [];
    this.newIds = [];
    this.inputTestid.items.forEach(element => {
        this.newArray.push(element['id']);
      });
    this.selectedReports.push(e);
    const id = this.input.nativeElement.value
    this.newIds.push(id);
    var mergeData = this.newArray.concat(this.newIds);
    this.apiService.getSearchedTestLabsall(mergeData).subscribe((res: any) => {
        this.testTableData = [];
      this.testTableData.push(res.data);
    });
  }
  onItemRemoved(e) {
    this.onItemAdded(e);
    // const objIndex = this.testTableData.findIndex(
    //   (x) => x.samples === e.samples
    // );
    // if (this.testTableData[objIndex].reportFor.length > 1) {
    //   const reportFor = this.testTableData[objIndex].reportFor;
    //   const reportForIndex = reportFor.findIndex(
    //     (x) => x === e.id
    //   );
    //   this.testTableData[objIndex].reportFor.splice(reportForIndex, 1);
    // }else{
    //   this.testTableData.splice(objIndex, 1);
    // }
  }

  searchByValue(items) {
    return items.filter(item => {
      if (this.searchValue.trim() === '') {
        console.log()
        return true;
      } else {
        // this.getTestList()
        // alert(22)
        console.log("New Search")
        return this.labsList.toLowerCase().includes(this.searchValue.trim().toLocaleLowerCase()) || this.labsList.toLowerCase().includes(this.searchValue.trim().toLocaleLowerCase());
      }
    })
  }

  filterByOption(items) {
    return items.filter(item => {
      if (this.filterOption === 'all' || this.filterOption === this.labsList.data) {
        return true;
      }
    })
  }

}
