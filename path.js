import Node from './node.js';
import Stack from './stack.js';
import Queue from './queue.js';

export const calculatePath = (map, startPos, targetPos, algorithm) => {
  let graph = makeGraph(map.data, map.width, map.height);
  let startNode = getNodeById(graph, startPos);
  let targetNode = getNodeById(graph, targetPos);
  let path = [];
  let current = startNode;
  if (algorithm === 'dfs') {
    let stack = new Stack();
    stack.push(startNode);

    while (true) {
      current = stack.top();
      path.push(current.id);
      current.visisted = true;
      if (current.id === targetNode.id) {
        break;
      }
      let unvisited = 0;
      current.adj.forEach((id) => {
        let node = getNodeById(graph, id);
        if (!node.visited) {
          stack.push(node);
          unvisited += 1;
        }
      });
      if (unvisited === 0) {
        stack.pop();
      }
    }
  } else if (algorithm === 'bfs') {
    let queue = new Queue();
    queue.enqueue(startNode);
    while (true) {
      current = queue.dequeue();
      current.visited = true;
      path.push(current.id);
      if (current.id === targetNode.id) {
        break;
      }
      current.adj.forEach((id) => {
        let node = getNodeById(graph, id);
        if (!node.visited) {
          node.visited = true;
          queue.enqueue(node);
        }
      });
    }
  }
  return path;
};

const makeGraph = (map, width, height) => {
  let graph = [];
  for (var y = 0; y < height - 1; y++) {
    for (var x = 0; x < width - 1; x++) {
      if (map[y][x] === 1) {
        continue;
      }
      let adj = [];
      if ((y - 1 > 0) && map[y - 1][x] === 0) {
					adj.push('' + x + ',' + (y - 1));
				}
				if ((y + 1 < map.length) && map[y + 1][x] === 0) {
					adj.push('' + x + ',' + (y + 1));
				}
				if ((x - 1 > 0) && map[y][x - 1] === 0) {
					adj.push('' + (x - 1) + ',' + y);
				}
				if ((x + 1 < map[y].length) && map[y][x + 1] === 0) {
					adj.push('' + (x + 1) + ',' + y);
				}
				graph.push(new Node('' + x + ',' + y, adj));
    }
    return graph;
  }
};

const getNodeById = (graph, nodeId) => {
  return graph.reduce((out, node) => {
    if (node.id === nodeId) {
      out = node;
    }
    return out;
  });
};
