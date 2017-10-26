import anime from 'animejs';

function animateLinkHover() {
  var linkEls = document.querySelectorAll('.js-dot');
  var dotWidth = linkEls[0].querySelector('.dot').offsetWidth;
  Array.prototype.forEach.call(linkEls, function(el, i){
    el.addEventListener('mouseenter', function(evt){
      evt.target.querySelector('.dot').style.width = (evt.target.offsetWidth + 30) + 'px';
    });
    el.addEventListener('mouseleave', function(evt){
      evt.target.querySelector('.dot').style.width = dotWidth + 'px';
    });
  });
}

function init() {
  animateLinkHover();
}

export default init

init();
