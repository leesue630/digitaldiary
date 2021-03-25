window.addEventListener("keydown", function (e) {
  if (e.keyCode === 32 && e.target == document.body) {
    e.preventDefault();
  }
});

window.addEventListener("keydown", function (e) {
    if (e.keyCode === 222 && e.target == document.body) {
      e.preventDefault();
    }
  });

var t = 0;
var rot_t = 0;
var full_text = "type something...";
var userHasTyped = false;
var c = 0;
var incColor = true;
var halfWidth;
var halfHeight;

var minFontSize = 10;
var maxFontSize = 100;

var fontSize = minFontSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  halfWidth = width / 2;
  halfHeight = height / 2;
  textSize(fontSize);
  fill(0);
  rect(0, 0, width, height);
  colorMode(HSB);
  translate(width / 4, height / 4);
}

function draw() {
  writeText();
  t += 0.005;
  if (fontSize >= minFontSize) {
    fontSize -= 2 * (fontSize / maxFontSize);
  }
}

function validKey() {
  return (keyCode >= 48 && keyCode <= 57) || // 0-9
  (keyCode >= 65 && keyCode <= 90) ||        // a-z
  (keyCode >= 219 && keyCode <= 222) ||      // [\]'
  (keyCode >= 190 && keyCode <= 192) ||      // ./`
  (keyCode === 173) ||                       // -
  (keyCode === 61) ||                        // =
  (keyCode === 59) ||                        // ;
  (keyCode === 188) ||                       // ,
  (keyCode === 32) ||                        // space
  (keyCode === BACKSPACE);
}

function keyPressed() {
  if (keyCode === ENTER) {
    console.log("enter");
    t += 30;
    full_text = "";
    console.log(full_text);
    if (incColor) {
      c += 10;
    } else {
      c -= 10;
    }
  } else if (validKey()) {
    console.log("not enter");
    console.log("full_text: " + full_text);
    if (!userHasTyped) {
      userHasTyped = true;
      t += 10;
      full_text = "";
    }
    if (full_text.length > 30) {
      full_text = "";
      t += 100;
    }
    if (keyCode === BACKSPACE) {
      console.log("backspace");
      if (full_text.length > 0) {
        full_text = full_text.substring(0, full_text.length - 1);
      }
      console.log(full_text);
    } else {
      full_text += key;
    }
    if (fontSize <= maxFontSize) {
      fontSize += 10;
    }
    rot_t += 0.05;
    writeText();
  }
}

function writeText() {
  if (incColor) {
    if (c >= 150) {
      incColor = false;
    } else {
      c++;
    }
  } else {
    if (c < 0) {
      incColor = true;
    } else {
      c--;
    }
  }

  fill('rgba(0,0,0, 0.1)');
  rect(0, 0, width, height);

  var x = noise(t) * halfWidth;
  var y = noise(t + 100) * halfHeight;

  //float r = noise(t)*255;
  //float g = noise(t+100)*255;
  //float b = noise(t+200)*255;
  fill(c, 255, 255);
  push();
  translate(x, y);
  rotate(radians(noise(rot_t) * 180 - 90));
  translate(-x, -y);
  textSize(fontSize);
  text(full_text, x, y, halfWidth, height);
  pop();
  //t+=.1;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
