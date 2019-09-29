/* global $, alert, console, document*/


let mySpinner = $(".spinner");


$(mySpinner).css("display", "block").delay(2500).fadeOut(500, function () {
    
    $(this).css("display", "none").remove();
    $("body").css("overflow", "visible");
    
});

$(function () {
    "use strict";
    
    // Global Variables 
    
    let myHeader = $("header");
    let allA = $("body li a");
    let navItems = $("header nav.navbar ul.navbar-nav li");
    let mixingButtons = $(".projects .buttons button");
    let headerHeight = $("header").height(); 
    let readMoreButton = $("header div.overlay > button");
    let scrollToTopButton = $(".topbutton");
    
    
    // Appear scroltotopbutton on scroll 
    function toTopButton() {
        if ($(window).scrollTop() >= 600) {
            $(scrollToTopButton).fadeIn(500, function () {
                $(this).css("display", "block"); 
            });
        } else {
            
            $(scrollToTopButton).fadeOut(500, function () {
                
                $(this).css("display", "none");
                
            });   
        }
    }
    
    $(scrollToTopButton).click(function () {
        
        $("body, html").animate({
            
            scrollTop: 0
            
        }, 500);
    });
    
    
    
    
    // fire mixitup
    let mixer = mixitup(".mix_container");
    
    
    // fire WOW.js
    let wow = new WOW();
    
    wow.init();
    
    // prevent default of a
    $(allA).click(function (e) {
        e.preventDefault();
    });
    
    
    // fire niceScroll.js
    $("html, body").niceScroll({
        cursorcolor: "#0fff59",
        cursorwidth: "10px",
        cursorborder: "1px solid #0fff59",
        cursorborderradius: "2px"
    });
    
    
    
    
    

    // assign header heigth to page height
    myHeader.css("height", $(window).height());
    

    // nav between navbar items
    
    $(navItems).on("click", function () {
        
        $(this).addClass("active").siblings().removeClass("active");
        
        $("body, html").animate({
            scrollTop: $($(this).data("target")).offset().top - $(this).parents("nav.navbar").outerHeight()
        }, 500);
    
    });
    
    
    // change nav color
    function changeNavBarBGColor () {
        
        let activeLi = $("header nav.bg-dark.navbar.navbar-dark .navbar-nav li.active");
        
        if ($(window).scrollTop() >= 90) {
            
            $(navItems).find("a.nav-link").css({color: "#FFF"})
                .end().parents("nav.navbar")
                .removeClass("sticky-top").addClass("fixed-top")
                .css({backgroundColor: "#2a2c40"});
            
        } else {
            
            $(activeLi).css({borderBottomColor: "#0fff59"})
                .end().children(".nav-link").css({color: "#0fff59"});
            
            
            $(navItems).find("a.nav-link").css({color: "#ddd"})
                .end().parents("nav.navbar")
                .removeClass("fixed-top").addClass("sticky-top")
                .css({backgroundColor: "transparent"});
      
        }  
    }
    
    changeNavBarBGColor();
    
    function syncNavItems() {

        $(navItems).each(function () {

            if (
        $(window).scrollTop() > ($($(this).data("target")).offset().top) - $("nav.navbar").outerHeight() - 5) {

                $(this).siblings().removeClass("active").end().addClass("active");

            }
        });
    }
    
    syncNavItems();
    
    // when window scroll
    $(window).scroll(function () {
        changeNavBarBGColor();
        syncNavItems();
        toTopButton();
        
    });
    
    
    // Assign read more button top margin to header height percent
    function reMoBu() {
        
        if ( $(window).outerWidth() <= 767.98 ) {
        
            $(readMoreButton).css( "display", "none" );
        
        } else {
            
            $(readMoreButton).css( "display", "block" );
            $(readMoreButton).css( "margin-top", ( headerHeight * 25 / 100 ) );
            
        }
        
    };
    
    reMoBu();
    
    $(window).resize(function () {
        
        reMoBu();
        
    });
    
    // Call slider Plugin 
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        center: true,
        nav: true,
        navSpeed: 1000,
        dots: false
    });
    
    
    // testimonials slider
    (function slider() {
        
        let activeClient = $(".testim .client.active");
        let firstActive = $("div.client:first-of-type");
        
        
        if (!$(activeClient).is(":last-of-type")) {
            
                $(activeClient).delay(2000).fadeOut(500, function () {
                    
                    $(this).removeClass("active").next(".client").addClass("active").fadeIn(500);
                    slider();
                    
            });
            
        } else {
            
            $(activeClient).delay(2000).fadeOut(500, function () {
                
                $(this).removeClass("active");
                $(firstActive).addClass("active").fadeIn(500);
                slider();
                
            });
        }
        
    }());
    
    

    // nav between Projects mixitup buttons
    $(mixingButtons).on("click", function () {
        
        $(this).addClass("active").siblings().removeClass("active");
        
    });
    
    
    
    // remove all animations from all elements @ small screens
    function ReAllAnimations() {

        if ( $(window).outerWidth() < 767.98 ) {

            $("link[href='css/animate/animate.min.css'], script[src='js/wow/dist/wow.js']").detach();

        }
    }

   ReAllAnimations();
    
});