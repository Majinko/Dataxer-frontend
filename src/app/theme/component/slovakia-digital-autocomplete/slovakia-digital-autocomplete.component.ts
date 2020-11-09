import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SlovakiaDigital} from "../../../core/models/slovakiaDigital";
import {Subject} from "rxjs";
import {ContactService} from "../../../core/services/contact.service";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-slovakia-digital-autocomplete',
  templateUrl: './slovakia-digital-autocomplete.component.html',
  styleUrls: ['./slovakia-digital-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SlovakiaDigitalAutocompleteComponent),
    multi: true
  }]
})
export class SlovakiaDigitalAutocompleteComponent implements ControlValueAccessor, OnInit {
  value: string;
  isLoading: boolean = false;
  private searchTerms = new Subject<string>();
  slovakiaDigitalFirms: SlovakiaDigital[] = [];

  @Output() findFirm: EventEmitter<SlovakiaDigital> = new EventEmitter();

  constructor(
    private contactService: ContactService
  ) {
  }

  onTouched = () => {
  };
  onChange = _ => {
  };

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // tap it
      tap(() => this.isLoading = true),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.contactService.digitalSlovakia(term)),
    ).subscribe(firms => {
      this.slovakiaDigitalFirms = firms;
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
    this.isLoading = true;
    this.searchTerms.next(this.value);
  }

  displayFn(firm: SlovakiaDigital) {
    if (firm && firm.name) {
      return firm.name;
    } else {
      return firm;
    }
  }

  setFirm(firm: SlovakiaDigital) {
    this.onChange(firm);
    this.findFirm.emit(firm);
  }
}
