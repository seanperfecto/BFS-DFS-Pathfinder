import { calculatePath } from './path.js';

let maze = [[0,1,0,0,0,1],[0,0,0,1,0,1],[0,0,0,0,0,0],
            [0,0,0,1,0,0],[0,1,0,0,0,0],[1,0,0,1,0,0]];

document.addEventListener("DOMContentLoaded", () => {
  let map = makeMap(maze, 19, 19);
  let rendererOne = makeRenderer(map, 'bfs-graph', 'brown', 'green');
  let rendererTwo = makeRenderer(map, 'dfs-graph', 'white', 'blue');
  drawMap(rendererOne, map);
  drawMap(rendererTwo, map);

  let startPos = '0,0';
  let targetPos = '5,5';
  let pathBFS = [];
  let pathDFS = [];
  drawPath(rendererOne, makePoint(startPos), map.cellWidth, map.cellHeight, 'yellow');
  drawPath(rendererOne, makePoint(targetPos), map.cellWidth, map.cellHeight, '#0f0');
  pathBFS = calculatePath(map, startPos, targetPos, 'bfs');
  runPath(100, pathBFS, rendererOne, map, startPos, targetPos);
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
