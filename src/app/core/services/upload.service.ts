import {Injectable} from '@angular/core';
import {Upload} from '../models/upload';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthService} from './auth.service';
import {AngularFireUploadTask} from '@angular/fire/storage/task';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  tasks: AngularFireUploadTask;

  constructor(
    private afStorage: AngularFireStorage,
    private authService: AuthService
  ) {
  }

  pushUpload(path: string, upload: Upload): AngularFireUploadTask {
   return  this.afStorage.upload(`${this.authService.user.appKey}/${path}/${upload.name}`, upload);
  }
}
