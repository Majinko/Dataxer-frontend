import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Ng2ScreenshotAPI} from 'ng2-screenshot';
import {PinchZoomComponent} from 'ngx-pinch-zoom';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {PdfServiceService} from '../../../../../../../core/services/pdf-service.service';
import {IMAGEDATA} from '../image';

@Component({
  selector: 'app-cost-create-images',
  templateUrl: './cost-create-images.component.html',
  styleUrls: ['./cost-create-images.component.scss']
})
export class CostCreateImagesComponent implements OnInit {
  isLoad: boolean = false;
  imageData: string[] = IMAGEDATA; // IMAGEDATA alebo []

  api: Ng2ScreenshotAPI;
  documentType: string;
  documentTypeId: number;
  isLoading = false;

  @Input() isOpen;
  @Input() files;
  @Input() documentData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onScreenshot: EventEmitter<string> = new EventEmitter<string>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('myPinch') myPinch;

  @HostListener('window:keydown.enter', ['$event'])
  mouseUp(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.api.toPng((dataUrl: string) => {
        console.log('dataUrl');
        console.log(dataUrl);
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
    private pdfService: PdfServiceService
  ) { }

  ngOnInit(): void {
  }

  setTransform(properties: { x?: number, y?: number, scale?: number }): void {
    this.myPinch.setTransform(properties);
  }

  isOpenChange($event: boolean): void {
    this.isOpen = $event;
    this.onOpenChange.emit($event);
  }

  apiInitialized($event: Ng2ScreenshotAPI): void {
    this.api = $event;
  }

  slideToggle($event: MatSlideToggleChange): void {
    this.onOpenChange.emit($event.checked);
  }

  setPinch(myPinch: PinchZoomComponent): void {
    this.myPinch = myPinch;
  }

  zoomIn(): void {
    this.myPinch.zoomIn();
  }

  zoomOut(): void {
    this.myPinch.zoomOut();
  }

  onFileChange(files: File[]) {
    this.isLoad = true;

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
}


