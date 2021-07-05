import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiServiceService } from '../../../api-service.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrls: ['./manage-test.component.scss']
})
export class ManageTestComponent implements OnInit {
  emailStatus: any = [];
  type: any;
  unamePattern: String = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  profileData: any = {};
  environ: boolean = environment.development;
  success_msg:boolean;
  data: any = {
    type: 'country'
  };
  addTests: FormGroup;
  userid: any = {};
  userData: any = {};
  testscheck: any = {};
  listTest: any = {};
  listLabs:any = {};
  listContainer:any = {};
  dataBK:any = {};
  constructor(private apiService:ApiServiceService,private router:Router) {
    this.addTests = new FormGroup({
      test_name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      b2b: new FormControl('', Validators.required),
      lab_id: new FormControl('', Validators.required),
      sample_name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.getTestlist();
    this.getLablist();
    this.getConatinerlist()
  }
  getTestlist(){
    this.apiService.getTestData().subscribe(
      (res: ApiResponse) => {
          this.listTest = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  getLablist(){
    this.apiService.getLabsData().subscribe(
      (res: ApiResponse) => {
          this.listLabs = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getConatinerlist(){
    this.apiService.getContainerData().subscribe(
      (res: ApiResponse) => {
          this.listContainer = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  testAlredyExist = "";
  testCheckUnique() {
this.apiService.testCheckUnique(this.addTests.controls['test_name'].value).subscribe(res => {
  this.testscheck = res;
  // console.log(this.testscheck.status);
  if (this.testscheck.status == 'failure') {
    this.testAlredyExist = "Test Name Alredy Exist";
  }
  else{
    this.testAlredyExist = "";
  }
});
}
  onSubmit(){
    let formData = this.addTests.value;
    formData.test_name = this.addTests.get('test_name').value;
    formData.price = this.addTests.get('price').value;
    formData.b2b = this.addTests.get('b2b').value;
    formData.lab_id = this.addTests.get('lab_id').value;
    formData.sample_name = this.addTests.get('sample_name').value;
    formData.status = this.addTests.get('status').value;
    console.log(formData);

    this.apiService.addTestmaster(formData).subscribe(
      res => {
        // console.log(res);

        this.success_msg = true;
        console.log(res);
        this.ngOnInit();
        // this.router.navigate(['/manageTest']);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteTest(testId) {
    console.log(testId)
    this.apiService.deleteTestData(testId).subscribe(
      res => {
        this.ngOnInit();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

onNameSearch(value) {
  if(value !== ''){
    this.listTest = this.listTest.filter(row => row.test_name.toLowerCase().indexOf(value) > -1);
  }else{
    this.getTestlist();
  }
}
onSamplesSearch(value) {
  if(value !== ''){
    this.listTest = this.listTest.filter(row => row.samples.toLowerCase().indexOf(value) > -1);
  }else{
    this.getTestlist();
  }
}
}
