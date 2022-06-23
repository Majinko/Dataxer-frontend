import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../core/services/message.service';
import {PhotoService} from '../../../core/services/photo.service';
import {UploadService} from '../../../core/services/upload.service';
import {Photo} from '../../../core/models/photo';

@Component({
  selector: 'app-multiple-photo-uploader',
  templateUrl: './multiple-photo-uploader.component.html',
  styleUrls: ['./multiple-photo-uploader.component.scss']
})
export class MultiplePhotoUploaderComponent implements OnInit {
  isLoad: boolean = false;
  maxFileSize: number = 10; // in MB;
  photos: Photo [] = [];

  @Input() modelId: number;
  @Input() modelType: string;

  constructor(
    private readonly messageService: MessageService,
    private readonly photoService: PhotoService,
    private readonly uploadService: UploadService,
  ) {
  }

  ngOnInit(): void {
  }

  onFileChange(files: File[]) {

    if (this.checkFilesSize(files)) {
      const promise = new Promise((resolve, reject) => {
        this.isLoad = true;

        for (let i = 0; i < files.length; i++) {
          this.uploadService.pushUpload( this.modelType + '/', files[i]).then(ref => {
            ref.ref.getDownloadURL().then((url) => {

              const photo: Photo = {
                id: null,
                url,
                size: files[i].size,
                modelId: this.modelId,
                modelType: this.modelType
              } as Photo;

              this.photos.push(photo);

              if (i === files.length - 1) {
                resolve('upload to firebase finish');
              }
            });
          });
        }
      });

      // are files are uploads to firebase
      promise.then(() => {
        this.storeFiles();
      });
    } else {
      this.messageService.add(`Súbor ma viac ako ${this.maxFileSize}MB`);
    }
  }

  private checkFilesSize(files: File[]) {
    let isPhotoSizeOk: boolean = true;

    for (let i = 0; i < files.length; i++) {
      if (files[i].size / 1024 / 1024 > this.maxFileSize) {
        isPhotoSizeOk = false;
      }
    }

    return isPhotoSizeOk;
  }

  private storeFiles() {
    this.photoService.storeAll(this.photos).subscribe(() => {
      this.isLoad = false;
    });
  }
}
