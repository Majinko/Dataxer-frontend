import {Component, OnInit} from '@angular/core';
import {PdfServiceService} from '../../../../../core/services/pdf-service.service';

@Component({
  selector: 'app-cost-create-from-file',
  templateUrl: './cost-create-from-file.component.html',
  styleUrls: ['./cost-create-from-file.component.scss']
})
export class CostCreateFromFileComponent implements OnInit {
  isLoad: boolean = false;
  imageData: string[] = [];

  constructor(
    private pdfService: PdfServiceService
  ) {
  }

  ngOnInit(): void {
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
