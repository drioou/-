$(".click").on("click",function(){
    $(".signup-form").toggleClass("animate")
});
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        require("./plugins"), require("gsap");
        var _ = require("underscore"),
            Backbone = require("backbone");
        Backbone.$ = $;
        var PubSub = require("simple-pubsub"),
            imagesLoaded = require("imagesloaded"),
            Helpers = require("./helpers"),
            Features = require("./features"),
            BgVideo = require("./bgvideo"),
            Sound = require("./sound"),
            Logo = require("./logo"),
            StartBttn = require("./startbttn"),
            BbForm = require("./bbform"),
            Particles = require("./particles"),
            onWindowResize = _.debounce(function() {
                PubSub.trigger("window:resize", Helpers.getWindowSize())
            }, 100);
        $(window).on("resize", onWindowResize), $(function() {
            imagesLoaded($("#preload")[0], function() {
                var e = new BgVideo({
                        src: [{
                            src: "",
                            type: "video/mp4"
                        }]
                    }),
                    r = $("body > footer");
                if (TweenLite.set(e.$el, {
                        opacity: 0
                    }), TweenLite.set(r, {
                        opacity: 0
                    }), TweenLite.to(e.$el, .8, {
                        opacity: 1,
                        ease: Sine.easeOut,
                        onComplete: function() {
                            PubSub.trigger("content:visible"), TweenLite.to(r, .8, {
                                opacity: 1,
                                ease: Sine.easeOut
                            })
                        }
                    }), !(Features.isTouch && (Features.isIOS || Features.isAndroid) || Features.isMobile)) {
                    var i = $(".sound-control");
                    i.css("display", "block"), new Sound({
                        el: i[0],
                        src: ["/assets/media/bluebook_bg_sound.mp3"]
                    })
                }
                new Logo({
                    el: $(".site-header")
                }), new StartBttn({
                    el: $(".signup-start")
                }), new BbForm({
                    el: $(".signup-form")
                }), new Particles
            })
        });
    }, {
        "./bbform": 21,
        "./bgvideo": 24,
        "./features": 25,
        "./helpers": 27,
        "./logo": 29,
        "./particles": 31,
        "./plugins": 32,
        "./sound": 33,
        "./startbttn": 34,
        "backbone": 2,
        "gsap": 4,
        "imagesloaded": 13,
        "simple-pubsub": 16,
        "underscore": 19
    }],
    2: [function(require, module, exports) {
        ! function(t, e) {
            if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(i, n, s) {
                t.Backbone = e(t, s, i, n)
            });
            else if ("undefined" != typeof exports) {
                var i = require("underscore");
                e(t, exports, i)
            } else t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
        }(this, function(t, e, i, n) {
            {
                var s = t.Backbone,
                    r = [],
                    a = (r.push, r.slice);
                r.splice
            }
            e.VERSION = "1.1.2", e.$ = n, e.noConflict = function() {
                return t.Backbone = s, this
            }, e.emulateHTTP = !1, e.emulateJSON = !1;
            var o = e.Events = {
                    on: function(t, e, i) {
                        if (!u(this, "on", t, [e, i]) || !e) return this;
                        this._events || (this._events = {});
                        var n = this._events[t] || (this._events[t] = []);
                        return n.push({
                            callback: e,
                            context: i,
                            ctx: i || this
                        }), this
                    },
                    once: function(t, e, n) {
                        if (!u(this, "once", t, [e, n]) || !e) return this;
                        var s = this,
                            r = i.once(function() {
                                s.off(t, r), e.apply(this, arguments)
                            });
                        return r._callback = e, this.on(t, r, n)
                    },
                    off: function(t, e, n) {
                        var s, r, a, o, h, c, l, d;
                        if (!this._events || !u(this, "off", t, [e, n])) return this;
                        if (!t && !e && !n) return this._events = void 0, this;
                        for (o = t ? [t] : i.keys(this._events), h = 0, c = o.length; c > h; h++)
                            if (t = o[h], a = this._events[t]) {
                                if (this._events[t] = s = [], e || n)
                                    for (l = 0, d = a.length; d > l; l++) r = a[l], (e && e !== r.callback && e !== r.callback._callback || n && n !== r.context) && s.push(r);
                                s.length || delete this._events[t]
                            }
                        return this
                    },
                    trigger: function(t) {
                        if (!this._events) return this;
                        var e = a.call(arguments, 1);
                        if (!u(this, "trigger", t, e)) return this;
                        var i = this._events[t],
                            n = this._events.all;
                        return i && c(i, e), n && c(n, arguments), this
                    },
                    stopListening: function(t, e, n) {
                        var s = this._listeningTo;
                        if (!s) return this;
                        var r = !e && !n;
                        n || "object" != typeof e || (n = this), t && ((s = {})[t._listenId] = t);
                        for (var a in s) t = s[a], t.off(e, n, this), (r || i.isEmpty(t._events)) && delete this._listeningTo[a];
                        return this
                    }
                },
                h = /\s+/,
                u = function(t, e, i, n) {
                    if (!i) return !0;
                    if ("object" == typeof i) {
                        for (var s in i) t[e].apply(t, [s, i[s]].concat(n));
                        return !1
                    }
                    if (h.test(i)) {
                        for (var r = i.split(h), a = 0, o = r.length; o > a; a++) t[e].apply(t, [r[a]].concat(n));
                        return !1
                    }
                    return !0
                },
                c = function(t, e) {
                    var i, n = -1,
                        s = t.length,
                        r = e[0],
                        a = e[1],
                        o = e[2];
                    switch (e.length) {
                        case 0:
                            for (; ++n < s;)(i = t[n]).callback.call(i.ctx);
                            return;
                        case 1:
                            for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r);
                            return;
                        case 2:
                            for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, a);
                            return;
                        case 3:
                            for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, a, o);
                            return;
                        default:
                            for (; ++n < s;)(i = t[n]).callback.apply(i.ctx, e);
                            return
                    }
                },
                l = {
                    listenTo: "on",
                    listenToOnce: "once"
                };
            i.each(l, function(t, e) {
                o[e] = function(e, n, s) {
                    var r = this._listeningTo || (this._listeningTo = {}),
                        a = e._listenId || (e._listenId = i.uniqueId("l"));
                    return r[a] = e, s || "object" != typeof n || (s = this), e[t](n, s, this), this
                }
            }), o.bind = o.on, o.unbind = o.off, i.extend(e, o);
            var d = e.Model = function(t, e) {
                var n = t || {};
                e || (e = {}), this.cid = i.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {}), n = i.defaults({}, n, i.result(this, "defaults")), this.set(n, e), this.changed = {}, this.initialize.apply(this, arguments)
            };
            i.extend(d.prototype, o, {
                changed: null,
                validationError: null,
                idAttribute: "id",
                initialize: function() {},
                toJSON: function() {
                    return i.clone(this.attributes)
                },
                sync: function() {
                    return e.sync.apply(this, arguments)
                },
                get: function(t) {
                    return this.attributes[t]
                },
                escape: function(t) {
                    return i.escape(this.get(t))
                },
                has: function(t) {
                    return null != this.get(t)
                },
                set: function(t, e, n) {
                    var s, r, a, o, h, u, c, l;
                    if (null == t) return this;
                    if ("object" == typeof t ? (r = t, n = e) : (r = {})[t] = e, n || (n = {}), !this._validate(r, n)) return !1;
                    a = n.unset, h = n.silent, o = [], u = this._changing, this._changing = !0, u || (this._previousAttributes = i.clone(this.attributes), this.changed = {}), l = this.attributes, c = this._previousAttributes, this.idAttribute in r && (this.id = r[this.idAttribute]);
                    for (s in r) e = r[s], i.isEqual(l[s], e) || o.push(s), i.isEqual(c[s], e) ? delete this.changed[s] : this.changed[s] = e, a ? delete l[s] : l[s] = e;
                    if (!h) {
                        o.length && (this._pending = n);
                        for (var d = 0, f = o.length; f > d; d++) this.trigger("change:" + o[d], this, l[o[d]], n)
                    }
                    if (u) return this;
                    if (!h)
                        for (; this._pending;) n = this._pending, this._pending = !1, this.trigger("change", this, n);
                    return this._pending = !1, this._changing = !1, this
                },
                unset: function(t, e) {
                    return this.set(t, void 0, i.extend({}, e, {
                        unset: !0
                    }))
                },
                clear: function(t) {
                    var e = {};
                    for (var n in this.attributes) e[n] = void 0;
                    return this.set(e, i.extend({}, t, {
                        unset: !0
                    }))
                },
                hasChanged: function(t) {
                    return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
                },
                changedAttributes: function(t) {
                    if (!t) return this.hasChanged() ? i.clone(this.changed) : !1;
                    var e, n = !1,
                        s = this._changing ? this._previousAttributes : this.attributes;
                    for (var r in t) i.isEqual(s[r], e = t[r]) || ((n || (n = {}))[r] = e);
                    return n
                },
                previous: function(t) {
                    return null != t && this._previousAttributes ? this._previousAttributes[t] : null
                },
                previousAttributes: function() {
                    return i.clone(this._previousAttributes)
                },
                fetch: function(t) {
                    t = t ? i.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                    var e = this,
                        n = t.success;
                    return t.success = function(i) {
                        return e.set(e.parse(i, t), t) ? (n && n(e, i, t), void e.trigger("sync", e, i, t)) : !1
                    }, U(this, t), this.sync("read", this, t)
                },
                save: function(t, e, n) {
                    var s, r, a, o = this.attributes;
                    if (null == t || "object" == typeof t ? (s = t, n = e) : (s = {})[t] = e, n = i.extend({
                            validate: !0
                        }, n), s && !n.wait) {
                        if (!this.set(s, n)) return !1
                    } else if (!this._validate(s, n)) return !1;
                    s && n.wait && (this.attributes = i.extend({}, o, s)), void 0 === n.parse && (n.parse = !0);
                    var h = this,
                        u = n.success;
                    return n.success = function(t) {
                        h.attributes = o;
                        var e = h.parse(t, n);
                        return n.wait && (e = i.extend(s || {}, e)), i.isObject(e) && !h.set(e, n) ? !1 : (u && u(h, t, n), void h.trigger("sync", h, t, n))
                    }, U(this, n), r = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === r && (n.attrs = s), a = this.sync(r, this, n), s && n.wait && (this.attributes = o), a
                },
                destroy: function(t) {
                    t = t ? i.clone(t) : {};
                    var e = this,
                        n = t.success,
                        s = function() {
                            e.trigger("destroy", e, e.collection, t)
                        };
                    if (t.success = function(i) {
                            (t.wait || e.isNew()) && s(), n && n(e, i, t), e.isNew() || e.trigger("sync", e, i, t)
                        }, this.isNew()) return t.success(), !1;
                    U(this, t);
                    var r = this.sync("delete", this, t);
                    return t.wait || s(), r
                },
                url: function() {
                    var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || j();
                    return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
                },
                parse: function(t) {
                    return t
                },
                clone: function() {
                    return new this.constructor(this.attributes)
                },
                isNew: function() {
                    return !this.has(this.idAttribute)
                },
                isValid: function(t) {
                    return this._validate({}, i.extend(t || {}, {
                        validate: !0
                    }))
                },
                _validate: function(t, e) {
                    if (!e.validate || !this.validate) return !0;
                    t = i.extend({}, this.attributes, t);
                    var n = this.validationError = this.validate(t, e) || null;
                    return n ? (this.trigger("invalid", this, n, i.extend(e, {
                        validationError: n
                    })), !1) : !0
                }
            });
            var f = ["keys", "values", "pairs", "invert", "pick", "omit"];
            i.each(f, function(t) {
                d.prototype[t] = function() {
                    var e = a.call(arguments);
                    return e.unshift(this.attributes), i[t].apply(i, e)
                }
            });
            var p = e.Collection = function(t, e) {
                    e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, i.extend({
                        silent: !0
                    }, e))
                },
                g = {
                    add: !0,
                    remove: !0,
                    merge: !0
                },
                v = {
                    add: !0,
                    remove: !1
                };
            i.extend(p.prototype, o, {
                model: d,
                initialize: function() {},
                toJSON: function(t) {
                    return this.map(function(e) {
                        return e.toJSON(t)
                    })
                },
                sync: function() {
                    return e.sync.apply(this, arguments)
                },
                add: function(t, e) {
                    return this.set(t, i.extend({
                        merge: !1
                    }, e, v))
                },
                remove: function(t, e) {
                    var n = !i.isArray(t);
                    t = n ? [t] : i.clone(t), e || (e = {});
                    var s, r, a, o;
                    for (s = 0, r = t.length; r > s; s++) o = t[s] = this.get(t[s]), o && (delete this._byId[o.id], delete this._byId[o.cid], a = this.indexOf(o), this.models.splice(a, 1), this.length--, e.silent || (e.index = a, o.trigger("remove", o, this, e)), this._removeReference(o, e));
                    return n ? t[0] : t
                },
                set: function(t, e) {
                    e = i.defaults({}, e, g), e.parse && (t = this.parse(t, e));
                    var n = !i.isArray(t);
                    t = n ? t ? [t] : [] : i.clone(t);
                    var s, r, a, o, h, u, c, l = e.at,
                        f = this.model,
                        p = this.comparator && null == l && e.sort !== !1,
                        v = i.isString(this.comparator) ? this.comparator : null,
                        m = [],
                        y = [],
                        _ = {},
                        b = e.add,
                        w = e.merge,
                        x = e.remove,
                        E = !p && b && x ? [] : !1;
                    for (s = 0, r = t.length; r > s; s++) {
                        if (h = t[s] || {}, a = h instanceof d ? o = h : h[f.prototype.idAttribute || "id"], u = this.get(a)) x && (_[u.cid] = !0), w && (h = h === o ? o.attributes : h, e.parse && (h = u.parse(h, e)), u.set(h, e), p && !c && u.hasChanged(v) && (c = !0)), t[s] = u;
                        else if (b) {
                            if (o = t[s] = this._prepareModel(h, e), !o) continue;
                            m.push(o), this._addReference(o, e)
                        }
                        o = u || o, !E || !o.isNew() && _[o.id] || E.push(o), _[o.id] = !0
                    }
                    if (x) {
                        for (s = 0, r = this.length; r > s; ++s) _[(o = this.models[s]).cid] || y.push(o);
                        y.length && this.remove(y, e)
                    }
                    if (m.length || E && E.length)
                        if (p && (c = !0), this.length += m.length, null != l)
                            for (s = 0, r = m.length; r > s; s++) this.models.splice(l + s, 0, m[s]);
                        else {
                            E && (this.models.length = 0);
                            var k = E || m;
                            for (s = 0, r = k.length; r > s; s++) this.models.push(k[s])
                        }
                    if (c && this.sort({
                            silent: !0
                        }), !e.silent) {
                        for (s = 0, r = m.length; r > s; s++)(o = m[s]).trigger("add", o, this, e);
                        (c || E && E.length) && this.trigger("sort", this, e)
                    }
                    return n ? t[0] : t
                },
                reset: function(t, e) {
                    e || (e = {});
                    for (var n = 0, s = this.models.length; s > n; n++) this._removeReference(this.models[n], e);
                    return e.previousModels = this.models, this._reset(), t = this.add(t, i.extend({
                        silent: !0
                    }, e)), e.silent || this.trigger("reset", this, e), t
                },
                push: function(t, e) {
                    return this.add(t, i.extend({
                        at: this.length
                    }, e))
                },
                pop: function(t) {
                    var e = this.at(this.length - 1);
                    return this.remove(e, t), e
                },
                unshift: function(t, e) {
                    return this.add(t, i.extend({
                        at: 0
                    }, e))
                },
                shift: function(t) {
                    var e = this.at(0);
                    return this.remove(e, t), e
                },
                slice: function() {
                    return a.apply(this.models, arguments)
                },
                get: function(t) {
                    return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid]
                },
                at: function(t) {
                    return this.models[t]
                },
                where: function(t, e) {
                    return i.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) {
                        for (var i in t)
                            if (t[i] !== e.get(i)) return !1;
                        return !0
                    })
                },
                findWhere: function(t) {
                    return this.where(t, !0)
                },
                sort: function(t) {
                    if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                    return t || (t = {}), i.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(i.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
                },
                pluck: function(t) {
                    return i.invoke(this.models, "get", t)
                },
                fetch: function(t) {
                    t = t ? i.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                    var e = t.success,
                        n = this;
                    return t.success = function(i) {
                        var s = t.reset ? "reset" : "set";
                        n[s](i, t), e && e(n, i, t), n.trigger("sync", n, i, t)
                    }, U(this, t), this.sync("read", this, t)
                },
                create: function(t, e) {
                    if (e = e ? i.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
                    e.wait || this.add(t, e);
                    var n = this,
                        s = e.success;
                    return e.success = function(t, i) {
                        e.wait && n.add(t, e), s && s(t, i, e)
                    }, t.save(null, e), t
                },
                parse: function(t) {
                    return t
                },
                clone: function() {
                    return new this.constructor(this.models)
                },
                _reset: function() {
                    this.length = 0, this.models = [], this._byId = {}
                },
                _prepareModel: function(t, e) {
                    if (t instanceof d) return t;
                    e = e ? i.clone(e) : {}, e.collection = this;
                    var n = new this.model(t, e);
                    return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
                },
                _addReference: function(t) {
                    this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this)
                },
                _removeReference: function(t) {
                    this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
                },
                _onModelEvent: function(t, e, i, n) {
                    ("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
                }
            });
            var m = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
            i.each(m, function(t) {
                p.prototype[t] = function() {
                    var e = a.call(arguments);
                    return e.unshift(this.models), i[t].apply(i, e)
                }
            });
            var y = ["groupBy", "countBy", "sortBy", "indexBy"];
            i.each(y, function(t) {
                p.prototype[t] = function(e, n) {
                    var s = i.isFunction(e) ? e : function(t) {
                        return t.get(e)
                    };
                    return i[t](this.models, s, n)
                }
            });
            var _ = e.View = function(t) {
                    this.cid = i.uniqueId("view"), t || (t = {}), i.extend(this, i.pick(t, w)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
                },
                b = /^(\S+)\s*(.*)$/,
                w = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
            i.extend(_.prototype, o, {
                tagName: "div",
                $: function(t) {
                    return this.$el.find(t)
                },
                initialize: function() {},
                render: function() {
                    return this
                },
                remove: function() {
                    return this.$el.remove(), this.stopListening(), this
                },
                setElement: function(t, i) {
                    return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], i !== !1 && this.delegateEvents(), this
                },
                delegateEvents: function(t) {
                    if (!t && !(t = i.result(this, "events"))) return this;
                    this.undelegateEvents();
                    for (var e in t) {
                        var n = t[e];
                        if (i.isFunction(n) || (n = this[t[e]]), n) {
                            var s = e.match(b),
                                r = s[1],
                                a = s[2];
                            n = i.bind(n, this), r += ".delegateEvents" + this.cid, "" === a ? this.$el.on(r, n) : this.$el.on(r, a, n)
                        }
                    }
                    return this
                },
                undelegateEvents: function() {
                    return this.$el.off(".delegateEvents" + this.cid), this
                },
                _ensureElement: function() {
                    if (this.el) this.setElement(i.result(this, "el"), !1);
                    else {
                        var t = i.extend({}, i.result(this, "attributes"));
                        this.id && (t.id = i.result(this, "id")), this.className && (t["class"] = i.result(this, "className"));
                        var n = e.$("<" + i.result(this, "tagName") + ">").attr(t);
                        this.setElement(n, !1)
                    }
                }
            }), e.sync = function(t, n, s) {
                var r = E[t];
                i.defaults(s || (s = {}), {
                    emulateHTTP: e.emulateHTTP,
                    emulateJSON: e.emulateJSON
                });
                var a = {
                    type: r,
                    dataType: "json"
                };
                if (s.url || (a.url = i.result(n, "url") || j()), null != s.data || !n || "create" !== t && "update" !== t && "patch" !== t || (a.contentType = "application/json", a.data = JSON.stringify(s.attrs || n.toJSON(s))), s.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", a.data = a.data ? {
                        model: a.data
                    } : {}), s.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r)) {
                    a.type = "POST", s.emulateJSON && (a.data._method = r);
                    var o = s.beforeSend;
                    s.beforeSend = function(t) {
                        return t.setRequestHeader("X-HTTP-Method-Override", r), o ? o.apply(this, arguments) : void 0
                    }
                }
                "GET" === a.type || s.emulateJSON || (a.processData = !1), "PATCH" === a.type && x && (a.xhr = function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                });
                var h = s.xhr = e.ajax(i.extend(a, s));
                return n.trigger("request", n, h, s), h
            };
            var x = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
                E = {
                    create: "POST",
                    update: "PUT",
                    patch: "PATCH",
                    "delete": "DELETE",
                    read: "GET"
                };
            e.ajax = function() {
                return e.$.ajax.apply(e.$, arguments)
            };
            var k = e.Router = function(t) {
                    t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
                },
                T = /\((.*?)\)/g,
                $ = /(\(\?)?:\w+/g,
                S = /\*\w+/g,
                H = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            i.extend(k.prototype, o, {
                initialize: function() {},
                route: function(t, n, s) {
                    i.isRegExp(t) || (t = this._routeToRegExp(t)), i.isFunction(n) && (s = n, n = ""), s || (s = this[n]);
                    var r = this;
                    return e.history.route(t, function(i) {
                        var a = r._extractParameters(t, i);
                        r.execute(s, a), r.trigger.apply(r, ["route:" + n].concat(a)), r.trigger("route", n, a), e.history.trigger("route", r, n, a)
                    }), this
                },
                execute: function(t, e) {
                    t && t.apply(this, e)
                },
                navigate: function(t, i) {
                    return e.history.navigate(t, i), this
                },
                _bindRoutes: function() {
                    if (this.routes) {
                        this.routes = i.result(this, "routes");
                        for (var t, e = i.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
                    }
                },
                _routeToRegExp: function(t) {
                    return t = t.replace(H, "\\$&").replace(T, "(?:$1)?").replace($, function(t, e) {
                        return e ? t : "([^/?]+)"
                    }).replace(S, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
                },
                _extractParameters: function(t, e) {
                    var n = t.exec(e).slice(1);
                    return i.map(n, function(t, e) {
                        return e === n.length - 1 ? t || null : t ? decodeURIComponent(t) : null
                    })
                }
            });
            var A = e.History = function() {
                    this.handlers = [], i.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
                },
                I = /^[#\/]|\s+$/g,
                N = /^\/+|\/+$/g,
                R = /msie [\w.]+/,
                O = /\/$/,
                P = /#.*$/;
            A.started = !1, i.extend(A.prototype, o, {
                interval: 50,
                atRoot: function() {
                    return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
                },
                getHash: function(t) {
                    var e = (t || this).location.href.match(/#(.*)$/);
                    return e ? e[1] : ""
                },
                getFragment: function(t, e) {
                    if (null == t)
                        if (this._hasPushState || !this._wantsHashChange || e) {
                            t = decodeURI(this.location.pathname + this.location.search);
                            var i = this.root.replace(O, "");
                            t.indexOf(i) || (t = t.slice(i.length))
                        } else t = this.getHash();
                    return t.replace(I, "")
                },
                start: function(t) {
                    if (A.started) throw new Error("Backbone.history has already been started");
                    A.started = !0, this.options = i.extend({
                        root: "/"
                    }, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                    var n = this.getFragment(),
                        s = document.documentMode,
                        r = R.exec(navigator.userAgent.toLowerCase()) && (!s || 7 >= s);
                    if (this.root = ("/" + this.root + "/").replace(N, "/"), r && this._wantsHashChange) {
                        var a = e.$('<iframe src="javascript:0" tabindex="-1">');
                        this.iframe = a.hide().appendTo("body")[0].contentWindow, this.navigate(n)
                    }
                    this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = n;
                    var o = this.location;
                    if (this._wantsHashChange && this._wantsPushState) {
                        if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
                        this._hasPushState && this.atRoot() && o.hash && (this.fragment = this.getHash().replace(I, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
                    }
                    return this.options.silent ? void 0 : this.loadUrl()
                },
                stop: function() {
                    e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), A.started = !1
                },
                route: function(t, e) {
                    this.handlers.unshift({
                        route: t,
                        callback: e
                    })
                },
                checkUrl: function() {
                    var t = this.getFragment();
                    return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
                },
                loadUrl: function(t) {
                    return t = this.fragment = this.getFragment(t), i.any(this.handlers, function(e) {
                        return e.route.test(t) ? (e.callback(t), !0) : void 0
                    })
                },
                navigate: function(t, e) {
                    if (!A.started) return !1;
                    e && e !== !0 || (e = {
                        trigger: !!e
                    });
                    var i = this.root + (t = this.getFragment(t || ""));
                    if (t = t.replace(P, ""), this.fragment !== t) {
                        if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i);
                        else {
                            if (!this._wantsHashChange) return this.location.assign(i);
                            this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
                        }
                        return e.trigger ? this.loadUrl(t) : void 0
                    }
                },
                _updateHash: function(t, e, i) {
                    if (i) {
                        var n = t.href.replace(/(javascript:|#).*$/, "");
                        t.replace(n + "#" + e)
                    } else t.hash = "#" + e
                }
            }), e.history = new A;
            var C = function(t, e) {
                var n, s = this;
                n = t && i.has(t, "constructor") ? t.constructor : function() {
                    return s.apply(this, arguments)
                }, i.extend(n, s, e);
                var r = function() {
                    this.constructor = n
                };
                return r.prototype = s.prototype, n.prototype = new r, t && i.extend(n.prototype, t), n.__super__ = s.prototype, n
            };
            d.extend = p.extend = k.extend = _.extend = A.extend = C;
            var j = function() {
                    throw new Error('A "url" property or function must be specified')
                },
                U = function(t, e) {
                    var i = e.error;
                    e.error = function(n) {
                        i && i(t, n, e), t.trigger("error", t, n, e)
                    }
                };
            return e
        });


    }, {
        "underscore": 19
    }],
    3: [function(require, module, exports) {
        ! function(r) {
            "object" == typeof exports ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : window.BezierEasing = r()
        }(function() {
            function r(r, n, s, c) {
                function g(r, n) {
                    return 1 - 3 * n + 3 * r
                }

                function v(r, n) {
                    return 3 * n - 6 * r
                }

                function w(r) {
                    return 3 * r
                }

                function m(r, n, e) {
                    return ((g(n, e) * r + v(n, e)) * r + w(n)) * r
                }

                function l(r, n, e) {
                    return 3 * g(n, e) * r * r + 2 * v(n, e) * r + w(n)
                }

                function d(n, t) {
                    for (var i = 0; e > i; ++i) {
                        var u = l(t, r, s);
                        if (0 === u) return t;
                        var o = m(t, r, s) - n;
                        t -= o / u
                    }
                    return t
                }

                function h() {
                    for (var n = 0; o > n; ++n) p[n] = m(n * a, r, s)
                }

                function y(n, e, t) {
                    var o, a, f = 0;
                    do a = e + (t - e) / 2, o = m(a, r, s) - n, o > 0 ? t = a : e = a; while (Math.abs(o) > i && ++f < u);
                    return a
                }

                function E(n) {
                    for (var e = 0, i = 1, u = o - 1; i != u && p[i] <= n; ++i) e += a;
                    --i;
                    var f = (n - p[i]) / (p[i + 1] - p[i]),
                        c = e + f * a,
                        g = l(c, r, s);
                    return g >= t ? d(n, c) : 0 === g ? c : y(n, e, e + a)
                }

                function b() {
                    x = !0, (r != n || s != c) && h()
                }
                if (4 !== arguments.length) throw new Error("BezierEasing requires 4 arguments.");
                for (var z = 0; 4 > z; ++z)
                    if ("number" != typeof arguments[z] || isNaN(arguments[z]) || !isFinite(arguments[z])) throw new Error("BezierEasing arguments should be integers.");
                if (0 > r || r > 1 || 0 > s || s > 1) throw new Error("BezierEasing x values must be in [0, 1] range.");
                var p = f ? new Float32Array(o) : new Array(o),
                    x = !1,
                    B = function(e) {
                        return x || b(), r === n && s === c ? e : 0 === e ? 0 : 1 === e ? 1 : m(E(e), n, c)
                    };
                B.getControlPoints = function() {
                    return [{
                        x: r,
                        y: n
                    }, {
                        x: s,
                        y: c
                    }]
                };
                var A = [r, n, s, c],
                    F = "BezierEasing(" + A + ")";
                B.toString = function() {
                    return F
                };
                var S = "cubic-bezier(" + A + ")";
                return B.toCSS = function() {
                    return S
                }, B
            }
            var n = this,
                e = 4,
                t = .001,
                i = 1e-7,
                u = 10,
                o = 11,
                a = 1 / (o - 1),
                f = "Float32Array" in n;
            return r.css = {
                ease: r(.25, .1, .25, 1),
                linear: r(0, 0, 1, 1),
                "ease-in": r(.42, 0, 1, 1),
                "ease-out": r(0, 0, .58, 1),
                "ease-in-out": r(.42, 0, .58, 1)
            }, r
        });


    }, {}],
    4: [function(require, module, exports) {
        (function(global) {
            var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
            (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
                    "use strict";
                    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                            var s = function(t) {
                                    var e, i = [],
                                        s = t.length;
                                    for (e = 0; e !== s; i.push(t[e++]));
                                    return i
                                },
                                r = function(t, e, s) {
                                    i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
                                },
                                n = 1e-10,
                                a = i._internals,
                                o = a.isSelector,
                                h = a.isArray,
                                l = r.prototype = i.to({}, .1, {}),
                                _ = [];
                            r.version = "1.15.1", l.constructor = r, l.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, l.invalidate = function() {
                                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                            }, l.updateTo = function(t, e) {
                                var s, r = this.ratio,
                                    n = this.vars.immediateRender || t.immediateRender;
                                e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                                for (s in t) this.vars[s] = t[s];
                                if (this._initted || n)
                                    if (e) this._initted = !1, n && this.render(0, !0, !0);
                                    else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                                    var a = this._time;
                                    this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
                                } else if (this._time > 0 || n) {
                                    this._initted = !1, this._init();
                                    for (var o, h = 1 / (1 - r), l = this._firstPT; l;) o = l.s + l.c, l.c *= h, l.s = o - l.c, l = l._next
                                }
                                return this
                            }, l.render = function(t, e, i) {
                                this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                                var s, r, o, h, l, u, p, c, f = this._dirty ? this.totalDuration() : this._totalDuration,
                                    d = this._time,
                                    m = this._totalTime,
                                    g = this._cycle,
                                    v = this._duration,
                                    y = this._rawPrevTime;
                                if (t >= f ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete"), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > y || y === n) && y !== t && (i = !0, y > n && (r = "onReverseComplete")), this._rawPrevTime = c = !e || t || y === t ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && y > 0 && y !== n) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = c = !e || t || y === t ? t : n)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = v + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : this._time < 0 && (this._time = 0)), this._easeType ? (l = this._time / v, u = this._easeType, p = this._easePower, (1 === u || 3 === u && l >= .5) && (l = 1 - l), 3 === u && (l *= 2), 1 === p ? l *= l : 2 === p ? l *= l * l : 3 === p ? l *= l * l * l : 4 === p && (l *= l * l * l * l), this.ratio = 1 === u ? 1 - l : 2 === u ? l : this._time / v < .5 ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), d === this._time && !i && g === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)));
                                if (!this._initted) {
                                    if (this._init(), !this._initted || this._gc) return;
                                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = m, this._rawPrevTime = y, this._cycle = g, a.lazyTweens.push(this), void(this._lazy = [t, e]);
                                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / v) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                }
                                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== d && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _)), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _)), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || _), 0 === v && this._rawPrevTime === n && c !== n && (this._rawPrevTime = 0))
                            }, r.to = function(t, e, i) {
                                return new r(t, e, i)
                            }, r.from = function(t, e, i) {
                                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
                            }, r.fromTo = function(t, e, i, s) {
                                return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s)
                            }, r.staggerTo = r.allTo = function(t, e, n, a, l, u, p) {
                                a = a || 0;
                                var c, f, d, m, g = n.delay || 0,
                                    v = [],
                                    y = function() {
                                        n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments), l.apply(p || this, u || _)
                                    };
                                for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t))), t = t || [], 0 > a && (t = s(t), t.reverse(), a *= -1), c = t.length - 1, d = 0; c >= d; d++) {
                                    f = {};
                                    for (m in n) f[m] = n[m];
                                    f.delay = g, d === c && l && (f.onComplete = y), v[d] = new r(t[d], e, f), g += a
                                }
                                return v
                            }, r.staggerFrom = r.allFrom = function(t, e, i, s, n, a, o) {
                                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o)
                            }, r.staggerFromTo = r.allFromTo = function(t, e, i, s, n, a, o, h) {
                                return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h)
                            }, r.delayedCall = function(t, e, i, s, n) {
                                return new r(e, 0, {
                                    delay: t,
                                    onComplete: e,
                                    onCompleteParams: i,
                                    onCompleteScope: s,
                                    onReverseComplete: e,
                                    onReverseCompleteParams: i,
                                    onReverseCompleteScope: s,
                                    immediateRender: !1,
                                    useFrames: n,
                                    overwrite: 0
                                })
                            }, r.set = function(t, e) {
                                return new r(t, 0, e)
                            }, r.isTweening = function(t) {
                                return i.getTweensOf(t, !0).length > 0
                            };
                            var u = function(t, e) {
                                    for (var s = [], r = 0, n = t._first; n;) n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(u(n, e)), r = s.length), n = n._next;
                                    return s
                                },
                                p = r.getAllTweens = function(e) {
                                    return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e))
                                };
                            r.killAll = function(t, i, s, r) {
                                null == i && (i = !0), null == s && (s = !0);
                                var n, a, o, h = p(0 != r),
                                    l = h.length,
                                    _ = i && s && r;
                                for (o = 0; l > o; o++) a = h[o], (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
                            }, r.killChildTweensOf = function(t, e) {
                                if (null != t) {
                                    var n, l, _, u, p, c = a.tweenLookup;
                                    if ("string" == typeof t && (t = i.selector(t) || t), o(t) && (t = s(t)), h(t))
                                        for (u = t.length; --u > -1;) r.killChildTweensOf(t[u], e);
                                    else {
                                        n = [];
                                        for (_ in c)
                                            for (l = c[_].target.parentNode; l;) l === t && (n = n.concat(c[_].tweens)), l = l.parentNode;
                                        for (p = n.length, u = 0; p > u; u++) e && n[u].totalTime(n[u].totalDuration()), n[u]._enabled(!1, !1)
                                    }
                                }
                            };
                            var c = function(t, i, s, r) {
                                i = i !== !1, s = s !== !1, r = r !== !1;
                                for (var n, a, o = p(r), h = i && s && r, l = o.length; --l > -1;) a = o[l], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
                            };
                            return r.pauseAll = function(t, e, i) {
                                c(!0, t, e, i)
                            }, r.resumeAll = function(t, e, i) {
                                c(!1, t, e, i)
                            }, r.globalTimeScale = function(e) {
                                var s = t._rootTimeline,
                                    r = i.ticker.time;
                                return arguments.length ? (e = e || n, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale
                            }, l.progress = function(t) {
                                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                            }, l.totalProgress = function(t) {
                                return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                            }, l.time = function(t, e) {
                                return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                            }, l.duration = function(e) {
                                return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                            }, l.totalDuration = function(t) {
                                return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                            }, l.repeat = function(t) {
                                return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                            }, l.repeatDelay = function(t) {
                                return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                            }, l.yoyo = function(t) {
                                return arguments.length ? (this._yoyo = t, this) : this._yoyo
                            }, r
                        }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                            var s = function(t) {
                                    e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                                    var i, s, r = this.vars;
                                    for (s in r) i = r[s], h(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                                    h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                                },
                                r = 1e-10,
                                n = i._internals,
                                a = s._internals = {},
                                o = n.isSelector,
                                h = n.isArray,
                                l = n.lazyTweens,
                                _ = n.lazyRender,
                                u = [],
                                p = _gsScope._gsDefine.globals,
                                c = function(t) {
                                    var e, i = {};
                                    for (e in t) i[e] = t[e];
                                    return i
                                },
                                f = a.pauseCallback = function(t, e, i, s) {
                                    var r = t._timeline,
                                        n = r._totalTime;
                                    !e && this._forcingPlayhead || r._rawPrevTime === t._startTime || (r.pause(t._startTime), e && e.apply(s || r, i || u), this._forcingPlayhead && r.seek(n))
                                },
                                d = function(t) {
                                    var e, i = [],
                                        s = t.length;
                                    for (e = 0; e !== s; i.push(t[e++]));
                                    return i
                                },
                                m = s.prototype = new e;
                            return s.version = "1.15.1", m.constructor = s, m.kill()._gc = m._forcingPlayhead = !1, m.to = function(t, e, s, r) {
                                var n = s.repeat && p.TweenMax || i;
                                return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
                            }, m.from = function(t, e, s, r) {
                                return this.add((s.repeat && p.TweenMax || i).from(t, e, s), r)
                            }, m.fromTo = function(t, e, s, r, n) {
                                var a = r.repeat && p.TweenMax || i;
                                return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
                            }, m.staggerTo = function(t, e, r, n, a, h, l, _) {
                                var u, p = new s({
                                    onComplete: h,
                                    onCompleteParams: l,
                                    onCompleteScope: _,
                                    smoothChildTiming: this.smoothChildTiming
                                });
                                for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], o(t) && (t = d(t)), n = n || 0, 0 > n && (t = d(t), t.reverse(), n *= -1), u = 0; u < t.length; u++) r.startAt && (r.startAt = c(r.startAt)), p.to(t[u], e, c(r), u * n);
                                return this.add(p, a)
                            }, m.staggerFrom = function(t, e, i, s, r, n, a, o) {
                                return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
                            }, m.staggerFromTo = function(t, e, i, s, r, n, a, o, h) {
                                return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
                            }, m.call = function(t, e, s, r) {
                                return this.add(i.delayedCall(0, t, e, s), r)
                            }, m.set = function(t, e, s) {
                                return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
                            }, s.exportRoot = function(t, e) {
                                t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                                var r, n, a = new s(t),
                                    o = a._timeline;
                                for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
                                return o.add(a, 0), a
                            }, m.add = function(r, n, a, o) {
                                var l, _, u, p, c, f;
                                if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                                    if (r instanceof Array || r && r.push && h(r)) {
                                        for (a = a || "normal", o = o || 0, l = n, _ = r.length, u = 0; _ > u; u++) h(p = r[u]) && (p = new s({
                                            tweens: p
                                        })), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === a ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === a && (p._startTime -= p.delay())), l += o;
                                        return this._uncache(!0)
                                    }
                                    if ("string" == typeof r) return this.addLabel(r, n);
                                    if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                                    r = i.delayedCall(0, r)
                                }
                                if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                                    for (c = this, f = c.rawTime() > r._startTime; c._timeline;) f && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline;
                                return this
                            }, m.remove = function(e) {
                                if (e instanceof t) return this._remove(e, !1);
                                if (e instanceof Array || e && e.push && h(e)) {
                                    for (var i = e.length; --i > -1;) this.remove(e[i]);
                                    return this
                                }
                                return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                            }, m._remove = function(t, i) {
                                e.prototype._remove.call(this, t, i);
                                var s = this._last;
                                return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                            }, m.append = function(t, e) {
                                return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                            }, m.insert = m.insertMultiple = function(t, e, i, s) {
                                return this.add(t, e || 0, i, s)
                            }, m.appendMultiple = function(t, e, i, s) {
                                return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
                            }, m.addLabel = function(t, e) {
                                return this._labels[t] = this._parseTimeOrLabel(e), this
                            }, m.addPause = function(t, e, s, r) {
                                var n = i.delayedCall(0, f, ["{self}", e, s, r], this);
                                return n.data = "isPause", this.add(n, t)
                            }, m.removeLabel = function(t) {
                                return delete this._labels[t], this
                            }, m.getLabelTime = function(t) {
                                return null != this._labels[t] ? this._labels[t] : -1
                            }, m._parseTimeOrLabel = function(e, i, s, r) {
                                var n;
                                if (r instanceof t && r.timeline === this) this.remove(r);
                                else if (r && (r instanceof Array || r.push && h(r)))
                                    for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                                if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
                                if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                                else {
                                    if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                                    i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
                                }
                                return Number(e) + i
                            }, m.seek = function(t, e) {
                                return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                            }, m.stop = function() {
                                return this.paused(!0)
                            }, m.gotoAndPlay = function(t, e) {
                                return this.play(t, e)
                            }, m.gotoAndStop = function(t, e) {
                                return this.pause(t, e)
                            }, m.render = function(t, e, i) {
                                this._gc && this._enabled(!0, !1);
                                var s, n, a, o, h, p = this._dirty ? this.totalDuration() : this._totalDuration,
                                    c = this._time,
                                    f = this._startTime,
                                    d = this._timeScale,
                                    m = this._paused;
                                if (t >= p ? (this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === this._duration && (0 === t || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = p + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== c || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (h = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== c && this._first || i || h) {
                                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== c && t > 0 && (this._active = !0), 0 === c && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u)), this._time >= c)
                                        for (s = this._first; s && (a = s._next, !this._paused || m);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                                    else
                                        for (s = this._last; s && (a = s._prev, !this._paused || m);)(s._active || s._startTime <= c && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                                    this._onUpdate && (e || (l.length && _(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u))), o && (this._gc || (f === this._startTime || d !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (l.length && _(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || u)))
                                }
                            }, m._hasPausedChild = function() {
                                for (var t = this._first; t;) {
                                    if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
                                    t = t._next
                                }
                                return !1
                            }, m.getChildren = function(t, e, s, r) {
                                r = r || -9999999999;
                                for (var n = [], a = this._first, o = 0; a;) a._startTime < r || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
                                return n
                            }, m.getTweensOf = function(t, e) {
                                var s, r, n = this._gc,
                                    a = [],
                                    o = 0;
                                for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
                                return n && this._enabled(!1, !0), a
                            }, m.recent = function() {
                                return this._recent
                            }, m._contains = function(t) {
                                for (var e = t.timeline; e;) {
                                    if (e === this) return !0;
                                    e = e.timeline
                                }
                                return !1
                            }, m.shiftChildren = function(t, e, i) {
                                i = i || 0;
                                for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                                if (e)
                                    for (s in n) n[s] >= i && (n[s] += t);
                                return this._uncache(!0)
                            }, m._kill = function(t, e) {
                                if (!t && !e) return this._enabled(!1, !1);
                                for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
                                return r
                            }, m.clear = function(t) {
                                var e = this.getChildren(!1, !0, !0),
                                    i = e.length;
                                for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                                return t !== !1 && (this._labels = {}), this._uncache(!0)
                            }, m.invalidate = function() {
                                for (var e = this._first; e;) e.invalidate(), e = e._next;
                                return t.prototype.invalidate.call(this)
                            }, m._enabled = function(t, i) {
                                if (t === this._gc)
                                    for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
                                return e.prototype._enabled.call(this, t, i)
                            }, m.totalTime = function() {
                                this._forcingPlayhead = !0;
                                var e = t.prototype.totalTime.apply(this, arguments);
                                return this._forcingPlayhead = !1, e
                            }, m.duration = function(t) {
                                return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                            }, m.totalDuration = function(t) {
                                if (!arguments.length) {
                                    if (this._dirty) {
                                        for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, r._startTime < 0 && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                                        this._duration = this._totalDuration = s, this._dirty = !1
                                    }
                                    return this._totalDuration
                                }
                                return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                            }, m.usesFrames = function() {
                                for (var e = this._timeline; e._timeline;) e = e._timeline;
                                return e === t._rootFramesTimeline
                            }, m.rawTime = function() {
                                return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                            }, s
                        }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                            var s = function(e) {
                                    t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                                },
                                r = 1e-10,
                                n = [],
                                a = e._internals,
                                o = a.lazyTweens,
                                h = a.lazyRender,
                                l = new i(null, null, 1, 0),
                                _ = s.prototype = new t;
                            return _.constructor = s, _.kill()._gc = !1, s.version = "1.15.1", _.invalidate = function() {
                                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                            }, _.addCallback = function(t, i, s, r) {
                                return this.add(e.delayedCall(0, t, s, r), i)
                            }, _.removeCallback = function(t, e) {
                                if (t)
                                    if (null == e) this._kill(null, t);
                                    else
                                        for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;) i[s]._startTime === r && i[s]._enabled(!1, !1);
                                return this
                            }, _.removePause = function(e) {
                                return this.removeCallback(t._internals.pauseCallback, e)
                            }, _.tweenTo = function(t, i) {
                                i = i || {};
                                var s, r, a, o = {
                                    ease: l,
                                    useFrames: this.usesFrames(),
                                    immediateRender: !1
                                };
                                for (r in i) o[r] = i[r];
                                return o.time = this._parseTimeOrLabel(t), s = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, a = new e(this, s, o), o.onStart = function() {
                                    a.target.paused(!0), a.vars.time !== a.target.time() && s === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || n)
                                }, a
                            }, _.tweenFromTo = function(t, e, i) {
                                i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                                    onComplete: this.seek,
                                    onCompleteParams: [t],
                                    onCompleteScope: this
                                }, i.immediateRender = i.immediateRender !== !1;
                                var s = this.tweenTo(e, i);
                                return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
                            }, _.render = function(t, e, i) {
                                this._gc && this._enabled(!0, !1);
                                var s, a, l, _, u, p, c = this._dirty ? this.totalDuration() : this._totalDuration,
                                    f = this._duration,
                                    d = this._time,
                                    m = this._totalTime,
                                    g = this._startTime,
                                    v = this._timeScale,
                                    y = this._rawPrevTime,
                                    T = this._paused,
                                    x = this._cycle;
                                if (t >= c ? (this._locked || (this._totalTime = c, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, _ = "onComplete", 0 === this._duration && (0 === t || 0 > y || y === r) && y !== t && this._first && (u = !0, y > r && (_ = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = f, t = f + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== d || 0 === f && y !== r && (y > 0 || 0 > t && y >= 0) && !this._locked) && (_ = "onReverseComplete", a = this._reversed), 0 > t ? (this._active = !1, y >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (u = !0))) : (0 === f && 0 > y && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (p = f + this._repeatDelay, this._cycle = this._totalTime / p >> 0, 0 !== this._cycle && this._cycle === this._totalTime / p && this._cycle--, this._time = this._totalTime - this._cycle * p, this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, t = f + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time))), this._cycle !== x && !this._locked) {
                                    var w = this._yoyo && 0 !== (1 & x),
                                        b = w === (this._yoyo && 0 !== (1 & this._cycle)),
                                        P = this._totalTime,
                                        S = this._cycle,
                                        R = this._rawPrevTime,
                                        k = this._time;
                                    if (this._totalTime = x * f, this._cycle < x ? w = !w : this._totalTime += f, this._time = d, this._rawPrevTime = 0 === f ? y - 1e-4 : y, this._cycle = x, this._locked = !0, d = w ? 0 : f, this.render(d, e, 0 === f), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || n), b && (d = w ? f + 1e-4 : -1e-4, this.render(d, !0, !1)), this._locked = !1, this._paused && !T) return;
                                    this._time = k, this._totalTime = P, this._cycle = S, this._rawPrevTime = R
                                }
                                if (!(this._time !== d && this._first || i || u)) return void(m !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)));
                                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== m && t > 0 && (this._active = !0), 0 === m && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)), this._time >= d)
                                    for (s = this._first; s && (l = s._next, !this._paused || T);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = l;
                                else
                                    for (s = this._last; s && (l = s._prev, !this._paused || T);)(s._active || s._startTime <= d && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = l;
                                this._onUpdate && (e || (o.length && h(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n))), _ && (this._locked || this._gc || (g === this._startTime || v !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (a && (o.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[_] && this.vars[_].apply(this.vars[_ + "Scope"] || this, this.vars[_ + "Params"] || n)))
                            }, _.getActive = function(t, e, i) {
                                null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                                var s, r, n = [],
                                    a = this.getChildren(t, e, i),
                                    o = 0,
                                    h = a.length;
                                for (s = 0; h > s; s++) r = a[s], r.isActive() && (n[o++] = r);
                                return n
                            }, _.getLabelAfter = function(t) {
                                t || 0 !== t && (t = this._time);
                                var e, i = this.getLabelsArray(),
                                    s = i.length;
                                for (e = 0; s > e; e++)
                                    if (i[e].time > t) return i[e].name;
                                return null
                            }, _.getLabelBefore = function(t) {
                                null == t && (t = this._time);
                                for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                                    if (e[i].time < t) return e[i].name;
                                return null
                            }, _.getLabelsArray = function() {
                                var t, e = [],
                                    i = 0;
                                for (t in this._labels) e[i++] = {
                                    time: this._labels[t],
                                    name: t
                                };
                                return e.sort(function(t, e) {
                                    return t.time - e.time
                                }), e
                            }, _.progress = function(t, e) {
                                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                            }, _.totalProgress = function(t, e) {
                                return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                            }, _.totalDuration = function(e) {
                                return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                            }, _.time = function(t, e) {
                                return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                            }, _.repeat = function(t) {
                                return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                            }, _.repeatDelay = function(t) {
                                return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                            }, _.yoyo = function(t) {
                                return arguments.length ? (this._yoyo = t, this) : this._yoyo
                            }, _.currentLabel = function(t) {
                                return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                            }, s
                        }, !0),
                        function() {
                            var t = 180 / Math.PI,
                                e = [],
                                i = [],
                                s = [],
                                r = {},
                                n = _gsScope._gsDefine.globals,
                                a = function(t, e, i, s) {
                                    this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
                                },
                                o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                                h = function(t, e, i, s) {
                                    var r = {
                                            a: t
                                        },
                                        n = {},
                                        a = {},
                                        o = {
                                            c: s
                                        },
                                        h = (t + e) / 2,
                                        l = (e + i) / 2,
                                        _ = (i + s) / 2,
                                        u = (h + l) / 2,
                                        p = (l + _) / 2,
                                        c = (p - u) / 8;
                                    return r.b = h + (t - h) / 4, n.b = u + c, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + p) / 2, a.b = p - c, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
                                },
                                l = function(t, r, n, a, o) {
                                    var l, _, u, p, c, f, d, m, g, v, y, T, x, w = t.length - 1,
                                        b = 0,
                                        P = t[0].a;
                                    for (l = 0; w > l; l++) c = t[b], _ = c.a, u = c.d, p = t[b + 1].d, o ? (y = e[l], T = i[l], x = (T + y) * r * .25 / (a ? .5 : s[l] || .5), f = u - (u - _) * (a ? .5 * r : 0 !== y ? x / y : 0), d = u + (p - u) * (a ? .5 * r : 0 !== T ? x / T : 0), m = u - (f + ((d - f) * (3 * y / (y + T) + .5) / 4 || 0))) : (f = u - (u - _) * r * .5, d = u + (p - u) * r * .5, m = u - (f + d) / 2), f += m, d += m, c.c = g = f, c.b = 0 !== l ? P : P = c.a + .6 * (c.c - c.a), c.da = u - _, c.ca = g - _, c.ba = P - _, n ? (v = h(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = d;
                                    c = t[b], c.b = P, c.c = P + .4 * (c.d - P), c.da = c.d - c.a, c.ca = c.c - c.a, c.ba = P - c.a, n && (v = h(c.a, P, c.c, c.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
                                },
                                _ = function(t, s, r, n) {
                                    var o, h, l, _, u, p, c = [];
                                    if (n)
                                        for (t = [n].concat(t), h = t.length; --h > -1;) "string" == typeof(p = t[h][s]) && "=" === p.charAt(1) && (t[h][s] = n[s] + Number(p.charAt(0) + p.substr(2)));
                                    if (o = t.length - 2, 0 > o) return c[0] = new a(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s]), c;
                                    for (h = 0; o > h; h++) l = t[h][s], _ = t[h + 1][s], c[h] = new a(l, 0, 0, _), r && (u = t[h + 2][s], e[h] = (e[h] || 0) + (_ - l) * (_ - l), i[h] = (i[h] || 0) + (u - _) * (u - _));
                                    return c[h] = new a(t[h][s], 0, 0, t[h + 1][s]), c
                                },
                                u = function(t, n, a, h, u, p) {
                                    var c, f, d, m, g, v, y, T, x = {},
                                        w = [],
                                        b = p || t[0];
                                    u = "string" == typeof u ? "," + u + "," : o, null == n && (n = 1);
                                    for (f in t[0]) w.push(f);
                                    if (t.length > 1) {
                                        for (T = t[t.length - 1], y = !0, c = w.length; --c > -1;)
                                            if (f = w[c], Math.abs(b[f] - T[f]) > .05) {
                                                y = !1;
                                                break
                                            }
                                        y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3])
                                    }
                                    for (e.length = i.length = s.length = 0, c = w.length; --c > -1;) f = w[c], r[f] = -1 !== u.indexOf("," + f + ","), x[f] = _(t, f, r[f], p);
                                    for (c = e.length; --c > -1;) e[c] = Math.sqrt(e[c]), i[c] = Math.sqrt(i[c]);
                                    if (!h) {
                                        for (c = w.length; --c > -1;)
                                            if (r[f])
                                                for (d = x[w[c]], v = d.length - 1, m = 0; v > m; m++) g = d[m + 1].da / i[m] + d[m].da / e[m], s[m] = (s[m] || 0) + g * g;
                                        for (c = s.length; --c > -1;) s[c] = Math.sqrt(s[c])
                                    }
                                    for (c = w.length, m = a ? 4 : 1; --c > -1;) f = w[c], d = x[f], l(d, n, a, h, r[f]), y && (d.splice(0, m), d.splice(d.length - m, m));
                                    return x
                                },
                                p = function(t, e, i) {
                                    e = e || "soft";
                                    var s, r, n, o, h, l, _, u, p, c, f, d = {},
                                        m = "cubic" === e ? 3 : 2,
                                        g = "soft" === e,
                                        v = [];
                                    if (g && i && (t = [i].concat(t)), null == t || t.length < m + 1) throw "invalid Bezier data";
                                    for (p in t[0]) v.push(p);
                                    for (l = v.length; --l > -1;) {
                                        for (p = v[l], d[p] = h = [], c = 0, u = t.length, _ = 0; u > _; _++) s = null == i ? t[_][p] : "string" == typeof(f = t[_][p]) && "=" === f.charAt(1) ? i[p] + Number(f.charAt(0) + f.substr(2)) : Number(f), g && _ > 1 && u - 1 > _ && (h[c++] = (s + h[c - 2]) / 2), h[c++] = s;
                                        for (u = c - m + 1, c = 0, _ = 0; u > _; _ += m) s = h[_], r = h[_ + 1], n = h[_ + 2], o = 2 === m ? 0 : h[_ + 3], h[c++] = f = 3 === m ? new a(s, r, n, o) : new a(s, (2 * r + s) / 3, (2 * r + n) / 3, n);
                                        h.length = c
                                    }
                                    return d
                                },
                                c = function(t, e, i) {
                                    for (var s, r, n, a, o, h, l, _, u, p, c, f = 1 / i, d = t.length; --d > -1;)
                                        for (p = t[d], n = p.a, a = p.d - n, o = p.c - n, h = p.b - n, s = r = 0, _ = 1; i >= _; _++) l = f * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), c = d * i + _ - 1, e[c] = (e[c] || 0) + s * s
                                },
                                f = function(t, e) {
                                    e = e >> 0 || 6;
                                    var i, s, r, n, a = [],
                                        o = [],
                                        h = 0,
                                        l = 0,
                                        _ = e - 1,
                                        u = [],
                                        p = [];
                                    for (i in t) c(t[i], a, e);
                                    for (r = a.length, s = 0; r > s; s++) h += Math.sqrt(a[s]), n = s % e, p[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = p, o[n] = l, h = 0, p = []);
                                    return {
                                        length: l,
                                        lengths: o,
                                        segments: u
                                    }
                                },
                                d = _gsScope._gsDefine.plugin({
                                    propName: "bezier",
                                    priority: -1,
                                    version: "1.3.4",
                                    API: 2,
                                    global: !0,
                                    init: function(t, e, i) {
                                        this._target = t, e instanceof Array && (e = {
                                            values: e
                                        }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                                        var s, r, n, a, o, h = e.values || [],
                                            l = {},
                                            _ = h[0],
                                            c = e.autoRotate || i.vars.orientToBezier;
                                        this._autoRotate = c ? c instanceof Array ? c : [
                                            ["x", "y", "rotation", c === !0 ? 0 : Number(c) || 0]
                                        ] : null;
                                        for (s in _) this._props.push(s);
                                        for (n = this._props.length; --n > -1;) s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
                                        if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : p(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
                                            var d = f(this._beziers, this._timeRes);
                                            this._length = d.length, this._lengths = d.lengths, this._segments = d.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                                        }
                                        if (c = this._autoRotate)
                                            for (this._initialRotations = [], c[0] instanceof Array || (this._autoRotate = c = [c]), n = c.length; --n > -1;) {
                                                for (a = 0; 3 > a; a++) s = c[n][a], this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
                                                s = c[n][2], this._initialRotations[n] = this._func[s] ? this._func[s].call(this._target) : this._target[s]
                                            }
                                        return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                                    },
                                    set: function(e) {
                                        var i, s, r, n, a, o, h, l, _, u, p = this._segCount,
                                            c = this._func,
                                            f = this._target,
                                            d = e !== this._startRatio;
                                        if (this._timeRes) {
                                            if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
                                                for (l = p - 1; l > r && (this._l2 = _[++r]) <= e;);
                                                this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                                            } else if (e < this._l1 && r > 0) {
                                                for (; r > 0 && (this._l1 = _[--r]) >= e;);
                                                0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                                            }
                                            if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < u.length - 1) {
                                                for (l = u.length - 1; l > r && (this._s2 = u[++r]) <= e;);
                                                this._s1 = u[r - 1], this._si = r
                                            } else if (e < this._s1 && r > 0) {
                                                for (; r > 0 && (this._s1 = u[--r]) >= e;);
                                                0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                                            }
                                            o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                                        } else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, o = (e - i * (1 / p)) * p;
                                        for (s = 1 - o, r = this._props.length; --r > -1;) n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = Math.round(h)), c[n] ? f[n](h) : f[n] = h;
                                        if (this._autoRotate) {
                                            var m, g, v, y, T, x, w, b = this._autoRotate;
                                            for (r = b.length; --r > -1;) n = b[r][2], x = b[r][3] || 0, w = b[r][4] === !0 ? 1 : t, a = this._beziers[b[r][0]], m = this._beziers[b[r][1]], a && m && (a = a[i], m = m[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = m.a + (m.b - m.a) * o, T = m.b + (m.c - m.b) * o, v += (T - v) * o, T += (m.c + (m.d - m.c) * o - T) * o, h = d ? Math.atan2(T - v, y - g) * w + x : this._initialRotations[r], c[n] ? f[n](h) : f[n] = h)
                                        }
                                    }
                                }),
                                m = d.prototype;
                            d.bezierThrough = u, d.cubicToQuadratic = h, d._autoCSS = !0, d.quadraticToCubic = function(t, e, i) {
                                return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                            }, d._cssRegister = function() {
                                var t = n.CSSPlugin;
                                if (t) {
                                    var e = t._internals,
                                        i = e._parseToProxy,
                                        s = e._setPluginRatio,
                                        r = e.CSSPropTween;
                                    e._registerComplexSpecialProp("bezier", {
                                        parser: function(t, e, n, a, o, h) {
                                            e instanceof Array && (e = {
                                                values: e
                                            }), h = new d;
                                            var l, _, u, p = e.values,
                                                c = p.length - 1,
                                                f = [],
                                                m = {};
                                            if (0 > c) return o;
                                            for (l = 0; c >= l; l++) u = i(t, p[l], a, o, h, c !== l), f[l] = u.end;
                                            for (_ in e) m[_] = e[_];
                                            return m.values = f, o = new r(t, "bezier", 0, 0, u.pt, 2), o.data = u, o.plugin = h, o.setRatio = s, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (l = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != u.end.left ? [
                                                ["left", "top", "rotation", l, !1]
                                            ] : null != u.end.x ? [
                                                ["x", "y", "rotation", l, !1]
                                            ] : !1), m.autoRotate && (a._transform || a._enableTransforms(!1), u.autoRotate = a._target._gsTransform), h._onInitTween(u.proxy, m, a._tween), o
                                        }
                                    })
                                }
                            }, m._roundProps = function(t, e) {
                                for (var i = this._overwriteProps, s = i.length; --s > -1;)(t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
                            }, m._kill = function(t) {
                                var e, i, s = this._props;
                                for (e in this._beziers)
                                    if (e in t)
                                        for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;) s[i] === e && s.splice(i, 1);
                                return this._super._kill.call(this, t)
                            }
                        }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                            var i, s, r, n, a = function() {
                                    t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                                },
                                o = _gsScope._gsDefine.globals,
                                h = {},
                                l = a.prototype = new t("css");
                            l.constructor = a, a.version = "1.15.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", l = "px", a.suffixMap = {
                                top: l,
                                right: l,
                                bottom: l,
                                left: l,
                                width: l,
                                height: l,
                                fontSize: l,
                                padding: l,
                                margin: l,
                                perspective: l,
                                lineHeight: ""
                            };
                            var _, u, p, c, f, d, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                                g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                                v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                                y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                                T = /(?:\d|\-|\+|=|#|\.)*/g,
                                x = /opacity *= *([^)]*)/i,
                                w = /opacity:([^;]*)/i,
                                b = /alpha\(opacity *=.+?\)/i,
                                P = /^(rgb|hsl)/,
                                S = /([A-Z])/g,
                                R = /-([a-z])/gi,
                                k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                                O = function(t, e) {
                                    return e.toUpperCase()
                                },
                                A = /(?:Left|Right|Width)/i,
                                C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                                D = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                                M = /,(?=[^\)]*(?:\(|$))/gi,
                                z = Math.PI / 180,
                                F = 180 / Math.PI,
                                X = {},
                                I = document,
                                N = function(t) {
                                    return I.createElementNS ? I.createElementNS("http://www.w3.org/1999/xhtml", t) : I.createElement(t)
                                },
                                L = N("div"),
                                E = N("img"),
                                Y = a._internals = {
                                    _specialProps: h
                                },
                                B = navigator.userAgent,
                                U = function() {
                                    var t = B.indexOf("Android"),
                                        e = N("a");
                                    return p = -1 !== B.indexOf("Safari") && -1 === B.indexOf("Chrome") && (-1 === t || Number(B.substr(t + 8, 1)) > 3), f = p && Number(B.substr(B.indexOf("Version/") + 8, 1)) < 6, c = -1 !== B.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(B)) && (d = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
                                }(),
                                j = function(t) {
                                    return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                                },
                                V = function(t) {
                                    window.console && console.log(t)
                                },
                                q = "",
                                W = "",
                                Z = function(t, e) {
                                    e = e || L;
                                    var i, s, r = e.style;
                                    if (void 0 !== r[t]) return t;
                                    for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];);
                                    return s >= 0 ? (W = 3 === s ? "ms" : i[s], q = "-" + W.toLowerCase() + "-", W + t) : null
                                },
                                G = I.defaultView ? I.defaultView.getComputedStyle : function() {},
                                $ = a.getStyle = function(t, e, i, s, r) {
                                    var n;
                                    return U || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || G(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(S, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : j(t)
                                },
                                Q = Y.convertToPixels = function(t, i, s, r, n) {
                                    if ("px" === r || !r) return s;
                                    if ("auto" === r || !s) return 0;
                                    var o, h, l, _ = A.test(i),
                                        u = t,
                                        p = L.style,
                                        c = 0 > s;
                                    if (c && (s = -s), "%" === r && -1 !== i.indexOf("border")) o = s / 100 * (_ ? t.clientWidth : t.clientHeight);
                                    else {
                                        if (p.cssText = "border:0 solid red;position:" + $(t, "position") + ";line-height:0;", "%" !== r && u.appendChild) p[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r;
                                        else {
                                            if (u = t.parentNode || I.body, h = u._gsCache, l = e.ticker.frame, h && _ && h.time === l) return h.width * s / 100;
                                            p[_ ? "width" : "height"] = s + r
                                        }
                                        u.appendChild(L), o = parseFloat(L[_ ? "offsetWidth" : "offsetHeight"]), u.removeChild(L), _ && "%" === r && a.cacheWidths !== !1 && (h = u._gsCache = u._gsCache || {}, h.time = l, h.width = o / s * 100), 0 !== o || n || (o = Q(t, i, s, r, !0))
                                    }
                                    return c ? -o : o
                                },
                                H = Y.calculateOffset = function(t, e, i) {
                                    if ("absolute" !== $(t, "position", i)) return 0;
                                    var s = "left" === e ? "Left" : "Top",
                                        r = $(t, "margin" + s, i);
                                    return t["offset" + s] - (Q(t, e, parseFloat(r), r.replace(T, "")) || 0)
                                },
                                K = function(t, e) {
                                    var i, s, r = {};
                                    if (e = e || G(t, null))
                                        for (i in e)(-1 === i.indexOf("Transform") || we === i) && (r[i] = e[i]);
                                    else if (e = t.currentStyle || t.style)
                                        for (i in e) "string" == typeof i && void 0 === r[i] && (r[i.replace(R, O)] = e[i]);
                                    return U || (r.opacity = j(t)), s = Me(t, e, !1), r.rotation = s.rotation, r.skewX = s.skewX, r.scaleX = s.scaleX, r.scaleY = s.scaleY, r.x = s.x, r.y = s.y, Se && (r.z = s.z, r.rotationX = s.rotationX, r.rotationY = s.rotationY, r.scaleZ = s.scaleZ), r.filters && delete r.filters, r
                                },
                                J = function(t, e, i, s, r) {
                                    var n, a, o, h = {},
                                        l = t.style;
                                    for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(y, "") ? n : 0 : H(t, a), void 0 !== l[a] && (o = new ce(l, a, l[a], o)));
                                    if (s)
                                        for (a in s) "className" !== a && (h[a] = s[a]);
                                    return {
                                        difs: h,
                                        firstMPT: o
                                    }
                                },
                                te = {
                                    width: ["Left", "Right"],
                                    height: ["Top", "Bottom"]
                                },
                                ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                                ie = function(t, e, i) {
                                    var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                                        r = te[e],
                                        n = r.length;
                                    for (i = i || G(t, null); --n > -1;) s -= parseFloat($(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat($(t, "border" + r[n] + "Width", i, !0)) || 0;
                                    return s
                                },
                                se = function(t, e) {
                                    (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                                    var i = t.split(" "),
                                        s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                                        r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                                    return null == r ? r = "center" === s ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"), e && (e.oxp = -1 !== s.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === s.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(s.replace(y, "")), e.oy = parseFloat(r.replace(y, ""))), s + " " + r + (i.length > 2 ? " " + i[2] : "")
                                },
                                re = function(t, e) {
                                    return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                                },
                                ne = function(t, e) {
                                    return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                                },
                                ae = function(t, e, i, s) {
                                    var r, n, a, o, h, l = 1e-6;
                                    return null == t ? o = e : "number" == typeof t ? o = t : (r = 360, n = t.split("_"), h = "=" === t.charAt(1), a = (h ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2)) : parseFloat(n[0])) * (-1 === t.indexOf("rad") ? 1 : F) - (h ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (a / r | 0) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (a / r | 0) * r)), o = e + a), l > o && o > -l && (o = 0), o
                                },
                                oe = {
                                    aqua: [0, 255, 255],
                                    lime: [0, 255, 0],
                                    silver: [192, 192, 192],
                                    black: [255, 255, 255],
                                    maroon: [128, 0, 0],
                                    teal: [0, 128, 128],
                                    blue: [0, 0, 255],
                                    navy: [0, 0, 128],
                                    white: [255, 255, 255],
                                    fuchsia: [255, 0, 255],
                                    olive: [128, 128, 0],
                                    yellow: [255, 255, 0],
                                    orange: [255, 165, 0],
                                    gray: [128, 128, 128],
                                    purple: [128, 0, 128],
                                    green: [0, 128, 0],
                                    red: [255, 0, 0],
                                    pink: [255, 192, 203],
                                    cyan: [0, 255, 255],
                                    transparent: [255, 255, 255, 0]
                                },
                                he = function(t, e, i) {
                                    return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                                },
                                le = a.parseColor = function(t) {
                                    var e, i, s, r, n, a;
                                    return t && "" !== t ? "number" == typeof t ? [t >> 16, t >> 8 & 255, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), oe[t] ? oe[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + e + e + i + i + s + s), t = parseInt(t.substr(1), 16), [t >> 16, t >> 8 & 255, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = he(r + 1 / 3, e, i), t[1] = he(r, e, i), t[2] = he(r - 1 / 3, e, i), t) : (t = t.match(m) || oe.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : oe.white
                                },
                                _e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                            for (l in oe) _e += "|" + l + "\\b";
                            _e = new RegExp(_e + ")", "gi");
                            var ue = function(t, e, i, s) {
                                    if (null == t) return function(t) {
                                        return t
                                    };
                                    var r, n = e ? (t.match(_e) || [""])[0] : "",
                                        a = t.split(n).join("").match(v) || [],
                                        o = t.substr(0, t.indexOf(a[0])),
                                        h = ")" === t.charAt(t.length - 1) ? ")" : "",
                                        l = -1 !== t.indexOf(" ") ? " " : ",",
                                        _ = a.length,
                                        u = _ > 0 ? a[0].replace(m, "") : "";
                                    return _ ? r = e ? function(t) {
                                        var e, p, c, f;
                                        if ("number" == typeof t) t += u;
                                        else if (s && M.test(t)) {
                                            for (f = t.replace(M, "|").split("|"), c = 0; c < f.length; c++) f[c] = r(f[c]);
                                            return f.join(",")
                                        }
                                        if (e = (t.match(_e) || [n])[0], p = t.split(e).join("").match(v) || [], c = p.length, _ > c--)
                                            for (; ++c < _;) p[c] = i ? p[(c - 1) / 2 | 0] : a[c];
                                        return o + p.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
                                    } : function(t) {
                                        var e, n, p;
                                        if ("number" == typeof t) t += u;
                                        else if (s && M.test(t)) {
                                            for (n = t.replace(M, "|").split("|"), p = 0; p < n.length; p++) n[p] = r(n[p]);
                                            return n.join(",")
                                        }
                                        if (e = t.match(v) || [], p = e.length, _ > p--)
                                            for (; ++p < _;) e[p] = i ? e[(p - 1) / 2 | 0] : a[p];
                                        return o + e.join(l) + h
                                    } : function(t) {
                                        return t
                                    }
                                },
                                pe = function(t) {
                                    return t = t.split(","),
                                        function(e, i, s, r, n, a, o) {
                                            var h, l = (i + "").split(" ");
                                            for (o = {}, h = 0; 4 > h; h++) o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                                            return r.parse(e, o, n, a)
                                        }
                                },
                                ce = (Y._setPluginRatio = function(t) {
                                    this.plugin.setRatio(t);
                                    for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o;) e = a[o.v], o.r ? e = Math.round(e) : h > e && e > -h && (e = 0), o.t[o.p] = e, o = o._next;
                                    if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
                                        for (o = n.firstMPT; o;) {
                                            if (i = o.t, i.type) {
                                                if (1 === i.type) {
                                                    for (r = i.xs0 + i.s + i.xs1, s = 1; s < i.l; s++) r += i["xn" + s] + i["xs" + (s + 1)];
                                                    i.e = r
                                                }
                                            } else i.e = i.s + i.xs0;
                                            o = o._next
                                        }
                                }, function(t, e, i, s, r) {
                                    this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
                                }),
                                fe = (Y._parseToProxy = function(t, e, i, s, r, n) {
                                    var a, o, h, l, _, u = s,
                                        p = {},
                                        c = {},
                                        f = i._transform,
                                        d = X;
                                    for (i._transform = null, X = e, s = _ = i.parse(t, e, s, r), X = d, n && (i._transform = f, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
                                        if (s.type <= 1 && (o = s.p, c[o] = s.s + s.c, p[o] = s.s, n || (l = new ce(s, "s", o, l, s.r), s.c = 0), 1 === s.type))
                                            for (a = s.l; --a > 0;) h = "xn" + a, o = s.p + "_" + h, c[o] = s.data[h], p[o] = s[h], n || (l = new ce(s, h, o, l, s.rxp[h]));
                                        s = s._next
                                    }
                                    return {
                                        proxy: p,
                                        end: c,
                                        firstMPT: l,
                                        pt: _
                                    }
                                }, Y.CSSPropTween = function(t, e, s, r, a, o, h, l, _, u, p) {
                                    this.t = t, this.p = e, this.s = s, this.c = r, this.n = h || e, t instanceof fe || n.push(this.n), this.r = l, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === p ? s + r : p, a && (this._next = a, a._prev = this)
                                }),
                                de = a.parseComplex = function(t, e, i, s, r, n, a, o, h, l) {
                                    i = i || n || "", a = new fe(t, e, 0, 0, a, l ? 2 : 1, null, !1, o, i, s), s += "";
                                    var u, p, c, f, d, v, y, T, x, w, b, S, R = i.split(", ").join(",").split(" "),
                                        k = s.split(", ").join(",").split(" "),
                                        O = R.length,
                                        A = _ !== !1;
                                    for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (R = R.join(" ").replace(M, ", ").split(" "), k = k.join(" ").replace(M, ", ").split(" "), O = R.length), O !== k.length && (R = (n || "").split(" "), O = R.length), a.plugin = h, a.setRatio = l, u = 0; O > u; u++)
                                        if (f = R[u], d = k[u], T = parseFloat(f), T || 0 === T) a.appendXtra("", T, re(d, T), d.replace(g, ""), A && -1 !== d.indexOf("px"), !0);
                                        else if (r && ("#" === f.charAt(0) || oe[f] || P.test(f))) S = "," === d.charAt(d.length - 1) ? ")," : ")", f = le(f), d = le(d), x = f.length + d.length > 6, x && !U && 0 === d[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(k[u]).join("transparent")) : (U || (x = !1), a.appendXtra(x ? "rgba(" : "rgb(", f[0], d[0] - f[0], ",", !0, !0).appendXtra("", f[1], d[1] - f[1], ",", !0).appendXtra("", f[2], d[2] - f[2], x ? "," : S, !0), x && (f = f.length < 4 ? 1 : f[3], a.appendXtra("", f, (d.length < 4 ? 1 : d[3]) - f, S, !1)));
                                    else if (v = f.match(m)) {
                                        if (y = d.match(g), !y || y.length !== v.length) return a;
                                        for (c = 0, p = 0; p < v.length; p++) b = v[p], w = f.indexOf(b, c), a.appendXtra(f.substr(c, w - c), Number(b), re(y[p], b), "", A && "px" === f.substr(w + b.length, 2), 0 === p), c = w + b.length;
                                        a["xs" + a.l] += f.substr(c)
                                    } else a["xs" + a.l] += a.l ? " " + f : f;
                                    if (-1 !== s.indexOf("=") && a.data) {
                                        for (S = a.xs0 + a.data.s, u = 1; u < a.l; u++) S += a["xs" + u] + a.data["xn" + u];
                                        a.e = S + a["xs" + u]
                                    }
                                    return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                                },
                                me = 9;
                            for (l = fe.prototype, l.l = l.pr = 0; --me > 0;) l["xn" + me] = 0, l["xs" + me] = "";
                            l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function(t, e, i, s, r, n) {
                                var a = this,
                                    o = a.l;
                                return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new fe(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                                    s: e + i
                                }, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
                            };
                            var ge = function(t, e) {
                                    e = e || {}, this.p = e.prefix ? Z(t) || t : t, h[t] = h[this.p] = this, this.format = e.formatter || ue(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                                },
                                ve = Y._registerComplexSpecialProp = function(t, e, i) {
                                    "object" != typeof e && (e = {
                                        parser: i
                                    });
                                    var s, r, n = t.split(","),
                                        a = e.defaultValue;
                                    for (i = i || [a], s = 0; s < n.length; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || a, r = new ge(n[s], e)
                                },
                                ye = function(t) {
                                    if (!h[t]) {
                                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                                        ve(t, {
                                            parser: function(t, i, s, r, n, a, l) {
                                                var _ = o.com.greensock.plugins[e];
                                                return _ ? (_._cssRegister(), h[s].parse(t, i, s, r, n, a, l)) : (V("Error: " + e + " js file not loaded."), n)
                                            }
                                        })
                                    }
                                };
                            l = ge.prototype, l.parseComplex = function(t, e, i, s, r, n) {
                                var a, o, h, l, _, u, p = this.keyword;
                                if (this.multi && (M.test(i) || M.test(e) ? (o = e.replace(M, "|").split("|"), h = i.replace(M, "|").split("|")) : p && (o = [e], h = [i])), h) {
                                    for (l = h.length > o.length ? h.length : o.length, a = 0; l > a; a++) e = o[a] = o[a] || this.dflt, i = h[a] = h[a] || this.dflt, p && (_ = e.indexOf(p), u = i.indexOf(p), _ !== u && (i = -1 === u ? h : o, i[a] += " " + p));
                                    e = o.join(", "), i = h.join(", ")
                                }
                                return de(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
                            }, l.parse = function(t, e, i, s, n, a) {
                                return this.parseComplex(t.style, this.format($(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
                            }, a.registerSpecialProp = function(t, e, i) {
                                ve(t, {
                                    parser: function(t, s, r, n, a, o) {
                                        var h = new fe(t, r, 0, 0, a, 2, r, !1, i);
                                        return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
                                    },
                                    priority: i
                                })
                            };
                            var Te, xe = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                                we = Z("transform"),
                                be = q + "transform",
                                Pe = Z("transformOrigin"),
                                Se = null !== Z("perspective"),
                                Re = Y.Transform = function() {
                                    this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = a.defaultForce3D !== !1 && Se ? a.defaultForce3D || "auto" : !1
                                },
                                ke = window.SVGElement,
                                Oe = function(t, e, i) {
                                    var s, r = I.createElementNS("http://www.w3.org/2000/svg", t),
                                        n = /([a-z])([A-Z])/g;
                                    for (s in i) r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
                                    return e.appendChild(r), r
                                },
                                Ae = document.documentElement,
                                Ce = function() {
                                    var t, e, i, s = d || /Android/i.test(B) && !window.chrome;
                                    return I.createElementNS && !s && (t = Oe("svg", Ae), e = Oe("strokeRect", t, {
                                        width: 100,
                                        height: 50,
                                        x: 100
                                    }), i = e.getBoundingClientRect().width, e.style[Pe] = "50% 50%", e.style[we] = "scaleX(0.5)", s = i === e.getBoundingClientRect().width && !(c && Se), Ae.removeChild(t)), s
                                }(),
                                De = function(t, e, i) {
                                    var s = t.getBBox();
                                    e = se(e).split(" "), i.xOrigin = (-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * s.width : parseFloat(e[0])) + s.x, i.yOrigin = (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * s.height : parseFloat(e[1])) + s.y
                                },
                                Me = Y.getTransform = function(t, e, i, s) {
                                    if (t._gsTransform && i && !s) return t._gsTransform;
                                    var n, o, h, l, _, u, p, c, f, d, m = i ? t._gsTransform || new Re : new Re,
                                        g = m.scaleX < 0,
                                        v = 2e-5,
                                        y = 1e5,
                                        T = Se ? parseFloat($(t, Pe, e, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
                                        x = parseFloat(a.defaultTransformPerspective) || 0;
                                    if (we ? o = $(t, be, e, !0) : t.currentStyle && (o = t.currentStyle.filter.match(C), o = o && 4 === o.length ? [o[0].substr(4), Number(o[2].substr(4)), Number(o[1].substr(4)), o[3].substr(4), m.x || 0, m.y || 0].join(",") : ""), n = !o || "none" === o || "matrix(1, 0, 0, 1, 0, 0)" === o, m.svg = !!(ke && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM)), m.svg && (De(t, $(t, Pe, r, !1, "50% 50%") + "", m), Te = a.useSVGTransformAttr || Ce, h = t.getAttribute("transform"), n && h && -1 !== h.indexOf("matrix") && (o = h, n = 0)), !n) {
                                        for (h = (o || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], l = h.length; --l > -1;) _ = Number(h[l]), h[l] = (u = _ - (_ |= 0)) ? (u * y + (0 > u ? -.5 : .5) | 0) / y + _ : _;
                                        if (16 === h.length) {
                                            var w, b, P, S, R, k = h[0],
                                                O = h[1],
                                                A = h[2],
                                                D = h[3],
                                                M = h[4],
                                                z = h[5],
                                                X = h[6],
                                                I = h[7],
                                                N = h[8],
                                                L = h[9],
                                                E = h[10],
                                                Y = h[12],
                                                B = h[13],
                                                U = h[14],
                                                j = h[11],
                                                V = Math.atan2(X, E);
                                            m.zOrigin && (U = -m.zOrigin, Y = N * U - h[12], B = L * U - h[13], U = E * U + m.zOrigin - h[14]), m.rotationX = V * F, V && (S = Math.cos(-V), R = Math.sin(-V), w = M * S + N * R, b = z * S + L * R, P = X * S + E * R, N = M * -R + N * S, L = z * -R + L * S, E = X * -R + E * S, j = I * -R + j * S, M = w, z = b, X = P), V = Math.atan2(N, E), m.rotationY = V * F, V && (S = Math.cos(-V), R = Math.sin(-V), w = k * S - N * R, b = O * S - L * R, P = A * S - E * R, L = O * R + L * S, E = A * R + E * S, j = D * R + j * S, k = w, O = b, A = P), V = Math.atan2(O, k), m.rotation = V * F, V && (S = Math.cos(-V), R = Math.sin(-V), k = k * S + M * R, b = O * S + z * R, z = O * -R + z * S, X = A * -R + X * S, O = b), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY += 180), m.scaleX = (Math.sqrt(k * k + O * O) * y + .5 | 0) / y, m.scaleY = (Math.sqrt(z * z + L * L) * y + .5 | 0) / y, m.scaleZ = (Math.sqrt(X * X + E * E) * y + .5 | 0) / y, m.skewX = 0, m.perspective = j ? 1 / (0 > j ? -j : j) : 0, m.x = Y, m.y = B, m.z = U
                                        } else if (!(Se && !s && h.length && m.x === h[4] && m.y === h[5] && (m.rotationX || m.rotationY) || void 0 !== m.x && "none" === $(t, "display", e))) {
                                            var q = h.length >= 6,
                                                W = q ? h[0] : 1,
                                                Z = h[1] || 0,
                                                G = h[2] || 0,
                                                Q = q ? h[3] : 1;
                                            m.x = h[4] || 0, m.y = h[5] || 0, p = Math.sqrt(W * W + Z * Z), c = Math.sqrt(Q * Q + G * G), f = W || Z ? Math.atan2(Z, W) * F : m.rotation || 0, d = G || Q ? Math.atan2(G, Q) * F + f : m.skewX || 0, Math.abs(d) > 90 && Math.abs(d) < 270 && (g ? (p *= -1, d += 0 >= f ? 180 : -180, f += 0 >= f ? 180 : -180) : (c *= -1, d += 0 >= d ? 180 : -180)), m.scaleX = p, m.scaleY = c, m.rotation = f, m.skewX = d, Se && (m.rotationX = m.rotationY = m.z = 0, m.perspective = x, m.scaleZ = 1)
                                        }
                                        m.zOrigin = T;
                                        for (l in m) m[l] < v && m[l] > -v && (m[l] = 0)
                                    }
                                    return i && (t._gsTransform = m), m
                                },
                                ze = function(t) {
                                    var e, i, s = this.data,
                                        r = -s.rotation * z,
                                        n = r + s.skewX * z,
                                        a = 3e5,
                                        o = (Math.cos(r) * s.scaleX * a | 0) / a,
                                        h = (Math.sin(r) * s.scaleX * a | 0) / a,
                                        l = (Math.sin(n) * -s.scaleY * a | 0) / a,
                                        _ = (Math.cos(n) * s.scaleY * a | 0) / a,
                                        u = this.t.style,
                                        p = this.t.currentStyle;
                                    if (p) {
                                        i = h, h = -l, l = -i, e = p.filter, u.filter = "";
                                        var c, f, m = this.t.offsetWidth,
                                            g = this.t.offsetHeight,
                                            v = "absolute" !== p.position,
                                            y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _,
                                            w = s.x + m * s.xPercent / 100,
                                            b = s.y + g * s.yPercent / 100;
                                        if (null != s.ox && (c = (s.oxp ? m * s.ox * .01 : s.ox) - m / 2, f = (s.oyp ? g * s.oy * .01 : s.oy) - g / 2, w += c - (c * o + f * h), b += f - (c * l + f * _)), v ? (c = m / 2, f = g / 2, y += ", Dx=" + (c - (c * o + f * h) + w) + ", Dy=" + (f - (c * l + f * _) + b) + ")") : y += ", sizingMethod='auto expand')", u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(D, y) : y + " " + e, (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === y.indexOf("Dx=0, Dy=0") || x.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
                                            var P, S, R, k = 8 > d ? 1 : -1;
                                            for (c = s.ieOffsetX || 0, f = s.ieOffsetY || 0, s.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > h ? -h : h) * g)) / 2 + w), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * m)) / 2 + b), me = 0; 4 > me; me++) S = ee[me], P = p[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : Q(this.t, S, parseFloat(P), P.replace(T, "")) || 0, R = i !== s[S] ? 2 > me ? -s.ieOffsetX : -s.ieOffsetY : 2 > me ? c - s.ieOffsetX : f - s.ieOffsetY, u[S] = (s[S] = Math.round(i - R * (0 === me || 2 === me ? 1 : k))) + "px"
                                        }
                                    }
                                },
                                Fe = Y.set3DTransformRatio = function(t) {
                                    var e, i, s, r, n, a, o, h, l, _, u, p, f, d, m, g, v, y, T, x, w, b = this.data,
                                        P = this.t.style,
                                        S = b.rotation * z,
                                        R = b.scaleX,
                                        k = b.scaleY,
                                        O = b.scaleZ,
                                        A = b.x,
                                        C = b.y,
                                        D = b.z,
                                        M = b.perspective;
                                    if (!(1 !== t && 0 !== t && b.force3D || b.force3D === !0 || b.rotationY || b.rotationX || 1 !== O || M || D)) return void Xe.call(this, t);
                                    if (c && (d = 1e-4, d > R && R > -d && (R = O = 2e-5), d > k && k > -d && (k = O = 2e-5), !M || b.z || b.rotationX || b.rotationY || (M = 0)), S || b.skewX) m = e = Math.cos(S), g = r = Math.sin(S), b.skewX && (S -= b.skewX * z, m = Math.cos(S), g = Math.sin(S), "simple" === b.skewType && (v = Math.tan(b.skewX * z), v = Math.sqrt(1 + v * v), m *= v, g *= v)), i = -g, n = m;
                                    else {
                                        if (!(b.rotationY || b.rotationX || 1 !== O || M || b.svg)) return void(P[we] = (b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) translate3d(" : "translate3d(") + A + "px," + C + "px," + D + "px)" + (1 !== R || 1 !== k ? " scale(" + R + "," + k + ")" : ""));
                                        e = n = 1, i = r = 0
                                    }
                                    l = 1, s = a = o = h = _ = u = 0, p = M ? -1 / M : 0, f = b.zOrigin, d = 1e-6, x = ",", w = "0", S = b.rotationY * z, S && (m = Math.cos(S), g = Math.sin(S), o = -g, _ = p * -g, s = e * g, a = r * g, l = m, p *= m, e *= m, r *= m), S = b.rotationX * z, S && (m = Math.cos(S), g = Math.sin(S), v = i * m + s * g, y = n * m + a * g, h = l * g, u = p * g, s = i * -g + s * m, a = n * -g + a * m, l *= m, p *= m, i = v, n = y), 1 !== O && (s *= O, a *= O, l *= O, p *= O), 1 !== k && (i *= k, n *= k, h *= k, u *= k), 1 !== R && (e *= R, r *= R, o *= R, _ *= R), (f || b.svg) && (f && (A += s * -f, C += a * -f, D += l * -f + f), b.svg && (A += b.xOrigin - (b.xOrigin * e + b.yOrigin * i), C += b.yOrigin - (b.xOrigin * r + b.yOrigin * n)), d > A && A > -d && (A = w), d > C && C > -d && (C = w), d > D && D > -d && (D = 0)), T = b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) matrix3d(" : "matrix3d(", T += (d > e && e > -d ? w : e) + x + (d > r && r > -d ? w : r) + x + (d > o && o > -d ? w : o), T += x + (d > _ && _ > -d ? w : _) + x + (d > i && i > -d ? w : i) + x + (d > n && n > -d ? w : n), b.rotationX || b.rotationY ? (T += x + (d > h && h > -d ? w : h) + x + (d > u && u > -d ? w : u) + x + (d > s && s > -d ? w : s), T += x + (d > a && a > -d ? w : a) + x + (d > l && l > -d ? w : l) + x + (d > p && p > -d ? w : p) + x) : T += ",0,0,0,0,1,0,", T += A + x + C + x + D + x + (M ? 1 + -D / M : 1) + ")", P[we] = T
                                },
                                Xe = Y.set2DTransformRatio = function(t) {
                                    var e, i, s, r, n, a, o, h, l, _, u, p = this.data,
                                        c = this.t,
                                        f = c.style,
                                        d = p.x,
                                        m = p.y;
                                    return !(p.rotationX || p.rotationY || p.z || p.force3D === !0 || "auto" === p.force3D && 1 !== t && 0 !== t) || p.svg && Te || !Se ? (r = p.scaleX, n = p.scaleY, void(p.rotation || p.skewX || p.svg ? (e = p.rotation * z, i = e - p.skewX * z, s = 1e5, a = Math.cos(e) * r, o = Math.sin(e) * r, h = Math.sin(i) * -n, l = Math.cos(i) * n, p.svg && (d += p.xOrigin - (p.xOrigin * a + p.yOrigin * h), m += p.yOrigin - (p.xOrigin * o + p.yOrigin * l), u = 1e-6, u > d && d > -u && (d = 0), u > m && m > -u && (m = 0)), _ = (a * s | 0) / s + "," + (o * s | 0) / s + "," + (h * s | 0) / s + "," + (l * s | 0) / s + "," + d + "," + m + ")", p.svg && Te ? c.setAttribute("transform", "matrix(" + _) : f[we] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + _) : f[we] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + r + ",0,0," + n + "," + d + "," + m + ")")) : (this.setRatio = Fe, void Fe.call(this, t))
                                };
                            l = Re.prototype, l.x = l.y = l.z = l.skewX = l.skewY = l.rotation = l.rotationX = l.rotationY = l.zOrigin = l.xPercent = l.yPercent = 0, l.scaleX = l.scaleY = l.scaleZ = 1, ve("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
                                parser: function(t, e, i, s, n, o, h) {
                                    if (s._lastParsedTransform === h) return n;
                                    s._lastParsedTransform = h;
                                    var l, _, u, p, c, f, d, m = s._transform = Me(t, r, !0, h.parseTransform),
                                        g = t.style,
                                        v = 1e-6,
                                        y = xe.length,
                                        T = h,
                                        x = {};
                                    if ("string" == typeof T.transform && we) u = L.style, u[we] = T.transform, u.display = "block", u.position = "absolute", I.body.appendChild(L), l = Me(L, null, !1), I.body.removeChild(L);
                                    else if ("object" == typeof T) {
                                        if (l = {
                                                scaleX: ne(null != T.scaleX ? T.scaleX : T.scale, m.scaleX),
                                                scaleY: ne(null != T.scaleY ? T.scaleY : T.scale, m.scaleY),
                                                scaleZ: ne(T.scaleZ, m.scaleZ),
                                                x: ne(T.x, m.x),
                                                y: ne(T.y, m.y),
                                                z: ne(T.z, m.z),
                                                xPercent: ne(T.xPercent, m.xPercent),
                                                yPercent: ne(T.yPercent, m.yPercent),
                                                perspective: ne(T.transformPerspective, m.perspective)
                                            }, d = T.directionalRotation, null != d)
                                            if ("object" == typeof d)
                                                for (u in d) T[u] = d[u];
                                            else T.rotation = d;
                                            "string" == typeof T.x && -1 !== T.x.indexOf("%") && (l.x = 0, l.xPercent = ne(T.x, m.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (l.y = 0, l.yPercent = ne(T.y, m.yPercent)), l.rotation = ae("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : m.rotation, m.rotation, "rotation", x), Se && (l.rotationX = ae("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", x), l.rotationY = ae("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", x)), l.skewX = null == T.skewX ? m.skewX : ae(T.skewX, m.skewX), l.skewY = null == T.skewY ? m.skewY : ae(T.skewY, m.skewY), (_ = l.skewY - m.skewY) && (l.skewX += _, l.rotation += _)
                                    }
                                    for (Se && null != T.force3D && (m.force3D = T.force3D, f = !0), m.skewType = T.skewType || m.skewType || a.defaultSkewType, c = m.force3D || m.z || m.rotationX || m.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, c || null == T.scale || (l.scaleZ = 1); --y > -1;) i = xe[y], p = l[i] - m[i], (p > v || -v > p || null != T[i] || null != X[i]) && (f = !0, n = new fe(m, i, m[i], p, n), i in x && (n.e = x[i]), n.xs0 = 0, n.plugin = o, s._overwriteProps.push(n.n));
                                    return p = T.transformOrigin, p && m.svg && (De(t, se(p), l), n = new fe(m, "xOrigin", m.xOrigin, l.xOrigin - m.xOrigin, n, -1, "transformOrigin"), n.b = m.xOrigin, n.e = n.xs0 = l.xOrigin, n = new fe(m, "yOrigin", m.yOrigin, l.yOrigin - m.yOrigin, n, -1, "transformOrigin"), n.b = m.yOrigin, n.e = n.xs0 = l.yOrigin, p = "0px 0px"), (p || Se && c && m.zOrigin) && (we ? (f = !0, i = Pe, p = (p || $(t, i, r, !1, "50% 50%")) + "", n = new fe(g, i, 0, 0, n, -1, "transformOrigin"), n.b = g[i], n.plugin = o, Se ? (u = m.zOrigin, p = p.split(" "), m.zOrigin = (p.length > 2 && (0 === u || "0px" !== p[2]) ? parseFloat(p[2]) : u) || 0, n.xs0 = n.e = p[0] + " " + (p[1] || "50%") + " 0px", n = new fe(m, "zOrigin", 0, 0, n, -1, n.n), n.b = u, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = p) : se(p + "", m)), f && (s._transformType = m.svg && Te || !c && 3 !== this._transformType ? 2 : 3), n
                                },
                                prefix: !0
                            }), ve("boxShadow", {
                                defaultValue: "0px 0px 0px 0px #999",
                                prefix: !0,
                                color: !0,
                                multi: !0,
                                keyword: "inset"
                            }), ve("borderRadius", {
                                defaultValue: "0px",
                                parser: function(t, e, i, n, a) {
                                    e = this.format(e);
                                    var o, h, l, _, u, p, c, f, d, m, g, v, y, T, x, w, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                                        P = t.style;
                                    for (d = parseFloat(t.offsetWidth), m = parseFloat(t.offsetHeight), o = e.split(" "), h = 0; h < b.length; h++) this.p.indexOf("border") && (b[h] = Z(b[h])), u = _ = $(t, b[h], r, !1, "0px"), -1 !== u.indexOf(" ") && (_ = u.split(" "), u = _[0], _ = _[1]), p = l = o[h], c = parseFloat(u), v = u.substr((c + "").length), y = "=" === p.charAt(1), y ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), g = p.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(p), g = p.substr((f + "").length)), "" === g && (g = s[i] || v), g !== v && (T = Q(t, "borderLeft", c, v), x = Q(t, "borderTop", c, v), "%" === g ? (u = T / d * 100 + "%", _ = x / m * 100 + "%") : "em" === g ? (w = Q(t, "borderLeft", 1, "em"), u = T / w + "em", _ = x / w + "em") : (u = T + "px", _ = x + "px"), y && (p = parseFloat(u) + f + g, l = parseFloat(_) + f + g)), a = de(P, b[h], u + " " + _, p + " " + l, !1, "0px", a);
                                    return a
                                },
                                prefix: !0,
                                formatter: ue("0px 0px 0px 0px", !1, !0)
                            }), ve("backgroundPosition", {
                                defaultValue: "0 0",
                                parser: function(t, e, i, s, n, a) {
                                    var o, h, l, _, u, p, c = "background-position",
                                        f = r || G(t, null),
                                        m = this.format((f ? d ? f.getPropertyValue(c + "-x") + " " + f.getPropertyValue(c + "-y") : f.getPropertyValue(c) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                                        g = this.format(e);
                                    if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (p = $(t, "backgroundImage").replace(k, ""), p && "none" !== p)) {
                                        for (o = m.split(" "), h = g.split(" "), E.setAttribute("src", p), l = 2; --l > -1;) m = o[l], _ = -1 !== m.indexOf("%"), _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - E.width : t.offsetHeight - E.height, o[l] = _ ? parseFloat(m) / 100 * u + "px" : parseFloat(m) / u * 100 + "%");
                                        m = o.join(" ")
                                    }
                                    return this.parseComplex(t.style, m, g, n, a)
                                },
                                formatter: se
                            }), ve("backgroundSize", {
                                defaultValue: "0 0",
                                formatter: se
                            }), ve("perspective", {
                                defaultValue: "0px",
                                prefix: !0
                            }), ve("perspectiveOrigin", {
                                defaultValue: "50% 50%",
                                prefix: !0
                            }), ve("transformStyle", {
                                prefix: !0
                            }), ve("backfaceVisibility", {
                                prefix: !0
                            }), ve("userSelect", {
                                prefix: !0
                            }), ve("margin", {
                                parser: pe("marginTop,marginRight,marginBottom,marginLeft")
                            }), ve("padding", {
                                parser: pe("paddingTop,paddingRight,paddingBottom,paddingLeft")
                            }), ve("clip", {
                                defaultValue: "rect(0px,0px,0px,0px)",
                                parser: function(t, e, i, s, n, a) {
                                    var o, h, l;
                                    return 9 > d ? (h = t.currentStyle, l = 8 > d ? " " : ",", o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (o = this.format($(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
                                }
                            }), ve("textShadow", {
                                defaultValue: "0px 0px 0px #999",
                                color: !0,
                                multi: !0
                            }), ve("autoRound,strictUnits", {
                                parser: function(t, e, i, s, r) {
                                    return r
                                }
                            }), ve("border", {
                                defaultValue: "0px solid #000",
                                parser: function(t, e, i, s, n, a) {
                                    return this.parseComplex(t.style, this.format($(t, "borderTopWidth", r, !1, "0px") + " " + $(t, "borderTopStyle", r, !1, "solid") + " " + $(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
                                },
                                color: !0,
                                formatter: function(t) {
                                    var e = t.split(" ");
                                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(_e) || ["#000"])[0]
                                }
                            }), ve("borderWidth", {
                                parser: pe("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                            }), ve("float,cssFloat,styleFloat", {
                                parser: function(t, e, i, s, r) {
                                    var n = t.style,
                                        a = "cssFloat" in n ? "cssFloat" : "styleFloat";
                                    return new fe(n, a, 0, 0, r, -1, i, !1, 0, n[a], e)
                                }
                            });
                            var Ie = function(t) {
                                var e, i = this.t,
                                    s = i.filter || $(this.data, "filter") || "",
                                    r = this.s + this.c * t | 0;
                                100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"), e = !$(this.data, "filter")) : (i.filter = s.replace(b, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(x, "opacity=" + r))
                            };
                            ve("opacity,alpha,autoAlpha", {
                                defaultValue: "1",
                                parser: function(t, e, i, s, n, a) {
                                    var o = parseFloat($(t, "opacity", r, !1, "1")),
                                        h = t.style,
                                        l = "autoAlpha" === i;
                                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), l && 1 === o && "hidden" === $(t, "visibility", r) && 0 !== e && (o = 0), U ? n = new fe(h, "opacity", o, e - o, n) : (n = new fe(h, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = l ? 1 : 0, h.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Ie), l && (n = new fe(h, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", s._overwriteProps.push(n.n), s._overwriteProps.push(i)), n
                                }
                            });
                            var Ne = function(t, e) {
                                    e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(S, "-$1").toLowerCase())) : t.removeAttribute(e))
                                },
                                Le = function(t) {
                                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                                        for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ne(i, e.p), e = e._next;
                                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                                };
                            ve("className", {
                                parser: function(t, e, s, n, a, o, h) {
                                    var l, _, u, p, c, f = t.getAttribute("class") || "",
                                        d = t.style.cssText;
                                    if (a = n._classNamePT = new fe(t, s, 0, 0, a, 2), a.setRatio = Le, a.pr = -11, i = !0, a.b = f, _ = K(t, r), u = t._gsClassPT) {
                                        for (p = {}, c = u.data; c;) p[c.p] = 1, c = c._next;
                                        u.setRatio(1)
                                    }
                                    return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : f.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.setAttribute("class", a.e), l = J(t, _, K(t), h, p), t.setAttribute("class", f), a.data = l.firstMPT, t.style.cssText = d, a = a.xfirst = n.parse(t, l.difs, a, o)), a
                                }
                            });
                            var Ee = function(t) {
                                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                                    var e, i, s, r, n = this.t.style,
                                        a = h.transform.parse;
                                    if ("all" === this.e) n.cssText = "", r = !0;
                                    else
                                        for (e = this.e.split(" ").join("").split(","), s = e.length; --s > -1;) i = e[s], h[i] && (h[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Pe : h[i].p), Ne(n, i);
                                    r && (Ne(n, we), this.t._gsTransform && delete this.t._gsTransform)
                                }
                            };
                            for (ve("clearProps", {
                                    parser: function(t, e, s, r, n) {
                                        return n = new fe(t, s, 0, 0, n, 2), n.setRatio = Ee, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
                                    }
                                }), l = "bezier,throwProps,physicsProps,physics2D".split(","), me = l.length; me--;) ye(l[me]);
                            l = a.prototype, l._firstPT = l._lastParsedTransform = l._transform = null, l._onInitTween = function(t, e, o) {
                                if (!t.nodeType) return !1;
                                this._target = t, this._tween = o, this._vars = e, _ = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = G(t, ""), n = this._overwriteProps;
                                var h, l, c, d, m, g, v, y, T, x = t.style;
                                if (u && "" === x.zIndex && (h = $(t, "zIndex", r), ("auto" === h || "" === h) && this._addLazySet(x, "zIndex", 0)), "string" == typeof e && (d = x.cssText, h = K(t, r), x.cssText = d + ";" + e, h = J(t, h, K(t)).difs, !U && w.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, x.cssText = d), this._firstPT = l = this.parse(t, e, null), this._transformType) {
                                    for (T = 3 === this._transformType, we ? p && (u = !0, "" === x.zIndex && (v = $(t, "zIndex", r), ("auto" === v || "" === v) && this._addLazySet(x, "zIndex", 0)), f && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, c = l; c && c._next;) c = c._next;
                                    y = new fe(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, c), y.setRatio = T && Se ? Fe : we ? Xe : ze, y.data = this._transform || Me(t, r, !0), n.pop()
                                }
                                if (i) {
                                    for (; l;) {
                                        for (g = l._next, c = d; c && c.pr > l.pr;) c = c._next;
                                        (l._prev = c ? c._prev : m) ? l._prev._next = l: d = l, (l._next = c) ? c._prev = l : m = l, l = g
                                    }
                                    this._firstPT = d
                                }
                                return !0
                            }, l.parse = function(t, e, i, n) {
                                var a, o, l, u, p, c, f, d, m, g, v = t.style;
                                for (a in e) c = e[a], o = h[a], o ? i = o.parse(t, c, a, this, i, n, e) : (p = $(t, a, r) + "", m = "string" == typeof c, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && P.test(c) ? (m || (c = le(c), c = (c.length > 3 ? "rgba(" : "rgb(") + c.join(",") + ")"), i = de(v, a, p, c, !0, "transparent", i, 0, n)) : !m || -1 === c.indexOf(" ") && -1 === c.indexOf(",") ? (l = parseFloat(p), f = l || 0 === l ? p.substr((l + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (l = ie(t, a, r), f = "px") : "left" === a || "top" === a ? (l = H(t, a, r), f = "px") : (l = "opacity" !== a ? 0 : 1, f = "")), g = m && "=" === c.charAt(1), g ? (u = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), u *= parseFloat(c), d = c.replace(T, "")) : (u = parseFloat(c), d = m ? c.replace(T, "") : ""), "" === d && (d = a in s ? s[a] : f), c = u || 0 === u ? (g ? u + l : u) + d : e[a], f !== d && "" !== d && (u || 0 === u) && l && (l = Q(t, a, l, f), "%" === d ? (l /= Q(t, a, 100, "%") / 100, e.strictUnits !== !0 && (p = l + "%")) : "em" === d ? l /= Q(t, a, 1, "em") : "px" !== d && (u = Q(t, a, u, d), d = "px"), g && (u || 0 === u) && (c = u + l + d)), g && (u += l), !l && 0 !== l || !u && 0 !== u ? void 0 !== v[a] && (c || c + "" != "NaN" && null != c) ? (i = new fe(v, a, u || l || 0, 0, i, -1, a, !1, 0, p, c), i.xs0 = "none" !== c || "display" !== a && -1 === a.indexOf("Style") ? c : p) : V("invalid " + a + " tween value: " + e[a]) : (i = new fe(v, a, l, u - l, i, 0, a, _ !== !1 && ("px" === d || "zIndex" === a), 0, p, c), i.xs0 = d)) : i = de(v, a, p, c, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
                                return i
                            }, l.setRatio = function(t) {
                                var e, i, s, r = this._firstPT,
                                    n = 1e-6;
                                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                                        for (; r;) {
                                            if (e = r.c * t + r.s, r.r ? e = Math.round(e) : n > e && e > -n && (e = 0), r.type)
                                                if (1 === r.type)
                                                    if (s = r.l, 2 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                                    else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                            else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                            else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                            else {
                                                for (i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++) i += r["xn" + s] + r["xs" + (s + 1)];
                                                r.t[r.p] = i
                                            } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                            else r.t[r.p] = e + r.xs0;
                                            r = r._next
                                        } else
                                            for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                                    else
                                        for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
                            }, l._enableTransforms = function(t) {
                                this._transform = this._transform || Me(this._target, r, !0), this._transformType = this._transform.svg && Te || !t && 3 !== this._transformType ? 2 : 3
                            };
                            var Ye = function() {
                                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                            };
                            l._addLazySet = function(t, e, i) {
                                var s = this._firstPT = new fe(t, e, 0, 0, this._firstPT, 2);
                                s.e = i, s.setRatio = Ye, s.data = this
                            }, l._linkCSSP = function(t, e, i, s) {
                                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                            }, l._kill = function(e) {
                                var i, s, r, n = e;
                                if (e.autoAlpha || e.alpha) {
                                    n = {};
                                    for (s in e) n[s] = e[s];
                                    n.opacity = 1, n.autoAlpha && (n.visibility = 1)
                                }
                                return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
                            };
                            var Be = function(t, e, i) {
                                var s, r, n, a;
                                if (t.slice)
                                    for (r = t.length; --r > -1;) Be(t[r], e, i);
                                else
                                    for (s = t.childNodes, r = s.length; --r > -1;) n = s[r], a = n.type, n.style && (e.push(K(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Be(n, e, i)
                            };
                            return a.cascadeTo = function(t, i, s) {
                                var r, n, a, o = e.to(t, i, s),
                                    h = [o],
                                    l = [],
                                    _ = [],
                                    u = [],
                                    p = e._internals.reservedProps;
                                for (t = o._targets || o.target, Be(t, l, u), o.render(i, !0), Be(t, _), o.render(0, !0), o._enabled(!0), r = u.length; --r > -1;)
                                    if (n = J(u[r], l[r], _[r]), n.firstMPT) {
                                        n = n.difs;
                                        for (a in s) p[a] && (n[a] = s[a]);
                                        h.push(e.to(u[r], i, n))
                                    }
                                return h
                            }, t.activate([a]), a
                        }, !0),
                        function() {
                            var t = _gsScope._gsDefine.plugin({
                                    propName: "roundProps",
                                    priority: -1,
                                    API: 2,
                                    init: function(t, e, i) {
                                        return this._tween = i, !0
                                    }
                                }),
                                e = t.prototype;
                            e._onInitAllProps = function() {
                                for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;) a[r[n]] = 1;
                                for (n = r.length; --n > -1;)
                                    for (t = r[n], e = s._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o), e = i;
                                return !1
                            }, e._add = function(t, e, i, s) {
                                this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
                            }
                        }(), _gsScope._gsDefine.plugin({
                            propName: "attr",
                            API: 2,
                            version: "0.3.3",
                            init: function(t, e) {
                                var i, s, r;
                                if ("function" != typeof t.setAttribute) return !1;
                                this._target = t, this._proxy = {}, this._start = {}, this._end = {};
                                for (i in e) this._start[i] = this._proxy[i] = s = t.getAttribute(i), r = this._addTween(this._proxy, i, parseFloat(s), e[i], i), this._end[i] = r ? r.s + r.c : e[i], this._overwriteProps.push(i);
                                return !0
                            },
                            set: function(t) {
                                this._super.setRatio.call(this, t);
                                for (var e, i = this._overwriteProps, s = i.length, r = 1 === t ? this._end : t ? this._proxy : this._start; --s > -1;) e = i[s], this._target.setAttribute(e, r[e] + "")
                            }
                        }), _gsScope._gsDefine.plugin({
                            propName: "directionalRotation",
                            version: "0.2.1",
                            API: 2,
                            init: function(t, e) {
                                "object" != typeof e && (e = {
                                    rotation: e
                                }), this.finals = {};
                                var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360,
                                    l = 1e-6;
                                for (i in e) "useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (a / h | 0) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (a / h | 0) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
                                return !0
                            },
                            set: function(t) {
                                var e;
                                if (1 !== t) this._super.setRatio.call(this, t);
                                else
                                    for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                            }
                        })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                            var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope,
                                n = r.com.greensock,
                                a = 2 * Math.PI,
                                o = Math.PI / 2,
                                h = n._class,
                                l = function(e, i) {
                                    var s = h("easing." + e, function() {}, !0),
                                        r = s.prototype = new t;
                                    return r.constructor = s, r.getRatio = i, s
                                },
                                _ = t.register || function() {},
                                u = function(t, e, i, s) {
                                    var r = h("easing." + t, {
                                        easeOut: new e,
                                        easeIn: new i,
                                        easeInOut: new s
                                    }, !0);
                                    return _(r, t), r
                                },
                                p = function(t, e, i) {
                                    this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                                },
                                c = function(e, i) {
                                    var s = h("easing." + e, function(t) {
                                            this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                                        }, !0),
                                        r = s.prototype = new t;
                                    return r.constructor = s, r.getRatio = i, r.config = function(t) {
                                        return new s(t)
                                    }, s
                                },
                                f = u("Back", c("BackOut", function(t) {
                                    return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                                }), c("BackIn", function(t) {
                                    return t * t * ((this._p1 + 1) * t - this._p1)
                                }), c("BackInOut", function(t) {
                                    return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                                })),
                                d = h("easing.SlowMo", function(t, e, i) {
                                    e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                                }, !0),
                                m = d.prototype = new t;
                            return m.constructor = d, m.getRatio = function(t) {
                                var e = t + (.5 - t) * this._p;
                                return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                            }, d.ease = new d(.7, .7), m.config = d.config = function(t, e, i) {
                                return new d(t, e, i)
                            }, e = h("easing.SteppedEase", function(t) {
                                t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                            }, !0), m = e.prototype = new t, m.constructor = e, m.getRatio = function(t) {
                                return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                            }, m.config = e.config = function(t) {
                                return new e(t)
                            }, i = h("easing.RoughEase", function(e) {
                                e = e || {};
                                for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), c = u, f = e.randomize !== !1, d = e.clamp === !0, m = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --c > -1;) i = f ? Math.random() : 1 / u * c, s = m ? m.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = n * n * .5 * g) : (n = 2 * (1 - i), r = n * n * .5 * g), f ? s += Math.random() * r - .5 * r : c % 2 ? s += .5 * r : s -= .5 * r, d && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                                    x: i,
                                    y: s
                                };
                                for (l.sort(function(t, e) {
                                        return t.x - e.x
                                    }), o = new p(1, 1, null), c = u; --c > -1;) a = l[c], o = new p(a.x, a.y, o);
                                this._prev = new p(0, 0, 0 !== o.t ? o : o.next)
                            }, !0), m = i.prototype = new t, m.constructor = i, m.getRatio = function(t) {
                                var e = this._prev;
                                if (t > e.t) {
                                    for (; e.next && t >= e.t;) e = e.next;
                                    e = e.prev
                                } else
                                    for (; e.prev && t <= e.t;) e = e.prev;
                                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                            }, m.config = function(t) {
                                return new i(t)
                            }, i.ease = new i, u("Bounce", l("BounceOut", function(t) {
                                return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                            }), l("BounceIn", function(t) {
                                return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                            }), l("BounceInOut", function(t) {
                                var e = .5 > t;
                                return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                            })), u("Circ", l("CircOut", function(t) {
                                return Math.sqrt(1 - (t -= 1) * t)
                            }), l("CircIn", function(t) {
                                return -(Math.sqrt(1 - t * t) - 1)
                            }), l("CircInOut", function(t) {
                                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                            })), s = function(e, i, s) {
                                var r = h("easing." + e, function(t, e) {
                                        this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
                                    }, !0),
                                    n = r.prototype = new t;
                                return n.constructor = r, n.getRatio = i, n.config = function(t, e) {
                                    return new r(t, e)
                                }, r
                            }, u("Elastic", s("ElasticOut", function(t) {
                                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
                            }, .3), s("ElasticIn", function(t) {
                                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
                            }, .3), s("ElasticInOut", function(t) {
                                return (t *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) * .5 + 1
                            }, .45)), u("Expo", l("ExpoOut", function(t) {
                                return 1 - Math.pow(2, -10 * t)
                            }), l("ExpoIn", function(t) {
                                return Math.pow(2, 10 * (t - 1)) - .001
                            }), l("ExpoInOut", function(t) {
                                return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                            })), u("Sine", l("SineOut", function(t) {
                                return Math.sin(t * o)
                            }), l("SineIn", function(t) {
                                return -Math.cos(t * o) + 1
                            }), l("SineInOut", function(t) {
                                return -.5 * (Math.cos(Math.PI * t) - 1)
                            })), h("easing.EaseLookup", {
                                find: function(e) {
                                    return t.map[e]
                                }
                            }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), f
                        }, !0)
                }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
                function(t, e) {
                    "use strict";
                    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
                    if (!i.TweenLite) {
                        var s, r, n, a, o, h = function(t) {
                                var e, s = t.split("."),
                                    r = i;
                                for (e = 0; e < s.length; e++) r[s[e]] = r = r[s[e]] || {};
                                return r
                            },
                            l = h("com.greensock"),
                            _ = 1e-10,
                            u = function(t) {
                                var e, i = [],
                                    s = t.length;
                                for (e = 0; e !== s; i.push(t[e++]));
                                return i
                            },
                            p = function() {},
                            c = function() {
                                var t = Object.prototype.toString,
                                    e = t.call([]);
                                return function(i) {
                                    return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                                }
                            }(),
                            f = {},
                            d = function(s, r, n, a) {
                                this.sc = f[s] ? f[s].sc : [], f[s] = this, this.gsClass = null, this.func = n;
                                var o = [];
                                this.check = function(l) {
                                    for (var _, u, p, c, m = r.length, g = m; --m > -1;)(_ = f[r[m]] || new d(r[m], [])).gsClass ? (o[m] = _.gsClass, g--) : l && _.sc.push(this);
                                    if (0 === g && n)
                                        for (u = ("com.greensock." + s).split("."), p = u.pop(), c = h(u.join("."))[p] = this.gsClass = n.apply(n, o), a && (i[p] = c, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function() {
                                                return c
                                            }) : s === e && "undefined" != typeof module && module.exports && (module.exports = c)), m = 0; m < this.sc.length; m++) this.sc[m].check()
                                }, this.check(!0)
                            },
                            m = t._gsDefine = function(t, e, i, s) {
                                return new d(t, e, i, s)
                            },
                            g = l._class = function(t, e, i) {
                                return e = e || function() {}, m(t, [], function() {
                                    return e
                                }, i), e
                            };
                        m.globals = i;
                        var v = [0, 0, 1, 1],
                            y = [],
                            T = g("easing.Ease", function(t, e, i, s) {
                                this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? v.concat(e) : v
                            }, !0),
                            x = T.map = {},
                            w = T.register = function(t, e, i, s) {
                                for (var r, n, a, o, h = e.split(","), _ = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
                                    for (n = h[_], r = s ? g("easing." + n, null, !0) : l.easing[n] || {}, a = u.length; --a > -1;) o = u[a], x[n + "." + o] = x[o + n] = r[o] = t.getRatio ? t : t[o] || new t
                            };
                        for (n = T.prototype, n._calcEnd = !1, n.getRatio = function(t) {
                                if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                                var e = this._type,
                                    i = this._power,
                                    s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                                return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
                            }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = s.length; --r > -1;) n = s[r] + ",Power" + r, w(new T(null, null, 1, r), n, "easeOut", !0), w(new T(null, null, 2, r), n, "easeIn" + (0 === r ? ",easeNone" : "")), w(new T(null, null, 3, r), n, "easeInOut");
                        x.linear = l.easing.Linear.easeIn, x.swing = l.easing.Quad.easeInOut;
                        var b = g("events.EventDispatcher", function(t) {
                            this._listeners = {}, this._eventTarget = t || this
                        });
                        n = b.prototype, n.addEventListener = function(t, e, i, s, r) {
                            r = r || 0;
                            var n, h, l = this._listeners[t],
                                _ = 0;
                            for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;) n = l[h], n.c === e && n.s === i ? l.splice(h, 1) : 0 === _ && n.pr < r && (_ = h + 1);
                            l.splice(_, 0, {
                                c: e,
                                s: i,
                                up: s,
                                pr: r
                            }), this !== a || o || a.wake()
                        }, n.removeEventListener = function(t, e) {
                            var i, s = this._listeners[t];
                            if (s)
                                for (i = s.length; --i > -1;)
                                    if (s[i].c === e) return void s.splice(i, 1)
                        }, n.dispatchEvent = function(t) {
                            var e, i, s, r = this._listeners[t];
                            if (r)
                                for (e = r.length, i = this._eventTarget; --e > -1;) s = r[e], s && (s.up ? s.c.call(s.s || i, {
                                    type: t,
                                    target: i
                                }) : s.c.call(s.s || i))
                        };
                        var P = t.requestAnimationFrame,
                            S = t.cancelAnimationFrame,
                            R = Date.now || function() {
                                return (new Date).getTime()
                            },
                            k = R();
                        for (s = ["ms", "moz", "webkit", "o"], r = s.length; --r > -1 && !P;) P = t[s[r] + "RequestAnimationFrame"], S = t[s[r] + "CancelAnimationFrame"] || t[s[r] + "CancelRequestAnimationFrame"];
                        g("Ticker", function(t, e) {
                            var i, s, r, n, h, l = this,
                                u = R(),
                                c = e !== !1 && P,
                                f = 500,
                                d = 33,
                                m = "tick",
                                g = function(t) {
                                    var e, a, o = R() - k;
                                    o > f && (u += o - d), k += o, l.time = (k - u) / 1e3, e = l.time - h, (!i || e > 0 || t === !0) && (l.frame++, h += e + (e >= n ? .004 : n - e), a = !0), t !== !0 && (r = s(g)), a && l.dispatchEvent(m)
                                };
                            b.call(l), l.time = l.frame = 0, l.tick = function() {
                                g(!0)
                            }, l.lagSmoothing = function(t, e) {
                                f = t || 1 / _, d = Math.min(e, f, 0)
                            }, l.sleep = function() {
                                null != r && (c && S ? S(r) : clearTimeout(r), s = p, r = null, l === a && (o = !1))
                            }, l.wake = function() {
                                null !== r ? l.sleep() : l.frame > 10 && (k = R() - f + 5), s = 0 === i ? p : c && P ? P : function(t) {
                                    return setTimeout(t, 1e3 * (h - l.time) + 1 | 0)
                                }, l === a && (o = !0), g(2)
                            }, l.fps = function(t) {
                                return arguments.length ? (i = t, n = 1 / (i || 60), h = this.time + n, void l.wake()) : i
                            }, l.useRAF = function(t) {
                                return arguments.length ? (l.sleep(), c = t, void l.fps(i)) : c
                            }, l.fps(t), setTimeout(function() {
                                c && (!r || l.frame < 5) && l.useRAF(!1)
                            }, 1500)
                        }), n = l.Ticker.prototype = new l.events.EventDispatcher, n.constructor = l.Ticker;
                        var O = g("core.Animation", function(t, e) {
                            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, j) {
                                o || a.wake();
                                var i = this.vars.useFrames ? U : j;
                                i.add(this, i._time), this.vars.paused && this.paused(!0)
                            }
                        });
                        a = O.ticker = new l.Ticker, n = O.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
                        var A = function() {
                            o && R() - k > 2e3 && a.wake(), setTimeout(A, 2e3)
                        };
                        A(), n.play = function(t, e) {
                            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                        }, n.pause = function(t, e) {
                            return null != t && this.seek(t, e), this.paused(!0)
                        }, n.resume = function(t, e) {
                            return null != t && this.seek(t, e), this.paused(!1)
                        }, n.seek = function(t, e) {
                            return this.totalTime(Number(t), e !== !1)
                        }, n.restart = function(t, e) {
                            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
                        }, n.reverse = function(t, e) {
                            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
                        }, n.render = function() {}, n.invalidate = function() {
                            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
                        }, n.isActive = function() {
                            var t, e = this._timeline,
                                i = this._startTime;
                            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale
                        }, n._enabled = function(t, e) {
                            return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
                        }, n._kill = function() {
                            return this._enabled(!1, !1)
                        }, n.kill = function(t, e) {
                            return this._kill(t, e), this
                        }, n._uncache = function(t) {
                            for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                            return this
                        }, n._swapSelfInParams = function(t) {
                            for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                            return i
                        }, n.eventCallback = function(t, e, i, s) {
                            if ("on" === (t || "").substr(0, 2)) {
                                var r = this.vars;
                                if (1 === arguments.length) return r[t];
                                null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = c(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
                            }
                            return this
                        }, n.delay = function(t) {
                            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
                        }, n.duration = function(t) {
                            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
                        }, n.totalDuration = function(t) {
                            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
                        }, n.time = function(t, e) {
                            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
                        }, n.totalTime = function(t, e, i) {
                            if (o || a.wake(), !arguments.length) return this._totalTime;
                            if (this._timeline) {
                                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                                    this._dirty && this.totalDuration();
                                    var s = this._totalDuration,
                                        r = this._timeline;
                                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                                        for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                                }
                                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), F.length && V())
                            }
                            return this
                        }, n.progress = n.totalProgress = function(t, e) {
                            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
                        }, n.startTime = function(t) {
                            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
                        }, n.endTime = function(t) {
                            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
                        }, n.timeScale = function(t) {
                            if (!arguments.length) return this._timeScale;
                            if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
                                var e = this._pauseTime,
                                    i = e || 0 === e ? e : this._timeline.totalTime();
                                this._startTime = i - (i - this._startTime) * this._timeScale / t
                            }
                            return this._timeScale = t, this._uncache(!1)
                        }, n.reversed = function(t) {
                            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                        }, n.paused = function(t) {
                            if (!arguments.length) return this._paused;
                            if (t != this._paused && this._timeline) {
                                o || t || a.wake();
                                var e = this._timeline,
                                    i = e.rawTime(),
                                    s = i - this._pauseTime;
                                !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
                            }
                            return this._gc && !t && this._enabled(!0, !1), this
                        };
                        var C = g("core.SimpleTimeline", function(t) {
                            O.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
                        });
                        n = C.prototype = new O, n.constructor = C, n.kill()._gc = !1, n._first = n._last = n._recent = null, n._sortChildren = !1, n.add = n.insert = function(t, e) {
                            var i, s;
                            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                                for (s = t._startTime; i && i._startTime > s;) i = i._prev;
                            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
                        }, n._remove = function(t, e) {
                            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                        }, n.render = function(t, e, i) {
                            var s, r = this._first;
                            for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
                        }, n.rawTime = function() {
                            return o || a.wake(), this._totalTime
                        };
                        var D = g("TweenLite", function(e, i, s) {
                                if (O.call(this, i, s), this.render = D.prototype.render, null == e) throw "Cannot tween a null target.";
                                this.target = e = "string" != typeof e ? e : D.selector(e) || e;
                                var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                                    h = this.vars.overwrite;
                                if (this._overwrite = h = null == h ? B[D.defaultOverwrite] : "number" == typeof h ? h >> 0 : B[h], (o || e instanceof Array || e.push && c(e)) && "number" != typeof e[0])
                                    for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], r = 0; r < a.length; r++) n = a[r], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(u(n))) : (this._siblings[r] = q(n, this, !1), 1 === h && this._siblings[r].length > 1 && Z(n, this, null, 1, this._siblings[r])) : (n = a[r--] = D.selector(n), "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1);
                                else this._propLookup = {}, this._siblings = q(e, this, !1), 1 === h && this._siblings.length > 1 && Z(e, this, null, 1, this._siblings);
                                (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay))
                            }, !0),
                            M = function(e) {
                                return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                            },
                            z = function(t, e) {
                                var i, s = {};
                                for (i in t) Y[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!N[i] || N[i] && N[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                                t.css = s
                            };
                        n = D.prototype = new O, n.constructor = D, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, D.version = "1.15.1", D.defaultEase = n._ease = new T(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = a, D.autoSleep = !0, D.lagSmoothing = function(t, e) {
                            a.lagSmoothing(t, e)
                        }, D.selector = t.$ || t.jQuery || function(e) {
                            var i = t.$ || t.jQuery;
                            return i ? (D.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
                        };
                        var F = [],
                            X = {},
                            I = D._internals = {
                                isArray: c,
                                isSelector: M,
                                lazyTweens: F
                            },
                            N = D._plugins = {},
                            L = I.tweenLookup = {},
                            E = 0,
                            Y = I.reservedProps = {
                                ease: 1,
                                delay: 1,
                                overwrite: 1,
                                onComplete: 1,
                                onCompleteParams: 1,
                                onCompleteScope: 1,
                                useFrames: 1,
                                runBackwards: 1,
                                startAt: 1,
                                onUpdate: 1,
                                onUpdateParams: 1,
                                onUpdateScope: 1,
                                onStart: 1,
                                onStartParams: 1,
                                onStartScope: 1,
                                onReverseComplete: 1,
                                onReverseCompleteParams: 1,
                                onReverseCompleteScope: 1,
                                onRepeat: 1,
                                onRepeatParams: 1,
                                onRepeatScope: 1,
                                easeParams: 1,
                                yoyo: 1,
                                immediateRender: 1,
                                repeat: 1,
                                repeatDelay: 1,
                                data: 1,
                                paused: 1,
                                reversed: 1,
                                autoCSS: 1,
                                lazy: 1,
                                onOverwrite: 1
                            },
                            B = {
                                none: 0,
                                all: 1,
                                auto: 2,
                                concurrent: 3,
                                allOnStart: 4,
                                preexisting: 5,
                                "true": 1,
                                "false": 0
                            },
                            U = O._rootFramesTimeline = new C,
                            j = O._rootTimeline = new C,
                            V = I.lazyRender = function() {
                                var t, e = F.length;
                                for (X = {}; --e > -1;) t = F[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                                F.length = 0
                            };
                        j._startTime = a.time, U._startTime = a.frame, j._active = U._active = !0, setTimeout(V, 1), O._updateRoot = D.render = function() {
                            var t, e, i;
                            if (F.length && V(), j.render((a.time - j._startTime) * j._timeScale, !1, !1), U.render((a.frame - U._startTime) * U._timeScale, !1, !1), F.length && V(), !(a.frame % 120)) {
                                for (i in L) {
                                    for (e = L[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                                    0 === e.length && delete L[i]
                                }
                                if (i = j._first, (!i || i._paused) && D.autoSleep && !U._first && 1 === a._listeners.tick.length) {
                                    for (; i && i._paused;) i = i._next;
                                    i || a.sleep()
                                }
                            }
                        }, a.addEventListener("tick", O._updateRoot);
                        var q = function(t, e, i) {
                                var s, r, n = t._gsTweenID;
                                if (L[n || (t._gsTweenID = n = "t" + E++)] || (L[n] = {
                                        target: t,
                                        tweens: []
                                    }), e && (s = L[n].tweens, s[r = s.length] = e, i))
                                    for (; --r > -1;) s[r] === e && s.splice(r, 1);
                                return L[n].tweens
                            },
                            W = function(t, e, i, s) {
                                var r, n, a = t.vars.onOverwrite;
                                return a && (r = a(t, e, i, s)), a = D.onOverwrite, a && (n = a(t, e, i, s)), r !== !1 && n !== !1
                            },
                            Z = function(t, e, i, s, r) {
                                var n, a, o, h;
                                if (1 === s || s >= 4) {
                                    for (h = r.length, n = 0; h > n; n++)
                                        if ((o = r[n]) !== e) o._gc || W(o, e) && o._enabled(!1, !1) && (a = !0);
                                        else if (5 === s) break;
                                    return a
                                }
                                var l, u = e._startTime + _,
                                    p = [],
                                    c = 0,
                                    f = 0 === e._duration;
                                for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (l = l || G(e, 0, f), 0 === G(o, l, f) && (p[c++] = o)) : o._startTime <= u && o._startTime + o.totalDuration() / o._timeScale > u && ((f || !o._initted) && u - o._startTime <= 2e-10 || (p[c++] = o)));
                                for (n = c; --n > -1;)
                                    if (o = p[n], 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || !o._firstPT && o._initted) {
                                        if (2 !== s && !W(o, e)) continue;
                                        o._enabled(!1, !1) && (a = !0)
                                    }
                                return a
                            },
                            G = function(t, e, i) {
                                for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
                                    if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
                                    s = s._timeline
                                }
                                return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * _ > n - e ? _ : (n += t.totalDuration() / t._timeScale / r) > e + _ ? 0 : n - e - _
                            };
                        n._init = function() {
                            var t, e, i, s, r, n = this.vars,
                                a = this._overwrittenProps,
                                o = this._duration,
                                h = !!n.immediateRender,
                                l = n.ease;
                            if (n.startAt) {
                                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                                for (s in n.startAt) r[s] = n.startAt[s];
                                if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && n.lazy !== !1, r.startAt = r.delay = null, this._startAt = D.to(this.target, 0, r), h)
                                    if (this._time > 0) this._startAt = null;
                                    else if (0 !== o) return
                            } else if (n.runBackwards && 0 !== o)
                                if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                                else {
                                    0 !== this._time && (h = !1), i = {};
                                    for (s in n) Y[s] && "autoCSS" !== s || (i[s] = n[s]);
                                    if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && n.lazy !== !1, i.immediateRender = h, this._startAt = D.to(this.target, 0, i), h) {
                                        if (0 === this._time) return
                                    } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                                }
                            if (this._ease = l = l ? l instanceof T ? l : "function" == typeof l ? new T(l, n.easeParams) : x[l] || D.defaultEase : D.defaultEase, n.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, n.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                                for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
                            else e = this._initProps(this.target, this._propLookup, this._siblings, a);
                            if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards)
                                for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                            this._onUpdate = n.onUpdate, this._initted = !0
                        }, n._initProps = function(e, i, s, r) {
                            var n, a, o, h, l, _;
                            if (null == e) return !1;
                            X[e._gsTweenID] && V(), this.vars.css || e.style && e !== t && e.nodeType && N.css && this.vars.autoCSS !== !1 && z(this.vars, e);
                            for (n in this.vars) {
                                if (_ = this.vars[n], Y[n]) _ && (_ instanceof Array || _.push && c(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this));
                                else if (N[n] && (h = new N[n])._onInitTween(e, this.vars[n], this)) {
                                    for (this._firstPT = l = {
                                            _next: this._firstPT,
                                            t: h,
                                            p: "setRatio",
                                            s: 0,
                                            c: 1,
                                            f: !0,
                                            n: n,
                                            pg: !0,
                                            pr: h._priority
                                        }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                                    (h._priority || h._onInitAllProps) && (o = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
                                } else this._firstPT = i[n] = l = {
                                    _next: this._firstPT,
                                    t: e,
                                    p: n,
                                    f: "function" == typeof e[n],
                                    n: n,
                                    pg: !1,
                                    pr: 0
                                }, l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
                                l && l._next && (l._next._prev = l)
                            }
                            return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && Z(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (X[e._gsTweenID] = !0), o)
                        }, n.render = function(t, e, i) {
                            var s, r, n, a, o = this._time,
                                h = this._duration,
                                l = this._rawPrevTime;
                            if (t >= h) this._totalTime = this._time = h, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete"), 0 === h && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > l || l === _ && "isPause" !== this.data) && l !== t && (i = !0, l > _ && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || l === t ? t : _);
                            else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === h && l > 0 && l !== _) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === h && (this._initted || !this.vars.lazy || i) && (l >= 0 && (l !== _ || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || l === t ? t : _)), this._initted || (i = !0);
                            else if (this._totalTime = this._time = t, this._easeType) {
                                var u = t / h,
                                    p = this._easeType,
                                    c = this._easePower;
                                (1 === p || 3 === p && u >= .5) && (u = 1 - u), 3 === p && (u *= 2), 1 === c ? u *= u : 2 === c ? u *= u * u : 3 === c ? u *= u * u * u : 4 === c && (u *= u * u * u * u), this.ratio = 1 === p ? 1 - u : 2 === p ? u : .5 > t / h ? u / 2 : 1 - u / 2
                            } else this.ratio = this._ease.getRatio(t / h);
                            if (this._time !== o || i) {
                                if (!this._initted) {
                                    if (this._init(), !this._initted || this._gc) return;
                                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = l, F.push(this), void(this._lazy = [t, e]);
                                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / h) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                }
                                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                                this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || y), 0 === h && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
                            }
                        }, n._kill = function(t, e, i) {
                            if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                            e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
                            var s, r, n, a, o, h, l, _, u;
                            if ((c(e) || M(e)) && "number" != typeof e[0])
                                for (s = e.length; --s > -1;) this._kill(t, e[s]) && (h = !0);
                            else {
                                if (this._targets) {
                                    for (s = this._targets.length; --s > -1;)
                                        if (e === this._targets[s]) {
                                            o = this._propLookup[s] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
                                            break
                                        }
                                } else {
                                    if (e !== this.target) return !1;
                                    o = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                                }
                                if (o) {
                                    if (l = t || o, _ = t !== r && "all" !== r && t !== o && ("object" != typeof t || !t._tempKill), i && (D.onOverwrite || this.vars.onOverwrite)) {
                                        for (n in l) o[n] && (u || (u = []), u.push(n));
                                        if (!W(this, i, e, u)) return !1
                                    }
                                    for (n in l)(a = o[n]) && (a.pg && a.t._kill(l) && (h = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[n]), _ && (r[n] = 1);
                                    !this._firstPT && this._initted && this._enabled(!1, !1)
                                }
                            }
                            return h
                        }, n.invalidate = function() {
                            return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], O.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -_, this.render(-this._delay)), this
                        }, n._enabled = function(t, e) {
                            if (o || a.wake(), t && this._gc) {
                                var i, s = this._targets;
                                if (s)
                                    for (i = s.length; --i > -1;) this._siblings[i] = q(s[i], this, !0);
                                else this._siblings = q(this.target, this, !0)
                            }
                            return O.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
                        }, D.to = function(t, e, i) {
                            return new D(t, e, i)
                        }, D.from = function(t, e, i) {
                            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i)
                        }, D.fromTo = function(t, e, i, s) {
                            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new D(t, e, s)
                        }, D.delayedCall = function(t, e, i, s, r) {
                            return new D(e, 0, {
                                delay: t,
                                onComplete: e,
                                onCompleteParams: i,
                                onCompleteScope: s,
                                onReverseComplete: e,
                                onReverseCompleteParams: i,
                                onReverseCompleteScope: s,
                                immediateRender: !1,
                                lazy: !1,
                                useFrames: r,
                                overwrite: 0
                            })
                        }, D.set = function(t, e) {
                            return new D(t, 0, e)
                        }, D.getTweensOf = function(t, e) {
                            if (null == t) return [];
                            t = "string" != typeof t ? t : D.selector(t) || t;
                            var i, s, r, n;
                            if ((c(t) || M(t)) && "number" != typeof t[0]) {
                                for (i = t.length, s = []; --i > -1;) s = s.concat(D.getTweensOf(t[i], e));
                                for (i = s.length; --i > -1;)
                                    for (n = s[i], r = i; --r > -1;) n === s[r] && s.splice(i, 1)
                            } else
                                for (s = q(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
                            return s
                        }, D.killTweensOf = D.killDelayedCallsTo = function(t, e, i) {
                            "object" == typeof e && (i = e, e = !1);
                            for (var s = D.getTweensOf(t, e), r = s.length; --r > -1;) s[r]._kill(i, t)
                        };
                        var $ = g("plugins.TweenPlugin", function(t, e) {
                            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = $.prototype
                        }, !0);
                        if (n = $.prototype, $.version = "1.10.1", $.API = 2, n._firstPT = null, n._addTween = function(t, e, i, s, r, n) {
                                var a, o;
                                return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                                    _next: this._firstPT,
                                    t: t,
                                    p: e,
                                    s: i,
                                    c: a,
                                    f: "function" == typeof t[e],
                                    n: r || e,
                                    r: n
                                }, o._next && (o._next._prev = o), o) : void 0
                            }, n.setRatio = function(t) {
                                for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
                            }, n._kill = function(t) {
                                var e, i = this._overwriteProps,
                                    s = this._firstPT;
                                if (null != t[this._propName]) this._overwriteProps = [];
                                else
                                    for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                                for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                                return !1
                            }, n._roundProps = function(t, e) {
                                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
                            }, D._onPluginEvent = function(t, e) {
                                var i, s, r, n, a, o = e._firstPT;
                                if ("_onInitAllProps" === t) {
                                    for (; o;) {
                                        for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
                                        (o._prev = s ? s._prev : n) ? o._prev._next = o: r = o, (o._next = s) ? s._prev = o : n = o, o = a
                                    }
                                    o = e._firstPT = r
                                }
                                for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                                return i
                            }, $.activate = function(t) {
                                for (var e = t.length; --e > -1;) t[e].API === $.API && (N[(new t[e])._propName] = t[e]);
                                return !0
                            }, m.plugin = function(t) {
                                if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                                var e, i = t.propName,
                                    s = t.priority || 0,
                                    r = t.overwriteProps,
                                    n = {
                                        init: "_onInitTween",
                                        set: "setRatio",
                                        kill: "_kill",
                                        round: "_roundProps",
                                        initAll: "_onInitAllProps"
                                    },
                                    a = g("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                                        $.call(this, i, s), this._overwriteProps = r || []
                                    }, t.global === !0),
                                    o = a.prototype = new $(i);
                                o.constructor = a, a.API = t.API;
                                for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
                                return a.version = t.version, $.activate([a]), a
                            }, s = t._gsQueue) {
                            for (r = 0; r < s.length; r++) s[r]();
                            for (n in f) f[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n)
                        }
                        o = !1
                    }
                }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");


        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    5: [function(require, module, exports) {
        (function(global) {
            "use strict";
            var base = require("./handlebars/base"),
                SafeString = require("./handlebars/safe-string")["default"],
                Exception = require("./handlebars/exception")["default"],
                Utils = require("./handlebars/utils"),
                runtime = require("./handlebars/runtime"),
                create = function() {
                    var e = new base.HandlebarsEnvironment;
                    return Utils.extend(e, base), e.SafeString = SafeString, e.Exception = Exception, e.Utils = Utils, e.escapeExpression = Utils.escapeExpression, e.VM = runtime, e.template = function(a) {
                        return runtime.template(a, e)
                    }, e
                },
                Handlebars = create();
            Handlebars.create = create;
            var root = "undefined" != typeof global ? global : window,
                $Handlebars = root.Handlebars;
            Handlebars.noConflict = function() {
                root.Handlebars === Handlebars && (root.Handlebars = $Handlebars)
            }, Handlebars["default"] = Handlebars, exports["default"] = Handlebars;


        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./handlebars/base": 6,
        "./handlebars/exception": 7,
        "./handlebars/runtime": 8,
        "./handlebars/safe-string": 9,
        "./handlebars/utils": 10
    }],
    6: [function(require, module, exports) {
        "use strict";

        function HandlebarsEnvironment(e, t) {
            this.helpers = e || {}, this.partials = t || {}, registerDefaultHelpers(this)
        }

        function registerDefaultHelpers(e) {
            e.registerHelper("helperMissing", function() {
                if (1 === arguments.length) return void 0;
                throw new Exception("Missing helper: '" + arguments[arguments.length - 1].name + "'")
            }), e.registerHelper("blockHelperMissing", function(t, r) {
                var n = r.inverse,
                    i = r.fn;
                if (t === !0) return i(this);
                if (t === !1 || null == t) return n(this);
                if (isArray(t)) return t.length > 0 ? (r.ids && (r.ids = [r.name]), e.helpers.each(t, r)) : n(this);
                if (r.data && r.ids) {
                    var a = createFrame(r.data);
                    a.contextPath = Utils.appendContextPath(r.data.contextPath, r.name), r = {
                        data: a
                    }
                }
                return i(t, r)
            }), e.registerHelper("each", function(e, t) {
                function r(t, r, s) {
                    n && (n.key = t, n.index = r, n.first = 0 === r, n.last = !!s, i && (n.contextPath = i + t)), o += a(e[t], {
                        data: n,
                        blockParams: Utils.blockParams([e[t], t], [i + t, null])
                    })
                }
                if (!t) throw new Exception("Must pass iterator to #each");
                var n, i, a = t.fn,
                    s = t.inverse,
                    l = 0,
                    o = "";
                if (t.data && t.ids && (i = Utils.appendContextPath(t.data.contextPath, t.ids[0]) + "."), isFunction(e) && (e = e.call(this)), t.data && (n = createFrame(t.data)), e && "object" == typeof e)
                    if (isArray(e))
                        for (var c = e.length; c > l; l++) r(l, l, l === e.length - 1);
                    else {
                        var p;
                        for (var h in e) e.hasOwnProperty(h) && (p && r(p, l - 1), p = h, l++);
                        p && r(p, l - 1, !0)
                    }
                return 0 === l && (o = s(this)), o
            }), e.registerHelper("if", function(e, t) {
                return isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || Utils.isEmpty(e) ? t.inverse(this) : t.fn(this)
            }), e.registerHelper("unless", function(t, r) {
                return e.helpers["if"].call(this, t, {
                    fn: r.inverse,
                    inverse: r.fn,
                    hash: r.hash
                })
            }), e.registerHelper("with", function(e, t) {
                isFunction(e) && (e = e.call(this));
                var r = t.fn;
                if (Utils.isEmpty(e)) return t.inverse(this);
                if (t.data && t.ids) {
                    var n = createFrame(t.data);
                    n.contextPath = Utils.appendContextPath(t.data.contextPath, t.ids[0]), t = {
                        data: n
                    }
                }
                return r(e, t)
            }), e.registerHelper("log", function(t, r) {
                var n = r.data && null != r.data.level ? parseInt(r.data.level, 10) : 1;
                e.log(n, t)
            }), e.registerHelper("lookup", function(e, t) {
                return e && e[t]
            })
        }
        var Utils = require("./utils"),
            Exception = require("./exception")["default"],
            VERSION = "3.0.0";
        exports.VERSION = VERSION;
        var COMPILER_REVISION = 6;
        exports.COMPILER_REVISION = COMPILER_REVISION;
        var REVISION_CHANGES = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        exports.REVISION_CHANGES = REVISION_CHANGES;
        var isArray = Utils.isArray,
            isFunction = Utils.isFunction,
            toString = Utils.toString,
            objectType = "[object Object]";
        exports.HandlebarsEnvironment = HandlebarsEnvironment, HandlebarsEnvironment.prototype = {
            constructor: HandlebarsEnvironment,
            logger: logger,
            log: log,
            registerHelper: function(e, t) {
                if (toString.call(e) === objectType) {
                    if (t) throw new Exception("Arg not supported with multiple helpers");
                    Utils.extend(this.helpers, e)
                } else this.helpers[e] = t
            },
            unregisterHelper: function(e) {
                delete this.helpers[e]
            },
            registerPartial: function(e, t) {
                if (toString.call(e) === objectType) Utils.extend(this.partials, e);
                else {
                    if ("undefined" == typeof t) throw new Exception("Attempting to register a partial as undefined");
                    this.partials[e] = t
                }
            },
            unregisterPartial: function(e) {
                delete this.partials[e]
            }
        };
        var logger = {
            methodMap: {
                0: "debug",
                1: "info",
                2: "warn",
                3: "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 1,
            log: function(e, t) {
                if ("undefined" != typeof console && logger.level <= e) {
                    var r = logger.methodMap[e];
                    (console[r] || console.log).call(console, t)
                }
            }
        };
        exports.logger = logger;
        var log = logger.log;
        exports.log = log;
        var createFrame = function(e) {
            var t = Utils.extend({}, e);
            return t._parent = e, t
        };
        exports.createFrame = createFrame;


    }, {
        "./exception": 7,
        "./utils": 10
    }],
    7: [function(require, module, exports) {
        "use strict";

        function Exception(r, e) {
            var o, t, s = e && e.loc;
            s && (o = s.start.line, t = s.start.column, r += " - " + o + ":" + t);
            for (var n = Error.prototype.constructor.call(this, r), i = 0; i < errorProps.length; i++) this[errorProps[i]] = n[errorProps[i]];
            s && (this.lineNumber = o, this.column = t)
        }
        var errorProps = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        Exception.prototype = new Error, exports["default"] = Exception;


    }, {}],
    8: [function(require, module, exports) {
        "use strict";

        function checkRevision(e) {
            var r = e && e[0] || 1,
                t = COMPILER_REVISION;
            if (r !== t) {
                if (t > r) {
                    var n = REVISION_CHANGES[t],
                        a = REVISION_CHANGES[r];
                    throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + a + ").")
                }
                throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
            }
        }

        function template(e, r) {
            if (!r) throw new Exception("No environment passed to template");
            if (!e || !e.main) throw new Exception("Unknown template object: " + typeof e);
            r.VM.checkRevision(e.compiler);
            var t = function(t, n, a) {
                    a.hash && (n = Utils.extend({}, n, a.hash)), t = r.VM.resolvePartial.call(this, t, n, a);
                    var o = r.VM.invokePartial.call(this, t, n, a);
                    if (null == o && r.compile && (a.partials[a.name] = r.compile(t, e.compilerOptions, r), o = a.partials[a.name](n, a)), null != o) {
                        if (a.indent) {
                            for (var i = o.split("\n"), p = 0, s = i.length; s > p && (i[p] || p + 1 !== s); p++) i[p] = a.indent + i[p];
                            o = i.join("\n")
                        }
                        return o
                    }
                    throw new Exception("The partial " + a.name + " could not be compiled when running in runtime-only mode")
                },
                n = {
                    strict: function(e, r) {
                        if (!(r in e)) throw new Exception('"' + r + '" not defined in ' + e);
                        return e[r]
                    },
                    lookup: function(e, r) {
                        for (var t = e.length, n = 0; t > n; n++)
                            if (e[n] && null != e[n][r]) return e[n][r]
                    },
                    lambda: function(e, r) {
                        return "function" == typeof e ? e.call(r) : e
                    },
                    escapeExpression: Utils.escapeExpression,
                    invokePartial: t,
                    fn: function(r) {
                        return e[r]
                    },
                    programs: [],
                    program: function(e, r, t, n, a) {
                        var o = this.programs[e],
                            i = this.fn(e);
                        return r || a || n || t ? o = program(this, e, i, r, t, n, a) : o || (o = this.programs[e] = program(this, e, i)), o
                    },
                    data: function(e, r) {
                        for (; e && r--;) e = e._parent;
                        return e
                    },
                    merge: function(e, r) {
                        var t = e || r;
                        return e && r && e !== r && (t = Utils.extend({}, r, e)), t
                    },
                    noop: r.VM.noop,
                    compilerInfo: e.compiler
                },
                a = function(r, t) {
                    t = t || {};
                    var o = t.data;
                    a._setup(t), !t.partial && e.useData && (o = initData(r, o));
                    var i, p = e.useBlockParams ? [] : void 0;
                    return e.useDepths && (i = t.depths ? [r].concat(t.depths) : [r]), e.main.call(n, r, n.helpers, n.partials, o, p, i)
                };
            return a.isTop = !0, a._setup = function(t) {
                t.partial ? (n.helpers = t.helpers, n.partials = t.partials) : (n.helpers = n.merge(t.helpers, r.helpers), e.usePartial && (n.partials = n.merge(t.partials, r.partials)))
            }, a._child = function(r, t, a, o) {
                if (e.useBlockParams && !a) throw new Exception("must pass block params");
                if (e.useDepths && !o) throw new Exception("must pass parent depths");
                return program(n, r, e[r], t, 0, a, o)
            }, a
        }

        function program(e, r, t, n, a, o, i) {
            var p = function(r, a) {
                return a = a || {}, t.call(e, r, e.helpers, e.partials, a.data || n, o && [a.blockParams].concat(o), i && [r].concat(i))
            };
            return p.program = r, p.depth = i ? i.length : 0, p.blockParams = a || 0, p
        }

        function resolvePartial(e, r, t) {
            return e ? e.call || t.name || (t.name = e, e = t.partials[e]) : e = t.partials[t.name], e
        }

        function invokePartial(e, r, t) {
            if (t.partial = !0, void 0 === e) throw new Exception("The partial " + t.name + " could not be found");
            return e instanceof Function ? e(r, t) : void 0
        }

        function noop() {
            return ""
        }

        function initData(e, r) {
            return r && "root" in r || (r = r ? createFrame(r) : {}, r.root = e), r
        }
        var Utils = require("./utils"),
            Exception = require("./exception")["default"],
            COMPILER_REVISION = require("./base").COMPILER_REVISION,
            REVISION_CHANGES = require("./base").REVISION_CHANGES,
            createFrame = require("./base").createFrame;
        exports.checkRevision = checkRevision, exports.template = template, exports.program = program, exports.resolvePartial = resolvePartial, exports.invokePartial = invokePartial, exports.noop = noop;


    }, {
        "./base": 6,
        "./exception": 7,
        "./utils": 10
    }],
    9: [function(require, module, exports) {
        "use strict";

        function SafeString(t) {
            this.string = t
        }
        SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
            return "" + this.string
        }, exports["default"] = SafeString;


    }, {}],
    10: [function(require, module, exports) {
        "use strict";

        function escapeChar(t) {
            return escape[t]
        }

        function extend(t) {
            for (var r = 1; r < arguments.length; r++)
                for (var n in arguments[r]) Object.prototype.hasOwnProperty.call(arguments[r], n) && (t[n] = arguments[r][n]);
            return t
        }

        function indexOf(t, r) {
            for (var n = 0, e = t.length; e > n; n++)
                if (t[n] === r) return n;
            return -1
        }

        function escapeExpression(t) {
            return t && t.toHTML ? t.toHTML() : null == t ? "" : t ? (t = "" + t, possible.test(t) ? t.replace(badChars, escapeChar) : t) : t + ""
        }

        function isEmpty(t) {
            return t || 0 === t ? isArray(t) && 0 === t.length ? !0 : !1 : !0
        }

        function blockParams(t, r) {
            return t.path = r, t
        }

        function appendContextPath(t, r) {
            return (t ? t + "." : "") + r
        }
        var escape = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            badChars = /[&<>"'`]/g,
            possible = /[&<>"'`]/;
        exports.extend = extend;
        var toString = Object.prototype.toString;
        exports.toString = toString;
        var isFunction = function(t) {
            return "function" == typeof t
        };
        isFunction(/x/) && (isFunction = function(t) {
            return "function" == typeof t && "[object Function]" === toString.call(t)
        });
        var isFunction;
        exports.isFunction = isFunction;
        var isArray = Array.isArray || function(t) {
            return t && "object" == typeof t ? "[object Array]" === toString.call(t) : !1
        };
        exports.isArray = isArray, exports.indexOf = indexOf, exports.escapeExpression = escapeExpression, exports.isEmpty = isEmpty, exports.blockParams = blockParams, exports.appendContextPath = appendContextPath;


    }, {}],
    11: [function(require, module, exports) {
        module.exports = require("./dist/cjs/handlebars.runtime")["default"];


    }, {
        "./dist/cjs/handlebars.runtime": 5
    }],
    12: [function(require, module, exports) {
        ! function() {
            var e = {},
                o = null,
                n = !0,
                t = !1;
            try {
                "undefined" != typeof AudioContext ? o = new AudioContext : "undefined" != typeof webkitAudioContext ? o = new webkitAudioContext : n = !1
            } catch (r) {
                n = !1
            }
            if (!n)
                if ("undefined" != typeof Audio) try {
                    new Audio
                } catch (r) {
                    t = !0
                } else t = !0;
            if (n) {
                var a = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain();
                a.gain.value = 1, a.connect(o.destination)
            }
            var i = function(e) {
                this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = o, this.noAudio = t, this._howls = [], this._codecs = e, this.iOSAutoEnable = !0
            };
            i.prototype = {
                volume: function(e) {
                    var o = this;
                    if (e = parseFloat(e), e >= 0 && 1 >= e) {
                        o._volume = e, n && (a.gain.value = e);
                        for (var t in o._howls)
                            if (o._howls.hasOwnProperty(t) && o._howls[t]._webAudio === !1)
                                for (var r = 0; r < o._howls[t]._audioNode.length; r++) o._howls[t]._audioNode[r].volume = o._howls[t]._volume * o._volume;
                        return o
                    }
                    return n ? a.gain.value : o._volume
                },
                mute: function() {
                    return this._setMuted(!0), this
                },
                unmute: function() {
                    return this._setMuted(!1), this
                },
                _setMuted: function(e) {
                    var o = this;
                    o._muted = e, n && (a.gain.value = e ? 0 : o._volume);
                    for (var t in o._howls)
                        if (o._howls.hasOwnProperty(t) && o._howls[t]._webAudio === !1)
                            for (var r = 0; r < o._howls[t]._audioNode.length; r++) o._howls[t]._audioNode[r].muted = e
                },
                codecs: function(e) {
                    return this._codecs[e]
                },
                _enableiOSAudio: function() {
                    var e = this;
                    if (!o || !e._iOSEnabled && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                        e._iOSEnabled = !1;
                        var n = function() {
                            var t = o.createBuffer(1, 1, 22050),
                                r = o.createBufferSource();
                            r.buffer = t, r.connect(o.destination), "undefined" == typeof r.start ? r.noteOn(0) : r.start(0), setTimeout(function() {
                                (r.playbackState === r.PLAYING_STATE || r.playbackState === r.FINISHED_STATE) && (e._iOSEnabled = !0, e.iOSAutoEnable = !1, window.removeEventListener("touchstart", n, !1))
                            }, 0)
                        };
                        return window.addEventListener("touchstart", n, !1), e
                    }
                }
            };
            var u = null,
                d = {};
            t || (u = new Audio, d = {
                mp3: !!u.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                opus: !!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                ogg: !!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                wav: !!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                aac: !!u.canPlayType("audio/aac;").replace(/^no$/, ""),
                m4a: !!(u.canPlayType("audio/x-m4a;") || u.canPlayType("audio/m4a;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
                mp4: !!(u.canPlayType("audio/x-mp4;") || u.canPlayType("audio/mp4;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
                weba: !!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
            });
            var l = new i(d),
                f = function(e) {
                    var t = this;
                    t._autoplay = e.autoplay || !1, t._buffer = e.buffer || !1, t._duration = e.duration || 0, t._format = e.format || null, t._loop = e.loop || !1, t._loaded = !1, t._sprite = e.sprite || {}, t._src = e.src || "", t._pos3d = e.pos3d || [0, 0, -.5], t._volume = void 0 !== e.volume ? e.volume : 1, t._urls = e.urls || [], t._rate = e.rate || 1, t._model = e.model || null, t._onload = [e.onload || function() {}], t._onloaderror = [e.onloaderror || function() {}], t._onend = [e.onend || function() {}], t._onpause = [e.onpause || function() {}], t._onplay = [e.onplay || function() {}], t._onendTimer = [], t._webAudio = n && !t._buffer, t._audioNode = [], t._webAudio && t._setupAudioNode(), "undefined" != typeof o && o && l.iOSAutoEnable && l._enableiOSAudio(), l._howls.push(t), t.load()
                };
            if (f.prototype = {
                    load: function() {
                        var e = this,
                            o = null;
                        if (t) return void e.on("loaderror");
                        for (var n = 0; n < e._urls.length; n++) {
                            var r, a;
                            if (e._format) r = e._format;
                            else {
                                if (a = e._urls[n], r = /^data:audio\/([^;,]+);/i.exec(a), r || (r = /\.([^.]+)$/.exec(a.split("?", 1)[0])), !r) return void e.on("loaderror");
                                r = r[1].toLowerCase()
                            }
                            if (d[r]) {
                                o = e._urls[n];
                                break
                            }
                        }
                        if (!o) return void e.on("loaderror");
                        if (e._src = o, e._webAudio) _(e, o);
                        else {
                            var u = new Audio;
                            u.addEventListener("error", function() {
                                u.error && 4 === u.error.code && (i.noAudio = !0), e.on("loaderror", {
                                    type: u.error ? u.error.code : 0
                                })
                            }, !1), e._audioNode.push(u), u.src = o, u._pos = 0, u.preload = "auto", u.volume = l._muted ? 0 : e._volume * l.volume();
                            var f = function() {
                                e._duration = Math.ceil(10 * u.duration) / 10, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = {
                                    _default: [0, 1e3 * e._duration]
                                }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play(), u.removeEventListener("canplaythrough", f, !1)
                            };
                            u.addEventListener("canplaythrough", f, !1), u.load()
                        }
                        return e
                    },
                    urls: function(e) {
                        var o = this;
                        return e ? (o.stop(), o._urls = "string" == typeof e ? [e] : e, o._loaded = !1, o.load(), o) : o._urls
                    },
                    play: function(e, n) {
                        var t = this;
                        return "function" == typeof e && (n = e), e && "function" != typeof e || (e = "_default"), t._loaded ? t._sprite[e] ? (t._inactiveNode(function(r) {
                            r._sprite = e;
                            var a = r._pos > 0 ? r._pos : t._sprite[e][0] / 1e3,
                                i = 0;
                            t._webAudio ? (i = t._sprite[e][1] / 1e3 - r._pos, r._pos > 0 && (a = t._sprite[e][0] / 1e3 + a)) : i = t._sprite[e][1] / 1e3 - (a - t._sprite[e][0] / 1e3);
                            var u, d = !(!t._loop && !t._sprite[e][2]),
                                f = "string" == typeof n ? n : Math.round(Date.now() * Math.random()) + "";
                            if (function() {
                                    var o = {
                                        id: f,
                                        sprite: e,
                                        loop: d
                                    };
                                    u = setTimeout(function() {
                                        !t._webAudio && d && t.stop(o.id).play(e, o.id), t._webAudio && !d && (t._nodeById(o.id).paused = !0, t._nodeById(o.id)._pos = 0, t._clearEndTimer(o.id)), t._webAudio || d || t.stop(o.id), t.on("end", f)
                                    }, 1e3 * i), t._onendTimer.push({
                                        timer: u,
                                        id: o.id
                                    })
                                }(), t._webAudio) {
                                var _ = t._sprite[e][0] / 1e3,
                                    s = t._sprite[e][1] / 1e3;
                                r.id = f, r.paused = !1, p(t, [d, _, s], f), t._playStart = o.currentTime, r.gain.value = t._volume, "undefined" == typeof r.bufferSource.start ? r.bufferSource.noteGrainOn(0, a, i) : r.bufferSource.start(0, a, i)
                            } else {
                                if (4 !== r.readyState && (r.readyState || !navigator.isCocoonJS)) return t._clearEndTimer(f),
                                    function() {
                                        var o = t,
                                            a = e,
                                            i = n,
                                            u = r,
                                            d = function() {
                                                o.play(a, i), u.removeEventListener("canplaythrough", d, !1)
                                            };
                                        u.addEventListener("canplaythrough", d, !1)
                                    }(), t;
                                r.readyState = 4, r.id = f, r.currentTime = a, r.muted = l._muted || r.muted, r.volume = t._volume * l.volume(), setTimeout(function() {
                                    r.play()
                                }, 0)
                            }
                            return t.on("play"), "function" == typeof n && n(f), t
                        }), t) : ("function" == typeof n && n(), t) : (t.on("load", function() {
                            t.play(e, n)
                        }), t)
                    },
                    pause: function(e) {
                        var o = this;
                        if (!o._loaded) return o.on("play", function() {
                            o.pause(e)
                        }), o;
                        o._clearEndTimer(e);
                        var n = e ? o._nodeById(e) : o._activeNode();
                        if (n)
                            if (n._pos = o.pos(null, e), o._webAudio) {
                                if (!n.bufferSource || n.paused) return o;
                                n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                            } else n.pause();
                        return o.on("pause"), o
                    },
                    stop: function(e) {
                        var o = this;
                        if (!o._loaded) return o.on("play", function() {
                            o.stop(e)
                        }), o;
                        o._clearEndTimer(e);
                        var n = e ? o._nodeById(e) : o._activeNode();
                        if (n)
                            if (n._pos = 0, o._webAudio) {
                                if (!n.bufferSource || n.paused) return o;
                                n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                            } else isNaN(n.duration) || (n.pause(), n.currentTime = 0);
                        return o
                    },
                    mute: function(e) {
                        var o = this;
                        if (!o._loaded) return o.on("play", function() {
                            o.mute(e)
                        }), o;
                        var n = e ? o._nodeById(e) : o._activeNode();
                        return n && (o._webAudio ? n.gain.value = 0 : n.muted = !0), o
                    },
                    unmute: function(e) {
                        var o = this;
                        if (!o._loaded) return o.on("play", function() {
                            o.unmute(e)
                        }), o;
                        var n = e ? o._nodeById(e) : o._activeNode();
                        return n && (o._webAudio ? n.gain.value = o._volume : n.muted = !1), o
                    },
                    volume: function(e, o) {
                        var n = this;
                        if (e = parseFloat(e), e >= 0 && 1 >= e) {
                            if (n._volume = e, !n._loaded) return n.on("play", function() {
                                n.volume(e, o)
                            }), n;
                            var t = o ? n._nodeById(o) : n._activeNode();
                            return t && (n._webAudio ? t.gain.value = e : t.volume = e * l.volume()), n
                        }
                        return n._volume
                    },
                    loop: function(e) {
                        var o = this;
                        return "boolean" == typeof e ? (o._loop = e, o) : o._loop
                    },
                    sprite: function(e) {
                        var o = this;
                        return "object" == typeof e ? (o._sprite = e, o) : o._sprite
                    },
                    pos: function(e, n) {
                        var t = this;
                        if (!t._loaded) return t.on("load", function() {
                            t.pos(e)
                        }), "number" == typeof e ? t : t._pos || 0;
                        e = parseFloat(e);
                        var r = n ? t._nodeById(n) : t._activeNode();
                        if (r) return e >= 0 ? (t.pause(n), r._pos = e, t.play(r._sprite, n), t) : t._webAudio ? r._pos + (o.currentTime - t._playStart) : r.currentTime;
                        if (e >= 0) return t;
                        for (var a = 0; a < t._audioNode.length; a++)
                            if (t._audioNode[a].paused && 4 === t._audioNode[a].readyState) return t._webAudio ? t._audioNode[a]._pos : t._audioNode[a].currentTime
                    },
                    pos3d: function(e, o, n, t) {
                        var r = this;
                        if (o = "undefined" != typeof o && o ? o : 0, n = "undefined" != typeof n && n ? n : -.5, !r._loaded) return r.on("play", function() {
                            r.pos3d(e, o, n, t)
                        }), r;
                        if (!(e >= 0 || 0 > e)) return r._pos3d;
                        if (r._webAudio) {
                            var a = t ? r._nodeById(t) : r._activeNode();
                            a && (r._pos3d = [e, o, n], a.panner.setPosition(e, o, n), a.panner.panningModel = r._model || "HRTF")
                        }
                        return r
                    },
                    fade: function(e, o, n, t, r) {
                        var a = this,
                            i = Math.abs(e - o),
                            u = e > o ? "down" : "up",
                            d = i / .01,
                            l = n / d;
                        if (!a._loaded) return a.on("load", function() {
                            a.fade(e, o, n, t, r)
                        }), a;
                        a.volume(e, r);
                        for (var f = 1; d >= f; f++) ! function() {
                            var e = a._volume + ("up" === u ? .01 : -.01) * f,
                                n = Math.round(1e3 * e) / 1e3,
                                i = o;
                            setTimeout(function() {
                                a.volume(n, r), n === i && t && t()
                            }, l * f)
                        }()
                    },
                    fadeIn: function(e, o, n) {
                        return this.volume(0).play().fade(0, e, o, n)
                    },
                    fadeOut: function(e, o, n, t) {
                        var r = this;
                        return r.fade(r._volume, e, o, function() {
                            n && n(), r.pause(t), r.on("end")
                        }, t)
                    },
                    _nodeById: function(e) {
                        for (var o = this, n = o._audioNode[0], t = 0; t < o._audioNode.length; t++)
                            if (o._audioNode[t].id === e) {
                                n = o._audioNode[t];
                                break
                            }
                        return n
                    },
                    _activeNode: function() {
                        for (var e = this, o = null, n = 0; n < e._audioNode.length; n++)
                            if (!e._audioNode[n].paused) {
                                o = e._audioNode[n];
                                break
                            }
                        return e._drainPool(), o
                    },
                    _inactiveNode: function(e) {
                        for (var o = this, n = null, t = 0; t < o._audioNode.length; t++)
                            if (o._audioNode[t].paused && 4 === o._audioNode[t].readyState) {
                                e(o._audioNode[t]), n = !0;
                                break
                            }
                        if (o._drainPool(), !n) {
                            var r;
                            if (o._webAudio) r = o._setupAudioNode(), e(r);
                            else {
                                o.load(), r = o._audioNode[o._audioNode.length - 1];
                                var a = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata",
                                    i = function() {
                                        r.removeEventListener(a, i, !1), e(r)
                                    };
                                r.addEventListener(a, i, !1)
                            }
                        }
                    },
                    _drainPool: function() {
                        var e, o = this,
                            n = 0;
                        for (e = 0; e < o._audioNode.length; e++) o._audioNode[e].paused && n++;
                        for (e = o._audioNode.length - 1; e >= 0 && !(5 >= n); e--) o._audioNode[e].paused && (o._webAudio && o._audioNode[e].disconnect(0), n--, o._audioNode.splice(e, 1))
                    },
                    _clearEndTimer: function(e) {
                        for (var o = this, n = 0, t = 0; t < o._onendTimer.length; t++)
                            if (o._onendTimer[t].id === e) {
                                n = t;
                                break
                            }
                        var r = o._onendTimer[n];
                        r && (clearTimeout(r.timer), o._onendTimer.splice(n, 1))
                    },
                    _setupAudioNode: function() {
                        var e = this,
                            n = e._audioNode,
                            t = e._audioNode.length;
                        return n[t] = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain(), n[t].gain.value = e._volume, n[t].paused = !0, n[t]._pos = 0, n[t].readyState = 4, n[t].connect(a), n[t].panner = o.createPanner(), n[t].panner.panningModel = e._model || "equalpower", n[t].panner.setPosition(e._pos3d[0], e._pos3d[1], e._pos3d[2]), n[t].panner.connect(n[t]), n[t]
                    },
                    on: function(e, o) {
                        var n = this,
                            t = n["_on" + e];
                        if ("function" == typeof o) t.push(o);
                        else
                            for (var r = 0; r < t.length; r++) o ? t[r].call(n, o) : t[r].call(n);
                        return n
                    },
                    off: function(e, o) {
                        var n = this,
                            t = n["_on" + e],
                            r = o ? o.toString() : null;
                        if (r) {
                            for (var a = 0; a < t.length; a++)
                                if (r === t[a].toString()) {
                                    t.splice(a, 1);
                                    break
                                }
                        } else n["_on" + e] = [];
                        return n
                    },
                    unload: function() {
                        for (var o = this, n = o._audioNode, t = 0; t < o._audioNode.length; t++) n[t].paused || (o.stop(n[t].id), o.on("end", n[t].id)), o._webAudio ? n[t].disconnect(0) : n[t].src = "";
                        for (t = 0; t < o._onendTimer.length; t++) clearTimeout(o._onendTimer[t].timer);
                        var r = l._howls.indexOf(o);
                        null !== r && r >= 0 && l._howls.splice(r, 1), delete e[o._src], o = null
                    }
                }, n) var _ = function(o, n) {
                    if (n in e) return o._duration = e[n].duration, void c(o);
                    if (/^data:[^;]+;base64,/.test(n)) {
                        for (var t = atob(n.split(",")[1]), r = new Uint8Array(t.length), a = 0; a < t.length; ++a) r[a] = t.charCodeAt(a);
                        s(r.buffer, o, n)
                    } else {
                        var i = new XMLHttpRequest;
                        i.open("GET", n, !0), i.responseType = "arraybuffer", i.onload = function() {
                            s(i.response, o, n)
                        }, i.onerror = function() {
                            o._webAudio && (o._buffer = !0, o._webAudio = !1, o._audioNode = [], delete o._gainNode, delete e[n], o.load())
                        };
                        try {
                            i.send()
                        } catch (u) {
                            i.onerror()
                        }
                    }
                },
                s = function(n, t, r) {
                    o.decodeAudioData(n, function(o) {
                        o && (e[r] = o, c(t, o))
                    }, function() {
                        t.on("loaderror")
                    })
                },
                c = function(e, o) {
                    e._duration = o ? o.duration : e._duration, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = {
                        _default: [0, 1e3 * e._duration]
                    }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play()
                },
                p = function(n, t, r) {
                    var a = n._nodeById(r);
                    a.bufferSource = o.createBufferSource(), a.bufferSource.buffer = e[n._src], a.bufferSource.connect(a.panner), a.bufferSource.loop = t[0], t[0] && (a.bufferSource.loopStart = t[1], a.bufferSource.loopEnd = t[1] + t[2]), a.bufferSource.playbackRate.value = n._rate
                };
            "function" == typeof define && define.amd && define(function() {
                return {
                    Howler: l,
                    Howl: f
                }
            }), "undefined" != typeof exports && (exports.Howler = l, exports.Howl = f), "undefined" != typeof window && (window.Howler = l, window.Howl = f)
        }();


    }, {}],
    13: [function(require, module, exports) {
        ! function(e, t) {
            "use strict";
            "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(i, n) {
                return t(e, i, n)
            }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
        }(window, function(e, t, i) {
            "use strict";

            function n(e, t) {
                for (var i in t) e[i] = t[i];
                return e
            }

            function o(e) {
                return "[object Array]" === d.call(e)
            }

            function r(e) {
                var t = [];
                if (o(e)) t = e;
                else if ("number" == typeof e.length)
                    for (var i = 0, n = e.length; n > i; i++) t.push(e[i]);
                else t.push(e);
                return t
            }

            function s(e, t, i) {
                if (!(this instanceof s)) return new s(e, t);
                "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = r(e), this.options = n({}, this.options), "function" == typeof t ? i = t : n(this.options, t), i && this.on("always", i), this.getImages(), c && (this.jqDeferred = new c.Deferred);
                var o = this;
                setTimeout(function() {
                    o.check()
                })
            }

            function h(e) {
                this.img = e
            }

            function f(e) {
                this.src = e, p[e] = this
            }
            var c = e.jQuery,
                a = e.console,
                u = "undefined" != typeof a,
                d = Object.prototype.toString;
            s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
                this.images = [];
                for (var e = 0, t = this.elements.length; t > e; e++) {
                    var i = this.elements[e];
                    "IMG" === i.nodeName && this.addImage(i);
                    var n = i.nodeType;
                    if (n && (1 === n || 9 === n || 11 === n))
                        for (var o = i.querySelectorAll("img"), r = 0, s = o.length; s > r; r++) {
                            var h = o[r];
                            this.addImage(h)
                        }
                }
            }, s.prototype.addImage = function(e) {
                var t = new h(e);
                this.images.push(t)
            }, s.prototype.check = function() {
                function e(e, o) {
                    return t.options.debug && u && a.log("confirm", e, o), t.progress(e), i++, i === n && t.complete(), !0
                }
                var t = this,
                    i = 0,
                    n = this.images.length;
                if (this.hasAnyBroken = !1, !n) return void this.complete();
                for (var o = 0; n > o; o++) {
                    var r = this.images[o];
                    r.on("confirm", e), r.check()
                }
            }, s.prototype.progress = function(e) {
                this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
                var t = this;
                setTimeout(function() {
                    t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
                })
            }, s.prototype.complete = function() {
                var e = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var t = this;
                setTimeout(function() {
                    if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                        var i = t.hasAnyBroken ? "reject" : "resolve";
                        t.jqDeferred[i](t)
                    }
                })
            }, c && (c.fn.imagesLoaded = function(e, t) {
                var i = new s(this, e, t);
                return i.jqDeferred.promise(c(this))
            }), h.prototype = new t, h.prototype.check = function() {
                var e = p[this.img.src] || new f(this.img.src);
                if (e.isConfirmed) return void this.confirm(e.isLoaded, "cached was confirmed");
                if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
                var t = this;
                e.on("confirm", function(e, i) {
                    return t.confirm(e.isLoaded, i), !0
                }), e.check()
            }, h.prototype.confirm = function(e, t) {
                this.isLoaded = e, this.emit("confirm", this, t)
            };
            var p = {};
            return f.prototype = new t, f.prototype.check = function() {
                if (!this.isChecked) {
                    var e = new Image;
                    i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.src, this.isChecked = !0
                }
            }, f.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, f.prototype.onload = function(e) {
                this.confirm(!0, "onload"), this.unbindProxyEvents(e)
            }, f.prototype.onerror = function(e) {
                this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
            }, f.prototype.confirm = function(e, t) {
                this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
            }, f.prototype.unbindProxyEvents = function(e) {
                i.unbind(e.target, "load", this), i.unbind(e.target, "error", this)
            }, s
        });


    }, {
        "eventie": 14,
        "wolfy87-eventemitter": 15
    }],
    14: [function(require, module, exports) {
        ! function(e) {
            "use strict";

            function n(n) {
                var t = e.event;
                return t.target = t.target || t.srcElement || n, t
            }
            var t = document.documentElement,
                o = function() {};
            t.addEventListener ? o = function(e, n, t) {
                e.addEventListener(n, t, !1)
            } : t.attachEvent && (o = function(e, t, o) {
                e[t + o] = o.handleEvent ? function() {
                    var t = n(e);
                    o.handleEvent.call(o, t)
                } : function() {
                    var t = n(e);
                    o.call(e, t)
                }, e.attachEvent("on" + t, e[t + o])
            });
            var c = function() {};
            t.removeEventListener ? c = function(e, n, t) {
                e.removeEventListener(n, t, !1)
            } : t.detachEvent && (c = function(e, n, t) {
                e.detachEvent("on" + n, e[n + t]);
                try {
                    delete e[n + t]
                } catch (o) {
                    e[n + t] = void 0
                }
            });
            var i = {
                bind: o,
                unbind: c
            };
            "function" == typeof define && define.amd ? define(i) : "object" == typeof exports ? module.exports = i : e.eventie = i
        }(window);


    }, {}],
    15: [function(require, module, exports) {
        (function() {
            "use strict";

            function e() {}

            function t(e, t) {
                for (var n = e.length; n--;)
                    if (e[n].listener === t) return n;
                return -1
            }

            function n(e) {
                return function() {
                    return this[e].apply(this, arguments)
                }
            }
            var r = e.prototype,
                i = this,
                s = i.EventEmitter;
            r.getListeners = function(e) {
                var t, n, r = this._getEvents();
                if (e instanceof RegExp) {
                    t = {};
                    for (n in r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
                } else t = r[e] || (r[e] = []);
                return t
            }, r.flattenListeners = function(e) {
                var t, n = [];
                for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
                return n
            }, r.getListenersAsObject = function(e) {
                var t, n = this.getListeners(e);
                return n instanceof Array && (t = {}, t[e] = n), t || n
            }, r.addListener = function(e, n) {
                var r, i = this.getListenersAsObject(e),
                    s = "object" == typeof n;
                for (r in i) i.hasOwnProperty(r) && -1 === t(i[r], n) && i[r].push(s ? n : {
                    listener: n,
                    once: !1
                });
                return this
            }, r.on = n("addListener"), r.addOnceListener = function(e, t) {
                return this.addListener(e, {
                    listener: t,
                    once: !0
                })
            }, r.once = n("addOnceListener"), r.defineEvent = function(e) {
                return this.getListeners(e), this
            }, r.defineEvents = function(e) {
                for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
                return this
            }, r.removeListener = function(e, n) {
                var r, i, s = this.getListenersAsObject(e);
                for (i in s) s.hasOwnProperty(i) && (r = t(s[i], n), -1 !== r && s[i].splice(r, 1));
                return this
            }, r.off = n("removeListener"), r.addListeners = function(e, t) {
                return this.manipulateListeners(!1, e, t)
            }, r.removeListeners = function(e, t) {
                return this.manipulateListeners(!0, e, t)
            }, r.manipulateListeners = function(e, t, n) {
                var r, i, s = e ? this.removeListener : this.addListener,
                    o = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp)
                    for (r = n.length; r--;) s.call(this, t, n[r]);
                else
                    for (r in t) t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
                return this
            }, r.removeEvent = function(e) {
                var t, n = typeof e,
                    r = this._getEvents();
                if ("string" === n) delete r[e];
                else if (e instanceof RegExp)
                    for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
                else delete this._events;
                return this
            }, r.removeAllListeners = n("removeEvent"), r.emitEvent = function(e, t) {
                var n, r, i, s, o = this.getListenersAsObject(e);
                for (i in o)
                    if (o.hasOwnProperty(i))
                        for (r = o[i].length; r--;) n = o[i][r], n.once === !0 && this.removeListener(e, n.listener), s = n.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
                return this
            }, r.trigger = n("emitEvent"), r.emit = function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t)
            }, r.setOnceReturnValue = function(e) {
                return this._onceReturnValue = e, this
            }, r._getOnceReturnValue = function() {
                return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
            }, r._getEvents = function() {
                return this._events || (this._events = {})
            }, e.noConflict = function() {
                return i.EventEmitter = s, e
            }, "function" == typeof define && define.amd ? define(function() {
                return e
            }) : "object" == typeof module && module.exports ? module.exports = e : i.EventEmitter = e
        }).call(this);


    }, {}],
    16: [function(require, module, exports) {
        module.exports = require("./lib/simple-pubsub");


    }, {
        "./lib/simple-pubsub": 17
    }],
    17: [function(require, module, exports) {
        var Backbone = require("backbone"),
            _ = require("underscore"),
            PubSub = {};
        _.extend(PubSub, Backbone.Events), module.exports = PubSub;


    }, {
        "backbone": 2,
        "underscore": 18
    }],
    18: [function(require, module, exports) {
        (function() {
            var n = this,
                t = n._,
                r = {},
                e = Array.prototype,
                u = Object.prototype,
                i = Function.prototype,
                a = e.push,
                o = e.slice,
                c = e.concat,
                l = u.toString,
                f = u.hasOwnProperty,
                s = e.forEach,
                p = e.map,
                h = e.reduce,
                v = e.reduceRight,
                g = e.filter,
                d = e.every,
                m = e.some,
                y = e.indexOf,
                b = e.lastIndexOf,
                x = Array.isArray,
                w = Object.keys,
                _ = i.bind,
                j = function(n) {
                    return n instanceof j ? n : this instanceof j ? void(this._wrapped = n) : new j(n)
                };
            "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.5.2";
            var A = j.each = j.forEach = function(n, t, e) {
                if (null != n)
                    if (s && n.forEach === s) n.forEach(t, e);
                    else if (n.length === +n.length) {
                    for (var u = 0, i = n.length; i > u; u++)
                        if (t.call(e, n[u], u, n) === r) return
                } else
                    for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)
                        if (t.call(e, n[a[u]], a[u], n) === r) return
            };
            j.map = j.collect = function(n, t, r) {
                var e = [];
                return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
                    e.push(t.call(r, n, u, i))
                }), e)
            };
            var E = "Reduce of empty array with no initial value";
            j.reduce = j.foldl = j.inject = function(n, t, r, e) {
                var u = arguments.length > 2;
                if (null == n && (n = []), h && n.reduce === h) return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
                if (A(n, function(n, i, a) {
                        u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
                    }), !u) throw new TypeError(E);
                return r
            }, j.reduceRight = j.foldr = function(n, t, r, e) {
                var u = arguments.length > 2;
                if (null == n && (n = []), v && n.reduceRight === v) return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
                var i = n.length;
                if (i !== +i) {
                    var a = j.keys(n);
                    i = a.length
                }
                if (A(n, function(o, c, l) {
                        c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
                    }), !u) throw new TypeError(E);
                return r
            }, j.find = j.detect = function(n, t, r) {
                var e;
                return O(n, function(n, u, i) {
                    return t.call(r, n, u, i) ? (e = n, !0) : void 0
                }), e
            }, j.filter = j.select = function(n, t, r) {
                var e = [];
                return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function(n, u, i) {
                    t.call(r, n, u, i) && e.push(n)
                }), e)
            }, j.reject = function(n, t, r) {
                return j.filter(n, function(n, e, u) {
                    return !t.call(r, n, e, u)
                }, r)
            }, j.every = j.all = function(n, t, e) {
                t || (t = j.identity);
                var u = !0;
                return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function(n, i, a) {
                    return (u = u && t.call(e, n, i, a)) ? void 0 : r
                }), !!u)
            };
            var O = j.some = j.any = function(n, t, e) {
                t || (t = j.identity);
                var u = !1;
                return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
                    return u || (u = t.call(e, n, i, a)) ? r : void 0
                }), !!u)
            };
            j.contains = j.include = function(n, t) {
                return null == n ? !1 : y && n.indexOf === y ? -1 != n.indexOf(t) : O(n, function(n) {
                    return n === t
                })
            }, j.invoke = function(n, t) {
                var r = o.call(arguments, 2),
                    e = j.isFunction(t);
                return j.map(n, function(n) {
                    return (e ? t : n[t]).apply(n, r)
                })
            }, j.pluck = function(n, t) {
                return j.map(n, function(n) {
                    return n[t]
                })
            }, j.where = function(n, t, r) {
                return j.isEmpty(t) ? r ? void 0 : [] : j[r ? "find" : "filter"](n, function(n) {
                    for (var r in t)
                        if (t[r] !== n[r]) return !1;
                    return !0
                })
            }, j.findWhere = function(n, t) {
                return j.where(n, t, !0)
            }, j.max = function(n, t, r) {
                if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.max.apply(Math, n);
                if (!t && j.isEmpty(n)) return -1 / 0;
                var e = {
                    computed: -1 / 0,
                    value: -1 / 0
                };
                return A(n, function(n, u, i) {
                    var a = t ? t.call(r, n, u, i) : n;
                    a > e.computed && (e = {
                        value: n,
                        computed: a
                    })
                }), e.value
            }, j.min = function(n, t, r) {
                if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.min.apply(Math, n);
                if (!t && j.isEmpty(n)) return 1 / 0;
                var e = {
                    computed: 1 / 0,
                    value: 1 / 0
                };
                return A(n, function(n, u, i) {
                    var a = t ? t.call(r, n, u, i) : n;
                    a < e.computed && (e = {
                        value: n,
                        computed: a
                    })
                }), e.value
            }, j.shuffle = function(n) {
                var t, r = 0,
                    e = [];
                return A(n, function(n) {
                    t = j.random(r++), e[r - 1] = e[t], e[t] = n
                }), e
            }, j.sample = function(n, t, r) {
                return arguments.length < 2 || r ? n[j.random(n.length - 1)] : j.shuffle(n).slice(0, Math.max(0, t))
            };
            var k = function(n) {
                return j.isFunction(n) ? n : function(t) {
                    return t[n]
                }
            };
            j.sortBy = function(n, t, r) {
                var e = k(t);
                return j.pluck(j.map(n, function(n, t, u) {
                    return {
                        value: n,
                        index: t,
                        criteria: e.call(r, n, t, u)
                    }
                }).sort(function(n, t) {
                    var r = n.criteria,
                        e = t.criteria;
                    if (r !== e) {
                        if (r > e || void 0 === r) return 1;
                        if (e > r || void 0 === e) return -1
                    }
                    return n.index - t.index
                }), "value")
            };
            var F = function(n) {
                return function(t, r, e) {
                    var u = {},
                        i = null == r ? j.identity : k(r);
                    return A(t, function(r, a) {
                        var o = i.call(e, r, a, t);
                        n(u, o, r)
                    }), u
                }
            };
            j.groupBy = F(function(n, t, r) {
                (j.has(n, t) ? n[t] : n[t] = []).push(r)
            }), j.indexBy = F(function(n, t, r) {
                n[t] = r
            }), j.countBy = F(function(n, t) {
                j.has(n, t) ? n[t]++ : n[t] = 1
            }), j.sortedIndex = function(n, t, r, e) {
                r = null == r ? j.identity : k(r);
                for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
                    var o = i + a >>> 1;
                    r.call(e, n[o]) < u ? i = o + 1 : a = o
                }
                return i
            }, j.toArray = function(n) {
                return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
            }, j.size = function(n) {
                return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length
            }, j.first = j.head = j.take = function(n, t, r) {
                return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t)
            }, j.initial = function(n, t, r) {
                return o.call(n, 0, n.length - (null == t || r ? 1 : t))
            }, j.last = function(n, t, r) {
                return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
            }, j.rest = j.tail = j.drop = function(n, t, r) {
                return o.call(n, null == t || r ? 1 : t)
            }, j.compact = function(n) {
                return j.filter(n, j.identity)
            };
            var M = function(n, t, r) {
                return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function(n) {
                    j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n)
                }), r)
            };
            j.flatten = function(n, t) {
                return M(n, t, [])
            }, j.without = function(n) {
                return j.difference(n, o.call(arguments, 1))
            }, j.uniq = j.unique = function(n, t, r, e) {
                j.isFunction(t) && (e = r, r = t, t = !1);
                var u = r ? j.map(n, r, e) : n,
                    i = [],
                    a = [];
                return A(u, function(r, e) {
                    (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]))
                }), i
            }, j.union = function() {
                return j.uniq(j.flatten(arguments, !0))
            }, j.intersection = function(n) {
                var t = o.call(arguments, 1);
                return j.filter(j.uniq(n), function(n) {
                    return j.every(t, function(t) {
                        return j.indexOf(t, n) >= 0
                    })
                })
            }, j.difference = function(n) {
                var t = c.apply(e, o.call(arguments, 1));
                return j.filter(n, function(n) {
                    return !j.contains(t, n)
                })
            }, j.zip = function() {
                for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++) t[r] = j.pluck(arguments, "" + r);
                return t
            }, j.object = function(n, t) {
                if (null == n) return {};
                for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
                return r
            }, j.indexOf = function(n, t, r) {
                if (null == n) return -1;
                var e = 0,
                    u = n.length;
                if (r) {
                    if ("number" != typeof r) return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
                    e = 0 > r ? Math.max(0, u + r) : r
                }
                if (y && n.indexOf === y) return n.indexOf(t, r);
                for (; u > e; e++)
                    if (n[e] === t) return e;
                return -1
            }, j.lastIndexOf = function(n, t, r) {
                if (null == n) return -1;
                var e = null != r;
                if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
                for (var u = e ? r : n.length; u--;)
                    if (n[u] === t) return u;
                return -1
            }, j.range = function(n, t, r) {
                arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
                for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;) i[u++] = n, n += r;
                return i
            };
            var R = function() {};
            j.bind = function(n, t) {
                var r, e;
                if (_ && n.bind === _) return _.apply(n, o.call(arguments, 1));
                if (!j.isFunction(n)) throw new TypeError;
                return r = o.call(arguments, 2), e = function() {
                    if (!(this instanceof e)) return n.apply(t, r.concat(o.call(arguments)));
                    R.prototype = n.prototype;
                    var u = new R;
                    R.prototype = null;
                    var i = n.apply(u, r.concat(o.call(arguments)));
                    return Object(i) === i ? i : u
                }
            }, j.partial = function(n) {
                var t = o.call(arguments, 1);
                return function() {
                    return n.apply(this, t.concat(o.call(arguments)))
                }
            }, j.bindAll = function(n) {
                var t = o.call(arguments, 1);
                if (0 === t.length) throw new Error("bindAll must be passed function names");
                return A(t, function(t) {
                    n[t] = j.bind(n[t], n)
                }), n
            }, j.memoize = function(n, t) {
                var r = {};
                return t || (t = j.identity),
                    function() {
                        var e = t.apply(this, arguments);
                        return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
                    }
            }, j.delay = function(n, t) {
                var r = o.call(arguments, 2);
                return setTimeout(function() {
                    return n.apply(null, r)
                }, t)
            }, j.defer = function(n) {
                return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
            }, j.throttle = function(n, t, r) {
                var e, u, i, a = null,
                    o = 0;
                r || (r = {});
                var c = function() {
                    o = r.leading === !1 ? 0 : new Date, a = null, i = n.apply(e, u)
                };
                return function() {
                    var l = new Date;
                    o || r.leading !== !1 || (o = l);
                    var f = t - (l - o);
                    return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u)) : a || r.trailing === !1 || (a = setTimeout(c, f)), i
                }
            }, j.debounce = function(n, t, r) {
                var e, u, i, a, o;
                return function() {
                    i = this, u = arguments, a = new Date;
                    var c = function() {
                            var l = new Date - a;
                            t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u)))
                        },
                        l = r && !e;
                    return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u)), o
                }
            }, j.once = function(n) {
                var t, r = !1;
                return function() {
                    return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
                }
            }, j.wrap = function(n, t) {
                return function() {
                    var r = [n];
                    return a.apply(r, arguments), t.apply(this, r)
                }
            }, j.compose = function() {
                var n = arguments;
                return function() {
                    for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)];
                    return t[0]
                }
            }, j.after = function(n, t) {
                return function() {
                    return --n < 1 ? t.apply(this, arguments) : void 0
                }
            }, j.keys = w || function(n) {
                if (n !== Object(n)) throw new TypeError("Invalid object");
                var t = [];
                for (var r in n) j.has(n, r) && t.push(r);
                return t
            }, j.values = function(n) {
                for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
                return e
            }, j.pairs = function(n) {
                for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
                return e
            }, j.invert = function(n) {
                for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
                return t
            }, j.functions = j.methods = function(n) {
                var t = [];
                for (var r in n) j.isFunction(n[r]) && t.push(r);
                return t.sort()
            }, j.extend = function(n) {
                return A(o.call(arguments, 1), function(t) {
                    if (t)
                        for (var r in t) n[r] = t[r]
                }), n
            }, j.pick = function(n) {
                var t = {},
                    r = c.apply(e, o.call(arguments, 1));
                return A(r, function(r) {
                    r in n && (t[r] = n[r])
                }), t
            }, j.omit = function(n) {
                var t = {},
                    r = c.apply(e, o.call(arguments, 1));
                for (var u in n) j.contains(r, u) || (t[u] = n[u]);
                return t
            }, j.defaults = function(n) {
                return A(o.call(arguments, 1), function(t) {
                    if (t)
                        for (var r in t) void 0 === n[r] && (n[r] = t[r])
                }), n
            }, j.clone = function(n) {
                return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
            }, j.tap = function(n, t) {
                return t(n), n
            };
            var S = function(n, t, r, e) {
                if (n === t) return 0 !== n || 1 / n == 1 / t;
                if (null == n || null == t) return n === t;
                n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
                var u = l.call(n);
                if (u != l.call(t)) return !1;
                switch (u) {
                    case "[object String]":
                        return n == String(t);
                    case "[object Number]":
                        return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +n == +t;
                    case "[object RegExp]":
                        return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
                }
                if ("object" != typeof n || "object" != typeof t) return !1;
                for (var i = r.length; i--;)
                    if (r[i] == n) return e[i] == t;
                var a = n.constructor,
                    o = t.constructor;
                if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o)) return !1;
                r.push(n), e.push(t);
                var c = 0,
                    f = !0;
                if ("[object Array]" == u) {
                    if (c = n.length, f = c == t.length)
                        for (; c-- && (f = S(n[c], t[c], r, e)););
                } else {
                    for (var s in n)
                        if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e)))) break;
                    if (f) {
                        for (s in t)
                            if (j.has(t, s) && !c--) break;
                        f = !c
                    }
                }
                return r.pop(), e.pop(), f
            };
            j.isEqual = function(n, t) {
                return S(n, t, [], [])
            }, j.isEmpty = function(n) {
                if (null == n) return !0;
                if (j.isArray(n) || j.isString(n)) return 0 === n.length;
                for (var t in n)
                    if (j.has(n, t)) return !1;
                return !0
            }, j.isElement = function(n) {
                return !(!n || 1 !== n.nodeType)
            }, j.isArray = x || function(n) {
                return "[object Array]" == l.call(n)
            }, j.isObject = function(n) {
                return n === Object(n)
            }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
                j["is" + n] = function(t) {
                    return l.call(t) == "[object " + n + "]"
                }
            }), j.isArguments(arguments) || (j.isArguments = function(n) {
                return !(!n || !j.has(n, "callee"))
            }), "function" != typeof /./ && (j.isFunction = function(n) {
                return "function" == typeof n
            }), j.isFinite = function(n) {
                return isFinite(n) && !isNaN(parseFloat(n))
            }, j.isNaN = function(n) {
                return j.isNumber(n) && n != +n
            }, j.isBoolean = function(n) {
                return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
            }, j.isNull = function(n) {
                return null === n
            }, j.isUndefined = function(n) {
                return void 0 === n
            }, j.has = function(n, t) {
                return f.call(n, t)
            }, j.noConflict = function() {
                return n._ = t, this
            }, j.identity = function(n) {
                return n
            }, j.times = function(n, t, r) {
                for (var e = Array(Math.max(0, n)), u = 0; n > u; u++) e[u] = t.call(r, u);
                return e
            }, j.random = function(n, t) {
                return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
            };
            var I = {
                escape: {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;"
                }
            };
            I.unescape = j.invert(I.escape);
            var T = {
                escape: new RegExp("[" + j.keys(I.escape).join("") + "]", "g"),
                unescape: new RegExp("(" + j.keys(I.unescape).join("|") + ")", "g")
            };
            j.each(["escape", "unescape"], function(n) {
                j[n] = function(t) {
                    return null == t ? "" : ("" + t).replace(T[n], function(t) {
                        return I[n][t]
                    })
                }
            }), j.result = function(n, t) {
                if (null == n) return void 0;
                var r = n[t];
                return j.isFunction(r) ? r.call(n) : r
            }, j.mixin = function(n) {
                A(j.functions(n), function(t) {
                    var r = j[t] = n[t];
                    j.prototype[t] = function() {
                        var n = [this._wrapped];
                        return a.apply(n, arguments), z.call(this, r.apply(j, n))
                    }
                })
            };
            var N = 0;
            j.uniqueId = function(n) {
                var t = ++N + "";
                return n ? n + t : t
            }, j.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var q = /(.)^/,
                B = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "	": "t",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
            j.template = function(n, t, r) {
                var e;
                r = j.defaults({}, r, j.templateSettings);
                var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"),
                    i = 0,
                    a = "__p+='";
                n.replace(u, function(t, r, e, u, o) {
                    return a += n.slice(i, o).replace(D, function(n) {
                        return "\\" + B[n]
                    }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
                }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
                try {
                    e = new Function(r.variable || "obj", "_", a)
                } catch (o) {
                    throw o.source = a, o
                }
                if (t) return e(t, j);
                var c = function(n) {
                    return e.call(this, n, j)
                };
                return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
            }, j.chain = function(n) {
                return j(n).chain()
            };
            var z = function(n) {
                return this._chain ? j(n).chain() : n
            };
            j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
                var t = e[n];
                j.prototype[n] = function() {
                    var r = this._wrapped;
                    return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r)
                }
            }), A(["concat", "join", "slice"], function(n) {
                var t = e[n];
                j.prototype[n] = function() {
                    return z.call(this, t.apply(this._wrapped, arguments))
                }
            }), j.extend(j.prototype, {
                chain: function() {
                    return this._chain = !0, this
                },
                value: function() {
                    return this._wrapped
                }
            })
        }).call(this);


    }, {}],
    19: [function(require, module, exports) {
        (function() {
            function n(n) {
                function t(t, r, e, u, i, o) {
                    for (; i >= 0 && o > i; i += n) {
                        var a = u ? u[i] : i;
                        e = r(e, t[a], a, t)
                    }
                    return e
                }
                return function(r, e, u, i) {
                    e = d(e, i, 4);
                    var o = !w(r) && m.keys(r),
                        a = (o || r).length,
                        c = n > 0 ? 0 : a - 1;
                    return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
                }
            }

            function t(n) {
                return function(t, r, e) {
                    r = b(r, e);
                    for (var u = null != t && t.length, i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                        if (r(t[i], i, t)) return i;
                    return -1
                }
            }

            function r(n, t) {
                var r = S.length,
                    e = n.constructor,
                    u = m.isFunction(e) && e.prototype || o,
                    i = "constructor";
                for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) i = S[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
            }
            var e = this,
                u = e._,
                i = Array.prototype,
                o = Object.prototype,
                a = Function.prototype,
                c = i.push,
                l = i.slice,
                f = o.toString,
                s = o.hasOwnProperty,
                p = Array.isArray,
                h = Object.keys,
                v = a.bind,
                g = Object.create,
                y = function() {},
                m = function(n) {
                    return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
                };
            "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : e._ = m, m.VERSION = "1.8.2";
            var d = function(n, t, r) {
                    if (void 0 === t) return n;
                    switch (null == r ? 3 : r) {
                        case 1:
                            return function(r) {
                                return n.call(t, r)
                            };
                        case 2:
                            return function(r, e) {
                                return n.call(t, r, e)
                            };
                        case 3:
                            return function(r, e, u) {
                                return n.call(t, r, e, u)
                            };
                        case 4:
                            return function(r, e, u, i) {
                                return n.call(t, r, e, u, i)
                            }
                    }
                    return function() {
                        return n.apply(t, arguments)
                    }
                },
                b = function(n, t, r) {
                    return null == n ? m.identity : m.isFunction(n) ? d(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
                };
            m.iteratee = function(n, t) {
                return b(n, t, 1 / 0)
            };
            var x = function(n, t) {
                    return function(r) {
                        var e = arguments.length;
                        if (2 > e || null == r) return r;
                        for (var u = 1; e > u; u++)
                            for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                                var l = o[c];
                                t && void 0 !== r[l] || (r[l] = i[l])
                            }
                        return r
                    }
                },
                _ = function(n) {
                    if (!m.isObject(n)) return {};
                    if (g) return g(n);
                    y.prototype = n;
                    var t = new y;
                    return y.prototype = null, t
                },
                j = Math.pow(2, 53) - 1,
                w = function(n) {
                    var t = n && n.length;
                    return "number" == typeof t && t >= 0 && j >= t
                };
            m.each = m.forEach = function(n, t, r) {
                t = d(t, r);
                var e, u;
                if (w(n))
                    for (e = 0, u = n.length; u > e; e++) t(n[e], e, n);
                else {
                    var i = m.keys(n);
                    for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
                }
                return n
            }, m.map = m.collect = function(n, t, r) {
                t = b(t, r);
                for (var e = !w(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
                    var a = e ? e[o] : o;
                    i[o] = t(n[a], a, n)
                }
                return i
            }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function(n, t, r) {
                var e;
                return e = w(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), void 0 !== e && -1 !== e ? n[e] : void 0
            }, m.filter = m.select = function(n, t, r) {
                var e = [];
                return t = b(t, r), m.each(n, function(n, r, u) {
                    t(n, r, u) && e.push(n)
                }), e
            }, m.reject = function(n, t, r) {
                return m.filter(n, m.negate(b(t)), r)
            }, m.every = m.all = function(n, t, r) {
                t = b(t, r);
                for (var e = !w(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
                    var o = e ? e[i] : i;
                    if (!t(n[o], o, n)) return !1
                }
                return !0
            }, m.some = m.any = function(n, t, r) {
                t = b(t, r);
                for (var e = !w(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
                    var o = e ? e[i] : i;
                    if (t(n[o], o, n)) return !0
                }
                return !1
            }, m.contains = m.includes = m.include = function(n, t, r) {
                return w(n) || (n = m.values(n)), m.indexOf(n, t, "number" == typeof r && r) >= 0
            }, m.invoke = function(n, t) {
                var r = l.call(arguments, 2),
                    e = m.isFunction(t);
                return m.map(n, function(n) {
                    var u = e ? t : n[t];
                    return null == u ? u : u.apply(n, r)
                })
            }, m.pluck = function(n, t) {
                return m.map(n, m.property(t))
            }, m.where = function(n, t) {
                return m.filter(n, m.matcher(t))
            }, m.findWhere = function(n, t) {
                return m.find(n, m.matcher(t))
            }, m.max = function(n, t, r) {
                var e, u, i = -1 / 0,
                    o = -1 / 0;
                if (null == t && null != n) {
                    n = w(n) ? n : m.values(n);
                    for (var a = 0, c = n.length; c > a; a++) e = n[a], e > i && (i = e)
                } else t = b(t, r), m.each(n, function(n, r, e) {
                    u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
                });
                return i
            }, m.min = function(n, t, r) {
                var e, u, i = 1 / 0,
                    o = 1 / 0;
                if (null == t && null != n) {
                    n = w(n) ? n : m.values(n);
                    for (var a = 0, c = n.length; c > a; a++) e = n[a], i > e && (i = e)
                } else t = b(t, r), m.each(n, function(n, r, e) {
                    u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
                });
                return i
            }, m.shuffle = function(n) {
                for (var t, r = w(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
                return u
            }, m.sample = function(n, t, r) {
                return null == t || r ? (w(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
            }, m.sortBy = function(n, t, r) {
                return t = b(t, r), m.pluck(m.map(n, function(n, r, e) {
                    return {
                        value: n,
                        index: r,
                        criteria: t(n, r, e)
                    }
                }).sort(function(n, t) {
                    var r = n.criteria,
                        e = t.criteria;
                    if (r !== e) {
                        if (r > e || void 0 === r) return 1;
                        if (e > r || void 0 === e) return -1
                    }
                    return n.index - t.index
                }), "value")
            };
            var A = function(n) {
                return function(t, r, e) {
                    var u = {};
                    return r = b(r, e), m.each(t, function(e, i) {
                        var o = r(e, i, t);
                        n(u, e, o)
                    }), u
                }
            };
            m.groupBy = A(function(n, t, r) {
                m.has(n, r) ? n[r].push(t) : n[r] = [t]
            }), m.indexBy = A(function(n, t, r) {
                n[r] = t
            }), m.countBy = A(function(n, t, r) {
                m.has(n, r) ? n[r]++ : n[r] = 1
            }), m.toArray = function(n) {
                return n ? m.isArray(n) ? l.call(n) : w(n) ? m.map(n, m.identity) : m.values(n) : []
            }, m.size = function(n) {
                return null == n ? 0 : w(n) ? n.length : m.keys(n).length
            }, m.partition = function(n, t, r) {
                t = b(t, r);
                var e = [],
                    u = [];
                return m.each(n, function(n, r, i) {
                    (t(n, r, i) ? e : u).push(n)
                }), [e, u]
            }, m.first = m.head = m.take = function(n, t, r) {
                return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
            }, m.initial = function(n, t, r) {
                return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
            }, m.last = function(n, t, r) {
                return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
            }, m.rest = m.tail = m.drop = function(n, t, r) {
                return l.call(n, null == t || r ? 1 : t)
            }, m.compact = function(n) {
                return m.filter(n, m.identity)
            };
            var k = function(n, t, r, e) {
                for (var u = [], i = 0, o = e || 0, a = n && n.length; a > o; o++) {
                    var c = n[o];
                    if (w(c) && (m.isArray(c) || m.isArguments(c))) {
                        t || (c = k(c, t, r));
                        var l = 0,
                            f = c.length;
                        for (u.length += f; f > l;) u[i++] = c[l++]
                    } else r || (u[i++] = c)
                }
                return u
            };
            m.flatten = function(n, t) {
                return k(n, t, !1)
            }, m.without = function(n) {
                return m.difference(n, l.call(arguments, 1))
            }, m.uniq = m.unique = function(n, t, r, e) {
                if (null == n) return [];
                m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = b(r, e));
                for (var u = [], i = [], o = 0, a = n.length; a > o; o++) {
                    var c = n[o],
                        l = r ? r(c, o, n) : c;
                    t ? (o && i === l || u.push(c), i = l) : r ? m.contains(i, l) || (i.push(l), u.push(c)) : m.contains(u, c) || u.push(c)
                }
                return u
            }, m.union = function() {
                return m.uniq(k(arguments, !0, !0))
            }, m.intersection = function(n) {
                if (null == n) return [];
                for (var t = [], r = arguments.length, e = 0, u = n.length; u > e; e++) {
                    var i = n[e];
                    if (!m.contains(t, i)) {
                        for (var o = 1; r > o && m.contains(arguments[o], i); o++);
                        o === r && t.push(i)
                    }
                }
                return t
            }, m.difference = function(n) {
                var t = k(arguments, !0, !0, 1);
                return m.filter(n, function(n) {
                    return !m.contains(t, n)
                })
            }, m.zip = function() {
                return m.unzip(arguments)
            }, m.unzip = function(n) {
                for (var t = n && m.max(n, "length").length || 0, r = Array(t), e = 0; t > e; e++) r[e] = m.pluck(n, e);
                return r
            }, m.object = function(n, t) {
                for (var r = {}, e = 0, u = n && n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
                return r
            }, m.indexOf = function(n, t, r) {
                var e = 0,
                    u = n && n.length;
                if ("number" == typeof r) e = 0 > r ? Math.max(0, u + r) : r;
                else if (r && u) return e = m.sortedIndex(n, t), n[e] === t ? e : -1;
                if (t !== t) return m.findIndex(l.call(n, e), m.isNaN);
                for (; u > e; e++)
                    if (n[e] === t) return e;
                return -1
            }, m.lastIndexOf = function(n, t, r) {
                var e = n ? n.length : 0;
                if ("number" == typeof r && (e = 0 > r ? e + r + 1 : Math.min(e, r + 1)), t !== t) return m.findLastIndex(l.call(n, 0, e), m.isNaN);
                for (; --e >= 0;)
                    if (n[e] === t) return e;
                return -1
            }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function(n, t, r, e) {
                r = b(r, e, 1);
                for (var u = r(t), i = 0, o = n.length; o > i;) {
                    var a = Math.floor((i + o) / 2);
                    r(n[a]) < u ? i = a + 1 : o = a
                }
                return i
            }, m.range = function(n, t, r) {
                arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
                for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
                return u
            };
            var O = function(n, t, r, e, u) {
                if (!(e instanceof t)) return n.apply(r, u);
                var i = _(n.prototype),
                    o = n.apply(i, u);
                return m.isObject(o) ? o : i
            };
            m.bind = function(n, t) {
                if (v && n.bind === v) return v.apply(n, l.call(arguments, 1));
                if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function");
                var r = l.call(arguments, 2),
                    e = function() {
                        return O(n, e, t, this, r.concat(l.call(arguments)))
                    };
                return e
            }, m.partial = function(n) {
                var t = l.call(arguments, 1),
                    r = function() {
                        for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) i[o] = t[o] === m ? arguments[e++] : t[o];
                        for (; e < arguments.length;) i.push(arguments[e++]);
                        return O(n, r, this, this, i)
                    };
                return r
            }, m.bindAll = function(n) {
                var t, r, e = arguments.length;
                if (1 >= e) throw new Error("bindAll must be passed function names");
                for (t = 1; e > t; t++) r = arguments[t], n[r] = m.bind(n[r], n);
                return n
            }, m.memoize = function(n, t) {
                var r = function(e) {
                    var u = r.cache,
                        i = "" + (t ? t.apply(this, arguments) : e);
                    return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
                };
                return r.cache = {}, r
            }, m.delay = function(n, t) {
                var r = l.call(arguments, 2);
                return setTimeout(function() {
                    return n.apply(null, r)
                }, t)
            }, m.defer = m.partial(m.delay, m, 1), m.throttle = function(n, t, r) {
                var e, u, i, o = null,
                    a = 0;
                r || (r = {});
                var c = function() {
                    a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
                };
                return function() {
                    var l = m.now();
                    a || r.leading !== !1 || (a = l);
                    var f = t - (l - a);
                    return e = this, u = arguments, 0 >= f || f > t ? (o && (clearTimeout(o), o = null), a = l, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, f)), i
                }
            }, m.debounce = function(n, t, r) {
                var e, u, i, o, a, c = function() {
                    var l = m.now() - o;
                    t > l && l >= 0 ? e = setTimeout(c, t - l) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
                };
                return function() {
                    i = this, u = arguments, o = m.now();
                    var l = r && !e;
                    return e || (e = setTimeout(c, t)), l && (a = n.apply(i, u), i = u = null), a
                }
            }, m.wrap = function(n, t) {
                return m.partial(t, n)
            }, m.negate = function(n) {
                return function() {
                    return !n.apply(this, arguments)
                }
            }, m.compose = function() {
                var n = arguments,
                    t = n.length - 1;
                return function() {
                    for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
                    return e
                }
            }, m.after = function(n, t) {
                return function() {
                    return --n < 1 ? t.apply(this, arguments) : void 0
                }
            }, m.before = function(n, t) {
                var r;
                return function() {
                    return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
                }
            }, m.once = m.partial(m.before, 2);
            var F = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                S = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
            m.keys = function(n) {
                if (!m.isObject(n)) return [];
                if (h) return h(n);
                var t = [];
                for (var e in n) m.has(n, e) && t.push(e);
                return F && r(n, t), t
            }, m.allKeys = function(n) {
                if (!m.isObject(n)) return [];
                var t = [];
                for (var e in n) t.push(e);
                return F && r(n, t), t
            }, m.values = function(n) {
                for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
                return e
            }, m.mapObject = function(n, t, r) {
                t = b(t, r);
                for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) e = u[a], o[e] = t(n[e], e, n);
                return o
            }, m.pairs = function(n) {
                for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
                return e
            }, m.invert = function(n) {
                for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
                return t
            }, m.functions = m.methods = function(n) {
                var t = [];
                for (var r in n) m.isFunction(n[r]) && t.push(r);
                return t.sort()
            }, m.extend = x(m.allKeys), m.extendOwn = m.assign = x(m.keys), m.findKey = function(n, t, r) {
                t = b(t, r);
                for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
                    if (e = u[i], t(n[e], e, n)) return e
            }, m.pick = function(n, t, r) {
                var e, u, i = {},
                    o = n;
                if (null == o) return i;
                m.isFunction(t) ? (u = m.allKeys(o), e = d(t, r)) : (u = k(arguments, !1, !1, 1), e = function(n, t, r) {
                    return t in r
                }, o = Object(o));
                for (var a = 0, c = u.length; c > a; a++) {
                    var l = u[a],
                        f = o[l];
                    e(f, l, o) && (i[l] = f)
                }
                return i
            }, m.omit = function(n, t, r) {
                if (m.isFunction(t)) t = m.negate(t);
                else {
                    var e = m.map(k(arguments, !1, !1, 1), String);
                    t = function(n, t) {
                        return !m.contains(e, t)
                    }
                }
                return m.pick(n, t, r)
            }, m.defaults = x(m.allKeys, !0), m.clone = function(n) {
                return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
            }, m.tap = function(n, t) {
                return t(n), n
            }, m.isMatch = function(n, t) {
                var r = m.keys(t),
                    e = r.length;
                if (null == n) return !e;
                for (var u = Object(n), i = 0; e > i; i++) {
                    var o = r[i];
                    if (t[o] !== u[o] || !(o in u)) return !1
                }
                return !0
            };
            var E = function(n, t, r, e) {
                if (n === t) return 0 !== n || 1 / n === 1 / t;
                if (null == n || null == t) return n === t;
                n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
                var u = f.call(n);
                if (u !== f.call(t)) return !1;
                switch (u) {
                    case "[object RegExp]":
                    case "[object String]":
                        return "" + n == "" + t;
                    case "[object Number]":
                        return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +n === +t
                }
                var i = "[object Array]" === u;
                if (!i) {
                    if ("object" != typeof n || "object" != typeof t) return !1;
                    var o = n.constructor,
                        a = t.constructor;
                    if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1
                }
                r = r || [], e = e || [];
                for (var c = r.length; c--;)
                    if (r[c] === n) return e[c] === t;
                if (r.push(n), e.push(t), i) {
                    if (c = n.length, c !== t.length) return !1;
                    for (; c--;)
                        if (!E(n[c], t[c], r, e)) return !1
                } else {
                    var l, s = m.keys(n);
                    if (c = s.length, m.keys(t).length !== c) return !1;
                    for (; c--;)
                        if (l = s[c], !m.has(t, l) || !E(n[l], t[l], r, e)) return !1
                }
                return r.pop(), e.pop(), !0
            };
            m.isEqual = function(n, t) {
                return E(n, t)
            }, m.isEmpty = function(n) {
                return null == n ? !0 : w(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
            }, m.isElement = function(n) {
                return !(!n || 1 !== n.nodeType)
            }, m.isArray = p || function(n) {
                return "[object Array]" === f.call(n)
            }, m.isObject = function(n) {
                var t = typeof n;
                return "function" === t || "object" === t && !!n
            }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
                m["is" + n] = function(t) {
                    return f.call(t) === "[object " + n + "]"
                }
            }), m.isArguments(arguments) || (m.isArguments = function(n) {
                return m.has(n, "callee")
            }), "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function(n) {
                return "function" == typeof n || !1
            }), m.isFinite = function(n) {
                return isFinite(n) && !isNaN(parseFloat(n))
            }, m.isNaN = function(n) {
                return m.isNumber(n) && n !== +n
            }, m.isBoolean = function(n) {
                return n === !0 || n === !1 || "[object Boolean]" === f.call(n)
            }, m.isNull = function(n) {
                return null === n
            }, m.isUndefined = function(n) {
                return void 0 === n
            }, m.has = function(n, t) {
                return null != n && s.call(n, t)
            }, m.noConflict = function() {
                return e._ = u, this
            }, m.identity = function(n) {
                return n
            }, m.constant = function(n) {
                return function() {
                    return n
                }
            }, m.noop = function() {}, m.property = function(n) {
                return function(t) {
                    return null == t ? void 0 : t[n]
                }
            }, m.propertyOf = function(n) {
                return null == n ? function() {} : function(t) {
                    return n[t]
                }
            }, m.matcher = m.matches = function(n) {
                return n = m.extendOwn({}, n),
                    function(t) {
                        return m.isMatch(t, n)
                    }
            }, m.times = function(n, t, r) {
                var e = Array(Math.max(0, n));
                t = d(t, r, 1);
                for (var u = 0; n > u; u++) e[u] = t(u);
                return e
            }, m.random = function(n, t) {
                return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
            }, m.now = Date.now || function() {
                return (new Date).getTime()
            };
            var M = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                N = m.invert(M),
                I = function(n) {
                    var t = function(t) {
                            return n[t]
                        },
                        r = "(?:" + m.keys(n).join("|") + ")",
                        e = RegExp(r),
                        u = RegExp(r, "g");
                    return function(n) {
                        return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
                    }
                };
            m.escape = I(M), m.unescape = I(N), m.result = function(n, t, r) {
                var e = null == n ? void 0 : n[t];
                return void 0 === e && (e = r), m.isFunction(e) ? e.call(n) : e
            };
            var B = 0;
            m.uniqueId = function(n) {
                var t = ++B + "";
                return n ? n + t : t
            }, m.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var T = /(.)^/,
                R = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                q = /\\|'|\r|\n|\u2028|\u2029/g,
                K = function(n) {
                    return "\\" + R[n]
                };
            m.template = function(n, t, r) {
                !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
                var e = RegExp([(t.escape || T).source, (t.interpolate || T).source, (t.evaluate || T).source].join("|") + "|$", "g"),
                    u = 0,
                    i = "__p+='";
                n.replace(e, function(t, r, e, o, a) {
                    return i += n.slice(u, a).replace(q, K), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
                }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
                try {
                    var o = new Function(t.variable || "obj", "_", i)
                } catch (a) {
                    throw a.source = i, a
                }
                var c = function(n) {
                        return o.call(this, n, m)
                    },
                    l = t.variable || "obj";
                return c.source = "function(" + l + "){\n" + i + "}", c
            }, m.chain = function(n) {
                var t = m(n);
                return t._chain = !0, t
            };
            var z = function(n, t) {
                return n._chain ? m(t).chain() : t
            };
            m.mixin = function(n) {
                m.each(m.functions(n), function(t) {
                    var r = m[t] = n[t];
                    m.prototype[t] = function() {
                        var n = [this._wrapped];
                        return c.apply(n, arguments), z(this, r.apply(m, n))
                    }
                })
            }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
                var t = i[n];
                m.prototype[n] = function() {
                    var r = this._wrapped;
                    return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], z(this, r)
                }
            }), m.each(["concat", "join", "slice"], function(n) {
                var t = i[n];
                m.prototype[n] = function() {
                    return z(this, t.apply(this._wrapped, arguments))
                }
            }), m.prototype.value = function() {
                return this._wrapped
            }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function() {
                return "" + this._wrapped
            }, "function" == typeof define && define.amd && define("underscore", [], function() {
                return m
            })
        }).call(this);


    }, {}],
    20: [function(require, module, exports) {
        ! function() {
            function m() {
                return function() {}
            }

            function n(t) {
                return function() {
                    return this[t]
                }
            }

            function q(t) {
                return function() {
                    return t
                }
            }

            function t(e, i, o) {
                if ("string" == typeof e) {
                    if (0 === e.indexOf("#") && (e = e.slice(1)), t.Aa[e]) return i && t.log.warn('Player "' + e + '" is already initialised. Options will not be applied.'), o && t.Aa[e].I(o), t.Aa[e];
                    e = t.m(e)
                }
                if (!e || !e.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
                return e.player || new t.Player(e, i, o)
            }

            function v(e, i, o, n) {
                t.wc.forEach(o, function(t) {
                    e(i, t, n)
                })
            }

            function F(e, i) {
                var o, n;
                o = Array.prototype.slice.call(i), n = m(), n = window.console || {
                    log: n,
                    warn: n,
                    error: n
                }, e ? o.unshift(e.toUpperCase() + ":") : e = "log", t.log.history.push(o), o.unshift("VIDEOJS:"), n[e].apply ? n[e].apply(n, o) : n[e](o.join(" "))
            }

            function G(t) {
                t.r("vjs-lock-showing")
            }

            function ca(e, i, o, n) {
                return o !== b ? ((o === j || t.ke(o)) && (o = 0), e.c.style[i] = -1 !== ("" + o).indexOf("%") || -1 !== ("" + o).indexOf("px") ? o : "auto" === o ? "" : o + "px", n || e.o("resize"), e) : e.c ? (o = e.c.style[i], n = o.indexOf("px"), -1 !== n ? parseInt(o.slice(0, n), 10) : parseInt(e.c["offset" + t.ua(i)], 10)) : 0
            }

            function da(e) {
                var i, o, n, s, r, a, c, u;
                i = 0, o = j, e.b("touchstart", function(e) {
                    1 === e.touches.length && (o = t.i.copy(e.touches[0]), i = (new Date).getTime(), s = f)
                }), e.b("touchmove", function(t) {
                    1 < t.touches.length ? s = l : o && (a = t.touches[0].pageX - o.pageX, c = t.touches[0].pageY - o.pageY, u = Math.sqrt(a * a + c * c), u > 10 && (s = l))
                }), r = function() {
                    s = l
                }, e.b("touchleave", r), e.b("touchcancel", r), e.b("touchend", function(t) {
                    o = j, s === f && (n = (new Date).getTime() - i, 200 > n && (t.preventDefault(), this.o("tap")))
                })
            }

            function ea(e, i) {
                var o, n, s, r;
                return o = e.c, n = t.Yd(o), r = s = o.offsetWidth, o = e.handle, e.options().vertical ? (r = n.top, n = i.changedTouches ? i.changedTouches[0].pageY : i.pageY, o && (o = o.m().offsetHeight, r += o / 2, s -= o), Math.max(0, Math.min(1, (r - n + s) / s))) : (s = n.left, n = i.changedTouches ? i.changedTouches[0].pageX : i.pageX, o && (o = o.m().offsetWidth, s += o / 2, r -= o), Math.max(0, Math.min(1, (n - s) / r)))
            }

            function fa(e, i) {
                e.ba(i), i.b("click", t.bind(e, function() {
                    G(this)
                }))
            }

            function ga(t) {
                t.Ha = f, t.xa.p("vjs-lock-showing"), t.c.setAttribute("aria-pressed", f), t.H && 0 < t.H.length && t.H[0].m().focus()
            }

            function H(t) {
                t.Ha = l, G(t.xa), t.c.setAttribute("aria-pressed", l)
            }

            function ia(e) {
                var i, o, n = {
                    sources: [],
                    tracks: []
                };
                if (i = t.Na(e), o = i["data-setup"], o !== j && t.i.D(i, t.JSON.parse(o || "{}")), t.i.D(n, i), e.hasChildNodes()) {
                    var s, r;
                    for (e = e.childNodes, s = 0, r = e.length; r > s; s++) i = e[s], o = i.nodeName.toLowerCase(), "source" === o ? n.sources.push(t.Na(i)) : "track" === o && n.tracks.push(t.Na(i))
                }
                return n
            }

            function ka(e, i, o) {
                e.h && (e.wa = l, e.h.dispose(), e.h = l), "Html5" !== i && e.L && (t.f.Mb(e.L), e.L = j), e.Ua = i, e.wa = l;
                var n = t.i.D({
                    source: o,
                    parentEl: e.c
                }, e.q[i.toLowerCase()]);
                o && (e.Gc = o.type, o.src == e.K.src && 0 < e.K.currentTime && (n.startTime = e.K.currentTime), e.K.src = o.src), e.h = new window.videojs[i](e, n), e.h.I(function() {
                    this.d.Wa()
                })
            }

            function la(t, e) {
                e !== b && t.Nc !== e && ((t.Nc = e) ? (t.p("vjs-has-started"), t.o("firstplay")) : t.r("vjs-has-started"))
            }

            function N(e, i, o) {
                if (e.h && !e.h.wa) e.h.I(function() {
                    this[i](o)
                });
                else try {
                    e.h[i](o)
                } catch (n) {
                    throw t.log(n), n
                }
            }

            function M(e, i) {
                if (e.h && e.h.wa) try {
                    return e.h[i]()
                } catch (o) {
                    throw e.h[i] === b ? t.log("Video.js: " + i + " method not defined for " + e.Ua + " playback technology.", o) : "TypeError" == o.name ? (t.log("Video.js: " + i + " unavailable on " + e.Ua + " playback technology element.", o), e.h.wa = l) : t.log(o), o
                }
            }

            function ma(t, e) {
                var i = t.selectSource(e);
                i ? i.h === t.Ua ? t.src(i.source) : ka(t, i.h, i.source) : (t.setTimeout(function() {
                    this.error({
                        code: 4,
                        message: this.v(this.options().notSupportedMessage)
                    })
                }, 0), t.Wa())
            }

            function ja(t, e) {
                return e !== b ? (t.Pc = !!e, t) : t.Pc
            }

            function na(t) {
                return t.k().h && t.k().h.featuresPlaybackRate && t.k().options().playbackRates && 0 < t.k().options().playbackRates.length
            }

            function qa() {
                var t = T[U],
                    e = t.charAt(0).toUpperCase() + t.slice(1);
                ra["set" + e] = function(e) {
                    return this.c.vjs_setProperty(t, e)
                }
            }

            function sa(t) {
                ra[t] = function() {
                    return this.c.vjs_getProperty(t)
                }
            }

            function P(e, i) {
                var o = e.Va.length;
                "" + o in e || Object.defineProperty(e, o, {
                    get: function() {
                        return this.Va[o]
                    }
                }), i.addEventListener("modechange", t.bind(e, function() {
                    this.o("change")
                })), e.Va.push(i), e.o({
                    type: "addtrack",
                    U: i
                })
            }

            function Q(t, e) {
                for (var i, o = 0, n = t.length; n > o; o++)
                    if (i = t[o], i === e) {
                        t.Va.splice(o, 1);
                        break
                    }
                t.o({
                    type: "removetrack",
                    U: e
                })
            }

            function W(t, e) {
                return "rgba(" + parseInt(t[1] + t[1], 16) + "," + parseInt(t[2] + t[2], 16) + "," + parseInt(t[3] + t[3], 16) + "," + e + ")"
            }

            function X(t) {
                var e;
                return t.Ke ? e = t.Ke[0] : t.options && (e = t.options[t.options.selectedIndex]), e.value
            }

            function Y(t, e) {
                var i, o;
                if (e) {
                    for (i = 0; i < t.options.length && (o = t.options[i], !(o.value === e)); i++);
                    t.selectedIndex = i
                }
            }

            function $(t, e) {
                var i = t.split("."),
                    o = ya;
                !(i[0] in o) && o.execScript && o.execScript("var " + i[0]);
                for (var n; i.length && (n = i.shift());) i.length || e === b ? o = o[n] ? o[n] : o[n] = {} : o[n] = e
            }
            var b = void 0,
                f = !0,
                j = null,
                l = !1,
                s;
            var videojs = window.videojs = t;
            t.ic = "4.12", t.vd = "https:" == document.location.protocol ? "https://" : "http://", t.VERSION = "4.12.1", t.options = {
                techOrder: ["html5", "flash"],
                html5: {},
                flash: {},
                width: 300,
                height: 150,
                defaultVolume: 0,
                playbackRates: [],
                inactivityTimeout: 2e3,
                children: {
                    mediaLoader: {},
                    posterImage: {},
                    loadingSpinner: {},
                    textTrackDisplay: {},
                    bigPlayButton: {},
                    controlBar: {},
                    errorDisplay: {},
                    textTrackSettings: {}
                },
                language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.If || navigator.language || "en",
                languages: {},
                notSupportedMessage: "No compatible source was found for this video."
            }, "GENERATED_CDN_VSN" !== t.ic && (videojs.options.flash.swf = t.vd + "vjs.zencdn.net/" + t.ic + "/video-js.swf"), t.Jd = function(e, i) {
                return t.options.languages[e] = t.options.languages[e] !== b ? t.$.ya(t.options.languages[e], i) : i, t.options.languages
            }, t.Aa = {}, "function" == typeof define && define.amd ? define("videojs", [], function() {
                return videojs
            }) : "object" == typeof exports && "object" == typeof module && (module.exports = videojs), t.Ea = t.CoreObject = m(), t.Ea.extend = function(e) {
                var i, o;
                e = e || {}, i = e.init || e.l || this.prototype.init || this.prototype.l || m(), o = function() {
                    i.apply(this, arguments)
                }, o.prototype = t.i.create(this.prototype), o.prototype.constructor = o, o.extend = t.Ea.extend, o.create = t.Ea.create;
                for (var n in e) e.hasOwnProperty(n) && (o.prototype[n] = e[n]);
                return o
            }, t.Ea.create = function() {
                var e = t.i.create(this.prototype);
                return this.apply(e, arguments), e
            }, t.b = function(e, i, o) {
                if (t.i.isArray(i)) return v(t.b, e, i, o);
                var n = t.getData(e);
                n.G || (n.G = {}), n.G[i] || (n.G[i] = []), o.s || (o.s = t.s++), n.G[i].push(o), n.ca || (n.disabled = l, n.ca = function(i) {
                    if (!n.disabled) {
                        i = t.Pb(i);
                        var o = n.G[i.type];
                        if (o)
                            for (var o = o.slice(0), s = 0, r = o.length; r > s && !i.Rc(); s++) o[s].call(e, i)
                    }
                }), 1 == n.G[i].length && (e.addEventListener ? e.addEventListener(i, n.ca, l) : e.attachEvent && e.attachEvent("on" + i, n.ca))
            }, t.n = function(e, i, o) {
                if (t.Mc(e)) {
                    var n = t.getData(e);
                    if (n.G) {
                        if (t.i.isArray(i)) return v(t.n, e, i, o);
                        if (i) {
                            var s = n.G[i];
                            if (s) {
                                if (o) {
                                    if (o.s)
                                        for (n = 0; n < s.length; n++) s[n].s === o.s && s.splice(n--, 1)
                                } else n.G[i] = [];
                                t.Ac(e, i)
                            }
                        } else
                            for (s in n.G) i = s, n.G[i] = [], t.Ac(e, i)
                    }
                }
            }, t.Ac = function(e, i) {
                var o = t.getData(e);
                0 === o.G[i].length && (delete o.G[i], e.removeEventListener ? e.removeEventListener(i, o.ca, l) : e.detachEvent && e.detachEvent("on" + i, o.ca)), t.ib(o.G) && (delete o.G, delete o.ca, delete o.disabled), t.ib(o) && t.cd(e)
            }, t.Pb = function(t) {
                function e() {
                    return f
                }

                function i() {
                    return l
                }
                if (!t || !t.Vb) {
                    var o = t || window.event;
                    t = {};
                    for (var n in o) "layerX" !== n && "layerY" !== n && "keyLocation" !== n && ("returnValue" == n && o.preventDefault || (t[n] = o[n]));
                    if (t.target || (t.target = t.srcElement || document), t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement, t.preventDefault = function() {
                            o.preventDefault && o.preventDefault(), t.returnValue = l, t.ie = e, t.defaultPrevented = f
                        }, t.ie = i, t.defaultPrevented = l, t.stopPropagation = function() {
                            o.stopPropagation && o.stopPropagation(), t.cancelBubble = f, t.Vb = e
                        }, t.Vb = i, t.stopImmediatePropagation = function() {
                            o.stopImmediatePropagation && o.stopImmediatePropagation(), t.Rc = e, t.stopPropagation()
                        }, t.Rc = i, t.clientX != j) {
                        n = document.documentElement;
                        var s = document.body;
                        t.pageX = t.clientX + (n && n.scrollLeft || s && s.scrollLeft || 0) - (n && n.clientLeft || s && s.clientLeft || 0), t.pageY = t.clientY + (n && n.scrollTop || s && s.scrollTop || 0) - (n && n.clientTop || s && s.clientTop || 0)
                    }
                    t.which = t.charCode || t.keyCode, t.button != j && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
                }
                return t
            }, t.o = function(e, i) {
                var o = t.Mc(e) ? t.getData(e) : {},
                    n = e.parentNode || e.ownerDocument;
                return "string" == typeof i && (i = {
                    type: i,
                    target: e
                }), i = t.Pb(i), o.ca && o.ca.call(e, i), n && !i.Vb() && i.bubbles !== l ? t.o(n, i) : n || i.defaultPrevented || (o = t.getData(i.target), !i.target[i.type]) || (o.disabled = f, "function" == typeof i.target[i.type] && i.target[i.type](), o.disabled = l), !i.defaultPrevented
            }, t.N = function(e, i, o) {
                function n() {
                    t.n(e, i, n), o.apply(this, arguments)
                }
                return t.i.isArray(i) ? v(t.N, e, i, o) : (n.s = o.s = o.s || t.s++, void t.b(e, i, n))
            };
            var w = Object.prototype.hasOwnProperty;
            t.e = function(e, i) {
                var o;
                return i = i || {}, o = document.createElement(e || "div"), t.i.da(i, function(t, e) {
                    -1 !== t.indexOf("aria-") || "role" == t ? o.setAttribute(t, e) : o[t] = e
                }), o
            }, t.ua = function(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }, t.i = {}, t.i.create = Object.create || function(t) {
                function e() {}
                return e.prototype = t, new e
            }, t.i.da = function(t, e, i) {
                for (var o in t) w.call(t, o) && e.call(i || this, o, t[o])
            }, t.i.D = function(t, e) {
                if (!e) return t;
                for (var i in e) w.call(e, i) && (t[i] = e[i]);
                return t
            }, t.i.Rd = function(e, i) {
                var o, n, s;
                e = t.i.copy(e);
                for (o in i) w.call(i, o) && (n = e[o], s = i[o], e[o] = t.i.jb(n) && t.i.jb(s) ? t.i.Rd(n, s) : i[o]);
                return e
            }, t.i.copy = function(e) {
                return t.i.D({}, e)
            }, t.i.jb = function(t) {
                return !!t && "object" == typeof t && "[object Object]" === t.toString() && t.constructor === Object
            }, t.i.isArray = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }, t.ke = function(t) {
                return t !== t
            }, t.bind = function(e, i, o) {
                function n() {
                    return i.apply(e, arguments)
                }
                return i.s || (i.s = t.s++), n.s = o ? o + "_" + i.s : i.s, n
            }, t.ta = {}, t.s = 1, t.expando = "vdata" + (new Date).getTime(), t.getData = function(e) {
                var i = e[t.expando];
                return i || (i = e[t.expando] = t.s++), t.ta[i] || (t.ta[i] = {}), t.ta[i]
            }, t.Mc = function(e) {
                return e = e[t.expando], !(!e || t.ib(t.ta[e]))
            }, t.cd = function(e) {
                var i = e[t.expando];
                if (i) {
                    delete t.ta[i];
                    try {
                        delete e[t.expando]
                    } catch (o) {
                        e.removeAttribute ? e.removeAttribute(t.expando) : e[t.expando] = j
                    }
                }
            }, t.ib = function(t) {
                for (var e in t)
                    if (t[e] !== j) return l;
                return f
            }, t.Oa = function(t, e) {
                return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
            }, t.p = function(e, i) {
                t.Oa(e, i) || (e.className = "" === e.className ? i : e.className + " " + i)
            }, t.r = function(e, i) {
                var o, n;
                if (t.Oa(e, i)) {
                    for (o = e.className.split(" "), n = o.length - 1; n >= 0; n--) o[n] === i && o.splice(n, 1);
                    e.className = o.join(" ")
                }
            }, t.A = t.e("video");
            var x = document.createElement("track");
            x.Wb = "captions", x.hd = "en", x.label = "English", t.A.appendChild(x), t.P = navigator.userAgent, t.Cd = /iPhone/i.test(t.P), t.Bd = /iPad/i.test(t.P), t.Dd = /iPod/i.test(t.P), t.Ad = t.Cd || t.Bd || t.Dd;
            var aa = t,
                y, z = t.P.match(/OS (\d+)_/i);
            y = z && z[1] ? z[1] : b, aa.kf = y, t.zd = /Android/i.test(t.P);
            var ba = t,
                B, C = t.P.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
                D, E;
            C ? (D = C[1] && parseFloat(C[1]), E = C[2] && parseFloat(C[2]), B = D && E ? parseFloat(C[1] + "." + C[2]) : D ? D : j) : B = j, ba.hc = B, t.Ed = t.zd && /webkit/i.test(t.P) && 2.3 > t.hc, t.jc = /Firefox/i.test(t.P), t.lf = /Chrome/i.test(t.P), t.oa = /MSIE\s8\.0/.test(t.P), t.Eb = !!("ontouchstart" in window || window.xd && document instanceof window.xd), t.wd = "backgroundSize" in t.A.style, t.ed = function(e, i) {
                t.i.da(i, function(t, i) {
                    i === j || "undefined" == typeof i || i === l ? e.removeAttribute(t) : e.setAttribute(t, i === f ? "" : i)
                })
            }, t.Na = function(t) {
                var e, i, o, n;
                if (e = {}, t && t.attributes && 0 < t.attributes.length) {
                    i = t.attributes;
                    for (var s = i.length - 1; s >= 0; s--) o = i[s].name, n = i[s].value, ("boolean" == typeof t[o] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + o + ",")) && (n = n !== j ? f : l), e[o] = n
                }
                return e
            }, t.vf = function(t, e) {
                var i = "";
                return document.defaultView && document.defaultView.getComputedStyle ? i = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (i = t["client" + e.substr(0, 1).toUpperCase() + e.substr(1)] + "px"), i
            }, t.Ub = function(t, e) {
                e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
            }, t.cb = {}, t.m = function(t) {
                return 0 === t.indexOf("#") && (t = t.slice(1)), document.getElementById(t)
            }, t.Ma = function(t, e) {
                e = e || t;
                var i = Math.floor(t % 60),
                    o = Math.floor(t / 60 % 60),
                    n = Math.floor(t / 3600),
                    s = Math.floor(e / 60 % 60),
                    r = Math.floor(e / 3600);
                return (isNaN(t) || 1 / 0 === t) && (n = o = i = "-"), n = n > 0 || r > 0 ? n + ":" : "", n + (((n || s >= 10) && 10 > o ? "0" + o : o) + ":") + (10 > i ? "0" + i : i)
            }, t.Ld = function() {
                document.body.focus(), document.onselectstart = q(l)
            }, t.af = function() {
                document.onselectstart = q(f)
            }, t.trim = function(t) {
                return (t + "").replace(/^\s+|\s+$/g, "")
            }, t.round = function(t, e) {
                return e || (e = 0), Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
            }, t.Lb = function(t, e) {
                return {
                    length: 1,
                    start: function() {
                        return t
                    },
                    end: function() {
                        return e
                    }
                }
            }, t.Me = function(e) {
                try {
                    var i = window.localStorage || l;
                    i && (i.volume = e)
                } catch (o) {
                    22 == o.code || 1014 == o.code ? t.log("LocalStorage Full (VideoJS)", o) : 18 == o.code ? t.log("LocalStorage not allowed (VideoJS)", o) : t.log("LocalStorage Error (VideoJS)", o)
                }
            }, t.$d = function(e) {
                return e.match(/^https?:\/\//) || (e = t.e("div", {
                    innerHTML: '<a href="' + e + '">x</a>'
                }).firstChild.href), e
            }, t.Ee = function(e) {
                var i, o, n, s;
                s = "protocol hostname port pathname search hash host".split(" "), o = t.e("a", {
                    href: e
                }), (n = "" === o.host && "file:" !== o.protocol) && (i = t.e("div"), i.innerHTML = '<a href="' + e + '"></a>', o = i.firstChild, i.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(i)), e = {};
                for (var r = 0; r < s.length; r++) e[s[r]] = o[s[r]];
                return "http:" === e.protocol && (e.host = e.host.replace(/:80$/, "")), "https:" === e.protocol && (e.host = e.host.replace(/:443$/, "")), n && document.body.removeChild(i), e
            }, t.log = function() {
                F(j, arguments)
            }, t.log.history = [], t.log.error = function() {
                F("error", arguments)
            }, t.log.warn = function() {
                F("warn", arguments)
            }, t.Yd = function(e) {
                var i, o;
                return e.getBoundingClientRect && e.parentNode && (i = e.getBoundingClientRect()), i ? (e = document.documentElement, o = document.body, {
                    left: t.round(i.left + (window.pageXOffset || o.scrollLeft) - (e.clientLeft || o.clientLeft || 0)),
                    top: t.round(i.top + (window.pageYOffset || o.scrollTop) - (e.clientTop || o.clientTop || 0))
                }) : {
                    left: 0,
                    top: 0
                }
            }, t.wc = {}, t.wc.forEach = function(e, i, o) {
                if (t.i.isArray(e) && i instanceof Function)
                    for (var n = 0, s = e.length; s > n; ++n) i.call(o || t, e[n], n, e);
                return e
            }, t.ff = function(e, i) {
                var o, n, s, r, a, c, l;
                "string" == typeof e && (e = {
                    uri: e
                }), videojs.$.ya({
                    method: "GET",
                    timeout: 45e3
                }, e), i = i || m(), c = function() {
                    window.clearTimeout(a), i(j, n, n.response || n.responseText)
                }, l = function(t) {
                    window.clearTimeout(a), t && "string" != typeof t || (t = Error(t)), i(t, n)
                }, o = window.XMLHttpRequest, "undefined" == typeof o && (o = function() {
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
                    } catch (t) {}
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
                    } catch (e) {}
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP")
                    } catch (i) {}
                    throw Error("This browser does not support XMLHttpRequest.")
                }), n = new o, n.uri = e.uri, o = t.Ee(e.uri), s = window.location, o.protocol + o.host === s.protocol + s.host || !window.XDomainRequest || "withCredentials" in n ? (r = "file:" == o.protocol || "file:" == s.protocol, n.onreadystatechange = function() {
                    if (4 === n.readyState) {
                        if (n.Ye) return l("timeout");
                        200 === n.status || r && 0 === n.status ? c() : l()
                    }
                }, e.timeout && (a = window.setTimeout(function() {
                    4 !== n.readyState && (n.Ye = f, n.abort())
                }, e.timeout))) : (n = new window.XDomainRequest, n.onload = c, n.onerror = l, n.onprogress = m(), n.ontimeout = m());
                try {
                    n.open(e.method || "GET", e.uri, f)
                } catch (u) {
                    return void l(u)
                }
                e.withCredentials && (n.withCredentials = f), e.responseType && (n.responseType = e.responseType);
                try {
                    n.send()
                } catch (h) {
                    l(h)
                }
            }, t.$ = {}, t.$.ya = function(e, i) {
                var o, n, s;
                e = t.i.copy(e);
                for (o in i) i.hasOwnProperty(o) && (n = e[o], s = i[o], e[o] = t.i.jb(n) && t.i.jb(s) ? t.$.ya(n, s) : i[o]);
                return e
            }, t.z = m(), s = t.z.prototype, s.bb = {}, s.b = function(e, i) {
                var o = this.addEventListener;
                this.addEventListener = Function.prototype, t.b(this, e, i), this.addEventListener = o
            }, s.addEventListener = t.z.prototype.b, s.n = function(e, i) {
                t.n(this, e, i)
            }, s.removeEventListener = t.z.prototype.n, s.N = function(e, i) {
                t.N(this, e, i)
            }, s.o = function(e) {
                var i = e.type || e;
                "string" == typeof e && (e = {
                    type: i
                }), e = t.Pb(e), this.bb[i] && this["on" + i] && this["on" + i](e), t.o(this, e)
            }, s.dispatchEvent = t.z.prototype.o, t.a = t.Ea.extend({
                l: function(e, i, o) {
                    if (this.d = e, this.q = t.i.copy(this.q), i = this.options(i), this.Pa = i.id || i.el && i.el.id, this.Pa || (this.Pa = (e.id && e.id() || "no_player") + "_component_" + t.s++), this.te = i.name || j, this.c = i.el || this.e(), this.R = [], this.fb = {}, this.gb = {}, this.Oc(), this.I(o), i.dd !== l) {
                        var n, s;
                        this.k().reportUserActivity && (n = t.bind(this.k(), this.k().reportUserActivity), this.b("touchstart", function() {
                            n(), this.clearInterval(s), s = this.setInterval(n, 250)
                        }), e = function() {
                            n(), this.clearInterval(s)
                        }, this.b("touchmove", n), this.b("touchend", e), this.b("touchcancel", e))
                    }
                }
            }), s = t.a.prototype, s.dispose = function() {
                if (this.o({
                        type: "dispose",
                        bubbles: l
                    }), this.R)
                    for (var e = this.R.length - 1; e >= 0; e--) this.R[e].dispose && this.R[e].dispose();
                this.gb = this.fb = this.R = j, this.n(), this.c.parentNode && this.c.parentNode.removeChild(this.c), t.cd(this.c), this.c = j
            }, s.d = f, s.k = n("d"), s.options = function(e) {
                return e === b ? this.q : this.q = t.$.ya(this.q, e)
            }, s.e = function(e, i) {
                return t.e(e, i)
            }, s.v = function(t) {
                var e = this.d.language(),
                    i = this.d.languages();
                return i && i[e] && i[e][t] ? i[e][t] : t
            }, s.m = n("c"), s.va = function() {
                return this.B || this.c
            }, s.id = n("Pa"), s.name = n("te"), s.children = n("R"), s.ae = function(t) {
                return this.fb[t]
            }, s.ea = function(t) {
                return this.gb[t]
            }, s.ba = function(e, i) {
                var o, n;
                return "string" == typeof e ? (n = e, i = i || {}, o = i.componentClass || t.ua(n), i.name = n, o = new window.videojs[o](this.d || this, i)) : o = e, this.R.push(o), "function" == typeof o.id && (this.fb[o.id()] = o), (n = n || o.name && o.name()) && (this.gb[n] = o), "function" == typeof o.el && o.el() && this.va().appendChild(o.el()), o
            }, s.removeChild = function(t) {
                if ("string" == typeof t && (t = this.ea(t)), t && this.R) {
                    for (var e = l, i = this.R.length - 1; i >= 0; i--)
                        if (this.R[i] === t) {
                            e = f, this.R.splice(i, 1);
                            break
                        }
                    e && (this.fb[t.id()] = j, this.gb[t.name()] = j, (e = t.m()) && e.parentNode === this.va() && this.va().removeChild(t.m()))
                }
            }, s.Oc = function() {
                var e, i, o, n, s, r;
                if (e = this, i = e.options(), o = i.children)
                    if (r = function(t, o) {
                            i[t] !== b && (o = i[t]), o !== l && (e[t] = e.ba(t, o))
                        }, t.i.isArray(o))
                        for (var a = 0; a < o.length; a++) n = o[a], "string" == typeof n ? (s = n, n = {}) : s = n.name, r(s, n);
                    else t.i.da(o, r)
            }, s.T = q(""), s.b = function(e, i, o) {
                var n, s, r;
                return "string" == typeof e || t.i.isArray(e) ? t.b(this.c, e, t.bind(this, i)) : (n = t.bind(this, o), r = this, s = function() {
                    r.n(e, i, n)
                }, s.s = n.s, this.b("dispose", s), o = function() {
                    r.n("dispose", s)
                }, o.s = n.s, e.nodeName ? (t.b(e, i, n), t.b(e, "dispose", o)) : "function" == typeof e.b && (e.b(i, n), e.b("dispose", o))), this
            }, s.n = function(e, i, o) {
                return !e || "string" == typeof e || t.i.isArray(e) ? t.n(this.c, e, i) : (o = t.bind(this, o), this.n("dispose", o), e.nodeName ? (t.n(e, i, o), t.n(e, "dispose", o)) : (e.n(i, o), e.n("dispose", o))), this
            }, s.N = function(e, i, o) {
                var n, s, r;
                return "string" == typeof e || t.i.isArray(e) ? t.N(this.c, e, t.bind(this, i)) : (n = t.bind(this, o), s = this, r = function() {
                    s.n(e, i, r), n.apply(this, arguments)
                }, r.s = n.s, this.b(e, i, r)), this
            }, s.o = function(e) {
                return t.o(this.c, e), this
            }, s.I = function(t) {
                return t && (this.wa ? t.call(this) : (this.nb === b && (this.nb = []), this.nb.push(t))), this
            }, s.Wa = function() {
                this.wa = f;
                var t = this.nb;
                if (t && 0 < t.length) {
                    for (var e = 0, i = t.length; i > e; e++) t[e].call(this);
                    this.nb = [], this.o("ready")
                }
            }, s.Oa = function(e) {
                return t.Oa(this.c, e)
            }, s.p = function(e) {
                return t.p(this.c, e), this
            }, s.r = function(e) {
                return t.r(this.c, e), this
            }, s.show = function() {
                return this.r("vjs-hidden"), this
            }, s.X = function() {
                return this.p("vjs-hidden"), this
            }, s.width = function(t, e) {
                return ca(this, "width", t, e)
            }, s.height = function(t, e) {
                return ca(this, "height", t, e)
            }, s.Td = function(t, e) {
                return this.width(t, f).height(e)
            }, s.setTimeout = function(e, i) {
                function o() {
                    this.clearTimeout(n)
                }
                e = t.bind(this, e);
                var n = setTimeout(e, i);
                return o.s = "vjs-timeout-" + n, this.b("dispose", o), n
            }, s.clearTimeout = function(t) {
                function e() {}
                return clearTimeout(t), e.s = "vjs-timeout-" + t, this.n("dispose", e), t
            }, s.setInterval = function(e, i) {
                function o() {
                    this.clearInterval(n)
                }
                e = t.bind(this, e);
                var n = setInterval(e, i);
                return o.s = "vjs-interval-" + n, this.b("dispose", o), n
            }, s.clearInterval = function(t) {
                function e() {}
                return clearInterval(t), e.s = "vjs-interval-" + t, this.n("dispose", e), t
            }, t.w = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), da(this), this.b("tap", this.u), this.b("click", this.u), this.b("focus", this.lb), this.b("blur", this.kb)
                }
            }), s = t.w.prototype, s.e = function(e, i) {
                var o;
                return i = t.i.D({
                    className: this.T(),
                    role: "button",
                    "aria-live": "polite",
                    tabIndex: 0
                }, i), o = t.a.prototype.e.call(this, e, i), i.innerHTML || (this.B = t.e("div", {
                    className: "vjs-control-content"
                }), this.Jb = t.e("span", {
                    className: "vjs-control-text",
                    innerHTML: this.v(this.sa) || "Need Text"
                }), this.B.appendChild(this.Jb), o.appendChild(this.B)), o
            }, s.T = function() {
                return "vjs-control " + t.a.prototype.T.call(this)
            }, s.u = m(), s.lb = function() {
                t.b(document, "keydown", t.bind(this, this.ja))
            }, s.ja = function(t) {
                (32 == t.which || 13 == t.which) && (t.preventDefault(), this.u())
            }, s.kb = function() {
                t.n(document, "keydown", t.bind(this, this.ja))
            }, t.S = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), this.Kd = this.ea(this.q.barName), this.handle = this.ea(this.q.handleName), this.b("mousedown", this.mb), this.b("touchstart", this.mb), this.b("focus", this.lb), this.b("blur", this.kb), this.b("click", this.u), this.b(e, "controlsvisible", this.update), this.b(e, this.Yc, this.update)
                }
            }), s = t.S.prototype, s.e = function(e, i) {
                return i = i || {}, i.className += " vjs-slider", i = t.i.D({
                    role: "slider",
                    "aria-valuenow": 0,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    tabIndex: 0
                }, i), t.a.prototype.e.call(this, e, i)
            }, s.mb = function(e) {
                e.preventDefault(), t.Ld(), this.p("vjs-sliding"), this.b(document, "mousemove", this.ka), this.b(document, "mouseup", this.za), this.b(document, "touchmove", this.ka), this.b(document, "touchend", this.za), this.ka(e)
            }, s.ka = m(), s.za = function() {
                t.af(), this.r("vjs-sliding"), this.n(document, "mousemove", this.ka), this.n(document, "mouseup", this.za), this.n(document, "touchmove", this.ka), this.n(document, "touchend", this.za), this.update()
            }, s.update = function() {
                if (this.c) {
                    var e, i = this.Sb(),
                        o = this.handle,
                        n = this.Kd;
                    if (("number" != typeof i || i !== i || 0 > i || 1 / 0 === i) && (i = 0), e = i, o) {
                        e = this.c.offsetWidth;
                        var s = o.m().offsetWidth;
                        e = s ? s / e : 0, i *= 1 - e, e = i + e / 2, o.m().style.left = t.round(100 * i, 2) + "%"
                    }
                    n && (n.m().style.width = t.round(100 * e, 2) + "%")
                }
            }, s.lb = function() {
                this.b(document, "keydown", this.ja)
            }, s.ja = function(t) {
                37 == t.which || 40 == t.which ? (t.preventDefault(), this.jd()) : (38 == t.which || 39 == t.which) && (t.preventDefault(), this.kd())
            }, s.kb = function() {
                this.n(document, "keydown", this.ja)
            }, s.u = function(t) {
                t.stopImmediatePropagation(), t.preventDefault()
            }, t.ga = t.a.extend(), t.ga.prototype.defaultValue = 0, t.ga.prototype.e = function(e, i) {
                return i = i || {}, i.className += " vjs-slider-handle", i = t.i.D({
                    innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
                }, i), t.a.prototype.e.call(this, "div", i)
            }, t.pa = t.a.extend(), t.pa.prototype.e = function() {
                var e = this.options().Cc || "ul";
                return this.B = t.e(e, {
                    className: "vjs-menu-content"
                }), e = t.a.prototype.e.call(this, "div", {
                    append: this.B,
                    className: "vjs-menu"
                }), e.appendChild(this.B), t.b(e, "click", function(t) {
                    t.preventDefault(), t.stopImmediatePropagation()
                }), e
            }, t.M = t.w.extend({
                l: function(e, i) {
                    t.w.call(this, e, i), this.selected(i.selected)
                }
            }), t.M.prototype.e = function(e, i) {
                return t.w.prototype.e.call(this, "li", t.i.D({
                    className: "vjs-menu-item",
                    innerHTML: this.v(this.q.label)
                }, i))
            }, t.M.prototype.u = function() {
                this.selected(f)
            }, t.M.prototype.selected = function(t) {
                t ? (this.p("vjs-selected"), this.c.setAttribute("aria-selected", f)) : (this.r("vjs-selected"), this.c.setAttribute("aria-selected", l))
            }, t.O = t.w.extend({
                l: function(e, i) {
                    t.w.call(this, e, i), this.update(), this.b("keydown", this.ja), this.c.setAttribute("aria-haspopup", f), this.c.setAttribute("role", "button")
                }
            }), s = t.O.prototype, s.update = function() {
                var t = this.Ja();
                this.xa && this.removeChild(this.xa), this.xa = t, this.ba(t), this.H && 0 === this.H.length ? this.X() : this.H && 1 < this.H.length && this.show()
            }, s.Ha = l, s.Ja = function() {
                var e = new t.pa(this.d);
                if (this.options().title && e.va().appendChild(t.e("li", {
                        className: "vjs-menu-title",
                        innerHTML: t.ua(this.options().title),
                        We: -1
                    })), this.H = this.createItems())
                    for (var i = 0; i < this.H.length; i++) fa(e, this.H[i]);
                return e
            }, s.Ia = m(), s.T = function() {
                return this.className + " vjs-menu-button " + t.w.prototype.T.call(this)
            }, s.lb = m(), s.kb = m(), s.u = function() {
                this.N("mouseout", t.bind(this, function() {
                    G(this.xa), this.c.blur()
                })), this.Ha ? H(this) : ga(this)
            }, s.ja = function(t) {
                32 == t.which || 13 == t.which ? (this.Ha ? H(this) : ga(this), t.preventDefault()) : 27 == t.which && (this.Ha && H(this), t.preventDefault())
            }, t.J = function(e) {
                "number" == typeof e ? this.code = e : "string" == typeof e ? this.message = e : "object" == typeof e && t.i.D(this, e), this.message || (this.message = t.J.Sd[this.code] || "")
            }, t.J.prototype.code = 0, t.J.prototype.message = "", t.J.prototype.status = j, t.J.hb = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" "), t.J.Sd = {
                1: "You aborted the video playback",
                2: "A network error caused the video download to fail part-way.",
                3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
                4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
                5: "The video is encrypted and we do not have the keys to decrypt it."
            };
            for (var I = 0; I < t.J.hb.length; I++) t.J[t.J.hb[I]] = I, t.J.prototype[t.J.hb[I]] = I;
            var J, ha, K, L;
            for (J = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], ha = J[0], L = 0; L < J.length; L++)
                if (J[L][1] in document) {
                    K = J[L];
                    break
                }
            if (K)
                for (t.cb.Rb = {}, L = 0; L < K.length; L++) t.cb.Rb[ha[L]] = K[L];
            t.Player = t.a.extend({
                l: function(e, i, o) {
                    this.L = e, e.id = e.id || "vjs_video_" + t.s++, this.Xe = e && t.Na(e), i = t.i.D(ia(e), i), this.Tc = i.language || t.options.language, this.ne = i.languages || t.options.languages, this.K = {}, this.Zc = i.poster || "", this.Kb = !!i.controls, e.controls = l, i.dd = l, ja(this, "audio" === this.L.nodeName.toLowerCase()), t.a.call(this, this, i, o), this.p(this.controls() ? "vjs-controls-enabled" : "vjs-controls-disabled"), ja(this) && this.p("vjs-audio"), t.Aa[this.Pa] = this, i.plugins && t.i.da(i.plugins, function(t, e) {
                        this[t](e)
                    }, this);
                    var n, s, r, a, c;
                    n = t.bind(this, this.reportUserActivity), this.b("mousedown", function() {
                        n(), this.clearInterval(s), s = this.setInterval(n, 250)
                    }), this.b("mousemove", function(t) {
                        (t.screenX != a || t.screenY != c) && (a = t.screenX, c = t.screenY, n())
                    }), this.b("mouseup", function() {
                        n(), this.clearInterval(s)
                    }), this.b("keydown", n), this.b("keyup", n), this.setInterval(function() {
                        if (this.Da) {
                            this.Da = l, this.userActive(f), this.clearTimeout(r);
                            var t = this.options().inactivityTimeout;
                            t > 0 && (r = this.setTimeout(function() {
                                this.Da || this.userActive(l)
                            }, t))
                        }
                    }, 250)
                }
            }), s = t.Player.prototype, s.language = function(t) {
                return t === b ? this.Tc : (this.Tc = t, this)
            }, s.languages = n("ne"), s.q = t.options, s.dispose = function() {
                this.o("dispose"), this.n("dispose"), t.Aa[this.Pa] = j, this.L && this.L.player && (this.L.player = j), this.c && this.c.player && (this.c.player = j), this.h && this.h.dispose(), t.a.prototype.dispose.call(this)
            }, s.e = function() {
                var e, i = this.c = t.a.prototype.e.call(this, "div"),
                    o = this.L;
                return o.removeAttribute("width"), o.removeAttribute("height"), e = t.Na(o), t.i.da(e, function(t) {
                    "class" == t ? i.className = e[t] : i.setAttribute(t, e[t])
                }), o.id += "_html5_api", o.className = "vjs-tech", o.player = i.player = this, this.p("vjs-paused"), this.width(this.q.width, f), this.height(this.q.height, f), o.ge = o.networkState, o.parentNode && o.parentNode.insertBefore(i, o), t.Ub(o, i), this.c = i, this.b("loadstart", this.xe), this.b("waiting", this.De), this.b(["canplay", "canplaythrough", "playing", "ended"], this.Ce), this.b("seeking", this.Ae), this.b("seeked", this.ze), this.b("ended", this.ue), this.b("play", this.$b), this.b("firstplay", this.ve), this.b("pause", this.Zb), this.b("progress", this.ye), this.b("durationchange", this.Wc), this.b("fullscreenchange", this.we), i
            }, s.xe = function() {
                this.r("vjs-ended"), this.error(j), this.paused() ? la(this, l) : this.o("firstplay")
            }, s.Nc = l, s.$b = function() {
                this.r("vjs-ended"), this.r("vjs-paused"), this.p("vjs-playing"), la(this, f)
            }, s.De = function() {
                this.p("vjs-waiting")
            }, s.Ce = function() {
                this.r("vjs-waiting")
            }, s.Ae = function() {
                this.p("vjs-seeking")
            }, s.ze = function() {
                this.r("vjs-seeking")
            }, s.ve = function() {
                this.q.starttime && this.currentTime(this.q.starttime), this.p("vjs-has-started")
            }, s.Zb = function() {
                this.r("vjs-playing"), this.p("vjs-paused")
            }, s.ye = function() {
                1 == this.bufferedPercent() && this.o("loadedalldata")
            }, s.ue = function() {
                this.p("vjs-ended"), this.q.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause()
            }, s.Wc = function() {
                var t = M(this, "duration");
                t && (0 > t && (t = 1 / 0), this.duration(t), 1 / 0 === t ? this.p("vjs-live") : this.r("vjs-live"))
            }, s.we = function() {
                this.isFullscreen() ? this.p("vjs-fullscreen") : this.r("vjs-fullscreen")
            }, s.play = function() {
                return N(this, "play"), this
            }, s.pause = function() {
                return N(this, "pause"), this
            }, s.paused = function() {
                return M(this, "paused") === l ? l : f
            }, s.currentTime = function(t) {
                return t !== b ? (N(this, "setCurrentTime", t), this) : this.K.currentTime = M(this, "currentTime") || 0
            }, s.duration = function(t) {
                return t !== b ? (this.K.duration = parseFloat(t), this) : (this.K.duration === b && this.Wc(), this.K.duration || 0)
            }, s.remainingTime = function() {
                return this.duration() - this.currentTime()
            }, s.buffered = function() {
                var e = M(this, "buffered");
                return e && e.length || (e = t.Lb(0, 0)), e
            }, s.bufferedPercent = function() {
                var t, e, i = this.duration(),
                    o = this.buffered(),
                    n = 0;
                if (!i) return 0;
                for (var s = 0; s < o.length; s++) t = o.start(s), e = o.end(s), e > i && (e = i), n += e - t;
                return n / i
            }, s.volume = function(e) {
                return e !== b ? (e = Math.max(0, Math.min(1, parseFloat(e))), this.K.volume = e, N(this, "setVolume", e), t.Me(e), this) : (e = parseFloat(M(this, "volume")), isNaN(e) ? 1 : e)
            }, s.muted = function(t) {
                return t !== b ? (N(this, "setMuted", t), this) : M(this, "muted") || l
            }, s.Ta = function() {
                return M(this, "supportsFullScreen") || l
            }, s.Qc = l, s.isFullscreen = function(t) {
                return t !== b ? (this.Qc = !!t, this) : this.Qc
            }, s.isFullScreen = function(e) {
                return t.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'), this.isFullscreen(e)
            }, s.requestFullscreen = function() {
                var e = t.cb.Rb;
                return this.isFullscreen(f), e ? (t.b(document, e.fullscreenchange, t.bind(this, function() {
                    this.isFullscreen(document[e.fullscreenElement]), this.isFullscreen() === l && t.n(document, e.fullscreenchange, arguments.callee), this.o("fullscreenchange")
                })), this.c[e.requestFullscreen]()) : this.h.Ta() ? N(this, "enterFullScreen") : (this.Jc(), this.o("fullscreenchange")), this
            }, s.requestFullScreen = function() {
                return t.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")'), this.requestFullscreen()
            }, s.exitFullscreen = function() {
                var e = t.cb.Rb;
                return this.isFullscreen(l), e ? document[e.exitFullscreen]() : this.h.Ta() ? N(this, "exitFullScreen") : (this.Nb(), this.o("fullscreenchange")), this
            }, s.cancelFullScreen = function() {
                return t.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()"), this.exitFullscreen()
            }, s.Jc = function() {
                this.je = f, this.Ud = document.documentElement.style.overflow, t.b(document, "keydown", t.bind(this, this.Kc)), document.documentElement.style.overflow = "hidden", t.p(document.body, "vjs-full-window"), this.o("enterFullWindow")
            }, s.Kc = function(t) {
                27 === t.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : this.Nb())
            }, s.Nb = function() {
                this.je = l, t.n(document, "keydown", this.Kc), document.documentElement.style.overflow = this.Ud, t.r(document.body, "vjs-full-window"), this.o("exitFullWindow")
            }, s.selectSource = function(e) {
                for (var i = 0, o = this.q.techOrder; i < o.length; i++) {
                    var n = t.ua(o[i]),
                        s = window.videojs[n];
                    if (s) {
                        if (s.isSupported())
                            for (var r = 0, a = e; r < a.length; r++) {
                                var c = a[r];
                                if (s.canPlaySource(c)) return {
                                    source: c,
                                    h: n
                                }
                            }
                    } else t.log.error('The "' + n + '" tech is undefined. Skipped browser support check for that tech.')
                }
                return l
            }, s.src = function(e) {
                return e === b ? M(this, "src") : (t.i.isArray(e) ? ma(this, e) : "string" == typeof e ? this.src({
                    src: e
                }) : e instanceof Object && (e.type && !window.videojs[this.Ua].canPlaySource(e) ? ma(this, [e]) : (this.K.src = e.src, this.Gc = e.type || "", this.I(function() {
                    window.videojs[this.Ua].prototype.hasOwnProperty("setSource") ? N(this, "setSource", e) : N(this, "src", e.src), "auto" == this.q.preload && this.load(), this.q.autoplay && this.play()
                }))), this)
            }, s.load = function() {
                return N(this, "load"), this
            }, s.currentSrc = function() {
                return M(this, "currentSrc") || this.K.src || ""
            }, s.Qd = function() {
                return this.Gc || ""
            }, s.Qa = function(t) {
                return t !== b ? (N(this, "setPreload", t), this.q.preload = t, this) : M(this, "preload")
            }, s.autoplay = function(t) {
                return t !== b ? (N(this, "setAutoplay", t), this.q.autoplay = t, this) : M(this, "autoplay")
            }, s.loop = function(t) {
                return t !== b ? (N(this, "setLoop", t), this.q.loop = t, this) : M(this, "loop")
            }, s.poster = function(t) {
                return t === b ? this.Zc : (t || (t = ""), this.Zc = t, N(this, "setPoster", t), this.o("posterchange"), this)
            }, s.controls = function(t) {
                return t !== b ? (t = !!t, this.Kb !== t && ((this.Kb = t) ? (this.r("vjs-controls-disabled"), this.p("vjs-controls-enabled"), this.o("controlsenabled")) : (this.r("vjs-controls-enabled"), this.p("vjs-controls-disabled"), this.o("controlsdisabled"))), this) : this.Kb
            }, t.Player.prototype.ec, s = t.Player.prototype, s.usingNativeControls = function(t) {
                return t !== b ? (t = !!t, this.ec !== t && ((this.ec = t) ? (this.p("vjs-using-native-controls"), this.o("usingnativecontrols")) : (this.r("vjs-using-native-controls"), this.o("usingcustomcontrols"))), this) : this.ec
            }, s.ia = j, s.error = function(e) {
                return e === b ? this.ia : e === j ? (this.ia = e, this.r("vjs-error"), this) : (this.ia = e instanceof t.J ? e : new t.J(e), this.o("error"), this.p("vjs-error"), t.log.error("(CODE:" + this.ia.code + " " + t.J.hb[this.ia.code] + ")", this.ia.message, this.ia), this)
            }, s.ended = function() {
                return M(this, "ended")
            }, s.seeking = function() {
                return M(this, "seeking")
            }, s.Da = f, s.reportUserActivity = function() {
                this.Da = f
            }, s.dc = f, s.userActive = function(t) {
                return t !== b ? (t = !!t, t !== this.dc && ((this.dc = t) ? (this.Da = f, this.r("vjs-user-inactive"), this.p("vjs-user-active"), this.o("useractive")) : (this.Da = l, this.h && this.h.N("mousemove", function(t) {
                    t.stopPropagation(), t.preventDefault()
                }), this.r("vjs-user-active"), this.p("vjs-user-inactive"), this.o("userinactive"))), this) : this.dc
            }, s.playbackRate = function(t) {
                return t !== b ? (N(this, "setPlaybackRate", t), this) : this.h && this.h.featuresPlaybackRate ? M(this, "playbackRate") : 1
            }, s.Pc = l, s.networkState = function() {
                return M(this, "networkState")
            }, s.readyState = function() {
                return M(this, "readyState")
            }, s.textTracks = function() {
                return this.h && this.h.textTracks()
            }, s.Z = function() {
                return this.h && this.h.remoteTextTracks()
            }, s.addTextTrack = function(t, e, i) {
                return this.h && this.h.addTextTrack(t, e, i)
            }, s.ha = function(t) {
                return this.h && this.h.addRemoteTextTrack(t)
            }, s.Ba = function(t) {
                this.h && this.h.removeRemoteTextTrack(t)
            }, t.ub = t.a.extend(), t.ub.prototype.q = {
                wf: "play",
                children: {
                    playToggle: {},
                    currentTimeDisplay: {},
                    timeDivider: {},
                    durationDisplay: {},
                    remainingTimeDisplay: {},
                    liveDisplay: {},
                    progressControl: {},
                    fullscreenToggle: {},
                    volumeControl: {},
                    muteToggle: {},
                    playbackRateMenuButton: {},
                    subtitlesButton: {},
                    captionsButton: {},
                    chaptersButton: {}
                }
            }, t.ub.prototype.e = function() {
                return t.e("div", {
                    className: "vjs-control-bar"
                })
            }, t.kc = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i)
                }
            }), t.kc.prototype.e = function() {
                var e = t.a.prototype.e.call(this, "div", {
                    className: "vjs-live-controls vjs-control"
                });
                return this.B = t.e("div", {
                    className: "vjs-live-display",
                    innerHTML: '<span class="vjs-control-text">' + this.v("Stream Type") + "</span>" + this.v("LIVE"),
                    "aria-live": "off"
                }), e.appendChild(this.B), e
            }, t.nc = t.w.extend({
                l: function(e, i) {
                    t.w.call(this, e, i), this.b(e, "play", this.$b), this.b(e, "pause", this.Zb)
                }
            }), s = t.nc.prototype, s.sa = "Play", s.T = function() {
                return "vjs-play-control " + t.w.prototype.T.call(this)
            }, s.u = function() {
                this.d.paused() ? this.d.play() : this.d.pause()
            }, s.$b = function() {
                this.r("vjs-paused"), this.p("vjs-playing"), this.c.children[0].children[0].innerHTML = this.v("Pause")
            }, s.Zb = function() {
                this.r("vjs-playing"), this.p("vjs-paused"), this.c.children[0].children[0].innerHTML = this.v("Play")
            }, t.vb = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), this.b(e, "timeupdate", this.ma)
                }
            }), t.vb.prototype.e = function() {
                var e = t.a.prototype.e.call(this, "div", {
                    className: "vjs-current-time vjs-time-controls vjs-control"
                });
                return this.B = t.e("div", {
                    className: "vjs-current-time-display",
                    innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
                    "aria-live": "off"
                }), e.appendChild(this.B), e
            }, t.vb.prototype.ma = function() {
                var e = this.d.ob ? this.d.K.currentTime : this.d.currentTime();
                this.B.innerHTML = '<span class="vjs-control-text">' + this.v("Current Time") + "</span> " + t.Ma(e, this.d.duration())
            }, t.wb = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), this.b(e, "timeupdate", this.ma)
                }
            }), t.wb.prototype.e = function() {
                var e = t.a.prototype.e.call(this, "div", {
                    className: "vjs-duration vjs-time-controls vjs-control"
                });
                return this.B = t.e("div", {
                    className: "vjs-duration-display",
                    innerHTML: '<span class="vjs-control-text">' + this.v("Duration Time") + "</span> 0:00",
                    "aria-live": "off"
                }), e.appendChild(this.B), e
            }, t.wb.prototype.ma = function() {
                var e = this.d.duration();
                e && (this.B.innerHTML = '<span class="vjs-control-text">' + this.v("Duration Time") + "</span> " + t.Ma(e))
            }, t.tc = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i)
                }
            }), t.tc.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-time-divider",
                    innerHTML: "<div><span>/</span></div>"
                })
            }, t.Db = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), this.b(e, "timeupdate", this.ma)
                }
            }), t.Db.prototype.e = function() {
                var e = t.a.prototype.e.call(this, "div", {
                    className: "vjs-remaining-time vjs-time-controls vjs-control"
                });
                return this.B = t.e("div", {
                    className: "vjs-remaining-time-display",
                    innerHTML: '<span class="vjs-control-text">' + this.v("Remaining Time") + "</span> -0:00",
                    "aria-live": "off"
                }), e.appendChild(this.B), e
            }, t.Db.prototype.ma = function() {
                this.d.duration() && (this.B.innerHTML = '<span class="vjs-control-text">' + this.v("Remaining Time") + "</span> -" + t.Ma(this.d.remainingTime()))
            }, t.Za = t.w.extend({
                l: function(e, i) {
                    t.w.call(this, e, i)
                }
            }), t.Za.prototype.sa = "Fullscreen", t.Za.prototype.T = function() {
                return "vjs-fullscreen-control " + t.w.prototype.T.call(this)
            }, t.Za.prototype.u = function() {
                this.d.isFullscreen() ? (this.d.exitFullscreen(), this.Jb.innerHTML = this.v("Fullscreen")) : (this.d.requestFullscreen(), this.Jb.innerHTML = this.v("Non-Fullscreen"))
            }, t.Cb = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i)
                }
            }), t.Cb.prototype.q = {
                children: {
                    seekBar: {}
                }
            }, t.Cb.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-progress-control vjs-control"
                })
            }, t.qc = t.S.extend({
                l: function(e, i) {
                    t.S.call(this, e, i), this.b(e, "timeupdate", this.Ca), e.I(t.bind(this, this.Ca))
                }
            }), s = t.qc.prototype, s.q = {
                children: {
                    loadProgressBar: {},
                    playProgressBar: {},
                    seekHandle: {}
                },
                barName: "playProgressBar",
                handleName: "seekHandle"
            }, s.Yc = "timeupdate", s.e = function() {
                return t.S.prototype.e.call(this, "div", {
                    className: "vjs-progress-holder",
                    "aria-label": "video progress bar"
                })
            }, s.Ca = function() {
                var e = this.d.ob ? this.d.K.currentTime : this.d.currentTime();
                this.c.setAttribute("aria-valuenow", t.round(100 * this.Sb(), 2)), this.c.setAttribute("aria-valuetext", t.Ma(e, this.d.duration()))
            }, s.Sb = function() {
                return this.d.currentTime() / this.d.duration()
            }, s.mb = function(e) {
                t.S.prototype.mb.call(this, e), this.d.ob = f, this.d.p("vjs-scrubbing"), this.df = !this.d.paused(), this.d.pause()
            }, s.ka = function(t) {
                t = ea(this, t) * this.d.duration(), t == this.d.duration() && (t -= .1), this.d.currentTime(t)
            }, s.za = function(e) {
                t.S.prototype.za.call(this, e), this.d.ob = l, this.d.r("vjs-scrubbing"), this.df && this.d.play()
            }, s.kd = function() {
                this.d.currentTime(this.d.currentTime() + 5)
            }, s.jd = function() {
                this.d.currentTime(this.d.currentTime() - 5)
            }, t.zb = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), this.b(e, "progress", this.update)
                }
            }), t.zb.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-load-progress",
                    innerHTML: '<span class="vjs-control-text"><span>' + this.v("Loaded") + "</span>: 0%</span>"
                })
            }, t.zb.prototype.update = function() {
                var e, i, o, n, s = this.d.buffered();
                e = this.d.duration();
                var r, a = this.d;
                for (r = a.buffered(), a = a.duration(), r = r.end(r.length - 1), r > a && (r = a), a = this.c.children, this.c.style.width = 100 * (r / e || 0) + "%", e = 0; e < s.length; e++) i = s.start(e), o = s.end(e), (n = a[e]) || (n = this.c.appendChild(t.e())), n.style.left = 100 * (i / r || 0) + "%", n.style.width = 100 * ((o - i) / r || 0) + "%";
                for (e = a.length; e > s.length; e--) this.c.removeChild(a[e - 1])
            }, t.mc = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i)
                }
            }), t.mc.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-play-progress",
                    innerHTML: '<span class="vjs-control-text"><span>' + this.v("Progress") + "</span>: 0%</span>"
                })
            }, t.$a = t.ga.extend({
                l: function(e, i) {
                    t.ga.call(this, e, i), this.b(e, "timeupdate", this.ma)
                }
            }), t.$a.prototype.defaultValue = "00:00", t.$a.prototype.e = function() {
                return t.ga.prototype.e.call(this, "div", {
                    className: "vjs-seek-handle",
                    "aria-live": "off"
                })
            }, t.$a.prototype.ma = function() {
                var e = this.d.ob ? this.d.K.currentTime : this.d.currentTime();
                this.c.innerHTML = '<span class="vjs-control-text">' + t.Ma(e, this.d.duration()) + "</span>"
            }, t.Gb = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), e.h && e.h.featuresVolumeControl === l && this.p("vjs-hidden"), this.b(e, "loadstart", function() {
                        e.h.featuresVolumeControl === l ? this.p("vjs-hidden") : this.r("vjs-hidden")
                    })
                }
            }), t.Gb.prototype.q = {
                children: {
                    volumeBar: {}
                }
            }, t.Gb.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-volume-control vjs-control"
                })
            }, t.Fb = t.S.extend({
                l: function(e, i) {
                    t.S.call(this, e, i), this.b(e, "volumechange", this.Ca), e.I(t.bind(this, this.Ca))
                }
            }), s = t.Fb.prototype, s.Ca = function() {
                this.c.setAttribute("aria-valuenow", t.round(100 * this.d.volume(), 2)), this.c.setAttribute("aria-valuetext", t.round(100 * this.d.volume(), 2) + "%")
            }, s.q = {
                children: {
                    volumeLevel: {},
                    volumeHandle: {}
                },
                barName: "volumeLevel",
                handleName: "volumeHandle"
            }, s.Yc = "volumechange", s.e = function() {
                return t.S.prototype.e.call(this, "div", {
                    className: "vjs-volume-bar",
                    "aria-label": "volume level"
                })
            }, s.ka = function(t) {
                this.d.muted() && this.d.muted(l), this.d.volume(ea(this, t))
            }, s.Sb = function() {
                return this.d.muted() ? 0 : this.d.volume()
            }, s.kd = function() {
                this.d.volume(this.d.volume() + .1)
            }, s.jd = function() {
                this.d.volume(this.d.volume() - .1)
            }, t.uc = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i)
                }
            }), t.uc.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-volume-level",
                    innerHTML: '<span class="vjs-control-text"></span>'
                })
            }, t.Hb = t.ga.extend(), t.Hb.prototype.defaultValue = "00:00", t.Hb.prototype.e = function() {
                return t.ga.prototype.e.call(this, "div", {
                    className: "vjs-volume-handle"
                })
            }, t.qa = t.w.extend({
                l: function(e, i) {
                    t.w.call(this, e, i), this.b(e, "volumechange", this.update), e.h && e.h.featuresVolumeControl === l && this.p("vjs-hidden"), this.b(e, "loadstart", function() {
                        e.h.featuresVolumeControl === l ? this.p("vjs-hidden") : this.r("vjs-hidden")
                    })
                }
            }), t.qa.prototype.e = function() {
                return t.w.prototype.e.call(this, "div", {
                    className: "vjs-mute-control vjs-control",
                    innerHTML: '<div><span class="vjs-control-text">' + this.v("Mute") + "</span></div>"
                })
            }, t.qa.prototype.u = function() {
                this.d.muted(this.d.muted() ? l : f)
            }, t.qa.prototype.update = function() {
                var e = this.d.volume(),
                    i = 3;
                for (0 === e || this.d.muted() ? i = 0 : .33 > e ? i = 1 : .67 > e && (i = 2), this.d.muted() ? this.c.children[0].children[0].innerHTML != this.v("Unmute") && (this.c.children[0].children[0].innerHTML = this.v("Unmute")) : this.c.children[0].children[0].innerHTML != this.v("Mute") && (this.c.children[0].children[0].innerHTML = this.v("Mute")), e = 0; 4 > e; e++) t.r(this.c, "vjs-vol-" + e);
                t.p(this.c, "vjs-vol-" + i)
            }, t.Fa = t.O.extend({
                l: function(e, i) {
                    t.O.call(this, e, i), this.b(e, "volumechange", this.ef), e.h && e.h.featuresVolumeControl === l && this.p("vjs-hidden"), this.b(e, "loadstart", function() {
                        e.h.featuresVolumeControl === l ? this.p("vjs-hidden") : this.r("vjs-hidden")
                    }), this.p("vjs-menu-button")
                }
            }), t.Fa.prototype.Ja = function() {
                var e = new t.pa(this.d, {
                        Cc: "div"
                    }),
                    i = new t.Fb(this.d, this.q.volumeBar);
                return i.b("focus", function() {
                    e.p("vjs-lock-showing")
                }), i.b("blur", function() {
                    G(e)
                }), e.ba(i), e
            }, t.Fa.prototype.u = function() {
                t.qa.prototype.u.call(this), t.O.prototype.u.call(this)
            }, t.Fa.prototype.e = function() {
                return t.w.prototype.e.call(this, "div", {
                    className: "vjs-volume-menu-button vjs-menu-button vjs-control",
                    innerHTML: '<div><span class="vjs-control-text">' + this.v("Mute") + "</span></div>"
                })
            }, t.Fa.prototype.ef = t.qa.prototype.update, t.oc = t.O.extend({
                l: function(e, i) {
                    t.O.call(this, e, i), this.sd(), this.rd(), this.b(e, "loadstart", this.sd), this.b(e, "ratechange", this.rd)
                }
            }), s = t.oc.prototype, s.sa = "Playback Rate", s.className = "vjs-playback-rate", s.e = function() {
                var e = t.O.prototype.e.call(this);
                return this.Sc = t.e("div", {
                    className: "vjs-playback-rate-value",
                    innerHTML: 1
                }), e.appendChild(this.Sc), e
            }, s.Ja = function() {
                var e = new t.pa(this.k()),
                    i = this.k().options().playbackRates;
                if (i)
                    for (var o = i.length - 1; o >= 0; o--) e.ba(new t.Bb(this.k(), {
                        rate: i[o] + "x"
                    }));
                return e
            }, s.Ca = function() {
                this.m().setAttribute("aria-valuenow", this.k().playbackRate())
            }, s.u = function() {
                for (var t = this.k().playbackRate(), e = this.k().options().playbackRates, i = e[0], o = 0; o < e.length; o++)
                    if (e[o] > t) {
                        i = e[o];
                        break
                    }
                this.k().playbackRate(i)
            }, s.sd = function() {
                na(this) ? this.r("vjs-hidden") : this.p("vjs-hidden")
            }, s.rd = function() {
                na(this) && (this.Sc.innerHTML = this.k().playbackRate() + "x")
            }, t.Bb = t.M.extend({
                Cc: "button",
                l: function(e, i) {
                    var o = this.label = i.rate,
                        n = this.$c = parseFloat(o, 10);
                    i.label = o, i.selected = 1 === n, t.M.call(this, e, i), this.b(e, "ratechange", this.update)
                }
            }), t.Bb.prototype.u = function() {
                t.M.prototype.u.call(this), this.k().playbackRate(this.$c)
            }, t.Bb.prototype.update = function() {
                this.selected(this.k().playbackRate() == this.$c)
            }, t.pc = t.w.extend({
                l: function(e, i) {
                    t.w.call(this, e, i), this.update(), e.b("posterchange", t.bind(this, this.update))
                }
            }), s = t.pc.prototype, s.dispose = function() {
                this.k().n("posterchange", this.update), t.w.prototype.dispose.call(this)
            }, s.e = function() {
                var e = t.e("div", {
                    className: "vjs-poster",
                    tabIndex: -1
                });
                return t.wd || (this.Ob = t.e("img"), e.appendChild(this.Ob)), e
            }, s.update = function() {
                var t = this.k().poster();
                this.la(t), t ? this.show() : this.X()
            }, s.la = function(t) {
                var e;
                this.Ob ? this.Ob.src = t : (e = "", t && (e = 'url("' + t + '")'), this.c.style.backgroundImage = e)
            }, s.u = function() {
                this.d.play()
            }, t.lc = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i)
                }
            }), t.lc.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-loading-spinner"
                })
            }, t.sb = t.w.extend(), t.sb.prototype.e = function() {
                return t.w.prototype.e.call(this, "div", {
                    className: "vjs-big-play-button",
                    innerHTML: '<span aria-hidden="true"></span>',
                    "aria-label": "play video"
                })
            }, t.sb.prototype.u = function() {
                this.d.play()
            }, t.xb = t.a.extend({
                l: function(e, i) {
                    t.a.call(this, e, i), this.update(), this.b(e, "error", this.update)
                }
            }), t.xb.prototype.e = function() {
                var e = t.a.prototype.e.call(this, "div", {
                    className: "vjs-error-display"
                });
                return this.B = t.e("div"), e.appendChild(this.B), e
            }, t.xb.prototype.update = function() {
                this.k().error() && (this.B.innerHTML = this.v(this.k().error().message))
            };
            var O;
            t.j = t.a.extend({
                l: function(e, i, o) {
                    i = i || {}, i.dd = l, t.a.call(this, e, i, o), this.featuresProgressEvents || this.re(), this.featuresTimeupdateEvents || this.se(), this.fe(), this.featuresNativeTextTracks || this.Vd(), this.he()
                }
            }), s = t.j.prototype, s.fe = function() {
                var t, e;
                t = this.k(), e = function() {
                    t.controls() && !t.usingNativeControls() && this.Id()
                }, this.I(e), this.b(t, "controlsenabled", e), this.b(t, "controlsdisabled", this.He), this.I(function() {
                    this.networkState && 0 < this.networkState() && this.k().o("loadstart")
                })
            }, s.Id = function() {
                var t;
                this.b("mousedown", this.u), this.b("touchstart", function() {
                    t = this.d.userActive()
                }), this.b("touchmove", function() {
                    t && this.k().reportUserActivity()
                }), this.b("touchend", function(t) {
                    t.preventDefault()
                }), da(this), this.b("tap", this.Be)
            }, s.He = function() {
                this.n("tap"), this.n("touchstart"), this.n("touchmove"), this.n("touchleave"), this.n("touchcancel"), this.n("touchend"), this.n("click"), this.n("mousedown")
            }, s.u = function(t) {
                0 === t.button && this.k().controls() && (this.k().paused() ? this.k().play() : this.k().pause())
            }, s.Be = function() {
                this.k().userActive(!this.k().userActive())
            }, s.re = function() {
                this.Uc = f, this.$e()
            }, s.qe = function() {
                this.Uc = l, this.ld()
            }, s.$e = function() {
                this.Ge = this.setInterval(function() {
                    var t = this.k().bufferedPercent();
                    this.Md != t && this.k().o("progress"), this.Md = t, 1 === t && this.ld()
                }, 500)
            }, s.ld = function() {
                this.clearInterval(this.Ge)
            }, s.se = function() {
                var t = this.d;
                this.Yb = f, this.b(t, "play", this.pd), this.b(t, "pause", this.rb), this.N("timeupdate", function() {
                    this.featuresTimeupdateEvents = f, this.Vc()
                })
            }, s.Vc = function() {
                var t = this.d;
                this.Yb = l, this.rb(), this.n(t, "play", this.pd), this.n(t, "pause", this.rb)
            }, s.pd = function() {
                this.Fc && this.rb(), this.Fc = this.setInterval(function() {
                    this.k().o("timeupdate")
                }, 250)
            }, s.rb = function() {
                this.clearInterval(this.Fc), this.k().o("timeupdate")
            }, s.dispose = function() {
                this.Uc && this.qe(), this.Yb && this.Vc(), t.a.prototype.dispose.call(this)
            }, s.bc = function() {
                this.Yb && this.k().o("timeupdate")
            }, s.he = function() {
                function e() {
                    var t = o.ea("textTrackDisplay");
                    t && t.C()
                }
                var i, o = this.d;
                (i = this.textTracks()) && (i.addEventListener("removetrack", e), i.addEventListener("addtrack", e), this.b("dispose", t.bind(this, function() {
                    i.removeEventListener("removetrack", e), i.removeEventListener("addtrack", e)
                })))
            }, s.Vd = function() {
                var e, i, o, n = this.d;
                window.WebVTT || (o = document.createElement("script"), o.src = n.options()["vtt.js"] || "../node_modules/vtt.js/dist/vtt.js", n.m().appendChild(o), window.WebVTT = f), (i = this.textTracks()) && (e = function() {
                    var e, i, o;
                    for (o = n.ea("textTrackDisplay"), o.C(), e = 0; e < this.length; e++) i = this[e], i.removeEventListener("cuechange", t.bind(o, o.C)), "showing" === i.mode && i.addEventListener("cuechange", t.bind(o, o.C))
                }, i.addEventListener("change", e), this.b("dispose", t.bind(this, function() {
                    i.removeEventListener("change", e)
                })))
            }, s.textTracks = function() {
                return this.d.od = this.d.od || new t.F, this.d.od
            }, s.Z = function() {
                return this.d.ad = this.d.ad || new t.F, this.d.ad
            }, O = function(e, i, o, n, s) {
                var r = e.textTracks();
                return s = s || {}, s.kind = i, o && (s.label = o), n && (s.language = n), s.player = e.d, e = new t.t(s), P(r, e), e
            }, t.j.prototype.addTextTrack = function(t, e, i) {
                if (!t) throw Error("TextTrack kind is required but was not provided");
                return O(this, t, e, i)
            }, t.j.prototype.ha = function(t) {
                return t = O(this, t.kind, t.label, t.language, t), P(this.Z(), t), {
                    U: t
                }
            }, t.j.prototype.Ba = function(t) {
                Q(this.textTracks(), t), Q(this.Z(), t)
            }, t.j.prototype.fd = m(), t.j.prototype.featuresVolumeControl = f, t.j.prototype.featuresFullscreenResize = l, t.j.prototype.featuresPlaybackRate = l, t.j.prototype.featuresProgressEvents = l, t.j.prototype.featuresTimeupdateEvents = l, t.j.prototype.featuresNativeTextTracks = l, t.j.gc = function(t) {
                t.Ra = function(e, i) {
                    var o = t.gd;
                    o || (o = t.gd = []), i === b && (i = o.length), o.splice(i, 0, e)
                }, t.pb = function(e) {
                    for (var i, o = t.gd || [], n = 0; n < o.length; n++)
                        if (i = o[n].eb(e)) return o[n];
                    return j
                }, t.zc = function(e) {
                    var i = t.pb(e);
                    return i ? i.eb(e) : ""
                }, t.prototype.Sa = function(e) {
                    var i = t.pb(e);
                    return this.Ka(), this.n("dispose", this.Ka), this.Ec = e, this.cc = i.Tb(e, this), this.b("dispose", this.Ka), this
                }, t.prototype.Ka = function() {
                    this.cc && this.cc.dispose && this.cc.dispose()
                }
            }, t.media = {}, t.f = t.j.extend({
                l: function(e, i, o) {
                    var n, s, r;
                    for ((i.nativeCaptions === l || i.nativeTextTracks === l) && (this.featuresNativeTextTracks = l), t.j.call(this, e, i, o), o = t.f.yb.length - 1; o >= 0; o--) this.b(t.f.yb[o], this.Wd);
                    if ((i = i.source) && (this.c.currentSrc !== i.src || e.L && 3 === e.L.ge) && this.Sa(i), this.c.hasChildNodes()) {
                        for (o = this.c.childNodes, n = o.length, i = []; n--;) s = o[n], r = s.nodeName.toLowerCase(), "track" === r && (this.featuresNativeTextTracks ? P(this.Z(), s.track) : i.push(s));
                        for (o = 0; o < i.length; o++) this.c.removeChild(i[o])
                    }
                    if (this.featuresNativeTextTracks && this.b("loadstart", t.bind(this, this.ee)), t.Eb && e.options().nativeControlsForTouch === f) {
                        var a, c, u, h;
                        a = this, c = this.k(), i = c.controls(), a.c.controls = !!i, u = function() {
                            a.c.controls = f
                        }, h = function() {
                            a.c.controls = l
                        }, c.b("controlsenabled", u), c.b("controlsdisabled", h), i = function() {
                            c.n("controlsenabled", u), c.n("controlsdisabled", h)
                        }, a.b("dispose", i), c.b("usingcustomcontrols", i), c.usingNativeControls(f)
                    }
                    e.I(function() {
                        this.L && this.q.autoplay && this.paused() && (delete this.L.poster, this.play())
                    }), this.Wa()
                }
            }), s = t.f.prototype, s.dispose = function() {
                t.f.Mb(this.c), t.j.prototype.dispose.call(this)
            }, s.e = function() {
                var e, i, o, n = this.d,
                    s = n.L;
                if (!s || this.movingMediaElementInDOM === l) {
                    if (s ? (o = s.cloneNode(l), t.f.Mb(s), s = o, n.L = j) : (s = t.e("video"), o = videojs.$.ya({}, n.Xe), (!t.Eb || n.options().nativeControlsForTouch !== f) && delete o.controls, t.ed(s, t.i.D(o, {
                            id: n.id() + "_html5_api",
                            "class": "vjs-tech"
                        }))), s.player = n, n.q.qd)
                        for (o = 0; o < n.q.qd.length; o++) e = n.q.qd[o], i = document.createElement("track"), i.Wb = e.Wb, i.label = e.label, i.hd = e.hd, i.src = e.src, "default" in e && i.setAttribute("default", "default"), s.appendChild(i);
                    t.Ub(s, n.m())
                }
                for (e = ["autoplay", "preload", "loop", "muted"], o = e.length - 1; o >= 0; o--) {
                    i = e[o];
                    var r = {};
                    "undefined" != typeof n.q[i] && (r[i] = n.q[i]), t.ed(s, r)
                }
                return s
            }, s.ee = function() {
                for (var t, e = this.c.textTracks, i = e.length, o = {
                        captions: 1,
                        subtitles: 1
                    }; i--;)(t = e[i]) && t.kind in o && (t.mode = "disabled")
            }, s.Wd = function(t) {
                "error" == t.type && this.error() ? this.k().error(this.error().code) : (t.bubbles = l, this.k().o(t))
            }, s.play = function() {
                this.c.play()
            }, s.pause = function() {
                this.c.pause()
            }, s.paused = function() {
                return this.c.paused
            }, s.currentTime = function() {
                return this.c.currentTime
            }, s.bc = function(e) {
                try {
                    this.c.currentTime = e
                } catch (i) {
                    t.log(i, "Video is not ready. (Video.js)")
                }
            }, s.duration = function() {
                return this.c.duration || 0
            }, s.buffered = function() {
                return this.c.buffered
            }, s.volume = function() {
                return this.c.volume
            }, s.Se = function(t) {
                this.c.volume = t
            }, s.muted = function() {
                return this.c.muted
            }, s.Oe = function(t) {
                this.c.muted = t
            }, s.width = function() {
                return this.c.offsetWidth
            }, s.height = function() {
                return this.c.offsetHeight
            }, s.Ta = function() {
                return "function" != typeof this.c.webkitEnterFullScreen || !/Android/.test(t.P) && /Chrome|Mac OS X 10.5/.test(t.P) ? l : f
            }, s.Ic = function() {
                var t = this.c;
                "webkitDisplayingFullscreen" in t && this.N("webkitbeginfullscreen", function() {
                    this.d.isFullscreen(f), this.N("webkitendfullscreen", function() {
                        this.d.isFullscreen(l), this.d.o("fullscreenchange")
                    }), this.d.o("fullscreenchange")
                }), t.paused && t.networkState <= t.jf ? (this.c.play(), this.setTimeout(function() {
                    t.pause(), t.webkitEnterFullScreen()
                }, 0)) : t.webkitEnterFullScreen()
            }, s.Xd = function() {
                this.c.webkitExitFullScreen()
            }, s.src = function(t) {
                return t === b ? this.c.src : void this.la(t)
            }, s.la = function(t) {
                this.c.src = t
            }, s.load = function() {
                this.c.load()
            }, s.currentSrc = function() {
                return this.c.currentSrc
            }, s.poster = function() {
                return this.c.poster
            }, s.fd = function(t) {
                this.c.poster = t
            }, s.Qa = function() {
                return this.c.Qa
            }, s.Qe = function(t) {
                this.c.Qa = t
            }, s.autoplay = function() {
                return this.c.autoplay
            }, s.Le = function(t) {
                this.c.autoplay = t
            }, s.controls = function() {
                return this.c.controls
            }, s.loop = function() {
                return this.c.loop
            }, s.Ne = function(t) {
                this.c.loop = t
            }, s.error = function() {
                return this.c.error
            }, s.seeking = function() {
                return this.c.seeking
            }, s.ended = function() {
                return this.c.ended
            }, s.playbackRate = function() {
                return this.c.playbackRate
            }, s.Pe = function(t) {
                this.c.playbackRate = t
            }, s.networkState = function() {
                return this.c.networkState
            }, s.readyState = function() {
                return this.c.readyState
            }, s.textTracks = function() {
                return this.featuresNativeTextTracks ? this.c.textTracks : t.j.prototype.textTracks.call(this)
            }, s.addTextTrack = function(e, i, o) {
                return this.featuresNativeTextTracks ? this.c.addTextTrack(e, i, o) : t.j.prototype.addTextTrack.call(this, e, i, o)
            }, s.ha = function(e) {
                if (!this.featuresNativeTextTracks) return t.j.prototype.ha.call(this, e);
                var i = document.createElement("track");
                return e = e || {}, e.kind && (i.kind = e.kind), e.label && (i.label = e.label), (e.language || e.srclang) && (i.srclang = e.language || e.srclang), e["default"] && (i["default"] = e["default"]), e.id && (i.id = e.id), e.src && (i.src = e.src), this.m().appendChild(i), i.track.mode = "metadata" === i.U.kind ? "hidden" : "disabled", i.onload = function() {
                    var t = i.track;
                    2 <= i.readyState && ("metadata" === t.kind && "hidden" !== t.mode ? t.mode = "hidden" : "metadata" !== t.kind && "disabled" !== t.mode && (t.mode = "disabled"), i.onload = j)
                }, P(this.Z(), i.U), i
            }, s.Ba = function(e) {
                if (!this.featuresNativeTextTracks) return t.j.prototype.Ba.call(this, e);
                var i, o;
                for (Q(this.Z(), e), i = this.m().querySelectorAll("track"), o = 0; o < i.length; o++)
                    if (i[o] === e || i[o].track === e) {
                        i[o].parentNode.removeChild(i[o]);
                        break
                    }
            }, t.f.isSupported = function() {
                try {
                    t.A.volume = .5
                } catch (e) {
                    return l
                }
                return !!t.A.canPlayType
            }, t.j.gc(t.f), t.f.Y = {}, t.f.Y.eb = function(e) {
                function i(e) {
                    try {
                        return t.A.canPlayType(e)
                    } catch (i) {
                        return ""
                    }
                }
                return e.type ? i(e.type) : e.src ? (e = (e = e.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i)) && e[1], i("video/" + e)) : ""
            }, t.f.Y.Tb = function(t, e) {
                e.la(t.src)
            }, t.f.Y.dispose = m(), t.f.Ra(t.f.Y), t.f.Od = function() {
                var e = t.A.volume;
                return t.A.volume = e / 2 + .1, e !== t.A.volume
            }, t.f.Nd = function() {
                var e = t.A.playbackRate;
                return t.A.playbackRate = e / 2 + .1, e !== t.A.playbackRate
            }, t.f.Ve = function() {
                var e;
                return (e = !!t.A.textTracks) && 0 < t.A.textTracks.length && (e = "number" != typeof t.A.textTracks[0].mode), e && t.jc && (e = l), e
            }, t.f.prototype.featuresVolumeControl = t.f.Od(), t.f.prototype.featuresPlaybackRate = t.f.Nd(), t.f.prototype.movingMediaElementInDOM = !t.Ad, t.f.prototype.featuresFullscreenResize = f, t.f.prototype.featuresProgressEvents = f, t.f.prototype.featuresNativeTextTracks = t.f.Ve();
            var S, oa = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
                pa = /^video\/mp4/i;
            t.f.Xc = function() {
                4 <= t.hc && (S || (S = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function(t) {
                    return t && oa.test(t) ? "maybe" : S.call(this, t)
                }), t.Ed && (S || (S = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function(t) {
                    return t && pa.test(t) ? "maybe" : S.call(this, t)
                })
            }, t.f.bf = function() {
                var e = t.A.constructor.prototype.canPlayType;
                return t.A.constructor.prototype.canPlayType = S, S = j, e
            }, t.f.Xc(), t.f.yb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" "), t.f.Mb = function(t) {
                if (t) {
                    for (t.player = j, t.parentNode && t.parentNode.removeChild(t); t.hasChildNodes();) t.removeChild(t.firstChild);
                    if (t.removeAttribute("src"), "function" == typeof t.load) try {
                        t.load()
                    } catch (e) {}
                }
            }, t.g = t.j.extend({
                l: function(e, i, o) {
                    t.j.call(this, e, i, o);
                    var n = i.source;
                    o = i.parentEl;
                    var s = this.c = t.e("div", {
                            id: e.id() + "_temp_flash"
                        }),
                        r = e.id() + "_flash_api",
                        a = e.q,
                        a = t.i.D({
                            readyFunction: "videojs.Flash.onReady",
                            eventProxyFunction: "videojs.Flash.onEvent",
                            errorEventProxyFunction: "videojs.Flash.onError",
                            autoplay: a.autoplay,
                            preload: a.Qa,
                            loop: a.loop,
                            muted: a.muted
                        }, i.flashVars),
                        c = t.i.D({
                            wmode: "opaque",
                            bgcolor: "#fff"
                        }, i.params),
                        r = t.i.D({
                            id: r,
                            name: r,
                            "class": "vjs-tech"
                        }, i.attributes);
                    n && this.I(function() {
                        this.Sa(n)
                    }), t.Ub(s, o), i.startTime && this.I(function() {
                        this.load(), this.play(), this.currentTime(i.startTime)
                    }), t.jc && this.I(function() {
                        this.b("mousemove", function() {
                            this.k().o({
                                type: "mousemove",
                                bubbles: l
                            })
                        })
                    }), e.b("stageclick", e.reportUserActivity), this.c = t.g.Hc(i.swf, s, a, c, r)
                }
            }), s = t.g.prototype, s.dispose = function() {
                t.j.prototype.dispose.call(this)
            }, s.play = function() {
                this.c.vjs_play()
            }, s.pause = function() {
                this.c.vjs_pause()
            }, s.src = function(t) {
                return t === b ? this.currentSrc() : this.la(t)
            }, s.la = function(e) {
                if (e = t.$d(e), this.c.vjs_src(e), this.d.autoplay()) {
                    var i = this;
                    this.setTimeout(function() {
                        i.play()
                    }, 0)
                }
            }, t.g.prototype.setCurrentTime = function(e) {
                this.oe = e, this.c.vjs_setProperty("currentTime", e), t.j.prototype.bc.call(this)
            }, t.g.prototype.currentTime = function() {
                return this.seeking() ? this.oe || 0 : this.c.vjs_getProperty("currentTime")
            }, t.g.prototype.currentSrc = function() {
                return this.Ec ? this.Ec.src : this.c.vjs_getProperty("currentSrc")
            }, t.g.prototype.load = function() {
                this.c.vjs_load()
            }, t.g.prototype.poster = function() {
                this.c.vjs_getProperty("poster")
            }, t.g.prototype.setPoster = m(), t.g.prototype.buffered = function() {
                return t.Lb(0, this.c.vjs_getProperty("buffered"))
            }, t.g.prototype.Ta = q(l), t.g.prototype.Ic = q(l);
            var ra = t.g.prototype,
                T = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
                ta = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight".split(" "),
                U;
            for (U = 0; U < T.length; U++) sa(T[U]), qa();
            for (U = 0; U < ta.length; U++) sa(ta[U]);
            t.g.isSupported = function() {
                return 10 <= t.g.version()[0]
            }, t.j.gc(t.g), t.g.Y = {}, t.g.Y.eb = function(e) {
                return e.type && e.type.replace(/;.*/, "").toLowerCase() in t.g.Zd ? "maybe" : ""
            }, t.g.Y.Tb = function(t, e) {
                e.la(t.src)
            }, t.g.Y.dispose = m(), t.g.Ra(t.g.Y), t.g.Zd = {
                "video/flv": "FLV",
                "video/x-flv": "FLV",
                "video/mp4": "MP4",
                "video/m4v": "MP4"
            }, t.g.onReady = function(e) {
                var i;
                (i = (e = t.m(e)) && e.parentNode && e.parentNode.player) && (e.player = i, t.g.checkReady(i.h))
            }, t.g.checkReady = function(e) {
                e.m() && (e.m().vjs_getProperty ? e.Wa() : this.setTimeout(function() {
                    t.g.checkReady(e)
                }, 50))
            }, t.g.onEvent = function(e, i) {
                t.m(e).player.o(i)
            }, t.g.onError = function(e, i) {
                var o = t.m(e).player,
                    n = "FLASH: " + i;
                o.error("srcnotfound" == i ? {
                    code: 4,
                    message: n
                } : n)
            }, t.g.version = function() {
                var t = "0,0,0";
                try {
                    t = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
                } catch (e) {
                    try {
                        navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                    } catch (i) {}
                }
                return t.split(",")
            }, t.g.Hc = function(e, i, o, n, s) {
                e = t.g.ce(e, o, n, s), e = t.e("div", {
                    innerHTML: e
                }).childNodes[0], o = i.parentNode, i.parentNode.replaceChild(e, i);
                var r = o.childNodes[0];
                return setTimeout(function() {
                    r.style.display = "block"
                }, 1e3), e
            }, t.g.ce = function(e, i, o, n) {
                var s = "",
                    r = "",
                    a = "";
                return i && t.i.da(i, function(t, e) {
                    s += t + "=" + e + "&amp;"
                }), o = t.i.D({
                    movie: e,
                    flashvars: s,
                    allowScriptAccess: "always",
                    allowNetworking: "all"
                }, o), t.i.da(o, function(t, e) {
                    r += '<param name="' + t + '" value="' + e + '" />'
                }), n = t.i.D({
                    data: e,
                    width: "100%",
                    height: "100%"
                }, n), t.i.da(n, function(t, e) {
                    a += t + '="' + e + '" '
                }), '<object type="application/x-shockwave-flash" ' + a + ">" + r + "</object>"
            }, t.g.Ue = {
                "rtmp/mp4": "MP4",
                "rtmp/flv": "FLV"
            }, t.g.Hf = function(t, e) {
                return t + "&" + e
            }, t.g.Te = function(t) {
                var e = {
                    Bc: "",
                    md: ""
                };
                if (!t) return e;
                var i, o = t.indexOf("&");
                return -1 !== o ? i = o + 1 : (o = i = t.lastIndexOf("/") + 1, 0 === o && (o = i = t.length)), e.Bc = t.substring(0, o), e.md = t.substring(i, t.length), e
            }, t.g.me = function(e) {
                return e in t.g.Ue
            }, t.g.Gd = /^rtmp[set]?:\/\//i, t.g.le = function(e) {
                return t.g.Gd.test(e)
            }, t.g.ac = {}, t.g.ac.eb = function(e) {
                return t.g.me(e.type) || t.g.le(e.src) ? "maybe" : ""
            }, t.g.ac.Tb = function(e, i) {
                var o = t.g.Te(e.src);
                i.setRtmpConnection(o.Bc), i.setRtmpStream(o.md)
            }, t.g.Ra(t.g.ac), t.Fd = t.a.extend({
                l: function(e, i, o) {
                    if (t.a.call(this, e, i, o), e.q.sources && 0 !== e.q.sources.length) e.src(e.q.sources);
                    else
                        for (i = 0, o = e.q.techOrder; i < o.length; i++) {
                            var n = t.ua(o[i]),
                                s = window.videojs[n];
                            if (s && s.isSupported()) {
                                ka(e, n);
                                break
                            }
                        }
                }
            }), t.rc = {
                disabled: "disabled",
                hidden: "hidden",
                showing: "showing"
            }, t.Hd = {
                subtitles: "subtitles",
                captions: "captions",
                descriptions: "descriptions",
                chapters: "chapters",
                metadata: "metadata"
            }, t.t = function(e) {
                var i, o, n, s, r, a, c, u, h, p, d;
                if (e = e || {}, !e.player) throw Error("A player was not provided.");
                if (i = this, t.oa)
                    for (d in i = document.createElement("custom"), t.t.prototype) i[d] = t.t.prototype[d];
                return i.d = e.player, n = t.rc[e.mode] || "disabled", s = t.Hd[e.kind] || "subtitles", r = e.label || "", a = e.language || e.srclang || "", o = e.id || "vjs_text_track_" + t.s++, ("metadata" === s || "chapters" === s) && (n = "hidden"), i.W = [], i.Ga = [], c = new t.V(i.W), u = new t.V(i.Ga), p = l, h = t.bind(i, function() {
                    this.activeCues, p && (this.trigger("cuechange"), p = l)
                }), "disabled" !== n && i.d.b("timeupdate", h), Object.defineProperty(i, "kind", {
                    get: function() {
                        return s
                    },
                    set: Function.prototype
                }), Object.defineProperty(i, "label", {
                    get: function() {
                        return r
                    },
                    set: Function.prototype
                }), Object.defineProperty(i, "language", {
                    get: function() {
                        return a
                    },
                    set: Function.prototype
                }), Object.defineProperty(i, "id", {
                    get: function() {
                        return o
                    },
                    set: Function.prototype
                }), Object.defineProperty(i, "mode", {
                    get: function() {
                        return n
                    },
                    set: function(e) {
                        t.rc[e] && (n = e, "showing" === n && this.d.b("timeupdate", h), this.o("modechange"))
                    }
                }), Object.defineProperty(i, "cues", {
                    get: function() {
                        return this.Xb ? c : j
                    },
                    set: Function.prototype
                }), Object.defineProperty(i, "activeCues", {
                    get: function() {
                        var t, e, i, o, n;
                        if (!this.Xb) return j;
                        if (0 === this.cues.length) return u;
                        for (o = this.d.currentTime(), t = 0, e = this.cues.length, i = []; e > t; t++) n = this.cues[t], n.startTime <= o && n.endTime >= o ? i.push(n) : n.startTime === n.endTime && n.startTime <= o && n.startTime + .5 >= o && i.push(n);
                        if (p = l, i.length !== this.Ga.length) p = f;
                        else
                            for (t = 0; t < i.length; t++) - 1 === ua.call(this.Ga, i[t]) && (p = f);
                        return this.Ga = i, u.qb(this.Ga), u
                    },
                    set: Function.prototype
                }), e.src ? va(e.src, i) : i.Xb = f, t.oa ? i : void 0
            }, t.t.prototype = t.i.create(t.z.prototype), t.t.prototype.constructor = t.t, t.t.prototype.bb = {
                cuechange: "cuechange"
            }, t.t.prototype.vc = function(t) {
                var e = this.d.textTracks(),
                    i = 0;
                if (e)
                    for (; i < e.length; i++) e[i] !== this && e[i].bd(t);
                this.W.push(t), this.cues.qb(this.W)
            }, t.t.prototype.bd = function(t) {
                for (var e, i = 0, o = this.W.length, n = l; o > i; i++) e = this.W[i], e === t && (this.W.splice(i, 1), n = f);
                n && this.Dc.qb(this.W)
            };
            var va, V, ua;
            va = function(e, i) {
                t.ff(e, t.bind(this, function(e, o, n) {
                    return e ? t.log.error(e) : (i.Xb = f, void V(n, i))
                }))
            }, V = function(e, i) {
                if ("function" != typeof window.WebVTT) window.setTimeout(function() {
                    V(e, i)
                }, 25);
                else {
                    var o = new window.WebVTT.Parser(window, window.vttjs, window.WebVTT.StringDecoder());
                    o.oncue = function(t) {
                        i.vc(t)
                    }, o.onparsingerror = function(e) {
                        t.log.error(e)
                    }, o.parse(e), o.flush()
                }
            }, ua = function(t, e) {
                var i;
                if (this == j) throw new TypeError('"this" is null or not defined');
                var o = Object(this),
                    n = o.length >>> 0;
                if (0 === n) return -1;
                if (i = +e || 0, 1 / 0 === Math.abs(i) && (i = 0), i >= n) return -1;
                for (i = Math.max(i >= 0 ? i : n - Math.abs(i), 0); n > i;) {
                    if (i in o && o[i] === t) return i;
                    i++
                }
                return -1
            }, t.F = function(e) {
                var i, o = this,
                    n = 0;
                if (t.oa)
                    for (i in o = document.createElement("custom"), t.F.prototype) o[i] = t.F.prototype[i];
                for (e = e || [], o.Va = [], Object.defineProperty(o, "length", {
                        get: function() {
                            return this.Va.length
                        }
                    }); n < e.length; n++) P(o, e[n]);
                return t.oa ? o : void 0
            }, t.F.prototype = t.i.create(t.z.prototype), t.F.prototype.constructor = t.F, t.F.prototype.bb = {
                change: "change",
                addtrack: "addtrack",
                removetrack: "removetrack"
            };
            for (var wa in t.F.prototype.bb) t.F.prototype["on" + wa] = j;
            t.F.prototype.de = function(t) {
                for (var e, i = 0, o = this.length, n = j; o > i; i++)
                    if (e = this[i], e.id === t) {
                        n = e;
                        break
                    }
                return n
            }, t.V = function(e) {
                var i, o = this;
                if (t.oa)
                    for (i in o = document.createElement("custom"), t.V.prototype) o[i] = t.V.prototype[i];
                return t.V.prototype.qb.call(o, e), Object.defineProperty(o, "length", {
                    get: n("pe")
                }), t.oa ? o : void 0
            }, t.V.prototype.qb = function(t) {
                var e = this.length || 0,
                    i = 0,
                    o = t.length;
                if (this.W = t, this.pe = t.length, t = function(t) {
                        "" + t in this || Object.defineProperty(this, "" + t, {
                            get: function() {
                                return this.W[t]
                            }
                        })
                    }, o > e)
                    for (i = e; o > i; i++) t.call(this, i)
            }, t.V.prototype.be = function(t) {
                for (var e, i = 0, o = this.length, n = j; o > i; i++)
                    if (e = this[i], e.id === t) {
                        n = e;
                        break
                    }
                return n
            }, t.ra = t.a.extend({
                l: function(e, i, o) {
                    t.a.call(this, e, i, o), e.b("loadstart", t.bind(this, this.Ze)), e.I(t.bind(this, function() {
                        if (e.h && e.h.featuresNativeTextTracks) this.X();
                        else {
                            var i, o, n;
                            for (e.b("fullscreenchange", t.bind(this, this.C)), o = e.q.tracks || [], i = 0; i < o.length; i++) n = o[i], this.d.ha(n)
                        }
                    }))
                }
            }), t.ra.prototype.Ze = function() {
                this.d.h && this.d.h.featuresNativeTextTracks ? this.X() : this.show()
            }, t.ra.prototype.e = function() {
                return t.a.prototype.e.call(this, "div", {
                    className: "vjs-text-track-display"
                })
            }, t.ra.prototype.Pd = function() {
                "function" == typeof window.WebVTT && window.WebVTT.processCues(window, [], this.c)
            };
            var xa = {
                xf: "monospace",
                Df: "sans-serif",
                Ff: "serif",
                yf: '"Andale Mono", "Lucida Console", monospace',
                zf: '"Courier New", monospace',
                Bf: "sans-serif",
                Cf: "serif",
                of: '"Comic Sans MS", Impact, fantasy',
                Ef: '"Monotype Corsiva", cursive',
                Gf: '"Andale Mono", "Lucida Console", monospace, sans-serif'
            };
            if (t.ra.prototype.C = function() {
                    var t, e = this.d.textTracks(),
                        i = 0;
                    if (this.Pd(), e)
                        for (; i < e.length; i++) t = e[i], "showing" === t.mode && this.cf(t)
                }, t.ra.prototype.cf = function(t) {
                    if ("function" == typeof window.WebVTT && t.activeCues) {
                        for (var e, i = 0, o = this.d.textTrackSettings.Lc(), n = []; i < t.activeCues.length; i++) n.push(t.activeCues[i]);
                        for (window.WebVTT.processCues(window, t.activeCues, this.c), i = n.length; i--;) {
                            if (t = n[i].pf, o.color && (t.firstChild.style.color = o.color), o.nd) try {
                                t.firstChild.style.color = W(o.color || "#fff", o.nd)
                            } catch (s) {}
                            if (o.backgroundColor && (t.firstChild.style.backgroundColor = o.backgroundColor), o.yc) try {
                                t.firstChild.style.backgroundColor = W(o.backgroundColor || "#000", o.yc)
                            } catch (r) {}
                            if (o.fc)
                                if (o.ud) try {
                                    t.style.backgroundColor = W(o.fc, o.ud)
                                } catch (a) {} else t.style.backgroundColor = o.fc;
                            o.La && ("dropshadow" === o.La ? t.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222" : "raised" === o.La ? t.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px #222" : "depressed" === o.La ? t.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222" : "uniform" === o.La && (t.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")), o.Qb && 1 !== o.Qb && (e = window.Af(t.style.fontSize), t.style.fontSize = e * o.Qb + "px", t.style.height = "auto", t.style.top = "auto", t.style.bottom = "2px"), o.fontFamily && "default" !== o.fontFamily && ("small-caps" === o.fontFamily ? t.firstChild.style.fontVariant = "small-caps" : t.firstChild.style.fontFamily = xa[o.fontFamily])
                        }
                    }
                }, t.aa = t.M.extend({
                    l: function(e, i) {
                        var o, n, s = this.U = i.track,
                            r = e.textTracks();
                        r && (o = t.bind(this, function() {
                            var e, i, o, n = "showing" === this.U.mode;
                            if (this instanceof t.Ab)
                                for (n = f, i = 0, o = r.length; o > i; i++)
                                    if (e = r[i], e.kind === this.U.kind && "showing" === e.mode) {
                                        n = l;
                                        break
                                    }
                            this.selected(n)
                        }), r.addEventListener("change", o), e.b("dispose", function() {
                            r.removeEventListener("change", o)
                        })), i.label = s.label || s.language || "Unknown", i.selected = s["default"] || "showing" === s.mode, t.M.call(this, e, i), r && r.onchange === b && this.b(["tap", "click"], function() {
                            if ("object" != typeof window.yd) try {
                                n = new window.yd("change")
                            } catch (t) {}
                            n || (n = document.createEvent("Event"), n.initEvent("change", f, f)), r.dispatchEvent(n)
                        })
                    }
                }), t.aa.prototype.u = function() {
                    var e, i = this.U.kind,
                        o = this.d.textTracks(),
                        n = 0;
                    if (t.M.prototype.u.call(this), o)
                        for (; n < o.length; n++) e = o[n], e.kind === i && (e.mode = e === this.U ? "showing" : "disabled")
                }, t.Ab = t.aa.extend({
                    l: function(e, i) {
                        i.track = {
                            kind: i.kind,
                            player: e,
                            label: i.kind + " off",
                            "default": l,
                            mode: "disabled"
                        }, t.aa.call(this, e, i), this.selected(f)
                    }
                }), t.tb = t.aa.extend({
                    l: function(e, i) {
                        i.track = {
                            kind: i.kind,
                            player: e,
                            label: i.kind + " settings",
                            "default": l,
                            mode: "disabled"
                        }, t.aa.call(this, e, i), this.p("vjs-texttrack-settings")
                    }
                }), t.tb.prototype.u = function() {
                    this.k().ea("textTrackSettings").show()
                }, t.Q = t.O.extend({
                    l: function(e, i) {
                        var o, n;
                        t.O.call(this, e, i), o = this.d.textTracks(), 1 >= this.H.length && this.X(), o && (n = t.bind(this, this.update), o.addEventListener("removetrack", n), o.addEventListener("addtrack", n), this.d.b("dispose", function() {
                            o.removeEventListener("removetrack", n), o.removeEventListener("addtrack", n)
                        }))
                    }
                }), t.Q.prototype.Ia = function() {
                    var e, i, o = [];
                    if (this instanceof t.na && (!this.k().h || !this.k().h.featuresNativeTextTracks) && o.push(new t.tb(this.d, {
                            kind: this.fa
                        })), o.push(new t.Ab(this.d, {
                            kind: this.fa
                        })), i = this.d.textTracks(), !i) return o;
                    for (var n = 0; n < i.length; n++) e = i[n], e.kind === this.fa && o.push(new t.aa(this.d, {
                        track: e
                    }));
                    return o
                }, t.na = t.Q.extend({
                    l: function(e, i, o) {
                        t.Q.call(this, e, i, o), this.c.setAttribute("aria-label", "Captions Menu")
                    }
                }), t.na.prototype.fa = "captions", t.na.prototype.sa = "Captions", t.na.prototype.className = "vjs-captions-button", t.na.prototype.update = function() {
                    var e = 2;
                    t.Q.prototype.update.call(this), this.k().h && this.k().h.featuresNativeTextTracks && (e = 1), this.H && this.H.length > e ? this.show() : this.X()
                }, t.ab = t.Q.extend({
                    l: function(e, i, o) {
                        t.Q.call(this, e, i, o), this.c.setAttribute("aria-label", "Subtitles Menu")
                    }
                }), t.ab.prototype.fa = "subtitles", t.ab.prototype.sa = "Subtitles", t.ab.prototype.className = "vjs-subtitles-button", t.Xa = t.Q.extend({
                    l: function(e, i, o) {
                        t.Q.call(this, e, i, o), this.c.setAttribute("aria-label", "Chapters Menu")
                    }
                }), s = t.Xa.prototype, s.fa = "chapters", s.sa = "Chapters", s.className = "vjs-chapters-button", s.Ia = function() {
                    var e, i, o = [];
                    if (i = this.d.textTracks(), !i) return o;
                    for (var n = 0; n < i.length; n++) e = i[n], e.kind === this.fa && o.push(new t.aa(this.d, {
                        track: e
                    }));
                    return o
                }, s.Ja = function() {
                    for (var e, i, o = this.d.textTracks() || [], n = 0, s = o.length, r = this.H = []; s > n; n++)
                        if (e = o[n], e.kind == this.fa) {
                            if (e.Dc) {
                                i = e;
                                break
                            }
                            e.mode = "hidden", window.setTimeout(t.bind(this, function() {
                                this.Ja()
                            }), 100)
                        }
                    if (o = this.xa, o === b && (o = new t.pa(this.d), o.va().appendChild(t.e("li", {
                            className: "vjs-menu-title",
                            innerHTML: t.ua(this.fa),
                            We: -1
                        }))), i) {
                        e = i.cues;
                        for (var a, n = 0, s = e.length; s > n; n++) a = e[n], a = new t.Ya(this.d, {
                            track: i,
                            cue: a
                        }), r.push(a), o.ba(a);
                        this.ba(o)
                    }
                    return 0 < this.H.length && this.show(), o
                }, t.Ya = t.M.extend({
                    l: function(e, i) {
                        var o = this.U = i.track,
                            n = this.cue = i.cue,
                            s = e.currentTime();
                        i.label = n.text, i.selected = n.startTime <= s && s < n.endTime, t.M.call(this, e, i), o.addEventListener("cuechange", t.bind(this, this.update))
                    }
                }), t.Ya.prototype.u = function() {
                    t.M.prototype.u.call(this), this.d.currentTime(this.cue.startTime), this.update(this.cue.startTime)
                }, t.Ya.prototype.update = function() {
                    var t = this.cue,
                        e = this.d.currentTime();
                    this.selected(t.startTime <= e && e < t.endTime)
                }, t.sc = t.a.extend({
                    l: function(e, i) {
                        t.a.call(this, e, i), this.X(), t.b(this.m().querySelector(".vjs-done-button"), "click", t.bind(this, function() {
                            this.Je(), this.X()
                        })), t.b(this.m().querySelector(".vjs-default-button"), "click", t.bind(this, function() {
                            this.m().querySelector(".vjs-fg-color > select").selectedIndex = 0, this.m().querySelector(".vjs-bg-color > select").selectedIndex = 0, this.m().querySelector(".window-color > select").selectedIndex = 0, this.m().querySelector(".vjs-text-opacity > select").selectedIndex = 0, this.m().querySelector(".vjs-bg-opacity > select").selectedIndex = 0, this.m().querySelector(".vjs-window-opacity > select").selectedIndex = 0, this.m().querySelector(".vjs-edge-style select").selectedIndex = 0, this.m().querySelector(".vjs-font-family select").selectedIndex = 0, this.m().querySelector(".vjs-font-percent select").selectedIndex = 2, this.C()
                        })), t.b(this.m().querySelector(".vjs-fg-color > select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".vjs-bg-color > select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".window-color > select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".vjs-text-opacity > select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".vjs-bg-opacity > select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".vjs-window-opacity > select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".vjs-font-percent select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".vjs-edge-style select"), "change", t.bind(this, this.C)), t.b(this.m().querySelector(".vjs-font-family select"), "change", t.bind(this, this.C)), e.options().persistTextTrackSettings && this.Ie()
                    }
                }), s = t.sc.prototype, s.e = function() {
                    return t.a.prototype.e.call(this, "div", {
                        className: "vjs-caption-settings vjs-modal-overlay",
                        innerHTML: '<div class="vjs-tracksettings"><div class="vjs-tracksettings-colors"><div class="vjs-fg-color vjs-tracksetting"><label class="vjs-label">Foreground</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-text-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Opaque</option></select></span></div><div class="vjs-bg-color vjs-tracksetting"><label class="vjs-label">Background</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-bg-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div><div class="window-color vjs-tracksetting"><label class="vjs-label">Window</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-window-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div></div><div class="vjs-tracksettings-font"><div class="vjs-font-percent vjs-tracksetting"><label class="vjs-label">Font Size</label><select><option value="0.50">50%</option><option value="0.75">75%</option><option value="1.00" selected>100%</option><option value="1.25">125%</option><option value="1.50">150%</option><option value="1.75">175%</option><option value="2.00">200%</option><option value="3.00">300%</option><option value="4.00">400%</option></select></div><div class="vjs-edge-style vjs-tracksetting"><label class="vjs-label">Text Edge Style</label><select><option value="none">None</option><option value="raised">Raised</option><option value="depressed">Depressed</option><option value="uniform">Uniform</option><option value="dropshadow">Dropshadow</option></select></div><div class="vjs-font-family vjs-tracksetting"><label class="vjs-label">Font Family</label><select><option value="">Default</option><option value="monospaceSerif">Monospace Serif</option><option value="proportionalSerif">Proportional Serif</option><option value="monospaceSansSerif">Monospace Sans-Serif</option><option value="proportionalSansSerif">Proportional Sans-Serif</option><option value="casual">Casual</option><option value="script">Script</option><option value="small-caps">Small Caps</option></select></div></div></div><div class="vjs-tracksettings-controls"><button class="vjs-default-button">Defaults</button><button class="vjs-done-button">Done</button></div>'
                    })
                }, s.Lc = function() {
                    var t, e, i, o, n, s, r, a, c, l;
                    t = this.m(), n = X(t.querySelector(".vjs-edge-style select")), s = X(t.querySelector(".vjs-font-family select")), r = X(t.querySelector(".vjs-fg-color > select")), i = X(t.querySelector(".vjs-text-opacity > select")), a = X(t.querySelector(".vjs-bg-color > select")), e = X(t.querySelector(".vjs-bg-opacity > select")), c = X(t.querySelector(".window-color > select")), o = X(t.querySelector(".vjs-window-opacity > select")), t = window.parseFloat(X(t.querySelector(".vjs-font-percent > select"))), e = {
                        backgroundOpacity: e,
                        textOpacity: i,
                        windowOpacity: o,
                        edgeStyle: n,
                        fontFamily: s,
                        color: r,
                        backgroundColor: a,
                        windowColor: c,
                        fontPercent: t
                    };
                    for (l in e)("" === e[l] || "none" === e[l] || "fontPercent" === l && 1 === e[l]) && delete e[l];
                    return e
                }, s.Re = function(t) {
                    var e = this.m();
                    Y(e.querySelector(".vjs-edge-style select"), t.La), Y(e.querySelector(".vjs-font-family select"), t.fontFamily), Y(e.querySelector(".vjs-fg-color > select"), t.color), Y(e.querySelector(".vjs-text-opacity > select"), t.nd), Y(e.querySelector(".vjs-bg-color > select"), t.backgroundColor), Y(e.querySelector(".vjs-bg-opacity > select"), t.yc), Y(e.querySelector(".window-color > select"), t.fc), Y(e.querySelector(".vjs-window-opacity > select"), t.ud), (t = t.Qb) && (t = t.toFixed(2)), Y(e.querySelector(".vjs-font-percent > select"), t)
                }, s.Ie = function() {
                    var t;
                    try {
                        t = JSON.parse(window.localStorage.getItem("vjs-text-track-settings"))
                    } catch (e) {}
                    t && this.Re(t)
                }, s.Je = function() {
                    var e;
                    if (this.d.options().persistTextTrackSettings) {
                        e = this.Lc();
                        try {
                            t.ib(e) ? window.localStorage.removeItem("vjs-text-track-settings") : window.localStorage.setItem("vjs-text-track-settings", JSON.stringify(e))
                        } catch (i) {}
                    }
                }, s.C = function() {
                    var t = this.d.ea("textTrackDisplay");
                    t && t.C()
                }, "undefined" != typeof window.JSON && "function" == typeof window.JSON.parse) t.JSON = window.JSON;
            else {
                t.JSON = {};
                var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                t.JSON.parse = function(a, c) {
                    function d(t, e) {
                        var i, o, n = t[e];
                        if (n && "object" == typeof n)
                            for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (o = d(n, i), o !== b ? n[i] = o : delete n[i]);
                        return c.call(t, e, n)
                    }
                    var e;
                    if (a = String(a), Z.lastIndex = 0, Z.test(a) && (a = a.replace(Z, function(t) {
                            return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                        })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" == typeof c ? d({
                        "": e
                    }, "") : e;
                    throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
                }
            }
            t.xc = function() {
                var e, i, o, n;
                e = document.getElementsByTagName("video"), i = document.getElementsByTagName("audio");
                var s = [];
                if (e && 0 < e.length)
                    for (o = 0, n = e.length; n > o; o++) s.push(e[o]);
                if (i && 0 < i.length)
                    for (o = 0, n = i.length; n > o; o++) s.push(i[o]);
                if (s && 0 < s.length)
                    for (o = 0, n = s.length; n > o; o++) {
                        if (!(i = s[o]) || !i.getAttribute) {
                            t.Ib();
                            break
                        }
                        i.player === b && (e = i.getAttribute("data-setup"), e !== j && videojs(i))
                    } else t.td || t.Ib()
            }, t.Ib = function() {
                setTimeout(t.xc, 1)
            }, "complete" === document.readyState ? t.td = f : t.N(window, "load", function() {
                t.td = f
            }), t.Ib(), t.Fe = function(e, i) {
                t.Player.prototype[e] = i
            };
            var ya = this;
            $("videojs", t), $("_V_", t), $("videojs.options", t.options), $("videojs.players", t.Aa), $("videojs.TOUCH_ENABLED", t.Eb), $("videojs.cache", t.ta), $("videojs.Component", t.a), t.a.prototype.player = t.a.prototype.k, t.a.prototype.options = t.a.prototype.options, t.a.prototype.init = t.a.prototype.l, t.a.prototype.dispose = t.a.prototype.dispose, t.a.prototype.createEl = t.a.prototype.e, t.a.prototype.contentEl = t.a.prototype.va, t.a.prototype.el = t.a.prototype.m, t.a.prototype.addChild = t.a.prototype.ba, t.a.prototype.getChild = t.a.prototype.ea, t.a.prototype.getChildById = t.a.prototype.ae, t.a.prototype.children = t.a.prototype.children, t.a.prototype.initChildren = t.a.prototype.Oc, t.a.prototype.removeChild = t.a.prototype.removeChild, t.a.prototype.on = t.a.prototype.b, t.a.prototype.off = t.a.prototype.n, t.a.prototype.one = t.a.prototype.N, t.a.prototype.trigger = t.a.prototype.o, t.a.prototype.triggerReady = t.a.prototype.Wa, t.a.prototype.show = t.a.prototype.show, t.a.prototype.hide = t.a.prototype.X, t.a.prototype.width = t.a.prototype.width, t.a.prototype.height = t.a.prototype.height, t.a.prototype.dimensions = t.a.prototype.Td, t.a.prototype.ready = t.a.prototype.I, t.a.prototype.addClass = t.a.prototype.p, t.a.prototype.removeClass = t.a.prototype.r, t.a.prototype.hasClass = t.a.prototype.Oa, t.a.prototype.buildCSSClass = t.a.prototype.T, t.a.prototype.localize = t.a.prototype.v, t.a.prototype.setInterval = t.a.prototype.setInterval, t.a.prototype.setTimeout = t.a.prototype.setTimeout, $("videojs.EventEmitter", t.z), t.z.prototype.on = t.z.prototype.b, t.z.prototype.addEventListener = t.z.prototype.addEventListener, t.z.prototype.off = t.z.prototype.n, t.z.prototype.removeEventListener = t.z.prototype.removeEventListener, t.z.prototype.one = t.z.prototype.N, t.z.prototype.trigger = t.z.prototype.o, t.z.prototype.dispatchEvent = t.z.prototype.dispatchEvent, t.Player.prototype.ended = t.Player.prototype.ended, t.Player.prototype.enterFullWindow = t.Player.prototype.Jc, t.Player.prototype.exitFullWindow = t.Player.prototype.Nb, t.Player.prototype.preload = t.Player.prototype.Qa, t.Player.prototype.remainingTime = t.Player.prototype.remainingTime, t.Player.prototype.supportsFullScreen = t.Player.prototype.Ta, t.Player.prototype.currentType = t.Player.prototype.Qd, t.Player.prototype.requestFullScreen = t.Player.prototype.requestFullScreen, t.Player.prototype.requestFullscreen = t.Player.prototype.requestFullscreen, t.Player.prototype.cancelFullScreen = t.Player.prototype.cancelFullScreen, t.Player.prototype.exitFullscreen = t.Player.prototype.exitFullscreen, t.Player.prototype.isFullScreen = t.Player.prototype.isFullScreen, t.Player.prototype.isFullscreen = t.Player.prototype.isFullscreen, t.Player.prototype.textTracks = t.Player.prototype.textTracks, t.Player.prototype.remoteTextTracks = t.Player.prototype.Z, t.Player.prototype.addTextTrack = t.Player.prototype.addTextTrack, t.Player.prototype.addRemoteTextTrack = t.Player.prototype.ha, t.Player.prototype.removeRemoteTextTrack = t.Player.prototype.Ba, $("videojs.MediaLoader", t.Fd), $("videojs.TextTrackDisplay", t.ra), $("videojs.ControlBar", t.ub), $("videojs.Button", t.w), $("videojs.PlayToggle", t.nc), $("videojs.FullscreenToggle", t.Za), $("videojs.BigPlayButton", t.sb), $("videojs.LoadingSpinner", t.lc), $("videojs.CurrentTimeDisplay", t.vb), $("videojs.DurationDisplay", t.wb), $("videojs.TimeDivider", t.tc), $("videojs.RemainingTimeDisplay", t.Db), $("videojs.LiveDisplay", t.kc), $("videojs.ErrorDisplay", t.xb), $("videojs.Slider", t.S), $("videojs.ProgressControl", t.Cb), $("videojs.SeekBar", t.qc), $("videojs.LoadProgressBar", t.zb), $("videojs.PlayProgressBar", t.mc), $("videojs.SeekHandle", t.$a), $("videojs.VolumeControl", t.Gb), $("videojs.VolumeBar", t.Fb), $("videojs.VolumeLevel", t.uc), $("videojs.VolumeMenuButton", t.Fa), $("videojs.VolumeHandle", t.Hb), $("videojs.MuteToggle", t.qa), $("videojs.PosterImage", t.pc), $("videojs.Menu", t.pa), $("videojs.MenuItem", t.M), $("videojs.MenuButton", t.O), $("videojs.PlaybackRateMenuButton", t.oc), $("videojs.ChaptersTrackMenuItem", t.Ya), $("videojs.TextTrackButton", t.Q), $("videojs.TextTrackMenuItem", t.aa), $("videojs.OffTextTrackMenuItem", t.Ab), $("videojs.CaptionSettingsMenuItem", t.tb), t.O.prototype.createItems = t.O.prototype.Ia, t.Q.prototype.createItems = t.Q.prototype.Ia, t.Xa.prototype.createItems = t.Xa.prototype.Ia, $("videojs.SubtitlesButton", t.ab), $("videojs.CaptionsButton", t.na), $("videojs.ChaptersButton", t.Xa), $("videojs.MediaTechController", t.j), t.j.withSourceHandlers = t.j.gc, t.j.prototype.featuresVolumeControl = t.j.prototype.uf, t.j.prototype.featuresFullscreenResize = t.j.prototype.qf, t.j.prototype.featuresPlaybackRate = t.j.prototype.rf, t.j.prototype.featuresProgressEvents = t.j.prototype.sf, t.j.prototype.featuresTimeupdateEvents = t.j.prototype.tf, t.j.prototype.setPoster = t.j.prototype.fd, t.j.prototype.textTracks = t.j.prototype.textTracks, t.j.prototype.remoteTextTracks = t.j.prototype.Z, t.j.prototype.addTextTrack = t.j.prototype.addTextTrack, t.j.prototype.addRemoteTextTrack = t.j.prototype.ha, t.j.prototype.removeRemoteTextTrack = t.j.prototype.Ba, $("videojs.Html5", t.f), t.f.Events = t.f.yb, t.f.isSupported = t.f.isSupported, t.f.canPlaySource = t.f.zc, t.f.patchCanPlayType = t.f.Xc, t.f.unpatchCanPlayType = t.f.bf, t.f.prototype.setCurrentTime = t.f.prototype.bc, t.f.prototype.setVolume = t.f.prototype.Se, t.f.prototype.setMuted = t.f.prototype.Oe, t.f.prototype.setPreload = t.f.prototype.Qe, t.f.prototype.setAutoplay = t.f.prototype.Le, t.f.prototype.setLoop = t.f.prototype.Ne, t.f.prototype.enterFullScreen = t.f.prototype.Ic, t.f.prototype.exitFullScreen = t.f.prototype.Xd, t.f.prototype.playbackRate = t.f.prototype.playbackRate, t.f.prototype.setPlaybackRate = t.f.prototype.Pe, t.f.registerSourceHandler = t.f.Ra, t.f.selectSourceHandler = t.f.pb, t.f.prototype.setSource = t.f.prototype.Sa, t.f.prototype.disposeSourceHandler = t.f.prototype.Ka, t.f.prototype.textTracks = t.f.prototype.textTracks, t.f.prototype.remoteTextTracks = t.f.prototype.Z, t.f.prototype.addTextTrack = t.f.prototype.addTextTrack, t.f.prototype.addRemoteTextTrack = t.f.prototype.ha, t.f.prototype.removeRemoteTextTrack = t.f.prototype.Ba, $("videojs.Flash", t.g), t.g.isSupported = t.g.isSupported, t.g.canPlaySource = t.g.zc, t.g.onReady = t.g.onReady, t.g.embed = t.g.Hc, t.g.version = t.g.version, t.g.prototype.setSource = t.g.prototype.Sa, t.g.registerSourceHandler = t.g.Ra, t.g.selectSourceHandler = t.g.pb, t.g.prototype.setSource = t.g.prototype.Sa, t.g.prototype.disposeSourceHandler = t.g.prototype.Ka, $("videojs.TextTrack", t.t), $("videojs.TextTrackList", t.F), $("videojs.TextTrackCueList", t.V), $("videojs.TextTrackSettings", t.sc), t.t.prototype.id = t.t.prototype.id, t.t.prototype.label = t.t.prototype.label, t.t.prototype.kind = t.t.prototype.Wb, t.t.prototype.mode = t.t.prototype.mode, t.t.prototype.cues = t.t.prototype.Dc, t.t.prototype.activeCues = t.t.prototype.nf, t.t.prototype.addCue = t.t.prototype.vc, t.t.prototype.removeCue = t.t.prototype.bd, t.F.prototype.getTrackById = t.F.prototype.de, t.V.prototype.getCueById = t.F.prototype.be, $("videojs.CaptionsTrack", t.gf), $("videojs.SubtitlesTrack", t.mf), $("videojs.ChaptersTrack", t.hf), $("videojs.autoSetup", t.xc), $("videojs.plugin", t.Fe), $("videojs.createTimeRange", t.Lb), $("videojs.util", t.$), t.$.mergeOptions = t.$.ya, t.addLanguage = t.Jd
        }(), ! function(t) {
            var e = t.vttjs = {},
                i = e.VTTCue,
                o = e.VTTRegion,
                n = t.VTTCue,
                s = t.VTTRegion;
            e.shim = function() {
                e.VTTCue = i, e.VTTRegion = o
            }, e.restore = function() {
                e.VTTCue = n, e.VTTRegion = s
            }
        }(this),
        function(t, e) {
            function i(t) {
                if ("string" != typeof t) return !1;
                var e = a[t.toLowerCase()];
                return e ? t.toLowerCase() : !1
            }

            function o(t) {
                if ("string" != typeof t) return !1;
                var e = c[t.toLowerCase()];
                return e ? t.toLowerCase() : !1
            }

            function n(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var o in i) t[o] = i[o]
                }
                return t
            }

            function s(t, e, s) {
                var a = this,
                    c = /MSIE\s8\.0/.test(navigator.userAgent),
                    l = {};
                c ? a = document.createElement("custom") : l.enumerable = !0, a.hasBeenReset = !1;
                var u = "",
                    h = !1,
                    p = t,
                    d = e,
                    f = s,
                    v = null,
                    y = "",
                    b = !0,
                    m = "auto",
                    g = "start",
                    w = 50,
                    j = "middle",
                    T = 50,
                    k = "middle";
                return Object.defineProperty(a, "id", n({}, l, {
                    get: function() {
                        return u
                    },
                    set: function(t) {
                        u = "" + t
                    }
                })), Object.defineProperty(a, "pauseOnExit", n({}, l, {
                    get: function() {
                        return h
                    },
                    set: function(t) {
                        h = !!t
                    }
                })), Object.defineProperty(a, "startTime", n({}, l, {
                    get: function() {
                        return p
                    },
                    set: function(t) {
                        if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                        p = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "endTime", n({}, l, {
                    get: function() {
                        return d
                    },
                    set: function(t) {
                        if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                        d = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "text", n({}, l, {
                    get: function() {
                        return f
                    },
                    set: function(t) {
                        f = "" + t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "region", n({}, l, {
                    get: function() {
                        return v
                    },
                    set: function(t) {
                        v = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "vertical", n({}, l, {
                    get: function() {
                        return y
                    },
                    set: function(t) {
                        var e = i(t);
                        if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                        y = e, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "snapToLines", n({}, l, {
                    get: function() {
                        return b
                    },
                    set: function(t) {
                        b = !!t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "line", n({}, l, {
                    get: function() {
                        return m
                    },
                    set: function(t) {
                        if ("number" != typeof t && t !== r) throw new SyntaxError("An invalid number or illegal string was specified.");
                        m = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "lineAlign", n({}, l, {
                    get: function() {
                        return g
                    },
                    set: function(t) {
                        var e = o(t);
                        if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                        g = e, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "position", n({}, l, {
                    get: function() {
                        return w
                    },
                    set: function(t) {
                        if (0 > t || t > 100) throw new Error("Position must be between 0 and 100.");
                        w = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "positionAlign", n({}, l, {
                    get: function() {
                        return j
                    },
                    set: function(t) {
                        var e = o(t);
                        if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                        j = e, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "size", n({}, l, {
                    get: function() {
                        return T
                    },
                    set: function(t) {
                        if (0 > t || t > 100) throw new Error("Size must be between 0 and 100.");
                        T = t, this.hasBeenReset = !0
                    }
                })), Object.defineProperty(a, "align", n({}, l, {
                    get: function() {
                        return k
                    },
                    set: function(t) {
                        var e = o(t);
                        if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                        k = e, this.hasBeenReset = !0
                    }
                })), a.displayState = void 0, c ? a : void 0
            }
            var r = "auto",
                a = {
                    "": !0,
                    lr: !0,
                    rl: !0
                },
                c = {
                    start: !0,
                    middle: !0,
                    end: !0,
                    left: !0,
                    right: !0
                };
            s.prototype.getCueAsHTML = function() {
                return WebVTT.convertCueToDOMTree(window, this.text)
            }, t.VTTCue = t.VTTCue || s, e.VTTCue = s
        }(this, this.vttjs || {}),
        function(t, e) {
            function i(t) {
                if ("string" != typeof t) return !1;
                var e = s[t.toLowerCase()];
                return e ? t.toLowerCase() : !1
            }

            function o(t) {
                return "number" == typeof t && t >= 0 && 100 >= t
            }

            function n() {
                var t = 100,
                    e = 3,
                    n = 0,
                    s = 100,
                    r = 0,
                    a = 100,
                    c = "";
                Object.defineProperties(this, {
                    width: {
                        enumerable: !0,
                        get: function() {
                            return t
                        },
                        set: function(e) {
                            if (!o(e)) throw new Error("Width must be between 0 and 100.");
                            t = e
                        }
                    },
                    lines: {
                        enumerable: !0,
                        get: function() {
                            return e
                        },
                        set: function(t) {
                            if ("number" != typeof t) throw new TypeError("Lines must be set to a number.");
                            e = t
                        }
                    },
                    regionAnchorY: {
                        enumerable: !0,
                        get: function() {
                            return s
                        },
                        set: function(t) {
                            if (!o(t)) throw new Error("RegionAnchorX must be between 0 and 100.");
                            s = t
                        }
                    },
                    regionAnchorX: {
                        enumerable: !0,
                        get: function() {
                            return n
                        },
                        set: function(t) {
                            if (!o(t)) throw new Error("RegionAnchorY must be between 0 and 100.");
                            n = t
                        }
                    },
                    viewportAnchorY: {
                        enumerable: !0,
                        get: function() {
                            return a
                        },
                        set: function(t) {
                            if (!o(t)) throw new Error("ViewportAnchorY must be between 0 and 100.");
                            a = t
                        }
                    },
                    viewportAnchorX: {
                        enumerable: !0,
                        get: function() {
                            return r
                        },
                        set: function(t) {
                            if (!o(t)) throw new Error("ViewportAnchorX must be between 0 and 100.");
                            r = t
                        }
                    },
                    scroll: {
                        enumerable: !0,
                        get: function() {
                            return c
                        },
                        set: function(t) {
                            var e = i(t);
                            if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                            c = e
                        }
                    }
                })
            }
            var s = {
                "": !0,
                up: !0
            };
            t.VTTRegion = t.VTTRegion || n, e.VTTRegion = n
        }(this, this.vttjs || {}),
        function(t) {
            function e(t, e) {
                this.name = "ParsingError", this.code = t.code, this.message = e || t.message
            }

            function i(t) {
                function e(t, e, i, o) {
                    return 3600 * (0 | t) + 60 * (0 | e) + (0 | i) + (0 | o) / 1e3
                }
                var i = t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                return i ? i[3] ? e(i[1], i[2], i[3].replace(":", ""), i[4]) : i[1] > 59 ? e(i[1], i[2], 0, i[4]) : e(0, i[1], i[2], i[4]) : null
            }

            function o() {
                this.values = f(null)
            }

            function n(t, e, i, o) {
                var n = o ? t.split(o) : [t];
                for (var s in n)
                    if ("string" == typeof n[s]) {
                        var r = n[s].split(i);
                        if (2 === r.length) {
                            var a = r[0],
                                c = r[1];
                            e(a, c)
                        }
                    }
            }

            function s(t, s, r) {
                function a() {
                    var o = i(t);
                    if (null === o) throw new e(e.Errors.BadTimeStamp, "Malformed timestamp: " + u);
                    return t = t.replace(/^[^\sa-zA-Z-]+/, ""), o
                }

                function c(t, e) {
                    var i = new o;
                    n(t, function(t, e) {
                        switch (t) {
                            case "region":
                                for (var o = r.length - 1; o >= 0; o--)
                                    if (r[o].id === e) {
                                        i.set(t, r[o].region);
                                        break
                                    }
                                break;
                            case "vertical":
                                i.alt(t, e, ["rl", "lr"]);
                                break;
                            case "line":
                                var n = e.split(","),
                                    s = n[0];
                                i.integer(t, s), i.percent(t, s) ? i.set("snapToLines", !1) : null, i.alt(t, s, ["auto"]), 2 === n.length && i.alt("lineAlign", n[1], ["start", "middle", "end"]);
                                break;
                            case "position":
                                n = e.split(","), i.percent(t, n[0]), 2 === n.length && i.alt("positionAlign", n[1], ["start", "middle", "end"]);
                                break;
                            case "size":
                                i.percent(t, e);
                                break;
                            case "align":
                                i.alt(t, e, ["start", "middle", "end", "left", "right"])
                        }
                    }, /:/, /\s/), e.region = i.get("region", null), e.vertical = i.get("vertical", ""), e.line = i.get("line", "auto"), e.lineAlign = i.get("lineAlign", "start"), e.snapToLines = i.get("snapToLines", !0), e.size = i.get("size", 100), e.align = i.get("align", "middle"), e.position = i.get("position", {
                        start: 0,
                        left: 0,
                        middle: 50,
                        end: 100,
                        right: 100
                    }, e.align), e.positionAlign = i.get("positionAlign", {
                        start: "start",
                        left: "start",
                        middle: "middle",
                        end: "end",
                        right: "end"
                    }, e.align)
                }

                function l() {
                    t = t.replace(/^\s+/, "")
                }
                var u = t;
                if (l(), s.startTime = a(), l(), "-->" !== t.substr(0, 3)) throw new e(e.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + u);
                t = t.substr(3), l(), s.endTime = a(), l(), c(t, s)
            }

            function r(t, e) {
                function o() {
                    function t(t) {
                        return e = e.substr(t.length), t
                    }
                    if (!e) return null;
                    var i = e.match(/^([^<]*)(<[^>]+>?)?/);
                    return t(i[1] ? i[1] : i[2])
                }

                function n(t) {
                    return v[t]
                }

                function s(t) {
                    for (; f = t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) t = t.replace(f[0], n);
                    return t
                }

                function r(t, e) {
                    return !m[e.localName] || m[e.localName] === t.localName
                }

                function a(e, i) {
                    var o = y[e];
                    if (!o) return null;
                    var n = t.document.createElement(o);
                    n.localName = o;
                    var s = b[e];
                    return s && i && (n[s] = i.trim()), n
                }
                for (var c, l = t.document.createElement("div"), u = l, h = []; null !== (c = o());)
                    if ("<" !== c[0]) u.appendChild(t.document.createTextNode(s(c)));
                    else {
                        if ("/" === c[1]) {
                            h.length && h[h.length - 1] === c.substr(2).replace(">", "") && (h.pop(), u = u.parentNode);
                            continue
                        }
                        var p, d = i(c.substr(1, c.length - 2));
                        if (d) {
                            p = t.document.createProcessingInstruction("timestamp", d), u.appendChild(p);
                            continue
                        }
                        var f = c.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                        if (!f) continue;
                        if (p = a(f[1], f[3]), !p) continue;
                        if (!r(u, p)) continue;
                        f[2] && (p.className = f[2].substr(1).replace(".", " ")), h.push(f[1]), u.appendChild(p), u = p
                    }
                return l
            }

            function a(t) {
                function e(t, e) {
                    for (var i = e.childNodes.length - 1; i >= 0; i--) t.push(e.childNodes[i])
                }

                function i(t) {
                    if (!t || !t.length) return null;
                    var o = t.pop(),
                        n = o.textContent || o.innerText;
                    if (n) {
                        var s = n.match(/^.*(\n|\r)/);
                        return s ? (t.length = 0, s[0]) : n
                    }
                    return "ruby" === o.tagName ? i(t) : o.childNodes ? (e(t, o), i(t)) : void 0
                }
                var o, n = [],
                    s = "";
                if (!t || !t.childNodes) return "ltr";
                for (e(n, t); s = i(n);)
                    for (var r = 0; r < s.length; r++) {
                        o = s.charCodeAt(r);
                        for (var a = 0; a < g.length; a++)
                            if (g[a] === o) return "rtl"
                    }
                return "ltr"
            }

            function c(t) {
                if ("number" == typeof t.line && (t.snapToLines || t.line >= 0 && t.line <= 100)) return t.line;
                if (!t.track || !t.track.textTrackList || !t.track.textTrackList.mediaElement) return -1;
                for (var e = t.track, i = e.textTrackList, o = 0, n = 0; n < i.length && i[n] !== e; n++) "showing" === i[n].mode && o++;
                return -1 * ++o
            }

            function l() {}

            function u(t, e, i) {
                var o = /MSIE\s8\.0/.test(navigator.userAgent),
                    n = "rgba(255, 255, 255, 1)",
                    s = "rgba(0, 0, 0, 0.8)";
                o && (n = "rgb(255, 255, 255)", s = "rgb(0, 0, 0)"), l.call(this), this.cue = e, this.cueDiv = r(t, e.text);
                var c = {
                    color: n,
                    backgroundColor: s,
                    position: "relative",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "inline"
                };
                o || (c.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl", c.unicodeBidi = "plaintext"), this.applyStyles(c, this.cueDiv), this.div = t.document.createElement("div"), c = {
                    textAlign: "middle" === e.align ? "center" : e.align,
                    font: i.font,
                    whiteSpace: "pre-line",
                    position: "absolute"
                }, o || (c.direction = a(this.cueDiv), c.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext"), this.applyStyles(c), this.div.appendChild(this.cueDiv);
                var u = 0;
                switch (e.positionAlign) {
                    case "start":
                        u = e.position;
                        break;
                    case "middle":
                        u = e.position - e.size / 2;
                        break;
                    case "end":
                        u = e.position - e.size
                }
                this.applyStyles("" === e.vertical ? {
                    left: this.formatStyle(u, "%"),
                    width: this.formatStyle(e.size, "%")
                } : {
                    top: this.formatStyle(u, "%"),
                    height: this.formatStyle(e.size, "%")
                }), this.move = function(t) {
                    this.applyStyles({
                        top: this.formatStyle(t.top, "px"),
                        bottom: this.formatStyle(t.bottom, "px"),
                        left: this.formatStyle(t.left, "px"),
                        right: this.formatStyle(t.right, "px"),
                        height: this.formatStyle(t.height, "px"),
                        width: this.formatStyle(t.width, "px")
                    })
                }
            }

            function h(t) {
                var e, i, o, n, s = /MSIE\s8\.0/.test(navigator.userAgent);
                if (t.div) {
                    i = t.div.offsetHeight, o = t.div.offsetWidth, n = t.div.offsetTop;
                    var r = (r = t.div.childNodes) && (r = r[0]) && r.getClientRects && r.getClientRects();
                    t = t.div.getBoundingClientRect(), e = r ? Math.max(r[0] && r[0].height || 0, t.height / r.length) : 0
                }
                this.left = t.left, this.right = t.right, this.top = t.top || n, this.height = t.height || i, this.bottom = t.bottom || n + (t.height || i), this.width = t.width || o, this.lineHeight = void 0 !== e ? e : t.lineHeight, s && !this.lineHeight && (this.lineHeight = 13)
            }

            function p(t, e, i, o) {
                function n(t, e) {
                    for (var n, s = new h(t), r = 1, a = 0; a < e.length; a++) {
                        for (; t.overlapsOppositeAxis(i, e[a]) || t.within(i) && t.overlapsAny(o);) t.move(e[a]);
                        if (t.within(i)) return t;
                        var c = t.intersectPercentage(i);
                        r > c && (n = new h(t), r = c), t = new h(s)
                    }
                    return n || s
                }
                var s = new h(e),
                    r = e.cue,
                    a = c(r),
                    l = [];
                if (r.snapToLines) {
                    var u;
                    switch (r.vertical) {
                        case "":
                            l = ["+y", "-y"], u = "height";
                            break;
                        case "rl":
                            l = ["+x", "-x"], u = "width";
                            break;
                        case "lr":
                            l = ["-x", "+x"], u = "width"
                    }
                    var p = s.lineHeight,
                        d = p * Math.round(a),
                        f = i[u] + p,
                        v = l[0];
                    Math.abs(d) > f && (d = 0 > d ? -1 : 1, d *= Math.ceil(f / p) * p), 0 > a && (d += "" === r.vertical ? i.height : i.width, l = l.reverse()), s.move(v, d)
                } else {
                    var y = s.lineHeight / i.height * 100;
                    switch (r.lineAlign) {
                        case "middle":
                            a -= y / 2;
                            break;
                        case "end":
                            a -= y
                    }
                    switch (r.vertical) {
                        case "":
                            e.applyStyles({
                                top: e.formatStyle(a, "%")
                            });
                            break;
                        case "rl":
                            e.applyStyles({
                                left: e.formatStyle(a, "%")
                            });
                            break;
                        case "lr":
                            e.applyStyles({
                                right: e.formatStyle(a, "%")
                            })
                    }
                    l = ["+y", "-x", "+x", "-y"], s = new h(e)
                }
                var b = n(s, l);
                e.move(b.toCSSCompatValues(i))
            }

            function d() {}
            var f = Object.create || function() {
                function t() {}
                return function(e) {
                    if (1 !== arguments.length) throw new Error("Object.create shim only accepts one parameter.");
                    return t.prototype = e, new t
                }
            }();
            e.prototype = f(Error.prototype), e.prototype.constructor = e, e.Errors = {
                BadSignature: {
                    code: 0,
                    message: "Malformed WebVTT signature."
                },
                BadTimeStamp: {
                    code: 1,
                    message: "Malformed time stamp."
                }
            }, o.prototype = {
                set: function(t, e) {
                    this.get(t) || "" === e || (this.values[t] = e)
                },
                get: function(t, e, i) {
                    return i ? this.has(t) ? this.values[t] : e[i] : this.has(t) ? this.values[t] : e
                },
                has: function(t) {
                    return t in this.values
                },
                alt: function(t, e, i) {
                    for (var o = 0; o < i.length; ++o)
                        if (e === i[o]) {
                            this.set(t, e);
                            break
                        }
                },
                integer: function(t, e) {
                    /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                },
                percent: function(t, e) {
                    var i;
                    return (i = e.match(/^([\d]{1,3})(\.[\d]*)?%$/)) && (e = parseFloat(e), e >= 0 && 100 >= e) ? (this.set(t, e), !0) : !1
                }
            };
            var v = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&lrm;": "â€Ž",
                    "&rlm;": "â€",
                    "&nbsp;": "Â "
                },
                y = {
                    c: "span",
                    i: "i",
                    b: "b",
                    u: "u",
                    ruby: "ruby",
                    rt: "rt",
                    v: "span",
                    lang: "span"
                },
                b = {
                    v: "title",
                    lang: "lang"
                },
                m = {
                    rt: "ruby"
                },
                g = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1645, 1646, 1647, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1765, 1766, 1774, 1775, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1807, 1808, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1969, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2036, 2037, 2042, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2074, 2084, 2088, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2142, 2208, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 8207, 64285, 64287, 64288, 64289, 64290, 64291, 64292, 64293, 64294, 64295, 64296, 64298, 64299, 64300, 64301, 64302, 64303, 64304, 64305, 64306, 64307, 64308, 64309, 64310, 64312, 64313, 64314, 64315, 64316, 64318, 64320, 64321, 64323, 64324, 64326, 64327, 64328, 64329, 64330, 64331, 64332, 64333, 64334, 64335, 64336, 64337, 64338, 64339, 64340, 64341, 64342, 64343, 64344, 64345, 64346, 64347, 64348, 64349, 64350, 64351, 64352, 64353, 64354, 64355, 64356, 64357, 64358, 64359, 64360, 64361, 64362, 64363, 64364, 64365, 64366, 64367, 64368, 64369, 64370, 64371, 64372, 64373, 64374, 64375, 64376, 64377, 64378, 64379, 64380, 64381, 64382, 64383, 64384, 64385, 64386, 64387, 64388, 64389, 64390, 64391, 64392, 64393, 64394, 64395, 64396, 64397, 64398, 64399, 64400, 64401, 64402, 64403, 64404, 64405, 64406, 64407, 64408, 64409, 64410, 64411, 64412, 64413, 64414, 64415, 64416, 64417, 64418, 64419, 64420, 64421, 64422, 64423, 64424, 64425, 64426, 64427, 64428, 64429, 64430, 64431, 64432, 64433, 64434, 64435, 64436, 64437, 64438, 64439, 64440, 64441, 64442, 64443, 64444, 64445, 64446, 64447, 64448, 64449, 64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475, 64476, 64477, 64478, 64479, 64480, 64481, 64482, 64483, 64484, 64485, 64486, 64487, 64488, 64489, 64490, 64491, 64492, 64493, 64494, 64495, 64496, 64497, 64498, 64499, 64500, 64501, 64502, 64503, 64504, 64505, 64506, 64507, 64508, 64509, 64510, 64511, 64512, 64513, 64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522, 64523, 64524, 64525, 64526, 64527, 64528, 64529, 64530, 64531, 64532, 64533, 64534, 64535, 64536, 64537, 64538, 64539, 64540, 64541, 64542, 64543, 64544, 64545, 64546, 64547, 64548, 64549, 64550, 64551, 64552, 64553, 64554, 64555, 64556, 64557, 64558, 64559, 64560, 64561, 64562, 64563, 64564, 64565, 64566, 64567, 64568, 64569, 64570, 64571, 64572, 64573, 64574, 64575, 64576, 64577, 64578, 64579, 64580, 64581, 64582, 64583, 64584, 64585, 64586, 64587, 64588, 64589, 64590, 64591, 64592, 64593, 64594, 64595, 64596, 64597, 64598, 64599, 64600, 64601, 64602, 64603, 64604, 64605, 64606, 64607, 64608, 64609, 64610, 64611, 64612, 64613, 64614, 64615, 64616, 64617, 64618, 64619, 64620, 64621, 64622, 64623, 64624, 64625, 64626, 64627, 64628, 64629, 64630, 64631, 64632, 64633, 64634, 64635, 64636, 64637, 64638, 64639, 64640, 64641, 64642, 64643, 64644, 64645, 64646, 64647, 64648, 64649, 64650, 64651, 64652, 64653, 64654, 64655, 64656, 64657, 64658, 64659, 64660, 64661, 64662, 64663, 64664, 64665, 64666, 64667, 64668, 64669, 64670, 64671, 64672, 64673, 64674, 64675, 64676, 64677, 64678, 64679, 64680, 64681, 64682, 64683, 64684, 64685, 64686, 64687, 64688, 64689, 64690, 64691, 64692, 64693, 64694, 64695, 64696, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704, 64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713, 64714, 64715, 64716, 64717, 64718, 64719, 64720, 64721, 64722, 64723, 64724, 64725, 64726, 64727, 64728, 64729, 64730, 64731, 64732, 64733, 64734, 64735, 64736, 64737, 64738, 64739, 64740, 64741, 64742, 64743, 64744, 64745, 64746, 64747, 64748, 64749, 64750, 64751, 64752, 64753, 64754, 64755, 64756, 64757, 64758, 64759, 64760, 64761, 64762, 64763, 64764, 64765, 64766, 64767, 64768, 64769, 64770, 64771, 64772, 64773, 64774, 64775, 64776, 64777, 64778, 64779, 64780, 64781, 64782, 64783, 64784, 64785, 64786, 64787, 64788, 64789, 64790, 64791, 64792, 64793, 64794, 64795, 64796, 64797, 64798, 64799, 64800, 64801, 64802, 64803, 64804, 64805, 64806, 64807, 64808, 64809, 64810, 64811, 64812, 64813, 64814, 64815, 64816, 64817, 64818, 64819, 64820, 64821, 64822, 64823, 64824, 64825, 64826, 64827, 64828, 64829, 64848, 64849, 64850, 64851, 64852, 64853, 64854, 64855, 64856, 64857, 64858, 64859, 64860, 64861, 64862, 64863, 64864, 64865, 64866, 64867, 64868, 64869, 64870, 64871, 64872, 64873, 64874, 64875, 64876, 64877, 64878, 64879, 64880, 64881, 64882, 64883, 64884, 64885, 64886, 64887, 64888, 64889, 64890, 64891, 64892, 64893, 64894, 64895, 64896, 64897, 64898, 64899, 64900, 64901, 64902, 64903, 64904, 64905, 64906, 64907, 64908, 64909, 64910, 64911, 64914, 64915, 64916, 64917, 64918, 64919, 64920, 64921, 64922, 64923, 64924, 64925, 64926, 64927, 64928, 64929, 64930, 64931, 64932, 64933, 64934, 64935, 64936, 64937, 64938, 64939, 64940, 64941, 64942, 64943, 64944, 64945, 64946, 64947, 64948, 64949, 64950, 64951, 64952, 64953, 64954, 64955, 64956, 64957, 64958, 64959, 64960, 64961, 64962, 64963, 64964, 64965, 64966, 64967, 65008, 65009, 65010, 65011, 65012, 65013, 65014, 65015, 65016, 65017, 65018, 65019, 65020, 65136, 65137, 65138, 65139, 65140, 65142, 65143, 65144, 65145, 65146, 65147, 65148, 65149, 65150, 65151, 65152, 65153, 65154, 65155, 65156, 65157, 65158, 65159, 65160, 65161, 65162, 65163, 65164, 65165, 65166, 65167, 65168, 65169, 65170, 65171, 65172, 65173, 65174, 65175, 65176, 65177, 65178, 65179, 65180, 65181, 65182, 65183, 65184, 65185, 65186, 65187, 65188, 65189, 65190, 65191, 65192, 65193, 65194, 65195, 65196, 65197, 65198, 65199, 65200, 65201, 65202, 65203, 65204, 65205, 65206, 65207, 65208, 65209, 65210, 65211, 65212, 65213, 65214, 65215, 65216, 65217, 65218, 65219, 65220, 65221, 65222, 65223, 65224, 65225, 65226, 65227, 65228, 65229, 65230, 65231, 65232, 65233, 65234, 65235, 65236, 65237, 65238, 65239, 65240, 65241, 65242, 65243, 65244, 65245, 65246, 65247, 65248, 65249, 65250, 65251, 65252, 65253, 65254, 65255, 65256, 65257, 65258, 65259, 65260, 65261, 65262, 65263, 65264, 65265, 65266, 65267, 65268, 65269, 65270, 65271, 65272, 65273, 65274, 65275, 65276, 67584, 67585, 67586, 67587, 67588, 67589, 67592, 67594, 67595, 67596, 67597, 67598, 67599, 67600, 67601, 67602, 67603, 67604, 67605, 67606, 67607, 67608, 67609, 67610, 67611, 67612, 67613, 67614, 67615, 67616, 67617, 67618, 67619, 67620, 67621, 67622, 67623, 67624, 67625, 67626, 67627, 67628, 67629, 67630, 67631, 67632, 67633, 67634, 67635, 67636, 67637, 67639, 67640, 67644, 67647, 67648, 67649, 67650, 67651, 67652, 67653, 67654, 67655, 67656, 67657, 67658, 67659, 67660, 67661, 67662, 67663, 67664, 67665, 67666, 67667, 67668, 67669, 67671, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67840, 67841, 67842, 67843, 67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853, 67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67862, 67863, 67864, 67865, 67866, 67867, 67872, 67873, 67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883, 67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893, 67894, 67895, 67896, 67897, 67903, 67968, 67969, 67970, 67971, 67972, 67973, 67974, 67975, 67976, 67977, 67978, 67979, 67980, 67981, 67982, 67983, 67984, 67985, 67986, 67987, 67988, 67989, 67990, 67991, 67992, 67993, 67994, 67995, 67996, 67997, 67998, 67999, 68e3, 68001, 68002, 68003, 68004, 68005, 68006, 68007, 68008, 68009, 68010, 68011, 68012, 68013, 68014, 68015, 68016, 68017, 68018, 68019, 68020, 68021, 68022, 68023, 68030, 68031, 68096, 68112, 68113, 68114, 68115, 68117, 68118, 68119, 68121, 68122, 68123, 68124, 68125, 68126, 68127, 68128, 68129, 68130, 68131, 68132, 68133, 68134, 68135, 68136, 68137, 68138, 68139, 68140, 68141, 68142, 68143, 68144, 68145, 68146, 68147, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68176, 68177, 68178, 68179, 68180, 68181, 68182, 68183, 68184, 68192, 68193, 68194, 68195, 68196, 68197, 68198, 68199, 68200, 68201, 68202, 68203, 68204, 68205, 68206, 68207, 68208, 68209, 68210, 68211, 68212, 68213, 68214, 68215, 68216, 68217, 68218, 68219, 68220, 68221, 68222, 68223, 68352, 68353, 68354, 68355, 68356, 68357, 68358, 68359, 68360, 68361, 68362, 68363, 68364, 68365, 68366, 68367, 68368, 68369, 68370, 68371, 68372, 68373, 68374, 68375, 68376, 68377, 68378, 68379, 68380, 68381, 68382, 68383, 68384, 68385, 68386, 68387, 68388, 68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396, 68397, 68398, 68399, 68400, 68401, 68402, 68403, 68404, 68405, 68416, 68417, 68418, 68419, 68420, 68421, 68422, 68423, 68424, 68425, 68426, 68427, 68428, 68429, 68430, 68431, 68432, 68433, 68434, 68435, 68436, 68437, 68440, 68441, 68442, 68443, 68444, 68445, 68446, 68447, 68448, 68449, 68450, 68451, 68452, 68453, 68454, 68455, 68456, 68457, 68458, 68459, 68460, 68461, 68462, 68463, 68464, 68465, 68466, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68608, 68609, 68610, 68611, 68612, 68613, 68614, 68615, 68616, 68617, 68618, 68619, 68620, 68621, 68622, 68623, 68624, 68625, 68626, 68627, 68628, 68629, 68630, 68631, 68632, 68633, 68634, 68635, 68636, 68637, 68638, 68639, 68640, 68641, 68642, 68643, 68644, 68645, 68646, 68647, 68648, 68649, 68650, 68651, 68652, 68653, 68654, 68655, 68656, 68657, 68658, 68659, 68660, 68661, 68662, 68663, 68664, 68665, 68666, 68667, 68668, 68669, 68670, 68671, 68672, 68673, 68674, 68675, 68676, 68677, 68678, 68679, 68680, 126464, 126465, 126466, 126467, 126469, 126470, 126471, 126472, 126473, 126474, 126475, 126476, 126477, 126478, 126479, 126480, 126481, 126482, 126483, 126484, 126485, 126486, 126487, 126488, 126489, 126490, 126491, 126492, 126493, 126494, 126495, 126497, 126498, 126500, 126503, 126505, 126506, 126507, 126508, 126509, 126510, 126511, 126512, 126513, 126514, 126516, 126517, 126518, 126519, 126521, 126523, 126530, 126535, 126537, 126539, 126541, 126542, 126543, 126545, 126546, 126548, 126551, 126553, 126555, 126557, 126559, 126561, 126562, 126564, 126567, 126568, 126569, 126570, 126572, 126573, 126574, 126575, 126576, 126577, 126578, 126580, 126581, 126582, 126583, 126585, 126586, 126587, 126588, 126590, 126592, 126593, 126594, 126595, 126596, 126597, 126598, 126599, 126600, 126601, 126603, 126604, 126605, 126606, 126607, 126608, 126609, 126610, 126611, 126612, 126613, 126614, 126615, 126616, 126617, 126618, 126619, 126625, 126626, 126627, 126629, 126630, 126631, 126632, 126633, 126635, 126636, 126637, 126638, 126639, 126640, 126641, 126642, 126643, 126644, 126645, 126646, 126647, 126648, 126649, 126650, 126651, 1114109];
            l.prototype.applyStyles = function(t, e) {
                e = e || this.div;
                for (var i in t) t.hasOwnProperty(i) && (e.style[i] = t[i])
            }, l.prototype.formatStyle = function(t, e) {
                return 0 === t ? 0 : t + e
            }, u.prototype = f(l.prototype), u.prototype.constructor = u, h.prototype.move = function(t, e) {
                switch (e = void 0 !== e ? e : this.lineHeight, t) {
                    case "+x":
                        this.left += e, this.right += e;
                        break;
                    case "-x":
                        this.left -= e, this.right -= e;
                        break;
                    case "+y":
                        this.top += e, this.bottom += e;
                        break;
                    case "-y":
                        this.top -= e, this.bottom -= e
                }
            }, h.prototype.overlaps = function(t) {
                return this.left < t.right && this.right > t.left && this.top < t.bottom && this.bottom > t.top
            }, h.prototype.overlapsAny = function(t) {
                for (var e = 0; e < t.length; e++)
                    if (this.overlaps(t[e])) return !0;
                return !1
            }, h.prototype.within = function(t) {
                return this.top >= t.top && this.bottom <= t.bottom && this.left >= t.left && this.right <= t.right
            }, h.prototype.overlapsOppositeAxis = function(t, e) {
                switch (e) {
                    case "+x":
                        return this.left < t.left;
                    case "-x":
                        return this.right > t.right;
                    case "+y":
                        return this.top < t.top;
                    case "-y":
                        return this.bottom > t.bottom
                }
            }, h.prototype.intersectPercentage = function(t) {
                var e = Math.max(0, Math.min(this.right, t.right) - Math.max(this.left, t.left)),
                    i = Math.max(0, Math.min(this.bottom, t.bottom) - Math.max(this.top, t.top)),
                    o = e * i;
                return o / (this.height * this.width)
            }, h.prototype.toCSSCompatValues = function(t) {
                return {
                    top: this.top - t.top,
                    bottom: t.bottom - this.bottom,
                    left: this.left - t.left,
                    right: t.right - this.right,
                    height: this.height,
                    width: this.width
                }
            }, h.getSimpleBoxPosition = function(t) {
                var e = t.div ? t.div.offsetHeight : t.tagName ? t.offsetHeight : 0,
                    i = t.div ? t.div.offsetWidth : t.tagName ? t.offsetWidth : 0,
                    o = t.div ? t.div.offsetTop : t.tagName ? t.offsetTop : 0;
                t = t.div ? t.div.getBoundingClientRect() : t.tagName ? t.getBoundingClientRect() : t;
                var n = {
                    left: t.left,
                    right: t.right,
                    top: t.top || o,
                    height: t.height || e,
                    bottom: t.bottom || o + (t.height || e),
                    width: t.width || i
                };
                return n
            }, d.StringDecoder = function() {
                return {
                    decode: function(t) {
                        if (!t) return "";
                        if ("string" != typeof t) throw new Error("Error - expected string data.");
                        return decodeURIComponent(encodeURIComponent(t))
                    }
                }
            }, d.convertCueToDOMTree = function(t, e) {
                return t && e ? r(t, e) : null
            };
            var w = .05,
                j = "sans-serif",
                T = "1.5%";
            d.processCues = function(t, e, i) {
                function o(t) {
                    for (var e = 0; e < t.length; e++)
                        if (t[e].hasBeenReset || !t[e].displayState) return !0;
                    return !1
                }
                if (!t || !e || !i) return null;
                for (; i.firstChild;) i.removeChild(i.firstChild);
                var n = t.document.createElement("div");
                if (n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0", n.style.margin = T, i.appendChild(n), o(e)) {
                    var s = [],
                        r = h.getSimpleBoxPosition(n),
                        a = Math.round(r.height * w * 100) / 100,
                        c = {
                            font: a + "px " + j
                        };
                    ! function() {
                        for (var i, o, a = 0; a < e.length; a++) o = e[a], i = new u(t, o, c), n.appendChild(i.div), p(t, i, r, s), o.displayState = i.div, s.push(h.getSimpleBoxPosition(i))
                    }()
                } else
                    for (var l = 0; l < e.length; l++) n.appendChild(e[l].displayState)
            }, d.Parser = function(t, e, i) {
                i || (i = e, e = {}), e || (e = {}), this.window = t, this.vttjs = e, this.state = "INITIAL", this.buffer = "", this.decoder = i || new TextDecoder("utf8"), this.regionList = []
            }, d.Parser.prototype = {
                reportOrThrowError: function(t) {
                    if (!(t instanceof e)) throw t;
                    this.onparsingerror && this.onparsingerror(t)
                },
                parse: function(t) {
                    function i() {
                        for (var t = c.buffer, e = 0; e < t.length && "\r" !== t[e] && "\n" !== t[e];) ++e;
                        var i = t.substr(0, e);
                        return "\r" === t[e] && ++e, "\n" === t[e] && ++e, c.buffer = t.substr(e), i
                    }

                    function r(t) {
                        var e = new o;
                        if (n(t, function(t, i) {
                                switch (t) {
                                    case "id":
                                        e.set(t, i);
                                        break;
                                    case "width":
                                        e.percent(t, i);
                                        break;
                                    case "lines":
                                        e.integer(t, i);
                                        break;
                                    case "regionanchor":
                                    case "viewportanchor":
                                        var n = i.split(",");
                                        if (2 !== n.length) break;
                                        var s = new o;
                                        if (s.percent("x", n[0]), s.percent("y", n[1]), !s.has("x") || !s.has("y")) break;
                                        e.set(t + "X", s.get("x")), e.set(t + "Y", s.get("y"));
                                        break;
                                    case "scroll":
                                        e.alt(t, i, ["up"])
                                }
                            }, /=/, /\s/), e.has("id")) {
                            var i = new(c.vttjs.VTTRegion || c.window.VTTRegion);
                            i.width = e.get("width", 100), i.lines = e.get("lines", 3), i.regionAnchorX = e.get("regionanchorX", 0), i.regionAnchorY = e.get("regionanchorY", 100), i.viewportAnchorX = e.get("viewportanchorX", 0), i.viewportAnchorY = e.get("viewportanchorY", 100), i.scroll = e.get("scroll", ""), c.onregion && c.onregion(i), c.regionList.push({
                                id: e.get("id"),
                                region: i
                            })
                        }
                    }

                    function a(t) {
                        n(t, function(t, e) {
                            switch (t) {
                                case "Region":
                                    r(e)
                            }
                        }, /:/)
                    }
                    var c = this;
                    t && (c.buffer += c.decoder.decode(t, {
                        stream: !0
                    }));
                    try {
                        var l;
                        if ("INITIAL" === c.state) {
                            if (!/\r\n|\n/.test(c.buffer)) return this;
                            l = i();
                            var u = l.match(/^WEBVTT([ \t].*)?$/);
                            if (!u || !u[0]) throw new e(e.Errors.BadSignature);
                            c.state = "HEADER"
                        }
                        for (var h = !1; c.buffer;) {
                            if (!/\r\n|\n/.test(c.buffer)) return this;
                            switch (h ? h = !1 : l = i(), c.state) {
                                case "HEADER":
                                    /:/.test(l) ? a(l) : l || (c.state = "ID");
                                    continue;
                                case "NOTE":
                                    l || (c.state = "ID");
                                    continue;
                                case "ID":
                                    if (/^NOTE($|[ \t])/.test(l)) {
                                        c.state = "NOTE";
                                        break
                                    }
                                    if (!l) continue;
                                    if (c.cue = new(c.vttjs.VTTCue || c.window.VTTCue)(0, 0, ""), c.state = "CUE", -1 === l.indexOf("-->")) {
                                        c.cue.id = l;
                                        continue
                                    }
                                case "CUE":
                                    try {
                                        s(l, c.cue, c.regionList)
                                    } catch (p) {
                                        c.reportOrThrowError(p), c.cue = null, c.state = "BADCUE";
                                        continue
                                    }
                                    c.state = "CUETEXT";
                                    continue;
                                case "CUETEXT":
                                    var d = -1 !== l.indexOf("-->");
                                    if (!l || d && (h = !0)) {
                                        c.oncue && c.oncue(c.cue), c.cue = null, c.state = "ID";
                                        continue
                                    }
                                    c.cue.text && (c.cue.text += "\n"), c.cue.text += l;
                                    continue;
                                case "BADCUE":
                                    l || (c.state = "ID");
                                    continue
                            }
                        }
                    } catch (p) {
                        c.reportOrThrowError(p), "CUETEXT" === c.state && c.cue && c.oncue && c.oncue(c.cue), c.cue = null, c.state = "INITIAL" === c.state ? "BADWEBVTT" : "BADCUE"
                    }
                    return this
                },
                flush: function() {
                    var t = this;
                    try {
                        if (t.buffer += t.decoder.decode(), (t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state) throw new e(e.Errors.BadSignature)
                    } catch (i) {
                        t.reportOrThrowError(i)
                    }
                    return t.onflush && t.onflush(), this
                }
            }, t.WebVTT = d
        }(this, this.vttjs || {});


    }, {}],
    21: [function(require, module, exports) {
        var _ = require("underscore"),
            PubSub = require("simple-pubsub"),
            BezierEasing = require("bezier-easing"),
            Backbone = require("backbone"),
            videojs = require("video.js"),
            Helpers = require("./helpers"),
            Features = require("./features"),
            Globals = require("./globals"),
            BbFormFooter = require("./bbformfooter");
        module.exports = Backbone.View.extend({
            ease: new Ease(BezierEasing(.6, 0, 0, 1)),
            events: {
                "focus input": "onFocus",
                "blur input": "onBlur",
                "submit form": "onSubmit",
                "keyup input": "onKeyUp",
                "click .signup-form-submit": "sendData",
                "click .signup-form-share-facebook": "shareFacebook",
                "click .signup-form-share-twitter": "shareTwitter"
            },
            initialize: function() {
                this.state = "form", this.$fields = this.$(".signup-form-field"), this.$inputs = this.$("input"), this.$labels = this.$("label"), this.footer = new BbFormFooter({
                    el: this.$(".signup-form-footer")
                }), this.$success = this.$(".signup-form-success-message"), this.listenTo(PubSub, "startbttn:expanded", this.reveal), this.listenTo(PubSub, "state:change", this.onStateChange)
            },
            reset: function() {
                this.state = "form", this.slideForm(0, !0), this.footer.hide(!0), this.$inputs.each(function() {
                    var e = $(this);
                    e.val(e.attr("data-placeholder")), e.css("visibility", "visible"), TweenLite.set(e, {
                        opacity: 0
                    })
                }), this.$success.css("visibility", "hidden").text(""), this.$fields.css("visibility", "visible"), TweenLite.set(this.$fields, {
                    opacity: .6
                }), this.$labels.css("visibility", "visible"), TweenLite.set(this.$labels, {
                    opacity: 0
                })
            },
            reveal: function(e) {
                this.$el.css("visibility", "hidden"), TweenLite.set(this.$el, {
                    y: 0,
                    yPercent: 0
                }), this.$el.show(), this.reset(); {
                    var i = e.top - this.$el.offset().top - this.$fields.first().height() + 2.5;
                    this.$fields.size()
                }
                this.$fields.each(function(e) {
                    TweenLite.set(this, {
                        yPercent: -100 * e,
                        y: i
                    })
                }), TweenLite.set(this.$fields.first(), {
                    opacity: 1
                }), this.$el.css("visibility", "visible");
                var t = new TimelineLite;
                this.$fields.each(function() {
                    t.to(this, 26 / 30, {
                        yPercent: 0,
                        y: 0,
                        ease: this.ease
                    }, 0)
                }), this.$inputs.each(function(e) {
                    t.to(this, .4, {
                        opacity: 1,
                        ease: Sine.easeInOut
                    }, (20 + 6 * e) / 30)
                })
            },
            showFieldPlaceholder: function(e) {
                var i = $.trim(e.val());
                if (!i) {
                    var t = e.siblings("label").first();
                    TweenLite.to(t, 10 / 30, {
                        opacity: 0,
                        ease: Sine.easeInOut,
                        onCompleteScope: this,
                        onComplete: function() {
                            e.val(e.attr("data-placeholder"))
                        }
                    })
                }
            },
            hideFieldPlaceholder: function(e) {
                var i = $.trim(e.val());
                if (i == e.attr("data-placeholder")) {
                    e.val("");
                    var t = e.siblings("label").first();
                    TweenLite.to(t, 16 / 30, {
                        opacity: .7,
                        ease: Sine.easeInOut
                    })
                }
            },
            deSelectFields: function(e) {
                TweenLite.to(e, .5, {
                    opacity: .6,
                    ease: Sine.easeInOut
                })
            },
            selectFields: function(e) {
                TweenLite.to(e, 22 / 30, {
                    opacity: 1,
                    ease: Sine.easeInOut
                })
            },
            slideForm: function(e, i) {
                var t = 100 * (e + 1) / -3;
                Features.isTouch && (t = 200 / -3), i ? TweenLite.set(this.$el, {
                    yPercent: t
                }) : TweenLite.to(this.$el, 26 / 30, {
                    yPercent: t,
                    ease: this.ease
                })
            },
            onFocus: function(e) {
                var i = $(e.target),
                    t = i.parent();
                this.deSelectFields(this.$fields.not(t)), this.selectFields(t), this.slideForm(t.index()), this.hideFieldPlaceholder(i)
            },
            onBlur: function(e) {
                var i = $(e.target),
                    t = i.parent();
                t.index() + 1 < this.$fields.size(), this.showFieldPlaceholder(i)
            },
            isComplete: function() {
                var e = !1;
                return this.$inputs.each(function() {
                    var i = $.trim($(this).val());
                    i && i !== $(this).attr("data-placeholder") && e++
                }), e === this.$inputs.size()
            },
            onKeyUp: function(e) {
                var i = $(e.target),
                    t = i.parent(),
                    s = e.key || e.keyCode || e.which;
                if (13 === s) {
                    var n = t.index();
                    n < this.$fields.size() - 1 ? $(this.$inputs.get(n + 1)).focus() : this.sendData()
                } else this.isComplete() ? this.footer.show() : this.footer.hide()
            },
            sendData: function(e) {
                if (console.log("BbForm.sendData", arguments), e && e.preventDefault(), this.isComplete()) {
                    var i = {
                        r: "post",
                        name: $.trim(this.$('[name="name"]').val()),
                        email: $.trim(this.$('[name="email"]').val()),
                        body: $.trim(this.$('[name="searching_for"]').val())
                    };
                    $.ajax({
                        type: "POST",
                        url: "/api.php",
                        data: i,
                        success: function() {}
                    }), this.footer.$el.focus(), this.transitionToShare()
                }
            },
            transitionToShare: function() {
                this.state = "share";
                var e = this.$fields.size() - 1;
                this.slideForm(e), this.selectFields(this.$fields.last());
                var i = new TimelineLite({
                    paused: !0
                });
                i.to(this.$el, 26 / 30, {
                    yPercent: -100,
                    ease: this.ease
                }, 0), this.$fields.each(function(t) {
                    t >= e || i.to(this, 16 / 30, {
                        opacity: 0,
                        ease: Sine.easeInOut,
                        onCompleteParams: ["{self}"],
                        onComplete: function(e) {
                            $(e.target).css("visibility", "hidden")
                        }
                    }, 8 * t / 30)
                }), i.to(this.$inputs.get(e), 16 / 30, {
                    opacity: 0,
                    ease: Sine.easeInOut,
                    onCompleteParams: ["{self}"],
                    onComplete: function(e) {
                        $(e.target).css("visibility", "hidden")
                    }
                }, 8 * e / 30), i.to(this.$labels.get(e), 16 / 30, {
                    opacity: 0,
                    ease: Sine.easeInOut,
                    onCompleteParams: ["{self}"],
                    onComplete: function(e) {
                        $(e.target).css("visibility", "hidden")
                    }
                }, 8 * e / 30);
                var t = this.$('[name="name"]').val().split(" ");
                t = t[0], this.$success.text("Thank you for signing up, " + t), this.$success.css("visibility", "visible"), TweenLite.set(this.$success, {
                    opacity: 0
                }), i.to(this.$success, 16 / 30, {
                    opacity: 1,
                    ease: Sine.easeInOut
                }), i.play(), this.footer.switchToShare()
            },
            hide: function() {
                TweenLite.to(this.$el, 10 / 30, {
                    opacity: 0,
                    ease: Cubic.easeOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.$el.css({
                            display: "none",
                            visibility: "hidden",
                            opacity: 1
                        }), PubSub.trigger("bbform:hidden")
                    }
                })
            },
            onSubmit: function(e) {
                e.preventDefault()
            },
            onStateChange: function(e) {
                e == Globals.STATE_INTRO && this.hide()
            },
            shareFacebook: function(e) {
                e.preventDefault(), FB && FB.ui({
                    method: "share",
                    href: "http://bluebook.is",
                    display: "popup"
                }, function() {})
            },
            shareTwitter: function(e) {
                e.preventDefault();
                var i = "https://twitter.com/share",
                    t = $.param({
                        text: "I just signed up for Bluebook. What are you searching for? @searchbluebook #ExMachina",
                        url: "http://bluebook.is"
                    });
                i += "?" + t, Helpers.popup(i, 575, 320, "twitter")
            }
        });


    }, {
        "./bbformfooter": 22,
        "./features": 25,
        "./globals": 26,
        "./helpers": 27,
        "backbone": 2,
        "bezier-easing": 3,
        "simple-pubsub": 16,
        "underscore": 19,
        "video.js": 20
    }],
    22: [function(require, module, exports) {
        var _ = require("underscore"),
            PubSub = require("simple-pubsub"),
            Backbone = require("backbone"),
            Helpers = require("./helpers"),
            LinedBttn = require("./linedbttn");
        module.exports = Backbone.View.extend({
            events: {},
            initialize: function() {
                this.submitBttn = new LinedBttn({
                    el: this.$(".signup-form-submit")
                }), this.$share = this.$(".signup-form-share"), this.$shareMessage = this.$(".signup-form-share-message"), this.$shareButtons = this.$(".signup-form-share > div"), this.isVisible = !1, this.state = "submit"
            },
            show: function() {
                this.isVisible || "submit" == this.state && (TweenLite.killTweensOf(this.$el), TweenLite.set(this.$el, {
                    opacity: 1
                }), this.isVisible = !0, this.submitBttn.reset(), this.submitBttn.$el.css("display", "block"), this.submitBttn.show())
            },
            showShare: function() {
                this.submitBttn.$el.css("display", "none"), TweenLite.set(this.$shareMessage, {
                    opacity: 0
                }), TweenLite.set(this.$shareButtons, {
                    opacity: 0
                }), this.$share.css("display", "block"), TweenLite.to(this.$shareMessage, 17 / 30, {
                    delay: .5,
                    opacity: 1,
                    ease: Sine.easeInOut
                }), TweenLite.to(this.$shareButtons, 17 / 30, {
                    delay: 20 / 30,
                    opacity: 1,
                    ease: Sine.easeInOut
                })
            },
            switchToShare: function() {
                this.submitBttn.hide(this.showShare.bind(this))
            },
            hide: function(e) {
                this.isVisible = !1, e ? (this.submitBttn.$el.css("display", "none"), this.$share.css("display", "none"), TweenLite.set(this.$el, {
                    opacity: 1
                })) : TweenLite.to(this.$el, 17 / 30, {
                    opacity: 0,
                    ease: Sine.easeInOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.submitBttn.$el.css("display", "none"), this.$share.css("display", "none"), TweenLite.set(this.$el, {
                            opacity: 1
                        })
                    }
                })
            }
        });


    }, {
        "./helpers": 27,
        "./linedbttn": 28,
        "backbone": 2,
        "simple-pubsub": 16,
        "underscore": 19
    }],
    23: [function(require, module, exports) {
        var _ = require("underscore"),
            PubSub = require("simple-pubsub"),
            BezierEasing = require("bezier-easing"),
            Features = require("./features"),
            toFixedOne = function(t) {
                return Math.floor(10 * t) / 10
            },
            toFixedTwo = function(t) {
                return Math.floor(100 * t) / 100
            },
            BbLogo = function(t) {
                this.props = {
                    progress_0: 1,
                    progress_1: 1,
                    stroke_0: 0,
                    stroke_1: 0
                }, this.strokeWidth = 8, this.el = t, this.paths = [
                    [],
                    []
                ], this.b_pen = [331.2, 7.9], this.b_offset = 23.7, this.b_d_attribute = ["M0,0", "M0,0"], this.lengths = [
                    [],
                    []
                ], this.duration = 37 / 30, this.getPaths(), this.getBPens(), this.computeLengths(), this.setupTimeline()
            };
        BbLogo.prototype.easing = {
            progress: [new Ease(BezierEasing(1, 0, .4, 1)), new Ease(BezierEasing(0, 0, .4, 1))],
            stroke: new Ease(BezierEasing(.33, 0, .66, 1))
        }, BbLogo.prototype.getPaths = function() {
            this.paths[0] = document.getElementsByClassName("bb-logo-letter-1"), this.paths[1] = document.getElementsByClassName("bb-logo-letter-2")
        }, BbLogo.prototype.getBPens = function() {
            for (var t = 0; t < this.paths[0].length; t++) {
                var e = this.paths[0][t],
                    s = this.paths[0][t].getAttribute("d");
                this.b_d_attribute[t] = s.slice(s.indexOf(",")), Features.isIe || e.setAttribute("d", "M" + toFixedOne(this.b_pen[t]) + this.b_d_attribute[t])
            }
        }, BbLogo.prototype.computeLengths = function() {
            for (var t = 0; t < this.paths.length; t++)
                for (var e = 0; e < this.paths[t].length; e++) {
                    var s = this.paths[t][e],
                        i = s.getTotalLength();
                    s.style.strokeDasharray = i + " " + i, s.style.strokeDashoffset = i, s.style.strokeWidth = 0, this.lengths[t][e] = i
                }
        }, BbLogo.prototype.setupTimeline = function() {
            var t = 11 / 30;
            this.timeline = new TimelineLite({
                paused: !0,
                onCompleteScope: this,
                onComplete: function() {
                    PubSub.trigger("bblogo:intro_complete")
                }
            }), this.timeline.to(this.props, this.duration, {
                progress_0: 0,
                onUpdate: function() {
                    for (var t = 0; t < this.paths[0].length; t++) {
                        var e = this.paths[0][t];
                        e.style.strokeDashoffset = this.props.progress_0 * this.lengths[0][t]
                    }
                },
                onUpdateScope: this,
                ease: this.easing.progress[0]
            }, 0), this.timeline.to(this.props, this.duration, {
                stroke_0: 1,
                onUpdate: function() {
                    for (var t = 0; t < this.paths[0].length; t++) {
                        var e = this.paths[0][t];
                        e.style.strokeWidth = this.props.stroke_0 * this.strokeWidth, Features.isIe || e.setAttribute("d", "M" + toFixedOne(this.b_pen[t] + this.props.stroke_0 * this.b_offset) + this.b_d_attribute[t])
                    }
                },
                onUpdateScope: this,
                ease: this.easing.stroke
            }, 0), this.timeline.to(this.props, this.duration, {
                progress_1: 0,
                onUpdate: function() {
                    for (var t = 0; t < this.paths[1].length; t++) {
                        var e = this.paths[1][t];
                        e.style.strokeDashoffset = this.props.progress_1 * this.lengths[1][t]
                    }
                },
                onUpdateScope: this,
                ease: this.easing.progress[1]
            }, t), this.timeline.to(this.props, this.duration, {
                stroke_1: 1,
                onUpdate: function() {
                    for (var t = 0; t < this.paths[1].length; t++) {
                        var e = this.paths[1][t];
                        e.style.strokeWidth = this.props.stroke_1 * this.strokeWidth
                    }
                },
                onUpdateScope: this,
                ease: this.easing.stroke
            }, t);
            var e = $(".site-motto")[0];
            this.timeline.to(e, 20 / 30, {
                opacity: 1,
                ease: Cubic.easeInOut
            }, 1.2)
        }, BbLogo.prototype.animate = function() {
            this.timeline.play()
        }, module.exports = BbLogo;


    }, {
        "./features": 25,
        "bezier-easing": 3,
        "simple-pubsub": 16,
        "underscore": 19
    }],
    24: [function(require, module, exports) {
        var _ = require("underscore"),
            Backbone = require("backbone"),
            videojs = require("video.js"),
            Helpers = require("./helpers"),
            Features = require("./features");
        module.exports = Backbone.View.extend({
            aspect: 16 / 9,
            mouse_region: 0,
            offsets: [0, 0, 0],
            className: "bg-video",
            template: require("../templates/bgvideo.hbs"),
            initialize: function(e) {
                this.src = e.src || [], this.posterReady = !1, this.render(), this.$wrapper = this.$el.find(".bg-video-container"), this.$poster = this.$el.find(".bg-video-poster"), this.fitVideo(), this.loadPoster(), $(window).on("resize", this.fitVideo.bind(this)), Features.isIOS && Features.isAndroid || this.initPlayer()
            },
            render: function() {
                $("body").prepend(this.$el.html(this.template()))
            },
            loadPoster: function() {
                var e = this,
                    t = new Image;
                t.onload = function() {
                    e.posterReady = !0
                }, t.src = "/assets/img/poster.jpg"
            },
            hidePoster: function() {
                TweenLite.to(this.$poster, .6, {
                    opacity: 0
                })
            },
            fitVideo: function() {
                var e = $(window),
                    t = Helpers.getCoverDimensions(this.aspect, e.width(), e.height());
                this.offsets[0] = -1.5 * t[3], this.offsets[2] = .5 * t[3], this.$wrapper.css({
                    width: t[0],
                    height: t[1],
                    top: t[2],
                    left: 1.5 * t[3]
                })
            },
            initPlayer: function() {
                var e = "";
                _.each(this.src, function(t) {
                    e += '<source src="' + t.src + '" type="' + t.type + '">'
                }), this.$wrapper.prepend('<video id="bg-video-loop" class="video-js" preload="auto" width="100%" height="100%" webkit-playsinline>' + e + "</video>");
                var t = this,
                    i = videojs(this.$el.find(".video-js")[0], {
                        controls: !1,
                        preload: "auto",
                        techOrder: ["html5", "flash"],
                        loop: !0
                    });
                i.on("canplay", function() {
                    this.off("canplay"), t.hidePoster()
                }), i.on("error", function(e) {
                    var i = e.target.error ? e.target.error.code : e.code,
                        o = {
                            1: "The video download was cancelled",
                            2: "The video connection was lost, please confirm you're connected to the internet",
                            3: "The video is bad or in a format that can't be played on your browser",
                            4: "This video is either unavailable or not supported in this browser",
                            5: "The video you're trying to watch is encrypted and we don't know how to decrypt it",
                            unknown: "An unanticipated problem was encountered, check back soon and try again"
                        };
                    return console.log(o[i] || o.unknown), 2 == i ? void this.play() : (this.pause().off(), void(t.opts.onError && t.opts.onError(this, i)))
                }), i.ready(function() {
                    this.muted(!0), t.isReady = !0, t.player = this, this.play()
                })
            }
        });


    }, {
        "../templates/bgvideo.hbs": 37,
        "./features": 25,
        "./helpers": 27,
        "backbone": 2,
        "underscore": 19,
        "video.js": 20
    }],
    25: [function(require, module, exports) {
        var addDocClass = function(i) {
            var e = document.documentElement,
                a = "" == e.className ? "" : " ";
            e.className = e.className + a + i
        };
        window.URL = window.URL || window.webkitURL;
        var isIe = !1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var ua = navigator.userAgent,
                re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            null !== re.exec(ua) && (isIe = parseFloat(RegExp.$1))
        } else if ("Netscape" == navigator.appName) {
            var ua = navigator.userAgent,
                re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
            null !== re.exec(ua) && (isIe = parseFloat(RegExp.$1))
        }
        isIe && addDocClass("ie ie-" + isIe);
        var isIOS = function() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent)
        };
        isIOS() && addDocClass("ios");
        var isAndroid = function() {
            return /Android/i.test(navigator.userAgent)
        };
        isAndroid() && addDocClass("android");
        var maxSize = 736,
            isMobile = window.innerWidth <= maxSize && window.outerWidth <= maxSize ? !0 : !1,
            isTouch = !1;
        ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (isTouch = !0);
        var isTablet = isTouch && !isMobile;
        isMobile && addDocClass("mobile"), isTablet && addDocClass("tablet"), addDocClass(isTouch ? "touch" : "no-touch"), module.exports = {
            isMobile: isMobile,
            isIe: isIe,
            isTouch: isTouch,
            isTablet: isTablet,
            isIOS: isIOS(),
            isAndroid: isAndroid()
        };


    }, {}],
    26: [function(require, module, exports) {
        module.exports = {
            STATE_INTRO: "intro",
            STATE_FORM: "form"
        };


    }, {}],
    27: [function(require, module, exports) {
        function htmlEntities(e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }

        function dist(e, t) {
            var n, i;
            return Math.sqrt((n = e.x - t.x) * n + (i = e.y - t.y) * i)
        }
        var getWindowSize = function() {
                var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    t = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                return {
                    width: e,
                    height: t
                }
            },
            getCoverDimensions = function(e, t, n) {
                var i, o, r, d, c = t / n;
                return e > c ? (i = n * e, o = n, r = .5 * (t - i), d = 0) : (i = t, o = t / e, d = .5 * (n - o), r = 0), [i, o, d, r]
            },
            twoToThree = function(e, t, n) {
                var i = e.clone();
                i.unproject(t);
                var o = new THREE.Ray(t.position, i.sub(t.position).normalize());
                return o.intersectPlane(n) || new THREE.Vector3
            },
            popup = function(e, t, n, i) {
                var o = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
                    r = void 0 !== window.screenTop ? window.screenTop : screen.top,
                    d = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    c = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                    u = d / 2 - t / 2 + o,
                    w = c / 2 - n / 2 + r,
                    h = e,
                    m = "status=1,width=" + t + ",height=" + n + ",top=" + w + ",left=" + u;
                window.open(h, i, m)
            };
        module.exports = {
            getWindowSize: getWindowSize,
            getCoverDimensions: getCoverDimensions,
            htmlEntities: htmlEntities,
            dist: dist,
            twoToThree: twoToThree,
            popup: popup
        };


    }, {}],
    28: [function(require, module, exports) {
        var _ = require("underscore"),
            PubSub = require("simple-pubsub"),
            Backbone = require("backbone"),
            Features = require("./features"),
            Helpers = require("./helpers");
        module.exports = Backbone.View.extend({
            lineOpacityMax: .7,
            widths: {
                start: 5,
                live: 90,
                hover: 128
            },
            events: {
                mouseenter: "onMouseEnter",
                mouseleave: "onMouseLeave"
            },
            initialize: function() {
                this.$line = this.$(".line"), this.$text = this.$("a"), this.reset()
            },
            reset: function() {
                this.isLive = !1, TweenLite.set(this.$text, {
                    opacity: 0
                }), TweenLite.set(this.$line, {
                    width: this.widths.start,
                    opacity: 0
                })
            },
            show: function(e) {
                var t = new TimelineLite({
                    onCompleteScope: this,
                    onComplete: function() {
                        this.isLive = !0, e && e()
                    }
                });
                t.to(this.$text, 14 / 30, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                }), t.to(this.$line, 7 / 30, {
                    opacity: this.lineOpacityMax,
                    ease: Linear.easeNone
                }, 7 / 30), t.to(this.$line, 20 / 30, {
                    width: this.widths.live,
                    ease: Cubic.easeInOut
                }, 14 / 30)
            },
            hide: function(e) {
                this.isLive = !1;
                var t = new TimelineLite({
                    onCompleteScope: this,
                    onComplete: function() {
                        e && e()
                    }
                });
                t.to(this.$text, .4, {
                    opacity: 0,
                    ease: Cubic.easeInOut
                }), t.to(this.$line, 20 / 30, {
                    width: this.widths.start,
                    ease: Cubic.easeInOut
                }, 0), t.to(this.$line, 8 / 30, {
                    opacity: 0,
                    ease: Linear.easeNone
                }, 20 / 30)
            },
            onMouseEnter: function() {
                this.isLive && (Features.isTouch || (TweenLite.to(this.$text, 10 / 30, {
                    opacity: .5,
                    ease: Cubic.easeOut
                }), TweenLite.to(this.$line, 10 / 30, {
                    width: this.widths.hover,
                    ease: Cubic.easeInOut
                })))
            },
            onMouseLeave: function() {
                this.isLive && (Features.isTouch || (TweenLite.to(this.$text, 10 / 30, {
                    opacity: 1,
                    ease: Cubic.easeOut
                }), TweenLite.to(this.$line, 10 / 30, {
                    width: this.widths.live,
                    ease: Cubic.easeInOut
                })))
            }
        });


    }, {
        "./features": 25,
        "./helpers": 27,
        "backbone": 2,
        "simple-pubsub": 16,
        "underscore": 19
    }],
    29: [function(require, module, exports) {
        var _ = require("underscore"),
            Backbone = require("backbone"),
            PubSub = require("simple-pubsub"),
            BezierEasing = require("bezier-easing"),
            videojs = require("video.js"),
            Helpers = require("./helpers"),
            Features = require("./features"),
            Globals = require("./globals"),
            BbLogo = require("./bblogo");
        module.exports = Backbone.View.extend({
            lineOpacityMax: .6,
            width: {
                responsive: Features.isMobile ? 80 : 42.9,
                fixed: 160
            },
            easing: new Ease(BezierEasing(.6, 0, 0, 1)),
            events: {
                "click .bb-logo": "onLogoClick"
            },
            initialize: function() {
                this.currentState = Globals.STATE_INTRO, this.isMinimized = !1, this.$logo = this.$(".bb-logo"), this.logo = new BbLogo(this.$logo[0]), this.$world = this.$(".site-header-world"), TweenLite.set(this.$world, {
                    xPercent: -50,
                    yPercent: -92
                }), this.$world.css({
                    width: this.width.responsive + "%"
                }), this.$text = this.$(".site-motto"), this.listenTo(PubSub, "content:visible", this.reveal), this.listenTo(PubSub, "startbttn:transitionlogo", this.minimize), this.listenTo(PubSub, "state:change", this.onStateChange), this.mouse = {
                    x: 0,
                    y: 0
                }, Features.isTouch || this.trackMouse()
            },
            reveal: function() {
                this.$logo.css("visibility", "visible"), this.logo.animate()
            },
            toggle: function() {
                this.isMinimized ? this.maximize() : this.minimize()
            },
            minimize: function() {
                if (!this.isMinimized) {
                    this.isMinimized = !0, this.$el.addClass("minimized"), this.fixRotation();
                    var i = this.$world.width();
                    this.$world.css({
                        width: i + "px"
                    });
                    var e = this.width.fixed / i;
                    TweenLite.to(this.$logo, 35 / 30, {
                        scale: e,
                        ease: this.easing
                    }), TweenLite.to(this.$text, 20 / 30, {
                        opacity: 0,
                        ease: Cubic.easeInOut
                    }), TweenLite.to(this.$el, 35 / 30, {
                        yPercent: -100,
                        y: 45,
                        ease: this.easing
                    })
                }
            },
            maximize: function() {
                if (this.isMinimized) {
                    this.isMinimized = !1, this.$el.removeClass("minimized");
                    var i = this.$el.width() * this.width.responsive / 100,
                        e = this.width.fixed / i;
                    TweenLite.set(this.$logo, {
                        scale: e
                    }), this.$world.css({
                        width: this.width.responsive + "%"
                    }), TweenLite.to(this.$logo, 35 / 30, {
                        scale: 1,
                        ease: this.easing
                    }), TweenLite.to(this.$text, 20 / 30, {
                        opacity: 1,
                        ease: Cubic.easeInOut
                    }), TweenLite.to(this.$el, 35 / 30, {
                        yPercent: 0,
                        y: 0,
                        ease: this.easing
                    })
                }
            },
            rotate3d: function() {
                if (!this.isMinimized) {
                    var i = this.mouse.x / window.innerWidth * 2 - 1,
                        e = 2 * -(this.mouse.y / window.innerHeight) + 1;
                    TweenLite.to(this.$world, 25 / 30, {
                        x: 10 * i,
                        y: -5 * e,
                        rotationX: 3 * e,
                        rotationY: 6 * i,
                        ease: Quart.easeOut
                    })
                }
            },
            fixRotation: function() {
                TweenLite.to(this.$world, 25 / 30, {
                    x: 0,
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    ease: Quart.easeOut
                })
            },
            trackMouse: function() {
                var i = _.throttle(this.rotate3d.bind(this), 100);
                window.addEventListener("mousemove", function(e) {
                    this.mouse.x = e.clientX, this.mouse.y = e.clientY, i()
                }.bind(this))
            },
            onStateChange: function(i) {
                i == Globals.STATE_INTRO && this.maximize(), this.currentState = i
            },
            onLogoClick: function() {
                this.currentState != Globals.STATE_INTRO && PubSub.trigger("state:change", Globals.STATE_INTRO)
            }
        });


    }, {
        "./bblogo": 23,
        "./features": 25,
        "./globals": 26,
        "./helpers": 27,
        "backbone": 2,
        "bezier-easing": 3,
        "simple-pubsub": 16,
        "underscore": 19,
        "video.js": 20
    }],
    30: [function(require, module, exports) {
        var Particle = function(t, i) {
            this.id = i, this.born = Date.now(), this.age = -i % 60, this.vel = {
                x: this.getRandomSpeed(),
                y: this.getRandomSpeed()
            }, this.acc = 1, this.bounds = t, this.color = new THREE.Color(1, 1, 1), this.mouseDist = 1e4, this.mouseFraction = 0, this.opacity = 0, this.vertex = new THREE.Vector3(t.x[0] + Math.random() * (t.x[1] - t.x[0]), t.y[0] + Math.random() * (t.y[1] - t.y[0]), t.z[0] + Math.random() * (t.z[1] - t.z[0]))
        };
        Particle.prototype.getRandomSpeed = function() {
            return .15 * Math.random() + -.075
        }, Particle.prototype.update = function() {
            if (this.age++, 2 == this.id, this.age < 0) return void(this.vertex.z = 0);
            if (0 === this.age) return this.opacity += .05, void(this.vertex.z = this.bounds.z[0] + Math.random() * (this.bounds.z[1] - this.bounds.z[0]));
            this.opacity < 1 ? this.opacity += .05 : this.opacity = 1, (this.vertex.x < this.bounds.x[0] || this.vertex.x > this.bounds.x[1] || this.vertex.y < this.bounds.y[0] || this.vertex.y > this.bounds.y[1]) && (this.vel.x = this.getRandomSpeed(), this.vel.y = this.getRandomSpeed());
            var t = 1;
            this.acc = .09 * (t - this.acc) + this.acc, this.vertex.x += this.vel.x * this.acc, this.vertex.y += this.vel.y * this.acc
        }, module.exports = Particle;


    }, {}],
    31: [function(require, module, exports) {
        var _ = require("underscore"),
            Backbone = require("backbone"),
            videojs = require("video.js"),
            Helpers = require("./helpers"),
            Features = require("./features"),
            PubSub = require("simple-pubsub"),
            Particle = require("./particle"),
            Globals = require("./globals");
        module.exports = Backbone.View.extend({
            maxNodes: Features.isMobile ? 110 : Features.isTablet ? 150 : 200,
            maxEdges: 1e5,
            maxEdgeLength: Features.isMobile ? Math.pow(40, 2) : Math.pow(45, 2),
            maxLineOpacity: .3,
            depth: Features.isMobile ? 80 : 125,
            particlesCenter: {
                x: 0,
                y: 0,
                z: 350
            },
            cameraYRot: 8 * Math.PI / 180,
            cameraXRot: 14 * Math.PI / 180,
            addCube: function(e, t, i) {
                var s = new THREE.BoxGeometry(4, 4, 4),
                    r = new THREE.MeshBasicMaterial({
                        color: 16776960
                    }),
                    a = new THREE.Mesh(s, r);
                a.position.x = e, a.position.y = t, a.position.z = i, this.scene.add(a)
            },
            initialize: function() {
                this.isAnimating = !1, this.listenTo(PubSub, "state:change", this.onStateChange), this.renderer = new THREE.WebGLRenderer({
                    alpha: !0
                }), this.renderer.setPixelRatio(window.devicePixelRatio || 1), this.renderer.setSize(window.innerWidth, window.innerHeight), this.$el.insertAfter($(".bg-video")), this.$el.append(this.renderer.domElement), TweenLite.set(this.$el, {
                    opacity: 0
                }), this.scene = new THREE.Scene, this.lookAt = new THREE.Vector3(0, 0, -1 * this.particlesCenter.z), this.createCamera(), this.createWorld(), this.listenTo(PubSub, "content:visible", function() {
                    this.fadeView(1, .5), this.start()
                }.bind(this)), Features.isTouch || this.trackMouse();
                var e = _.debounce(this.onWindowResize.bind(this), 500);
                this.listenTo(PubSub, "window:resize", function(t) {
                    this.isResizing = !0, this.stop(), e(t)
                })
            },
            trackMouse: function() {
                this.mouse = new THREE.Vector2;
                var e = _.throttle(this.updateCamera.bind(this), 100);
                window.addEventListener("mousemove", function(t) {
                    this.mouse.x = t.clientX, this.mouse.y = t.clientY, e()
                }.bind(this))
            },
            createCamera: function() {
                this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1e3), this.camera.lookAt(this.lookAt)
            },
            computeBounds: function() {
                this.particlePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), this.particlesCenter.z), this.BOUNDS = {
                    x: [0, 0],
                    y: [0, 0],
                    z: [-1 * this.particlesCenter.z - this.depth, -1 * this.particlesCenter.z + this.depth]
                };
                var e = Helpers.twoToThree(new THREE.Vector3(-1, 1, 0), this.camera, this.particlePlane),
                    t = Helpers.twoToThree(new THREE.Vector3(1, -1, 0), this.camera, this.particlePlane);
                this.BOUNDS.x[0] = e.x, this.BOUNDS.x[1] = t.x, this.BOUNDS.y[0] = t.y, this.BOUNDS.y[1] = e.y
            },
            createWorld: function() {
                this.computeBounds(), this.createParticles(), this.createLines()
            },
            onWindowResize: function(e) {
                TweenLite.killTweensOf(this.camera.position), TweenLite.killTweensOf(this.camera.rotation), this.clean(), this.renderer.setSize(e.width, e.height), this.createCamera(), this.createWorld(), this.start(), this.isResizing = !1
            },
            createParticles: function() {
                this.particles = new THREE.Geometry, this.particlesList = [];
                for (var e = this.maxNodes, t = new THREE.PointCloudMaterial({
                        color: 16777215,
                        map: THREE.ImageUtils.loadTexture("/assets/img/particle-gl.png"),
                        size: 9,
                        transparent: !0,
                        vertexColors: THREE.VertexColors,
                        depthTest: !1,
                        opacity: .7
                    }), i = 0; e > i; i++) {
                    var s = new Particle(this.BOUNDS, i);
                    this.particles.vertices.push(s.vertex), this.particles.colors.push(s.color), this.particlesList.push(s)
                }
                this.particleSystem = new THREE.PointCloud(this.particles, t), this.scene.add(this.particleSystem)
            },
            updateParticles: function() {
                for (var e = 0; e < this.particlesList.length; e++) {
                    var t = this.particlesList[e];
                    t.update()
                }
                this.particleSystem.geometry.verticesNeedUpdate = !0
            },
            createLines: function() {
                var e = require("../shaders/line.vert"),
                    t = require("../shaders/line.frag"),
                    i = new THREE.ShaderMaterial({
                        vertexShader: e(),
                        fragmentShader: t(),
                        vertexColors: THREE.VertexColors,
                        transparent: !0,
                        depthWrite: !1
                    });
                this.lineGeometry = new THREE.Geometry;
                for (var s = 0, r = !1, a = 0; a < this.particlesList.length; a++) {
                    var n = this.particlesList[a];
                    if (!(n.age < 1)) {
                        var o = 0;
                        if (r) break;
                        for (var h = a; h < this.particlesList.length; h++) {
                            var c = this.particlesList[h];
                            if (!(c.age < 1)) {
                                var l = n.vertex.distanceToSquared(c.vertex);
                                if (l < this.maxEdgeLength) {
                                    if (s++, o++, s > this.maxEdges) {
                                        s--, r = !0;
                                        break
                                    }
                                    var d = 1,
                                        p = l / this.maxEdgeLength;
                                    p > .5 && (d = 2 - 2 * p);
                                    var m = this.maxLineOpacity * Math.min(n.opacity, c.opacity),
                                        u = new THREE.Color(d, m, d);
                                    this.lineGeometry.vertices.push(n.vertex), this.lineGeometry.vertices.push(c.vertex), this.lineGeometry.colors.push(u), this.lineGeometry.colors.push(u)
                                }
                            }
                        }
                    }
                }
                this.lines = new THREE.Line(this.lineGeometry, i, THREE.LinePieces), this.scene.add(this.lines)
            },
            updateLines: function() {
                for (var e = 0, t = !1, i = 0; i < this.particlesList.length; i++) {
                    var s = this.particlesList[i],
                        r = 0;
                    if (t) break;
                    for (var a = i; a < this.particlesList.length; a++) {
                        var n = this.particlesList[a],
                            o = s.vertex.distanceToSquared(n.vertex);
                        if (o < this.maxEdgeLength) {
                            if (e += 1, r++, r > 4) {
                                e--;
                                break
                            }
                            if (e > this.maxEdges) {
                                e--, t = !0;
                                break
                            }
                            var h = 2 * (e - 1),
                                c = 1 - o / this.maxEdgeLength;
                            this.lineGeometry.vertices[h] = s.vertex, this.lineGeometry.vertices[h + 1] = n.vertex;
                            var l = this.maxLineOpacity;
                            this.lineGeometry.colors[h] ? (this.lineGeometry.colors[h].r = c, this.lineGeometry.colors[h].g = l) : this.lineGeometry.colors[h] = new THREE.Color(c, l, c), this.lineGeometry.colors[h + 1] ? (this.lineGeometry.colors[h + 1].r = c, this.lineGeometry.colors[h + 1].g = l) : this.lineGeometry.colors[h + 1] = new THREE.Color(c, l, c)
                        }
                    }
                }
                this.lines.geometry.verticesNeedUpdate = !0, this.lines.geometry.colorsNeedUpdate = !0
            },
            updateCamera: function() {
                if (!this.isResizing) {
                    var e = this.mouse.x / window.innerWidth * 2 - 1,
                        t = 2 * -(this.mouse.y / window.innerHeight) + 1;
                    TweenLite.killTweensOf(this.camera.position), TweenLite.killTweensOf(this.camera.rotation);
                    var i = this.camera.position.clone(),
                        s = this.camera.rotation.clone(),
                        r = new THREE.Euler(-50 * e, -30 * t, i.z),
                        a = this.lookAt.clone();
                    a.x = -5 * e, a.y = -3 * t, this.camera.position.copy(r), this.camera.lookAt(a);
                    var n = this.camera.rotation.clone();
                    this.camera.position.copy(i), this.camera.rotation.copy(s), TweenLite.to(this.camera.position, 25 / 30, {
                        x: r.x,
                        y: r.y,
                        ease: Quart.easeOut
                    }), TweenLite.to(this.camera.rotation, 25 / 30, {
                        x: n.x,
                        y: n.y,
                        z: n.z,
                        ease: Quart.easeOut
                    })
                }
            },
            start: function() {
                this.isAnimating = !0, this.loop()
            },
            stop: function() {
                this.isAnimating = !1
            },
            loop: function() {
                this.render(), this.isAnimating && requestAnimationFrame(this.loop.bind(this))
            },
            render: function() {
                this.updateParticles(), this.scene.remove(this.lines), this.lineGeometry.dispose(), this.createLines(), this.renderer.render(this.scene, this.camera)
            },
            clean: function() {
                this.scene.remove(this.particleSystem), this.scene.remove(this.lines), this.lineGeometry.dispose(), this.particles.dispose()
            },
            onStateChange: function(e) {
                e == Globals.STATE_INTRO ? this.fadeView(1, 28 / 30) : e == Globals.STATE_FORM && this.fadeView(.6, 28 / 30)
            },
            fadeView: function(e, t) {
                TweenLite.to(this.$el, t, {
                    opacity: e,
                    ease: Sine.easeInOut
                })
            }
        });


    }, {
        "../shaders/line.frag": 35,
        "../shaders/line.vert": 36,
        "./features": 25,
        "./globals": 26,
        "./helpers": 27,
        "./particle": 30,
        "backbone": 2,
        "simple-pubsub": 16,
        "underscore": 19,
        "video.js": 20
    }],
    32: [function(require, module, exports) {
        ! function() {
            for (var n, e = function() {}, i = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], o = i.length, t = window.console = window.console || {}; o--;) n = i[o], t[n] || (t[n] = e)
        }(),
        function() {
            for (var n = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
                var i = (new Date).getTime(),
                    o = Math.max(0, 16 - (i - n)),
                    t = window.setTimeout(function() {
                        e(i + o)
                    }, o);
                return n = i + o, t
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(n) {
                clearTimeout(n)
            })
        }();


    }, {}],
    33: [function(require, module, exports) {
        require("howler");
        var _ = require("underscore"),
            Backbone = require("backbone"),
            Helpers = require("./helpers"),
            Features = require("./features");
        module.exports = Backbone.View.extend({
            events: {
                click: "toggle"
            },
            initialize: function(e) {
                e = e || {}, this.isMuted = !0;
                var t = this;
                this.sound = new Howl({
                    urls: e.src,
                    buffer: !0,
                    loop: !0,
                    onload: function() {
                        t.unmute();
                        this.play()
                    }
                })
            },
            mute: function() {
                Howler.mute(), this.isMuted = !0, this.$el.addClass("muted")
            },
            unmute: function() {
                Howler.unmute(), this.isMuted = !1, this.$el.removeClass("muted")
            },
            toggle: function() {
                this.isMuted ? this.unmute() : this.mute()
            }
        });


    }, {
        "./features": 25,
        "./helpers": 27,
        "backbone": 2,
        "howler": 12,
        "underscore": 19
    }],
    34: [function(require, module, exports) {
        var _ = require("underscore"),
            PubSub = require("simple-pubsub"),
            Backbone = require("backbone"),
            videojs = require("video.js"),
            Helpers = require("./helpers"),
            Features = require("./features"),
            Globals = require("./globals"),
            LinedBttn = require("./linedbttn");
        module.exports = Backbone.View.extend({
            lineOpacityMax: .7,
            events: {
                "mouseenter .signup-start-button": "onMouseEnter",
                "mouseleave .signup-start-button": "onMouseLeave",
                "click .signup-start-button": "onClick"
            },
            initialize: function() {
                this.$line = this.$(".line-start"), this.$text = this.$(".signup-start-button"), this.isLive = !1, this.listenTo(PubSub, "bblogo:intro_complete", this.reveal), this.listenTo(PubSub, "bbform:hidden", function() {
                    this.reset(), this.$el.css("display", "block"), this.reveal()
                }.bind(this))
            },
            reset: function() {
                this.$text.css({
                    opacity: 0
                }), this.$line.css({
                    left: "50%",
                    width: "5px",
                    opacity: 0
                })
            },
            reveal: function() {
                var e = new TimelineLite({
                    delay: .6,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.isLive = !0
                    }
                });
                e.to(this.$text, 14 / 30, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                }), e.to(this.$line, 8 / 30, {
                    opacity: this.lineOpacityMax,
                    ease: Linear.easeNone
                }, .3), e.to(this.$line, 26 / 30, {
                    width: "90px",
                    ease: Cubic.easeInOut
                }, 17 / 30)
            },
            onClick: function() {
                PubSub.trigger("state:change", Globals.STATE_FORM), this.transitionAnimation()
            },
            transitionAnimation: function() {
                this.isLive = !1, TweenLite.set(this.$text, {
                    opacity: .25
                });
                var e = new TimelineLite({
                    delay: .1
                });
                e.set(this.$text, {
                    opacity: .5
                }, 0), e.to(this.$text, 8 / 30, {
                    opacity: 0,
                    ease: Sine.easeInOut
                }), TweenLite.to(this.$line, 20 / 30, {
                    left: (Features.isMobile ? 46 : 27) + "%",
                    width: "100%",
                    ease: Cubic.easeInOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        PubSub.trigger("startbttn:expanded", this.$line.offset()), this.$el.css("display", "none")
                    }
                }), setTimeout(function() {
                    PubSub.trigger("startbttn:transitionlogo")
                }, Math.floor(500))
            },
            onMouseEnter: function() {
                this.isLive && (Features.isTouch || (TweenLite.to(this.$text, 10 / 30, {
                    opacity: .5,
                    ease: Cubic.easeOut
                }), TweenLite.to(this.$line, 10 / 30, {
                    width: "128px",
                    ease: Cubic.easeInOut
                })))
            },
            onMouseLeave: function() {
                this.isLive && (Features.isTouch || (TweenLite.to(this.$text, 10 / 30, {
                    opacity: 1,
                    ease: Cubic.easeOut
                }), TweenLite.to(this.$line, 10 / 30, {
                    width: "90px",
                    ease: Cubic.easeInOut
                })))
            }
        });


    }, {
        "./features": 25,
        "./globals": 26,
        "./helpers": 27,
        "./linedbttn": 28,
        "backbone": 2,
        "simple-pubsub": 16,
        "underscore": 19,
        "video.js": 20
    }],
    35: [function(require, module, exports) {
        module.exports = function(o) {
            var r = "varying vec3 vColor; \n \nvoid main() { \n	// vColor.r = relative opacity \n	// vColor.g = opacity scale \n  gl_FragColor = vec4(1, 1, 1, vColor.r*vColor.g); \n} \n";
            o = o || {};
            for (var n in o) {
                var v = new RegExp("{{" + n + "}}", "g");
                r = r.replace(v, o[n])
            }
            return r
        };


    }, {}],
    36: [function(require, module, exports) {
        module.exports = function(n) {
            var o = "varying vec3 vColor; \n \nvoid main() { \n	vColor = color; \n  gl_Position = projectionMatrix * \n                modelViewMatrix * \n                vec4(position,1.0); \n} \n";
            n = n || {};
            for (var r in n) {
                var i = new RegExp("{{" + r + "}}", "g");
                o = o.replace(i, n[r])
            }
            return o
        };


    }, {}],
    37: [function(require, module, exports) {
        var templater = require("handlebars/runtime")["default"].template;
        module.exports = templater({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '<div class="bg-video-container">\n  <img class="bg-video-poster" src="">\n</div>'
            },
            useData: !0
        });


    }, {
        "handlebars/runtime": 11
    }]
}, {}, [1]);
