$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let tweetLength = $(this).val().length;
    let charsLeft = 140 - tweetLength;
    if (charsLeft < 0) {
      $(this).parent().find(".counter").css("color", "red");
    }
    
    $(this).parent().find(".counter").text(charsLeft);

  })
});