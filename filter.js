console.log("go chrome extension go!");

function isBadPost(post) {
    var html = post.innerText;
    var bad_contexts = ['was tagged in this.',
                        'commented on this',
                        'replied to a comment',
                        /added \d comments on/,
                        'replied to a post',
                        'was tagged in this',
                        /posted in \d groups/,
                        'commented on a post',
                        'reacted to this',
                        'was tagged in a photo'];

    for (var i = 0, n = bad_contexts.length; i < n; i++) {
        if (html.search(bad_contexts[i]) != -1) {
            console.log(bad_contexts[i]);
            return true;
        }
    }

    return false;
}

var obs = new MutationObserver(function(mutations, observer) {
    var posts = mutations[0].addedNodes;
    for (var i = 0; i < posts.length; i++) {
        var post = Array.from(document.getElementsByClassName('userContentWrapper'));
        post.filter(isBadPost).forEach(x => x.remove());
    }
});

obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });
