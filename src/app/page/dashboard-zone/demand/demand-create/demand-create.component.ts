import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../core/services/category.service";
import {CategoryItemNode} from "../../../../core/models/category-item-node";
import {DemandService} from "../../../../core/services/demand.service";
import {MessageService} from "../../../../core/services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-demand-create',
  templateUrl: './demand-create.component.html',
  styleUrls: ['./demand-create.component.scss']
})
export class DemandCreateComponent implements OnInit {
  formGroup: FormGroup
  categories: CategoryItemNode[];
  source: string[] = ['E-mail', 'Web', 'Online reklama', 'Telefón', 'Osobný kontak'];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private demandService: DemandService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCategories()

    this.prepareForm();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      category: [null, Validators.required],
      description: '',
      source: '',
      state: '',
      contact: [null]
    })
  }

  getCategories() {
    this.categoryService.all().subscribe(c => this.categories = c);
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.demandService.store(this.formGroup.value).subscribe(() => {
      this.router.navigate(['/demand']).then(() => {
        this.messageService.add("Dopyt bol uložený")
      })
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
