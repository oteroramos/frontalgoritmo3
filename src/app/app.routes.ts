import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { CashComponent } from './cash/cash.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loginGuardGuard } from './guards/login-guard.guard';
import { AddproductComponent } from './addproduct/addproduct.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { AuthLayoutComponentComponent } from './auth-layout-component/auth-layout-component.component';
import { MainLayoutComponentComponent } from './main-layout-component/main-layout-component.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [

  {
    path: 'login',
    component: AuthLayoutComponentComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },

  {
    path: '',
    component: MainLayoutComponentComponent,
    canActivate: [loginGuardGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cash', component: CashComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'about', component: AboutComponent },
      { path: 'products/add', component: AddproductComponent },
      { path: 'cart', component: CartComponent }
    ]
  },

  
  { path: '**', component: NotFoundComponentComponent }
];

