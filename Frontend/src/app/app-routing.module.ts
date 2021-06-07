import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute, RouteBase } from './app-routing.enum';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from './core/auth-guard';
import {RegisterParticipantComponent} from './pages/participants/register/register-participant.component'
import{ParticipantsListComponent} from './pages/participants/participants-list/participants-list.component'
import{CreateSerialNumberComponent} from './pages/serial-numbers/create-serial-number.component'
const routes: Routes = [
  { path: RouteBase.Login, component: LoginComponent },
  { path: AppRoute.RegisterParticipant, component: RegisterParticipantComponent },
  { 
    canActivate: [AuthGuard],
    path: AppRoute.ParticipantList, component: ParticipantsListComponent },
    { 
      canActivate: [AuthGuard],
      path: AppRoute.CreateSerialNumber, component: CreateSerialNumberComponent },
  {
    path: RouteBase.Home, component: HomeComponent,
    children: [
      { path: RouteBase.Index, component: IndexComponent},
      // {
      //   path: RouteBase.LivelihoodModule,loadChildren: () => import('./modules/livelihood/livelihood.module').then(x => x.LivelihoodModule)
      // },
   
    ]
  }, 
  { path: '**', redirectTo: `/${RouteBase.ErrorModule}?code=404` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
