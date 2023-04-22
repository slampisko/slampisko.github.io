function $$(element) {
    return {
        find: function(selector) {
            return element.querySelector(selector);
        },
        findAll: function(selector) {
            return element.querySelectorAll(selector);
        },
    };
}
