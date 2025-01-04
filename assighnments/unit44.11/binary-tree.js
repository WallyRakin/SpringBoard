/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** 
   * minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf.
   */
  minDepth() {
    if (!this.root) return 0;

    // Use BFS to find the first leaf node
    const queue = [{ node: this.root, depth: 1 }];

    while (queue.length > 0) {
      const { node, depth } = queue.shift();

      // If this is a leaf node, return its depth
      if (!node.left && !node.right) {
        return depth;
      }

      if (node.left) {
        queue.push({ node: node.left, depth: depth + 1 });
      }

      if (node.right) {
        queue.push({ node: node.right, depth: depth + 1 });
      }
    }

    return 0; // Should never reach here
  }

  /** 
   * maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf.
   */
  maxDepth() {
    if (!this.root) return 0;

    // Use DFS to find the maximum depth
    let maxDepth = 0;

    function traverse(node, depth) {
      if (!node) return;
      if (depth > maxDepth) {
        maxDepth = depth;
      }
      traverse(node.left, depth + 1);
      traverse(node.right, depth + 1);
    }

    traverse(this.root, 1);
    return maxDepth;
  }

  /** 
   * maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once.
   */
  maxSum() {
    let maxSum = 0;

    function traverse(node) {
      if (!node) return 0;

      // Recursively call on left and right children
      let leftSum = traverse(node.left);
      let rightSum = traverse(node.right);

      // Calculate the maximum sum at this node
      let currentSum = node.val + leftSum + rightSum;

      // Update the global maxSum if needed
      if (currentSum > maxSum) {
        maxSum = currentSum;
      }

      // Return the maximum sum of one branch
      return node.val + Math.max(leftSum, rightSum);
    }

    traverse(this.root);
    return maxSum;
  }

  /** 
   * nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists.
   */
  nextLarger(lowerBound) {
    let nextLarger = null;

    function traverse(node) {
      if (!node) return;

      if (node.val > lowerBound) {
        if (nextLarger === null || node.val < nextLarger) {
          nextLarger = node.val;
        }
      }

      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return nextLarger;
  }

  /** 
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents.)
   */
  areCousins(node1, node2) {
    if (node1 === node2) return false;
    if (!this.root) return false;

    // Helper function to find depth and parent of a node
    function findDepthAndParent(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };

      let left = findDepthAndParent(node.left, target, depth + 1, node);
      if (left) return left;
      let right = findDepthAndParent(node.right, target, depth + 1, node);
      return right;
    }

    const node1Info = findDepthAndParent(this.root, node1);
    const node2Info = findDepthAndParent(this.root, node2);

    if (!node1Info || !node2Info) return false;

    return (
      node1Info.depth === node2Info.depth &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** 
   * serialize(tree): serialize the BinaryTree object tree into a string.
   */
  static serialize(tree) {
    const result = [];

    function traverse(node) {
      if (!node) {
        result.push('null');
        return;
      }
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(tree.root);
    return result.join(',');
  }

  /** 
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object.
   */
  static deserialize(stringTree) {
    if (!stringTree) return new BinaryTree();

    const values = stringTree.split(',');
    let index = 0;

    function buildTree() {
      if (index >= values.length) return null;

      const val = values[index];
      index++;

      if (val === 'null') return null;

      const node = new BinaryTreeNode(Number(val));
      node.left = buildTree();
      node.right = buildTree();
      return node;
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** 
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree.
   */
  lowestCommonAncestor(node1, node2) {
    function findLCA(current, node1, node2) {
      if (!current) return null;

      if (current === node1 || current === node2) {
        return current;
      }

      const left = findLCA(current.left, node1, node2);
      const right = findLCA(current.right, node1, node2);

      if (left && right) return current;
      return left || right;
    }

    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
