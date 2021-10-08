import {Injectable} from '@angular/core';
import {CustomFile} from '../models/customFile';
import {AngularFireStorage} from '@angular/fire/storage';
import {DomSanitizer} from '@angular/platform-browser';
import {StorageService} from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadHelper {
  constructor(
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private storage: AngularFireStorage
  ) {
  }

  public isLoad: boolean = true;
  public imageUrl: string | ArrayBuffer | null = null;
  public file: File = null;
  public files: CustomFile[] = [];
  public isDefault: boolean = false;

  public prepareItemUrl(path: string) {
    this.storage.ref(path).getDownloadURL().subscribe(url => {
      this.imageUrl = url;
      this.isLoad = false;
    });
  }

  public getItemUrl(path: string) {
    return this.storage.ref(path).getDownloadURL().subscribe(url => {
      return url;
    });
  }

  public uploadFile(files: File[], issDefault: boolean = false) {
    this.files = [];

    for (let i = 0; i < files.length; i++) {
      this.getChangeFile(files[i], issDefault);
    }
  }

  /* public uploadFile(files: File[], isDefault: boolean = false) {
     for (const file of files) {
       this.getChangeFile(file, isDefault);
     }
   }*/

  private getChangeFile(file: File, isDefault: boolean): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // @ts-ignore
      const arrayBuffer = new Uint8Array(reader.result);
      const f: CustomFile = {
        isDefault,
        fileName: file.name,
        contentType: file.type,
        size: file.size,
        // @ts-ignore
        content: Array.from(arrayBuffer)
      };

      this.files.push(f);
    };
  }

  public prepareCustomFile(file: File, isDefault: boolean = false) {
    this.file = file;
    this.isDefault = isDefault;

    this.preparePreviewImageBeforeUpload(file);

    return new Promise((resolve => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.file);
      reader.onload = () => {

        // @ts-ignore
        const arrayBuffer = new Uint8Array(reader.result);
        const f: CustomFile = {
          name: this.file.name,
          isDefault: this.isDefault,
          fileName: this.file.name,
          contentType: this.file.type,
          size: this.file.size,
          // @ts-ignore
          content: Array.from(arrayBuffer)
        };

        resolve(f);
      };
    }));
  }

  private preparePreviewImageBeforeUpload(file: File) {
    const reader = new FileReader();
    reader.onload = e => this.imageUrl = reader.result;
    reader.readAsDataURL(file);
  }

  public downloadFile(file: CustomFile) {
    this.storageService.getById(file.id).subscribe(file => {
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
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      const fileName = file.fileName;

      downloadLink.href = blobUrl;
      downloadLink.download = fileName;
      downloadLink.click();
    });
  }

  destroy(id: number) {
    this.storageService.destroy(id).subscribe();
  }
}
