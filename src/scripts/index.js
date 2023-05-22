import ('slick-carousel/slick/slick.scss');
import ('slick-carousel/slick/slick-theme.scss');

import '../styles/index.scss';
import 'slick-carousel';

import $ from 'jquery';

$(document).ready(()=> {
  $(".cs-menu-container").on("click","a", (event) => {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;

    $('body,html').animate({scrollTop: top - 65}, 800);
  });

  $('.reviews-slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    dots: true,
    variableWidth: true,
    prevArrow: '<div class="btn-slider btn-prev"><i class="icon-arrow-left"></i></div>',
    nextArrow: '<div class="btn-slider btn-next"><i class="icon-arrow-right"></i></div>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  if ($(window).width() <= 1090) {
    $('.cs-menu-container .cs-menu-item').appendTo('.mobile-menu');
  } else {
    $('.mobile-menu .cs-menu-item').appendTo('.cs-menu-container');
  }

  $('.menu-button').on('click', ()=> {
    $('.burger, .mobile-menu, .cs-header').toggleClass('open');
    $('body,html').toggleClass('overflow');
  });

});
$(window).resize(function() {
  if ($(window).width() <= 1090) {
    $('.cs-menu-container .cs-menu-item').appendTo('.mobile-menu');
  } else {
    $('.mobile-menu .cs-menu-item').appendTo('.cs-menu-container');
  }
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

