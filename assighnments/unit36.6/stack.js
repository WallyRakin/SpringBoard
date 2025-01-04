/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null; // Top of the stack
    this.last = null;  // Bottom of the stack
    this.size = 0;
  }

  /** push(val): add new value to top of the stack. Returns undefined. */
  push(val) {
    const newNode = new Node(val);
    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    this.size += 1;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */
  pop() {
    if (this.isEmpty()) {
      throw new Error("Cannot pop from an empty stack.");
    }
    const removedValue = this.first.val;
    this.first = this.first.next;
    this.size -= 1;
    if (this.size === 0) {
      this.last = null;
    }
    return removedValue;
  }

  /** peek(): return the value of the first node in the stack. */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */
  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;
