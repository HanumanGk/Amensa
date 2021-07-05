import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';
import { CrudService } from '../../../crud.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-manage-container',
  templateUrl: './manage-container.component.html',
  styleUrls: ['./manage-container.component.scss']
})
export class ManageContainerComponent implements OnInit {
  addContainer:FormGroup
  testscheck: {};
  states: any = [];
  success_msg:boolean;
  listLabs: {};
  listContainer: {};

  constructor(
    private crud: CrudService,
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private activated: ActivatedRoute) {
      this.addContainer=fb.group({
        container_name:new FormControl(),
        status:new FormControl(),
        });
      this.addContainer= fb.group({

        container_name:['',Validators.compose([Validators.required])],
        status:['',Validators.compose([Validators.required])]
      });
     }

     ngOnInit() {
      this.crud.select('Mastertest/getContainers').subscribe(
        (res: ApiResponse) => {
          // console.log(res.data);
            this.listContainer = res.data;
            // console.log(this.listContainer);
        },
        err => {
          console.log(err);
        }
      );

      this.crud.select('Mastertest/getTestlist').subscribe(
        (res: ApiResponse) => {
          // console.log(res.data);
            this.listLabs = res.data;
            // console.log(this.listLabs);
        },
        err => {
          console.log(err);
        }
      );
    }

    testAlredyExist = "";
    testCheckUnique() {
  this.apiService.testCheckUnique(this.addContainer.controls['container_name'].value).subscribe(res => {
    this.testscheck = res;
    // console.log(this.testscheck.status);
    // if (this.testscheck.status == 'failure') {
    //   this.testAlredyExist = "Test Name Alredy Exist";
    // }
    // else{
    //   this.testAlredyExist = "";
    // }
  });
  }
    onSubmit(){
      let formData = this.addContainer.value;
      formData.test_name = this.addContainer.get('container_name').value;
      formData.status = this.addContainer.get('status').value;
      // console.log(formData);

      this.crud.postData('Mastertest/addContainers',formData).subscribe(
        res => {
          // console.log(res);

          this.success_msg = true;
          // console.log(res);
          this.ngOnInit();
          // this.router.navigate(['/manageTest']);
        },
        err => {
          console.log(err);
        }
      );
    }

    deleteConatiner(testId) {
      console.log(testId)
      this.crud.deleteData('Mastertest/deleteContainers/',testId).subscribe(
        res => {
          this.ngOnInit();
          // console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
}
