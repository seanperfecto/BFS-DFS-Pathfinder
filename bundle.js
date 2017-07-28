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
/***/ (function(module, exports) {

let maze = [[0,1,0,0,0,1],[0,0,0,1,0,1],[0,0,0,0,0,0],
            [0,0,0,1,0,0],[0,1,0,0,0,0],[1,0,0,1,0,0]];

document.addEventListener("DOMContentLoaded", () => {
  let map = makeMap(maze, 19, 19);
  let rendererOne = makeRenderer(map, 'bfs-graph', 'white', 'green');
  let rendererTwo = makeRenderer(map, 'dfs-graph', 'white', 'blue');
  drawMap(rendererOne, map);
  drawMap(rendererTwo, map);

  let startPos = [0,0];
  let targetPos = [5,5];
  let pathBFS = [];
  let pathDFS = [];
  drawPath(rendererOne, startPos, map.cellWidth, map.cellHeight, 'yellow');
  drawPath(rendererOne, targetPos, map.cellWidth, map.cellHeight, '#0f0');
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map