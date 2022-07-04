// TypeScript users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomElement = {
  type: 'paragraph' | 'block-quote';
  children: CustomText[];
  align?: string;
};
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  align?: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
