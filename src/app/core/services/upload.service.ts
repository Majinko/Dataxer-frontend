import {Injectable} from '@angular/core';
import {Upload} from '../models/upload';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireUploadTask} from '@angular/fire/storage/task';
import {CompanyService} from './company.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  tasks: AngularFireUploadTask;

  constructor(
    private afStorage: AngularFireStorage,
    private companyService: CompanyService,
  ) {
  }

  pushUpload(path: string, upload: File): AngularFireUploadTask {
    return this
      .afStorage
      .upload(`${this.companyService.company.cin}/${path}/${upload.name}`, upload);
  }
}
