import debounce from 'lodash.debounce';
import anime from 'animejs';

let circlesPerTitle = 2;
let titleStart = 2;
let circleMargin = 20;

function tempCircle(s, x, y, p, i){
  var el = document.createElement('div');
  el.innerHTML =  `<div class="js-circle br-100 absolute circle"
                        style="width:${(s - p)}px;
                               height:${(s - p)}px;
                               left:${x}px;
                               margin:0 0 ${p}px ${p}px;
                               opacity: 0;
                               background-image: url('./assets/circle${i}.svg');
                               top:${y}px;"></div>`;
  return el;
}

function isNotTitleRow(i){
  return (i < titleStart || i >= (titleStart + circlesPerTitle));
}

function renderCircles(size){
  let rows = 6;
  let sectionEl = document.querySelector('.js-container');
  let titleEl = document.querySelector('.js-title');
  let titleOffset = 3 * (titleEl.offsetWidth / 7);
  let perRow = Math.floor((sectionEl.offsetWidth - titleOffset) / size);

  for(let i=0; i<rows; i++){
    for(let j=1; j<=perRow; j++){
      // Don't draw circles over the heading.
      if(isNotTitleRow(i) ||
         (!isNotTitleRow(i) && ((j * size) < (sectionEl.offsetWidth - titleEl.offsetWidth)))) {
        sectionEl.appendChild(tempCircle(size, sectionEl.offsetWidth - (j * size), i * size, circleMargin, anime.random(1, 40)));
      }
    }
  }
  anime({
    targets: '.js-circle',
    opacity: 1,
    loop: false,
    duration: 1000,
    easing: 'easeInOutSine',
    delay: function(el, i, l) {
      return anime.random(500, 2000);
    }
  });
}

function setupLinks(){
  let linkWrapEl = document.querySelector('.js-links');
  let linkEls = document.querySelectorAll('.js-dot');
  let dotWidth = linkEls[0].querySelector('.dot').offsetWidth;
  Array.prototype.forEach.call(linkEls, function(el, i){
    el.addEventListener('mouseenter', function(evt){
      evt.target.querySelector('.dot').style.width = (evt.target.offsetWidth + 30) + 'px';
    });
    el.addEventListener('mouseleave', function(evt){
      evt.target.querySelector('.dot').style.width = dotWidth + 'px';
    });
  });

  // linkWrapEl.style.opacity = 1;
  anime({
    targets: linkWrapEl.querySelectorAll('li'),
    opacity: 1,
    loop: false,
    duration: 1000,
    easing: 'easeInOutSine',
    delay: function(el, i, l) {
      return 3000 + (i * 50);
    }
  });
}

function getCircleSize(){
  return Math.floor((document.querySelector('.js-title').offsetHeight / circlesPerTitle) + 0);
}

function showFooter(){
  document.querySelector('footer').style.display = 'block';
}

function setAndShowTitle(circleSize){
  let titleEl = document.querySelector('.js-title');
  titleEl.style.marginTop = `${(circleSize * titleStart) - (circleMargin / 2)}px`;
  titleEl.style.opacity = 1;
}

function handleResize(circleSize){
  let pageWidth = window.outerWidth;
  let resize = debounce(function(){
    if(window.outerWidth !== pageWidth) {
      pageWidth = window.outerWidth;
      Array.prototype.forEach.call(document.querySelectorAll('.js-circle'), function(el){
        el.parentNode.removeChild(el);
      });
      renderCircles(circleSize);
    }
  }, 400);

  window.addEventListener('resize', resize);
}

function init(){
  var circleSize = getCircleSize();
  renderCircles(circleSize);
  setAndShowTitle(circleSize)
  setupLinks();
  showFooter();
  handleResize(circleSize);
}

export default init

init();
