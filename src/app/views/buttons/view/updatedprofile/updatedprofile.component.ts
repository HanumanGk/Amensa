import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../../api-service.service';
import { ApiResponse } from '../../../../interfaces/api-response';

@Component({
  selector: 'app-updatedprofile',
  templateUrl: './updatedprofile.component.html',
  styleUrls: ['./updatedprofile.component.scss']
})
export class UpdatedprofileComponent implements OnInit {

  editFranchisee: FormGroup;
  fileInfo: string;
  success_msg:boolean;
  store: any = {};
  panCard: any = {};
  adhaarCard: any = {};
  visitingCard: any = {};
  addressCard: any = {};
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
      panCard:new FormControl(),
      adhaarCard:new FormControl(),
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
      panCard:['',Validators.compose([Validators.required])],
      adhaarCard:['',Validators.compose([Validators.required])],
      status:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    let u = JSON.parse(localStorage.getItem('u'));
    this.activated.params.subscribe(params => {
      const test_id = u.id;
// this.userid = localStorage.token.split('.');
    this.apiService.getFranchiseeSingleData(test_id).subscribe(
      (res: ApiResponse) => {
        // console.log(res);
          this.profileData = res.data;
          this.editFranchisee.patchValue({
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

          // console.log('Full profile data: ', this.profileData);
      },
      err => {
        console.log(err);
      }
    );
    });

  }
  uploadFiles(files,from) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    if (files) {
      if(from == 'pan'){
        this.panCard = files[0]
      }else if(from == 'adhaar'){
        this.adhaarCard = files[0]
      }else if(from == 'visiting'){
        this.visitingCard = files[0]
      }else{
        this.addressCard = files[0]
      }
    } else {
      console.log('no');
    }
    console.log("Pan DAT",this.panCard);
  }

  onSubmit(){
    console.log("Pan DAT 2",this.panCard);
    const forms = new FormData();
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
    // this.profileUpdate(formData.franchisee_id);

    // console.log(forms);

    this.apiService.FranchiseeUpdate(formData).subscribe(
      res => {
        // console.log(res['data']);
        this.profileUpdate(res['data']);
        this.success_msg = true;
        window.location.reload()
      },
      err => {
        console.log(err);
      }
    );
  }

  profileUpdate(id) {
    let form = {};
    form['profileid'] = id;
    var formData = new FormData();
    Object.keys(form).forEach(data => {
      if (form[data] instanceof Array) {
        formData.append(data, JSON.stringify(form[data]));
      } else {
        formData.append(data, form[data]);
      }
    });
      formData.append('panCard', this.panCard)
      formData.append('adhaarCard', this.adhaarCard)
      formData.append('visitingCard', this.visitingCard)
      formData.append('addressCard', this.addressCard)
      this.apiService.updateProfileCard(formData).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  // <input (change)="uploadFiles($event.target.files,'pan')" type="file" class="form-control" accept="image/*">

  // uploadFile(files: File[]) {
  //   const formData = new FormData();
  //   Array.from(files).forEach(f => formData.append('userfile', f));
  //   return this.http.post(this.baseUrl + 'users/upload_image', formData);
  // }

}
