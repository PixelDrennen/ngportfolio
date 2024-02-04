import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { WorkComponent } from './components/pages/work/work.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { GlobalService } from './services/global.service';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'work', component: WorkComponent },
  { path: 'admin', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router, private globalService:GlobalService) {
    if(router.url === '/' && (globalService.routeSubject.getValue() == undefined || globalService.routeSubject.getValue() == '')) {
      console.log("routing", globalService.routeSubject.getValue())
      globalService.setRoute('home');
    }


    globalService.routeSubject.subscribe(route => {
      router.navigate([route]);
      console.log('from',router.url,'to',route);
    });
  }
}
