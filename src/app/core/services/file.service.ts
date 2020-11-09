import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  prepareFile(file: File) {
    this.store(file).subscribe();
  }

  store(file: File) {
    const formData = new FormData();

    formData.append('file', file, file.name)

    return this.http.post<void>(`${environment.baseUrl}/file/uploadFile`, formData)
  }
}
