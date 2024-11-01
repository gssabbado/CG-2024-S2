function main(){
  const canvas = document.querySelector("#c");
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('WebGL not supported');
}

canvas.addEventListener("mousedown",mouseDown,false);

function mouseDown(event){
  console.log(event.screenX);
  console.log(event.screenY);
}

var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);

const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

n=50;


// Cabelo Direito
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.3, 0.45, 0.25);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.2, 0.75, 0.2);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.2, 0.75, -0.05);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.3, 0.45, -0.25);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);


// Cabelo Esquerdo
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.3, -0.45, 0.25);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.2, -0.75, 0.2);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.2, -0.75, -0.05);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.3, -0.45, -0.25);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.5, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);


// Orelha Esquerda
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.2, -0.55, 0.0, Math.PI/2); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 0.65, 0.55]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// Orelha Direita
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.2, 0.55, 0.0, (3*Math.PI)/2); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 0.65, 0.55]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);


// Rosto
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.6, 0.0, 0.0);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.75, 0.65]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

// Bochecha esquerda
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.1, -0.4, -0.15);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.95, 0.2, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);


// Bochecha direita
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.1, 0.4, -0.15);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.95, 0.2, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);


// Maquiagem olho esquerdo
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setDiamondVertices(gl, -0.25,  0.25, 0.35, 0.55, 0.0);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[1.0, 1.0, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 6);

// Olho esquerdo
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.1, -0.25, 0.25);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.0, 0.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

// Olho esquerdo Ponto
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.03, -0.2, 0.3);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 1.0, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

// Maquiagem olho direito
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setDiamondVertices(gl, 0.25,  0.25, 0.35, 0.55, 0.0);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[1.0, 1.0, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 6);

// Olho direito
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.1, 0.25, 0.25);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[0.0, 0.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);


// Olho direito Ponto
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.03, 0.3, 0.3);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 1.0, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);


// Nariz
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
setCircleVertices(gl,n,0.2, 0.0, 0.0);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl,n,[1.0, 0.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3*n);

// Boca

//  Maquigem Trapezio (base)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setTrapezoidVertices(gl, 0.0, -0.23, 0.15, 0.65, 0.33, Math.PI);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[1.0, 1.0, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 6);


// Maquiagem canto esquerdo (parte de cima)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, -0.288, -0.25, 0.0); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 1.0, 1.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// Maquiagem canto esquerdo (parte da esquerda)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, -0.288, -0.25, Math.PI/2); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 1.0, 1.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// Maquiagem canto esquerdo (parte de cima)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, 0.288, -0.25, 0.0); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 1.0, 1.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// Maquiagem canto esquerdo (parte da esquerda)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, 0.288, -0.25, (3*Math.PI)/2); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 1.0, 1.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// Baixo da boca
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.1, 0.0, -0.487, Math.PI); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 1.0, 1.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);


// Trapezio (base)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setTrapezoidVertices(gl, 0.0, -0.25, 0.15, 0.6, 0.25, Math.PI);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[1.0, 0.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 6);

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setTrapezoidVertices(gl, 0.0, -0.3, 0.05, 0.3, 0.15, Math.PI);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[0.9, 0.8, 0.9]);
gl.drawArrays(gl.TRIANGLES, 0, 6);

// Baixo da boca
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.1, 0.0, -0.447, Math.PI); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 0.0, 0.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// canto esquerdo (parte de cima)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, -0.258, -0.26, 0.0); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 0.0, 0.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// canto esquerdo (parte da esquerda)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, -0.258, -0.26, Math.PI/2); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 0.0, 0.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// canto direito (parte de cima)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, 0.258, -0.26, 0.0); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 0.0, 0.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);

// canto direito (parte da direita)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setSemiCircleVertices3(gl, n,0.037, 0.258, -0.26, (3*Math.PI)/2); 
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setCircleColor(gl, n, [1.0, 0.0, 0.0]); 
gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 1);





// Chapeu

// base do chapeu
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setTrapezoidVertices(gl, -0.2, 0.5, 0.85, 0.85, 0.1, Math.PI/10);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[0.5, 0.3, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 6);


// parte de Cima do Chapeu
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setTrapezoidVertices(gl, -0.234, 0.59, 0.45, 0.35, 0.3, Math.PI/10);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[0.6, 0.4, 1.0]);
gl.drawArrays(gl.TRIANGLES, 0, 6);

// Lista do chapeu
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setTrapezoidVertices(gl, -0.238, 0.588, 0.38, 0.36, 0.05, Math.PI/10);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
setRectangleColor(gl,[0.9, 0.8, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 6);





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

function rotatePoint(x, y, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    x * cos - y * sin,
    x * sin + y * cos
  ];
}

