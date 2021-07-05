import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';

@Component({
  selector: 'app-add-franchisee',
  templateUrl: './add-franchisee.component.html',
  styleUrls: ['./add-franchisee.component.scss']
})
export class AddFranchiseeComponent implements OnInit {
  addFranchisee: FormGroup;
  success_msg:boolean;
  constructor(private apiService:ApiServiceService,private fb:FormBuilder,private router:Router) {
    this.addFranchisee=fb.group({
      franchisee_name:new FormControl(),
      type:new FormControl(),
      email:new FormControl(),
      franchisee_address:new FormControl(),
      franchisee_owner_name:new FormControl(),
      contact_number:new FormControl(),
      country:new FormControl(),
      state:new FormControl(),
      city:new FormControl(),
      pincode:new FormControl(),
      password:new FormControl(),
      cpass:new FormControl(),
      status:new FormControl(),
      });
    this.addFranchisee= fb.group({

      franchisee_name:['',Validators.compose([Validators.required])],
      type:['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      franchisee_address:['',Validators.compose([Validators.required,Validators.maxLength(15)])],
      franchisee_owner_name:['',Validators.compose([Validators.required])],
      contact_number:['',Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(10)])],
      country:['',Validators.compose([Validators.required])],
      state:['',Validators.compose([Validators.required])],
      city:['',Validators.compose([Validators.required])],
      pincode:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
      cpass:['',Validators.compose([Validators.required])],
      status:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let formData = this.addFranchisee.value;
    formData.franchisee_name = this.addFranchisee.get('franchisee_name').value;
    formData.email = this.addFranchisee.get('email').value;
    formData.franchisee_address = this.addFranchisee.get('franchisee_address').value;
    formData.franchisee_owner_name = this.addFranchisee.get('franchisee_owner_name').value;
    formData.contact_number = this.addFranchisee.get('contact_number').value;
    formData.country = this.addFranchisee.get('country').value;
    formData.state = this.addFranchisee.get('state').value;
    formData.city = this.addFranchisee.get('city').value;
    formData.pincode = this.addFranchisee.get('pincode').value;
    formData.password = this.addFranchisee.get('password').value;
    formData.cpass = this.addFranchisee.get('cpass').value;
    formData.status = this.addFranchisee.get('status').value;
    formData.type = '1';


    console.log(formData);

    this.apiService.addFranchisee(formData).subscribe(
      res => {
        this.router.navigate(['/franchisee/viewfranchisee']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
