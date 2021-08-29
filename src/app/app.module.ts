import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { LibraryComponent } from './components/library/library.component';
import { FriendsPageComponent } from './components/friends-page/friends-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { SearchFriends } from './services/pipes/search-friends.pipe';
import { SearchGames } from './services/pipes/search-games.pipe';
import { AuthGuard } from './services/auth.guard';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GamesPageComponent,
    LibraryComponent,
    FriendsPageComponent,
    ProfileComponent,
    MainLayoutComponent,
    SearchFriends,
    SearchGames,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
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
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  exports: [
    RouterModule,
    SearchFriends,
    SearchGames
  ],
  providers: [
    AuthGuard,
    AuthService,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
