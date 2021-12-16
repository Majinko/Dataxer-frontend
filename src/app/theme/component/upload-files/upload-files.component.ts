import { Component, OnInit } from '@angular/core';
import {UploadHelper} from '../../../core/class/UploadHelper';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  files = [];

  constructor(
    public uploadHelper: UploadHelper,
  ) { }

  ngOnInit(): void {
  }

  uploadFiles(files: any) {
    this.uploadHelper.uploadFile(files);
    this.seeFiles();
  }
  seeFiles(): void {
    this.files = this.uploadHelper.files;
  }

  remove(index: number) {
    this.files.splice(index, 1);
    this.uploadHelper.files = this.files;
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
