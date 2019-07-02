import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../services/store.service';
import { Logo } from '../models/logo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-store-branding',
  templateUrl: './store-branding.component.html',
  styleUrls: ['./store-branding.component.scss']
})
export class StoreBrandingComponent implements OnInit {
  loading = false;
  loadingButton = false;

  @ViewChild('imageDrop') imageDrop;
  acceptedImageTypes = { 'image/png': true, 'image/jpeg': true, 'image/gif': true };
  imageUpload = this.formBuilder.group({
    imageInput: ['', Validators.required]
  });
  logoFile: any;
  logo: Logo;
  form: FormGroup;


  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.storeService.getBrandingDetails()
      .subscribe(res => {
        console.log(res);
        // this.socialNetworksArray = res.socialNetworks;
        this.logo = res.logo;
        this.fillForm(res.socialNetworks);
      });
  }

  // start WORK WITH IMAGE

  // checkfiles
  checkfiles(files) {
    if (this.acceptedImageTypes[files[0].type] !== true) {
      this.imageDrop.nativeElement.innerHTML = 'Not an image';
      return;
    } else if (files.length > 1) {
      this.imageDrop.nativeElement.innerHTML = 'Only one image/time';
      return;
    } else {
      this.readfiles(files);
    }
  }

  // readfiles
  readfiles(files) {
    this.logoFile = files[0];
    const reader = new FileReader();
    const image = new Image();
    reader.onload = (event) => {
      this.imageDrop.nativeElement.innerHTML = '';
      const fileReader = event.target as FileReader;
      image.src = fileReader.result as string;
      image.height = 200;
      image.style.display = 'block';
      image.style.margin = '0 auto';
      this.imageDrop.nativeElement.appendChild(image);
      if (this.imageUpload.controls.imageInput.value == null) {
        const input = this.imageUpload.controls.imageInput as any;
        input.files = files;
      }
    };
    reader.readAsDataURL(files[0]);

  }

  imageUploadSubmitted() {
    // console.log('IMAGE VALUE SUBMIT = =  ', this.imageUpload.controls.imageInput.value);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drop(e) {
    e.preventDefault();
    this.imageUpload.controls.imageInput.reset();
    this.imageDrop.innerHTML = '';
    this.checkfiles(e.dataTransfer.files);
  }

  // imageChange
  imageChange(event) {
    this.imageDrop.innerHTML = '';
    this.checkfiles(event.target.files);
  }

  saveLogo() {
    this.loadingButton = true;
    this.storeService.addStoreLogo(this.logoFile)
      .subscribe(res => {
        console.log(res);
        this.loadingButton = false;
      }, error => {
        this.loadingButton = false;
      });
  }

  // end WORK WITH IMAGE


  // start WORK WITH SOCIAL NETWORKS

  private createForm() {
    this.form = this.formBuilder.group({
      socialNetworks: this.formBuilder.array([])
    });

  }

  fillForm(socialNetworksArray) {
    const control = <FormArray>this.form.controls.socialNetworks;
    socialNetworksArray.forEach(el => {
      control.push(
        this.formBuilder.group({
          id: el.id,
          active: el.active,
          key: el.key,
          type: el.type,
          value: el.value
        })
      );
    });
  }

  get socialNetworks(): FormArray {
    return <FormArray>this.form.get('socialNetworks');
  }

  saveNetworks() {
    this.storeService.updateSocialNetworks(this.form.value)
      .subscribe(res => {
        console.log(res);
        this.toastr.success('Social networks successfully updated.', 'Success');
      });
  }

  // end WORK WITH SOCIAL NETWORKS

}
