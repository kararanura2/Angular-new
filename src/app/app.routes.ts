import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { FightersList } from './components/fighters-list/fighters-list';
import { FighterDetails } from './components/fighter-details/fighter-details';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Profile } from './components/profile/profile';
import { authGuard } from './services/auth.guard';


export const routes: Routes = [
    { path: 'about', component: About},
    { path: 'fighters', component: FightersList, canActivate: [authGuard]},
    { path: 'fighter/:id', component: FighterDetails, canActivate: [authGuard]},
    { path: 'fighters/:id', redirectTo: '/fighter/:id', pathMatch: 'full' },
    // { path: '', redirectTo: '/home', component: Home},
    // { path: '**', redirectTo: '/home'},
    { path: 'login', component: Login},
    { path: 'signup', component: Signup},
    { path: 'profile', component: Profile, canActivate: [authGuard]},
    { path: 'login', component: Login},
];
