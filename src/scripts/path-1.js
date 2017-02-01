$(document).ready(function() {
/*scroll*/
    $("#scroll-nav").removeClass("fixed-top");
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $("#scroll-nav").addClass("fixed-top").fadeIn('fast');
        } else {
            $("#scroll-nav").removeClass("fixed-top").fadeIn('fast');
        }
    });

/*isotope*/
    var $grid = $('.grid').imagesLoaded( function() {
      $grid.isotope({
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
            columnWidth: '.grid-item'
          }
        });
    });

    lightbox.option({
      'resizeDuration': 200,
      'fadeDuration': 600,
      'wrapAround': true
    })

});
