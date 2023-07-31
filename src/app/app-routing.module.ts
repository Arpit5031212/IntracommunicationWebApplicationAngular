import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { HomeComponent } from './general/components/home/home.component';
import { HeaderNavComponent } from './general/components/header-nav/header-nav.component';
import { CreateGroupComponent } from './general/components/create-group/create-group.component';
import { PostsComponent } from './general/components/posts/posts.component';
import { ProfileComponent } from './general/components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'auth',
    children: [
      { path: 'signIn', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
    ]
  }, 
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'nav', component: HeaderNavComponent},
      { path: 'create-group', component: CreateGroupComponent},
      { path: 'posts/:id', component: PostsComponent },
      { path: 'profile', component: ProfileComponent },
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
