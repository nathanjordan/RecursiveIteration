$().ready(function() {
    // Gets my feed data from GitHub
    $.ajax({
        url: 'https://api.github.com/users/nathanjordan/events'
    }).done(function(data) {
        console.log(data);
    });
});
