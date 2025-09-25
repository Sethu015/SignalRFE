import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: '', redirectTo:'auth', pathMatch:'full'
    },
    {
        path: 'auth', component:Auth, pathMatch:'full'
    },
    {
        path:'home',component:Home, pathMatch:'full'
    },
    {
        path:'**', redirectTo:'auth', pathMatch:'full'
    }
];
