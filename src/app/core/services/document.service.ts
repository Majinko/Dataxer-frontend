import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  newItem = new Subject<boolean>();

  constructor() {}

  addItem() {
    this.newItem.next(true);
  }
}
