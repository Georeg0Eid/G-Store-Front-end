import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { KidsComponent } from './kids/kids.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { SingelProductComponent } from './singel-product/singel-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'men', component: MenComponent},
  { path: 'women', component: WomenComponent},
  { path: 'kids', component: KidsComponent},
  { path: 'contact', component: ContactUsComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'cart', component: CartComponent},
  {
    path: 'product/:id',
    component: SingelProductComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
  }, // DashboardGuard is added to protect the dashboard route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//ng new projectName --no-standalone

//mydomain.com
//mydomain.com/home
