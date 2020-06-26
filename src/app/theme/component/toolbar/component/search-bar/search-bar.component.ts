import {Component, Inject, OnInit} from '@angular/core';
import {SearchBarService} from '../../../../../core/services/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    @Inject(SearchBarService) readonly searchBarService: SearchBarService,
  ) {
  }

  ngOnInit() {
  }

}
