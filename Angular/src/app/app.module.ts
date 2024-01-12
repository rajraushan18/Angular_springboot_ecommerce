import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FeatureModule } from './Module/feature/feature.module';
import { SharedModule } from './Module/shared/shared.module';
import { AdminModule } from './Module/admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './Module/auth/auth.module';
import { authReducer } from './state/Auth/auth.reducer';
import { userReducer } from './state/User/user.reducer';
import { HttpClientModule } from '@angular/common/http';
import { productReducer } from './state/Product/product.reducer';
import { cartReducer } from './state/Cart/cart.reducer';
import { orderReducer } from './state/Order/order.reducer';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatureModule,
    SharedModule,
    AdminModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({auth:authReducer, 
      user: userReducer,
      product: productReducer,
      cart: cartReducer,
      order: orderReducer,
    },
    {}
    ),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
