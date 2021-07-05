import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../api-service.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-edit-franchisee',
  templateUrl: './edit-franchisee.component.html',
  styleUrls: ['./edit-franchisee.component.scss']
})
export class EditFranchiseeComponent implements OnInit {
  editFranchisee: FormGroup;
  success_msg:boolean;
  profileData: any = {};
  constructor(private apiService:ApiServiceService,private fb:FormBuilder,private router:Router,private activated:ActivatedRoute) {
    this.editFranchisee=fb.group({
      franchisee_name:new FormControl(),
      franchisee_id:new FormControl(),
      email:new FormControl(),
      franchisee_address:new FormControl(),
      franchisee_owner_name:new FormControl(),
      contact_number:new FormControl(),
      country:new FormControl(),
      state:new FormControl(),
      city:new FormControl(),
      pincode:new FormControl(),
      status:new FormControl(),
      });
    this.editFranchisee= fb.group({

      franchisee_name:['',Validators.compose([Validators.required])],
      franchisee_id:['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      franchisee_address:['',Validators.compose([Validators.required,Validators.maxLength(15)])],
      franchisee_owner_name:['',Validators.compose([Validators.required])],
      contact_number:['',Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(10)])],
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
    this.apiService.getFranchiseeSingleData(test_id).subscribe(
      (res: ApiResponse) => {
        console.log(res);
          this.profileData = res.data;
          this.editFranchisee.setValue({
            // test_id: this.profileData[0].id ? this.profileData[0].id : '',
            franchisee_name: this.profileData[0].franchisee_name ? this.profileData[0].franchisee_name : '',
            franchisee_id: this.profileData[0].id ? this.profileData[0].id : '',
            email: this.profileData[0].email ? this.profileData[0].email : '',
            franchisee_address: this.profileData[0].address ? this.profileData[0].address : '',
            franchisee_owner_name: this.profileData[0].name ? this.profileData[0].name : '',
            contact_number: this.profileData[0].mobile ? this.profileData[0].mobile : '',
            country: this.profileData[0].country ? this.profileData[0].country : '',
            state: this.profileData[0].state ? this.profileData[0].state : '',
            city: this.profileData[0].city ? this.profileData[0].city : '',
            pincode: this.profileData[0].zip ? this.profileData[0].zip : '',
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
    let formData = this.editFranchisee.value;
    formData.franchisee_name = this.editFranchisee.get('franchisee_name').value;
    formData.franchisee_id = this.editFranchisee.get('franchisee_id').value;
    formData.email = this.editFranchisee.get('email').value;
    formData.franchisee_address = this.editFranchisee.get('franchisee_address').value;
    formData.franchisee_owner_name = this.editFranchisee.get('franchisee_owner_name').value;
    formData.contact_number = this.editFranchisee.get('contact_number').value;
    formData.country = this.editFranchisee.get('country').value;
    formData.state = this.editFranchisee.get('state').value;
    formData.city = this.editFranchisee.get('city').value;
    formData.pincode = this.editFranchisee.get('pincode').value;
    formData.status = this.editFranchisee.get('status').value;


    console.log(formData);

    this.apiService.FranchiseeUpdate(formData).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/franchisee/viewfranchisee']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
