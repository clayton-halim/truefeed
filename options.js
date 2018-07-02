function save_options() {
    chrome.storage.sync.set({
        "filterTag": document.getElementById('check-tag').checked,
        "filterComment": document.getElementById('check-comment').checked,
        "filterReply": document.getElementById('check-reply').checked,
        "filterReaction": document.getElementById('check-reaction').checked,
        "filterGroup": document.getElementById('check-group').checked
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        "filterTag": true,
        "filterComment": true,
        "filterReply": true,
        "filterReaction": true,
        "filterGroup": true
    }, function(items) {
        document.getElementById('check-tag').checked = items.filterTag;
        document.getElementById('check-comment').checked = items.filterComment;
        document.getElementById('check-reply').checked = items.filterReply;
        document.getElementById('check-reaction').checked = items.filterReaction;
        document.getElementById('check-group').checked = items.filterReaction;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
