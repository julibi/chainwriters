import { Node } from 'slate';

export const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

export const serializeToMarkdown = (text) => {
  const textArray = text.split('\n');
  const nodes = textArray.map((textString) => ({
    type: 'paragraph',
    children: [{ text: textString }],
  }));

  return nodes;
};
