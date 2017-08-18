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

    geo : function(p1, p2) {
        p1 = p1 || [180, 90]
        p2 = p2 || [-180, -90]
        return {
            "type" : "Point",
            coordinates : [
                Math.random() * Math.abs(p1[0] - p2[0]) + Math.min(p1[0], p2[0]),
                Math.random() * Math.abs(p1[1] - p2[1]) + Math.min(p1[1], p2[1])
            ]
        }
    },

    bool : function() {
        return Math.random() > 0.5
    },

    uuid : function() {
        // from http://stackoverflow.com/a/2117523/5619724
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
        });
    }

}

var r = random;
