import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiServiceService } from '../../../api-service.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {
  emailStatus: any = [];
  type: any;
  profileData:any ={};
  taskData: {};
  listLabs:any = {};
  listContainer: any ={}
  success_msg: boolean;
  editTests: FormGroup;
  branches: any = {};
  locationData: any = [];
  userid: any = {};
  userData: any = {};
  testscheck: any = {};
  listTest: any = {};
  constructor(private fb:FormBuilder,private apiService:ApiServiceService,private activated:ActivatedRoute,private router:Router) {
    this.editTests = new FormGroup({
      test_name: new FormControl('', Validators.required),
      sample_name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }


  ngOnInit() {
    this.getLablist();
    this.getConatinerlist()

    this.activated.params.subscribe(params => {
          const test_id = params['id'];
    // this.userid = localStorage.token.split('.');
    this.apiService.getTestSingleData(test_id).subscribe(
      (res: ApiResponse) => {
        console.log(res);
          this.profileData = res.data;
          this.editTests.setValue({
            // test_id: this.profileData[0].id ? this.profileData[0].id : '',
            test_name: this.profileData[0].test_name ? this.profileData[0].test_name : '',
            sample_name: this.profileData[0].samples ? this.profileData[0].samples : '',
            status: this.profileData[0].status ? this.profileData[0].status : ''
          });

          console.log('Full profile data: ', this.profileData);
      },
      err => {
        console.log(err);
      }
    );
  });

  }

  testAlredyExist = "";
  testCheckUnique() {
this.apiService.testCheckUnique(this.editTests.controls['test_name'].value).subscribe(res => {
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
  onSubmit(){
    this.activated.params.subscribe(params => {
          const test_id = params['id'];
      let formData = this.editTests.value;
      console.log(formData);
      formData.test_id = test_id;
      formData.test_name = this.editTests.get('test_name').value;
      formData.sample_name = this.editTests.get('sample_name').value;
      formData.status = this.editTests.get('status').value;
      console.log(formData);

      this.apiService.updateTest(formData).subscribe(
        res => {
          this.success_msg = true;
          console.log(res);
          // this.ngOnInit();
          this.router.navigate(['/test/managetest']);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
