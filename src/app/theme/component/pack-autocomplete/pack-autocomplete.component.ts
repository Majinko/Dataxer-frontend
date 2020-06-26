import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {PackService} from "../../../core/services/pack.service";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {Pack} from "../../../core/models/pack";
import {Item} from "../../../core/models/item";

@Component({
  selector: 'app-pack-autocomplete',
  templateUrl: './pack-autocomplete.component.html',
  styleUrls: ['./pack-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PackAutocompleteComponent),
    multi: true
  }]
})

export class PackAutocompleteComponent implements ControlValueAccessor, OnInit {
  packs: Pack[] = []

  value: string;
  isLoading: boolean = false;
  private searchTerms = new Subject<string>();

  @Output() findPack: EventEmitter<Pack> = new EventEmitter<Pack>();

  constructor(private packService: PackService) {
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
      switchMap((term: string) => this.packService.search(term)),
    ).subscribe(packs => {
      this.packs = packs;
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

  search(event: { term: string; items: any[] }) {
    this.onChange(event.term);

    this.searchTerms.next(event.term)
  }

  findingPack(pack: Pack) {
    this.findPack.emit(pack);
  }

  displayFn(pack: any) {
    if (pack && pack.title) {
      return pack.title;
    } else {
      return pack;
    }
  }

  onInputChange() {
    this.onChange(this.value);

    this.isLoading = true;
    this.searchTerms.next(this.value);
  }

  setPack(pack: Pack) {
    this.onChange(pack.title);
    this.findPack.emit(pack);
  }
}
