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
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'payments', loadChildren: './payments/payments.module#PaymentsPageModule' },
  { path: 'address', loadChildren: './address/address.module#AddressPageModule' },
  { path: 'booking', loadChildren: './booking/booking.module#BookingPageModule' },
  { path: 'vehicledetails', loadChildren: './vehicledetails/vehicledetails.module#VehicledetailsPageModule' },
  { path: 'recipt', loadChildren: './recipt/recipt.module#ReciptPageModule' },
  { path: 'newaddress', loadChildren: './newaddress/newaddress.module#NewaddressPageModule' },
  { path: 'availablestore', loadChildren: './availablestore/availablestore.module#AvailablestorePageModule' },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
