import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AddUserModalComponent } from './components/users/add-user-modal/add-user-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/users.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { PostsComponent } from './components/posts/posts.component';
import { PostService } from './services/posts.service';
import { AddPostModalComponent } from './components/my-posts/add-post-modal/add-post-modal.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent,
    ProfileComponent,
    AddUserModalComponent,
    PostsComponent,
    AddPostModalComponent,
    MyPostsComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzFormModule,
    NzAlertModule,
    NzPaginationModule,
  ],
  providers: [UserService, PostService, ProfileService],
})
export class MainModule {}
