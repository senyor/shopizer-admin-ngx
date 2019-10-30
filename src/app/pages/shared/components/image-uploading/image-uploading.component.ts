import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-image-uploading',
  templateUrl: './image-uploading.component.html',
  styleUrls: ['./image-uploading.component.scss']
})
export class ImageUploadingComponent implements OnInit {
  @Input() productImages;
  @Output() imageChanged = new EventEmitter<any>();
  images = [];
  maxSize = 10485760;

  constructor(
    private toastr: ToastrService,
    private dialogService: NbDialogService,
  ) {
  }

  ngOnInit() {
    this.images = this.productImages ? [...this.productImages] : [];
  }

  onSelectFile(event) {
    const quantity = event.target.files.length + this.images.length;
    if (event.target.files && quantity < 10) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.readfiles(event.target.files[i]);
      }
    } else {
      this.toastr.error('You can upload max 10 images');
    }
  }

  readfiles(files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileReader = event.target as FileReader;
      const img = {
        id: 'img' + Math.floor(Math.random() * 1000),
        imageUrl: fileReader.result as string,
        newImage: true,
        bigSize: files.size > this.maxSize
      };
      this.images.push(img);
      this.imageChanged.emit({ type: 'add', data: files });
    };
    reader.readAsDataURL(files);
  }

  removeImage(image) {
    this.dialogService.open(ShowcaseDialogComponent, {})
      .onClose.subscribe(res => {
      if (res) {
        if (!image.hasOwnProperty('newImage')) {
          this.imageChanged.emit({ type: 'remove', data: image.id });
        }
        const index = this.images.findIndex((el) => el.id === image.id);
        if (index !== -1) {
          this.images.splice(index, 1);
        }
      }
    });
  }

}
