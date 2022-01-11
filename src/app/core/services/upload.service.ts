import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireUploadTask} from '@angular/fire/storage/task';
import {AppProfileService} from './app-profile.service';
import {slugify} from '../../../helper';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  tasks: AngularFireUploadTask;

  constructor(
    private afStorage: AngularFireStorage,
    private appProfileService: AppProfileService
  ) {
  }

  pushUpload(path: string, upload: File): AngularFireUploadTask {
    return this
      .afStorage
      .upload(`${slugify(this.appProfileService.appProfile.title)}/${path}/${upload.name}`, upload);
  }
}
