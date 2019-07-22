import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-image-uploading',
  templateUrl: './image-uploading.component.html',
  styleUrls: ['./image-uploading.component.scss']
})
export class ImageUploadingComponent implements OnInit {
  @Input() imageUrl;
  @Output() imageChanged = new EventEmitter<any>();
  @ViewChild('showImage') showImage;
  acceptedImageTypes = { 'image/png': true, 'image/jpeg': true, 'image/gif': true };
  image = new Image();
  canRemove = false;

  constructor(
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.image.height = 200;
    this.image.style.display = 'block';
    this.image.style.marginBottom = '20px';
    if (this.imageUrl) {
      this.image.src = this.imageUrl;
      this.showImage.nativeElement.appendChild(this.image);
      this.canRemove = true;
    }
  }

  imageChange(event) {
    this.image.style.display = 'block';
    this.showImage.innerHTML = '';
    this.checkfiles(event.target.files);
  }

  // checkfiles
  checkfiles(files) {
    if (this.acceptedImageTypes[files[0].type] !== true) {
      this.showImage.nativeElement.innerHTML = 'Not an image';
      return;
    } else if (files.length > 1) {
      this.showImage.nativeElement.innerHTML = 'Only one image/time';
      return;
    } else {
      this.readfiles(files);
    }
  }

  // readfiles
  readfiles(files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.showImage.nativeElement.innerHTML = '';
      const fileReader = event.target as FileReader;
      this.image.src = fileReader.result as string;
      this.showImage.nativeElement.appendChild(this.image);
      this.imageChanged.emit({ files: files[0], bytes: this.image.src});
      this.canRemove = true;
    };
    reader.readAsDataURL(files[0]);
  }

  removeImg() {
    this.image.src = '';
    this.image.style.display = 'none';
    this.canRemove = false;
  }

}
