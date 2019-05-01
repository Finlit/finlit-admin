import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { User } from '../../models/user';
import { MenuItems } from '../../shared/menu-items/menu-items';



export class NavLink {
  name: string;
  url: string;
  icon: string;

}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class AppSidebarComponent {
  user: User;
  links: NavLink[] = [

    { name: 'USERS', url: '/pages/users', icon: 'person' },
    { name: 'QUESTIONS', url: '/pages/qus', icon: 'contact_support' },
    { name: 'BLOGS', url: '/pages/blog', icon: 'chat' },
  ]

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems, private router: Router) {

    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);



  }


  ngOnInit() {
  }

  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/signin']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}