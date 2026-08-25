import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'barber-admin',
    loadChildren: () =>
      import('./barber-admin/barber-admin.module').then(
        (m) => m.BarberAdminModule
      )
  },
  {
    path: '',
    redirectTo: 'barber-admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'barber',
    loadChildren: () =>
      import('./barber/barber.module').then(
        m => m.BarberModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
