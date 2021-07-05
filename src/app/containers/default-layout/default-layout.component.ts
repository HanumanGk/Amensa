import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { navItems,frNavItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems;

  constructor(private router:Router){
    let u = JSON.parse(localStorage.getItem('u'));
    if(u.role == 0){
      this.navItems = navItems;
    }else{
      this.navItems = frNavItems;
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout(){
    localStorage.removeItem('u')
    localStorage.clear();
    this.router.navigateByUrl('/login');

  }
}
