import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  {path: '',component:AdminComponent,children:[
    {path:"",component:DashboardComponent},
    {path:"orders",component:OrdersTableComponent},
    {path:"products",component:AddProductComponent},
    {path:"customers",component:CustomersComponent},
    {path:"add-products",component:AddProductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
