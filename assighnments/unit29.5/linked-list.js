/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */
  push(val) {
    const newNode = new Node(val);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */
  unshift(val) {
    const newNode = new Node(val);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */
  pop() {
    if (this.isEmpty()) {
      throw new Error("Cannot pop from an empty list.");
    }

    let current = this.head;
    let prev = null;

    while (current.next !== null) {
      prev = current;
      current = current.next;
    }

    const removedVal = current.val;

    if (prev === null) {
      // List has only one node
      this.head = null;
      this.tail = null;
    } else {
      prev.next = null;
      this.tail = prev;
    }

    this.length -= 1;
    return removedVal;
  }

  /** shift(): return & remove first item. */
  shift() {
    if (this.isEmpty()) {
      throw new Error("Cannot shift from an empty list.");
    }

    const removedVal = this.head.val;
    this.head = this.head.next;
    this.length -= 1;

    if (this.isEmpty()) {
      this.tail = null;
    }

    return removedVal;
  }

  /** getAt(idx): get val at idx. */
  getAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Index out of bounds.");
    }

    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < idx) {
      current = current.next;
      currentIndex += 1;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */
  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Index out of bounds.");
    }

    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < idx) {
      current = current.next;
      currentIndex += 1;
    }

    current.val = val;
    return true;
  }

  /** insertAt(idx, val): add node w/val before idx. */
  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Index out of bounds.");
    }

    if (idx === 0) {
      this.unshift(val);
      return;
    }

    if (idx === this.length) {
      this.push(val);
      return;
    }

    const newNode = new Node(val);
    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < idx - 1) {
      current = current.next;
      currentIndex += 1;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */
  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Index out of bounds.");
    }

    if (idx === 0) {
      return this.shift();
    }

    if (idx === this.length - 1) {
      return this.pop();
    }

    let current = this.head;
    let currentIndex = 0;
    let prev = null;

    while (currentIndex < idx) {
      prev = current;
      current = current.next;
      currentIndex += 1;
    }

    prev.next = current.next;
    this.length -= 1;
    return current.val;
  }

  /** average(): return an average of all values in the list */
  average() {
    if (this.isEmpty()) return 0;

    let total = 0;
    let count = 0;
    let current = this.head;

    while (current !== null) {
      total += current.val;
      count += 1;
      current = current.next;
    }

    return total / count;
  }

  /** isEmpty(): return true if the list is empty, otherwise false */
  isEmpty() {
    return this.length === 0;
  }
}

module.exports = LinkedList;
