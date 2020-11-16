/*================================
            Preloader
=================================*/
$(window).on('load', function () { //makes sure that the site is loaded
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    
    $("#select-branch")[0].addEventListener("click", () => {
        var branch = $("#branch-search option:selected")[0];
        console.log(branch.textContent);
        window.location.href = "./menu.html";
    });

    $("#branch-search").change(() => {
        var branchIdx = $("#branch-search option:selected")[0].value;
        map.panTo(branchList[branchIdx].location);
        map.setZoom(15);
    });
    
    showUser();
});

// -------- User Account -----------

function showUser() {
    let user = localStorage.getItem("username");
    if (user) {
        $(".account").toggleClass("hidden");
        $("p.account").text("Hello " + user);
    } 
}

/*================================
            Topics
=================================*/
$(function () {
    $("#team-topics").owlCarousel({
        items: 2,
        autoplay: true,
        smartSpeed: 200,
        loop: true,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        center: true,
        navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 2
            },
            // breakpoint from 480 up
            480: {
                items: 2
            },

            // breakpoint from 1000 up
            1000: {
                items: 3
            },
            // breakpoint from 1200 up
            1200: {
                items: 4
            }

        }
    });
});

/*================================
            Topics
=================================*/
$(function () {
    $("#team-promotions").owlCarousel({
        items: 2,
        autoplay: true,
        smartSpeed: 200,
        loop: true,
        autoplayHoverPause: true,
        nav: false,
        dots: true,
        center: true,
        //        navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 2
            },
            // breakpoint from 480 up
            480: {
                items: 2
            },

            // breakpoint from 1000 up
            1000: {
                items: 3
            },
            // breakpoint from 1200 up
            1200: {
                items: 4
            }

        }
    });
});


/*================================
            Topics
=================================*/
$(function () {
    $("#content-banner-main").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 200,
        loop: true,
        autoplayHoverPause: true,
        nav: false,
        dots: true,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1
            },
            // breakpoint from 480 up
            480: {
                items: 1
            },

            // breakpoint from 1000 up
            1000: {
                items: 1
            },
            // breakpoint from 1200 up
            1200: {
                items: 1
            }

        }
    });
});


/*===================================
            Responsive Tabs
====================================*/
$(function () {
    $("#services-tabs").responsiveTabs({
        animation: 'slide'
    });
});


// Smooth Scrolling
$(function () {

    $("a.smooth-scroll").click(function (event) {

        event.preventDefault();

        //get section id like #about, #services, #work, #team, and etc.
        var section_id = $(this).attr("href");

        $("html, body").animate({

            scrollTop: $(section_id).offset().top - 64

        }, 1250, "easeInOutExpo");


    });
});


/*======================================
            Mobile Menu
=======================================*/

$(function () {

    // show mobile nav
    $("#mobile-nav-open-btn").click(function () {
        //alert("Clicked open button");
        $("#mobile-nav").css("height", "100%");
    });

    // hide mobile nav
    $("#mobile-nav-close-btn, #mobile-nav a").click(function () {
        //alert("Clicked close button");
        $("#mobile-nav").css("height", "0%");
    });

});



/*======================================
            Animation
=======================================*/

// animate on scroll
$(function () {
    new WOW().init();
});


//home animation on page load
$(window).on('load', function () {

    $("#home-heading-1").addClass("animated fadeInDown")
    $("#home-heading-2").addClass("animated fadeInLeft")
    $("#home-text").addClass("animated zoomIn")
    $("#home-btn").addClass("animated zoomIn")
    $("#arrow-down").addClass("animated fadeInDown infinite")
});



/*-------------------
	Quantity change
--------------------- */
var proQty = $('.pro-qty');
proQty.prepend('<span class="dec qtybtn">-</span>');
proQty.append('<span class="inc qtybtn">+</span>');
proQty.on('click', '.qtybtn', function () {
    var $button = $(this);
    var oldValue = $button.parent().find('input').val();
    if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
        }
    }
    $button.parent().find('input').val(newVal);
});



/*---------------------------------
    Product Details Pic Slider
----------------------------------*/
$(".product__details__pic__slider").owlCarousel({
    loop: true,
    margin: 20,
    items: 4,
    dots: true,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true
});


