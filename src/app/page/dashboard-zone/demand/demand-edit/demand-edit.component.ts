import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Demand} from '../../../../core/models/demand';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../../core/services/message.service';
import {DemandService} from '../../../../core/services/demand.service';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {CategoryService} from '../../../../core/services/category.service';

@Component({
  selector: 'app-demand-edit',
  templateUrl: './demand-edit.component.html',
  styleUrls: ['./demand-edit.component.scss']
})
export class DemandEditComponent implements OnInit {
  demand: Demand;
  formGroup: FormGroup;
  isSubmit: boolean = false;
  categories: CategoryItemNode[];
  source: string[] = ['E-mail', 'Web', 'Online reklama', 'Telefón', 'Osobný kontak'];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private demandService: DemandService
  ) {
  }

  ngOnInit(): void {
    this.getById();

    this.getCategories();
  }

  getById() {
    this.demandService.getById(+this.route.snapshot.paramMap.get('demand_id')).subscribe(d => {
      this.demand = d;

      this.prepareForm();
    });
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: [null, Validators.required],
      category: [null, Validators.required],
      description: '',
      source: '',
      state: '',
      contacts: [null, Validators.required],
    });

    this.formGroup.patchValue(this.demand);
  }


  getCategories() {
    this.categoryService.all().subscribe(c => this.categories = c);
  }

  submit() {
    this.isSubmit = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.demandService.store(this.formGroup.value).subscribe(() => {
      this.messageService.add('Dopyt bol aktualizovaný');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
