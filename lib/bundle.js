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


document.addEventListener("DOMContentLoaded", () => {
  let maze = mazeOne;
  setUpMap(mazeOne);
  let resetButton = document.getElementById('reset');
  resetButton.addEventListener("click", () => {
    reset(maze);
  });

  let mazeOneButton = document.getElementById('maze-1');
  mazeOneButton.addEventListener("click", () => {
    $('#play').off('click');
    $('#play').attr("disabled", false);
    maze = mazeOne;
    setUpMap(mazeOne);
  });

  let mazeTwoButton = document.getElementById('maze-2');
  mazeTwoButton.addEventListener("click", () => {
    $('#play').off('click');
    $('#play').attr("disabled", false);
    maze = mazeTwo;
    setUpMap(mazeTwo);
  });

  let mazeThreeButton = document.getElementById('maze-3');
  mazeThreeButton.addEventListener("click", () => {
    $('#play').off('click');
    $('#play').attr("disabled", false);
    maze = mazeThree;
    setUpMap(mazeThree);
  });
});

const reset = (maze) => {
  setUpMap(maze);
  $('#play').attr("disabled", false);
};

const setUpMap = (maze) => {
  let map = makeMap(maze, 25, 25);
  let rendererOne = makeRenderer(map, 'bfs-graph', 'white', '#383838');
  let rendererTwo = makeRenderer(map, 'dfs-graph', 'white', '#383838');
  drawMap(rendererOne, map);
  drawMap(rendererTwo, map);
  let startPos = '0,0';
  let targetPos = `${map.data.length - 1},${map.data.length - 1}`;
  let pathBFS = [];
  let pathDFS = [];
  drawPath(rendererOne, makePoint(startPos), map.cellWidth, map.cellHeight, 'yellow');
  drawPath(rendererOne, makePoint(targetPos), map.cellWidth, map.cellHeight, '#0f0');
  drawPath(rendererTwo, makePoint(startPos), map.cellWidth, map.cellHeight, 'yellow');
  drawPath(rendererTwo, makePoint(targetPos), map.cellWidth, map.cellHeight, '#0f0');
  pathBFS = Object(__WEBPACK_IMPORTED_MODULE_0__path_js__["a" /* calculatePath */])(map, startPos, targetPos, 'bfs');
  pathDFS = Object(__WEBPACK_IMPORTED_MODULE_0__path_js__["a" /* calculatePath */])(map, startPos, targetPos, 'dfs');
  $("#play").on("click", () => {
    $('#play').attr("disabled", true);
    $('#reset').attr("disabled", true);
    runPath(100, pathBFS[0], pathBFS[1], rendererOne, map, startPos, targetPos);
    runPath(100, pathDFS[0], pathDFS[1], rendererTwo, map, startPos, targetPos);
  });
};

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

const runPath = (num, path, optimal, renderer, map, startPos, targetPos) => {
  let pos = 0;
  	function render(){
  		if (pos < path.length) {
  			drawPath(renderer, makePoint(path[pos]), map.cellWidth, map.cellHeight, '#b5c1ff');
  		} else {
  			drawPath(renderer, makePoint(targetPos), map.cellWidth, map.cellHeight, 'blue');
        optimal.forEach((posi) => {
          drawPath(renderer, makePoint(posi), map.cellWidth, map.cellHeight, 'blue');
          $('#reset').attr("disabled", false);
        });
  			return;
  		}
  		pos += 1;
  		setTimeout(render, num);
  	}
  	renderer.ctx.globalAlpha = 0.55;
  	return render();
};

const makePoint = (point) => (
  point.split(',').map((v) => { return v | 0; })
);


let mazeTwo = [[0,1,0,0,0,1,0,1,1,1,0,1],
               [0,0,0,1,0,1,0,1,1,0,0,0],
               [1,0,0,0,0,0,0,0,1,0,0,1],
               [0,0,1,1,0,0,1,0,0,0,0,1],
               [0,1,0,0,0,0,1,1,1,1,1,1],
               [1,0,0,1,0,0,0,1,1,0,1,0],
               [0,0,0,1,1,0,0,0,0,0,0,0],
               [0,1,0,0,0,1,0,1,1,0,1,0],
               [1,1,0,0,0,1,0,0,1,0,1,1],
               [1,1,0,1,0,1,0,0,1,0,1,0],
               [0,0,0,1,1,1,0,1,1,0,1,0],
               [0,1,0,1,1,1,0,0,1,0,0,0]];
let mazeThree = [[0,1,0,1,0,0,0,1,0],
                 [0,0,0,0,1,0,1,0,1],
                 [1,0,0,0,0,1,0,0,0],
                 [0,0,1,0,0,0,0,1,0],
                 [0,0,0,1,1,0,0,0,0],
                 [1,0,0,1,0,1,1,0,1],
                 [0,1,0,0,0,1,0,0,1],
                 [1,1,0,0,1,0,1,0,0],
                 [0,1,1,0,1,0,0,0,0]];
let mazeOne = [
[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
[1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
[1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1],
[1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
[1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1],
[1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
[1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
[1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1],
[1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
[1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1],
[1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
[1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
[1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
[1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1],
[1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
[1,0,1,1,1,0,1,1,1,1,1,1,1,0,0,0,1,0,0]
];


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
  let cameFrom = {};
  let current = startNode;
  if (algorithm === 'dfs') {
    let stack = new __WEBPACK_IMPORTED_MODULE_1__stack_js__["a" /* default */]();
    stack.push(startNode);
    cameFrom[startNode.id] = null;
    while (true) {
      current = stack.top();
      path.push(current.id);
      current.visited = true;
      if (current.id === targetNode.id) {
        break;
      }
      let unvisited = 0;
      current.adj.forEach((id) => {
        let node = getNodeById(graph, id);
        if (!node.visited) {
          if (cameFrom[id]) {
          } else {
            cameFrom[id] = current.id;
          }
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
    cameFrom[startNode.id] = null;
    while (true) {
      current = queue.dequeue();
      current.visited = true;
      path.push(current.id);
      if (current.id === targetNode.id) {
        break;
      }
      current.adj.forEach((id) => {
        if (cameFrom[id]) {
        } else {
          cameFrom[id] = current.id;
        }

        let node = getNodeById(graph, id);
        if (!node.visited) {
          node.visited = true;
          queue.enqueue(node);
        }
      });
    }
  }
  let optimal = buildOptimal(cameFrom, targetPos);
  return [path, optimal];
};
/* harmony export (immutable) */ __webpack_exports__["a"] = calculatePath;


const makeGraph = (map, width, height) => {
  let graph = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
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
  }
  return graph;
};

const getNodeById = (graph, nodeId) => {
  return graph.reduce((out, node) => {
    if (node.id === nodeId) {
      out = node;
    }
    return out;
  });
};

const buildOptimal = (cameFrom, targetPos) => {
  if(!cameFrom[targetPos]) {
    return null;
  }

  let current = targetPos;
  let path = [];

  while(current) {
    path.unshift(current);
    current = cameFrom[current];
  }

  return path;
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