/**
 * splashScreen
 * 
 * Tempo para a duraçāo da splashscreen definida em segundos.
 * Razāo: Alguns itens da UI necessitam de tempo para carregar.
 */
 
setTimeout(function() {
  q("#splashScreen").style.display = "none";
}, 1500);


/**
 * Funçāo de captura de elementos.
 * 
 * Funçāo optimizada para captura de elementos do DOM.
 * Razāo: Diminuiçāo de constantes de elementos.
 * 
 * Tipo de retorno: Elemento DOM.
 */
function q(element) {
  return document.querySelector(element);
}


/**
 * Altura e largura padrāo do Canvas.
 */
const width = document.body.offsetWidth;
const height = document.body.offsetHeight;


let startX = 0;
let startX1 = 0;
let startY = 0;
let startY1 = 0;
let tchX = 0;
let tchX1 = 0;
let tchY = 0;
let tchY1 = 0;
let startSnapX = 0;
let startSnapY = 0;
let gSnapX = 0;
let gSnapY = 0;
let gridSize = 12;
let r = 0;

let thickness = 0.5;
let is1stTouch = false;
let is2ndTouch = false;
let color = "dodgerblue";

/**
 * Inicializaçāo de altura e largura de cada camada
 */
 
q("#gridLayer").width = width;
q("#gridLayer").height = height;
q("#backgroundLayer").width = width;
q("#backgroundLayer").height = height;
q("#gameplayLayer").width = width;
q("#gameplayLayer").height = height;
q("#drawingLayer").width = width;
q("#drawingLayer").height = height;
q("#uiLayer").width = width;
q("#uiLayer").height = height;
q("#cursorLayer").width = width;
q("#cursorLayer").height = height;
q("#touchAreaLayer").width = width;
q("#touchAreaLayer").height = height;


/**
 * Contexto das camadas.
 * 
 * Inicializaçāo de constantes com o contexto de 
 * cada camada como valor.
 */
const gridCtx = q("#gridLayer").getContext("2d");
const bgCtx = q("#backgroundLayer").getContext("2d");
const gameplayCtx = q("#gameplayLayer").getContext("2d");
const drawingCtx = q("#drawingLayer").getContext("2d");
const uiCtx = q("#uiLayer").getContext("2d");
const cursorCtx = q("#cursorLayer").getContext("2d");
const touchAreaCtx = q("#touchAreaLayer").getContext("2d");

gameplayCtx.alpha = false;
drawingCtx.alpha = false;
cursorCtx.alpha = false;

/**
 * Funçāo desenhar pixels.
 * 
 * Desenho de pixels no canvas
 * 
 * Parâmetros:
 * * ctx: contexto
 * * startX: Ponto inicial no eixo X
 * * startY: Ponto inicial no eixo Y
 * * x: Posição horizontal atual do novo pixel 
 * * y: Posição vertical atual do novo pixel
 * * thickness: Espessura da linha
 * * color: cor da linha.
 * 
 * * Tipo de retorno: void.
 */
 function drawPixels(ctx, startX, startY, x, y, thickness, color) {
    ctx.beginPath();
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX, startY, (startX + x) / 2, (startY + y) / 2, x, y);
    ctx.stroke();
 }

/**
 * Funçāo desenhar linha.
 * 
 * Desenho de linhas no canvas utilizando 
 * coordenadas como parâmetros e o contexto.
 * A funçāo desenha apenas 1 linha de cada vez.
 * 
 * Parâmetros:
 * ctx: contexto
 * mx: moveTo - X
 * my: moveTo - Y
 * lx: lineTo - X
 * ly: lineTo - Y
 * color: cor da linha.
 * 
 * Tipo de retorno: void.
 */
function drawLine(ctx, mx, my, lx, ly, color, thickness = 0.5, lineCap) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = lineCap;
  ctx.moveTo(mx, my);
  ctx.lineTo(lx, ly);
  ctx.stroke();
}

/**
 * Funçāo desenhar circulo.
 * 
 * Desenho de circulo no canvas utilizando 
 * coordenadas como parâmetros e o contexto.
 * 
 * Parâmetros:
 * ctx: contexto
 * x: move to - X
 * y: move to - Y
 * radius: Raio do círculo
 * startAngle: Início do círculo
 * endAngle: Fim do círculo
 * color: cor da linha.
 * thickness: Espessura da linha
 * 
 * Tipo de retorno: void.
 */
function drawCircle(ctx, x, y, radius, startAngle, endAngle, color, thickness = 0.5) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.stroke();
}
 
