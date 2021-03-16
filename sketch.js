var defaultPlotSketch = function(p) {
  let cW, cY, cR, cG, cB;
  let bsPlot, bsPoints = [], bubblesort;
  let ssPlot, ssPoints = [], selectionsort;
  let isPlot, isPoints = [], insertionsort;
  let bubble = {}
  let selection = {}
  let insertion = {}
  let initialarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  let startBtn, randomizeBtn;

	p.setup = function() {

		let canvas = p.createCanvas(480, 400);
		p.background(230);
    p.frameRate(5);

    initialarr.randomize(50);

    cW = p.color('#F4F1DE');
    cY = p.color('#F2CC8F');
    cR = p.color('#E07A5F');
    cG = p.color('#81B29A');
    cB = p.color('#3D405B');


    // gui = p.createGui();
    // startBtn = p.createButton("START", 0, 370, 150, 30)

		bubble.plot = new GPlot(p);
		selection.plot = new GPlot(p);
		insertion.plot = new GPlot(p);

    bubble.plot.setTitleText("Bubble");
    selection.plot.setTitleText("Selection");
    insertion.plot.setTitleText("Insertion");

    bubble.plot.setPos(0, 0);
    selection.plot.setPos(160, 185);
    insertion.plot.setPos(320, 0);

    let points = [];
    for (var i = 0; i < initialarr.length; i++) {
			points[i] = new GPoint(i, initialarr[i]);
		}

    [bubble, selection, insertion].forEach((item) => {
  		item.plot.getXAxis().setTickLength(false);
  		item.plot.getYAxis().setTickLength(false);
  		item.plot.getXAxis().setDrawTickLabels(false);
  		item.plot.getYAxis().setDrawTickLabels(false);
  		item.plot.getYAxis().lineColor = [0,0,0,0];
  		item.plot.getXAxis().lineColor = [0,0,0,0];
      item.plot.getMainLayer().setPointColor(cB);
      item.plot.getMainLayer().setLineColor(cB);
      item.plot.getMainLayer().setLineWidth(1.5);
      item.plot.setBgColor(cY);
      item.plot.setBoxBgColor(cW);
      item.plot.setBoxLineColor(cB);
      item.plot.setBoxLineWidth(2);
  		item.plot.setMar(5, 5, 30, 5);
  		item.plot.setDim(150, 150);
  		item.plot.getTitle().setFontColor(cB);
      item.points = [];
      item.i = 0;
      item.j = 0;
      item.plot.setPoints(points);
  		item.plot.defaultDraw();
      item.plot.addLayer("i", [new GPoint(0,0)]);
      item.plot.addLayer("j", [new GPoint(0,0)]);
      item.plot.getLayer("i").setPointColor(cR);
      item.plot.getLayer("j").setPointColor(cG);
      item.plot.getLayer("i").setPointColor(cR);
      item.plot.getLayer("j").setPointColor(cG);
      item.plot.getLayer("i").setPointSize(5);
      item.plot.getLayer("j").setPointSize(5);
    });

    bubble.sort = sorts.Bubble(initialarr.slice());
    selection.sort = sorts.Selection(initialarr.slice());
    insertion.sort = sorts.Insertion(initialarr.slice());

	};

  p.draw = function() {

    let points = [];
    let next;

    [bubble, selection, insertion].forEach((item) => {
        next = item.sort.next()
        item.points = next.value?.array?.slice() || item.points;
        item.i = next.value?.i || item.i;
        item.j = next.value?.j || item.j;
        for (var i = 0; i < item.points.length; i++) {
          points[i] = new GPoint(i, item.points[i]);
    		}
        item.plot.setPoints(points);
        item.plot.getLayer("i").setPoint(0, item.i, item.points[item.i])
        item.plot.getLayer("j").setPoint(0, item.j, item.points[item.j])
    		item.plot.defaultDraw();
    });

  }

};

new p5(defaultPlotSketch);
