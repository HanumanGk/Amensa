import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ButtonsComponent } from './buttons.component';
import { BrandButtonsComponent } from './brand-buttons.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropdownsComponent } from './dropdowns.component';

// Buttons Routing
import { ButtonsRoutingModule } from './buttons-routing.module';
import { ViewLabsComponent } from './view-labs/view-labs.component';
import { EditLabsComponent } from './edit-labs/edit-labs.component';
import { AddLabsComponent } from './add-labs/add-labs.component';
import { AddPackagesComponent } from './add-packages/add-packages.component';
import { EditPackagesComponent } from './edit-packages/edit-packages.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { ManageContainerComponent } from './manage-container/manage-container.component';
import { AddFranchiseeComponent } from './add-franchisee/add-franchisee.component';
import { ViewFranchiseeComponent } from './view-franchisee/view-franchisee.component';
import { EditFranchiseeComponent } from './edit-franchisee/edit-franchisee.component';
import { AllAppointmentComponent } from './view/all-appointment/all-appointment.component';
import { TodaysAppointmentComponent } from './view/todays-appointment/todays-appointment.component';
import { WeeklyAppointmentComponent } from './view/weekly-appointment/weekly-appointment.component';
import { SearchTablePipe } from '../../pipes/search-table.pipe';
import { UpdatedprofileComponent } from './view/updatedprofile/updatedprofile.component';
import { AllReportsComponent } from './view/all-reports/all-reports.component';
import { NewReportsComponent } from './view/new-reports/new-reports.component';
import { AddMoneyComponent } from './view/add-money/add-money.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { PromotorComponent } from './view/promotor/promotor.component';
import { NgSelectModule } from '@ng-select/ng-select';

// Angular

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  declarations: [
    ButtonsComponent,
    DropdownsComponent,
    BrandButtonsComponent,
    ViewLabsComponent,
    EditLabsComponent,
    AddLabsComponent,
    AddPackagesComponent,
    EditPackagesComponent,
    ManageTestComponent,
    EditTestComponent,
    EditContainerComponent,
    ManageContainerComponent,
    AddFranchiseeComponent,
    ViewFranchiseeComponent,
    EditFranchiseeComponent,
    AllAppointmentComponent,
    TodaysAppointmentComponent,
    WeeklyAppointmentComponent,
    SearchTablePipe,
    UpdatedprofileComponent,
    AllReportsComponent,
    NewReportsComponent,
    AddMoneyComponent,
    SelectDropdownComponent,
    PromotorComponent
  ],
  exports: [
    SearchTablePipe
  ]
})
export class ButtonsModule { }
