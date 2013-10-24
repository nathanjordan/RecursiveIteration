$().ready(function() {
    setupHeaders();
    // Gets my feed data from GitHub
    loadGithubFeed(processGithubFeed);
});

function loadGithubFeed(callback) {
    $.ajax({
        url: 'https://api.github.com/users/nathanjordan/events'
    }).done(function(data) {
        callback(data);
    });
}

function processGithubFeed(feed) {
    var processedFeed;
    // only the top 6 things
    feed = feed.slice(0,5);
    processedFeed = _.map(feed, function(item) {
        var i = {};
        if (item.type === "PushEvent") {
            i.action = 'I pushed ';
            i.what = String(item.payload.distinct_size) + ' commits to ';
            i.to = item.repo.name;
            i.to_url = item.repo.url.replace('api.','').replace('repos/','');
            i.date = item.created_at;
        } else if (item.type === "CreateEvent") {
            i.action = 'I created ';
            i.what = item.repo.name;
            i.date = item.created_at;
        } else {
            return;
        }
        return i;
    });
    writeGithubFeed(processedFeed);
}

function writeGithubFeed(processedFeed) {
    var html, itemHTML, processedFeed;
    html = '';
    _.each(processedFeed, function(item) {
        if (!item) {
            return;
        }
        itemHTML = '';
        itemHTML += item.action;
        itemHTML += item.what;
        if (item.to) {
            itemHTML += '<a href="' + item.to_url + '">' + item.to + '</a>';
        }
        itemHTML += '<br/>' + moment(item.date).fromNow();
        html += '<li>' + itemHTML + '</li>';
    });
    $('#githubFeed').html(html);
}

function setupHeaders() {
    $('header div').bigtext();
}
