var audio = new Audio();
var color = 0;
var isPlayed = false;
var context;
var src;

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


function togglePause() {
	
	let playbuttonimg = document.getElementsByClassName("pauseButton");
	
		if (audio.paused) {
			
			for (let item of playbuttonimg) {
					item.src = 'images/pause.png';
			}
			audio.src = "https://radio-admin.guillarda.fr/streamlive";
			audio.crossOrigin = "anonymous";
			audio.play();
		
		} else {
			
			for (let item of playbuttonimg) {
					item.src = 'images/play.png';
			}
			audio.pause();
			
		}
}

function loadBars() {

    context = new AudioContext();
    src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

	  if (typeof analyser !== 'undefined') {
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

    }

    renderFrame();

}




function loadBars2() {

    var src2 = src;
    var analyser2 = context.createAnalyser();

    var canvas2 = document.getElementById("canvas2");
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    var ctx = canvas2.getContext("2d");

    src2.connect(analyser2);
    analyser2.connect(context.destination);

    analyser2.fftSize = 256;

    var bufferLength = analyser2.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas2.width;
    var HEIGHT = canvas2.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

	  if (typeof analyser2 !== 'undefined') {
      analyser2.getByteFrequencyData(dataArray);
	  var gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
	  ctx.clearRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]*8;

        var r = 0;
        var g = barHeight + (250 * (i / bufferLength));
        var b = barHeight + (150 * (i / bufferLength));

		color += 0.001;
        ctx.fillStyle = `hsl(${color+i},100%,${barHeight/5/8}%)`;
        ctx.fillRect(x, HEIGHT +800 - barHeight, barWidth, barHeight+800);

        x += barWidth + 1;
      }
	  }

    }

    renderFrame();

}


// call this to Disable
function disableScroll() {

$.getJSON("https://radio-admin.guillarda.fr/infojson", function(json) {
	let title = json.icestats.source.title;
	if (typeof title === 'undefined') { title = "Émission sans titre"}
	document.getElementById('currentPlaying').innerHTML = (`<h2>${title}</h2>`)
	document.getElementById('currentPlaying2').innerHTML = (`<h2>${title}</h2>`)
});
$('body').addClass('stop-scrolling')
$('.blur').css('filter','blur(4px)');
$('.stop-clicking').css('visibility','visible');
$('.stop-clicking').css('opacity','1');
$('.stop-clicking').css('background-color','hsl(0, 0%, 0%, 50%)');
$('.radiopopup').css('visibility','visible');
$('.radiopopup').css('opacity','1');
$('.radiopopup').css('background-color','hsl(0, 0%, 0%, 50%)');

$('.radiopopupfloat').css('background-color','hsl(0, 0%, 0%, 0%)');
$('.radiopopupfloat').css('visibility','hidden');
$('.radiopopupfloat').css('opacity','0');

	if (!isPlayed) {
		audio.src = "https://radio-admin.guillarda.fr/streamlive";
		audio.crossOrigin = "anonymous";
		audio.play();
		isPlayed = true;
	}
	loadBars();
	loadBars2();
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


if (!audio.paused) {
	$('.radiopopupfloat').css('background-color','hsl(0, 0%, 0%, 50%)');
	$('.radiopopupfloat').css('visibility','visible');
	$('.radiopopupfloat').css('opacity','1');
	
} else {
	let playbuttonimg = document.getElementsByClassName("pauseButton");
	
		if (audio.paused) {
			
			for (let item of playbuttonimg) {
					item.src = 'images/pause.png';
			}
		
		} else {
			
			for (let item of playbuttonimg) {
					item.src = 'images/play.png';
			}
			
		}
	isPlayed = false;
}
}








function refresh() {

}
 
setInterval(function(){  
		$.getJSON("https://radio-admin.guillarda.fr/infojson", function(json) {
			let title = json.icestats.source.title;
			if (typeof title === 'undefined') { title = "Émission sans titre"}
			document.getElementById('currentPlaying').innerHTML = (`<h2>${title}</h2>`)
			document.getElementById('currentPlaying2').innerHTML = (`<h2>${title}</h2>`)
			document.title = (`${title} | RADIO N.A.G. Corporation`)
		});
 }, 2000);
 
 
 
 
 
 
 
function loadPage(url) {
	
	window.history.pushState("", document.title, url);
	$("#content").load(url+" #content");
	
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


const d = new Date();
d.setTime(d.getTime() + (31*24*60*60*1000));
const expires = "expires="+ d.toUTCString();


function volumeBar(v) {
	
	
var e = document.querySelector('#volumebar');
var e2 = document.querySelector('#volumebar2');
var eInner = document.querySelector('#volumedot');
var eInner2 = document.querySelector('#volumedot2');
var drag = false;
var drag2 = false;

var updateBar = function (y, x, vol) {
	var volume = e;
		var percentage;
		//if only volume have specificed
		//then direct update volume
		if (vol) {
			percentage = (vol-1) * 100;
		} else {
			if (x) {
				var position = x - e2.offsetLeft - document.querySelector('.radiopopupfloat').offsetLeft;
				percentage = 100 - 100 * position / e2.clientWidth;
			} else {
				var position = y - volume.offsetTop - document.querySelector('.radiopopup').offsetTop - eInner.offsetHeight*0.75;
				percentage = 100 * position / volume.clientHeight;
			}
		}

		if (percentage > 100) {
			percentage = 100;
		}
		if (percentage < 0) {
			percentage = 0;
		}

		//update volume bar and video volume
		eInner.style.top = 'calc('+ percentage +'% - 1.5em)';
		document.querySelector('#volumedot2').style.left = 'calc('+(100 - percentage) +'% - 1em)';
		audio.volume = (100 - percentage) / 100;
		document.cookie = `Volume=${audio.volume};${expires}`;
};
	
	if (v) {
		
		updateBar(0, 0, v)
		
	}
				
				e.addEventListener('mousedown',function(ev){
				   drag = true;
				   eInner.style.cursor = 'grabbing'
				   updateBar(ev.clientY);
				});
				document.addEventListener('mousemove',function(ev){
				   if(drag){
					  updateBar(ev.clientY);
				   }
				});
				e.addEventListener('touchstart',function(ev){
				   drag = true;
				   eInner.style.cursor = 'grabbing'
				   updateBar(ev.touches[0].clientY);
				});
				document.addEventListener('touchmove',function(ev){
				   if(drag){
					   updateBar(ev.touches[0].clientY);
					}
				});
				document.addEventListener('mouseup',function(ev){
				 drag = false;
				 drag2 = false;
				 eInner.style.cursor = 'grab'
				});
				document.addEventListener('touchend',function(ev){
				 drag = false;
				 drag2 = false;
				 eInner.style.cursor = 'grab'
				});
				
				
				
				
				
				
			if (e2) {
				e2.addEventListener('mousedown',function(ev){
				   drag2 = true;
				   eInner.style.cursor = 'grabbing'
				   updateBar(0,ev.clientX);
				});
				document.addEventListener('mousemove',function(ev){
				   if(drag2){
					  updateBar(0,ev.clientX);
				   }
				});
				e2.addEventListener('touchstart',function(ev){
				   drag2 = true;
				   eInner.style.cursor = 'grabbing'
				   updateBar(0,ev.touches[0].clientX);
				});
				document.addEventListener('touchmove',function(ev){
				   if(drag2){
					   updateBar(0,ev.touches[0].clientX);
					}
				});
			}
	
}


window.addEventListener('load', function () {
	if (getCookie('Volume')) {
		volumeBar(2-getCookie('Volume'));
	}
});