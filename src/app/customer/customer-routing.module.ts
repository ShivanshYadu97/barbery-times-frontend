import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectShopComponent } from './select-shop/select-shop.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';

const routes: Routes = [

  {
    path: '',
    component: CustomerLayoutComponent,
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'select-shop',
        component: SelectShopComponent
      },

      {
        path: 'select-service',
        component: SelectServiceComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}