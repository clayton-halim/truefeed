function save_option(option, name) {
    console.log(name);
    chrome.storage.sync.set({
        [name]: option.checked
    }, function() {
        console.log('saved ' + name);
    });
}

function restore_options() {
    let options = document.getElementsByClassName('checkbox');
    for (let i = 0; i < options.length; i++) {
        let optionName = options[i].dataset['option'];
        let callback = function(i, name) {
                            return function(items) { 
                                console.log(i);
                                options[i].checked = items[name]; 
                            } 
                       }
        chrome.storage.sync.get({
            [optionName]: true
        }, callback(i, optionName));

        let saveFunction = function(i, name) { return function() { save_option(options[i], name) }};
        options[i].addEventListener('click', saveFunction(i, optionName));
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
