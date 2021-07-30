import {Component, Input, OnInit} from '@angular/core';
import {UploadService} from '../../../core/services/upload.service';
import {FormGroup} from '@angular/forms';
import {MessageService} from '../../../core/services/message.service';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit {
  isUploaded: boolean = false;
  maxFileSize: number = 5;

  @Input() formGroup: FormGroup;
  @Input() nameAttr: string;
  @Input() path: string;
  @Input() isAvatar: boolean = false;

  constructor(
    private readonly uploadService: UploadService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  onFileChange(files: File[]) {
    if (files) {
      if (files[0].size / 1024 / 1024 < this.maxFileSize) {
        this.isUploaded = true;

        this.uploadService.pushUpload(this.path + '/', files[0]).then(ref => {
          ref.ref.getDownloadURL().then((url) => {
            this.isUploaded = false;

            this.formGroup.patchValue({
              [this.nameAttr]: url
            });

            this.formGroup.markAsDirty();
          });
        });
      } else {
        this.messageService.add(`Súbor ma viac ako ${this.maxFileSize}MB`);
      }
    }
  }

  resetValue() {
    this.formGroup.patchValue({
      [this.nameAttr]: null
    });
  }
}
