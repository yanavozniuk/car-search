import "@fancyapps/fancybox/dist/jquery.fancybox.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/index.scss";

import $ from "jquery";
import "slick-carousel";
import "jquery-validation";
import "@fancyapps/fancybox";
import "inputmask/dist/jquery.inputmask";

$(document).ready(() => {
  $.validator.addMethod("lettersOnly", function(value, element) {
    return this.optional(element) || /^['a-zA-Zа-яА-Я\s']+$/i.test(value);
  }, "Ви вказали не вірне ім'я"); 

  $(".contact-form").each(function () {
    var th = $(this);
  
    th.validate({
      rules: {
        name: {
          required: true,
          lettersOnly: true,
        },
        phone: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Ввeдіть, будь ласка, ім'я",
          lettersonly: "Ви вказали не вірне ім'я"
        },
        phone: {
          required: "Ви не вказали номер телефонy",
        },
      },
      errorPlacement: (error, element) => {
        error.appendTo(element.parent("div"));
      },
      submitHandler: (form, event) => {
        var thisForm = $(form);
        event.preventDefault();
  
        $.ajax({
          type: "POST",
          url: thisForm.attr("action"),
          data: thisForm.serialize(),
          body: thisForm.serialize(),
          contentType: "application/json; charset=utf-8",
          dataType: 'json',
          success: () =>{
            $.fancybox.close([
              {
                src: "#request-form",
              },
            ]);
            
            $.fancybox.open([
              {
                src: "#thanks",
              },
            ]);
            setTimeout(function () {
              $.fancybox.close();
            }, 5000);
            th.trigger("reset");
          },
          error: (error) => {
            console.info('error data', {...error});
          }
        });
        return false;
      },
  
      success: () => {},
      highlight: (element) => {
        $(element).addClass("error");
      },
      unhighlight: (element) => {
        $(element).removeClass("error");
      },
    });
  });

  var container = $(".purchase-process-car__tiles");
  const lastTile = $(
    ".purchase-process-car__tiles .purchase-process-car__tile:last-child"
  );
  const tileCircles = $(".purchase-process-car__tile-circle");

  const onScroll = () => {
    let lineHeight = 0;
    let maxHeight = 0;
    const height = container.height();
    const { top } = container[0].getBoundingClientRect();

    const lastTileHeight = lastTile.height();
    if ($(window).height() - (top + $(window).height() / 2) > 0) {
      lineHeight = $(window).height() - (top + $(window).height() / 2);
      maxHeight = height - lastTileHeight - 1.5 * $(tileCircles[0]).height() + 60;
    } else
      lineHeight = 0;
      tileCircles.each(function () {
        this.getBoundingClientRect().top < $(window).height() / 2 + 40
          ? $(this.nextElementSibling).addClass("animate")
          : $(this.nextElementSibling).removeClass("animate");
      });
    $(".line").css({ height: lineHeight, maxHeight: maxHeight });
  };

  // touchmove
  $(".steps-of-work").on("scroll", onScroll);
  $(".steps-of-work").on("touchmove", onScroll);

  // $("a.top-anchor").on("click", function (e) {
  //   e.preventDefault();
  //   $("body, html").scrollTop(0);
  // });
  // if($(window).width() >= 1090) {
    $("a.menu-link").on("click", function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        var top = $(hash).offset().top;

        window.location.hash = hash;

        const test = $(window).width() <= 1090 ? 90 : 120;

        $("html, body").animate(
          {
            scrollTop: top - test,
          },
          500
        );
      }
    });
  // }

  $(".reviews-slider").slick({
    centerMode: true,
    centerPadding: "80px",
    slidesToShow: 3,
    dots: true,
    variableWidth: true,
    infinite: true,
    autoplay: false,
    prevArrow:
      '<div class="btn-slider btn-prev"><i class="icon-arrow-left"></i></div>',
    nextArrow:
      '<div class="btn-slider btn-next"><i class="icon-arrow-right"></i></div>',
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          arrows: false
        },
      },
      {
        breakpoint: 1090,
        settings: {
          arrows: false,
          centerMode: false,
          variableWidth: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          centerMode: false,
          variableWidth: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          variableWidth: false,
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".instafeed.instafeed-line-one").slick({
    centerMode: true,
    centerPadding: "100px",
    slidesToShow: 4,
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerMode: false,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          slidesToShow: 2,
        },
      },
    ]
  });
  $(".instafeed.instafeed-line-two").slick({
    slidesToShow: 5,
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 800,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerMode: true,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "80px",
        },
      },
    ]
  });

  if ($(window).width() <= 1090) {
    $(".cs-menu-container .cs-menu-item").appendTo(".mobile-menu");
  } else {
    $(".mobile-menu .cs-menu-item").appendTo(".cs-menu-container");
  }

  $(".menu-button").on("click", () => {
    $("body,html").addClass("overflow");
    $(".burger, .mobile-menu, .cs-header").toggleClass("open");
    $("a.menu-link").on("click", () => {
      $(".burger, .mobile-menu, .cs-header").removeClass("open");
      $("body,html").removeClass("overflow");
    });
    
  });

  $(".methods").slick({
    slidesToShow: 5,
    dots: false,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      }
    ],
  });

  $("input[name='phone']").inputmask({ mask: "(099)-999-99-99" });
});

$(window).resize(function () {

  if ($(window).width() <= 1090) {
    $(".cs-menu-container .cs-menu-item").appendTo(".mobile-menu");
  } else {
    $(".mobile-menu .cs-menu-item").appendTo(".cs-menu-container");
  }

});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 124) {
    $(".cs-header").addClass("fixed");
  } else {
    $(".cs-header").removeClass("fixed");
  }
});


