class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Adds a single vertex to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Adds multiple vertices to the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.addVertex(vertex));
  }

  // Adds an edge between two vertices by updating their adjacency sets
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  }

  // Removes the edge between two vertices by updating their adjacency sets
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  }

  // Removes a vertex and all edges connected to it
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) {
      // Remove this vertex from all adjacent nodes
      this.nodes.forEach(node => {
        node.adjacent.delete(vertex);
      });
      // Remove the vertex from the graph
      this.nodes.delete(vertex);
    }
  }

  // Performs Depth-First Search (DFS) starting from the given node
  depthFirstSearch(start) {
    if (!this.nodes.has(start)) return [];

    const visited = new Set();
    const result = [];

    const traverse = (node) => {
      if (!node || visited.has(node)) return;
      visited.add(node);
      result.push(node.value);
      node.adjacent.forEach(neighbor => traverse(neighbor));
    };

    traverse(start);
    return result;
  }

  // Performs Breadth-First Search (BFS) starting from the given node
  breadthFirstSearch(start) {
    if (!this.nodes.has(start)) return [];

    const visited = new Set();
    const queue = [start];
    const result = [];

    while (queue.length > 0) {
      const current = queue.shift();
      if (!visited.has(current)) {
        visited.add(current);
        result.push(current.value);
        current.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };
