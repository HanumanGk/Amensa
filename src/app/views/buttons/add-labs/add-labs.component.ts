import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';

@Component({
  selector: 'app-add-labs',
  templateUrl: './add-labs.component.html',
  styleUrls: ['./add-labs.component.scss']
})
export class AddLabsComponent implements OnInit {
  addLabs: FormGroup;
  success_msg:boolean;
  constructor(private apiService:ApiServiceService,private fb:FormBuilder,private router:Router) {
    this.addLabs=fb.group({
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
    this.addLabs= fb.group({

      lab_name:['',Validators.compose([Validators.required])],
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

  ngOnInit(): void {
  }

  onSubmit(){
    let formData = this.addLabs.value;
    formData.lab_name = this.addLabs.get('lab_name').value;
    formData.email = this.addLabs.get('email').value;
    formData.lab_desc = this.addLabs.get('lab_desc').value;
    formData.owner_name = this.addLabs.get('owner_name').value;
    formData.contact_number = this.addLabs.get('contact_number').value;
    formData.second_owner_name = this.addLabs.get('second_owner_name').value;
    formData.alt_contact_number = this.addLabs.get('alt_contact_number').value;
    formData.pan_number = this.addLabs.get('pan_number').value;
    formData.gst_number = this.addLabs.get('gst_number').value;
    formData.dob = this.addLabs.get('dob').value;
    formData.address = this.addLabs.get('address').value;
    formData.country = this.addLabs.get('country').value;
    formData.state = this.addLabs.get('state').value;
    formData.city = this.addLabs.get('city').value;
    formData.pincode = this.addLabs.get('pincode').value;
    formData.status = this.addLabs.get('status').value;


    console.log(formData);

    this.apiService.addlabs(formData).subscribe(
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
