import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Editable, withReact, Slate } from 'slate-react';
import { Node, createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';

const StyledEditable = styled(Editable)`
  min-height: 500px !important;
  margin-block-start: 1rem;
  padding: 1rem;
  overflow-wrap: anywhere;
  font-family: monospace;
`;

interface RichTextReadProps {
  text: Node[];
}

const RichText = ({ text }: RichTextReadProps) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={text as Descendant[]}>
      <StyledEditable
        contentEditable={false}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        disabled
      />
    </Slate>
  );
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} contentEditable={false}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} contentEditable={false}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} contentEditable={false}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} contentEditable={false}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} contentEditable={false}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} contentEditable={false}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} contentEditable={false}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
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

  return <span {...attributes}>{children}</span>;
};

export default RichText;
