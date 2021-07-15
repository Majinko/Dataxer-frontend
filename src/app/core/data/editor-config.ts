// @ts-ignore
import {AngularEditorConfig} from '@kolkov/angular-editor';

export const EDITORCONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '300',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Text e-mailu',
  defaultParagraphSeparator: '',
  defaultFontName: 'arial',
  defaultFontSize: '',
  customClasses: [
    {
      name: 'bg',
      class: 'bg-red',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'strikeThrough',
      'heading',
      'fontName',
    ],
    [
      'customClasses',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
    ]
  ]
};
