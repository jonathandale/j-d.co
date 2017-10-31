import _ from 'lodash';
import anime from 'animejs';

let baseCirclesPerTitle = 2;
let titleStart = 2;
let circleMargin = 20;
let circleMax = 40;
let aboutOpen = false;

function makeCircle(s, x, y, p, i){
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
  return (i < titleStart || i >= (titleStart + getCirclesPerTitle()));
}

function generateIds(total){
  let times = Math.ceil(total / circleMax);
  let rem = total % circleMax;
  return _.shuffle(_.flatten(_.concat(_.range(0, rem),
                                      _.times(times, _.constant(_.range(1, circleMax))))));
}

function renderCircles(){
  let size = getCircleSize();
  let rows = 4 + getCirclesPerTitle();
  let sectionEl = document.querySelector('.js-container');
  let titleEl = document.querySelector('.js-title');
  let titleOffset = 2 * (titleEl.offsetWidth / 5);
  let perRow = Math.floor((sectionEl.offsetWidth - titleOffset) / size);
  let ids = generateIds(rows * perRow);

  for(let i=0; i<rows; i++){
    for(let j=1; j<=perRow; j++){
      // Don't draw circles over the heading.
      if(isNotTitleRow(i) ||
         (!isNotTitleRow(i) && ((j * size) < (sectionEl.offsetWidth - titleEl.offsetWidth)))) {
        sectionEl.appendChild(
          makeCircle(size,
                     sectionEl.offsetWidth - (j * size),
                     i * size,
                     circleMargin,
                     ids[(i * perRow + j)-1])
        );
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

function animateAboutIn(aboutEl){
  aboutEl.style.opacity = 0;
  aboutEl.style.display = 'block';
  aboutEl.style.right = '-2rem';
  anime({
    targets: aboutEl,
    opacity: 1,
    right: 0,
    loop: false,
    duration: 200,
    easing: 'easeInOutSine'
  });
}

function animateAboutOut(aboutEl){
  anime({
    targets: aboutEl,
    opacity: 0,
    right: '-2rem',
    loop: false,
    duration: 200,
    easing: 'easeInOutSine',
    complete: function(){
      aboutEl.style.display = 'none';
      aboutEl.style.opacity = 1;
      aboutEl.style.right = 0;
    }
  });
}

function handleAboutClick(){
  let aboutEl = document.querySelector('.js-about');
  let aboutLinkEl = document.querySelector('.js-about-link');
  aboutLinkEl.addEventListener('click', function(evt) {
    evt.preventDefault();
    aboutOpen = true;
    animateAboutIn(aboutEl);
  });
  let closeLinkEl = document.querySelector('.js-close-link');
  closeLinkEl.addEventListener('click', function(evt) {
    evt.preventDefault();
    aboutOpen = false;
    animateAboutOut(aboutEl);
  });
}

function getCirclesPerTitle(){
  let num;
  let height = document.querySelector('.js-title').offsetHeight;
  switch(true){
    case (height >= 300):
      num = baseCirclesPerTitle * 2;
      break;
    default:
      num = baseCirclesPerTitle;
  }
  return num;
}

function getCircleSize(){
  return Math.floor(document.querySelector('.js-title').offsetHeight / getCirclesPerTitle());
}

function setAndShowTitle(){
  anime({
    targets: document.querySelector('.js-title'),
    opacity: 1,
    marginTop: `${(getCircleSize() * titleStart) - (circleMargin / 2)}px`,
    loop: false,
    duration: 500,
    easing: 'easeInOutSine'
  });
}

function handleResize(){
  let pageWidth = window.outerWidth;
  let resize = _.debounce(function(){
    if(window.outerWidth !== pageWidth) {
      pageWidth = window.outerWidth;
      Array.prototype.forEach.call(document.querySelectorAll('.js-circle'), function(el){
        el.parentNode.removeChild(el);
      });
      renderCircles(getCircleSize());
      setAndShowTitle();
    }
  }, 400);

  window.addEventListener('resize', resize);
}

function addSha(){
  let footerEl = document.querySelector('footer');
  let el = document.createElement('div');
  el.innerHTML = `<a class="f7 white-20 link" href="https://github.com/jonathandale/j-d.co/commit/<@GIT_SHA@>"><@GIT_SHA@></a>`;
  footerEl.appendChild(el);
}

function handleKeyEvents(){
  window.addEventListener('keydown', function(evt){
    if(evt.which === 27 && aboutOpen){
      animateAboutOut(document.querySelector('.js-about'));
    }
  });
}

function init(){
  renderCircles();
  setAndShowTitle()
  setupLinks();
  handleAboutClick();
  handleResize();
  addSha();
  handleKeyEvents();
}

export default init

init();
