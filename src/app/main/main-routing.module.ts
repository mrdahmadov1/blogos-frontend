import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostsComponent } from './components/posts/posts.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'my-posts', component: MyPostsComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
