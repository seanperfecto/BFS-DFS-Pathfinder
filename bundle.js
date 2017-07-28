/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__path_js__ = __webpack_require__(1);


let maze = [[0,1,0,0,0,1],[0,0,0,1,0,1],[0,0,0,0,0,0],
            [0,0,0,1,0,0],[0,1,0,0,0,0],[1,0,0,1,0,0]];

document.addEventListener("DOMContentLoaded", () => {
  let map = makeMap(maze, 19, 19);
  let rendererOne = makeRenderer(map, 'bfs-graph', 'brown', 'green');
  let rendererTwo = makeRenderer(map, 'dfs-graph', 'white', 'blue');
  drawMap(rendererOne, map);
  drawMap(rendererTwo, map);

  let startPos = [0,0];
  let targetPos = [5,5];
  let pathBFS = [];
  let pathDFS = [];
  drawPath(rendererOne, startPos, map.cellWidth, map.cellHeight, 'yellow');
  drawPath(rendererOne, targetPos, map.cellWidth, map.cellHeight, '#0f0');
  pathBFS = Object(__WEBPACK_IMPORTED_MODULE_0__path_js__["a" /* calculatePath */])(map, startPos, targetPos, 'bfs');
  // runPath(1, pathBFS, rendererOne, map, startPos, targetPos);
});

const makeMap = (mazeData, width, height) => (
    {
      data: mazeData,
  		width: mazeData[0].length,
  		height: mazeData.reduce(function(acc, row){ return acc + 1; }, 0),
  		cellWidth: width,
  		cellHeight: height
    }
);

const makeRenderer = (map, id, primaryColor, secondaryColor) => {
  const canvasEl = document.getElementById(id);
  canvasEl.width = map.cellWidth * map.width;
	canvasEl.height = map.cellHeight * map.height;
	return {
		canvasEl: canvasEl,
		ctx: canvasEl.getContext('2d'),
		primaryColor: primaryColor,
		secondaryColor: secondaryColor,
	};
};

const drawMap = (renderer, map) => {
    let ctx = renderer.ctx;
  	let canvas = renderer.canvasEl;
  	ctx.clearRect(0, 0, canvas.width, canvas.height);
  	for (let y = 0; y < map.height; y++) {
  		for (let x = 0; x < map.width; x++) {
  			let cellType = map.data[y][x];
  			if (cellType === 1) {
  				ctx.fillStyle = renderer.secondaryColor;
  			} else {
  				ctx.fillStyle = renderer.primaryColor;
  			}
  			ctx.fillRect(x * map.cellWidth, y * map.cellHeight,
          map.cellWidth, map.cellHeight);
        ctx.strokeStyle="black";
        ctx.strokeRect(x * map.cellWidth, y * map.cellHeight,
          map.cellWidth, map.cellHeight);
  		}
  	}
};

const drawPath = (renderer, point, width, height, color) => {
  renderer.ctx.fillStyle = color;
  renderer.ctx.fillRect(point[0] * width, point[1] * height, width, height);
  renderer.ctx.strokeStyle="black";
  renderer.ctx.strokeRect(point[0] * width, point[1] * height, width, height);
};

const runPath = (num, path, renderer, map, startPos, targetPos) => {
  let pos = 0;
  console.log(path);
  	function render(){
  		if (pos < path.length) {
  			drawPath(renderer, makePoint(path[pos]), map.cellWidth, map.cellHeight, '#fff');
  		} else {
  			drawPath(renderer, targetPos, map.cellWidth, map.cellHeight, '#0f0');
  			return;
  		}
  		pos += 1;
  		setTimeout(render, num);
  		drawPoint(renderer, targetPos, map.cellWidth, map.cellHeight, pos % 50 > 30, '#0c0', '#c00');
  	}
  	renderer.ctx.globalAlpha = 0.55;
  	return render();
};

const makePoint = (point) => (
  point.split(',').map((v) => { return v | 0; })
);

const drawPoint = (renderer, point, width, height, useOnColor, onColor, offColor) => {
	let ctx = renderer.ctx;
	let color = offColor;
	ctx.save();
	ctx.globalAlpha = 1.0;
	if (useOnColor) {
		color = onColor;
	}
	drawPath(renderer, point, width, height, color);
	ctx.restore();
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stack_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queue_js__ = __webpack_require__(4);




const calculatePath = (map, startPos, targetPos, algorithm) => {
  let graph = makeGraph(map.data, map.width, map.height);
  let startNode = getNodeById(graph, startPos);
  let targetNode = getNodeById(graph, targetPos);
  let path = [];
  let current = startNode;
  if (algorithm === 'dfs') {
    let stack = new __WEBPACK_IMPORTED_MODULE_1__stack_js__["a" /* default */]();
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
    let queue = new __WEBPACK_IMPORTED_MODULE_2__queue_js__["a" /* default */]();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = calculatePath;


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
				graph.push(new __WEBPACK_IMPORTED_MODULE_0__node_js__["a" /* default */]('' + x + ',' + y, adj));
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Node {
  constructor(id, adj){
    this.id = id;
		this.adj = adj;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Node);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Stack {
  constructor(){
    this.items = [];
    this.length = this.items.length;
  }

  push(ele){
    this.length += 1;
    return this.items.push(ele);
  }

  pop(){
    if (this.length > 0) {
      this.length -= 1;
    }
    return this.items.pop();
  }

  top(){
    if (this.length > 0) {
      return this.items[this.length - 1];
    }
    return undefined;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Stack);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Queue {
  constructor(ele){
    if (ele instanceof Array) {
			this.items = ele;
		} else {
			this.items = [];
		}
		this.length = this.items.length;
  }

  enqueue(ele){
    this.length += 1;
		return this.items.push(ele);
  }

  dequeue(){
    if (this.length > 0) {
			this.length -= 1;
		}
		return this.items.shift();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Queue);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map