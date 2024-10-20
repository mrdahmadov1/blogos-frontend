import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AddUserModalComponent } from './users/add-user-modal/add-user-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './users/users.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './posts/posts.service';
import { AddPostModalComponent } from './posts/add-post-modal/add-post-modal.component';

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent,
    ProfileComponent,
    AddUserModalComponent,
    PostsComponent,
    AddPostModalComponent,
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
  providers: [UserService, PostService],
})
export class MainModule {}
