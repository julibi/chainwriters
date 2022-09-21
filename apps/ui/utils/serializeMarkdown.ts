import { Node } from 'slate';

export const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};
