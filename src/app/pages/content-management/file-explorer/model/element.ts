import { SafeStyle } from '@angular/platform-browser';

export class FileElement {
  id?: string;
  isFolder: boolean;
  name: string;
  parent: string;
  file: File;
  preview: any;
  url: any;
  type: string;
}
