function drawSquare(shapes, x, y, width, height) {
  const shape = {
    x,
    y,
    width,
    height,
    type: "square",
    layer: "layer01",
    props: {
      strokeStyle: "#0f5"
    }
  }
  shapes.push(shape);
  console.log(shapes);
}



export { drawSquare };