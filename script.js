var audio = new Audio();
var color = 0;

function parallax() {
	var s = document.getElementById("floater");
  var yPos = 0 - window.pageYOffset/15;	
  $('#floater').css('background-position-y', 80 + yPos + "%")
  $('#floater2').css('background-position-y', 140 + yPos + "%")
  
  //alert(yPos);
}

window.addEventListener("scroll", function(){ 
	parallax();	
});

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {

$.getJSON("https://famillelusson.freeboxos.fr/status-json.xsl", function(json) {
	document.getElementById('currentPlaying').innerHTML = (`<h2>${json.icestats.source.title}</h2>`)
});
$('body').addClass('stop-scrolling')
$('.blur').css('filter','blur(4px)');
$('.stop-clicking').css('visibility','visible');
$('.stop-clicking').css('opacity','1');
$('.stop-clicking').css('background-color','hsl(0, 0%, 0%, 50%)');
$('.radiopopup').css('visibility','visible');
$('.radiopopup').css('opacity','1');
$('.radiopopup').css('background-color','hsl(0, 0%, 0%, 50%)');
	audio.src = "https://famillelusson.freeboxos.fr/nag";
	audio.crossOrigin = "anonymous";
	audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

	  var gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
	  gradient.addColorStop(0, '#222');
	  gradient.addColorStop(1, '#000');
	  ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = 0;
        var g = barHeight + (250 * (i / bufferLength));
        var b = barHeight + (150 * (i / bufferLength));

		color += 0.001;
        ctx.fillStyle = `hsl(${color+i},100%,${barHeight/5}%)`;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    renderFrame();
}

// call this to Enable
function enableScroll() {
$('body').removeClass('stop-scrolling')
$('.blur').css('filter','blur(0px)');
$('.stop-clicking').css('visibility','hidden');
$('.stop-clicking').css('opacity','0');
$('.stop-clicking').css('background-color','hsl(0, 0%, 0%, 0%)');
$('.radiopopup').css('visibility','hidden');
$('.radiopopup').css('opacity','0');
$('.radiopopup').css('background-color','hsl(0, 0%, 0%, 0%)');
audio.pause();
}








function refresh() {

}
 
setInterval(function(){  
		$.getJSON("https://famillelusson.freeboxos.fr/status-json.xsl", function(json) {
			document.getElementById('currentPlaying').innerHTML = (`<h2>${json.icestats.source.title}</h2>`)
			document.title = (`${json.icestats.source.title} | RADIO N.A.G. Corporation`)
		});
 }, 2000);