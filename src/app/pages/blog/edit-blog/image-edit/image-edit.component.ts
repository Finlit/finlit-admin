import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as Cropper from 'cropperjs/dist/cropper';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  file: File;
  processing: boolean;
  cropper: Cropper;

  constructor(public dialogRef: MatDialogRef<ImageEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: File }) {
    this.file = data.file;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataUrl(this.file, (err, base64) => {
      document.getElementById('image')['src'] = base64;
      this.initCropper();
    });
  }

  private initCropper() {
    const image: HTMLImageElement = document.getElementById('image') as HTMLImageElement;
    const img = new Image();

    img.onload = () => {
      this.cropper = new Cropper(image, {
        dragMode: 'move', // only in case of 'FALSE' value
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
    };
    img.src = image['src'];
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

  saveImg() {
    this.save((file: File) => {
      this.dialogRef.close(file);
    });
  }

  save(cb) {
    let result = this.cropper.getCroppedCanvas(800, 800);
    this.getImageFromBase64(this.file, result.toDataURL('image/jpeg', 0.8), cb);

    // try {
    //   result.toBlob((blob: any) => {
    //     blob.name = this.file.name;
    //     blob.lastModifiedDate = new Date();
    //     cb(blob);
    //   }, 'image/jpeg', 0.8)
    // } catch (err) {
    //   this.getImageFromBase64(this.file, result.toDataURL('image/jpeg', 0.8), cb);
    // }
  }


}
