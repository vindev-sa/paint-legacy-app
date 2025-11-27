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
 * createLayers (Function)
 * 
 * Descrição: Cria camadas de forma automática iterando sobre o objeto "layers". 
 * Cria uma nova camada para cada ID indicado no objeto "layers"
 * 
 * Retorno: void
 * Side effect: 
 */
function createLayers(layers, layerContainer) {
  return layers.map((layer, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = layer.width;
      canvas.height = layer.height;
      canvas.id = layer.id;
      canvas.style.zIndex = index + 1 + "";
      canvas.classList.add("layer");
      layerContainer.appendChild(canvas);
    });
}

/*function clearLayer(layer) {
  const ctx = q("#"+layer).getContext("2d");
  ctx.clearRect(0, 0, width, height);
}*/
function clearLayer(layer, width, height) {
  getCtx(layer).clearRect(0, 0, width, height);
}

function getCtx(layer) {
  return q("#"+layer).getContext("2d");
}

function drawShape(shape) {
  const { type, layer, x, y, isActive } = shape;
  const ctx = q("#"+layer).getContext("2d");
  ctx.beginPath();
  Object.entries(shape.props).forEach(prop => {
    ctx[prop[0]] = prop[1];
  });
  /*ctx.lineWidth = shape.props.lineWidth || "1";
  ctx.strokeStyle = shape.props.strokeColor || "black";
  ctx.fillStyle = shape.props.fillColor || "gray";
  ctx.lineCap = shape.props.lineCap || "round";
  shape.props.lineDash && ctx.setLineDash(shape.props?.lineDash);
  ctx.lineJoin = shape.props.lineJoin || "miter";
  ctx.miterLimiter = shape.props.miterLimiter || "10";
  */
  shape.type === "circle" && ctx.arc(x, y, shape?.radius, 0, Math.PI * 2);
  shape.type === "square" && ctx.rect(x, y, shape?.width, shape?.height);
  shape.type === "roundRect" && ctx.roundRect(x, y, shape?.width, shape?.height, shape?.radius);
  shape.lineDash && ctx.setLineDash(shape.lineDash);
  shape.type === "line" && (ctx.moveTo(shape?.mx, shape?.my), ctx.lineTo(x, y));
  shape.props.strokeStyle && ctx.stroke();
  shape.props.fillStyle && ctx.fill();
}

export { 
  createLayers,
  clearLayer,
  getCtx,
  drawShape
}