!(function(e) {
    var t = {};
    function r(n) {
        if (t[n]) return t[n].exports;
        var o = (t[n] = { i: n, l: !1, exports: {} });
        return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    (r.m = e),
        (r.c = t),
        (r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (r.r = function(e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (r.t = function(e, t) {
            if ((1 & t && (e = r(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (
                (r.r(n),
                Object.defineProperty(n, "default", { enumerable: !0, value: e }),
                2 & t && "string" != typeof e)
            )
                for (var o in e)
                    r.d(
                        n,
                        o,
                        function(t) {
                            return e[t];
                        }.bind(null, o)
                    );
            return n;
        }),
        (r.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default;
                      }
                    : function() {
                          return e;
                      };
            return r.d(t, "a", t), t;
        }),
        (r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.p = "/"),
        r((r.s = 7));
})({
    7: function(e, t, r) {
        e.exports = r(8);
    },
    8: function(e, t) {
        var r = document.querySelector("#register-form");
        r.addEventListener("submit", function(e) {
            e.preventDefault();
            var t = document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                n = {
                    url: r.getAttribute("action"),
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                        "X-CSRF-TOKEN": t
                    },
                    body: JSON.stringify({
                        name: document.querySelector("#register-name").value,
                        last: document.querySelector("#register-last").value,
                        email: document.querySelector("#register-email").value,
                        password: document.querySelector("#register-password").value,
                        confirm: document.querySelector("#register-confirm").value,
                        question: document.querySelector("#register-question").value,
                        secret: document.querySelector("#register-secret").value
                    })
                };
            if (
                (function() {
                    var e = !0,
                        t =
                            (document.querySelector("#register-name").value,
                            document.querySelector("#register-last").value,
                            document.querySelector("#register-email").value),
                        r = document.querySelector("#register-password").value,
                        n =
                            (document.querySelector("#register-confirm").value,
                            document.querySelector("#register-question").value,
                            document.querySelector("#register-secret").value,
                            document.querySelector(".component-alert__list"));
                    (n.innerHTML = ""),
                        document
                            .querySelector(".component-alert")
                            .classList.remove("component-alert--active");
                    var o = "";
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)
                        ? t.length > 255 &&
                          ((o += "<li>".concat(
                              langTranslations.register.errors.email.max,
                              "</li>"
                          )),
                          (e = !1))
                        : ((o += "<li>".concat(
                              langTranslations.register.errors.email.email,
                              "</li>"
                          )),
                          (e = !1));
                    r.length < 8
                        ? ((o += "<li>".concat(
                              langTranslations.register.errors.password.min,
                              "</li>"
                          )),
                          (e = !1))
                        : r.length > 255 &&
                          ((o += "<li>".concat(
                              langTranslations.register.errors.password.max,
                              "</li>"
                          )),
                          (e = !1));
                    e ||
                        (document
                            .querySelector(".component-alert")
                            .classList.add("component-alert--active"),
                        (n.innerHTML = o));
                    return e;
                })()
            ) {
                fetch(n.url, n)
                    .then(function(e) {
                        if (
                            e.status >= 400 &&
                            e.status < 600 &&
                            (!0, 419 !== e.status && 401 !== e.status)
                        )
                            throw "Error";
                        return e.json();
                    })
                    .then(function(e) {
                        if (e.hasOwnProperty("redirectTo")) {
                            r.reset();
                            var t = document.querySelector(".modal__title"),
                                n = document.querySelector(".modal__body");
                            t.innerHTML = "Registration";
                            (n.innerHTML = '<p class="modal__message">'
                                .concat(
                                    "Congrats! You were successfully registered!",
                                    '</p>\n                            <p class="modal__message modal__message--warning">\n                            <small id="modal__text">'
                                )
                                .concat(
                                    "However, an admin has to activate your account before you can use it",
                                    "</small>\n                        </p>"
                                )),
                                fadeIn();
                        } else {
                            var o = "";
                            for (var a in e)
                                e.hasOwnProperty(a) &&
                                    "" !== e[a] &&
                                    (o += "<li>".concat(e[a], "</li>"));
                            (document.querySelector(".component-alert__list").innerHTML = o),
                                document
                                    .querySelector(".component-alert")
                                    .classList.add("component-alert--active");
                        }
                    })
                    .catch(function(e) {
                        (document.querySelector(".component-alert__list").innerHTML = "<li>".concat(
                            langTranslations.message.modal.error,
                            "</li>"
                        )),
                            document
                                .querySelector(".component-alert")
                                .classList.add("component-alert--active");
                    });
            }
        });
    }
});
