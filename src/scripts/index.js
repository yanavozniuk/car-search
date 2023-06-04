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
  var container = $(".purchase-process-car__tiles");
  const lastTile = $(
    ".purchase-process-car__tiles .purchase-process-car__tile:last-child"
  );
  const tileCircles = $(".purchase-process-car__tile-circle");

  $(".steps-of-work").on("mousewheel", () => {
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
  });

  $("a.top-anchor").on("click", function (e) {
    e.preventDefault();
    $("body, html").scrollTop(0);
  });

  $("a.menu-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      var top = $(hash).offset().top;

      window.location.hash = hash;

      $("html, body").animate(
        {
          scrollTop: top - 120,
        },
        500
      );
    }
  });

  $(".reviews-slider").slick({
    centerMode: true,
    centerPadding: "80px",
    slidesToShow: 3,
    dots: true,
    variableWidth: true,
    infinite: true,
    autoplay: true,
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
      },
    ],
  });

  if ($(window).width() <= 1090) {
    $(".cs-menu-container .cs-menu-item").appendTo(".mobile-menu");
  } else {
    $(".mobile-menu .cs-menu-item").appendTo(".cs-menu-container");
  }

  $(".menu-button").on("click", () => {
    $(".burger, .mobile-menu, .cs-header").toggleClass("open");
    $("a.menu-link").on("click", () => {
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

$(".contact-form").each(function () {
  var th = $(this);

  th.validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Ввeдіть, будь ласка, ім'я",
      },
      phone: {
        required: "Ви не вказали номер телефонy",
      },
    },
    errorPlacement: (error, element) => {
      error.appendTo(element.parent("div"));
    },
    submitHandler: (form) => {
      var thisForm = $(form);

      $.ajax({
        type: "POST",
        url: thisForm.attr("action"),
        data: thisForm.serialize(),
        headers: {
          'Content-Type':'application/json; odata=verbose'
        }
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
