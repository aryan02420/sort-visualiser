var defaultPlotSketch = function(p) {


  let cW, cY, cR, cG, cB;
  let bubble = {}
  let selection = {}
  let insertion = {}
  let initialarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  let gui, startBtn, randomizeBtn;


  let initialize = function() {

    initialarr.randomize(50);

    let points = [];
    for (let i = 0; i < initialarr.length; i++) {
			points[i] = new GPoint(i, initialarr[i]);
		}

    [bubble, selection, insertion].forEach((item) => {
      item.plot.setPoints(points);
      item.plot.getLayer("i").setPoint(0, 0, 0)
      item.plot.getLayer("j").setPoint(0, 0, 0)
  		item.plot.defaultDraw();
    });

    bubble.sort = sorts.Bubble(initialarr.slice());
    selection.sort = sorts.Selection(initialarr.slice());
    insertion.sort = sorts.Insertion(initialarr.slice());

    p.drawGui();

  }


	p.setup = function() {

		let canvas = p.createCanvas(480, 420);
		p.background(230);
    p.frameRate(15);

    cW = p.color('#F4F1DE');
    cY = p.color('#F2CC8F');
    cR = p.color('#E07A5F');
    cG = p.color('#81B29A');
    cB = p.color('#3D405B');

    gui = p.createGui(canvas);
    gui.loadStyle("Seafoam");
    startBtn = p.createToggle("START", 340, 380, 120, 30);
    startBtn.labelOn  = "STOP";
    startBtn.labelOff = "START";
    randomizeBtn = p.createButton("Randomize", 20, 380, 120, 30);

		bubble.plot = new GPlot(p);
		selection.plot = new GPlot(p);
		insertion.plot = new GPlot(p);

    bubble.plot.setTitleText("Bubble");
    selection.plot.setTitleText("Selection");
    insertion.plot.setTitleText("Insertion");

    bubble.plot.setPos(0, 0);
    selection.plot.setPos(160, 185);
    insertion.plot.setPos(320, 0);

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

    initialize();

	};


  p.draw = function() {

    p.drawGui();

    if (randomizeBtn.isReleased) {
      startBtn.val = false;
      initialize();
    }
    if (!startBtn.val) return;

    let points = [];
    let next;
    let finished = [];

    [bubble, selection, insertion].forEach((item, i) => {
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
        finished.push(next.done)
    });

    if (finished.every(x => x)) startBtn.val = false;

  }


};

new p5(defaultPlotSketch);
