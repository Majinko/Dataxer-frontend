import {Injectable} from '@angular/core';
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class GodButtonService {
  title: string = null;
  routerLink: string = null;
  showModal: boolean = false;
  component: ComponentType<any>;

  constructor() {
  }
}
