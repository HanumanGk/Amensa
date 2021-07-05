import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';
import { CrudService } from '../../../crud.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-edit-packages',
  templateUrl: './edit-packages.component.html',
  styleUrls: ['./edit-packages.component.scss']
})
export class EditPackagesComponent implements OnInit {
  editPackages: FormGroup;
  testscheck: {};
  // testsname: any = [];
  states: any = [];
  success_msg: boolean;
  listLabs: {};
  listContainer: {};
  listTests: {};
  selectedCar: any = [];
  profileData: {};
  tests = new FormControl();
  toppingList: string[] = [];

  constructor(
    private router:Router,
    private crud: CrudService,
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private activated: ActivatedRoute
  ) {
    this.editPackages = fb.group({
      pid:new FormControl(),
      package_name:new FormControl(),
      test_id:new FormControl(),
      package_price:new FormControl(),
      b2b:new FormControl(),
      lab_id:new FormControl(),
      status: new FormControl(),
    });
    this.editPackages = fb.group({
      pid: ["", Validators.compose([Validators.required])],
      package_name: ["", Validators.compose([Validators.required])],
      test_id: ["", Validators.compose([Validators.required])],
      package_price: ["", Validators.compose([Validators.required])],
      status: ["", Validators.compose([Validators.required])],
      b2b: ["", Validators.compose([Validators.required])],
      lab_id: ["", Validators.compose([Validators.required])],

    });
   }

   async ngOnInit() {
    this.crud.select("Mastertest/getTestlist").subscribe(
      (res: ApiResponse) => {
        this.listTests = res.data;
        // console.log("Old Testing",res.data);
        this.getData();
      },
      (err) => {
        console.log(err);
      },
    );
    this.getLablist()


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
  getData(){
    this.activated.params.subscribe((params) => {
      const test_id = params["id"];
      // this.userid = localStorage.token.split('.');
      this.crud
        .getSingleData("Mastertest/getSinglePackage/", test_id)
        .subscribe(
          (res: ApiResponse) => {
            this.profileData = res.data;
            this.editPackages.patchValue({
              package_name: this.profileData[0].package_name
                ? this.profileData[0].package_name
                : "",
              pid: this.profileData[0].id ? this.profileData[0].id : "",
              package_price: this.profileData[0].package_price ? this.profileData[0].package_price : "",
              lab_id: this.profileData[0].lab_id ? this.profileData[0].lab_id : "",
              b2b: this.profileData[0].b2b ? this.profileData[0].b2b : "",
              test_id: this.profileData[0].test_id
                ? this.profileData[0].test_id.split(',')
                : "",
              status: this.profileData[0].status
                ? this.profileData[0].status
                : "",
            });
            // console.log("Full profile data: ", this.profileData);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  filter(data) {
    console.log(data.value);
  }

  onSubmit() {
    let formData = this.editPackages.value;
    formData.pid = this.editPackages.get("pid").value;
    formData.package_name = this.editPackages.get("package_name").value;
    formData.package_price = this.editPackages.get("package_price").value;
    formData.test_id = this.editPackages.get('test_id').value;
    formData.b2b = this.editPackages.get('b2b').value;
    formData.lab_id = this.editPackages.get('lab_id').value;
    formData.status = this.editPackages.get("status").value;
    console.log("new Get Data",formData);

    this.crud.postData("Mastertest/editPackages", formData).subscribe(
      (res) => {
        console.log(res);

        this.success_msg = true;
        // console.log(res);
        // this.ngOnInit();
        this.router.navigate(['/package/addpackage']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
