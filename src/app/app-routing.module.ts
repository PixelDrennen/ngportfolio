import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { WorkComponent } from './components/pages/work/work.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'work', component: WorkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
