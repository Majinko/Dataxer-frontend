import {CustomFile} from './customFile';

export interface UploadContext<T> {
  files: CustomFile[];
  object: T;
}
