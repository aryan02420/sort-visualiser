var defaultPlotSketch = function(p) {
  let cW, cY, cR, cG, cB;
  let bsPlot, bsPoints = [], bubblesort;
  let ssPlot, ssPoints = [], selectionsort;
  let isPlot, isPoints = [], insertionsort;
  let initialarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

	p.setup = function() {

		let canvas = p.createCanvas(480, 370);
		p.background(230);
    initialarr.randomize(30)
    cW = p.color('#F4F1DE')
    cY = p.color('#F2CC8F')
    cR = p.color('#E07A5F')
    cG = p.color('#81B29A')
    cB = p.color('#3D405B')


		bsPlot = new GPlot(p);
		ssPlot = new GPlot(p);
		isPlot = new GPlot(p);

    bsPlot.setTitleText("Bubble");
    ssPlot.setTitleText("Selection");
    isPlot.setTitleText("Insertion");

    bsPlot.setPos(0, 0);
    ssPlot.setPos(160, 185);
    isPlot.setPos(320, 0);

    [bsPlot, ssPlot, isPlot].forEach((item) => {
  		item.getXAxis().setTickLength(false);
  		item.getYAxis().setTickLength(false);
  		item.getXAxis().setDrawTickLabels(false);
  		item.getYAxis().setDrawTickLabels(false);
  		item.getYAxis().lineColor = [0,0,0,0]
  		item.getXAxis().lineColor = [0,0,0,0]
      item.getMainLayer().setPointColor(cB)
      item.getMainLayer().setLineColor(cB)
      item.getMainLayer().setLineWidth(1.5)
      item.setBgColor(cY)
      item.setBoxBgColor(cW)
      item.setBoxLineColor(cB)
      item.setBoxLineWidth(2)
  		item.setMar(5, 5, 30, 5);
  		item.setDim(150, 150);
  		item.getTitle().setFontColor(cB);
    });

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
