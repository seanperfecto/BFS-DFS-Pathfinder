import { calculatePath } from './path.js';

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
  pathBFS = calculatePath(map, startPos, targetPos, 'bfs');
  pathDFS = calculatePath(map, startPos, targetPos, 'dfs');
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
