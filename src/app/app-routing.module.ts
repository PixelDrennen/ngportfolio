import { NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { WorkComponent } from './components/pages/work/work.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { GlobalService } from './services/global.service';
import { Location } from '@angular/common';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'work', component: WorkComponent },
  { path: 'admin', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit {
  constructor(
    private router: Router,
    private _route:ActivatedRoute,
    private globalService: GlobalService,
    private location: Location,
  ) {

    // console.log(router.url)
    // if (
    //   router.url === '/' &&
    //   (globalService.routeSubject.getValue() == undefined ||
    //     globalService.routeSubject.getValue() == '')
    // ) {
    //   console.log('routing', globalService.routeSubject.getValue());
    //   globalService.setRoute('home');
    // }
    // this.globalService.routeSubject.subscribe((route) => {
    //   this.router.navigate([route]);
    //   console.log('from', this.router.url, 'to', route);
    // });

    // _route.queryParams.subscribe((params) => {console.log(`route params\n${params}`)});

    // router.events.subscribe((val) => {
    //   console.log(val)
    // });
  }

  ngOnInit(): void {
    // console.log("INITINTINTITINTINT")
   
  }
}
