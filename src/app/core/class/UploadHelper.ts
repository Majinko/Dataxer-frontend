import {Injectable} from "@angular/core";
import {UploadService} from "../services/upload.service";

@Injectable()
export class UploadHelper {
  constructor(
    private readonly uploadService: UploadService,
  ) {
  }

  uploadFile(path: string, files) {
    this.uploadService.pushUpload(path, files).then(ref => {
      ref.ref.getDownloadURL().then((url) => {
        return url;
      });
    });
  }
}
