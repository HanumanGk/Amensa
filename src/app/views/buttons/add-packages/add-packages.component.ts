import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ApiServiceService } from "../../../api-service.service";
import { CrudService } from "../../../crud.service";
import { ApiResponse } from "../../../interfaces/api-response";

@Component({
  selector: "app-add-packages",
  templateUrl: "./add-packages.component.html",
  styleUrls: ["./add-packages.component.scss"],
})
export class AddPackagesComponent implements OnInit {
  addPackages: FormGroup;
  testscheck: {};
  states: any = [];
  success_msg: boolean;
  listLabs: any;
  listTest: any;
  listPackages: any;
  list: any[];

  players = [
    {id: 1, playerName: 'Cristiano Ronaldo'},
    {id: 2, playerName: 'Lionel Messi'},
    {id: 3, playerName: 'Neymar Jr'},
    {id: 4, playerName: 'Toni Kroos'},
    {id: 5, playerName: 'Luiz Suarez', disabled: true},
    {id: 6, playerName: 'Karim Benzema'},
    {id: 7, playerName: 'Eden Hazard'},
  ];
  selected = [
  ];

  constructor(
    private crud: CrudService,
    private fb: FormBuilder,
    private apiService: ApiServiceService
  ) {
    this.addPackages = fb.group({
      package_name: new FormControl(),
      test_id: new FormControl(),
      lab_id: new FormControl(),
      b2b: new FormControl(),
      status: new FormControl(),
    });
    this.addPackages = fb.group({
      package_name: ["", Validators.compose([Validators.required])],
      test_id: ["", Validators.compose([Validators.required])],
      package_price: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      b2b: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      lab_id: ["", Validators.compose([Validators.required])],
      status: ["", Validators.compose([Validators.required])],
    });
  }


  ngOnInit() {
    this.getTestList();
    this.getPackageList();
    this.getLablist();
  }
  async getTestList(){
      let response = await this.crud.select("Mastertest/getTestlist").toPromise();
      this.listTest = response['data'];
      console.log("Data set",response['data'])

    // this.crud.select("Mastertest/getTestlist").subscribe( (res: ApiResponse) => {
    //     this.listTest = res.data
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
  getPackageList() {
    this.crud.select("Mastertest/getPackages").subscribe(
      (res: ApiResponse) => {
        // console.log(res.data);
        this.listPackages = [];
        // console.log(this.listContainer);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getLablist() {
    this.apiService.getLabsData().subscribe(
      (res: ApiResponse) => {
        this.listLabs = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    let formData = this.addPackages.value;
    formData.package_name = this.addPackages.get("package_name").value;
    formData.package_price = this.addPackages.get("package_price").value;
    formData.test_id = this.addPackages.get("test_id").value;
    formData.lab_id = this.addPackages.get("lab_id").value;
    formData.b2b = this.addPackages.get("b2b").value;
    formData.status = this.addPackages.get("status").value;
    console.log(formData);

    this.crud.postData("Mastertest/addPackages", formData).subscribe(
      (res) => {
        console.log(res);

        this.success_msg = true;
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deletePackages(testId) {
    console.log(testId);
    this.crud.deleteData("Mastertest/deletePackages/", testId).subscribe(
      (res) => {
        this.ngOnInit();
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onNameSearch(value) {
    if (value !== "") {
      this.listPackages = this.listPackages.filter(
        (row) => row.package_name.toLowerCase().indexOf(value) > -1
      );
    } else {
      this.getPackageList();
    }
  }

  onSamplesSearch(value) {
    if (value !== "") {
      this.listPackages = this.listPackages.filter(
        (row) => row.name.toLowerCase().indexOf(value) > -1
      );
    } else {
      this.getPackageList();
    }
  }

  onPriceSearch(value) {
    if (value !== "") {
      this.listPackages = this.listPackages.filter(
        (row) => row.package_price.toLowerCase().indexOf(value) > -1
      );
    } else {
      this.getPackageList();
    }
  }
}
