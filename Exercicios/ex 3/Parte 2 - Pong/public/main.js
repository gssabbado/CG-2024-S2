function main() {
  const canvas = document.querySelector("#canvas");
  const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });

  if (!gl) {
    throw new Error("WebGL not supported");
  }

  const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
  const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const matrixUniformLocation = gl.getUniformLocation(program, `matrix`);
  const colorUniformLocation = gl.getUniformLocation(program, `color`);

  let matrix = m4.identity();
  matrix = m4.scale(matrix, 0.25, 0.25, 1.0);
  gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Configurações do jogo e do placar
  let ballX = 0.0, ballY = 0.0;
  let ballSpeedX = 0.02, ballSpeedY = 0.02;
  let leftPaddleY = -0.45, rightPaddleY = -0.45;
  const paddleHeight = 1.0, paddleWidth = 0.15;
  const paddleSpeed = 0.05;
  const n = 50; // Número de segmentos para desenhar a bola

  let upPressed = false, downPressed = false;
  let wPressed = false, sPressed = false;

  let player1Score = 0, player2Score = 0;

  // Função para atualizar o placar no canvas scoreboard
  function atualizarPlacar() {
    const scoreboard = document.querySelector("#scoreboard");
    const ctx = scoreboard.getContext("2d");
    ctx.clearRect(0, 0, scoreboard.width, scoreboard.height);

    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText(player1Score, scoreboard.width / 4, scoreboard.height / 2);
    ctx.fillText(player2Score, 3 * scoreboard.width / 4, scoreboard.height / 2);
  }

  // Função para aumentar o placar de um jogador
  function marcarPonto(jogador) {
    if (jogador === 1) {
      player1Score++;
    } else if (jogador === 2) {
      player2Score++;
    }
    atualizarPlacar();
  }

  // Atualizar placar inicial
  atualizarPlacar();

  // Configuração dos eventos do teclado
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") upPressed = true;
    if (event.key === "ArrowDown") downPressed = true;
    if (event.key === "w" || event.key === "W") wPressed = true;
    if (event.key === "s" || event.key === "S") sPressed = true;
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") upPressed = false;
    if (event.key === "ArrowDown") downPressed = false;
    if (event.key === "w" || event.key === "W") wPressed = false;
    if (event.key === "s" || event.key === "S") sPressed = false;
  });

  // Função principal de renderização do jogo
  function drawGame() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Desenho da linha divisória central
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setTrapezoidVertices(gl, 0.0, -4.0, 0.05, 0.05, 8.0, 0);
    gl.uniform3fv(colorUniformLocation, [0.2, 0.2, 0.2]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Controle das raquetes
    if (upPressed) leftPaddleY = Math.min(1.0 - paddleHeight, leftPaddleY + paddleSpeed);
    if (downPressed) leftPaddleY = Math.max(-1.0, leftPaddleY - paddleSpeed);
    if (wPressed) rightPaddleY = Math.min(1.0 - paddleHeight, rightPaddleY + paddleSpeed);
    if (sPressed) rightPaddleY = Math.max(-1.0, rightPaddleY - paddleSpeed);

    // Desenho das raquetes
    setTrapezoidVertices(gl, -3.45, leftPaddleY, paddleWidth, paddleWidth, paddleHeight, 0);
    gl.uniform3fv(colorUniformLocation, [0.0, 0.0, 0.0]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    setTrapezoidVertices(gl, 3.45, rightPaddleY, paddleWidth, paddleWidth, paddleHeight, 0);
    gl.uniform3fv(colorUniformLocation, [0.0, 0.0, 0.0]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);


    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY > 1.0 || ballY < -1.0) {
      ballSpeedY = -ballSpeedY;
    }

    if (
      (ballX < -3.4 && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
      (ballX > 3.4 && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
    ) {
      ballSpeedX = -ballSpeedX;
    }

    // Verificar se a bola ultrapassou as bordas laterais
    if (ballX > 4.0 || ballX < -4.0) {
      if (ballX > 4.0) {
        marcarPonto(1); // Ponto para o jogador 1
      } else {
        marcarPonto(2); // Ponto para o jogador 2
      }
      ballX = 0.0;
      ballY = 0.0;
      ballSpeedX = -ballSpeedX; 
    }

    setCircleVertices(gl, n, 0.1, ballX, ballY);
    gl.uniform3fv(colorUniformLocation, [1.0, 0.0, 1.0]);
    gl.drawArrays(gl.TRIANGLES, 0, 3 * n);

    requestAnimationFrame(drawGame);
  }

  drawGame();
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation failed: ", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking failed: ", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const m4 = {
  identity: function() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },
  scale: function(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },
  multiply: function(a, b) {
    const result = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[i * 4 + j] =
          a[i * 4 + 0] * b[0 * 4 + j] +
          a[i * 4 + 1
          * b[1 * 4 + j] +
          a[i * 4 + 2] * b[2 * 4 + j] +
          a[i * 4 + 3] * b[3 * 4 + j];
      }
    }
    return result;
  },
  scaling: function(sx, sy, sz) {
    return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
  },
};

function setTrapezoidVertices(gl, x, y, baseTop, baseBottom, height, angle) {
  const [x1, x2, x3, x4] = [x - baseBottom / 2, x + baseBottom / 2, x - baseTop / 2, x + baseTop / 2];
  const [y1, y2] = [y, y + height];
  const vertexData = [x1, y1, x2, y1, x3, y2, x3, y2, x2, y1, x4, y2];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

function setCircleVertices(gl, n, radius, centerX, centerY) {
  let vertexData = [];
  for (let i = 0; i < n; i++) {
    vertexData.push(centerX, centerY);
    vertexData.push(centerX + radius * Math.cos(i * (2 * Math.PI) / n), centerY + radius * Math.sin(i * (2 * Math.PI) / n));
    vertexData.push(centerX + radius * Math.cos((i + 1) * (2 * Math.PI) / n), centerY + radius * Math.sin((i + 1) * (2 * Math.PI) / n));
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

main();