function setRectangleVertices(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

function setRectangleColor(gl,color) {
  colorData = [];
  for (let triangle = 0; triangle < 2; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
      colorData.push(...color);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

// Função para definir os vértices do trapézio rotacionado
function setTrapezoidVertices(gl, x, y, baseTop, baseBottom, height, angle) {
  // Calcula as posições iniciais dos vértices do trapézio sem rotação
  const x1 = x - baseBottom / 2;
  const x2 = x + baseBottom / 2;
  const x3 = x - baseTop / 2;
  const x4 = x + baseTop / 2;
  const y1 = y;
  const y2 = y + height;

  // Aplica a rotação para cada vértice em torno do ponto central (x, y)
  const [x1r, y1r] = rotatePoint(x1 - x, y1 - y, angle);
  const [x2r, y2r] = rotatePoint(x2 - x, y1 - y, angle);
  const [x3r, y3r] = rotatePoint(x3 - x, y2 - y, angle);
  const [x4r, y4r] = rotatePoint(x4 - x, y2 - y, angle);

  // Adiciona os vértices rotacionados ao buffer de dados
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1r + x, y1r + y, // Vértice inferior esquerdo
    x2r + x, y2r + y, // Vértice inferior direito
    x3r + x, y3r + y, // Vértice superior esquerdo

    x3r + x, y3r + y, // Vértice superior esquerdo
    x2r + x, y2r + y, // Vértice inferior direito
    x4r + x, y4r + y  // Vértice superior direito
  ]), gl.STATIC_DRAW);
}

function setDiamondVertices(gl, centerX, centerY, width, height, angle) {
  const vertices = [
    [centerX, centerY + height / 2],
    [centerX + width / 2, centerY],
    [centerX, centerY - height / 2],
    [centerX - width / 2, centerY]
  ];

  const rotatedVertices = vertices.map(([x, y]) => {
    const [xr, yr] = rotatePoint(x - centerX, y - centerY, angle);
    return [xr + centerX, yr + centerY]
  });

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    ...rotatedVertices[0],
    ...rotatedVertices[1],
    ...rotatedVertices[2],

    ...rotatedVertices[2],
    ...rotatedVertices[3],
    ...rotatedVertices[0]
  ]), gl.STATIC_DRAW);
}

function setCircleVertices(gl,n,radius, centerX, centerY){
  let center = [centerX, centerY];
  let vertexData = [];
  for(let i=0;i<n;i++){
    vertexData.push(...center);
    vertexData.push(centerX + radius*Math.cos(i*(2*Math.PI)/n), centerY + radius*Math.sin(i*(2*Math.PI)/n));
    vertexData.push(centerX + radius*Math.cos((i+1)*(2*Math.PI)/n), centerY + radius*Math.sin((i+1)*(2*Math.PI)/n));
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

function setCircleColor(gl,n,color){
  colorData = [];
  for (let triangle = 0; triangle < n; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
      colorData.push(...color);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}




// Função para definir vértices do semicírculo (90 a 270)
function setSemiCircleVertices1(gl, n, radius, centerX, centerY) {
  let center = [centerX, centerY]; // Centro do semicírculo
  let vertexData = [];

  // Adiciona o centro do semicírculo
  vertexData.push(...center);


  for (let i = n/2 ; i <= (3*n)/2; i++) {
    let angle = (i * Math.PI) / n; 
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    vertexData.push(x, y);
  }

  // Envia os dados dos vértices para o buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

// Função para definir vértices do semicírculo (270 a 450)
function setSemiCircleVertices2(gl, n, radius, centerX, centerY) {
  let center = [centerX, centerY]; // Centro do semicírculo
  let vertexData = [];

  // Adiciona o centro do semicírculo
  vertexData.push(...center);


  for (let i = (3*n)/2 ; i <= (5*n)/2; i++) {
    let angle = (i * Math.PI) / n; 
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    vertexData.push(x, y);
  }

  // Envia os dados dos vértices para o buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

// Função para definir vértices do semicírculo (0 a 180)
function setSemiCircleVertices3(gl, n, radius, centerX, centerY, rotationAngle) {
  let center = [centerX, centerY]; // Centro do semicírculo
  let vertexData = [];

  // Adiciona o centro do semicírculo
  vertexData.push(...center);


  for (let i = 0 ; i <= n; i++) {
    let angle = (i * Math.PI) / n; 
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    let [rotatedX, rotatedY] = rotatePoint(x - centerX, y - centerY, rotationAngle)
    vertexData.push(rotatedX + centerX, rotatedY + centerY);
  }


  // Envia os dados dos vértices para o buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}


main();