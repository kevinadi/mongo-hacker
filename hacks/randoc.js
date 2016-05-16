"use strict";

var randoc = {

    // Shopping cart application
    cart : function(n) {
        return r.array(n, function () {
            return r.keyval("name", function () {
                return r.keyval("first", function () {
                    return r.string();
                }, "last", function () {
                    return r.string();
                });
            }, "email", function () {
                return (r.string() + "@" + r.string() + r.string(1, [".com", ".edu", ".org", ".net"])).toLowerCase();
            }, "address", function () {
                return r.keyval("street1", function () {
                    return [r.number(3), r.string(2), r.string(1, ["St", "Ave", "Rd"])].join(" ");
                }, "street2", function () {
                    return r.string(2);
                }, "city", function () {
                    return r.string();
                }, "postcode", function () {
                    return r.number(6);
                });
            }, "phones", function () {
                return r.array(2, function () {
                    return r.number(10);
                });
            }, "items", function () {
                return r.array(r.randint(1, 4), function () {
                    return r.keyval("date", function () {
                        return r.date();
                    }, "item", function () {
                        return r.string(2);
                    }, "quantity", function () {
                        return r.number(2);
                    }, "price", function () {
                        return r.number(3, 2);
                    });
                });
            }, "sessions", function () {
                return r.array(5, function () {
                    return r.keyval("session", function () {
                        return r.string();
                    }, "key", function () {
                        return r.number(20);
                    });
                });
            }, "note", function () {
                return r.char(r.randint(200, 300)).toLowerCase();
            });
        });
    },


    // Airline Seat Loading Factor
    slf : function(flight, days) {
        var startdate = arguments.length <= 2 || arguments[2] === undefined ? new Date(Date.UTC(2015, 0, 1, 0, 0, 0)) : arguments[2];

        var out = [];
        for (var flt = 1; flt <= flight; flt++) {
            var route = r.string() + "-" + r.string();
            var date = startdate.getTime();
            for (var i = 0; i < days; i++) {
                var c = r.randint(30, 36);
                var y = r.randint(150, 186);
                out.push(r.keyval("_id", function () {
                    return r.keyval("flight", function () {
                        return "FLT" + flt;
                    }, "date", function () {
                        return new Date(date);
                    });
                }, "route", function () {
                    return route;
                }, "aircraft", function () {
                    return r.string(1, ["A330", "A340"]);
                }, "c", function () {
                    return c;
                }, "y", function () {
                    return y;
                }, "total", function () {
                    return c + y;
                }));
                date += 86400000;
            }
        }
        return out;
    },


    // Random location with tags
    randloc : function randloc(n) {
        return r.array(n, function () {
            return {
                geometry : r.geopoint(),
                tags : r.string(r.randint(1,5)).split(' ')
            }
        });
    },


    // User database application
    _firstNames : [
        "Liam", "Noah", "Ethan", "Mason", "Logan", "Jacob", "Lucas", "Jackson", "Aiden",
        "Jack", "James", "Elijah", "Luke", "William", "Michael", "Alexander", "Oliver",
        "Owen", "Daniel", "Gabriel", "Henry", "Matthew", "Carter", "Ryan", "Wyatt",
        "Andrew", "Connor", "Caleb", "Jayden", "Nathan", "Dylan", "Isaac", "Hunter",
        "Joshua", "Landon", "Samuel", "David", "Sebastian", "Olivia", "Emma", "Sophia",
        "Ava", "Isabella", "Mia", "Charlotte", "Emily", "Abigail", "Avery", "Harper",
        "Ella", "Madison", "Amelie", "Lily", "Chloe", "Sofia", "Evelyn", "Hannah",
        "Addison", "Grace", "Aubrey", "Zoey", "Aria", "Ellie", "Natalie", "Zoe", "Audrey",
        "Elizabeth", "Scarlett", "Layla", "Victoria", "Brooklyn", "Lucy", "Lillian",
        "Claire", "Nora", "Riley", "Leah"
    ],

    _lastNames : [
        "Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans",
        "Thomas", "Johnson", "Roberts", "Walker", "Wright", "Robinson", "Thompson",
        "White", "Hughes", "Edwards", "Green", "Hall", "Wood", "Harris", "Lewis", "Martin",
        "Jackson", "Clarke", "Clark", "Turner", "Hill", "Scott", "Cooper", "Morris", "Ward",
        "Moore", "King", "Watson", "Baker", "Harrison", "Morgan", "Patel", "Young", "Allen",
        "Mitchell", "James", "Anderson", "Phillips", "Lee", "Bell", "Parker", "Davis"
    ],

    _gender : [
        "female", "male"
    ],

    _city : [
        "Manhattan", "Brooklyn", "New Jersey", "Queens", "Bronx"
    ],

    user : function(n) {
        return r.array(n, function () {
            var out = r.keyval("user", function () {
                return r.keyval("name", function () {
                    return r.keyval("first", function () {
                        return r.string(1, randoc._firstNames);
                    }, "last", function () {
                        return r.string(1, randoc._lastNames);
                    });
                }, "gender", function () {
                    return r.string(1, randoc._gender);
                }, "age", function () {
                    return r.randint(100);
                }, "address", function () {
                    return r.keyval("street", function () {
                        return r.string(2);
                    }, "house_no", function () {
                        return r.number(2);
                    }, "zip_code", function () {
                        return r.number(5);
                    }, "city", function () {
                        return r.string(1, randoc._city);
                    });
                }, "phone_no", function () {
                    return r.number(8);
                }, "created_at", function () {
                    return r.date();
                }, "is_active", function () {
                    return Boolean(r.randint(2));
                });
            });
            if (Math.random() <= 0.7) {
                out["tags"] = r.array(r.randint(1, 6), function () {
                    return r.keyval("label", function () {
                        return r.string();
                    }, "id", function () {
                        return r.number(3);
                    });
                });
            };
            return out;
        });
    }

}
