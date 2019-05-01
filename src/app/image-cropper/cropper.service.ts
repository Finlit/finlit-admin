import { Injectable, EventEmitter, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { CropperComponent } from './cropper/cropper.component';
import { Subscription } from 'rxjs';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { ToastyService } from 'ng2-toasty';


export interface AlertProps {
  open?: () => any;
  close?: (data?: any) => any;
  onScroll?: EventEmitter<any>;
  onClose?: EventEmitter<any>;
  instance?: any;
  isOpened?: boolean
}

@Injectable()
export class CropperService {

  uploader: FileUploader;
  isProcessing: boolean = false;
  isInitUploader: boolean = false;
  file: File;
  afterUpload: () => any

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public applicationRef: ApplicationRef,
    private injector: Injector,
    private toastyService: ToastyService
  ) {


  }

  chooseImg(event: any) {
    if (event && event.target && event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      if (file.size > 1 * 1024 * 1024) {
        return this.toastyService.warning('Image Size should be less than or equal to 1MB');
      }
      this.imageCropper(file).open();
    }

  }

  setUploader() {
    if (this.isInitUploader) {
      return
    }
    this.isInitUploader = true;
    this.uploader = new FileUploader({
      itemAlias: 'image',
      queueLimit: 1,
      headers: [{ name: 'x-access-token', value: localStorage.getItem('token') }]
    });

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.uploader.clearQueue();
      let res = JSON.parse(response);
      if (this.afterUpload) {
        this.afterUpload();
      }
      if (!res.isSuccess) {
        return alert({ title: 'Error', msg: 'Image upload failed' });
      }
      this.isProcessing = false;
    };

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.uploader.clearQueue();
      this.isProcessing = false;
      return alert({ title: 'Error', msg: 'Image upload failed' });
    };
  }

  upload(afterUpload?: () => any) {
    this.afterUpload = afterUpload;
    if (this.uploader.queue.length > 0) {
      this.uploader.queue[0].upload();
    }
  }



  setUploderOptions(options: FileUploaderOptions) {
    this.uploader.setOptions(options);
  }

  imageCropper(file?: File) {
    this.setUploader();
    this.file = file;
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(CropperComponent)
      .create(this.injector);
    if (file) {
      componentRef.instance.file = file;
    }

    let sub: Subscription;
    let alert: AlertProps = {
      isOpened: false,
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
        sub = componentRef.instance.onClose.subscribe((data) => {
          alert.close(data);
        });
        alert.isOpened = true;
        document.body.style.overflow = "hidden";
        document.getElementById('app-main-container');

      },
      close: (file?: File) => {
        this.applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
        sub.unsubscribe();
        this.file = file;
        this.uploader.clearQueue();
        if (file) {
          this.uploader.addToQueue([file]);
        }
        alert.onClose.emit(file);
        alert.isOpened = false;
        document.body.style.overflow = "auto";
        document.getElementById('app-main-container').classList.remove("app_blur_bg");
        return file
      },


    }
    return alert;
  }
}
