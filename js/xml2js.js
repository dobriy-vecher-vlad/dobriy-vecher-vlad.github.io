! function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.X2JS = t()
}(this, function() {
    return function(m) {
        "use strict";
        m = m || {},
            function() {
                void 0 === m.escapeMode && (m.escapeMode = !0);
                m.attributePrefix = m.attributePrefix || "_", m.arrayAccessForm = m.arrayAccessForm || "none", m.emptyNodeForm = m.emptyNodeForm || "text", void 0 === m.enableToStringFunc && (m.enableToStringFunc = !0);
                m.arrayAccessFormPaths = m.arrayAccessFormPaths || [], void 0 === m.skipEmptyTextNodesForObj && (m.skipEmptyTextNodesForObj = !0);
                void 0 === m.stripWhitespaces && (m.stripWhitespaces = !0);
                m.datetimeAccessFormPaths = m.datetimeAccessFormPaths || [], void 0 === m.useDoubleQuotes && (m.useDoubleQuotes = !1);
                m.xmlElementsFilter = m.xmlElementsFilter || [], m.jsonPropertiesFilter = m.jsonPropertiesFilter || [], void 0 === m.keepCData && (m.keepCData = !1)
            }();
        var x = {
            ELEMENT_NODE: 1,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9
        };

        function g(e) {
            var t = e.localName;
            return null == t && (t = e.baseName), null != t && "" != t || (t = e.nodeName), t
        }

        function l(e) {
            return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") : e
        }

        function h(e, t, n, r) {
            for (var i = 0; i < e.length; i++) {
                var a = e[i];
                if ("string" == typeof a) {
                    if (a == r) break
                } else if (a instanceof RegExp) {
                    if (a.test(r)) break
                } else if ("function" == typeof a && a(t, n, r)) break
            }
            return i != e.length
        }

        function y(e, t, n) {
            switch (m.arrayAccessForm) {
                case "property":
                    e[t] instanceof Array ? e[t + "_asArray"] = e[t] : e[t + "_asArray"] = [e[t]]
            }!(e[t] instanceof Array) && 0 < m.arrayAccessFormPaths.length && h(m.arrayAccessFormPaths, e, t, n) && (e[t] = [e[t]])
        }

        function O(e) {
            var t = e.split(/[-T:+Z]/g),
                n = new Date(t[0], t[1] - 1, t[2]),
                r = t[5].split(".");
            if (n.setHours(t[3], t[4], r[0]), 1 < r.length && n.setMilliseconds(r[1]), t[6] && t[7]) {
                var i = 60 * t[6] + Number(t[7]);
                i = 0 + ("-" == (/\d\d-\d\d:\d\d$/.test(e) ? "-" : "+") ? -1 * i : i), n.setMinutes(n.getMinutes() - i - n.getTimezoneOffset())
            } else -1 !== e.indexOf("Z", e.length - 1) && (n = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds())));
            return n
        }

        function v(e, t) {
            if (e.nodeType == x.DOCUMENT_NODE) {
                for (var n = new Object, r = e.childNodes, i = 0; i < r.length; i++) {
                    if ((a = r.item(i)).nodeType == x.ELEMENT_NODE) n[s = g(a)] = v(a, s)
                }
                return n
            }
            if (e.nodeType == x.ELEMENT_NODE) {
                (n = new Object).__cnt = 0;
                for (r = e.childNodes, i = 0; i < r.length; i++) {
                    var a, s = g(a = r.item(i));
                    if (a.nodeType != x.COMMENT_NODE) {
                        var o = t + "." + s;
                        f = n, _ = a.nodeType, d = s, p = o, _ == x.ELEMENT_NODE && 0 < m.xmlElementsFilter.length && !h(m.xmlElementsFilter, f, d, p) || (n.__cnt++, null == n[s] ? (n[s] = v(a, o), y(n, s, o)) : (null != n[s] && (n[s] instanceof Array || (n[s] = [n[s]], y(n, s, o))), n[s][n[s].length] = v(a, o)))
                    }
                }
                for (var l = 0; l < e.attributes.length; l++) {
                    var c = e.attributes.item(l);
                    n.__cnt++, n[m.attributePrefix + c.name] = c.value
                }
                var u = function(e) {
                    return e.prefix
                }(e);
                return null != u && "" != u && (n.__cnt++, n.__prefix = u), null != n["#text"] && (n.__text = n["#text"], n.__text instanceof Array && (n.__text = n.__text.join("\n")), m.stripWhitespaces && (n.__text = n.__text.trim()), delete n["#text"], "property" == m.arrayAccessForm && delete n["#text_asArray"], n.__text = function(e, t, n) {
                    if (0 < m.datetimeAccessFormPaths.length) {
                        var r = n.split(".#")[0];
                        return h(m.datetimeAccessFormPaths, e, t, r) ? O(e) : e
                    }
                    return e
                }(n.__text, s, t + "." + s)), null != n["#cdata-section"] && (n.__cdata = n["#cdata-section"], delete n["#cdata-section"], "property" == m.arrayAccessForm && delete n["#cdata-section_asArray"]), 0 == n.__cnt && "text" == m.emptyNodeForm ? n = "" : 1 == n.__cnt && null != n.__text ? n = n.__text : 1 != n.__cnt || null == n.__cdata || m.keepCData ? 1 < n.__cnt && null != n.__text && m.skipEmptyTextNodesForObj && (m.stripWhitespaces && "" == n.__text || "" == n.__text.trim()) && delete n.__text : n = n.__cdata, delete n.__cnt, !m.enableToStringFunc || null == n.__text && null == n.__cdata || (n.toString = function() {
                    return (null != this.__text ? this.__text : "") + (null != this.__cdata ? this.__cdata : "")
                }), n
            }
            if (e.nodeType == x.TEXT_NODE || e.nodeType == x.CDATA_SECTION_NODE) return e.nodeValue;
            var f, _, d, p
        }

        function c(e, t, n, r) {
            var i = "<" + (null != e && null != e.__prefix ? e.__prefix + ":" : "") + t;
            if (null != n)
                for (var a = 0; a < n.length; a++) {
                    var s = n[a],
                        o = e[s];
                    m.escapeMode && (o = l(o)), i += " " + s.substr(m.attributePrefix.length) + "=", m.useDoubleQuotes ? i += '"' + o + '"' : i += "'" + o + "'"
                }
            return i += r ? "/>" : ">"
        }

        function u(e, t) {
            return "</" + (null != e.__prefix ? e.__prefix + ":" : "") + t + ">"
        }

        function f(e, t) {
            return !!("property" == m.arrayAccessForm && function(e, t) {
                return -1 !== e.indexOf(t, e.length - t.length)
            }(t.toString(), "_asArray") || 0 == t.toString().indexOf(m.attributePrefix) || 0 == t.toString().indexOf("__") || e[t] instanceof Function)
        }

        function _(e) {
            var t = 0;
            if (e instanceof Object)
                for (var n in e) f(e, n) || t++;
            return t
        }

        function d(e) {
            var t = [];
            if (e instanceof Object)
                for (var n in e) - 1 == n.toString().indexOf("__") && 0 == n.toString().indexOf(m.attributePrefix) && t.push(n);
            return t
        }

        function p(e) {
            var t = "";
            return e instanceof Object ? t += function(e) {
                var t = "";
                return null != e.__cdata && (t += "<![CDATA[" + e.__cdata + "]]>"), null != e.__text && (m.escapeMode ? t += l(e.__text) : t += e.__text), t
            }(e) : null != e && (m.escapeMode ? t += l(e) : t += e), t
        }

        function E(e, t) {
            return "" === e ? t : e + "." + t
        }

        function N(e, t, n, r) {
            var i = "";
            if (0 == e.length) i += c(e, t, n, !0);
            else
                for (var a = 0; a < e.length; a++) i += c(e[a], t, d(e[a]), !1), i += T(e[a], E(r, t)), i += u(e[a], t);
            return i
        }

        function T(e, t) {
            var n, r, i, a = "";
            if (0 < _(e))
                for (var s in e)
                    if (!f(e, s) && ("" == t || (n = e, i = E(t, r = s), 0 == m.jsonPropertiesFilter.length || "" == i || h(m.jsonPropertiesFilter, n, r, i)))) {
                        var o = e[s],
                            l = d(o);
                        if (null == o || null == o) a += c(o, s, l, !0);
                        else if (o instanceof Object)
                            if (o instanceof Array) a += N(o, s, l, t);
                            else if (o instanceof Date) a += c(o, s, l, !1), a += o.toISOString(), a += u(o, s);
                        else {
                            0 < _(o) || null != o.__text || null != o.__cdata ? (a += c(o, s, l, !1), a += T(o, E(t, s)), a += u(o, s)) : a += c(o, s, l, !0)
                        } else a += c(o, s, l, !1), a += p(o), a += u(o, s)
                    } return a += p(e)
        }
        this.parseXmlString = function(e) {
            var t, n = window.ActiveXObject || "ActiveXObject" in window;
            if (void 0 === e) return null;
            if (window.DOMParser) {
                var r = new window.DOMParser,
                    i = null;
                if (!n) try {
                    i = r.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI
                } catch (e) {
                    i = null
                }
                try {
                    t = r.parseFromString(e, "text/xml"), null != i && 0 < t.getElementsByTagNameNS(i, "parsererror").length && (t = null)
                } catch (e) {
                    t = null
                }
            } else 0 == e.indexOf("<?") && (e = e.substr(e.indexOf("?>") + 2)), (t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e);
            return t
        }, this.asArray = function(e) {
            return void 0 === e || null == e ? [] : e instanceof Array ? e : [e]
        }, this.toXmlDateTime = function(e) {
            return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null
        }, this.asDateTime = function(e) {
            return "string" == typeof e ? O(e) : e
        }, this.xml2json = function(e) {
            return v(e)
        }, this.xml_str2json = function(e) {
            var t = this.parseXmlString(e);
            return null != t ? this.xml2json(t) : null
        }, this.json2xml_str = function(e) {
            return T(e, "")
        }, this.json2xml = function(e) {
            var t = this.json2xml_str(e);
            return this.parseXmlString(t)
        }, this.getVersion = function() {
            return "1.2.0"
        }
    }
});