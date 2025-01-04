/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** 
   * sumValues(): add up all of the values in the tree.
   * @returns {number} - The sum of all node values.
   */
  sumValues() {
    if (!this.root) return 0;

    let total = 0;

    function traverse(node) {
      if (!node) return;
      total += node.val;
      for (let child of node.children) {
        traverse(child);
      }
    }

    traverse(this.root);
    return total;
  }

  /** 
   * countEvens(): count all of the nodes in the tree with even values.
   * @returns {number} - The count of nodes with even values.
   */
  countEvens() {
    if (!this.root) return 0;

    let count = 0;

    function traverse(node) {
      if (!node) return;
      if (node.val % 2 === 0) count += 1;
      for (let child of node.children) {
        traverse(child);
      }
    }

    traverse(this.root);
    return count;
  }

  /** 
   * numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound.
   * @param {number} lowerBound - The value to compare against.
   * @returns {number} - The count of nodes with values greater than lowerBound.
   */
  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = 0;

    function traverse(node) {
      if (!node) return;
      if (node.val > lowerBound) count += 1;
      for (let child of node.children) {
        traverse(child);
      }
    }

    traverse(this.root);
    return count;
  }
}

module.exports = { Tree, TreeNode };
