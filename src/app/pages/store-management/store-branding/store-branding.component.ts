import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../services/store.service';
import { Logo } from '../models/logo';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-store-branding',
  templateUrl: './store-branding.component.html',
  styleUrls: ['./store-branding.component.scss']
})
export class StoreBrandingComponent implements OnInit {
  storeCode = '';
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
    private translate: TranslateService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = true;
    this.storeCode = localStorage.getItem('merchant');
    this.storeService.getBrandingDetails(this.storeCode)
      .subscribe(res => {
        this.logo = res.logo;
        this.fillForm(res.socialNetworks);
        this.loading = false;
      });
  }

  // start WORK WITH IMAGE

  // checkfiles
  checkfiles(files) {
    if (this.acceptedImageTypes[files[0].type] !== true) {
      this.imageDrop.nativeElement.innerHTML = this.translate.instant('STORE_BRANDING.NOT_AN_IMAGE');
      return;
    } else if (files.length > 1) {
      this.imageDrop.nativeElement.innerHTML = this.translate.instant('STORE_BRANDING.ONLY_ONE_IMAGE');
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
      image.className  = 'appendedImage';
      this.imageDrop.nativeElement.appendChild(image);
      if (this.imageUpload.controls.imageInput.value == null) {
        const input = this.imageUpload.controls.imageInput as any;
        input.files = files;
      }
    };
    reader.readAsDataURL(files[0]);

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
        this.toastr.success(this.translate.instant('STORE_BRANDING.LOGO_SAVED'));
        this.loadingButton = false;
      }, error => {
        this.loadingButton = false;
      });
  }

  removeLogo() {
    this.logoFile = null;
    const image = document.getElementsByClassName('appendedImage')[0];
    const node = document.getElementById('imageDrop');
    if (!image) {
      node.removeChild(node.getElementsByTagName('img')[0]);
    } else {
      node.removeChild(node.getElementsByClassName('appendedImage')[0]);
    }
    this.storeService.removeStoreLogo(this.storeCode)
      .subscribe(res => {
        console.log(res);
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
        this.toastr.success(this.translate.instant('STORE_BRANDING.NETWORKS_UPDATED'));
      });
  }

  // end WORK WITH SOCIAL NETWORKS

}
