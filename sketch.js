var defaultPlotSketch = function(p) {


  let cW, cY, cR, cG, cB;
  let bubble = {}
  let selection = {}
  let insertion = {}
  let initialarr = [], arrsize;
  let gui;
  let startBtn, randomizeBtn, stepBtn;
  let speedSlid, skipSlid, sizeSlid;
  let sortSpeed = 5;
  let frame = 0;
  let skipframe = 0;


  let initialize = function() {

    if (initialarr.length > arrsize) {
      initialarr = []
    }
    let cursize = initialarr.length;
    for (let i = cursize; i < arrsize; i++){
      initialarr.push(i);
    }
    initialarr.randomize();
    let points = [];
    for (let i = 0; i < initialarr.length; i++) {
			points[i] = new GPoint(i, initialarr[i]);
		}

    [bubble, selection, insertion].forEach((item) => {
      item.plot.setPoints(points);
      item.plot.getLayer("markers").setPoint(0, 0, 0)
      item.plot.getLayer("markers").setPoint(1, 0, 0)
      item.plot.getLayer("markers").setPoint(2, 0, 0)
      item.plot.getLayer("markers").setPointColors([[0,0], [0,0], [0,0]]);
  		item.plot.defaultDraw();
      item.points = initialarr.slice();
      item.i = 0;
      item.j = 0;
      item.k = 0;
    });

    bubble.sort = sorts.Bubble(initialarr.slice());
    selection.sort = sorts.Selection(initialarr.slice());
    insertion.sort = sorts.Insertion(initialarr.slice());

    p.drawGui();

  }


  let step = function(skip = 0) {

    let points = [];
    let next;
    let finished = [];

    [bubble, selection, insertion].forEach((item) => {
      for (let s = 0; s <= skip; s++) {
        next = item.sort.next();
        item.points = next.value?.array?.slice() || item.points;
        item.i = next.value?.i ?? item.i;
        item.j = next.value?.j ?? item.j;
        item.k = next.value?.k ?? item.k;
      }
      for (let i = 0; i < item.points.length; i++) {
        points[i] = new GPoint(i, item.points[i]);
  		}
      item.plot.setPoints(points);
      item.plot.getLayer("markers").setPoint(0, item.i, item.points[item.i])
      item.plot.getLayer("markers").setPoint(1, item.j, item.points[item.j])
      item.plot.getLayer("markers").setPoint(2, item.k, item.points[item.k])
  		item.plot.defaultDraw();
      finished.push(next.done)
    });

    p.push();
    finished.forEach((item, i) => {
      let pos = [bubble, selection, insertion][i].plot.getPos();
      p.fill(cR)
      p.stroke(cB)
      p.strokeWeight(1.5)
      p.ellipseMode(p.CENTER);
      if (item) p.fill(cG);
      p.ellipse(pos[0]+20, pos[1]+15, 10, 10);
    });
    p.pop();

    if (finished.every(x => x)) startBtn.val = false;

  }


	p.setup = function() {

		let canvas = p.createCanvas(480, 480);
		p.background(230);
    p.frameRate(60);

    cW = p.color('#F4F1DE');
    cY = p.color('#F2CC8F');
    cR = p.color('#E07A5F');
    cG = p.color('#81B29A');
    cB = p.color('#3D405B');

    gui = p.createGui(canvas);
    gui.loadStyleJSON("./stylepreset.json");

    randomizeBtn = p.createButton("Randomize", 340, 420, 120, 30);
    stepBtn = p.createButton(">", 420, 380, 40, 30);
    startBtn = p.createToggle("START", 340, 380, 70, 30);
    startBtn.labelOn  = "STOP";
    startBtn.labelOff = "START";

    speedSlid = p.createSlider("speed", 20, 380, 120, 20, 60, 0);
    speedSlid.val = 10;
    skipSlid = p.createSlider("skip", 20, 410, 120, 20, 0, 20);
    skipSlid.val = 0;
    skipframe = p.int(skipSlid.val)
    sizeSlid = p.createSlider("size", 20, 440, 120, 20, 5, 150);
    sizeSlid.val = 30;
    arrsize = p.int(sizeSlid.val);

		bubble.plot = new GPlot(p);
		selection.plot = new GPlot(p);
		insertion.plot = new GPlot(p);

    bubble.plot.setTitleText("Bubble");
    selection.plot.setTitleText("Selection");
    insertion.plot.setTitleText("Insertion");

    bubble.plot.setPos(0, 0);
    selection.plot.setPos(160, 0);
    insertion.plot.setPos(320, 0);

    [bubble, selection, insertion].forEach((item) => {
  		item.plot.getXAxis().setTickLength(false);
  		item.plot.getYAxis().setTickLength(false);
  		item.plot.getXAxis().setDrawTickLabels(false);
  		item.plot.getYAxis().setDrawTickLabels(false);
  		item.plot.getYAxis().setLineColor([0,0,0,0]);
  		item.plot.getXAxis().setLineColor([0,0,0,0]);
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
  		item.plot.getTitle().setOffset(7);
      item.points = [];
  		item.plot.defaultDraw();
      item.plot.addLayer("markers", [new GPoint(0,0), new GPoint(20,20), new GPoint(20,20)]);
      item.plot.getLayer("markers").setPointSizes([5, 5, 5]);
      item.plot.getLayer("markers").setLineColor([0, 0]);
    });

    initialize();

	};


  p.draw = function() {

    p.drawGui();
    p.textSize(8)
    p.fill(cB)
    p.noStroke()
    p.text("speed", 30, 378)
    p.text("skip", 30, 408)
    p.text("size", 30, 438)

    if (randomizeBtn.isReleased) {
      startBtn.val = false;
      initialize();
    }
    if (startBtn.val) {
      [bubble, selection, insertion].forEach((item) => {
        item.plot.getLayer("markers").setPointColors([cR, cG, cY]);
      });
    }
    if (stepBtn.isReleased) {
      startBtn.val = false;
      [bubble, selection, insertion].forEach((item) => {
        item.plot.getLayer("markers").setPointColors([cR, cG, cY]);
      });
      step();
    }
    if (speedSlid.isReleased) sortSpeed = p.int(speedSlid.val);
    if (skipSlid.isReleased) skipframe = p.int(skipSlid.val);
    if (sizeSlid.isReleased) {
      startBtn.val = false;
      arrsize = p.int(sizeSlid.val);
      initialize();
    }
    if (!startBtn.val) return;

    if (frame === 0) step(skipframe);
    frame++;
    if (frame>sortSpeed) frame = 0;

  }


};

new p5(defaultPlotSketch);
