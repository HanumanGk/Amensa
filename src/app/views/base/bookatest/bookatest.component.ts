import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "../../../api-service.service";
import { TagModel } from "ngx-chips/core/accessor";
import { Observable } from "rxjs";
import { CrudService } from "../../../crud.service";
import { ApiResponse } from "../../../interfaces/api-response";

@Component({
  selector: "app-bookatest",
  templateUrl: "./bookatest.component.html",
  styleUrls: ["./bookatest.component.scss"],
})
export class BookatestComponent implements OnInit {
  appointmentBook: FormGroup;
  selectedTagItems = [];
  selectedPackageItems = [];
  states: any = [];
  success_msg: boolean;
  listLabs: any = [];
  listPackages: any = [];
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
      lab_id: new FormControl(),
      total_amount: new FormControl(),
      final_amount: new FormControl(),
      package_id: new FormControl(),
      mobile: new FormControl(),
      labid: new FormControl(),

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
      lab_id: ["", Validators.compose([Validators.required])],
      total_amount: ["", Validators.compose([Validators.required])],
      final_amount: ["", Validators.compose([Validators.required])],
      package_id: ["", Validators.compose([Validators.required])],
      mobile: ["", Validators.compose([Validators.required])],
      labid: ["", Validators.compose([Validators.required])],

    });
  }

  ngOnInit() {
    this.getContainerlist();
    this.getTestList();
    this.getLabDetails();
    this.getLastTestId();
    this.getFranchiseeList();
    this.getSessionDetails();
    this.getPackageList();
  }
  getSessionDetails() {
    let u = JSON.parse(localStorage.getItem("u"));
    this.appointmentBook.patchValue({
      franchisee_name: u.id ? u.id : "",
    });
  }
  getLabDetails() {
    this.activated.params.subscribe((params) => {
      const test_id = params["id"];
      this.apiService
        .getLabsSingleData(test_id)
        .subscribe((res: ApiResponse) => {
          console.log("Labid",res.data[0].id);
          this.appointmentBook.patchValue({
            labid: res.data[0].id ? res.data[0].id : "",
          });
          this.labDetails = res.data;
        });
    });
  }
  getLastTestId() {
    this.crud.select("Mastertest/getLastTestId").subscribe(
      (res: ApiResponse) => {
        // this.lastTestId = res.data;
        this.appointmentBook.patchValue({
          pid: res.data ? res.data : "",
        });
      },
      (err) => {
        console.log(err);
      }
    );
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
  getTestList() {
    this.crud.select("Mastertest/getTestlist").subscribe(
      (res: ApiResponse) => {
        this.listLabs = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPackageList() {
    this.crud.select("Mastertest/getPackageslist").subscribe(
      (res: ApiResponse) => {
        this.listPackages = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onItemAdded(e) {
    this.selectedReports.push(e);
    const id = 1;
    this.apiService.getSearchedTestLabs(e.id, 1).subscribe((res: any) => {
      const data = res.data[0];
      data.reportFor = [];
      // data.reportTotal = [];
      const isExist = this.testTableData.filter(
        (x) => x.samples === data.samples
      );
      // const mrpIndex = this.testTableData.findIndex(
      //   (x) => x.samples === data.samples
      // );
      // this.appointmentBook.patchValue({
      //   total_amount: data.mrp ? data.mrp : ''
      // });
      // data.reportTotal.push(data.mrp);
      // this.testTableData[mrpIndex].reportTotal.push(data.mrp);
      // console.log(this.testTableData[mrpIndex].reportTotal.push(data.mrp))

      if (isExist.length === 0) {
        data.reportFor.push(e.id);
        this.testTableData.push(data);
      } else {
        const objIndex = this.testTableData.findIndex(
          (x) => x.samples === data.samples
        );
        this.testTableData[objIndex].reportFor.push(e.id);
      }
      this.getTotal();
    });
  }
  onItemRemoved(e) {
    const objIndex = this.testTableData.findIndex(
      (x) => x.samples === e.samples
    );
    if (this.testTableData[objIndex].reportFor.length > 1) {
      const reportFor = this.testTableData[objIndex].reportFor;
      const reportForIndex = reportFor.findIndex((x) => x === e.id);
      this.testTableData[objIndex].reportFor.splice(reportForIndex, 1);
    } else {
      this.testTableData.splice(objIndex, 1);
    }
    this.getTotal();
  }

  getTotal() {
    let sum: number = 0;
    if (this.testTableData.length) {
      console.log(this.testTableData);
      // sum = this.testTableData
      //   .map((a) => a.mrp)
      //   .reduce(function (a, b) {

      //     return Number(a) + Number(b);
      //   });
      sum = this.testTableData.reduce(
        (subtotal, item) => Number(subtotal) + Number(item.mrp) * item.reportFor.length,
        0
      );
      console.log(sum);
    }
    this.appointmentBook.patchValue({
      total_amount: sum,
    });
  }

  // Packages Section---
  onPackageAdded(e) {
    this.selectedReports.push(e);
    const id = 1;
    this.apiService.getSearchedPackageLabs(e.id, id).subscribe((res: any) => {
      console.log("packages Data",res.data[0])
      const data = res.data[0];
      data.reportFor = [];
      const isExist = this.testTableData.filter(
        (x) => x.package_name === data.package_name
      );
      if (isExist.length === 0) {
        data.reportFor.push(e.id);
        this.testTableData.push(data);
      } else {
        const objIndex = this.testTableData.findIndex(
          (x) => x.package_name === data.package_name
        );
        this.testTableData[objIndex].reportFor.push(e.id);
      }
      this.getTotal();
    });
  }
  onPackageRemoved(e) {
    const objIndex = this.testTableData.findIndex(
      (x) => x.package_name === e.package_name
    );
    if (this.testTableData[objIndex].reportFor.length > 1) {
      const reportFor = this.testTableData[objIndex].reportFor;
      const reportForIndex = reportFor.findIndex((x) => x === e.id);
      this.testTableData[objIndex].reportFor.splice(reportForIndex, 1);
    } else {
      this.testTableData.splice(objIndex, 1);
    }
    this.getTotal();
  }

  onSubmit() {
    console.log("BeforData", this.appointmentBook);
    let formData = this.appointmentBook.value;

    formData.franchisee_name =
      this.appointmentBook.get("franchisee_name").value;
    formData.franchisee_center =
      this.appointmentBook.get("franchisee_center").value;
    formData.pid = this.appointmentBook.get("pid").value;
    formData.pname = this.appointmentBook.get("pname").value;
    formData.age = this.appointmentBook.get("age").value;
    formData.month = this.appointmentBook.get("month").value;
    formData.day = this.appointmentBook.get("day").value;
    formData.mobile = this.appointmentBook.get("mobile").value;
    formData.hospital_name = this.appointmentBook.get("hospital_name").value;
    formData.doctor_name = this.appointmentBook.get("doctor_name").value;
    formData.emailid = this.appointmentBook.get("emailid").value;
    formData.lab_id = this.appointmentBook.get("lab_id").value;
    formData.package_id = this.appointmentBook.get("package_id").value;
    formData.total_amount = this.appointmentBook.get("total_amount").value;
    formData.final_amount = this.appointmentBook.get("final_amount").value;
    formData.labid = this.appointmentBook.get("labid").value;
    console.log("submitData", formData);

    this.crud.postData("Mastertest/addAppointment", formData).subscribe(
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
