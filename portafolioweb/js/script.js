$(document).on('click', '.amenu', function(event){
  event.preventDefault();

  $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 500);
});s




