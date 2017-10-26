import debounce from 'lodash.debounce';

let circlesPerTitle = 2;
let titleStart = 2;

function tempCircle(s, x, y, p){
  var el = document.createElement('div');
  el.innerHTML =  `<div class="js-circle br-100 bg-white-10 absolute"
                        style="width:${(s - p)}px;
                               height:${(s - p)}px;
                               left:${x}px;
                               margin:0 0 ${p}px ${p}px;
                               top:${y}px;"></div>`;
  return el;
}

function isNotTitleRow(i){
  return (i < titleStart || i >= (titleStart + circlesPerTitle));
}

function renderCircles(size){
  let rows = 6;
  let margin = 15;
  let sectionEl = document.querySelector('.js-container');
  let titleEl = document.querySelector('.js-title');
  let titleOffset = 3 * (titleEl.offsetWidth / 7);
  let perRow = Math.floor((sectionEl.offsetWidth - titleOffset) / size);

  for(let i=0; i<rows; i++){
    for(let j=1; j<=perRow; j++){
      // Don't draw circles over the heading.
      if(isNotTitleRow(i) ||
         (!isNotTitleRow(i) && ((j * size) < (sectionEl.offsetWidth - titleEl.offsetWidth)))) {
        sectionEl.appendChild(tempCircle(size, sectionEl.offsetWidth - (j * size), i * size, margin));
      }
    }
  }
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

  linkWrapEl.style.display = 'block';
}

function getCircleSize(){
  return Math.floor((document.querySelector('.js-title').offsetHeight / circlesPerTitle) + 10);
}

function showFooter(){
  document.querySelector('footer').style.display = 'block';
}

function setAndShowTitle(circleSize){
  let titleEl = document.querySelector('.js-title');
  titleEl.style.marginTop = `${(circleSize * titleStart)}px`;
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
