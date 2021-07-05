import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ApiServiceService } from "../../../../api-service.service";
import { CrudService } from "../../../../crud.service";
import { ExternalLibraryService } from '../../../../services/utils';
declare var Razorpay: any;
@Component({
  selector: "app-add-money",
  templateUrl: "./add-money.component.html",
  styleUrls: ["./add-money.component.scss"],
})
export class AddMoneyComponent implements OnInit {
  addMoney: FormGroup;
  success_msg: boolean;
  options:any = {
    key: "rzp_test_bmMrPJDYMoBGDT", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      console.log('response',response);
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
    // postData: this.crud,
  };
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router,
    private crud: CrudService,
    private razorpayService: ExternalLibraryService,
  ) {
    this.addMoney = fb.group({
      payment_mode: new FormControl(),
      center_name: new FormControl(),
      center_code: new FormControl(),
      fname: new FormControl(),
      lname: new FormControl(),
      emailid: new FormControl(),
      mobile: new FormControl(),
      amount: new FormControl(),
    });
    this.addMoney = fb.group({
      payment_mode: ["", Validators.compose([Validators.required])],
      center_name: ["", Validators.compose([Validators.required])],
      center_code: ["", Validators.compose([Validators.required])],
      fname: ["", Validators.compose([Validators.required])],
      lname: ["", Validators.compose([Validators.required])],
      emailid: [""],
      mobile: [""],
      amount: ["", Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.razorpayService
    .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
    .subscribe();
  }

  PaymentSubmit(event) {
    // let formData = this.addMoney.value;
    // formData.payment_mode = this.addMoney.get('payment_mode').value;
    // formData.center_name = this.addMoney.get('center_name').value;
    // formData.center_code = this.addMoney.get('center_code').value;
    // formData.fname = this.addMoney.get('fname').value;
    // formData.lname = this.addMoney.get('lname').value;
    // formData.mobile = this.addMoney.get('mobile').value;
    // formData.amount = this.addMoney.get('amount').value;
    console.log("Get Form Data =>", event);
    this.options.handler = this.respHandler.bind(this);
    const rzp1 = new Razorpay(this.options);
    // const rzp1 = new this.crud.nativeWindow.Razorpay(this.options);
    rzp1.open();
    console.log("RazorPay Worked");
    // this.apiService.addTestmaster(formData).subscribe(
    //   res => {

    //     this.success_msg = true;
    //     console.log(res);
    //     this.ngOnInit();
    //     this.router.navigate(['/manageTest']);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  respHandler(resp){
    console.log(resp)
  }
}
