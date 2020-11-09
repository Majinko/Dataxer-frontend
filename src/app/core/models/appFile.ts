export interface AppFile {
  id: number;
  name: string;
  fileHash: number;
  size: number;
  downloadURL: string;
  showURL: string;
  isDefault: boolean;
}
