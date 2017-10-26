import anime from 'animejs';

function animateLinks() {
  var linkEls = document.querySelectorAll('.js-dot');
  var dotWidth = linkEls[0].querySelectorAll('.dot')[0].offsetWidth;
  Array.prototype.forEach.call(linkEls, function(el, i){
    el.addEventListener('mouseenter', function(evt){
      evt.target.querySelectorAll('.dot')[0].style.width = (evt.target.offsetWidth + 30) + 'px';
    });
    el.addEventListener('mouseleave', function(evt){
      evt.target.querySelectorAll('.dot')[0].style.width = dotWidth + 'px';
    });
  });
}

function init(){
  animateLinks();
}

export default init

init();