/*------------------
    Background Set
--------------------*/
$('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
});

//Humberger Menu
$(".humberger__open").on('click', function () {
    $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
    $(".humberger__menu__overlay").addClass("active");
    $("body").addClass("over_hid");
});

$(".humberger__menu__overlay").on('click', function () {
    $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
    $(".humberger__menu__overlay").removeClass("active");
    $("body").removeClass("over_hid");
});

/*======================================
            Google Map
=======================================*/

let map;
var infowindow;
var branchList = [
  {name: "branch1", location: {lat: 13.703344, lng: 100.523706}},
  {name: "branch2", location: {lat: 13.711203, lng: 100.530572}},
  {name: "branch3", location: {lat: 13.719542, lng: 100.535379}}
];

function initMap() {
  var bangkok = new google.maps.LatLng(13.7563, 100.5018);

  map = new google.maps.Map(document.getElementById("map"), {
    center: branchList[0].location,
    zoom: 12
  });

  /* find place from query */
  // var request = {
  //   query: 'Family Mart',
  //   fields: ['name', 'geometry'],
  // };

  /* nearby search */
  // var request = {
  //   location: bangkok,
  //   radius: '5000',
  //   // type: ['restaurant']
  //   name: "ไก่ย่างห้าดาว"
  // };
  //
  // var service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, function(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //     map.setCenter(results[0].geometry.location);
  //   }
  // });

  for (let i = 0; i < branchList.length; i++) {
    createCustomMarker(branchList[i], i);
  }

  infowindow = new google.maps.InfoWindow({});
}

function createCustomMarker(branch, branchIdx) {
  const marker = new google.maps.Marker({
    map,
    position: branch.location,
  });

  google.maps.event.addListener(marker, "mouseover", () => {
    // console.log(place);
    infowindow.setContent("<div>" +
        branch.name +
        "</div>"
    );
    infowindow.open(map, marker);
  });

  google.maps.event.addListener(marker, "mouseout", () => {
    infowindow.close();
  });

  google.maps.event.addListener(marker, "click", () => {
    map.panTo(branch.location);

    // selectBranch(branch.name);
    $('.js-example-basic-single').select2('val', branchIdx.toString());
    // animateMarker(marker);
  });
}

/*======================================
            Dropdown Menu
=======================================*/
// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
    $('.js-example-basic-single').select2({
      allowClear: true,
      width: "resolve",
      placeholder: 'Select branch'
    });
});

/*------------------
   Show map location
--------------------*/
//toggle hide and show
//$(".bsearch").ready(function(){
//  $("button").click(function(){
//    $("p").toggle("slow");
//  });
//});

/*======================================
            Show Map Animate
=======================================*/
//show only
//$(".bsearch").ready(
//    function () {
//        $("button").click(function (e) {
//            e.preventDefault();
//            $("p").show("slow");
//        });
//
//    });

$('.js-example-basic-single').on('select2:select', function (e) {
    var mapView = $("#map-view")[0];
    if (mapView.classList.contains("hidden")){
        mapView.classList.remove("hidden");
//        $("#map-view")[0].scrollIntoView(false);
        window.scrollTo(0, 300);
    }
});


/*Index.html*/
// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
//     container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
//     container.classList.remove("right-panel-active");
// });


//function myFunction {
//  var x = document.getElementById("myDIV");
//  if (x.style.display === "none") {
//    x.style.display = "block";
//  } else {
//    x.style.display = "none";
//  }
//});

//$(".myDIV"().on('click', function () {
//var x = document.getElementById("myDIV");
//if (x.style.display === "none") {
//    x.style.display = "block";
//} else {
//    x.style.display = "none";
//}
//});
//
//$('nav .dropdown').hover(function () {
//    var $this = $(this);
//    // 	 timer;
//    // clearTimeout(timer);
//    $this.addClass('show');
//    $this.find('> a').attr('aria-expanded', true);
//    // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
//    $this.find('.dropdown-menu').addClass('show');
//}, function () {
//    var $this = $(this);
//    // timer;
//    // timer = setTimeout(function(){
//    $this.removeClass('show');
//    $this.find('> a').attr('aria-expanded', false);
//    // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
//    $this.find('.dropdown-menu').removeClass('show');
//    // }, 100);
//});