import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-edit-labs',
  templateUrl: './edit-labs.component.html',
  styleUrls: ['./edit-labs.component.scss']
})
export class EditLabsComponent implements OnInit {
  editLabs: FormGroup;
  success_msg:boolean;
  profileData: any = {};

  constructor(private apiService:ApiServiceService,private fb:FormBuilder,private router:Router,private activated:ActivatedRoute) {
    this.editLabs=fb.group({
      lab_name:new FormControl(),
      email:new FormControl(),
      lab_desc:new FormControl(),
      owner_name:new FormControl(),
      contact_number:new FormControl(),
      second_owner_name:new FormControl(),
      alt_contact_number:new FormControl(),
      pan_number:new FormControl(),
      gst_number:new FormControl(),
      dob:new FormControl(),
      address:new FormControl(),
      country:new FormControl(),
      state:new FormControl(),
      city:new FormControl(),
      pincode:new FormControl(),
      status:new FormControl(),
      });
    this.editLabs= fb.group({

      lab_name:['',Validators.compose([Validators.required])],
      lab_id:['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      lab_desc:['',Validators.compose([Validators.required])],
      owner_name:['',Validators.compose([Validators.required])],
      contact_number:['',Validators.compose([Validators.required,Validators.maxLength(11),Validators.minLength(10)])],
      second_owner_name:['',Validators.compose([Validators.required])],
      alt_contact_number:['',Validators.compose([Validators.required])],
      pan_number:['',Validators.compose([Validators.required])],
      gst_number:['',Validators.compose([Validators.required])],
      dob:['',Validators.compose([Validators.required])],
      address:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(10)])],
      country:['',Validators.compose([Validators.required])],
      state:['',Validators.compose([Validators.required])],
      city:['',Validators.compose([Validators.required])],
      pincode:['',Validators.compose([Validators.required])],
      status:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.activated.params.subscribe(params => {
      const test_id = params['id'];
// this.userid = localStorage.token.split('.');
this.apiService.getLabsSingleData(test_id).subscribe(
  (res: ApiResponse) => {
    console.log(res);
      this.profileData = res.data;
      this.editLabs.setValue({
        // test_id: this.profileData[0].id ? this.profileData[0].id : '',
        lab_name: this.profileData[0].lab_name ? this.profileData[0].lab_name : '',
        lab_id: this.profileData[0].id ? this.profileData[0].id : '',
        email: this.profileData[0].email ? this.profileData[0].email : '',
        lab_desc: this.profileData[0].lab_desc ? this.profileData[0].lab_desc : '',
        owner_name: this.profileData[0].owner_name ? this.profileData[0].owner_name : '',
        contact_number: this.profileData[0].contact_number ? this.profileData[0].contact_number : '',
        second_owner_name: this.profileData[0].second_owner_name ? this.profileData[0].second_owner_name : '',
        alt_contact_number: this.profileData[0].alt_contact_number ? this.profileData[0].alt_contact_number : '',
        dob: this.profileData[0].dob ? this.profileData[0].dob : '',
        address: this.profileData[0].address ? this.profileData[0].address : '',
        pan_number: this.profileData[0].pan_number ? this.profileData[0].pan_number : '',
        gst_number: this.profileData[0].gst_number ? this.profileData[0].gst_number : '',
        country: this.profileData[0].country ? this.profileData[0].country : '',
        state: this.profileData[0].state ? this.profileData[0].state : '',
        city: this.profileData[0].city ? this.profileData[0].city : '',
        pincode: this.profileData[0].pincode ? this.profileData[0].pincode : '',
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

  onSubmit(){
    let formData = this.editLabs.value;
    formData.lab_name = this.editLabs.get('lab_name').value;
    formData.lab_id = this.editLabs.get('lab_id').value;
    formData.email = this.editLabs.get('email').value;
    formData.lab_desc = this.editLabs.get('lab_desc').value;
    formData.owner_name = this.editLabs.get('owner_name').value;
    formData.contact_number = this.editLabs.get('contact_number').value;
    formData.second_owner_name = this.editLabs.get('second_owner_name').value;
    formData.alt_contact_number = this.editLabs.get('alt_contact_number').value;
    formData.pan_number = this.editLabs.get('pan_number').value;
    formData.gst_number = this.editLabs.get('gst_number').value;
    formData.dob = this.editLabs.get('dob').value;
    formData.address = this.editLabs.get('address').value;
    formData.country = this.editLabs.get('country').value;
    formData.state = this.editLabs.get('state').value;
    formData.city = this.editLabs.get('city').value;
    formData.pincode = this.editLabs.get('pincode').value;
    formData.status = this.editLabs.get('status').value;


    console.log(formData);

    this.apiService.editlabs(formData).subscribe(
      res => {
        console.log(res);

        // this.success_msg = true;
        // console.log(res);
        // this.ngOnInit();
        this.router.navigate(['/labs/viewlabs']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
