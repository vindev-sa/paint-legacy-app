import { drawSquare } from "./views/shapes.js";
import { createLayers, clearLayer, getCtx, drawShape } from "./views/canvasSettings.js";
import { globalCoords, layers, shapes } from "./models/metadata.js";

 /**
 * q (Function) 
 * Descrição: Funçāo de captura de elementos
 * 
 * Descrição: Funçāo optimizada para captura de elementos do DOM.
 * Razāo: Diminuiçāo de constantes de elementos.
 * 
 * Tipo de retorno: Void. Elemento DOM.
 */
 
function q(domElementQuery) {
  return document.querySelector(domElementQuery);
}

/**
 * Altura e Largura da Tela (const)
 */
const width = document.body.offsetWidth;
const height = document.body.offsetHeight;

createLayers(layers, q("#layers"));
shapes.map(shape => {
  drawShape(shape);
});

q("#touchArea").addEventListener("touchstart", event => {
  globalCoords.startX1 = event.touches[0].clientX | 0;
  globalCoords.startX2 = event.touches[1]?.clientX | 0;
  globalCoords.startY1 = event.touches[0].clientY | 0;
  globalCoords.startY2 = event.touches[1]?.clientY | 0;
});

q("#touchArea").addEventListener("touchmove", event => {
  const { pageX: x1, pageY: y1 } = event.touches[0];
  const { pageX: x2, pageY: y2 } = event.touches[1] || 0;
  
  const { startX1, startX2, startY1, startY2 } = globalCoords;
  globalCoords.x = x1;
  globalCoords.y = y1;
  
  clearLayer("layer01",  width, height);
  clearLayer("layer02", width, height);
  clearLayer("layer03", width, height);
  clearLayer("layer04", width, height);
  // layer02Ctx.clearRect(0, 0, width, height);
  
  shapes.filter(shape => {
    // clearLayer(shape.layer);
    shape.layer === "layer01" && (
      shape.x = startX1,
      shape.y = startY1,
      // shape.radius = (Math.pow((startX1 - x1) - (startY1 - y1), 2) + Math.pow((startX2 - x2) - (startY2 - y2),2)) / 100,
      shape.radius = Math.abs((Math.pow(startX1 - x1, 2) + Math.pow(startY1 - y1, 2)) / 100),
      drawShape(shape)
    );
    
    shape.layer === "layer04" && (
      shape.mx = startX1,
      shape.my = startY1,
      shape.x = x1,
      shape.y = y1,
      drawShape(shape)
    );
    
    shape.layer === "layer03" && (
      shape.x = x1 / 2,
      shape.y = y1 / 2,
      drawShape(shape)
    );
  })
});