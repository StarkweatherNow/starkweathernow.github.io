/* draw set of weights */
function drawWeight(x, y, w, h, color) {
    var weight = new Kinetic.Group({
        x: x,
        y: y,
        draggable: true
    });

    var weightRect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: w,
        height: h,
        fill: color,
        stroke: 'black',
        strokeWidth: 1
    });

    var weightText = new Kinetic.Text({
        x: 0,
        y: 0,
        text: '1',
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black'
    });

    weight.add(weightRect);
    weight.add(weightText);

    return weight;
}
