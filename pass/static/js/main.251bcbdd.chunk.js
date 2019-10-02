(window.webpackJsonp = window.webpackJsonp || []).push([
    [0], {
        139: function(e, t, a) {
            e.exports = a(181)
        },
        180: function(e, t, a) {},
        181: function(e, t, a) {
            "use strict";
            a.r(t);
            a(140), a(165);
            var n = a(0),
                r = a.n(n),
                s = a(22),
                c = a.n(s),
                l = a(13),
                i = a.n(l),
                o = a(32),
                u = a(71),
                p = a(72),
                d = a(89),
                h = a(73),
                b = a(90),
                m = a(7),
                g = a(6),
                v = a(80),
                k = a(81),
                f = (a(179), function(e, t, a, n, r, s, c) {
                    e < 6 && (e = 6), e > 100 && (e = 100);
                    var l = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                        i = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
                        o = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                        u = ["", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]", "{", "}", "<", ">"],
                        p = ["", "\u0410", "\u0411", "\u0412", "\u0413", "\u0414", "\u0415", "\u0401", "\u0416", "\u0417", "\u0418", "\u041a", "\u041b", "\u041c", "\u041d", "\u041e", "\u041f", "\u0420", "\u0421", "\u0422", "\u0427", "\u0428", "\u0429", "\u042c", "\u042a", "\u042b", "\u042e", "\u042f", "\u0419", "\u0423", "\u0425", "\u042d", "\u0426", "\u0424"],
                        d = ["", "\u0430", "\u0431", "\u0432", "\u0433", "\u0434", "\u0435", "\u0451", "\u0436", "\u0437", "\u0438", "\u043a", "\u043b", "\u043c", "\u043d", "\u043e", "\u043f", "\u0440", "\u0441", "\u0442", "\u0447", "\u0448", "\u0449", "\u044c", "\u044a", "\u044b", "\u044e", "\u044f", "\u0439", "\u0443", "\u0445", "\u044d", "\u0446", "\u0444"];

                    function h(e, t, a) {
                        for (var n; !((n = Math.floor(Math.random() * a)) >= e && n <= t););
                        return n
                    }
                    var b, m, g, v = "",
                        k = 0,
                        f = e,
                        _ = [],
                        y = h(30, 80, 100);
                    for (m = 0; m < y; m++) t && (b = h(1, 26, 100), _[k] = l[b], k++), a && (b = h(1, 26, 100), _[k] = i[b], k++), n && (b = h(1, 10, 100), _[k] = o[b], k++), r && (b = h(1, 16, 100), _[k] = u[b], k++), s && (b = h(1, 33, 100), _[k] = p[b], k++), c && (b = h(1, 33, 100), _[k] = d[b], k++);
                    var E = [_[0], _[1], _[2], _[3], _[4], _[5]].sort(function() {
                        return .5 - Math.random()
                    }).join("");
                    for (g = 6; g < f; g++) v += _[h(7, k - 1, 100)];
                    return E + v
                }),
                _ = a(82),
                y = a.n(_),
                E = a(83),
                w = a.n(E),
                S = a(84),
                A = a.n(S),
                O = a(46),
                j = a.n(O),
                C = a(85),
                N = a.n(C),
                T = a(86),
                V = a.n(T),
                P = a(47),
                K = a.n(P),
                W = a(87),
                x = a.n(W),
                M = (a(180), function(e) {
                    function t(e) {
                        var a;
                        return Object(u.a)(this, t), (a = Object(d.a)(this, Object(h.a)(t).call(this, e))).parseQueryString = function(e) {
                            return e.slice(1).split("&").map(function(e) {
                                var t = e.split("=");
                                return {
                                    key: t[0],
                                    value: t[1]
                                }
                            }).reduce(function(e, t) {
                                return e[t.key] = t.value, e
                            }, {})
                        }, a.state = {
                            pass: f(12, 1, 1, 1, 0, 0, 0),
                            numbers: 12,
                            upper: 1,
                            lower: 1,
                            digit: 1,
                            simvs: 0,
                            upper_rus: 0,
                            lower_rus: 0,
                            security: 74,
                            color: "good",
                            f: null,
                            done: 0,
                            err: null,
                            rubles: "5",
                            vkpayerr: !1,
                            agen: !1,
                            popout: null,
                            token: null,
                            act: null,
                            auth: 0,
                            copied: !1,
                            disabled: !1,
                            vkapp_id: "6940387",
                            is_app_user: a.parseQueryString(window.location.search).vk_is_app_user ? a.parseQueryString(window.location.search).vk_is_app_user : "0",
                            scheme: "client_light",
                            platf: a.parseQueryString(window.location.search).vk_platform ? a.parseQueryString(window.location.search).vk_platform : "web",
                            api_id: a.parseQueryString(window.location.search).api_id ? a.parseQueryString(window.location.search).api_id : a.parseQueryString(window.location.search).vk_app_id ? a.parseQueryString(window.location.search).vk_app_id : 0
                        }, a.switch_scheme = a.switch_scheme.bind(Object(m.a)(Object(m.a)(a))), a.share = a.share.bind(Object(m.a)(Object(m.a)(a))), a.fave = a.fave.bind(Object(m.a)(Object(m.a)(a))), a.added = a.added.bind(Object(m.a)(Object(m.a)(a))), a.genPass = a.genPass.bind(Object(m.a)(Object(m.a)(a))), a.options = a.options.bind(Object(m.a)(Object(m.a)(a))), a.closePopout = a.closePopout.bind(Object(m.a)(Object(m.a)(a))), a.onChange = a.onChange.bind(Object(m.a)(Object(m.a)(a))), a.vkpay = a.vkpay.bind(Object(m.a)(Object(m.a)(a))), a.save = a.save.bind(Object(m.a)(Object(m.a)(a))), a
                    }
                    return Object(b.a)(t, e), Object(p.a)(t, [{
                        key: "componentDidMount",
                        value: function() {
                            var e = this;
                            i.a.subscribe(function(t) {
                                switch (t.detail.type) {
                                    case "VKWebAppUpdateConfig":
                                        var a = document.createAttribute("scheme");
                                        a.value = t.detail.data.scheme ? t.detail.data.scheme : "client_light", e.setState({
                                            scheme: a.value
                                        }), document.body.attributes.setNamedItem(a), console.log(t.detail);
                                        break;
                                    case "VKWebAppAddToFavoritesResult":
                                        !0 === t.detail.data.result && (e.setState({
                                            f: 1
                                        }), "mobile_iphone" === e.state.platf && i.a.send("VKWebAppTapticNotificationOccurred", {
                                            type: "success"
                                        }), setTimeout(e.added, 1e3));
                                        break;
                                    case "VKWebAppGetClientVersionResult":
                                        t.detail.data.is_app_user = e.state.is_app_user, i.a.send("VKWebAppSendPayload", {
                                            group_id: 25035296,
                                            payload: t.detail.data
                                        });
                                        break;
                                    case "VKWebAppAccessTokenReceived":
                                        e.setState({
                                            token: t.detail.data.access_token
                                        }), "repeat" === e.state.act && e.save(e.state.agen), "get" === e.state.act && i.a.send("VKWebAppCallAPIMethod", {
                                            method: "storage.get",
                                            params: {
                                                key: "agen",
                                                v: "5.101",
                                                access_token: t.detail.data.access_token
                                            },
                                            request_id: "get"
                                        });
                                        break;
                                    case "VKWebAppAccessTokenFailed":
                                        4 === t.detail.data.error_data.error_code && e.setState({
                                            popout: r.a.createElement(g.a, {
                                                actions: [{
                                                    title: "\u041d\u0435 \u0441\u0435\u0439\u0447\u0430\u0441",
                                                    autoclose: !0,
                                                    style: "destructive"
                                                }, {
                                                    title: "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c",
                                                    autoclose: !0,
                                                    style: "default",
                                                    action: function() {
                                                        return i.a.send("VKWebAppGetAuthToken", {
                                                            app_id: Number(e.state.api_id),
                                                            scope: ""
                                                        })
                                                    }
                                                }],
                                                onClose: e.closePopout
                                            }, r.a.createElement("h2", null, "\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f"), r.a.createElement("p", {
                                                align: "center"
                                            }, "\u0414\u043b\u044f \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f."))
                                        });
                                        break;
                                    case "VKWebAppCallAPIMethodResult":
                                        if ("get" === t.detail.data.request_id) {
                                            var n = t.detail.data.response,
                                                s = !1;
                                            1 === Number(n) && (s = !0), e.setState({
                                                agen: s
                                            })
                                        }
                                        break;
                                    case "VKWebAppSendPayloadResult":
                                        break;
                                    default:
                                        console.log(t.detail)
                                }
                            }), "web" !== this.state.platf && "test" !== window.location.search.slice(4, 8) && i.a.send("VKWebAppGetClientVersion", {}), "1" === this.state.is_app_user && (this.setState({
                                act: "get"
                            }), i.a.send("VKWebAppGetAuthToken", {
                                app_id: Number(this.state.api_id),
                                scope: ""
                            }))
                        }
                    }, {
                        key: "genPass",
                        value: function(e, t, a, n, r, s, c, l) {
                            if (t || a || n || r || s || c) {
                                if (this.setState({
                                        err: !1,
                                        disabled: !1
                                    }), !this.state.agen || l) {
                                    this.setState({
                                        pass: f(e, t, a, n, r, s, c),
                                        copied: !1
                                    });
                                    var i = 10 * (e - 6);
                                    n && (i += 2), (a || c) && (i += 5), a && c && (i += 2), (t || s) && (i += 7), t && s && (i += 2), r && (i += 8), i > 100 && (i = 100);
                                    var o = "";
                                    i <= 33 && (o = "low"), i >= 70 && (o = "good"), this.setState({
                                        color: o,
                                        security: i
                                    })
                                }
                            } else this.setState({
                                err: !0,
                                disabled: !0
                            })
                        }
                    }, {
                        key: "switch_scheme",
                        value: function() {
                            if ("client_light" === this.state.scheme) {
                                this.setState({
                                    scheme: "client_dark"
                                });
                                var e = document.createAttribute("scheme");
                                e.value = "client_dark", document.body.attributes.setNamedItem(e)
                            }
                            if ("client_dark" === this.state.scheme) {
                                this.setState({
                                    scheme: "client_light"
                                });
                                var t = document.createAttribute("scheme");
                                t.value = "client_light", document.body.attributes.setNamedItem(t)
                            }
                        }
                    }, {
                        key: "share",
                        value: function() {
                            "web" === this.state.platf ? window.VK.callMethod("showInviteBox") : i.a.send("VKWebAppShare", {})
                        }
                    }, {
                        key: "fave",
                        value: function() {
                            "web" === this.state.platf ? window.VK.callMethod("showSettingsBox", 256) : i.a.send("VKWebAppAddToFavorites", {})
                        }
                    }, {
                        key: "added",
                        value: function() {
                            this.setState({
                                done: 1
                            })
                        }
                    }, {
                        key: "options",
                        value: function() {
                            for (var e = [], t = 6; t <= 100; t += 1) e.push(r.a.createElement("option", {
                                value: "".concat(t),
                                key: "".concat(t)
                            }, t));
                            return e
                        }
                    }, {
                        key: "closePopout",
                        value: function() {
                            this.setState({
                                popout: null
                            })
                        }
                    }, {
                        key: "onChange",
                        value: function(e) {
                            var t = e.currentTarget,
                                a = t.name,
                                n = t.value.trim().replace(/[^\d.,]*/g, "").replace(/(\d{0,6}([.,]\d{0,2})?).*$/g, "$1");
                            "" === n ? this.setState(Object(o.a)({}, a, "")) : Number(n.toString().replace(",", ".")) < 1 ? this.setState(Object(o.a)({}, a, "1")) : Number(n.toString().replace(",", ".")) > 15e3 ? this.setState(Object(o.a)({}, a, "15000")) : this.setState(Object(o.a)({}, a, n)), this.setState({
                                vkpayerr: !1
                            })
                        }
                    }, {
                        key: "vkpay",
                        value: function() {
                            if ("" !== this.state.rubles) {
                                var e = this.state.rubles.toString().replace(",", ".");
                                isNaN(e) || e < 1 || e > 15e3 ? this.setState({
                                    vkpayerr: !0
                                }) : (i.a.send("VKWebAppOpenPayForm", {
                                    app_id: Number(this.state.api_id),
                                    action: "pay-to-group",
                                    params: {
                                        action: "pay-to-group",
                                        group_id: 25219667,
                                        description: "\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430 \u043f\u0440\u043e\u0435\u043a\u0442\u0430",
                                        amount: Math.abs(Number(this.state.rubles.replace(",", "."))),
                                        data: "donate"
                                    }
                                }), this.setState({
                                    vkpayerr: !1
                                }))
                            } else this.setState({
                                vkpayerr: !0
                            })
                        }
                    }, {
                        key: "save",
                        value: function(e) {
                            null === this.state.token ? (this.setState({
                                act: "repeat"
                            }), 0 === this.state.auth && (i.a.send("VKWebAppGetAuthToken", {
                                app_id: Number(this.state.api_id),
                                scope: ""
                            }), this.setState({
                                auth: 1
                            }))) : i.a.send("VKWebAppCallAPIMethod", {
                                method: "execute.save",
                                params: {
                                    value: e,
                                    v: "5.101",
                                    access_token: this.state.token
                                },
                                request_id: "save"
                            })
                        }
                    }, {
                        key: "render",
                        value: function() {
                            var e = this,
                                t = this.state,
                                a = t.numbers,
                                n = t.upper,
                                s = t.lower,
                                c = t.digit,
                                l = t.simvs,
                                o = t.upper_rus,
                                u = t.lower_rus,
                                p = t.platf,
                                d = t.api_id,
                                h = t.vkapp_id,
                                b = t.f,
                                m = t.done,
                                f = t.pass,
                                _ = t.err,
                                E = t.disabled,
                                S = t.is_app_user,
                                O = t.vkpayerr,
                                C = t.rubles,
                                T = t.copied,
                                P = t.security,
                                W = t.color,
                                M = t.agen;
                            return r.a.createElement(g.s, {
                                activePanel: "pass",
                                popout: this.state.popout
                            }, r.a.createElement(g.m, {
                                id: "pass"
                            }, r.a.createElement(g.n, null, "\u0413\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440 \u043f\u0430\u0440\u043e\u043b\u0435\u0439"), r.a.createElement(g.i, {
                                title: "\u041f\u0430\u0440\u043e\u043b\u044c"
                            }, r.a.createElement(g.e, {
                                style: {
                                    textAlign: "center",
                                    userSelect: "none"
                                }
                            }, "web" === window.location.search.slice(1, 4) ? r.a.createElement("b", {
                                className: "info"
                            }, "" === f ? "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043f \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432" : f.length > 50 ? f.substr(0, 50) : f, "" === f ? "" : f.length > 50 ? r.a.createElement("br", null) : "", r.a.createElement("nobr", null, "" === f ? "" : f.length > 50 ? f.substr(50, f.length) : "")) : r.a.createElement("b", {
                                className: "info"
                            }, "" === f ? "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043f \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432" : f.length > 25 ? f.substr(0, 25) : f, "" === f ? "" : f.length > 25 ? r.a.createElement("br", null) : "", r.a.createElement("nobr", null, "" === f ? "" : f.length > 25 ? f.substr(25, f.length) : "")), "" !== f ? r.a.createElement(g.k, {
                                title: "\u041d\u0430\u0434\u0451\u0436\u043d\u043e\u0441\u0442\u044c",
                                style: "web" === window.location.search.slice(1, 4) && f.length > 50 || "web" !== window.location.search.slice(1, 4) && f.length > 25 ? {
                                    paddingTop: "15px"
                                } : {
                                    paddingTop: "15px",
                                    margin: "18px 0px 0px 0px"
                                },
                                className: "info"
                            }, r.a.createElement(g.o, {
                                value: P,
                                className: W
                            })) : ""), r.a.createElement(g.e, {
                                style: {
                                    display: "flex"
                                }
                            }, r.a.createElement(v.CopyToClipboard, {
                                text: f,
                                onCopy: function() {
                                    e.setState({
                                        copied: !0
                                    }), "mobile_iphone" === p && i.a.send("VKWebAppTapticNotificationOccurred", {
                                        type: "success"
                                    })
                                }
                            }, r.a.createElement(g.b, {
                                size: "l",
                                stretched: !0,
                                level: "outline",
                                before: T ? r.a.createElement(K.a, {
                                    fill: "#4bb34b"
                                }) : r.a.createElement(x.a, null),
                                style: T ? {
                                    marginRight: 8,
                                    color: "#4bb34b"
                                } : {
                                    marginRight: 8
                                },
                                disabled: T
                            }, "\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c")), r.a.createElement(g.b, {
                                size: "l",
                                stretched: !0,
                                level: "commerce",
                                before: "desktop_web" === p ? r.a.createElement(j.a, null) : "",
                                onClick: function() {
                                    e.genPass(a, n, s, c, l, o, u, !0)
                                },
                                disabled: E
                            }, "\u0413\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c"))), r.a.createElement(g.i, {
                                title: "\u0425\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438 \u043f\u0430\u0440\u043e\u043b\u044f"
                            }, r.a.createElement(g.f, null, "web" === window.location.search.slice(1, 4) ? r.a.createElement(g.p, {
                                onChange: function(t) {
                                    e.setState({
                                        numbers: Number(t.target.value)
                                    }), e.genPass(Number(t.target.value), n, s, c, l, o, u)
                                },
                                value: String(this.state.numbers),
                                top: "\u0427\u0438\u0441\u043b\u043e \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 \u0432 \u043f\u0430\u0440\u043e\u043b\u0435:",
                                alignment: "center"
                            }, this.options()) : r.a.createElement(g.q, {
                                step: 1,
                                min: 6,
                                max: 50,
                                value: Number(a),
                                onChange: function(t) {
                                    t !== a && (e.setState({
                                        numbers: t
                                    }), e.genPass(t, n, s, c, l, o, u))
                                },
                                top: r.a.createElement("nobr", null, "\u0427\u0438\u0441\u043b\u043e \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 \u0432 \u043f\u0430\u0440\u043e\u043b\u0435: ", r.a.createElement("b", null, a))
                            }), r.a.createElement(g.g, {
                                top: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0432 \u043f\u0430\u0440\u043e\u043b\u0435:"
                            }, _ && r.a.createElement(g.h, {
                                state: "error"
                            }, "\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0438\u043f \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"), r.a.createElement(g.d, {
                                checked: n,
                                onChange: function(t) {
                                    e.setState({
                                        upper: t.currentTarget.checked
                                    }), e.genPass(a, t.currentTarget.checked, s, c, l, o, u)
                                }
                            }, "\u0417\u0430\u0433\u043b\u0430\u0432\u043d\u044b\u0435 \u0431\u0443\u043a\u0432\u044b (A-Z)"), r.a.createElement(g.d, {
                                checked: s,
                                onChange: function(t) {
                                    e.setState({
                                        lower: t.currentTarget.checked
                                    }), e.genPass(a, n, t.currentTarget.checked, c, l, o, u)
                                }
                            }, "\u0421\u0442\u0440\u043e\u0447\u043d\u044b\u0435 \u0431\u0443\u043a\u0432\u044b (a-z)"), r.a.createElement(g.d, {
                                checked: o,
                                onChange: function(t) {
                                    e.setState({
                                        upper_rus: t.currentTarget.checked
                                    }), e.genPass(a, n, s, c, l, t.currentTarget.checked, u)
                                }
                            }, "\u0417\u0430\u0433\u043b\u0430\u0432\u043d\u044b\u0435 \u0431\u0443\u043a\u0432\u044b (\u0410-\u042f)"), r.a.createElement(g.d, {
                                checked: u,
                                onChange: function(t) {
                                    e.setState({
                                        lower_rus: t.currentTarget.checked
                                    }), e.genPass(a, n, s, c, l, o, t.currentTarget.checked)
                                }
                            }, "\u0421\u0442\u0440\u043e\u0447\u043d\u044b\u0435 \u0431\u0443\u043a\u0432\u044b (\u0430-\u044f)"), r.a.createElement(g.d, {
                                checked: c,
                                onChange: function(t) {
                                    e.setState({
                                        digit: t.currentTarget.checked
                                    }), e.genPass(a, n, s, t.currentTarget.checked, l, o, u)
                                }
                            }, "\u0426\u0438\u0444\u0440\u044b (0-9)"), r.a.createElement(g.d, {
                                checked: l,
                                onChange: function(t) {
                                    e.setState({
                                        simvs: t.currentTarget.checked
                                    }), e.genPass(a, n, s, c, t.currentTarget.checked, o, u)
                                }
                            }, "\u0421\u0438\u043c\u0432\u043e\u043b\u044b (! @ # $ % ^ & * ( ) [ ] { } < >)")))), r.a.createElement(g.i, {
                                title: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"
                            }, r.a.createElement(g.c, {
                                asideContent: r.a.createElement(g.r, {
                                    checked: !M,
                                    onChange: function(t) {
                                        e.setState({
                                            agen: !t.currentTarget.checked
                                        }), e.save(!t.currentTarget.checked), t.currentTarget.checked && e.genPass(a, n, s, c, l, o, u, !0)
                                    },
                                    style: {
                                        cursor: "pointer"
                                    }
                                })
                            }, "\u041f\u0435\u0440\u0435\u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438")), "web" !== p && "mobile_iphone" !== p ? r.a.createElement(g.i, {
                                title: "\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442"
                            }, r.a.createElement(g.f, null, O && r.a.createElement(g.h, {
                                state: "error"
                            }, "\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u0441\u0443\u043c\u043c\u0443"), r.a.createElement(g.l, {
                                placeholder: "\u041c\u0438\u043d. 1 \u20bd, \u043c\u0430\u043a\u0441. 15 000 \u20bd",
                                name: "rubles",
                                value: C,
                                type: "mobile_android" === p || "mobile_web" === p ? "number" : "text",
                                alignment: "center",
                                inputMode: "decimal",
                                maxLength: "8",
                                onChange: this.onChange,
                                status: "" === C ? "default" : isNaN(C.replace(",", ".")) ? "error" : C.replace(",", ".") < 1 ? "error" : C.replace(",", ".") > 15e3 ? "error" : "valid",
                                bottom: "" === C ? "" : isNaN(C.replace(",", ".")) ? "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0443\u043c\u043c\u0443" : C.replace(",", ".") < 1 ? "\u041c\u0438\u043d\u0438\u043c\u0443\u043c 1 \u20bd" : C.replace(",", ".") > 15e3 ? "\u041d\u0435 \u0431\u043e\u043b\u0435\u0435 15 000 \u20bd" : "",
                                autoComplete: "off"
                            }), r.a.createElement(g.b, {
                                size: "xl",
                                level: "primary",
                                onClick: this.vkpay,
                                disabled: O
                            }, "\u041f\u043e\u0436\u0435\u0440\u0442\u0432\u043e\u0432\u0430\u0442\u044c"))) : "", "web" === p ? r.a.createElement(g.b, {
                                align: "center",
                                component: "a",
                                target: "_blank",
                                href: "https://vk.com/app6940387",
                                before: r.a.createElement(y.a, null),
                                size: "xl",
                                level: "tertiary"
                            }, "\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f (VK Mini Apps)") : "", 0 !== d ? r.a.createElement(k.Online, null, r.a.createElement(g.e, {
                                className: "footer"
                            }, m || "0" !== S ? "" : r.a.createElement(g.b, {
                                level: "tertiary",
                                before: 1 === b ? r.a.createElement(K.a, {
                                    fill: "#4bb34b"
                                }) : r.a.createElement(V.a, null),
                                onClick: this.fave,
                                style: 1 === b ? {
                                    color: "#4bb34b"
                                } : {}
                            }, 1 === b ? "\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e" : "\u0412 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435"), r.a.createElement(g.b, {
                                level: "tertiary",
                                before: r.a.createElement(N.a, null),
                                onClick: this.share
                            }, "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f"))) : "", r.a.createElement(g.e, {
                                className: "footer"
                            }, d !== h ? r.a.createElement(g.b, {
                                level: "tertiary",
                                component: "a",
                                href: "//vk.me/codewiki",
                                target: "_blank",
                                before: r.a.createElement(w.a, null)
                            }, "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c") : "", d !== h ? r.a.createElement(g.b, {
                                level: "tertiary",
                                component: "a",
                                href: "//vk.com/codewiki",
                                target: "_blank",
                                before: r.a.createElement(A.a, null)
                            }, "\u0421\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e") : ""), d !== h ? r.a.createElement(g.e, {
                                className: "footer"
                            }, r.a.createElement(g.b, {
                                level: "tertiary",
                                before: r.a.createElement(j.a, null),
                                onClick: this.switch_scheme
                            }, "\u0426\u0432\u0435\u0442\u043e\u0432\u0430\u044f \u0441\u0445\u0435\u043c\u0430")) : ""))
                        }
                    }]), t
                }(r.a.Component)),
                I = a(88),
                Q = a.n(I);
            i.a.send("VKWebAppInit", {});
            var R = Object(g.t)(),
                z = document.getElementById("root");
            R === g.j && Q()(z), c.a.render(r.a.createElement(M, null), z)
        }
    },
    [
        [139, 1, 2]
    ]
]);