import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';
import { BrandButtonsComponent } from './brand-buttons.component';
import { EditLabsComponent } from './edit-labs/edit-labs.component';
import { AddLabsComponent } from './add-labs/add-labs.component';
import { ViewLabsComponent } from './view-labs/view-labs.component';
import { EditPackagesComponent } from './edit-packages/edit-packages.component';
import { AddPackagesComponent } from './add-packages/add-packages.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { ManageContainerComponent } from './manage-container/manage-container.component';
import { AddFranchiseeComponent } from './add-franchisee/add-franchisee.component';
import { ViewFranchiseeComponent } from './view-franchisee/view-franchisee.component';
import { EditFranchiseeComponent } from './edit-franchisee/edit-franchisee.component';
import { AllAppointmentComponent } from './view/all-appointment/all-appointment.component';
import { TodaysAppointmentComponent } from './view/todays-appointment/todays-appointment.component';
import { WeeklyAppointmentComponent } from './view/weekly-appointment/weekly-appointment.component';
import { UpdatedprofileComponent } from './view/updatedprofile/updatedprofile.component';
import { AllReportsComponent } from './view/all-reports/all-reports.component';
import { NewReportsComponent } from './view/new-reports/new-reports.component';
import { AddMoneyComponent } from './view/add-money/add-money.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Masters'
    },
    children: [
      {
        path: '',
        redirectTo: 'labs'
      },
      // Labs..
      {
        path: 'editlabs/:id',
        component: EditLabsComponent,
        data: {
          title: 'Edit Labs'
        }
      },
      {
        path: 'addlabs',
        component: AddLabsComponent,
        data: {
          title: 'Add Labs'
        }
      },
      {
        path: 'viewlabs',
        component: ViewLabsComponent,
        data: {
          title: 'View Labs'
        }
      },
      // Packages..
      {
        path: 'editpackage/:id',
        component: EditPackagesComponent,
        data: {
          title: 'Edit Package'
        }
      },
      {
        path: 'addpackage',
        component: AddPackagesComponent,
        data: {
          title: 'Add Package'
        }
      },
      // Tests..
      {
        path: 'edittest/:id',
        component: EditTestComponent,
        data: {
          title: 'Edit Test'
        }
      },
      {
        path: 'managetest',
        component: ManageTestComponent,
        data: {
          title: 'Manage Test'
        }
      },
      // Containers..
      {
        path: 'editcontainer/:id',
        component: EditContainerComponent,
        data: {
          title: 'Edit Container'
        }
      },
      {
        path: 'managecontainer',
        component: ManageContainerComponent,
        data: {
          title: 'Manage Container'
        }
      },

      // Franchisee..
      {
        path: 'addfranchisee',
        component: AddFranchiseeComponent,
        data: {
          title: 'Add Franchisee'
        }
      },
      {
        path: 'viewfranchisee',
        component: ViewFranchiseeComponent,
        data: {
          title: 'View Franchisee'
        }
      },
      {
        path: 'editfranchisee/:id',
        component: EditFranchiseeComponent,
        data: {
          title: 'Edit Franchisee'
        }
      },

      // View Appointments
      {
        path: 'allAppointment',
        component: AllAppointmentComponent,
        data: {
          title: 'Track All Samples'
        }
      },
      {
        path: 'todaysAppointment',
        component: TodaysAppointmentComponent,
        data: {
          title: 'Track Todays Samples'
        }
      },
      {
        path: 'weeklyAppointment',
        component: WeeklyAppointmentComponent,
        data: {
          title: 'Track Weekly Samples'
        }
      },
      // Accounts..
      {
        path: 'updateFranchisee',
        component: UpdatedprofileComponent,
        data: {
          title: 'Update Profile'
        }
      },
      // View Reports
      {
        path: 'allReports',
        component: AllReportsComponent,
        data: {
          title: 'All Reports'
        }
      },
      {
        path: 'newReports',
        component: NewReportsComponent,
        data: {
          title: 'New Reports'
        }
      },

      // Billings
      {
        path: 'addMoney',
        component: AddMoneyComponent,
        data: {
          title: 'Add Money'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {}
