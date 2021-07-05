import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';
import { CrudService } from '../../../crud.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.scss']
})
export class EditContainerComponent implements OnInit {
  editContainer: FormGroup;
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

  constructor(private crud: CrudService,
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private activated: ActivatedRoute,
    private router:Router) {
      this.editContainer = fb.group({
        container_name: new FormControl(),
        // lab_id: new FormControl(),
        status: new FormControl(),
      });
      this.editContainer = fb.group({
        container_name: ["", Validators.compose([Validators.required])],
        cid: ["", Validators.compose([Validators.required])],
        // lab_id: ["", Validators.compose([Validators.required])],
        status: ["", Validators.compose([Validators.required])],
      });
     }

     async ngOnInit() {
      this.crud.select("Mastertest/getTestlist").subscribe(
        (res: ApiResponse) => {
          this.listTests = res.data;
          console.log(res.data);
          this.getData();
        },
        (err) => {
          console.log(err);
        },
      );


    }

    getData(){
      this.activated.params.subscribe((params) => {
        const test_id = params["id"];
        // this.userid = localStorage.token.split('.');
        this.crud
          .getSingleData("Mastertest/getSingleContainers/", test_id)
          .subscribe(
            (res: ApiResponse) => {
              console.log(res);
              this.profileData = res.data;
              this.selectedCar = this.profileData[0].lab_id;
              console.log('val=>>',this.profileData[0].container_name);
              this.editContainer.patchValue({
                container_name: this.profileData[0].container_name
                  ? this.profileData[0].container_name
                  : "",
                cid: this.profileData[0].id ? this.profileData[0].id : "",
                status: this.profileData[0].status
                  ? this.profileData[0].status
                  : "",
              });

              // this.editContainer.controls.lab_id.patchValue(["1", "7"])
              // this.tests.setValue([this.profileData[0].lab_id]);
              console.log("Full profile data: ", this.profileData);
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

    onCountryChange(event) {
      console.log(event);

      // if(event.length > 0){
      //   this.data = {
      //     type: 'state',
      //     country_id: event[event.length-1].id
      //   }
      // console.log(this.data)
      // this.crud.select('Mastertest/getTestlist',this.data).subscribe(
      //   (res)=>{
      //     console.log(res);
      //     this.states = [
      //       ...this.states,
      //       ...res['data']
      //     ]
      //   },
      //   (err)=>{
      //     console.log(err);
      //   }
      // )
      // }
    }

    // onCountryRemove(event) {
    //   this.states = this.states.filter(item => item.country_id !== event.value.id);
    //   this.cities = this.cities.filter(item => item.country_id !== event.value.id);
    //   this.formBrief3.patchValue({
    //     'state': this.formBrief3.get('state').value.filter(item => item.country_id !== event.value.id),
    //     'city': this.formBrief3.get('city').value.filter(item => item.country_id !== event.value.id)
    //   })
    // }

    onSubmit() {
      let formData = this.editContainer.value;
      formData.cid = this.editContainer.get("cid").value;
      formData.container_name = this.editContainer.get("container_name").value;
      // formData.lab_id = this.editContainer.get('lab_id').value;
      formData.status = this.editContainer.get("status").value;
      console.log(formData);

      this.crud.postData("Mastertest/editContainers", formData).subscribe(
        (res) => {
          console.log(res);

          this.success_msg = true;
          // console.log(res);
          this.ngOnInit();
          this.router.navigate(['/container/managecontainer']);
        },
        (err) => {
          console.log(err);
        }
      );
    }

}
