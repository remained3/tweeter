/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {


  //hide the error message until needed
  const $errorMsg = $(".tweet-error");
  $errorMsg.hide();

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetCont) {
    let $tweet = $(`
    <article class="tweet">
      <header>
        <span>
          <img src=${tweetCont.user.avatars}>
          <span>${tweetCont.user.name}</span>
        </span>
        <span class="user-handle" >${tweetCont.user.handle}</span>
      </header>
      <p>${escape(tweetCont.content.text)}</p>
      <footer>
        <span>${timeago.format(tweetCont.created_at)}</span>
        <span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
    `);
    return $tweet;
  };


  //show previously made tweets with newest at the top
  const showTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.get("/tweets/", function(data) {
      showTweets(data);
    });
  };

  const $submitNewTweet = $("#new-tweet");
  $submitNewTweet.on("submit", function(event) {
    event.preventDefault();
    $errorMsg.slideUp(100);
    
    const $charCounter = $("#char-counter").val();
    if ($charCounter > 139) {
      $errorMsg.children("span").text("Error: You need to say something to post a message!");
      $errorMsg.slideDown(100);
      return;
    } else if ($charCounter < 0) {
      $errorMsg.children("span").text("Error: Please limit yourself to 140 characters!");
      $errorMsg.slideDown(100);
      return;
    }
    const serializedData = $(this).serialize();
    
    $.post("/tweets/", serializedData, () => {
      loadTweets();
      $("#tweet-text").val("");
      $("#char-counter").text("140");
    });

  });

  //loads the inital tweets onto the page
  loadTweets();

});