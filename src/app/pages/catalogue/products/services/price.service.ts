import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  public events$ = new Subject<unknown>();

  constructor() { }
}