/**
 * Funçāo desenhar quadrado nāo preenchido.
 * 
 * Desenho de quadrado no canvas utilizando 
 * coordenadas como parâmetros e o contexto.
 * A funçāo desenha apenas 1 quadrado de cada vez.
 * 
 * Parâmetros:
 * ctx: contexto
 * x: Movimento horizintal
 * y: Movimento vertical
 * w: largura
 * h: altura
 * color: cor da linha do quadrado.
 * 
 * Tipo de retorno: void.
 */
 
function drawSquare(ctx, x, y, w, h, color, thickness = 0.5, miterLimit) {
  ctx.beginPath();
  ctx.lineWidth = thickness;
  ctx.miterLimit = miterLimit;
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, w, h);
}

/**
 * Funçāo desenhar quadrado arredondado nos chanfros.
 * 
 * Desenho de quadrado chanfrado no canvas utilizando 
 * coordenadas como parâmetros e o contexto.
 * A funçāo desenha apenas 1 quadrado chanfrado de cada vez.
 * 
 * Parâmetros:
 * ctx: contexto
 * x: Movimento horizintal
 * y: Movimento vertical
 * w: largura
 * h: altura
 * color: cor da linha do quadrado.
 * thickness: a largura da linha.
 * 
 * Tipo de retorno: void.
 */
 
 function drawRoundRect(ctx, x, y, w, h, radius, color, thickness = 0.5) {
   ctx.beginPath();
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
   ctx.lineWidth = thickness;
   ctx.roundRect(x, y, w, h, [radius, radius, radius, radius]);
  // ctx.stroke();
  ctx.fill();
 }
 
 function drawBezier(ctx, cp1X, cp1Y, cp2X, cp2Y, startX, startY, endX, endY) {
   ctx.beginPath();
   ctx.moveTo(startX, startY);
   ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
   ctx.stroke();
   
   ctx.beginPath();
   drawCircle(gameplayCtx, startX ,startY, 10, 0, Math.PI * 2);
   drawCircle(gameplayCtx, endX ,endY, 10, 0, Math.PI * 2);
   drawCircle(gameplayCtx, (startX + endX) / 2 , (startY + endY) / 2, 10, 0, Math.PI * 2);
 }

/**
 * Funçāo desenhar texto.
 * 
 * Desenha texto no canvas.
 * 
 * Parametros: 
 * ctx: Contexto;
 * msg: Mensagem que será desenhada no canvas;
 * x: Posiçāo no eixo X (horizintal);
 * y: Posiçāo no eixo Y (vertical);
 * color: Cor do texto.
 * 
 * Tipo de retorno: void.
 */
 
function drawText(ctx, msg, x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillText(msg, x, y);
}


/**
 * Funçāo limpar camada.
 * 
 * Funçāo optimizada para limpar o canvas.
 * 
 * Parametros:
 * ctx: Contexto;
 * x: Posiçāo no eixo X (horizintal);
 * y: Posiçāo no eixo Y (vertical);
 * w: Largura da área;
 * h: Altura da área;
 * 
 * Tipo de retorno: void.
 */
function clearLayer(ctx, x, y, w, h) {
  ctx.clearRect(x, y, w, h);
}


/**
 * Funçāo cobrir layer com linhas horizontais.
 * 
 * Funçāo optimizada para desenhar linhas horizontais ao longo da altura do canvas.
 * 
 * Parametros:
 * ctx: Contexto;
 * distance: Distância entre as linhas horizontais;
 * color: Cor das linhas.
 * 
 * Tipo de retorno: void.
 */

function coverWithHorizontalLines(ctx, distance, color) {
  for (let y = distance; y <= height; y += distance) {
    drawLine(ctx, 0, y + 0.5, height, y + 0.5, color);
  }
}


/**
 * Funçāo cobrir layer com linhas verticais.
 * 
 * Funçāo optimizada para desenhar linhas verticais ao longo da largura do canvas.
 * 
 * Parametros:
 * ctx: Contexto;
 * distance: Distância entre as linhas verticais;
 * color: Cor das linhas.
 * 
 * Tipo de retorno: void.
 */

function coverWithVerticalLines(ctx, distance, color) {
  for (let x = distance; x <= height; x += distance) {
    drawLine(ctx, x + 0.5, 0, x + 0.5, height, color);
  }
}


/**
 * Funçāo cobrir layer com linhas verticais e horizontais.
 * 
 * Funçāo optimizada para desenhar linhas verticais e horizontais ao longo da largura e altura do canvas.
 * 
 * Parametros:
 * ctx: Contexto;
 * longitute: Distância entre as linhas verticais;
 * latitude: Distância entre as linhas horizontais;
 * colorX: Cor das linhas horizontais.
 * colorY: Cor das linhas verticais.
 * 
 * Tipo de retorno: void.
 */
 
