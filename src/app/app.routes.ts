import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { CharactersList } from './components/characters-list/characters-list';
import { CharacterDetails } from './components/character-details.ts/character-details';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Profile } from './components/profile/profile';
import { authGuard } from '../services/auth.guard';
import { Favorites } from './components/favorites/favorites';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'characters', component: CharactersList },
  { path: 'character/:id', component: CharacterDetails },
  { path: 'characters/:id', redirectTo: '/character/:id', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'profile', component: Profile, canActivate: [authGuard] },

  { path: 'favorites', component: Favorites, canActivate: [authGuard]},

  { path: '**', redirectTo: '' }
];
