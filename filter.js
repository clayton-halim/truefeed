function isBadPost(post) {
    var html = post.innerText;

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
        post.filter(isBadPost).forEach(x => x.parentElement.remove());
    }
});

var bad_contexts = [];

chrome.storage.sync.get({
       "check-tag": true,
       "check-comment": true,
       "check-reply": true,
       "check-reaction": true,
       "check-group": true
   }, function(items) {
       
       if (items['check-tag']) {
            bad_contexts.push('was tagged in this');
            bad_contexts.push('was tagged in a photo');
            bad_contexts.push(/was tagged in \d photos/); 
       }

       if (items['check-comment']) {
            console.log("checked_comment pushed");
            bad_contexts.push('commented on this');
            bad_contexts.push('commented on a post');
            bad_contexts.push(/added \d comments on/);
       }

       if (items['check-reply']) {
            bad_contexts.push('replied to a comment');
            bad_contexts.push('replied to a post');
       }

       if (items['check-reaction']) {
            bad_contexts.push('reacted to this');
            bad_contexts.push('liked this');
       }

       if (items['check-group']) {
            bad_contexts.push(/posted in \d groups/);
       }
   });
   
obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

