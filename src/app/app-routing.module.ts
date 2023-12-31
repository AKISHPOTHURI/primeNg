import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
import { SigupComponent } from './components/signup/sigup.component';
import { JoblistPageComponent } from './components/joblist-page/joblist-page.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { ApplicationComponent } from './components/application/application.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { PrimengTableComponent } from './primeng-table/primeng-table.component';
import { DorpdownComponent } from './dorpdown/dorpdown.component';
import { TableComponent } from './table/table.component';
import { DropComponent } from './drop/drop.component';
import { LazyloadingComponent } from './lazyloading/lazyloading.component';
import { CrudComponent } from './crud/crud.component';
import { CodefirstComponent } from './codefirst/codefirst.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SigupComponent },
  // { path: 'joblistPage', component: JoblistPageComponent },
  // { path: 'application/:id', component: ApplicationComponent },
  // { path: 'companiesList/:id', component: CompanyProfileComponent },
  // { path: 'application', component: ApplicationComponent },
  // { path: 'datepicker', component: DatepickerComponent },
  {path:'primeNg',component:PrimengTableComponent},
  {path:'dropdown',component:DorpdownComponent},
  {path:'table',component:TableComponent},
  {path:'drop',component:DropComponent},
  {path:'crud',component:CrudComponent},
  {path: 'lazyloading', component:LazyloadingComponent},
  {path:'admin', loadChildren:() => import('./admin/admin.module')
  .then(mod => mod.AdminModule)},
  {path:'user', loadChildren:() => import('./user/user.module')
  .then(mod => mod.UserModule)},
  {path:'codefirst', component:CodefirstComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
