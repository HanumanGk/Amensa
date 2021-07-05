import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { ApiServiceService } from "../../api-service.service";
import { ApiResponse } from "../../interfaces/api-response";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent {
  loginForm: FormGroup;
  status: String = "Login";
  showSuccess: boolean;
  errors: any;
  err: boolean;
  phone: any;
  otpMode: boolean;
  isLoggedIn: boolean;
  logo: string;

  emailError: string;
  passwordError: string;
  private ngUnsubscribe: Subject<any> = new Subject<any>();
  constructor(
    private apiServices: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.otpMode = false;
    // this.attachFormControls();
    // this.attachFormValidationMessages();
    this.loginForm = this.formBuilder.group({
      Emailid: ["", Validators.required],
      userpassword: ["", Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.apiServices.signIn(this.loginForm.value).subscribe((res: any) => {
      // console.log(res)
      if (res.status == "failure") {
        this.router.navigate(["/login"], { relativeTo: this.route });
        this.err = true;
        this.errors = res.message;
      } else {
        console.log(res);
        this.err = false;
        if (res.customerInfo) {
          localStorage.setItem("u", JSON.stringify(res.customerInfo));
          this.router.navigate(["/dashboard"], { relativeTo: this.route });
        }else{
          this.err = true;
        this.errors = "There is some issue.";
        }
      }
    });
  }
}
