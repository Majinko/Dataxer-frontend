import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {IPhotoservice} from '../../../../../../core/interface/IPhotoservice';
import {Photo} from '../../../../../../core/models/photo';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-item-photo',
  templateUrl: './item-photo.component.html',
  styleUrls: ['./item-photo.component.scss']
})
export class ItemPhotoComponent implements OnInit, IPhotoservice {
  formGroup: FormGroup;
  photos: Photo[] = [];
  modelType: string = 'item';

  @Input() item: Item;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      photo: null,
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
  }

  store() {
    console.log(this.formGroup.value);
  }
}
