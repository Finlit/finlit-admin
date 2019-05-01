import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
 // url: string;
}

const MENUITEMS = [
  //  {state: 'starter', name: 'Starter Page', type: 'link', icon: 'av_timer' },
    {state: '/full/users',type: 'link', name: 'users', icon: 'person'},
    {state: '/full/abc', type: 'link', name: 'abc', icon: 'web'},
    // {state: 'writing', type: 'link', name: 'writing', icon: 'web'},
    // {state: 'artist', type: 'link', name: 'artist', icon: 'web'},
    // {state: 'kirtan', type: 'link', name: 'kirtan', icon: 'web'},
    // {state: 'shabad', type: 'link', name: 'shabad', icon: 'web'},
    
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}

