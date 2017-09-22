$(document).ready(function() {
  var idx = 0;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //add tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // invoke the carousel
  $('#myCarousel').carousel({
    interval: false,
    wrap: false
  });

  $('#myCarousel').on('slide.bs.carousel', async function(evt) {
    var element = $(evt.relatedTarget);
    idx = element.index();
    // console.log(element.index());
    if (idx === 1) {
      await sleep(200);
      $("#img-android-gif,#north60-logo").animateCssShow('fadeIn');
    }
    else {
      await sleep(500);
      $("#img-android-gif,#north60-logo").addClass('hide');
    }
    // techAnimation(element.find('.content .tooltip-container'));
    // checkLocation(element.index());
  });

  async function bindWheel(evt) {
    console.log(evt);
    if (evt.originalEvent.deltaY < 0) {
      $("#myCarousel").carousel('prev');
      $("#myCarousel").unbind('mousewheel DOMMouseScroll');
      await sleep(1500);
      $('#myCarousel').bind('mousewheel DOMMouseScroll', function(event) {
        bindWheel(event);
      });
    } else {
      $("#myCarousel").carousel('next');
      $("#myCarousel").unbind('mousewheel DOMMouseScroll');
      await sleep(1500);
      $('#myCarousel').bind('mousewheel DOMMouseScroll', function(event) {
        bindWheel(event);
      });
    }
  }

  // scroll slides on mouse scroll
  $('#myCarousel').bind('mousewheel DOMMouseScroll', function(event) {
    bindWheel(event);
  });

  //scroll slides on swipe for touch enabled devices

  $("#myCarousel").on("touchstart", function(event) {

    var yClick = event.originalEvent.touches[0].pageY;
    $(this).one("touchmove", function(event) {

      var yMove = event.originalEvent.touches[0].pageY;
      if (Math.floor(yClick - yMove) > 1) {
        $(".carousel").carousel('next');
      } else if (Math.floor(yClick - yMove) < -1) {
        $(".carousel").carousel('prev');
      }
    });
    $(".carousel").on("touchend", function() {
      $(this).off("touchmove");
    });
  });

  //image slider gallery
  $(function() {
    var btn = $(".slider__btn");

    btn.on("click", function() {
      $(".slider__item").first().clone().appendTo(".slider");
      $(".slider__image").first().css({
        transform: "rotateX(-180deg)",
        opacity: 0
      });
      setTimeout(function() {
        $(".slider__item").first().remove();
      }, 200);
    });
  });

  $.fn.extend({
    animateCss: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  $.fn.extend({
    animateCssHide: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).addClass('hide');
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

  $.fn.extend({
    animateCssShow: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).removeClass('hide');
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });

});
