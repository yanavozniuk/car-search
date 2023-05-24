import("slick-carousel/slick/slick.scss");
import("slick-carousel/slick/slick-theme.scss");

import "../styles/index.scss";
import "slick-carousel";
import "jquery-validation";

import $ from "jquery";

$(document).ready(() => {
  $('a').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
      var hash = this.hash;
      var top = $(hash).offset().top;

      window.location.hash = hash;

      $('html, body').animate({
        scrollTop: top - 120
      }, 500);
    }
  });

  $(".reviews-slider").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    dots: true,
    variableWidth: true,
    prevArrow:
      '<div class="btn-slider btn-prev"><i class="icon-arrow-left"></i></div>',
    nextArrow:
      '<div class="btn-slider btn-next"><i class="icon-arrow-right"></i></div>',
    responsive: [
      {
        breakpoint: 900,
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
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
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

  $(".reviews-slider").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    dots: true,
    variableWidth: true,
    prevArrow:
      '<div class="btn-slider btn-prev"><i class="icon-arrow-left"></i></div>',
    nextArrow:
      '<div class="btn-slider btn-next"><i class="icon-arrow-right"></i></div>',
    responsive: [
      {
        breakpoint: 900,
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
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  if($(window).width() <= 990) {
    $('.methods').slick({
      slidesToShow: 3,
      dots: true,
      arrows: false,
      centerPadding: "30px",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  $.validator.addMethod("phoneMatch", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 && 
    phone_number.match(/^(\+?3-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Будь ласка, введіть вірний номер");
});
$(window).resize(function () {
  if ($(window).width() <= 1090) {
    $(".cs-menu-container .cs-menu-item").appendTo(".mobile-menu");
  } else {
    $(".mobile-menu .cs-menu-item").appendTo(".cs-menu-container");
  }
  if($(window).width() <= 990) {
    $('.methods').slick({
      slidesToShow: 3,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
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
        phoneMatch: true
      },
    },
    messages: {
      name: {
        required: "Ввудіть, будь ласка, ім/'я",
        minlength: "Мінімальна кількість символів 2"
      },
    },
    errorPlacement: (error, element)=> {
      console.info('errorPlacement', error.messages);
      console.info('element', element);
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
    highlight: (element, errorClass) =>  {
      console.info('highlight', errorClass);
      $(element).addClass("error");
    },
    unhighlight: (element, errorClass, validClass) =>  {
      console.info('unhighlight', errorClass, validClass);
      $(element).removeClass("error");
    },
  });
});

// const token = '74f7998c411a346d6ca53eab4aae5e23';
// const username = 'ya.vozniuk';
// const num_photos = 40;
// $.ajax({
//   url: 'https://api.instagram.com/v1/users/search',
//   dataType: 'jsonp',
//   type: 'GET',
//   data: {access_token: token, q: username},
//   success: (data) => {
//     console.log('data', data);
//     $.ajax({
//       url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent',
//       dataType: 'jsonp',
//       type: 'GET',
//       data: {access_token: token, count: num_photos},
//       success: (data2) => {
//         console.log('data2', data2);
//         for(let x in data2.data){
//           $('.instagram').append('<div><img src="'+data2.data[x].images.thumbnail.url+'"></div>');
//         }
//           },
//       error: (data2) => {
//         console.log('error data2', data2);
//       }
//     });
//   },
//   error: (data) => {
//     console.log(data);
//   }
// });
