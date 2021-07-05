import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  signupForm:FormGroup;
  formData: any = {};
  FirstName:string="";
  LastName:string="";
  Email:string="";
  Password:string="";
  submitted = false;
  loading = false;

  constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute,private apiService:ApiServiceService) {
    this.route.params.subscribe(
      (params) => {
        console.log(params.id);
        // if(params.id){
        //   console.log(this.jwtHelper.decodeToken(params.id))

        //   if(this.environ){
        //     this.user.setRegisterType(this.jwtHelper.decodeToken(params.id).type);
        //     this.hashCheck(params.id);
        //   }
        // }
      }
    )
    console.log(this.route.params);
      this.signupForm=fb.group({
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
      this.signupForm= fb.group({

        franchisee_name:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(1)])],
        type:['',Validators.compose([Validators.required])],
        email:['',Validators.compose([Validators.required,Validators.email])],
        franchisee_address:['',Validators.compose([Validators.required,Validators.maxLength(15)])],
        franchisee_owner_name:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(1)])],
        contact_number:['',Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(10)])],
        country:['',Validators.compose([Validators.required])],
        state:['',Validators.compose([Validators.required])],
        city:['',Validators.compose([Validators.required])],
        pincode:['',Validators.compose([Validators.required,Validators.maxLength(6),Validators.minLength(6)])],
        password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
        cpass:['',Validators.compose([Validators.required,Validators.minLength(6)])],
        status:['',Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
    // this.signupForm = new FormGroup();
  }
  // get f() { return this.signupForm.controls; }

  onSubmit() {
      let formData = this.signupForm.value;
    formData.franchisee_name = this.signupForm.get('franchisee_name').value;
    formData.email = this.signupForm.get('email').value;
    formData.franchisee_address = this.signupForm.get('franchisee_address').value;
    formData.franchisee_owner_name = this.signupForm.get('franchisee_owner_name').value;
    formData.contact_number = this.signupForm.get('contact_number').value;
    formData.country = this.signupForm.get('country').value;
    formData.state = this.signupForm.get('state').value;
    formData.city = this.signupForm.get('city').value;
    formData.pincode = this.signupForm.get('pincode').value;
    formData.password = this.signupForm.get('password').value;
    formData.cpass = this.signupForm.get('cpass').value;
    formData.status = this.signupForm.get('status').value;
    formData.type = '1';


    console.log(formData);

    this.apiService.addFranchisee(formData).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
}

}
