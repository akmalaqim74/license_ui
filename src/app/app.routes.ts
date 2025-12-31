import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { NotionCallbackComponent } from './components/notion-callback/notion-callback.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { RenewComponent } from './pages/renew/renew.component';
import { ViewLicenseComponent } from './pages/view-license/view-license.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/views/admin/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: 'notion-callback',
    component: NotionCallbackComponent
  },
  {
    path: 'license',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'renew',
        component: RenewComponent
      },
      {
        path: ':licenseNumber',
        component: ViewLicenseComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];