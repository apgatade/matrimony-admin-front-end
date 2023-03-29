import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { BusinesspaymentsComponent } from './businesspayments/businesspayments.component';
import { BusinessplansComponent } from './businessplans/businessplans.component';
import { DistrictsComponent } from './districts/districts.component';
import { LandingComponent } from './landing.component';
import { PlansComponent } from './plans/plans.component';
import { ProfilebusinessplansComponent } from './profilebusinessplans/profilebusinessplans.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RelationsComponent } from './relations/relations.component';
import { ReligionsComponent } from './religions/religions.component';
import { StatesComponent } from './states/states.component';
import { SubreligionsComponent } from './subreligions/subreligions.component';
import { TalukasComponent } from './talukas/talukas.component';
import { TownsComponent } from './towns/towns.component';

const routes: Routes = [
  {path:"",component:LandingComponent, children:[
    {path:"",component:BusinessplansComponent},
    {path:"businessplans",component:BusinessplansComponent},
    {path:"businesses",component:BusinessesComponent},
    {path:"businesspayments",component:BusinesspaymentsComponent},
    {path:"admins",component:AdminsComponent},
    {path:"profilebusinessplans",component:ProfilebusinessplansComponent},
    {path:"plans",component:PlansComponent},
    {path:"states",component:StatesComponent},
    {path:"districts/:stateid",component:DistrictsComponent},
    {path:"talukas/:districtid",component:TalukasComponent},
    {path:"towns/:talukaid",component:TownsComponent},
    {path:"profiles",component:ProfilesComponent},
    {path:"relations",component:RelationsComponent},
    {path:"religions",component:ReligionsComponent},
    { path: "subreligion/:religionid", component:SubreligionsComponent },



  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
