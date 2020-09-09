import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search/search.component';
import { DetailComponent } from './detail/detail/detail.component';

const routes: Routes = [
  { path: 'detail/:id', component: DetailComponent, outlet: 'popup' },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
