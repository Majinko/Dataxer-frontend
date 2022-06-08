import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../core/models/item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-item-photo',
  templateUrl: './item-photo.component.html',
  styleUrls: ['./item-photo.component.scss']
})
export class ItemPhotoComponent implements OnInit {
  formGroup: FormGroup;
  photos = [
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/dataxer-aab65.appspot.com/o/44224800%2Fuser%2FOliver_Filus_2021.11.30.jpg?alt=media&token=ca7b7e00-b371-4d2e-95d0-a1e9c0dfd985',
      alt: 'foto1'
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/dataxer-aab65.appspot.com/o/44224800%2Fuser%2FKvetka_Milakova_2021.11.30.jpg?alt=media&token=5e00ebdb-d2c5-44c8-8540-b8181a07df4f',
      alt: 'foto2'
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/dataxer-aab65.appspot.com/o/44224800%2Fuser%2FDavid_Manduch_2021.11.30.jpg?alt=media&token=5015122c-185d-428f-b249-ae1726f2aa98',
      alt: 'foto3'
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/dataxer-aab65.appspot.com/o/44224800%2Fuser%2FSilvia_Bohusova_2021.11.30.jpg?alt=media&token=a6b3f710-f5c5-45b6-b5b9-fdcac098a731',
      alt: 'foto4'
    }
  ];

  @Input() item: Item;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      previewUrl: null,
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
  }

}
