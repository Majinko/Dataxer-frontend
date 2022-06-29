import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../core/services/message.service';
import {PhotoService} from '../../../core/services/photo.service';
import {UploadService} from '../../../core/services/upload.service';
import {Photo} from '../../../core/models/photo';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

// todo nezabudnut nastilovat
@Component({
  selector: 'app-multiple-photo-uploader',
  templateUrl: './multiple-photo-uploader.component.html',
  styleUrls: ['./multiple-photo-uploader.component.scss']
})
export class MultiplePhotoUploaderComponent implements OnInit {
  isLoad: boolean = false;
  maxFileSize: number = 10; // in MB;
  photos: Photo [] = [];
  loadPhotos: Photo[] = [];

  @Input() modelId: number;
  @Input() modelType: string;

  constructor(
    private readonly messageService: MessageService,
    private readonly photoService: PhotoService,
    private readonly uploadService: UploadService,
  ) {
  }

  ngOnInit(): void {
    this.getFiles();
  }

  onFileChange(files: File[]) {

    if (this.checkFilesSize(files)) {
      const promise = new Promise((resolve, reject) => {
        this.isLoad = true;

        for (let i = 0; i < files.length; i++) {
          this.uploadService.pushUpload(this.modelType + '/', files[i]).then(ref => {
            ref.ref.getDownloadURL().then((url) => {

              const photo: Photo = {
                id: null,
                url,
                size: files[i].size,
                modelId: this.modelId,
                modelType: this.modelType
              } as Photo;

              this.photos.push(photo);

              if (files.length === this.photos.length) {
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.loadPhotos, event.previousIndex, event.currentIndex);

    this.isLoad = true;
    this.photoService.updateOrder(this.loadPhotos).subscribe(() => {
      this.isLoad = false;
    });
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
    this.photoService.storeAll(this.photos).subscribe((photos) => {
      this.isLoad = false;

      this.loadPhotos.push(...photos);
    });
  }

  private getFiles() {
    this.isLoad = true;
    this.photoService.findAllByModelIdAndModelType(this.modelType, this.modelId).subscribe((photos) => {
      this.isLoad = false;
      this.loadPhotos = photos;
    });
  }
}
