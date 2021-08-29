import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import {FriendsPageComponent} from './components/friends-page/friends-page.component';
import {GamesPageComponent} from './components/games-page/games-page.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LibraryComponent} from './components/library/library.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'games', component: GamesPageComponent},
      {path: 'library', component: LibraryComponent},
      {path: 'friends', component: FriendsPageComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    //{PreloadingStrategy: PreloadAllModules}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
