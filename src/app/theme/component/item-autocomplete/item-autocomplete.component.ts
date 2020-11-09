import {Component, forwardRef, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs";
import {Item} from "../../../core/models/item";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {ItemService} from "../../../core/services/item.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-item-autocomplete',
  templateUrl: './item-autocomplete.component.html',
  styleUrls: ['./item-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ItemAutocompleteComponent),
    multi: true
  }]
})

export class ItemAutocompleteComponent implements ControlValueAccessor, OnInit {
  items: Item[] = [];

  value: string;
  disabled = false;
  isLoading: boolean = false;
  private searchTerms = new Subject<string>();

  @Output() findItem: EventEmitter<Item> = new EventEmitter();

  constructor(private itemService: ItemService) {
  }

  onTouched = () => {
  };
  onChange = _ => {
  };

  ngOnInit() {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // tap it
      tap(() => this.isLoading = true),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.itemService.search(term)),
    ).subscribe(items => {
      this.items = items;
      this.isLoading = false;
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onInputChange() {
    this.onChange(this.value);

    this.isLoading = true;
    this.searchTerms.next(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  displayFn(item: any) {
    if (item && item.title) {
      return item.title;
    } else {
      return item;
    }
  }

  setItem(item: Item) {
    this.onChange(item);
    this.findItem.emit(item);
  }
}