function drawGrid(longitute, latitude, colorx, colory) {
  coverWithHorizontalLines(gridCtx, latitude, colorx, colory);
  coverWithVerticalLines(gridCtx, longitute, colorx, colory);
}


/**
 * Funçāo cobrir layer com grade.
 * 
 * Funçāo optimizada para desenhar grade de precisāo ao longo da largura e altura do canvas.
 * 
 * Parametros:
 * Nāo possue parâmetros.
 * 
 * Tipo de retorno: void.
 */

function draw50x10Grid() {
  drawGrid(gridSize, gridSize, "#aaa", "#aaa");
  drawGrid(gridSize * 5, gridSize * 5, "#555", "#555");
}


/**
 * Funçāo mostrar interface do usuário.
 * 
 * Funçāo para desenhar a UI.
 * 
 * Parametros:
 * Nāo possue parâmetros.
 * 
 * Tipo de retorno: void.
 */
function displayUI() {
  drawText(uiCtx, "Grid", 10, 10, "red");
  drawText(uiCtx, "Background", 10, height - 10, "green");
  drawText(uiCtx, "Gameplay", width - 50, 10, "blue");
  drawText(uiCtx, "UI", width - 50, height - 10, "purple");
}


/**
 * Funçāo desenhar o camada base.
 * 
 * Funçāo para desenhar a camada de fundo do canvas.
 * 
 * Parametros:
 * Nāo possue parâmetros.
 * 
 * Tipo de retorno: void.
 */
function drawBackground() {
  drawSquare(bgCtx, 0, 0, width, height, "#eee");
}


/**
 * Funçāo desenhar cursor.
 * 
 * Funçāo para desenhar um cursor na tela.
 * 
 * Parametros:
 * ctx: Contexto;
 * x: Posiçāo horizontal do canvas;
 * y: Posiçāo vertical do canvas;
 * canvasW: Largura do canvas;
 * canvasH: Altura do canvas;
 * color: (Opcional) Cor do cursor. Se nāo definido, o padrāo é verde;
 * 
 * Tipo de retorno: void.
 */

function drawCursor(ctx, x, y, canvasW, canvasH, color = "#0f0") {
  ctx.setLineDash([5, 5]);
  drawLine(ctx, 0, y, width + 0.5, y + 0.5, color);
  drawLine(ctx, x, 0, x + 0.5, height + 0.5, color);
}


/**
 * Inicializaçāo do programa.
 * 
 * Funçōes inicialmente habilitadas ao executar o programa.
 * 
 * Tipo de retorno: void.
 */
 
function initializeFunctions() {
  draw50x10Grid();
  displayUI();
  drawBackground();
}


/**
 * Funçāo alternar visibilidade da camada.
 * 
 * Alterna a camada entre visível e invisível. Caso a caixa 
 * checkbox esteja marcada, a funçāo de desenho, passada como callback, será executada
 * e, caso contrário, a funçāo de limpeza da camada.
 * 
 * Parâmetros:
 * event: O evento que detecta se o status do checkbox é marcado ou nāo marcado;
 * toggleElement: O elemento que carrega o ícone de alternância;
 * toggleIconOn: O nome do ícone, habilitado, que será retornado da biblioteca de ícones;
 * toggleIconOff: O nome do ícone, desabilitado, que será retornado da biblioteca de ícones;
 * drawFn: A funçāo, passada como callback, que será executada caso o checkbox seja marcado;
 * clearFn: A funçāo, passada como callback, que será executada caso o checkbox seja desmarcado;
 * clearContext: O contexto da funçāo de limpeza que representa a camada a ser limpa.
 * 
 * Tipo de retorno: void.
 */
 
function toggleLayerVisibility(event, layer, toggleElement, toggleIconOn, toggleIconOff, drawFn, clearFn, clearContext) {
  if (event.target.checked) {
    drawFn();
    toggleElement.innerText = toggleIconOn;
    toggleElement.style.opacity = "1";
    isLayerVisible[layer] = true;
  } else {
    clearFn(clearContext, 0, 0, width, height);
    toggleElement.innerText = toggleIconOff;
    toggleElement.style.opacity = ".5";
    isLayerVisible[layer] = false;
  }
}


/**
 * Associaçāo dos eventos aos checkboxes.
 * 
 * Associa o evento de marcaçāo dos checkboxes às funções de alternância de visibilidade da camada.
 */
q("#toggleGridCheckbox").addEventListener("change", (event) => toggleLayerVisibility(event, "grid", q("#gridLabel"), "toggle_on", "toggle_off", draw50x10Grid, clearLayer, gridCtx));
q("#toggleUI").addEventListener("change", event => toggleLayerVisibility(event, "ui", q("#uiLabel"), "toggle_on", "toggle_off", displayUI, clearLayer, uiCtx));
q("#toggleBg").addEventListener("change", event => toggleLayerVisibility(event, "bg", q("#bgLabel"), "toggle_on", "toggle_off", drawBackground, clearLayer, bgCtx));


