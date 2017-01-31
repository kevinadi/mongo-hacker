var random = {

    _phonetics : [
        "Alpha", "Bravo", "Charlie", "Delta", "Echo",
        "Foxtrot", "Golf", "Hotel", "India", "Juliet",
        "Kilo", "Lima", "Mike", "November", "Oscar",
        "Papa", "Quebec", "Romeo", "Sierra", "Tango",
        "Unicorn", "Victor", "Whiskey", "Xray", "Yankee", "Zulu"
    ],

    _alphanum : 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',

    int : function(a, b) {
        switch (arguments.length) {
            case 0:
                return Math.floor(Math.random() * 100);
            case 1:
                return Math.floor(Math.random() * a);
            default:
                return a + Math.floor(Math.random() * (b-a));
        }
    },

    array : function(n, func) {
        var out = [];
        for (var i = 0; i < n; i++) {
            out.push(func());
        }
        return out;
    },

    string : function(n, words) {
        var words = words || random._phonetics;
        var n = n || 1;
        var len = words.length;
        var out = random.array(n, function(){return words[random.int(len)]});
        return out.join(" ");
    },

    char : function(n) {
        var out = "";
        var idx = random._alphanum.length - 1;
        while (out.length < n) {
            out += random._alphanum[r.int(idx)];
        }
        return out
    },

    date : function(year) {
        year = year || (new Date()).getFullYear();
        return new Date(year, random.int(12), random.int(30) + 1, 0, 0, random.int(86400));
    },

    geo : function() {
        return {
            "type" : "Point",
            coordinates : [
                Math.random() > 0.5 ? Math.random() * 180 : -Math.random() * 180,
                Math.random() > 0.5 ? Math.random() * 90 : -Math.random() * 90
            ]
        }
    },

    bool : function() {
        return Math.random() > 0.5
    }

}

var r = random;
