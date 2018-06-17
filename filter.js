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
                        'liked this',
                        'was tagged in a photo'];

    for (var i = 0, n = bad_contexts.length; i < n; i++) {
        if (html.search(bad_contexts[i]) != -1) {
            console.log(bad_contexts[i]);
            return true;
        }
    }

    return false;
}

function toggleHide(post) {
    var children = post.children;
    console.log(children);
    for (var i = 0; i < children.length; ++i) {
        if (children[i].style.display !== 'none') {
            children[i].style.display = 'none';
        } else {
            children[i].style.display = '';
        }
    }
}

function makeMinimizable(post) {
    if (post.parentElement.getAttribute('class') === 'minimizeButton') {
        return;
    }
    var minimizeButton = document.createElement('DIV');
    minimizeButton.setAttribute('class', 'minimizeButton');
    minimizeButton.appendChild(post.cloneNode(true));
    minimizeButton.addEventListener("click", function() { toggleHide(minimizeButton) });
    post.parentNode.replaceChild(minimizeButton, post);
    toggleHide(minimizeButton);
}

var obs = new MutationObserver(function(mutations, observer) {
    var posts = mutations[0].addedNodes;
    for (var i = 0; i < posts.length; i++) {
        var post = Array.from(document.getElementsByClassName('userContentWrapper'));
        post.filter(isBadPost).forEach(x => makeMinimizable(x));
    }
});

obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

