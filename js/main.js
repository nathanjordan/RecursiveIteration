$().ready(function() {
    // Gets my feed data from GitHub
    $.ajax({
        url: 'https://api.github.com/users/nathanjordan/events'
    }).done(function(data) {
        console.log(data);
    });
});

$(document).ready(function() {
    var controller = $.superscrollorama({
        playoutAnimations: true
    });
    // parallax example
    controller.addTween(
      'body',
      (new TimelineLite())
        .append([
          TweenMax.fromTo($('#venn'), 1,
            {css:{top: 200}, immediateRender:true},
            {css:{top: -600}})
        ]),
      1000 // scroll duration of tween
    );
});

