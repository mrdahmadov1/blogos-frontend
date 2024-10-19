import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: 'users', component: UsersComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
