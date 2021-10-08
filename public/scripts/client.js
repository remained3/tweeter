$(() => {

  const fetchTweets = () => {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        console.log("tweet", tweets)
        createTweets(tweets);
  
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchTweets();

  // create single blog post node
  const createTweetElement = function (tweetData) {
    const $tweet = `<article class="tweets-container">
  <div class="tweet">
    <div class="tweet-header">
      <img src="${tweetData.user.avatars}" class="tweeter-icon" />
      <p class="tweeter-name">${tweetData.user.name}</p>
      <p class="handle">${tweetData.user.handle}</p>
    </div>
    <h2 class="tweet1">
     <p>${(escape(tweetData.content.text)).replace(/%20/g, "G").replace("%3F", "?").replace("%21", "!").replace(/%2C/g,"2")}</p>
    </h2>
    <div class="tweet-footer">
    <p class="days-ago">${timeago.format(tweetData.created_at)}</p>
      <p class="small-icons">
        <i class="fa fa-flag"></i> 
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
      </p>
    </div>
  </div>
</article>`;

    return $tweet;
  };

  const createTweets = (tweets) => {
    const $tweetsContainer = $('.tweets-container');
    $tweetsContainer.empty();

    for(const tweet of tweets) {
      const $tweet = createTweets(tweet);
      $tweetsContainer.prepend($tweet)
    }
  }  
  
  const $newTweetSubmit = $('#new-tweet');
  $newTweetSubmit.on('submit', function(event) {
    event.preventDefault();
    let tweetLength = $("#tweet-text").val();
    if (!tweetLength) {
      return alert ("Please write something to submit a tweet!")
    }
    if (tweetLength > 140) {
      return alert ("Please use less than 140 characters :)")
    }
    
    const serializedData = $(this).serialize() 
    $.post('/tweets', serializedData, () => {
      getTweets();
    })

  })



})





