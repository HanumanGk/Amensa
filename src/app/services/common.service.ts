import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  isLoggedIn(){
    let u = JSON.parse(localStorage.getItem('u'));
    // console.log("New",u)
    // you can check token validation against your database
    if(u){
      return true;
    }else{
      return false;
    }
  }

  isAdminLoggedIn(){
    let u = JSON.parse(localStorage.getItem('u'));
    // console.log("New",u)
    // you can check token validation against your database
    if(u.role == 0){
      return true;
    }else{
      return false;
    }
  }
}
