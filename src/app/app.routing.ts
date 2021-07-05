import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {AuthGuard} from './auth.guard'
import {AuthLoggedinGuard} from './auth/auth-loggedin.guard';
import { AdminGuardGuard } from './auth/admin-guard.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
    canActivate:[AuthLoggedinGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
    canActivate:[AuthLoggedinGuard]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'labs',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
        canActivate:[AdminGuardGuard]
      },
      {
        path: 'package',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
        canActivate:[AdminGuardGuard]
      },
      {
        path: 'test',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
        canActivate:[AdminGuardGuard]
      },
      {
        path: 'container',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
        canActivate:[AdminGuardGuard]
      },
      {
        path: 'franchisee',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
        canActivate:[AdminGuardGuard]
      },
      {
        path: 'appointment',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'billing',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[AuthGuard]
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
