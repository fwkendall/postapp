import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './components/postDetail.component';
import { PostListComponent } from './components/postList.component';

const routes:Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostListComponent
  },
  {
    path: 'detail/:id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}