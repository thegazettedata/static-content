// Clone arrays
Array.prototype.clone = function() {
    return this.slice(0);
};

var pymChild = null;

// FUNCTIONS
// Used to capitalize first letter of string
function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Used to capitalize first letter of all words
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
    first_letter = txt.charAt(0).toUpperCase();

    // This captures words with an apostrophe as the second character
    // And capitalizes them correctly
    // Example: o'brien = O'Brien
    if (txt.charAt(1) === "'") {
      return first_letter + txt.charAt(1) + txt.charAt(2).toUpperCase() + txt.substr(3).toLowerCase();
    } else {
      return first_letter + txt.substr(1).toLowerCase();
    }
  });
}

// Add commas to numbers over 1000
function commaSeparateNumber(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}

// This removes special characters and spaces
function removeSpecialCharacters(string) {
  return string.replace(/[^\w\s]/gi, '').replace(/ /g,'');
}

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

Handlebars.registerHelper("chapter_icon", function(chapter, icon) {
  if (handlebars_iteration === 0) {
    return chapter;
  } else {
    return new Handlebars.SafeString(icon);
  }
});

Handlebars.registerHelper('td_id', function() {
  if (handlebars_iteration === 0) {
    return 'right-td';
  } else {
    return 'left-td';
  }
});

Handlebars.registerHelper("if", function(arg, options) {
  if (typeof arg === 'string') {
    if (arg === 'left' && handlebars_iteration === 0) {
      return options.fn(this);
    } else if (arg === 'right' && handlebars_iteration === 1) {
      return options.fn(this);
    }
  } else {
    if (arg % 2 === 0 && handlebars_iteration === 0) {
      return options.fn(this);
    } else if (arg % 2 === 1 && handlebars_iteration === 1) {
      return options.fn(this);
    }
  }
});

Handlebars.registerHelper('link_begin', function(link) {
  if (link !== '#') {
    return new Handlebars.SafeString('<a href="' + link + '" target="_parent">');
  }
});

Handlebars.registerHelper('link_end', function(link) {
  if (link !== '#') {
    return new Handlebars.SafeString('</a>');
  }
});
