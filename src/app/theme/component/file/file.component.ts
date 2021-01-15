import {Component, Input, OnInit} from '@angular/core';
import {UploadHelper} from '../../../core/class/UploadHelper';
import {CustomFile} from '../../../core/models/customFile';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input() files: CustomFile[] = [];
  @Input() deleteFile: boolean = false;

  constructor(
    public uploadHelper: UploadHelper,
  ) {
  }

  ngOnInit(): void {
  }

  delete(file: CustomFile) {
    this.uploadHelper.destroy(file.id);

    this.files = this.files.filter(f => f.id !== file.id);
  }
}
