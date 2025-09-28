import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Home } from './home/home';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: '', redirectTo:'auth', pathMatch:'full'
    },
    {
        path: 'auth', component:Auth, pathMatch:'full'
    },
    {
        path:'home',
        loadComponent: () => import('./home/home').then(m => m.Home),
        canActivate:[authGuard]
    },
    {
        path:'**', redirectTo:'auth', pathMatch:'full'
    }
];
