import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './components/posts/posts.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthModule } from '../auth/auth.module';
import { SigninComponent } from '../auth/components/signin/signin.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderNavComponent,
    CreateGroupComponent,
    PostsComponent,
    ProfileComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
  ]
})
export class GeneralModule { }
