var defaultSketch = function(p) {


  let cW, cY, cR, cG, cB;
  let bubble = {name: "Bubble", position:0};
  let selection = {name: "Selection", position:1};
  let insertion = {name: "Insertion", position:2};
  let cocktail = {name: "Cocktail", position:4};
  let comb = {name: "Comb", position:3};
  let merge = {name: "Merge", position:5};
  let quick = {name: "Quick", position:6};
  let SORTS = [bubble, selection, insertion, merge, cocktail, comb, quick];
  let positions = [
    [0,0],    [120,0],    [240,0],    [360,0],
    [0,135],  [120,135],  [240,135],  [360,145],
  ];
  let initialarr = [], arrsize;
  let gui;
  let startBtn, randomizeBtn, stepBtn, ascBtn, descBtn;
  let speedSlid, skipSlid, sizeSlid;
  let sizes = [5,8,10,12,16,20,25,32,40,45,50,64,70,80,90,100,128,150,180,200,256,300,250,300,400,512];
  let sortSpeed = 5;
  let frame = 0;
  let skipframe = 0;


  let makeinitialarr = function(type) {
    switch (type) {
      case 'a': {
        initialarr = [];
        for (let i = 0; i < arrsize; i++){
          initialarr.push(i);
        }
        break;
      }
      case 'd': {
        initialarr = [];
        for (let i = arrsize - 1; i >= 0; i--){
          initialarr.push(i);
        }
        break;
      }
      default: {
        if (initialarr.length > arrsize) initialarr = [];
        let cursize = initialarr.length;
        for (let i = cursize; i < arrsize; i++){
          initialarr.push(i);
        }
        initialarr.randomize();
        break;
      }
    }
  }

  let initialize = function() {

    let points = [];
    for (let i = 0; i < initialarr.length; i++) {
			points[i] = new GPoint(i, initialarr[i]);
		}

    SORTS.forEach((item) => {
      item.points = initialarr.slice();
      item.i = 0;
      item.j = 0;
      item.k = [];
      item.plot.setPoints(points);
      item.plot.getLayer("markers")
        .setPoint(0, 0, 0)
        .setPoint(1, 0, 0)
        .setPointColors([[0,0], [0,0]]);
      item.plot.getLayer("markers2")
        .setPoints([])
        .setPointColor([0,0]);
  		item.plot
        .updateLimits()
        .defaultDraw();
      item.sort = sorts[item.name](initialarr);
    });

  }

  let step = function(skip = 0) {

    let points = [];
    let next;
    let finished = [];

    SORTS.forEach((item) => {
      for (let s = 0; s <= skip; s++) {
        next = item.sort.next();
        item.points = next.value?.array?.slice() || item.points;
        item.i = next.value?.i ?? item.i;
        item.j = next.value?.j ?? item.j;
        item.k = next.value?.k ?? [];
      }
      for (let i = 0; i < item.points.length; i++) {
        points[i] = new GPoint(i, item.points[i]);
  		}
      item.plot.setPoints(points);
      item.plot.getLayer("markers")
        .setPoint(0, item.i, item.points[item.i])
        .setPoint(1, item.j, item.points[item.j]);
      item.plot.getLayer("markers2")
        .setPoints([]);
      item.k.forEach((val, idx) => {
        item.plot.getLayer("markers2").addPoint(val, item.points[val]);
      });
  		item.plot.defaultDraw();
      finished.push(next.done);
    });

    p.push();
    finished.forEach((item, i) => {
      let pos = SORTS[i].plot.getPos();
      p.fill(cR)
      p.stroke(cB)
      p.strokeWeight(1.5)
      p.ellipseMode(p.CENTER);
      if (item) p.fill(cG);
      p.ellipse(pos[0]+15, pos[1]+10, 8, 8);
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

    randomizeBtn = p.createButton("Randomize", 340,415, 120,20);
    stepBtn = p.createButton(">", 420,385, 40,20);
    startBtn = p.createToggle("Start", 340,385, 70,20);
    startBtn.labelOn  = "Stop";
    startBtn.labelOff = "Start";
    ascBtn = p.createButton("/", 340,445, 55,20)
    descBtn = p.createButton("\\", 405,445, 55,20)

    speedSlid = p.createSlider("speed", 20,385, 120,20, 60,0);
    speedSlid.val = 10;
    skipSlid = p.createSlider("skip", 20,415, 120,20, 0,50);
    skipSlid.val = 0;
    skipframe = p.int(skipSlid.val)
    sizeSlid = p.createSlider("size", 20,445, 120,20, 0,sizes.length-1);
    sizeSlid.val = 6;
    arrsize = sizes[p.round(sizeSlid.val)];


    SORTS.forEach((item, index) => {
      item.points = [];
      item.plot = new GPlot(p)
      item.plot
        .setTitleText(item.name)
        .setPos(positions[item.position])
        .setBgColor(cY)
        .setBoxBgColor(cW)
        .setBoxLineColor(cB)
        .setBoxLineWidth(2)
        .setMar(5, 5, 20, 5)
        .setDim(110, 110)
        .addLayer("markers", [new GPoint(0,0), new GPoint(0,0)])
        .addLayer("markers2", [new GPoint(0,0)]);
      item.plot.getTitle()
        .setFontColor(cB)
        .setFontSize(10)
        .setOffset(4);
      item.plot.getXAxis()
        .setTickLength(false)
        .setDrawTickLabels(false)
        .setLineColor([0,0,0,0]);
      item.plot.getYAxis()
        .setTickLength(false)
        .setDrawTickLabels(false)
        .setLineColor([0,0,0,0]);
      item.plot.getMainLayer()
        .setPointColor(cB)
        .setLineColor(cB)
        .setLineWidth(1.5);
      item.plot.getLayer("markers")
        .setPointSize(5)
        .setLineColor([0, 0]);
      item.plot.getLayer("markers2")
        .setPointSize(3)
        .setLineColor([0, 0]);
  		item.plot.defaultDraw();
    });

    makeinitialarr();
    initialize();

	};


  p.draw = function() {

    p.rectMode(p.CORNERS);
    p.fill(230);
    p.noStroke();
    p.rect(0,370, 480,480);
    p.drawGui();
    p.textSize(8);
    p.fill(cB);
    p.text("speed "+sortSpeed, 30, 383);
    p.text("skip "+skipframe, 30, 413);
    p.text("size "+arrsize, 30, 443);

    if (randomizeBtn.isReleased) {
      startBtn.val = false;
      makeinitialarr();
      initialize();
    }
    if (ascBtn.isReleased) {
      startBtn.val = false;
      makeinitialarr('a');
      initialize();
    }
    if (descBtn.isReleased) {
      startBtn.val = false;
      makeinitialarr('d');
      initialize();
    }
    if (startBtn.val) {
      SORTS.forEach((item) => {
        item.plot.getLayer("markers").setPointColors([cR, cG]);
        item.plot.getLayer("markers2").setPointColor(cY);
      });
    }
    if (stepBtn.isReleased) {
      startBtn.val = false;
      SORTS.forEach((item) => {
        item.plot.getLayer("markers").setPointColors([cR, cG]);
        item.plot.getLayer("markers2").setPointColor(cY);
      });
      step();
    }
    if (speedSlid.isReleased) sortSpeed = p.int(speedSlid.val);
    if (skipSlid.isReleased) skipframe = p.int(skipSlid.val);
    if (sizeSlid.isReleased) {
      startBtn.val = false;
      let newsizeindex = p.round(sizeSlid.val);
      arrsize = sizes[newsizeindex];
      sizeSlid.val = newsizeindex;
      makeinitialarr();
      initialize();
    }
    if (!startBtn.val) return;

    if (frame === 0) step(skipframe);
    if (++frame>sortSpeed) frame = 0;

  }


};

new p5(defaultSketch);
