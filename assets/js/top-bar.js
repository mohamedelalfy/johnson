const navSlide = () => {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".nav-items");
    const navItems = document.querySelectorAll(".nav-items li");
  
    menu.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
  
      // apply the animation but make sure the
      // positioning doesnt change when viewport changes
      if (nav.classList.contains("nav-active")) {
        nav.style.animation = `navSlide 0.5s forwards`;
      } else {
        nav.style.animation = `navSlideOut 0.5s`;
      }
  
      // get the index of the links array
      // to space out the timing
      navItems.forEach((item, index) => {
        if (item.style.animation) {
          item.style.animation = ``;
        } else {
          item.style.animation = `navFade 0.5s ${index / 5 + 0.5}s ease forwards`;
        }
      });
  
      // menu animation
      menu.classList.toggle("toggle");
    });
    $(".component--top-bar .nav-items li a").click(function() {
       $('li a', $(this).parents('.nav-items')).removeClass('active');
       $(this).addClass("active");
    })
    
  };
  
  navSlide();

// Smooth scrool
if(window.location.hash) {
  var hash = window.location.hash;

  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 50, 'swing');
}
$(function () {
  'use strict';

  $(".nav-items li a").click(function () {
  $("html, body").animate({
    scrollTop : $("#" + $(this).data("vale")).offset().top
  }, 1000);
});
  

});
