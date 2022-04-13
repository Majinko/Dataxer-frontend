import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-task-chip-select',
  templateUrl: './task-chip-select.component.html',
  styleUrls: ['./task-chip-select.component.scss']
})
export class TaskChipSelectComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<string[]>;
  items: string[] = [];
  allItems: string[] = ['Janko', 'Ferko', 'Jožko', 'Karok', 'Edo'];

  @Input() type: any;
  @Input() formGroup: FormGroup;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this._filter(item) : this.allItems.slice())),
    );
  }

  ngOnInit(): void {
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.formGroup.get(this.type.type).patchValue(this.items);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
    this.formGroup.get(this.type.type).patchValue(this.items);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.toLowerCase().includes(filterValue));
  }

}
