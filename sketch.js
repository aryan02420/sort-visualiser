var defaultPlotSketch = function(p) {

  let bsPlot, bsPoints = [], bubblesort;
  let ssPlot, ssPoints = [], selectionsort;
  let isPlot, isPoints = [], insertionsort;
  let initialarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

	p.setup = function() {

		let canvas = p.createCanvas(480, 370);
		p.background(230);
    initialarr.randomize(30)

		bsPlot = new GPlot(p);
		bsPlot.getXAxis().setTickLength(false);
		bsPlot.getYAxis().setTickLength(false);
		bsPlot.getXAxis().setDrawTickLabels(false);
		bsPlot.getYAxis().setDrawTickLabels(false);
		bsPlot.getYAxis().lineColor = [0,0,0,0]
		bsPlot.getXAxis().lineColor = [0,0,0,0]
		bsPlot.setMar(5, 5, 30, 5);
		bsPlot.setDim(150, 150);
		bsPlot.setPos(0, 0);
		bsPlot.setTitleText("Bubble");

		ssPlot = new GPlot(p);
		ssPlot.getXAxis().setTickLength(false);
		ssPlot.getYAxis().setTickLength(false);
		ssPlot.getXAxis().setDrawTickLabels(false);
		ssPlot.getYAxis().setDrawTickLabels(false);
		ssPlot.getYAxis().lineColor = [0,0,0,0]
		ssPlot.getXAxis().lineColor = [0,0,0,0]
		ssPlot.setMar(5, 5, 30, 5);
		ssPlot.setDim(150, 150);
		ssPlot.setPos(160, 185);
		ssPlot.setTitleText("Selection");

		isPlot = new GPlot(p);
		isPlot.getXAxis().setTickLength(false);
		isPlot.getYAxis().setTickLength(false);
		isPlot.getXAxis().setDrawTickLabels(false);
		isPlot.getYAxis().setDrawTickLabels(false);
		isPlot.getYAxis().lineColor = [0,0,0,0]
		isPlot.getXAxis().lineColor = [0,0,0,0]
		isPlot.setMar(5, 5, 30, 5);
		isPlot.setDim(150, 150);
		isPlot.setPos(320, 0);
		isPlot.setTitleText("Insertion");

    let points = [];
    for (var i = 0; i < initialarr.length; i++) {
			points[i] = new GPoint(i, initialarr[i]);
		}
    bsPlot.setPoints(points)
		bsPlot.defaultDraw();
    ssPlot.setPoints(points)
		ssPlot.defaultDraw();
    isPlot.setPoints(points)
		isPlot.defaultDraw();

    bubblesort = sorts.Bubble(initialarr.slice())
    selectionsort = sorts.Selection(initialarr.slice())
    insertionsort = sorts.Insertion(initialarr.slice())

	};

  p.draw = function() {
    let points = []

    bsPoints = bubblesort.next().value || bsPoints;
    for (var i = 0; i < bsPoints.length; i++) {
			points[i] = new GPoint(i, bsPoints[i]);
		}
    bsPlot.setPoints(points)
		bsPlot.defaultDraw();

    ssPoints = selectionsort.next().value || ssPoints;
    for (var i = 0; i < ssPoints.length; i++) {
			points[i] = new GPoint(i, ssPoints[i]);
		}
    ssPlot.setPoints(points)
		ssPlot.defaultDraw();

    isPoints = insertionsort.next().value || isPoints;
    for (var i = 0; i < isPoints.length; i++) {
			points[i] = new GPoint(i, isPoints[i]);
		}
    isPlot.setPoints(points)
		isPlot.defaultDraw();
  }

};

new p5(defaultPlotSketch)
