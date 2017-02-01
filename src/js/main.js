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



angular.module('myApp', ['duScroll']).
controller('MyCtrl', function($scope, $document){
   $scope.toTheTop = function() {
     $document.scrollTopAnimated(0, 5000).then(function() {
       console && console.log('You just scrolled to the top!');
     });
   }
   var section3 = angular.element(document.getElementById('section-3'));
   $scope.toSection3 = function() {
     $document.scrollToElementAnimated(section3);
   }
 }
).value('duScrollOffset', 30).value('duScrollDuration', 2500);