// drawSquare(gameplayCtx,  (width / 2) - 50, (height / 2) - 50, 100, 100, "blue");
// drawLine(gameplayCtx, 10, 10, 10, 100, "red");
const isLayerVisible = {
  grid: true,
  ui: true,
  bg: true
}


function drawClip() {
  drawingCtx.beginPath();
  drawingCtx.strokeWidth = 0;
  drawingCtx.clearRect(0, 0, width, height);
  drawingCtx.arc(startX, startY, r, 0, Math.PI * 2, false);
  // drawingCtx.ellipse(startX, startY, Math.abs(tchX - startX), Math.abs(tchY - startY), 0, 0, Math.PI * 2, false);
  drawingCtx.clip();
}


// function drawWelcomeDrawing(ctx, x, y, color) {
//   ctx.beginPath();
//   const circle = new Path2D();
//   circle.arc(x, y, 70, 0, Math.PI * 2);
//   ctx.fillStyle = color;
//   ctx.fill(circle);
//   console.log(ctx.isPointInPath(circle, x, y));
// }

// drawWelcomeDrawing(drawingCtx, 100, 100, "red");

function handleStart(event) {
    is1stTouch = true;
  const tch0 = event.touches[0];
  const tch1 = event.touches[1];
  [startX, startY] = [tch0.clientX, tch0.clientY];
  // startX = event.touches[0].clientX;
  startX1 = event.touches[1]?.clientX;
  // startY = event.touches[0].clientY;
  startY1 = event.touches[1]?.clientY;
  [startSnapX, startSnapY] = [Math.round(tch0.clientX / gridSize) * gridSize, Math.round(tch0.clientY / gridSize) * gridSize]
}

function handleMove(event) {
  const x = event.touches[0].clientX;
  const x1 = event.touches[1]?.clientX;
  const y = event.touches[0].clientY;
  const y1 = event.touches[1]?.clientY;
  const snapX = Math.round(x/gridSize) * gridSize;
  const snapY = Math.round(y/gridSize) * gridSize;
  
  gameplayCtx.beginPath();
  clearLayer(gameplayCtx, 0, 0, width, height);
  clearLayer(uiCtx, 0, 0, width, height);
  clearLayer(cursorCtx, 0, 0, width, height);
  event.touches[1] && (is2ndTouch = true);
  event.touches[1] && (r = Math.abs(startX1 - x1));
  event.touches[1] && (thickness = Math.abs(startY1 - y1) / 10);
  is2ndTouch && drawSquare(gameplayCtx, startSnapX, startSnapY, snapX - startSnapX, snapY - startSnapY, color, r / 5);
  isLayerVisible.ui && drawText(uiCtx, `startX: ${startX|0}, startY: ${startY|0}, X: ${x|0} Y: ${y|0}, r: ${(r / 5)|0}, tck: ${thickness | 0}`, 20, 20, "red");
  isLayerVisible.ui && drawText(uiCtx, `snapX: ${snapX}, snapY: ${snapY}`, 20, 40, "green");
  isLayerVisible.ui && drawText(uiCtx, `startSnapX: ${startSnapX}, startSnapY: ${startSnapY}`, 20, 60, "green");

  drawCursor(cursorCtx, snapX, snapY, width, height, "red");
  
  [tchX, tchY] = [x, y];
  [gSnapX, gSnapY] = [snapX, snapY]
}

function handleEnd(event) {
  is2ndTouch && drawSquare(drawingCtx, startSnapX, startSnapY, gSnapX - startSnapX, gSnapY - startSnapY, color, r / 5);
  is1stTouch = false;
  is2ndTouch = false;
}

q("#touchAreaLayer").addEventListener("touchstart", handleStart);

q("#touchAreaLayer").addEventListener("touchmove", handleMove);


q("#touchAreaLayer").addEventListener("touchend", handleEnd);

q("#touchAreaLayer").addEventListener("mousedown", handleEnd)
q("#touchAreaLayer").addEventListener("mousemove", handleEnd)
q("#touchAreaLayer").addEventListener("mouseup", handleEnd)

// drawRoundRect(drawingCtx, 100, 100, 250, 250, r, color, thickness);

//drawingCtx.beginPath();
//drawingCtx.ellipse(200, 200, 150, 150, 0, 0, Math.PI * 2);
//drawingCtx.fill();

// drawingCtx.beginPath();
// drawingCtx.fillStyle = "crimson";



initializeFunctions();