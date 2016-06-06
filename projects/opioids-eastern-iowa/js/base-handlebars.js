// Handlebars helpers
Handlebars.registerHelper('totitlecase', function(options) {
    return toTitleCase( options );
});

Handlebars.registerHelper('removespecial', function(options) {
  return removeSpecialCharacters( options.toLowerCase() );
});

Handlebars.registerHelper('capitalisefirst', function(options) {
    return capitaliseFirstLetter( options );
});

Handlebars.registerHelper('commaseparated', function(options) {
    var val = options;

    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }

    return val;
});

Handlebars.registerHelper('truefalse', function(options) {
    if (options == 'TRUE') {
        return "class=selected-row";
    } else {
        return '';
    }
});

// Give it: 0.11324343
// Return: 11
Handlebars.registerHelper('percent', function(options) {
    return Math.round( options * 100 )
});

// Use like so:
// {{#compare unicorns ponies operator="<"}}
// I knew it, unicorns are just low-quality ponies!
// {{/compare}}
// Can also use else: {{else}}
Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";
    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);
    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// Do math
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

Handlebars.registerHelper('shade_boxes', function(num) {
    return storyOne.setColor(num);
});

Handlebars.registerHelper('fixed_two', function(num) {
    return num.toFixed(2);
});
