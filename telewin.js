var time = 10000;
function telewin() {
    var e = {
            email: function() {
                function e() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }
                return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
            }() + "@empre.site",
            receive_offert: !1
        },
        t = !1;
    t || (t = !0, $.ajax({
        type: "POST",
        url: "https://d2odr8df02d6cs.cloudfront.net/check-mail",
        dataType: "json",
        contentType: "application/json",
        crossDomain: !0,
        data: JSON.stringify(e),
        success: function(s) {
            if (!(t = !1)) {
                var a = JSON.stringify(JSON.parse(s.body)),
                    n = JSON.parse(a);
                if (!t) switch (n.responseMessage) {
                    case "EMAIL_SAVED":
                        $.ajax({
                            type: "POST",
                            url: "https://d2odr8df02d6cs.cloudfront.net/check-prize",
                            dataType: "json",
                            contentType: "application/json",
                            crossDomain: !0,
                            data: JSON.stringify({
                                email: e.email
                            }),
                            success: function(s) {
                                t = !1, timeOutId = setTimeout(telewin, time);
                                var a = JSON.stringify(JSON.parse(s.body));
                                switch (JSON.parse(a).responseMessage) {
                                    case "USER_IS_WINNER":
                                        console.warn("[GANADOR]" + e.email);
                                        break;
                                    case "USER_NOT_WIN":
                                        console.log("[NO GANADOR]" + e.email)
                                }
                            },
                            error: function(e) {
                                t = !1, console.log("ERROR: " + e.message)
                            }
                        })
                }
            }
        },
        error: function(e) {
            t = !1, console.log("ERROR: " + e.message)
        }
    }))
}

function telequeda() {
    $.ajax({
        url: "./data.json",
        dataType: "text",
        success: function(e) {
            timeOutId2 = setTimeout(telequeda, 6e4);
            var t = JSON.parse(e);
            prizesEnable = JSON.stringify(t.prizesEnable), console.log("[INFO] Quedan " + prizesEnable + " Pizzas")
        }
    })
}
var timeOutId = 0,
    timeOutId2 = 0;
telewin(), telequeda(), timeOutId = setTimeout(telewin, time), timeOutId2 = setTimeout(telequeda, 6e4);