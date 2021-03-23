import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-document-filter',
  templateUrl: './document-filter.component.html',
  styleUrls: ['./document-filter.component.scss']
})
export class DocumentFilterComponent implements OnInit {
  filterForm: FormGroup;
  isFiltering: boolean = false;

  @Output() private onFilter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      state: null,
    });

    this.emitFilter();
  }

  private emitFilter() {
    this.filterForm.valueChanges.subscribe((attr) => {
      this.isFiltering = true;

      this.onFilter.emit();
    });
  }

  /**
   * Reset it
   * @param key
   */
  resetFilterValue(key: string) {
    this.filterForm.patchValue({[key]: null});

    this.checkFilterFormValue();
  }

  /**
   * Check value in filter is not null
   */
  private checkFilterFormValue() {
    let somethingFiltering: number = 0;

    for (const key in this.filterForm.value) {
      somethingFiltering = 0;

      Object.keys(this.filterForm.value).forEach(attr => {
        somethingFiltering += this.filterForm.value[attr] != null ? 1 : 0;
      });

      this.isFiltering = somethingFiltering > 0;
    }
  }
}
