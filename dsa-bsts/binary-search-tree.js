class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** 
   * insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration.
   */
  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val === current.val) {
        // Duplicate values are not inserted in this BST
        return this;
      }
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else { // val > current.val
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** 
   * insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion.
   */
  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val === current.val) {
      // Duplicate values are not inserted in this BST
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      this.insertRecursively(val, current.left);
    } else { // val > current.val
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      this.insertRecursively(val, current.right);
    }
    return this;
  }

  /** 
   * find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration.
   */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      }
      if (val < current.val) {
        current = current.left;
      } else { // val > current.val
        current = current.right;
      }
    }
    return undefined;
  }

  /** 
   * findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion.
   */
  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else { // val > current.val
      return this.findRecursively(val, current.right);
    }
  }

  /** 
   * dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes.
   */
  dfsPreOrder() {
    const result = [];
    function traverse(node) {
      if (!node) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** 
   * dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes.
   */
  dfsInOrder() {
    const result = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** 
   * dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes.
   */
  dfsPostOrder() {
    const result = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** 
   * bfs(): Traverse the array using BFS.
   * Return an array of visited nodes.
   */
  bfs() {
    const result = [];
    const queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  }

  /** 
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. 
   */
  remove(val, current = this.root, parent = null) {
    if (!current) return undefined;

    if (val < current.val) {
      return this.remove(val, current.left, current);
    } else if (val > current.val) {
      return this.remove(val, current.right, current);
    } else { // Found the node to remove
      // Case 1: No children
      if (!current.left && !current.right) {
        if (!parent) {
          this.root = null;
        } else {
          if (parent.left === current) parent.left = null;
          else parent.right = null;
        }
        return current;
      }

      // Case 2: One child
      if (!current.left || !current.right) {
        const child = current.left ? current.left : current.right;
        if (!parent) {
          this.root = child;
        } else {
          if (parent.left === current) parent.left = child;
          else parent.right = child;
        }
        return current;
      }

      // Case 3: Two children
      // Find in-order successor (smallest in the right subtree)
      let successorParent = current;
      let successor = current.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Swap values
      current.val = successor.val;

      // Remove successor
      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }

      return successor;
    }
  }

  /** 
   * isBalanced(): Returns true if the BST is balanced, false otherwise.
   */
  isBalanced() {
    function checkHeight(node) {
      if (!node) return 0;

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      const heightDiff = Math.abs(leftHeight - rightHeight);
      if (heightDiff > 1) return -1;
      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkHeight(this.root) !== -1;
  }

  /** 
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined.
   */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    // Case 1: The highest node has a left subtree
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }

    // Case 2: The highest node has no left subtree
    if (parent) {
      return parent.val;
    }

    return undefined;
  }
}

module.exports = BinarySearchTree;
