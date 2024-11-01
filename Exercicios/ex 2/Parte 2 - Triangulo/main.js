function main(){
  const canvas = document.querySelector("#canvas");
  const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });

  if (!gl) {
      throw new Error('WebGL not supported');
  }

  var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();

  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  
  const matrixUniformLocation = gl.getUniformLocation(program, `matrix`);
  const colorUniformLocation = gl.getUniformLocation(program, `color`);
  
  let matrix = [
      2/canvas.width, 0, 0, 0,
      0, -2/canvas.height, 0, 0,
      0, 0, 0, 0,
      -1, 1, 0, 1
  ];
  gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  let positionVector = [canvas.width/2,canvas.height/2];
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionVector), gl.STATIC_DRAW);
  let colorVector = [0.0,0.0,0.0];
  gl.uniform3fv(colorUniformLocation,colorVector);
  
  canvas.addEventListener("mousedown",mouseClick,false);

  let startPoint = [];
  let endPoint = [];
  let midPoint = [];
  let clickCount = 0;

  function mouseClick(event){
    positionVector = [event.offsetX,event.offsetY];
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionVector), gl.STATIC_DRAW);
    if (tipoDesenho === "r" || tipoDesenho === "R") {
      if (clickCount === 0) {
        drawPoint();
        startPoint.push(...positionVector);
        clickCount = 1;
     }
      else if (clickCount === 1) {
        drawPoint();
        endPoint.push(...positionVector);
        Bresenham(gl, startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
        clickCount = 2;
      }
      else if (clickCount === 2) {
          startPoint = [];
          endPoint = [];
          clickCount = 0;
      }
    }

    else if (tipoDesenho === "t" || tipoDesenho === "T") {
      if (clickCount === 0) {
        drawPoint();
        startPoint.push(...positionVector);
        clickCount = 1;
     }
      else if (clickCount === 1) {
        drawPoint();
        midPoint.push(...positionVector);
        Bresenham(gl, startPoint[0], startPoint[1], midPoint[0], midPoint[1]);
        clickCount = 2;
        console.log(midPoint);
      }
      else if (clickCount === 2) {
        drawPoint();
        endPoint.push(...positionVector);
        Bresenham(gl, midPoint[0], midPoint[1], endPoint[0], endPoint[1]);
        Bresenham(gl, startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
        clickCount = 3;
      }
      else if (clickCount === 3) {
          startPoint = [];
          midPoint = [];
          endPoint = [];
          clickCount = 0;
      }
    }
      //console.log(clickCount);
    
  }
  
  
  const bodyElement = document.querySelector("body");
  bodyElement.addEventListener("keydown",keyDown,false);
  //bodyElement.addEventListener("keydown", change, false);

  let tipoDesenho = "r"; 

  function keyDown(event) {
    if (event.key === "r" || event.key === "R" || event.key === "t" || event.key === "T") {
      switch(event.key) {
        case "r":
          gl.clear(gl.COLOR_BUFFER_BIT);
          tipoDesenho = "r";
          break;
        case "R":
          gl.clear(gl.COLOR_BUFFER_BIT);
          tipoDesenho = "R";
          break;
        case "t":
          gl.clear(gl.COLOR_BUFFER_BIT);
          tipoDesenho = "t";
          break;
        case "T":
          gl.clear(gl.COLOR_BUFFER_BIT);
          tipoDesenho = "T";
          break;
      }
      clickCount = 0;
      startPoint = [];
      midPoint = [];
      endPoint = [];
      console.log(tipoDesenho);
    }

    if (event.key === "0" || event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9") {
      switch(event.key){
        case "0":
          colorVector = [0.0,0.0,0.0];
          break;
        case "1":
          colorVector = [1.0,0.0,0.0];
          break;
        case "2":
          colorVector = [0.0,1.0,0.0];
          break;
        case "3":
          colorVector = [0.0,0.0,1.0];
          break;
        case "4":
          colorVector = [1.0,1.0,0.0];
          break;
        case "5":
          colorVector = [0.0,1.0,1.0];
          break;
        case "6":
          colorVector = [1.0,0.0,1.0];
          break;
        case "7":
          colorVector = [1.0,0.5,0.5];
          break;
        case "8":
          colorVector = [0.5,1.0,0.5];
          break;
        case "9":
          colorVector = [0.5,0.5,1.0];
          break;
      }
      gl.uniform3fv(colorUniformLocation,colorVector);
      redraw(); 
    }
  }

  function redraw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    //console.log(midPoint.length); 
    console.log(startPoint.length); 
    
    // Redesenha o ponto inicial
    if (startPoint.length) {
      paintPixel(gl, startPoint[0], startPoint[1]);
    }
  
    // Redesenha a linha se ambos os pontos estão definidos
    if (startPoint.length && endPoint.length) {
      Bresenham(gl, startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
    }

    if (startPoint.length && endPoint.length && midPoint.length) {
      Bresenham(gl, startPoint[0], startPoint[1], midPoint[0], midPoint[1]);
      Bresenham(gl, midPoint[0], midPoint[1], endPoint[0], endPoint[1]);
      Bresenham(gl, startPoint[0], startPoint[1], endPoint[0], endPoint[1]);  
    }
  }

  function drawPoint(){
    if (clickCount == 0) 
      gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  }


  function paintPixel(gl, x, y) {
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x, y]), gl.STATIC_DRAW);
      gl.drawArrays(gl.POINTS, 0, 1);
  }
  
  function Bresenham(gl, x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;
  
    console.log(x1, y1, x2, y2);
  
    while (true) {
      paintPixel(gl, x1, y1);
      if (x1 === x2 && y1 === y2) break;
  
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  }

  drawPoint();
}


function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}



main();