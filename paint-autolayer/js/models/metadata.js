/**
 * Altura e Largura da Tela (const)
 */
const width = document.body.offsetWidth;
const height = document.body.offsetHeight;
 
  /**
 * Global Coords (Object)
 * 
 * Descrição: Coordenadas globais indicando a posição do
 * cursor.
 * 
 * propsriedades: 
 * - activeShape - [number]: Desenho ativo no canvas
 * - [x][touch index] - [number]: Posição X do cursor no contexto atual.
 * - [y][touch index] - [number]: Posição Y do cursor no contexto atual.
 * - [startX][touch index] - [number]: Posição inicial X do cursor no contexto atual.
 * - [startY][touch index] - [number]: Posição inicial Y do cursor no contexto atual.
 */
const globalCoords = {
  activeShape: null,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  startX1: 0,
  startY1: 0,
  startX2: 0,
  startY2: 0
}


/**
 * layers (Array)
 * 
 * Descrição: Array iterável de objetos indicando informacões
 * de cada camada.
 * 
 * propsriedades:
 * - id - [string]: Identificação da camada
 * - name - [string]: Nome não exclusivo da camada
 * - width - [number]: largura da camada
 * - height - [number]: altura da camada
 * - isVisible - [Boolean]: Visibilidade da camada
 */
const layers = [
  { id: "layer01", name: "camada 1", width, height, isVisible: true},
  { id: "layer02", name: "camada 2", width, height, isVisible: true },
  { id: "layer03", name: "camada 3", width, height, isVisible: true },
  { id: "layer04", name: "camada 4", width, height, isVisible: true },
  { id: "layer05", name: "camada 5", width, height, isVisible: true },
  { id: "touchArea", name: "camada 6",  width, height, isVisible: true }
];



/**
 * shapes (Array)
 * 
 * Descrição: Informações sobre os objetos que serão desenhados
 * na inicialização do aplicativo.
 * 
 * propsriedades:
 * - id:string = Identificação de cada objeto
 * - type:string = Tipo de formato do objeto ex.: circle, square, line, etc.
 * - layer:string = A camada no qual o objeto está ativo
 * - isActive:Boolean = Indica se o objeto do contexto está ativo
 * - x:number = Posição X do cursor
 * - y:number = Posição Y do cursor
 * * Todas as propsriedades disponíveus na props do canvas
 */
const shapes = [
  { id: "circle01", type: "circle", layer: "layer01", isActive: false, x: 200, y: 300, radius: 120, props: {lineWidth: 25, strokeStyle: "red", fillStyle: "crimson" }},
  // { id: "circle02", type: "circle", layer: "layer01", x: 200, y: 100, radius: 20, props: { lineWidth: 15, strokeStyle: "purple", fillStyle: "pink" }},
  { id: "square02", type: "square", layer: "layer02", isActive: false, x: 0, y: height, width, height: 50, props: {lineJoin: "round", strokeStyle: "rgb(100,0,0)" }},
  { id: "square01", type: "roundRect", layer: "layer03", isActive: false, x: 0, y: height, width: 50, height: 50, radius: 20, props: {lineJoin: "round", fillStyle: "lightgreen" }},
  { id: "line01", type: "line", layer: "layer04", isActive: false, x: 200, y: 300, mx: 200, my: 159, lineDash: [10, 10], props: {lineWidth: 5, strokeStyle: "blue", globalCompositeOperation: "color" }},
  { id: "line02", type: "line", layer: "layer05", isActive: false, x: 100, y: 300, mx: 200, my: 300, props: {lineWidth: 10, strokeStyle: "gold"}}
];

export { globalCoords, layers, shapes }