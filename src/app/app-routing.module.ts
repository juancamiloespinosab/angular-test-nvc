import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search/search.component';
import { DetailComponent } from './detail/detail/detail.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: '', redirectTo: 'search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
