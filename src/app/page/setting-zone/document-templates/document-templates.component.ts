import {Component, Inject, OnInit} from '@angular/core';
import {GodButtonService} from '../../../core/services/god-button.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {
  NoteTemplatesCreateDialogComponent
} from '../../../theme/component/note-templates/components/note-templates-create-dialog/note-templates-create-dialog.component';

@Component({
  selector: 'app-document-templates',
  template: `
      <div class="container-fluid mt-2">
          <div class="row">
              <div class="col">
                  <router-outlet></router-outlet>
              </div>
          </div>
      </div>
  `,
})
export class DocumentTemplatesComponent implements OnInit {

  constructor(
    @Inject(GodButtonService) private readonly godButtonService: GodButtonService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('Šablóny poznámok | Dataxer');
  }

  ngOnInit() {
    this.godButtonService.title = this.route.snapshot.data.godButtonTitle;
    this.godButtonService.routerLink = this.route.snapshot.data.gotButtonRouteLink;
    this.godButtonService.component = NoteTemplatesCreateDialogComponent;
    this.godButtonService.showModal = true;
    this.godButtonService.menuItem = [];
  }

}
