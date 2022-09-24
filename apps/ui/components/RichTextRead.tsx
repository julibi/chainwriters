import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Editable, withReact, Slate } from 'slate-react';
import { Node, createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';

const StyledEditable = styled(Editable)`
  min-height: 500px !important;
  font-size: 16px;
  margin-block-start: 1rem;
  overflow-wrap: anywhere;
  font-family: monospace;
`;

interface RichTextReadProps {
  text?: Node[];
}

const RichText = ({ text }: RichTextReadProps) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  if (!text) return;
  return (
    <Slate editor={editor} value={text as Descendant[]}>
      <StyledEditable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        disabled
      />
    </Slate>
  );
};

const Element = ({ children, element }) => {
  const attributes = { contentEditable: false };
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={{ fontSize: '36px' }} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={{ fontSize: '24px' }} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span contentEditable={false}>{children}</span>;
};

export default RichText;
