;(function ($) {
  'use strict'

  $(window).on('load', function () {
    //===== Prealoder
    $('#preloader').delay(400).fadeOut()
  })

  $(document).ready(function () {
    //05. sticky header
    function sticky_header() {
      if ($(window).scrollTop() > 10) {
        $('header').addClass('sticky');
      } else {
        $('header').removeClass('sticky');
      }
    }
    sticky_header();
    $(window).on('scroll', function() {
        sticky_header();
    });

    // Show or hide the sticky footer button
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 600) {
        $('.back-to-top').fadeIn(200)
      } else {
        $('.back-to-top').fadeOut(200)
      }
    })

    $('.accordion').find('.accordion-toggle').click(function () {
      var isActive = $(this).hasClass('active')
      $('.accordion-toggle').removeClass('active')
      $('.accordion_item').removeClass('active')
      if (!isActive) {
        $(this).toggleClass('active')
        $(this).parent().toggleClass('active')
      }
      $(this).next().slideToggle('fast')
      $('.accordion-content').not($(this).next()).slideUp('fast')
    });

    // nice select
    $('.select').niceSelect();

    var headerHeight = $('header').outerHeight();
    $('.scroll').on('click', function (e) {
      e.preventDefault();

      var target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 600);
      }
    });

    $('.owl-carousel.slider1').owlCarousel({
      loop:true,
      margin:10,
      stagePadding: 1,
      navText:[
        '<i class="ri-arrow-left-s-line"></i>',
        '<i class="ri-arrow-right-s-line"></i>'
      ],
      nav:true,
      dots: false,
      responsive:{
        0:{
          items:1
        },
        576:{
          items:2,
        },
        992:{
          items:4,
          margin: 25,
        }
      }
    })

    // video play
    $('.play').magnificPopup({
      type: 'iframe',
      iframe: {
        patterns: {
          youtube: {
            index: 'youtube.com/', 
            id: 'v=', 
            src: 'https://www.youtube.com/embed/%id%?autoplay=1' 
          }
        },
        srcAction: 'iframe_src', 
      }
    });

    // gsap js
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      syncTouch: true,
    });
    const update = (time) => {
      lenis.raf(time * 1000);
    };
    const resize = () => {
      ScrollTrigger.refresh();
    };
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      ScrollTrigger.update();
    });
    gsap.ticker.add(update);
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });
    ScrollTrigger.defaults({ scroller: document.body });
    window.addEventListener('resize', resize);


    var tl = gsap.timeline({ paused: true });
    tl.to(".full_menu", {
      right: 0,
      duration: 0.3,
    })
    .from(".menu_list_wrap ul li", {
      x: 50,
      duration: 0.3,
      stagger: 0.15,
      opacity: 0,
    }, '<')    
    .to("header .header_menu nav, header .header_menu ul + .button", {
      opacity: 0,
    }, '<')
    .from(".menu_img img", {
      x: 120,
      stagger: 0.15,
      opacity: 0,
    }, '<')
    .from(".animation_right_col>*", {
      x: 60,
      duration: 0.3,
      stagger: 0.15,
      opacity: 0,
    }, '<');
    // Toggle menu
    $('.menu_toggle').on('click', function () {
      if ($(this).hasClass("current")) {
        $(this).removeClass("current");
        $("header").removeClass("open-menu");
        tl.reverse();
      } else {
        $("header").addClass("open-menu");
        $(this).addClass("current");
        tl.play();
      }
    });

    // textSplitting
    function textSplitting(){
      const headings = document.querySelectorAll(".splitedText");
      headings.forEach(heading => {
        const parts = heading.innerHTML.split("<br>");
        const newParts = parts.map(part => {
          const temp = document.createElement('div');
          temp.innerHTML = part;
          const decodedPart = temp.textContent.trim();

          const wrappedWords = decodedPart.split(/\s+/).map(word => {
            const wrappedChars = [...word].map(char => {
              return `<span class="char">${char}</span>`;
            }).join('');
            return `<span class="word">${wrappedChars}</span>`;
          }).join(' ');

          return wrappedWords;
        });

        heading.innerHTML = newParts.join("<br>");
      });

    }
    textSplitting();

    // button hover
    function initButtonHoverAnimations() {
      const buttons = document.querySelectorAll(".button");
      buttons.forEach((button) => {
        const letters = button.querySelectorAll(".char");
        if (letters.length === 0) return;

        button.addEventListener("mouseenter", () => {
          gsap.to(letters, { y: "-3rem", duration: 0, stagger: 0.00666667 });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(letters, { y: 0, duration: 0, stagger: 0.00666667 });
        });
      });
    }
    initButtonHoverAnimations();

    if($(".video_box").length>0){
      gsap.from(".video_box", {
        clipPath: "polygon(15% 0%, 85% 0%, 85% 100%, 15% 100%)",
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video_box",
          start: "top 90%",
          end: "bottom 10%",
          scrub: 0.6,
          scroller: "#main",
        }
      });
    }

    if($(".animated_heading").length>0){
      gsap.to(".animated_heading .char", {
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".animated_heading",
          scroller: "#main",
          start: "top 90%",
          end: "top 70%",
          scrub: 0.2,
        },
      }); 
    }

    // fadeup animation
    gsap.utils.toArray('.fade-up, .fade-up>*').forEach(elem => {
      gsap.from(elem, {
        opacity: 0,
        y: 80,
        duration: 0.6,
        scrollTrigger: {
          trigger: elem,
          start: 'top 95%',
          toggleActions: 'play none none none',
        }
      });
    });

    const wrap = document.querySelector('.about_img_wrap');
    const layers = wrap.querySelectorAll('img, .video_card');
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
    
      const moveX = (x - centerX) / 40;
      const moveY = (y - centerY) / 40;
    
      layers.forEach((layer, i) => {
        const depth = (i + 1) * 8;
        gsap.to(layer, {
          x: moveX / depth * -15,
          y: moveY / depth * -15,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
    
    wrap.addEventListener('mouseleave', () => {
      layers.forEach((layer) => {
        gsap.to(layer, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
      });
    });

    // time line
    gsap.utils.toArray('.timeline_item').forEach((item) => {
      gsap.from(item.querySelector('.dot'), {
        opacity: 0.3,
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none reverse none',
        }
      });
      gsap.from(item.querySelector('.timeline_content'), {
        y: 50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none reverse none',
        }
      });      
      gsap.from(item.querySelector('.timeline_content_img'), {
        y: 50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none reverse none',
        }
      });

      gsap.to(item.querySelector('.fill'), {
        height: "100%",
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });
    });

  })
})(jQuery)

