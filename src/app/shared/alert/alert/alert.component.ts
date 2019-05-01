import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Input, Output, ViewChild } from '@angular/core';
import { AlertData } from '../alert.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export enum AlertViewType {
  search,
  detailed,
  termsOfUse,
  commentModeration
}


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy  {
  viewtypes = AlertViewType
  @Input() data: AlertData;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onScroll: EventEmitter<any> = new EventEmitter();
  @ViewChild('target', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  isInIFrame: boolean = false;
  componentInstance: any;
  styles: any;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) { 
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
        this.close();
      })
    }

    ngOnInit() {
      if (this.data.styles) {
        this.styles = this.data.styles;
      }
      document.body.style.overflow = "hidden";
      document.body.classList.add('body_fixed');
      var ele = document.getElementById('app-main-container');
      if (ele) {
        ele.classList.add("app_blur_bg");
      }
      var ele1 = document.getElementById('headerNav');
      if (ele1) {
        ele1.classList.add("display_none");
      }
      this.getComponent();
      this.isInIFrame = (this.data.options && this.data.options.some(o => o.key == "isIframe" && o.value)) ? true : false;
  
    }

    ngOnDestroy() {
      if (!this.data || !this.data.skipRemoveOverflowHidden) {
        document.body.style.overflow = "auto"
        document.body.classList.remove('body_fixed');
        var ele = document.getElementById('app-main-container');
        var ele1 = document.getElementById('headerNav');
        if (ele) {
          ele.classList.remove("app_blur_bg");
        }
        if (ele1) {
          ele1.classList.remove('display_none');
        }
      }
    }
  
  
    getComponent() {
      if (this.data.component) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
        const ref: ComponentRef<any> = this.viewContainerRef.createComponent(factory);
        if (this.data.options) {
          this.data.options.forEach((item: { key: string, value: any }) => {
            ref.instance[item.key] = item.value
          });
        };
        this.componentInstance = ref.instance;
      }
    }

    close(data: any = null) {
      if (!this.data || !this.data.skipRemoveOverflowHidden) {
        document.body.style.overflow = "auto"
      }
      this.onClose.emit(data);
      this.onClose.complete();
    }
  
    onWindowScroll() {
      if (this.componentInstance && this.componentInstance.onScroll) {
        this.componentInstance.onScroll();
      }
    }
    
}
