import { Component, OnInit, EventEmitter, AfterViewInit } from '@angular/core';
import Cropper from 'cropperjs';
enum DragMode {
  Crop = 'crop',
  Move = 'move',
  None = 'none',
}

enum ImageSmoothingQuality {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export interface GetCroppedCanvasOptions {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  fillColor?: string;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: ImageSmoothingQuality;
}
@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent implements OnInit, AfterViewInit

 {

  onClose: EventEmitter<any> = new EventEmitter();
  cropper: Cropper;
  file: File;
  processing: boolean;
  isError: boolean = false;

  constructor() { }

  ngOnInit() {
    if (!this.file) {
      this.isError = true;
    }
  }

  // ngAfterViewInit() {
  //   var image = document.querySelector('#image') as HTMLImageElement;
  //   this.cropper = new Cropper(image, {
  //     movable: false,
  //     zoomable: false,
  //     rotatable: false,
  //     scalable: false
  //   });
  // }

  close(file?: File) {
    this.onClose.emit(file);
  }

  save() {
    let result = this.cropper.getCroppedCanvas({ width: 500, height: 200 });
    this.getImageFromBase64(this.file, result.toDataURL('image/jpeg', 0.8), (file) => {
      this.close(file);
    });
  }

  ngAfterViewInit() {
    this.dataUrl(this.file, (err, base64) => {
      document.getElementById('image')['src'] = base64;
      this.initCropper();
    });
  }


  private initCropper() {
    // const image: HTMLImageElement = document.getElementById('image') as HTMLImageElement;
    // const img = new Image();
    const image = document.querySelector('#image') as HTMLImageElement;


    // img.onload = () => {
    this.cropper = new Cropper(image, {
      dragMode: DragMode.Move,
      aspectRatio: 500 / 200, // for free crop
      autoCrop: true,
      autoCropArea: 0.9,
      restore: false,
      guides: true,
      center: true,
      responsive: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
    });
    // };
    // img.src = image['src'];
  }

  private dataUrl(file: File, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const target: any = e.target;
      callback(null, target.result);
    };
    reader.readAsDataURL(file);
  }

  private getImageFromBase64(file: File, base64, callback) {
    let dataURI = base64;
    let typeOfImage = file.type;
    let nameOfImage = file.name;
    // convert base64 to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab], { type: 'image/jpeg' });
    let editedFile: any;

    try {
      editedFile = new File([bb], nameOfImage, { type: 'image/jpeg' });
    } catch (err) {
      editedFile = bb;
      editedFile.name = nameOfImage;
      editedFile.lastModifiedDate = new Date();
    }
    return callback(editedFile);
  }

}
