
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './gaurds/login.guard';
import { UserGuard } from './gaurds/user.guard';
import { UsersComponent } from './pages/users/users.component';
import { QusComponent } from './pages/qus/qus.component';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { EditQusComponent } from './pages/qus/edit-qus/edit-qus.component';
import { NewQusComponent } from './pages/qus/new-qus/new-qus.component';
import { BlogComponent } from './pages/blog/blog.component';
import { EditBlogComponent } from './pages/blog/edit-blog/edit-blog.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

const childRoutes: Routes = [
{ path: '', redirectTo: 'users', pathMatch: 'full' },
{path: 'users', component:  UsersComponent },
{ path: 'users/:id', component: EditUserComponent },
{path: 'qus', component:  QusComponent },
{ path: 'qus/edit-qus/:id', component: EditQusComponent },
{ path: 'qus/new-qus/:id', component: NewQusComponent },
{ path: 'blog', component: BlogComponent },
{ path: 'blog/:id', component: EditBlogComponent },
];

const routes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: 'pages', component: PagesComponent, children: childRoutes, canActivate: [UserGuard] },
    { path: 'signin', component: LoginComponent, canActivate: [LoginGuard] },
    { path: '**', redirectTo: 'pages' }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
