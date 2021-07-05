import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';
import { CrudService } from '../../../crud.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appointmentBook: FormGroup;
  selectedTagItems = [];
  selectedPackageItems = [];
  states: any = [];
  success_msg: boolean;
  profileData: any = {};
  listLabs: any = [];
  Franchiseelist: {};
  listContainer: {};
  labDetails: any[];
  lastTestId: any[];
  selectedReports: any = [];
  testTableData: any = [];
  testid: any = [];
  constructor(
    private crud: CrudService,
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private activated: ActivatedRoute,
    private router: Router // private cd: ChangeDetectorRef
  ) {
    this.appointmentBook = fb.group({
      franchisee_name: new FormControl(),
      franchisee_center: new FormControl(),
      pid: new FormControl(),
      pname: new FormControl(),
      age: new FormControl(),
      month: new FormControl(),
      day: new FormControl(),
      hospital_name: new FormControl(),
      doctor_name: new FormControl(),
      emailid: new FormControl(),
      sampleid: new FormControl(),
      // total_amount: new FormControl(),
      // final_amount: new FormControl(),
      // package_id: new FormControl(),
      mobile: new FormControl(),
    });
    this.appointmentBook = fb.group({
      franchisee_name: ["", Validators.compose([Validators.required])],
      franchisee_center: ["", Validators.compose([Validators.required])],
      pid: ["", Validators.compose([Validators.required])],
      pname: ["", Validators.compose([Validators.required])],
      age: ["", Validators.compose([Validators.required])],
      month: [""],
      day: [""],
      hospital_name: ["", Validators.compose([Validators.required])],
      doctor_name: ["", Validators.compose([Validators.required])],
      emailid: ["", Validators.compose([Validators.required])],
      sampleid: ["", Validators.compose([Validators.required])],
      // total_amount: ["", Validators.compose([Validators.required])],
      // final_amount: ["", Validators.compose([Validators.required])],
      // package_id: ["", Validators.compose([Validators.required])],
      mobile: ["", Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.fetchEditData();
    this.getContainerlist();
    this.getTestList();
    this.getFranchiseeList();
    this.getSessionDetails();
  }
  fetchEditData()
  {
    this.activated.params.subscribe(params => {
      const test_id = params['id'];
      // this.userid = localStorage.token.split('.');
      this.apiService.getSamplesSingleData(test_id).subscribe(
        (res: ApiResponse) => {
          // console.log("Editedt Data",res);
            this.profileData = res.data;

            this.appointmentBook.setValue({
              sampleid: this.profileData[0].id ? this.profileData[0].id : '',
              franchisee_name: this.profileData[0].franchisee_name ? this.profileData[0].franchisee_name : '',
              franchisee_center: this.profileData[0].franchisee_center ? this.profileData[0].franchisee_center : '',
              pid: this.profileData[0].pid ? this.profileData[0].pid : '',
              pname: this.profileData[0].pname ? this.profileData[0].pname : '',
              age: this.profileData[0].age ? this.profileData[0].age : '',
              month: this.profileData[0].month ? this.profileData[0].month : '',
              day: this.profileData[0].day ? this.profileData[0].day : '',
              mobile: this.profileData[0].mobile ? this.profileData[0].mobile : '',
              hospital_name: this.profileData[0].hospital_name ? this.profileData[0].hospital_name : '',
              doctor_name: this.profileData[0].doctor_name ? this.profileData[0].doctor_name : '',
              emailid: this.profileData[0].emailid ? this.profileData[0].emailid : ''
              // total_amount: this.profileData[0].status ? this.profileData[0].status : ''

            });
            this.apiService
              .getLabsSingleData(this.profileData[0].lab_id)
              .subscribe((ress: ApiResponse) => {
                // console.log("Testinbg",ress);
                this.labDetails = ress.data;
              });
            // console.log('Full profile data: ', this.profileData);
        },
        err => {
          console.log(err);
        }
      );
      });
  }
  getSessionDetails() {
    let u = JSON.parse(localStorage.getItem("u"));
    this.appointmentBook.patchValue({
      franchisee_name: u.id ? u.id : "",
    });
  }
  getFranchiseeList() {
    this.crud.select("Mastertest/getFranchiseelist").subscribe(
      (res: ApiResponse) => {
        this.Franchiseelist = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getContainerlist() {
    this.crud.select("Mastertest/getContainers").subscribe(
      (res: ApiResponse) => {
        this.listContainer = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getTestList()
  {
    this.activated.params.subscribe(params => {
      const test_id = params['id'];
      this.apiService.getEditedBookSingleData(test_id).subscribe(
        (res: ApiResponse) => {
          // console.log("New Edited Data",res.data)
          this.listLabs = res.data;
            });
        },
        err => {
          console.log(err);
        }
      );
  }

  onSubmit() {
    console.log("BeforData", this.appointmentBook);
    let formData = this.appointmentBook.value;

    formData.franchisee_name =
      this.appointmentBook.get("franchisee_name").value;
    formData.franchisee_center =
      this.appointmentBook.get("franchisee_center").value;
    formData.pname = this.appointmentBook.get("pname").value;
    formData.age = this.appointmentBook.get("age").value;
    formData.month = this.appointmentBook.get("month").value;
    formData.day = this.appointmentBook.get("day").value;
    formData.mobile = this.appointmentBook.get("mobile").value;
    formData.hospital_name = this.appointmentBook.get("hospital_name").value;
    formData.doctor_name = this.appointmentBook.get("doctor_name").value;
    formData.emailid = this.appointmentBook.get("emailid").value;
    formData.sampleid = this.appointmentBook.get("sampleid").value;

    this.crud.postData("Mastertest/updateAppointment", formData).subscribe(
      (res) => {
        this.success_msg = true;
        this.router.navigate(["/appointment/allAppointment"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
