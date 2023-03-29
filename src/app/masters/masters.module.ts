import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { LandingComponent } from './landing.component';
import { BusinessplansComponent } from './businessplans/businessplans.component';
import { SharedModule } from '../shared/shared.module';
import { BusinessesComponent } from './businesses/businesses.component';
import { BusinesspaymentsComponent } from './businesspayments/businesspayments.component';
import { AdminsComponent } from './admins/admins.component';
import { ProfilebusinessplansComponent } from './profilebusinessplans/profilebusinessplans.component';
import { PlansComponent } from './plans/plans.component';
import { StatesComponent } from './states/states.component';
import { DistrictsComponent } from './districts/districts.component';
import { TalukasComponent } from './talukas/talukas.component';
import { TownsComponent } from './towns/towns.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RelationsComponent } from './relations/relations.component';
import { ReligionsComponent } from './religions/religions.component';
import { SubreligionsComponent } from './subreligions/subreligions.component';


@NgModule({
  declarations: [
    LandingComponent,
    BusinessplansComponent,
    BusinessesComponent,
    BusinesspaymentsComponent,
    AdminsComponent,
    ProfilebusinessplansComponent,
    PlansComponent,
    StatesComponent,
    DistrictsComponent,
    TalukasComponent,
    TownsComponent,
    ProfilesComponent,
    RelationsComponent,
    ReligionsComponent,
    SubreligionsComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule
  ]
})
export class MastersModule { }
