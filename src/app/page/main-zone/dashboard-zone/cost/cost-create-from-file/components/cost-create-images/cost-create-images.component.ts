import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Ng2ScreenshotAPI} from 'ng2-screenshot';
import {PdfServiceService} from '../../../../../../../core/services/pdf-service.service';
import {UploadHelper} from '../../../../../../../core/class/UploadHelper';
import {StorageService} from '../../../../../../../core/services/storage.service';
import {CustomFile} from '../../../../../../../core/models/customFile';

@Component({
  selector: 'app-cost-create-images',
  templateUrl: './cost-create-images.component.html',
  styleUrls: ['./cost-create-images.component.scss']
})
export class CostCreateImagesComponent implements OnInit {
  isLoad: boolean = false;
  imageData: string[] = [];

  api: Ng2ScreenshotAPI;
  documentType: string;
  documentTypeId: number;
  isLoading = false;

  @Input() isOpen;
  @Input() loadedCost;
  @Input() documentData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onScreenshot: EventEmitter<string> = new EventEmitter<string>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onUploadFile: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('myPinch') myPinch;

  @HostListener('window:keydown.enter', ['$event'])
  mouseUp(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.api.toPng((dataUrl: string) => {
        this.onScreenshot.emit(dataUrl);
      });
    }
  }


  @HostListener('window:keydown.escape', ['$event'])
  closeScreen(event: KeyboardEvent): void {
    if (this.isOpen) {
      if (event.key === 'Escape') {
        this.api.cancel();
        this.isOpen = false;
        this.onOpenChange.emit(false);
      }
    }
  }

  constructor(
    private pdfService: PdfServiceService,
    public uploadHelper: UploadHelper,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.loadedCost.subscribe( r => {
      if (r && r.files[0]) {
        this.storageService.getById(r.files[0].id).subscribe((f) => {
          this.downloadFile(f);
        });
      }
    });
  }

  isOpenChange($event: boolean): void {
    this.isOpen = $event;
    this.onOpenChange.emit($event);
  }

  apiInitialized($event: Ng2ScreenshotAPI): void {
    this.api = $event;
  }

  onFileChange(files: File[]) {
    this.isLoad = true;

    this.uploadHelper.uploadFile(files);
    this.onUploadFile.emit(true);

    this.pdfService.createImgFromPdf(files[0]).subscribe({
      next: (r) => {
        this.isLoad = false;
        this.imageData = r;
      },
      error: () => {
        this.isLoad = false;
      }
    });
  }

  private downloadFile(file: CustomFile) {
    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, {type: contentType});
    };
    const blob = b64toBlob(file.content, file.contentType);
    const newFile = new File([blob], file.fileName,  { type: file.contentType });

    this.pdfService.createImgFromPdf(newFile).subscribe({
      next: (r) => {
        this.isLoad = false;
        this.imageData = r;
      },
      error: () => {
        this.isLoad = false;
      }
    });
  }
}


