import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'otpverify', loadChildren: './otpverify/otpverify.module#OtpverifyPageModule' },
  { path: 'completeprofile', loadChildren: './completeprofile/completeprofile.module#CompleteprofilePageModule' },  { path: 'addvehical', loadChildren: './addvehical/addvehical.module#AddvehicalPageModule' },
  { path: 'vehicals', loadChildren: './vehicals/vehicals.module#VehicalsPageModule' },
  { path: 'filter', loadChildren: './filter/filter.module#FilterPageModule' },
  { path: 'services', loadChildren: './services/services.module#ServicesPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
