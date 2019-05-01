import { Injectable, EventEmitter, Injector, ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertComponent, AlertViewType } from './alert/alert.component';


export interface AlertProps {
  open?: () => any;
  close?: (data?: any) => any;
  componentInstance: any;
  onScroll?: EventEmitter<any>;
  onClose?: EventEmitter<any>;
  instance?: any;
  isOpened?: boolean
}


export class AlertData {
  component?: any;
  templateRef?: TemplateRef<any>;
  header?: string;
  subheader?: string;
  html_content?: string;
  skipRemoveOverflowHidden?: boolean;
  options?: { key: string, value: any }[];
  styles?: any;
  containerClass?: string;
  viewType?: AlertViewType
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    public applicationRef: ApplicationRef,
    private injector: Injector) { }



  _appendComponentToBody(alertData?: AlertData, onClosePropName?: string) {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent)
      .create(this.injector);
    if (alertData) {
      componentRef.instance['data'] = alertData;
    }

    let sub: Subscription;
    let alert: AlertProps = {
      isOpened: false,
      componentInstance: null,
      instance: componentRef.instance,
      onScroll: componentRef.instance['onScroll'] as EventEmitter<any>,
      onClose: new EventEmitter<any>(),
      open: () => {
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.applicationRef.attachView(componentRef.hostView);
        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
        // 4. Append DOM element to the body
        document.body.appendChild(domElem);
        sub = componentRef.instance[onClosePropName || 'onClose'].subscribe((data) => {
          alert.close(data);
        });
        alert.isOpened = true;
      },
      close: (data: any) => {
        this.applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
        sub.unsubscribe();
        alert.onClose.emit(data);
        alert.isOpened = false;
        return data
      },


    }

    return alert;
  }
}
