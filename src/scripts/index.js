import "@fancyapps/fancybox/dist/jquery.fancybox.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/index.scss";

import $ from "jquery";
import "slick-carousel";
import "jquery-validation";
import "@fancyapps/fancybox";
import "inputmask/dist/jquery.inputmask";

// $(".steps-of-work").scroll(() => {
//   const e = $(".purchase-process-car__tiles");
//   const t = $(".purchase-process-car__tiles li:last-child");
//   const n = $(".purchase-process-car__tile-circle");
//   const r = e.offset();
//   const i = r.top;
//   const o = r.height;
//   const a = t.offsetHeight;
//   console.info("s, l", e, t);
//   $(".line").css({ height: "2px", maxHeight: "100%" });
//   if ($(window).innerHeight() - (i + $(window).innerHeight() / 2) > 0) {
//     const s = $(window).innerHeight() - (i + $(window).innerHeight() / 2);
//     const l = o - a - 1.5 * n[0].offset().height;

//     this.lineHeight = "".concat(s, "px");
//     this.maxHeight = "".concat(l, "px");
//   } else {
//     this.lineHeight = 0;
//     n.forEach(function (e) {
//       e.offset().top < $(window).innerHeight() / 2 + 40
//         ? e.nextElementSibling.classList.add("animate")
//         : e.nextElementSibling.classList.remove("animate");
//     });
//   }
// });


$(document).ready(() => {
  $('a.top-anchor').on('click', function(e) {
    e.preventDefault();
    $('body, html').scrollTop(0);
  });

  $("a.menu-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      var top = $(hash).offset().top;

      window.location.hash = hash;

      $("html, body").animate({
        scrollTop: top - 120,
      }, 500);
    }
  });

  $(".reviews-slider").slick({
    centerMode: true,
    centerPadding: "80px",
    slidesToShow: 3,
    dots: true,
    variableWidth: true,
    infinite: true,
    // autoplay: true,
    prevArrow:
      '<div class="btn-slider btn-prev"><i class="icon-arrow-left"></i></div>',
    nextArrow:
      '<div class="btn-slider btn-next"><i class="icon-arrow-right"></i></div>',
    responsive: [
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
      }
    ],
  });

  if ($(window).width() <= 1090) {
    $(".cs-menu-container .cs-menu-item").appendTo(".mobile-menu");
  } else {
    $(".mobile-menu .cs-menu-item").appendTo(".cs-menu-container");
  }

  $(".menu-button").on("click", () => {
    $(".burger, .mobile-menu, .cs-header").toggleClass("open");
    $("a.menu-link").on("click", () =>{
      $(".burger, .mobile-menu, .cs-header").removeClass("open");
    });
    $("body,html").toggleClass("overflow");
  });

  if ($(window).width() <= 1090) {
    $(".methods").slick({
      slidesToShow: 3,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 680,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  $("input[name='phone']").inputmask({"mask": "(099)-999-99-99"});
});

$(window).resize(function () {
  if ($(window).width() <= 1090) {
    $(".cs-menu-container .cs-menu-item").appendTo(".mobile-menu");
  } else {
    $(".mobile-menu .cs-menu-item").appendTo(".cs-menu-container");
  }
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 124) {
      $('.cs-header').addClass('fixed');
  } else {
      $('.cs-header').removeClass('fixed');
  }
});

$(".contact-form").each(function () {
  var th = $(this);

  th.validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Ввeдіть, будь ласка, ім'я"
      },
      phone: {
        required: "Ви не вказали номер телефонy"
      }
    },
    errorPlacement: (error, element) => {
      error.appendTo(element.parent('div'));
    },
    submitHandler: (form) => {
      var thisForm = $(form);

      $.ajax({
        type: "POST",
        url: thisForm.attr("action"),
        data: thisForm.serialize(),
      }).done(function () {
        $.fancybox.open([
          {
            src: "#thanks",
          },
        ]);

        setTimeout(function () {
          $.fancybox.close();
        }, 3000);

        th.trigger("reset");
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
