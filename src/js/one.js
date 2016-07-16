function isVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function animate (elm, animationClass){
    if(isVisible(elm)){
        elm.classList.add(animationClass);
    }
}

function opacifyLine (elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    if(viewHeight/rect.top > 5){
        var opacity = -1/95*viewHeight/rect.top + 20/19;
        elm.style.color = 'rgba(0,0,0,' + opacity + ')';
    } else { 
        if(viewHeight/rect.top < 0){
            elm.style.color = 'rgba(0,0,0,0)';
        } else {
            elm.style.color = 'rgb(0,0,0)';
        }   
    }
}

function changeColor (elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    console.log(viewHeight/rect.top)
    if(viewHeight/rect.top > -2 && viewHeight/rect.top <0){
        var opacity = -viewHeight/rect.top-1;
        elm.style.backgroundColor = 'rgba(65,182,225, ' + opacity + ')';
    } else {
        elm.style.backgroundColor = 'rgb(65,182,225)';
    }
}

    

window.onload = function(){
    var firstSectionHeader = document.querySelector('.first-section__header'),
        secondSection = document.querySelector('.second-section'),
        secondSectionText = document.querySelector('.second-section__text'),
        secondSectionTextLines = document.querySelectorAll('.second-section__text-line'),
        secondSectionImg = document.querySelector('.second-section__image'),
        thirdSectionHeader = document.querySelector('.third-section__header'),
        footer = document.querySelector('.foot'),
        footerText = footer.children[0];

        if(isVisible(firstSectionHeader)){
            firstSectionHeader.classList.add('animate-fadeInUp');
        }

    document.addEventListener('scroll', function(ev){
        changeColor(secondSection);
        animate(secondSectionText, 'animate-fadeInUp');
        Array.prototype.forEach.call(secondSectionTextLines, opacifyLine);
        animate(secondSectionImg, 'animate-fadeInUp');
        animate(thirdSectionHeader, 'animate-fadeInUp');
        animate(footerText, 'animate-fadeIn');
    });
};



