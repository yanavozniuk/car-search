import "@fancyapps/fancybox/dist/jquery.fancybox.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/index.scss";

import $ from "jquery";
import "slick-carousel";
import "jquery-validation";
import "@fancyapps/fancybox";

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
  $("a").on("click", function (event) {
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: false,
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

  $.validator.addMethod(
    "phoneMatch",
    function (phone_number, element) {
      phone_number = phone_number.replace(/\s+/g, "");
      return (
        this.optional(element) ||
        (phone_number.length > 9 &&
          phone_number.match(
            /^(\+?3-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/
          ))
      );
    },
    "Будь ласка, введіть вірний номер"
  );
});

$(window).resize(function () {
  if ($(window).width() <= 1090) {
    $(".cs-menu-container .cs-menu-item").appendTo(".mobile-menu");
  } else {
    $(".mobile-menu .cs-menu-item").appendTo(".cs-menu-container");
  }
});

$(".contact-form").each(function () {
  //Change
  var th = $(this);

  th.validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
        phoneMatch: true,
      },
    },
    messages: {
      name: {
        required: "Ввудіть, будь ласка, ім/'я",
        minlength: "Мінімальна кількість символів 2",
      },
    },
    errorPlacement: (error, element) => {
      console.info("errorPlacement", error.messages);
      console.info("element", element);
    },
    submitHandler: function (form) {
      var thisForm = $(form);
      console.log(thisForm.serialize());

      $.ajax({
        type: "POST",
        url: th.attr("action"),
        data: th.serialize(),
      }).done(function () {
        // Done Functions
        // $.fancybox.close();
        // $.fancybox.open([
        //   {
        //     src: "#thanks",
        //   },
        // ]);

        // setTimeout(function () {
        //   //submitForm = false
        //   $.fancybox.close();
        // }, 3000);

        th.trigger("reset");
        th.find(".btn_st").addClass("not_active");
      });
      return false;
    },

    success: () => {},
    highlight: (element, errorClass) => {
      console.info("highlight", errorClass);
      $(element).addClass("error");
    },
    unhighlight: (element, errorClass, validClass) => {
      console.info("unhighlight", errorClass, validClass);
      $(element).removeClass("error");
    },
  });
});
