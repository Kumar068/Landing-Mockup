function er(e, t) {
    const n = Object.create(null)
      , r = e.split(",");
    for (let s = 0; s < r.length; s++)
        n[r[s]] = !0;
    return t ? s=>!!n[s.toLowerCase()] : s=>!!n[s]
}
const q = {}
  , ht = []
  , Oe = ()=>{}
  , So = ()=>!1
  , Ro = /^on[^a-z]/
  , an = e=>Ro.test(e)
  , tr = e=>e.startsWith("onUpdate:")
  , te = Object.assign
  , nr = (e,t)=>{
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , Lo = Object.prototype.hasOwnProperty
  , L = (e,t)=>Lo.call(e, t)
  , C = Array.isArray
  , gt = e=>dn(e) === "[object Map]"
  , ps = e=>dn(e) === "[object Set]"
  , $ = e=>typeof e == "function"
  , X = e=>typeof e == "string"
  , rr = e=>typeof e == "symbol"
  , V = e=>e !== null && typeof e == "object"
  , hs = e=>V(e) && $(e.then) && $(e.catch)
  , gs = Object.prototype.toString
  , dn = e=>gs.call(e)
  , No = e=>dn(e).slice(8, -1)
  , ms = e=>dn(e) === "[object Object]"
  , sr = e=>X(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , Gt = er(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , pn = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , jo = /-(\w)/g
  , $e = pn(e=>e.replace(jo, (t,n)=>n ? n.toUpperCase() : ""))
  , Do = /\B([A-Z])/g
  , yt = pn(e=>e.replace(Do, "-$1").toLowerCase())
  , hn = pn(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , Pn = pn(e=>e ? `on ${hn(e)}` : "")
  , Nt = (e,t)=>!Object.is(e, t)
  , An = (e,t)=>{
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , rn = (e,t,n)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , Ho = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let Ir;
const Ln = ()=>Ir || (Ir = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function or(e) {
    if (C(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n]
              , s = X(r) ? Wo(r) : or(r);
            if (s)
                for (const o in s)
                    t[o] = s[o]
        }
        return t
    } else {
        if (X(e))
            return e;
        if (V(e))
            return e
    }
}
const Uo = /;(?![^(]*\))/g
  , Bo = /:([^]+)/
  , Ko = new RegExp("\\/\\*.*?\\*\\/","gs");
function Wo(e) {
    const t = {};
    return e.replace(Ko, "").split(Uo).forEach(n=>{
        if (n) {
            const r = n.split(Bo);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }
    ),
    t
}
function lr(e) {
    let t = "";
    if (X(e))
        t = e;
    else if (C(e))
        for (let n = 0; n < e.length; n++) {
            const r = lr(e[n]);
            r && (t += r + " ")
        }
    else if (V(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const ko = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , qo = er(ko);
function vs(e) {
    return !!e || e === ""
}
const ec = e=>X(e) ? e : e == null ? "" : C(e) || V(e) && (e.toString === gs || !$(e.toString)) ? JSON.stringify(e, bs, 2) : String(e)
  , bs = (e,t)=>t && t.__v_isRef ? bs(e, t.value) : gt(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((n,[r,s])=>(n[`${r} =>`] = s,
    n), {})
} : ps(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : V(t) && !C(t) && !ms(t) ? String(t) : t;
let ye;
class zo {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = ye,
        !t && ye && (this.index = (ye.scopes || (ye.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = ye;
            try {
                return ye = this,
                t()
            } finally {
                ye = n
            }
        }
    }
    on() {
        ye = this
    }
    off() {
        ye = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0,
            r = this.effects.length; n < r; n++)
                this.effects[n].stop();
            for (n = 0,
            r = this.cleanups.length; n < r; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                r = this.scopes.length; n < r; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s,
                s.index = this.index)
            }
            this.parent = void 0,
            this._active = !1
        }
    }
}
function Vo(e, t=ye) {
    t && t.active && t.effects.push(e)
}
function Yo() {
    return ye
}
const ir = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , _s = e=>(e.w & ke) > 0
  , ys = e=>(e.n & ke) > 0
  , Jo = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= ke
}
  , Xo = e=>{
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const s = t[r];
            _s(s) && !ys(s) ? s.delete(e) : t[n++] = s,
            s.w &= ~ke,
            s.n &= ~ke
        }
        t.length = n
    }
}
  , Nn = new WeakMap;
let Ft = 0
  , ke = 1;
const jn = 30;
let Ee;
const et = Symbol("")
  , Dn = Symbol("");
class ur {
    constructor(t, n=null, r) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        Vo(this, r)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = Ee
          , n = Be;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = Ee,
            Ee = this,
            Be = !0,
            ke = 1 << ++Ft,
            Ft <= jn ? Jo(this) : Mr(this),
            this.fn()
        } finally {
            Ft <= jn && Xo(this),
            ke = 1 << --Ft,
            Ee = this.parent,
            Be = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        Ee === this ? this.deferStop = !0 : this.active && (Mr(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function Mr(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let Be = !0;
const ws = [];
function wt() {
    ws.push(Be),
    Be = !1
}
function Et() {
    const e = ws.pop();
    Be = e === void 0 ? !0 : e
}
function ge(e, t, n) {
    if (Be && Ee) {
        let r = Nn.get(e);
        r || Nn.set(e, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = ir()),
        Es(s)
    }
}
function Es(e, t) {
    let n = !1;
    Ft <= jn ? ys(e) || (e.n |= ke,
    n = !_s(e)) : n = !e.has(Ee),
    n && (e.add(Ee),
    Ee.deps.push(e))
}
function Le(e, t, n, r, s, o) {
    const l = Nn.get(e);
    if (!l)
        return;
    let i = [];
    if (t === "clear")
        i = [...l.values()];
    else if (n === "length" && C(e)) {
        const u = Number(r);
        l.forEach((f,d)=>{
            (d === "length" || d >= u) && i.push(f)
        }
        )
    } else
        switch (n !== void 0 && i.push(l.get(n)),
        t) {
        case "add":
            C(e) ? sr(n) && i.push(l.get("length")) : (i.push(l.get(et)),
            gt(e) && i.push(l.get(Dn)));
            break;
        case "delete":
            C(e) || (i.push(l.get(et)),
            gt(e) && i.push(l.get(Dn)));
            break;
        case "set":
            gt(e) && i.push(l.get(et));
            break
        }
    if (i.length === 1)
        i[0] && Hn(i[0]);
    else {
        const u = [];
        for (const f of i)
            f && u.push(...f);
        Hn(ir(u))
    }
}
function Hn(e, t) {
    const n = C(e) ? e : [...e];
    for (const r of n)
        r.computed && $r(r);
    for (const r of n)
        r.computed || $r(r)
}
function $r(e, t) {
    (e !== Ee || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const Qo = er("__proto__,__v_isRef,__isVue")
  , xs = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(rr))
  , Zo = cr()
  , Go = cr(!1, !0)
  , el = cr(!0)
  , Sr = tl();
function tl() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...n) {
            const r = N(this);
            for (let o = 0, l = this.length; o < l; o++)
                ge(r, "get", o + "");
            const s = r[t](...n);
            return s === -1 || s === !1 ? r[t](...n.map(N)) : s
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...n) {
            wt();
            const r = N(this)[t].apply(this, n);
            return Et(),
            r
        }
    }
    ),
    e
}
function nl(e) {
    const t = N(this);
    return ge(t, "has", e),
    t.hasOwnProperty(e)
}
function cr(e=!1, t=!1) {
    return function(r, s, o) {
        if (s === "__v_isReactive")
            return !e;
        if (s === "__v_isReadonly")
            return e;
        if (s === "__v_isShallow")
            return t;
        if (s === "__v_raw" && o === (e ? t ? bl : Fs : t ? As : Ps).get(r))
            return r;
        const l = C(r);
        if (!e) {
            if (l && L(Sr, s))
                return Reflect.get(Sr, s, o);
            if (s === "hasOwnProperty")
                return nl
        }
        const i = Reflect.get(r, s, o);
        return (rr(s) ? xs.has(s) : Qo(s)) || (e || ge(r, "get", s),
        t) ? i : re(i) ? l && sr(s) ? i : i.value : V(i) ? e ? dr(i) : mn(i) : i
    }
}
const rl = Os()
  , sl = Os(!0);
function Os(e=!1) {
    return function(n, r, s, o) {
        let l = n[r];
        if (bt(l) && re(l) && !re(s))
            return !1;
        if (!e && (!sn(s) && !bt(s) && (l = N(l),
        s = N(s)),
        !C(n) && re(l) && !re(s)))
            return l.value = s,
            !0;
        const i = C(n) && sr(r) ? Number(r) < n.length : L(n, r)
          , u = Reflect.set(n, r, s, o);
        return n === N(o) && (i ? Nt(s, l) && Le(n, "set", r, s) : Le(n, "add", r, s)),
        u
    }
}
function ol(e, t) {
    const n = L(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && Le(e, "delete", t, void 0),
    r
}
function ll(e, t) {
    const n = Reflect.has(e, t);
    return (!rr(t) || !xs.has(t)) && ge(e, "has", t),
    n
}
function il(e) {
    return ge(e, "iterate", C(e) ? "length" : et),
    Reflect.ownKeys(e)
}
const Ts = {
    get: Zo,
    set: rl,
    deleteProperty: ol,
    has: ll,
    ownKeys: il
}
  , ul = {
    get: el,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , cl = te({}, Ts, {
    get: Go,
    set: sl
})
  , fr = e=>e
  , gn = e=>Reflect.getPrototypeOf(e);
function qt(e, t, n=!1, r=!1) {
    e = e.__v_raw;
    const s = N(e)
      , o = N(t);
    n || (t !== o && ge(s, "get", t),
    ge(s, "get", o));
    const {has: l} = gn(s)
      , i = r ? fr : n ? hr : jt;
    if (l.call(s, t))
        return i(e.get(t));
    if (l.call(s, o))
        return i(e.get(o));
    e !== s && e.get(t)
}
function zt(e, t=!1) {
    const n = this.__v_raw
      , r = N(n)
      , s = N(e);
    return t || (e !== s && ge(r, "has", e),
    ge(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
}
function Vt(e, t=!1) {
    return e = e.__v_raw,
    !t && ge(N(e), "iterate", et),
    Reflect.get(e, "size", e)
}
function Rr(e) {
    e = N(e);
    const t = N(this);
    return gn(t).has.call(t, e) || (t.add(e),
    Le(t, "add", e, e)),
    this
}
function Lr(e, t) {
    t = N(t);
    const n = N(this)
      , {has: r, get: s} = gn(n);
    let o = r.call(n, e);
    o || (e = N(e),
    o = r.call(n, e));
    const l = s.call(n, e);
    return n.set(e, t),
    o ? Nt(t, l) && Le(n, "set", e, t) : Le(n, "add", e, t),
    this
}
function Nr(e) {
    const t = N(this)
      , {has: n, get: r} = gn(t);
    let s = n.call(t, e);
    s || (e = N(e),
    s = n.call(t, e)),
    r && r.call(t, e);
    const o = t.delete(e);
    return s && Le(t, "delete", e, void 0),
    o
}
function jr() {
    const e = N(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && Le(e, "clear", void 0, void 0),
    n
}
function Yt(e, t) {
    return function(r, s) {
        const o = this
          , l = o.__v_raw
          , i = N(l)
          , u = t ? fr : e ? hr : jt;
        return !e && ge(i, "iterate", et),
        l.forEach((f,d)=>r.call(s, u(f), u(d), o))
    }
}
function Jt(e, t, n) {
    return function(...r) {
        const s = this.__v_raw
          , o = N(s)
          , l = gt(o)
          , i = e === "entries" || e === Symbol.iterator && l
          , u = e === "keys" && l
          , f = s[e](...r)
          , d = n ? fr : t ? hr : jt;
        return !t && ge(o, "iterate", u ? Dn : et),
        {
            next() {
                const {value: h, done: v} = f.next();
                return v ? {
                    value: h,
                    done: v
                } : {
                    value: i ? [d(h[0]), d(h[1])] : d(h),
                    done: v
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function De(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function fl() {
    const e = {
        get(o) {
            return qt(this, o)
        },
        get size() {
            return Vt(this)
        },
        has: zt,
        add: Rr,
        set: Lr,
        delete: Nr,
        clear: jr,
        forEach: Yt(!1, !1)
    }
      , t = {
        get(o) {
            return qt(this, o, !1, !0)
        },
        get size() {
            return Vt(this)
        },
        has: zt,
        add: Rr,
        set: Lr,
        delete: Nr,
        clear: jr,
        forEach: Yt(!1, !0)
    }
      , n = {
        get(o) {
            return qt(this, o, !0)
        },
        get size() {
            return Vt(this, !0)
        },
        has(o) {
            return zt.call(this, o, !0)
        },
        add: De("add"),
        set: De("set"),
        delete: De("delete"),
        clear: De("clear"),
        forEach: Yt(!0, !1)
    }
      , r = {
        get(o) {
            return qt(this, o, !0, !0)
        },
        get size() {
            return Vt(this, !0)
        },
        has(o) {
            return zt.call(this, o, !0)
        },
        add: De("add"),
        set: De("set"),
        delete: De("delete"),
        clear: De("clear"),
        forEach: Yt(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o=>{
        e[o] = Jt(o, !1, !1),
        n[o] = Jt(o, !0, !1),
        t[o] = Jt(o, !1, !0),
        r[o] = Jt(o, !0, !0)
    }
    ),
    [e, n, t, r]
}
const [al,dl,pl,hl] = fl();
function ar(e, t) {
    const n = t ? e ? hl : pl : e ? dl : al;
    return (r,s,o)=>s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(L(n, s) && s in r ? n : r, s, o)
}
const gl = {
    get: ar(!1, !1)
}
  , ml = {
    get: ar(!1, !0)
}
  , vl = {
    get: ar(!0, !1)
}
  , Ps = new WeakMap
  , As = new WeakMap
  , Fs = new WeakMap
  , bl = new WeakMap;
function _l(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function yl(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : _l(No(e))
}
function mn(e) {
    return bt(e) ? e : pr(e, !1, Ts, gl, Ps)
}
function wl(e) {
    return pr(e, !1, cl, ml, As)
}
function dr(e) {
    return pr(e, !0, ul, vl, Fs)
}
function pr(e, t, n, r, s) {
    if (!V(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const o = s.get(e);
    if (o)
        return o;
    const l = yl(e);
    if (l === 0)
        return e;
    const i = new Proxy(e,l === 2 ? r : n);
    return s.set(e, i),
    i
}
function mt(e) {
    return bt(e) ? mt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function bt(e) {
    return !!(e && e.__v_isReadonly)
}
function sn(e) {
    return !!(e && e.__v_isShallow)
}
function Cs(e) {
    return mt(e) || bt(e)
}
function N(e) {
    const t = e && e.__v_raw;
    return t ? N(t) : e
}
function Is(e) {
    return rn(e, "__v_skip", !0),
    e
}
const jt = e=>V(e) ? mn(e) : e
  , hr = e=>V(e) ? dr(e) : e;
function Ms(e) {
    Be && Ee && (e = N(e),
    Es(e.dep || (e.dep = ir())))
}
function $s(e, t) {
    e = N(e);
    const n = e.dep;
    n && Hn(n)
}
function re(e) {
    return !!(e && e.__v_isRef === !0)
}
function z(e) {
    return Rs(e, !1)
}
function Ss(e) {
    return Rs(e, !0)
}
function Rs(e, t) {
    return re(e) ? e : new El(e,t)
}
class El {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : N(t),
        this._value = n ? t : jt(t)
    }
    get value() {
        return Ms(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || sn(t) || bt(t);
        t = n ? t : N(t),
        Nt(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : jt(t),
        $s(this))
    }
}
function vn(e) {
    return re(e) ? e.value : e
}
const xl = {
    get: (e,t,n)=>vn(Reflect.get(e, t, n)),
    set: (e,t,n,r)=>{
        const s = e[t];
        return re(s) && !re(n) ? (s.value = n,
        !0) : Reflect.set(e, t, n, r)
    }
};
function Ls(e) {
    return mt(e) ? e : new Proxy(e,xl)
}
class Ol {
    constructor(t, n, r, s) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this.__v_isReadonly = !1,
        this._dirty = !0,
        this.effect = new ur(t,()=>{
            this._dirty || (this._dirty = !0,
            $s(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !s,
        this.__v_isReadonly = r
    }
    get value() {
        const t = N(this);
        return Ms(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
function Tl(e, t, n=!1) {
    let r, s;
    const o = $(e);
    return o ? (r = e,
    s = Oe) : (r = e.get,
    s = e.set),
    new Ol(r,s,o || !s,n)
}
function Ke(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e()
    } catch (o) {
        bn(o, t, n)
    }
    return s
}
function Te(e, t, n, r) {
    if ($(e)) {
        const o = Ke(e, t, n, r);
        return o && hs(o) && o.catch(l=>{
            bn(l, t, n)
        }
        ),
        o
    }
    const s = [];
    for (let o = 0; o < e.length; o++)
        s.push(Te(e[o], t, n, r));
    return s
}
function bn(e, t, n, r=!0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const l = t.proxy
          , i = n;
        for (; o; ) {
            const f = o.ec;
            if (f) {
                for (let d = 0; d < f.length; d++)
                    if (f[d](e, l, i) === !1)
                        return
            }
            o = o.parent
        }
        const u = t.appContext.config.errorHandler;
        if (u) {
            Ke(u, null, 10, [e, l, i]);
            return
        }
    }
    Pl(e, n, s, r)
}
function Pl(e, t, n, r=!0) {
    console.error(e)
}
let Dt = !1
  , Un = !1;
const se = [];
let Me = 0;
const vt = [];
let Re = null
  , Xe = 0;
const Ns = Promise.resolve();
let gr = null;
function js(e) {
    const t = gr || Ns;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function Al(e) {
    let t = Me + 1
      , n = se.length;
    for (; t < n; ) {
        const r = t + n >>> 1;
        Ht(se[r]) < e ? t = r + 1 : n = r
    }
    return t
}
function mr(e) {
    (!se.length || !se.includes(e, Dt && e.allowRecurse ? Me + 1 : Me)) && (e.id == null ? se.push(e) : se.splice(Al(e.id), 0, e),
    Ds())
}
function Ds() {
    !Dt && !Un && (Un = !0,
    gr = Ns.then(Us))
}
function Fl(e) {
    const t = se.indexOf(e);
    t > Me && se.splice(t, 1)
}
function Cl(e) {
    C(e) ? vt.push(...e) : (!Re || !Re.includes(e, e.allowRecurse ? Xe + 1 : Xe)) && vt.push(e),
    Ds()
}
function Dr(e, t=Dt ? Me + 1 : 0) {
    for (; t < se.length; t++) {
        const n = se[t];
        n && n.pre && (se.splice(t, 1),
        t--,
        n())
    }
}
function Hs(e) {
    if (vt.length) {
        const t = [...new Set(vt)];
        if (vt.length = 0,
        Re) {
            Re.push(...t);
            return
        }
        for (Re = t,
        Re.sort((n,r)=>Ht(n) - Ht(r)),
        Xe = 0; Xe < Re.length; Xe++)
            Re[Xe]();
        Re = null,
        Xe = 0
    }
}
const Ht = e=>e.id == null ? 1 / 0 : e.id
  , Il = (e,t)=>{
    const n = Ht(e) - Ht(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function Us(e) {
    Un = !1,
    Dt = !0,
    se.sort(Il);
    const t = Oe;
    try {
        for (Me = 0; Me < se.length; Me++) {
            const n = se[Me];
            n && n.active !== !1 && Ke(n, null, 14)
        }
    } finally {
        Me = 0,
        se.length = 0,
        Hs(),
        Dt = !1,
        gr = null,
        (se.length || vt.length) && Us()
    }
}
function Ml(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const r = e.vnode.props || q;
    let s = n;
    const o = t.startsWith("update:")
      , l = o && t.slice(7);
    if (l && l in r) {
        const d = `${l === "modelValue" ? "model" : l}Modifiers`
          , {number: h, trim: v} = r[d] || q;
        v && (s = n.map(y=>X(y) ? y.trim() : y)),
        h && (s = n.map(Ho))
    }
    let i, u = r[i = Pn(t)] || r[i = Pn($e(t))];
    !u && o && (u = r[i = Pn(yt(t))]),
    u && Te(u, e, 6, s);
    const f = r[i + "Once"];
    if (f) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[i])
            return;
        e.emitted[i] = !0,
        Te(f, e, 6, s)
    }
}
function Bs(e, t, n=!1) {
    const r = t.emitsCache
      , s = r.get(e);
    if (s !== void 0)
        return s;
    const o = e.emits;
    let l = {}
      , i = !1;
    if (!$(e)) {
        const u = f=>{
            const d = Bs(f, t, !0);
            d && (i = !0,
            te(l, d))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(u),
        e.extends && u(e.extends),
        e.mixins && e.mixins.forEach(u)
    }
    return !o && !i ? (V(e) && r.set(e, null),
    null) : (C(o) ? o.forEach(u=>l[u] = null) : te(l, o),
    V(e) && r.set(e, l),
    l)
}
function _n(e, t) {
    return !e || !an(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    L(e, t[0].toLowerCase() + t.slice(1)) || L(e, yt(t)) || L(e, t))
}
let oe = null
  , Ks = null;
function on(e) {
    const t = oe;
    return oe = e,
    Ks = e && e.type.__scopeId || null,
    t
}
function $l(e, t=oe, n) {
    if (!t || e._n)
        return e;
    const r = (...s)=>{
        r._d && Xr(-1);
        const o = on(t);
        let l;
        try {
            l = e(...s)
        } finally {
            on(o),
            r._d && Xr(1)
        }
        return l
    }
    ;
    return r._n = !0,
    r._c = !0,
    r._d = !0,
    r
}
function Fn(e) {
    const {type: t, vnode: n, proxy: r, withProxy: s, props: o, propsOptions: [l], slots: i, attrs: u, emit: f, render: d, renderCache: h, data: v, setupState: y, ctx: P, inheritAttrs: O} = e;
    let B, k;
    const Y = on(e);
    try {
        if (n.shapeFlag & 4) {
            const M = s || r;
            B = Ie(d.call(M, M, h, o, y, v, P)),
            k = u
        } else {
            const M = t;
            B = Ie(M.length > 1 ? M(o, {
                attrs: u,
                slots: i,
                emit: f
            }) : M(o, null)),
            k = t.props ? u : Sl(u)
        }
    } catch (M) {
        Lt.length = 0,
        bn(M, e, 1),
        B = ae(qe)
    }
    let Q = B;
    if (k && O !== !1) {
        const M = Object.keys(k)
          , {shapeFlag: ie} = Q;
        M.length && ie & 7 && (l && M.some(tr) && (k = Rl(k, l)),
        Q = st(Q, k))
    }
    return n.dirs && (Q = st(Q),
    Q.dirs = Q.dirs ? Q.dirs.concat(n.dirs) : n.dirs),
    n.transition && (Q.transition = n.transition),
    B = Q,
    on(Y),
    B
}
const Sl = e=>{
    let t;
    for (const n in e)
        (n === "class" || n === "style" || an(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , Rl = (e,t)=>{
    const n = {};
    for (const r in e)
        (!tr(r) || !(r.slice(9)in t)) && (n[r] = e[r]);
    return n
}
;
function Ll(e, t, n) {
    const {props: r, children: s, component: o} = e
      , {props: l, children: i, patchFlag: u} = t
      , f = o.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && u >= 0) {
        if (u & 1024)
            return !0;
        if (u & 16)
            return r ? Hr(r, l, f) : !!l;
        if (u & 8) {
            const d = t.dynamicProps;
            for (let h = 0; h < d.length; h++) {
                const v = d[h];
                if (l[v] !== r[v] && !_n(f, v))
                    return !0
            }
        }
    } else
        return (s || i) && (!i || !i.$stable) ? !0 : r === l ? !1 : r ? l ? Hr(r, l, f) : !0 : !!l;
    return !1
}
function Hr(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length)
        return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !_n(n, o))
            return !0
    }
    return !1
}
function Nl({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const jl = e=>e.__isSuspense;
function Dl(e, t) {
    t && t.pendingBranch ? C(e) ? t.effects.push(...e) : t.effects.push(e) : Cl(e)
}
function Ne(e, t) {
    return vr(e, null, t)
}
const Xt = {};
function We(e, t, n) {
    return vr(e, t, n)
}
function vr(e, t, {immediate: n, deep: r, flush: s, onTrack: o, onTrigger: l}=q) {
    var i;
    const u = Yo() === ((i = ee) == null ? void 0 : i.scope) ? ee : null;
    let f, d = !1, h = !1;
    if (re(e) ? (f = ()=>e.value,
    d = sn(e)) : mt(e) ? (f = ()=>e,
    r = !0) : C(e) ? (h = !0,
    d = e.some(M=>mt(M) || sn(M)),
    f = ()=>e.map(M=>{
        if (re(M))
            return M.value;
        if (mt(M))
            return pt(M);
        if ($(M))
            return Ke(M, u, 2)
    }
    )) : $(e) ? t ? f = ()=>Ke(e, u, 2) : f = ()=>{
        if (!(u && u.isUnmounted))
            return v && v(),
            Te(e, u, 3, [y])
    }
    : f = Oe,
    t && r) {
        const M = f;
        f = ()=>pt(M())
    }
    let v, y = M=>{
        v = Y.onStop = ()=>{
            Ke(M, u, 4)
        }
    }
    , P;
    if (Bt)
        if (y = Oe,
        t ? n && Te(t, u, 3, [f(), h ? [] : void 0, y]) : f(),
        s === "sync") {
            const M = Ii();
            P = M.__watcherHandles || (M.__watcherHandles = [])
        } else
            return Oe;
    let O = h ? new Array(e.length).fill(Xt) : Xt;
    const B = ()=>{
        if (Y.active)
            if (t) {
                const M = Y.run();
                (r || d || (h ? M.some((ie,de)=>Nt(ie, O[de])) : Nt(M, O))) && (v && v(),
                Te(t, u, 3, [M, O === Xt ? void 0 : h && O[0] === Xt ? [] : O, y]),
                O = M)
            } else
                Y.run()
    }
    ;
    B.allowRecurse = !!t;
    let k;
    s === "sync" ? k = B : s === "post" ? k = ()=>he(B, u && u.suspense) : (B.pre = !0,
    u && (B.id = u.uid),
    k = ()=>mr(B));
    const Y = new ur(f,k);
    t ? n ? B() : O = Y.run() : s === "post" ? he(Y.run.bind(Y), u && u.suspense) : Y.run();
    const Q = ()=>{
        Y.stop(),
        u && u.scope && nr(u.scope.effects, Y)
    }
    ;
    return P && P.push(Q),
    Q
}
function Hl(e, t, n) {
    const r = this.proxy
      , s = X(e) ? e.includes(".") ? Ws(r, e) : ()=>r[e] : e.bind(r, r);
    let o;
    $(t) ? o = t : (o = t.handler,
    n = t);
    const l = ee;
    _t(this);
    const i = vr(s, o.bind(r), n);
    return l ? _t(l) : tt(),
    i
}
function Ws(e, t) {
    const n = t.split(".");
    return ()=>{
        let r = e;
        for (let s = 0; s < n.length && r; s++)
            r = r[n[s]];
        return r
    }
}
function pt(e, t) {
    if (!V(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    re(e))
        pt(e.value, t);
    else if (C(e))
        for (let n = 0; n < e.length; n++)
            pt(e[n], t);
    else if (ps(e) || gt(e))
        e.forEach(n=>{
            pt(n, t)
        }
        );
    else if (ms(e))
        for (const n in e)
            pt(e[n], t);
    return e
}
function Ye(e, t, n, r) {
    const s = e.dirs
      , o = t && t.dirs;
    for (let l = 0; l < s.length; l++) {
        const i = s[l];
        o && (i.oldValue = o[l].value);
        let u = i.dir[r];
        u && (wt(),
        Te(u, n, 8, [e.el, i, e, t]),
        Et())
    }
}
function lt(e, t) {
    return $(e) ? (()=>te({
        name: e.name
    }, t, {
        setup: e
    }))() : e
}
const $t = e=>!!e.type.__asyncLoader
  , ks = e=>e.type.__isKeepAlive;
function qs(e, t) {
    Vs(e, "a", t)
}
function zs(e, t) {
    Vs(e, "da", t)
}
function Vs(e, t, n=ee) {
    const r = e.__wdc || (e.__wdc = ()=>{
        let s = n;
        for (; s; ) {
            if (s.isDeactivated)
                return;
            s = s.parent
        }
        return e()
    }
    );
    if (yn(t, r, n),
    n) {
        let s = n.parent;
        for (; s && s.parent; )
            ks(s.parent.vnode) && Ul(r, t, n, s),
            s = s.parent
    }
}
function Ul(e, t, n, r) {
    const s = yn(t, e, r, !0);
    ze(()=>{
        nr(r[t], s)
    }
    , n)
}
function yn(e, t, n=ee, r=!1) {
    if (n) {
        const s = n[e] || (n[e] = [])
          , o = t.__weh || (t.__weh = (...l)=>{
            if (n.isUnmounted)
                return;
            wt(),
            _t(n);
            const i = Te(t, n, e, l);
            return tt(),
            Et(),
            i
        }
        );
        return r ? s.unshift(o) : s.push(o),
        o
    }
}
const je = e=>(t,n=ee)=>(!Bt || e === "sp") && yn(e, (...r)=>t(...r), n)
  , Bl = je("bm")
  , rt = je("m")
  , Kl = je("bu")
  , Wl = je("u")
  , Ys = je("bum")
  , ze = je("um")
  , kl = je("sp")
  , ql = je("rtg")
  , zl = je("rtc");
function Vl(e, t=ee) {
    yn("ec", e, t)
}
const Js = "components"
  , Xs = Symbol.for("v-ndc");
function tc(e) {
    return X(e) ? Yl(Js, e, !1) || e : e || Xs
}
function Yl(e, t, n=!0, r=!1) {
    const s = oe || ee;
    if (s) {
        const o = s.type;
        if (e === Js) {
            const i = Ai(o, !1);
            if (i && (i === t || i === $e(t) || i === hn($e(t))))
                return o
        }
        const l = Ur(s[e] || o[e], t) || Ur(s.appContext[e], t);
        return !l && r ? o : l
    }
}
function Ur(e, t) {
    return e && (e[t] || e[$e(t)] || e[hn($e(t))])
}
function nc(e, t, n, r) {
    let s;
    const o = n && n[r];
    if (C(e) || X(e)) {
        s = new Array(e.length);
        for (let l = 0, i = e.length; l < i; l++)
            s[l] = t(e[l], l, void 0, o && o[l])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let l = 0; l < e; l++)
            s[l] = t(l + 1, l, void 0, o && o[l])
    } else if (V(e))
        if (e[Symbol.iterator])
            s = Array.from(e, (l,i)=>t(l, i, void 0, o && o[i]));
        else {
            const l = Object.keys(e);
            s = new Array(l.length);
            for (let i = 0, u = l.length; i < u; i++) {
                const f = l[i];
                s[i] = t(e[f], f, i, o && o[i])
            }
        }
    else
        s = [];
    return n && (n[r] = s),
    s
}
function rc(e, t, n={}, r, s) {
    if (oe.isCE || oe.parent && $t(oe.parent) && oe.parent.isCE)
        return t !== "default" && (n.name = t),
        ae("slot", n, r && r());
    let o = e[t];
    o && o._c && (o._d = !1),
    lo();
    const l = o && Qs(o(n))
      , i = uo(ve, {
        key: n.key || l && l.key || `_ ${t}`
    }, l || (r ? r() : []), l && e._ === 1 ? 64 : -2);
    return !s && i.scopeId && (i.slotScopeIds = [i.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    i
}
function Qs(e) {
    return e.some(t=>cn(t) ? !(t.type === qe || t.type === ve && !Qs(t.children)) : !0) ? e : null
}
const Bn = e=>e ? po(e) ? xr(e) || e.proxy : Bn(e.parent) : null
  , St = te(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>Bn(e.parent),
    $root: e=>Bn(e.root),
    $emit: e=>e.emit,
    $options: e=>br(e),
    $forceUpdate: e=>e.f || (e.f = ()=>mr(e.update)),
    $nextTick: e=>e.n || (e.n = js.bind(e.proxy)),
    $watch: e=>Hl.bind(e)
})
  , Cn = (e,t)=>e !== q && !e.__isScriptSetup && L(e, t)
  , Jl = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: s, props: o, accessCache: l, type: i, appContext: u} = e;
        let f;
        if (t[0] !== "$") {
            const y = l[t];
            if (y !== void 0)
                switch (y) {
                case 1:
                    return r[t];
                case 2:
                    return s[t];
                case 4:
                    return n[t];
                case 3:
                    return o[t]
                }
            else {
                if (Cn(r, t))
                    return l[t] = 1,
                    r[t];
                if (s !== q && L(s, t))
                    return l[t] = 2,
                    s[t];
                if ((f = e.propsOptions[0]) && L(f, t))
                    return l[t] = 3,
                    o[t];
                if (n !== q && L(n, t))
                    return l[t] = 4,
                    n[t];
                Kn && (l[t] = 0)
            }
        }
        const d = St[t];
        let h, v;
        if (d)
            return t === "$attrs" && ge(e, "get", t),
            d(e);
        if ((h = i.__cssModules) && (h = h[t]))
            return h;
        if (n !== q && L(n, t))
            return l[t] = 4,
            n[t];
        if (v = u.config.globalProperties,
        L(v, t))
            return v[t]
    },
    set({_: e}, t, n) {
        const {data: r, setupState: s, ctx: o} = e;
        return Cn(s, t) ? (s[t] = n,
        !0) : r !== q && L(r, t) ? (r[t] = n,
        !0) : L(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (o[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o}}, l) {
        let i;
        return !!n[l] || e !== q && L(e, l) || Cn(t, l) || (i = o[0]) && L(i, l) || L(r, l) || L(St, l) || L(s.config.globalProperties, l)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : L(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
function Br(e) {
    return C(e) ? e.reduce((t,n)=>(t[n] = null,
    t), {}) : e
}
let Kn = !0;
function Xl(e) {
    const t = br(e)
      , n = e.proxy
      , r = e.ctx;
    Kn = !1,
    t.beforeCreate && Kr(t.beforeCreate, e, "bc");
    const {data: s, computed: o, methods: l, watch: i, provide: u, inject: f, created: d, beforeMount: h, mounted: v, beforeUpdate: y, updated: P, activated: O, deactivated: B, beforeDestroy: k, beforeUnmount: Y, destroyed: Q, unmounted: M, render: ie, renderTracked: de, renderTriggered: ue, errorCaptured: Z, serverPrefetch: ne, expose: ce, inheritAttrs: be, components: ut, directives: ct, filters: D} = t;
    if (f && Ql(f, r, null),
    l)
        for (const S in l) {
            const j = l[S];
            $(j) && (r[S] = j.bind(n))
        }
    if (s) {
        const S = s.call(n, n);
        V(S) && (e.data = mn(S))
    }
    if (Kn = !0,
    o)
        for (const S in o) {
            const j = o[S]
              , pe = $(j) ? j.bind(n, n) : $(j.get) ? j.get.bind(n, n) : Oe
              , Wt = !$(j) && $(j.set) ? j.set.bind(n) : Oe
              , Ve = W({
                get: pe,
                set: Wt
            });
            Object.defineProperty(r, S, {
                enumerable: !0,
                configurable: !0,
                get: ()=>Ve.value,
                set: Ae=>Ve.value = Ae
            })
        }
    if (i)
        for (const S in i)
            Zs(i[S], r, n, S);
    if (u) {
        const S = $(u) ? u.call(n) : u;
        Reflect.ownKeys(S).forEach(j=>{
            xt(j, S[j])
        }
        )
    }
    d && Kr(d, e, "c");
    function H(S, j) {
        C(j) ? j.forEach(pe=>S(pe.bind(n))) : j && S(j.bind(n))
    }
    if (H(Bl, h),
    H(rt, v),
    H(Kl, y),
    H(Wl, P),
    H(qs, O),
    H(zs, B),
    H(Vl, Z),
    H(zl, de),
    H(ql, ue),
    H(Ys, Y),
    H(ze, M),
    H(kl, ne),
    C(ce))
        if (ce.length) {
            const S = e.exposed || (e.exposed = {});
            ce.forEach(j=>{
                Object.defineProperty(S, j, {
                    get: ()=>n[j],
                    set: pe=>n[j] = pe
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    ie && e.render === Oe && (e.render = ie),
    be != null && (e.inheritAttrs = be),
    ut && (e.components = ut),
    ct && (e.directives = ct)
}
function Ql(e, t, n=Oe) {
    C(e) && (e = Wn(e));
    for (const r in e) {
        const s = e[r];
        let o;
        V(s) ? "default"in s ? o = Pe(s.from || r, s.default, !0) : o = Pe(s.from || r) : o = Pe(s),
        re(o) ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: ()=>o.value,
            set: l=>o.value = l
        }) : t[r] = o
    }
}
function Kr(e, t, n) {
    Te(C(e) ? e.map(r=>r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Zs(e, t, n, r) {
    const s = r.includes(".") ? Ws(n, r) : ()=>n[r];
    if (X(e)) {
        const o = t[e];
        $(o) && We(s, o)
    } else if ($(e))
        We(s, e.bind(n));
    else if (V(e))
        if (C(e))
            e.forEach(o=>Zs(o, t, n, r));
        else {
            const o = $(e.handler) ? e.handler.bind(n) : t[e.handler];
            $(o) && We(s, o, e)
        }
}
function br(e) {
    const t = e.type
      , {mixins: n, extends: r} = t
      , {mixins: s, optionsCache: o, config: {optionMergeStrategies: l}} = e.appContext
      , i = o.get(t);
    let u;
    return i ? u = i : !s.length && !n && !r ? u = t : (u = {},
    s.length && s.forEach(f=>ln(u, f, l, !0)),
    ln(u, t, l)),
    V(t) && o.set(t, u),
    u
}
function ln(e, t, n, r=!1) {
    const {mixins: s, extends: o} = t;
    o && ln(e, o, n, !0),
    s && s.forEach(l=>ln(e, l, n, !0));
    for (const l in t)
        if (!(r && l === "expose")) {
            const i = Zl[l] || n && n[l];
            e[l] = i ? i(e[l], t[l]) : t[l]
        }
    return e
}
const Zl = {
    data: Wr,
    props: kr,
    emits: kr,
    methods: Ct,
    computed: Ct,
    beforeCreate: fe,
    created: fe,
    beforeMount: fe,
    mounted: fe,
    beforeUpdate: fe,
    updated: fe,
    beforeDestroy: fe,
    beforeUnmount: fe,
    destroyed: fe,
    unmounted: fe,
    activated: fe,
    deactivated: fe,
    errorCaptured: fe,
    serverPrefetch: fe,
    components: Ct,
    directives: Ct,
    watch: ei,
    provide: Wr,
    inject: Gl
};
function Wr(e, t) {
    return t ? e ? function() {
        return te($(e) ? e.call(this, this) : e, $(t) ? t.call(this, this) : t)
    }
    : t : e
}
function Gl(e, t) {
    return Ct(Wn(e), Wn(t))
}
function Wn(e) {
    if (C(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function fe(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Ct(e, t) {
    return e ? te(Object.create(null), e, t) : t
}
function kr(e, t) {
    return e ? C(e) && C(t) ? [...new Set([...e, ...t])] : te(Object.create(null), Br(e), Br(t ?? {})) : t
}
function ei(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = te(Object.create(null), e);
    for (const r in t)
        n[r] = fe(e[r], t[r]);
    return n
}
function Gs() {
    return {
        app: null,
        config: {
            isNativeTag: So,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let ti = 0;
function ni(e, t) {
    return function(r, s=null) {
        $(r) || (r = te({}, r)),
        s != null && !V(s) && (s = null);
        const o = Gs()
          , l = new Set;
        let i = !1;
        const u = o.app = {
            _uid: ti++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: Mi,
            get config() {
                return o.config
            },
            set config(f) {},
            use(f, ...d) {
                return l.has(f) || (f && $(f.install) ? (l.add(f),
                f.install(u, ...d)) : $(f) && (l.add(f),
                f(u, ...d))),
                u
            },
            mixin(f) {
                return o.mixins.includes(f) || o.mixins.push(f),
                u
            },
            component(f, d) {
                return d ? (o.components[f] = d,
                u) : o.components[f]
            },
            directive(f, d) {
                return d ? (o.directives[f] = d,
                u) : o.directives[f]
            },
            mount(f, d, h) {
                if (!i) {
                    const v = ae(r, s);
                    return v.appContext = o,
                    d && t ? t(v, f) : e(v, f, h),
                    i = !0,
                    u._container = f,
                    f.__vue_app__ = u,
                    xr(v.component) || v.component.proxy
                }
            },
            unmount() {
                i && (e(null, u._container),
                delete u._container.__vue_app__)
            },
            provide(f, d) {
                return o.provides[f] = d,
                u
            },
            runWithContext(f) {
                un = u;
                try {
                    return f()
                } finally {
                    un = null
                }
            }
        };
        return u
    }
}
let un = null;
function xt(e, t) {
    if (ee) {
        let n = ee.provides;
        const r = ee.parent && ee.parent.provides;
        r === n && (n = ee.provides = Object.create(r)),
        n[e] = t
    }
}
function Pe(e, t, n=!1) {
    const r = ee || oe;
    if (r || un) {
        const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : un._context.provides;
        if (s && e in s)
            return s[e];
        if (arguments.length > 1)
            return n && $(t) ? t.call(r && r.proxy) : t
    }
}
function ri(e, t, n, r=!1) {
    const s = {}
      , o = {};
    rn(o, En, 1),
    e.propsDefaults = Object.create(null),
    eo(e, t, s, o);
    for (const l in e.propsOptions[0])
        l in s || (s[l] = void 0);
    n ? e.props = r ? s : wl(s) : e.type.props ? e.props = s : e.props = o,
    e.attrs = o
}
function si(e, t, n, r) {
    const {props: s, attrs: o, vnode: {patchFlag: l}} = e
      , i = N(s)
      , [u] = e.propsOptions;
    let f = !1;
    if ((r || l > 0) && !(l & 16)) {
        if (l & 8) {
            const d = e.vnode.dynamicProps;
            for (let h = 0; h < d.length; h++) {
                let v = d[h];
                if (_n(e.emitsOptions, v))
                    continue;
                const y = t[v];
                if (u)
                    if (L(o, v))
                        y !== o[v] && (o[v] = y,
                        f = !0);
                    else {
                        const P = $e(v);
                        s[P] = kn(u, i, P, y, e, !1)
                    }
                else
                    y !== o[v] && (o[v] = y,
                    f = !0)
            }
        }
    } else {
        eo(e, t, s, o) && (f = !0);
        let d;
        for (const h in i)
            (!t || !L(t, h) && ((d = yt(h)) === h || !L(t, d))) && (u ? n && (n[h] !== void 0 || n[d] !== void 0) && (s[h] = kn(u, i, h, void 0, e, !0)) : delete s[h]);
        if (o !== i)
            for (const h in o)
                (!t || !L(t, h)) && (delete o[h],
                f = !0)
    }
    f && Le(e, "set", "$attrs")
}
function eo(e, t, n, r) {
    const [s,o] = e.propsOptions;
    let l = !1, i;
    if (t)
        for (let u in t) {
            if (Gt(u))
                continue;
            const f = t[u];
            let d;
            s && L(s, d = $e(u)) ? !o || !o.includes(d) ? n[d] = f : (i || (i = {}))[d] = f : _n(e.emitsOptions, u) || (!(u in r) || f !== r[u]) && (r[u] = f,
            l = !0)
        }
    if (o) {
        const u = N(n)
          , f = i || q;
        for (let d = 0; d < o.length; d++) {
            const h = o[d];
            n[h] = kn(s, u, h, f[h], e, !L(f, h))
        }
    }
    return l
}
function kn(e, t, n, r, s, o) {
    const l = e[n];
    if (l != null) {
        const i = L(l, "default");
        if (i && r === void 0) {
            const u = l.default;
            if (l.type !== Function && !l.skipFactory && $(u)) {
                const {propsDefaults: f} = s;
                n in f ? r = f[n] : (_t(s),
                r = f[n] = u.call(null, t),
                tt())
            } else
                r = u
        }
        l[0] && (o && !i ? r = !1 : l[1] && (r === "" || r === yt(n)) && (r = !0))
    }
    return r
}
function to(e, t, n=!1) {
    const r = t.propsCache
      , s = r.get(e);
    if (s)
        return s;
    const o = e.props
      , l = {}
      , i = [];
    let u = !1;
    if (!$(e)) {
        const d = h=>{
            u = !0;
            const [v,y] = to(h, t, !0);
            te(l, v),
            y && i.push(...y)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(d),
        e.extends && d(e.extends),
        e.mixins && e.mixins.forEach(d)
    }
    if (!o && !u)
        return V(e) && r.set(e, ht),
        ht;
    if (C(o))
        for (let d = 0; d < o.length; d++) {
            const h = $e(o[d]);
            qr(h) && (l[h] = q)
        }
    else if (o)
        for (const d in o) {
            const h = $e(d);
            if (qr(h)) {
                const v = o[d]
                  , y = l[h] = C(v) || $(v) ? {
                    type: v
                } : te({}, v);
                if (y) {
                    const P = Yr(Boolean, y.type)
                      , O = Yr(String, y.type);
                    y[0] = P > -1,
                    y[1] = O < 0 || P < O,
                    (P > -1 || L(y, "default")) && i.push(h)
                }
            }
        }
    const f = [l, i];
    return V(e) && r.set(e, f),
    f
}
function qr(e) {
    return e[0] !== "$"
}
function zr(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}
function Vr(e, t) {
    return zr(e) === zr(t)
}
function Yr(e, t) {
    return C(t) ? t.findIndex(n=>Vr(n, e)) : $(t) && Vr(t, e) ? 0 : -1
}
const no = e=>e[0] === "_" || e === "$stable"
  , _r = e=>C(e) ? e.map(Ie) : [Ie(e)]
  , oi = (e,t,n)=>{
    if (t._n)
        return t;
    const r = $l((...s)=>_r(t(...s)), n);
    return r._c = !1,
    r
}
  , ro = (e,t,n)=>{
    const r = e._ctx;
    for (const s in e) {
        if (no(s))
            continue;
        const o = e[s];
        if ($(o))
            t[s] = oi(s, o, r);
        else if (o != null) {
            const l = _r(o);
            t[s] = ()=>l
        }
    }
}
  , so = (e,t)=>{
    const n = _r(t);
    e.slots.default = ()=>n
}
  , li = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = N(t),
        rn(t, "_", n)) : ro(t, e.slots = {})
    } else
        e.slots = {},
        t && so(e, t);
    rn(e.slots, En, 1)
}
  , ii = (e,t,n)=>{
    const {vnode: r, slots: s} = e;
    let o = !0
      , l = q;
    if (r.shapeFlag & 32) {
        const i = t._;
        i ? n && i === 1 ? o = !1 : (te(s, t),
        !n && i === 1 && delete s._) : (o = !t.$stable,
        ro(t, s)),
        l = t
    } else
        t && (so(e, t),
        l = {
            default: 1
        });
    if (o)
        for (const i in s)
            !no(i) && !(i in l) && delete s[i]
}
;
function qn(e, t, n, r, s=!1) {
    if (C(e)) {
        e.forEach((v,y)=>qn(v, t && (C(t) ? t[y] : t), n, r, s));
        return
    }
    if ($t(r) && !s)
        return;
    const o = r.shapeFlag & 4 ? xr(r.component) || r.component.proxy : r.el
      , l = s ? null : o
      , {i, r: u} = e
      , f = t && t.r
      , d = i.refs === q ? i.refs = {} : i.refs
      , h = i.setupState;
    if (f != null && f !== u && (X(f) ? (d[f] = null,
    L(h, f) && (h[f] = null)) : re(f) && (f.value = null)),
    $(u))
        Ke(u, i, 12, [l, d]);
    else {
        const v = X(u)
          , y = re(u);
        if (v || y) {
            const P = ()=>{
                if (e.f) {
                    const O = v ? L(h, u) ? h[u] : d[u] : u.value;
                    s ? C(O) && nr(O, o) : C(O) ? O.includes(o) || O.push(o) : v ? (d[u] = [o],
                    L(h, u) && (h[u] = d[u])) : (u.value = [o],
                    e.k && (d[e.k] = u.value))
                } else
                    v ? (d[u] = l,
                    L(h, u) && (h[u] = l)) : y && (u.value = l,
                    e.k && (d[e.k] = l))
            }
            ;
            l ? (P.id = -1,
            he(P, n)) : P()
        }
    }
}
const he = Dl;
function ui(e) {
    return ci(e)
}
function ci(e, t) {
    const n = Ln();
    n.__VUE__ = !0;
    const {insert: r, remove: s, patchProp: o, createElement: l, createText: i, createComment: u, setText: f, setElementText: d, parentNode: h, nextSibling: v, setScopeId: y=Oe, insertStaticContent: P} = e
      , O = (c,a,p,m=null,g=null,w=null,x=!1,_=null,E=!!a.dynamicChildren)=>{
        if (c === a)
            return;
        c && !Tt(c, a) && (m = kt(c),
        Ae(c, g, w, !0),
        c = null),
        a.patchFlag === -2 && (E = !1,
        a.dynamicChildren = null);
        const {type: b, ref: A, shapeFlag: T} = a;
        switch (b) {
        case wn:
            B(c, a, p, m);
            break;
        case qe:
            k(c, a, p, m);
            break;
        case en:
            c == null && Y(a, p, m, x);
            break;
        case ve:
            ut(c, a, p, m, g, w, x, _, E);
            break;
        default:
            T & 1 ? ie(c, a, p, m, g, w, x, _, E) : T & 6 ? ct(c, a, p, m, g, w, x, _, E) : (T & 64 || T & 128) && b.process(c, a, p, m, g, w, x, _, E, ft)
        }
        A != null && g && qn(A, c && c.ref, w, a || c, !a)
    }
      , B = (c,a,p,m)=>{
        if (c == null)
            r(a.el = i(a.children), p, m);
        else {
            const g = a.el = c.el;
            a.children !== c.children && f(g, a.children)
        }
    }
      , k = (c,a,p,m)=>{
        c == null ? r(a.el = u(a.children || ""), p, m) : a.el = c.el
    }
      , Y = (c,a,p,m)=>{
        [c.el,c.anchor] = P(c.children, a, p, m, c.el, c.anchor)
    }
      , Q = ({el: c, anchor: a},p,m)=>{
        let g;
        for (; c && c !== a; )
            g = v(c),
            r(c, p, m),
            c = g;
        r(a, p, m)
    }
      , M = ({el: c, anchor: a})=>{
        let p;
        for (; c && c !== a; )
            p = v(c),
            s(c),
            c = p;
        s(a)
    }
      , ie = (c,a,p,m,g,w,x,_,E)=>{
        x = x || a.type === "svg",
        c == null ? de(a, p, m, g, w, x, _, E) : ne(c, a, g, w, x, _, E)
    }
      , de = (c,a,p,m,g,w,x,_)=>{
        let E, b;
        const {type: A, props: T, shapeFlag: F, transition: I, dirs: R} = c;
        if (E = c.el = l(c.type, w, T && T.is, T),
        F & 8 ? d(E, c.children) : F & 16 && Z(c.children, E, null, m, g, w && A !== "foreignObject", x, _),
        R && Ye(c, null, m, "created"),
        ue(E, c, c.scopeId, x, m),
        T) {
            for (const U in T)
                U !== "value" && !Gt(U) && o(E, U, null, T[U], w, c.children, m, g, Se);
            "value"in T && o(E, "value", null, T.value),
            (b = T.onVnodeBeforeMount) && Ce(b, m, c)
        }
        R && Ye(c, null, m, "beforeMount");
        const K = (!g || g && !g.pendingBranch) && I && !I.persisted;
        K && I.beforeEnter(E),
        r(E, a, p),
        ((b = T && T.onVnodeMounted) || K || R) && he(()=>{
            b && Ce(b, m, c),
            K && I.enter(E),
            R && Ye(c, null, m, "mounted")
        }
        , g)
    }
      , ue = (c,a,p,m,g)=>{
        if (p && y(c, p),
        m)
            for (let w = 0; w < m.length; w++)
                y(c, m[w]);
        if (g) {
            let w = g.subTree;
            if (a === w) {
                const x = g.vnode;
                ue(c, x, x.scopeId, x.slotScopeIds, g.parent)
            }
        }
    }
      , Z = (c,a,p,m,g,w,x,_,E=0)=>{
        for (let b = E; b < c.length; b++) {
            const A = c[b] = _ ? He(c[b]) : Ie(c[b]);
            O(null, A, a, p, m, g, w, x, _)
        }
    }
      , ne = (c,a,p,m,g,w,x)=>{
        const _ = a.el = c.el;
        let {patchFlag: E, dynamicChildren: b, dirs: A} = a;
        E |= c.patchFlag & 16;
        const T = c.props || q
          , F = a.props || q;
        let I;
        p && Je(p, !1),
        (I = F.onVnodeBeforeUpdate) && Ce(I, p, a, c),
        A && Ye(a, c, p, "beforeUpdate"),
        p && Je(p, !0);
        const R = g && a.type !== "foreignObject";
        if (b ? ce(c.dynamicChildren, b, _, p, m, R, w) : x || j(c, a, _, null, p, m, R, w, !1),
        E > 0) {
            if (E & 16)
                be(_, a, T, F, p, m, g);
            else if (E & 2 && T.class !== F.class && o(_, "class", null, F.class, g),
            E & 4 && o(_, "style", T.style, F.style, g),
            E & 8) {
                const K = a.dynamicProps;
                for (let U = 0; U < K.length; U++) {
                    const G = K[U]
                      , _e = T[G]
                      , at = F[G];
                    (at !== _e || G === "value") && o(_, G, _e, at, g, c.children, p, m, Se)
                }
            }
            E & 1 && c.children !== a.children && d(_, a.children)
        } else
            !x && b == null && be(_, a, T, F, p, m, g);
        ((I = F.onVnodeUpdated) || A) && he(()=>{
            I && Ce(I, p, a, c),
            A && Ye(a, c, p, "updated")
        }
        , m)
    }
      , ce = (c,a,p,m,g,w,x)=>{
        for (let _ = 0; _ < a.length; _++) {
            const E = c[_]
              , b = a[_]
              , A = E.el && (E.type === ve || !Tt(E, b) || E.shapeFlag & 70) ? h(E.el) : p;
            O(E, b, A, null, m, g, w, x, !0)
        }
    }
      , be = (c,a,p,m,g,w,x)=>{
        if (p !== m) {
            if (p !== q)
                for (const _ in p)
                    !Gt(_) && !(_ in m) && o(c, _, p[_], null, x, a.children, g, w, Se);
            for (const _ in m) {
                if (Gt(_))
                    continue;
                const E = m[_]
                  , b = p[_];
                E !== b && _ !== "value" && o(c, _, b, E, x, a.children, g, w, Se)
            }
            "value"in m && o(c, "value", p.value, m.value)
        }
    }
      , ut = (c,a,p,m,g,w,x,_,E)=>{
        const b = a.el = c ? c.el : i("")
          , A = a.anchor = c ? c.anchor : i("");
        let {patchFlag: T, dynamicChildren: F, slotScopeIds: I} = a;
        I && (_ = _ ? _.concat(I) : I),
        c == null ? (r(b, p, m),
        r(A, p, m),
        Z(a.children, p, A, g, w, x, _, E)) : T > 0 && T & 64 && F && c.dynamicChildren ? (ce(c.dynamicChildren, F, p, g, w, x, _),
        (a.key != null || g && a === g.subTree) && yr(c, a, !0)) : j(c, a, p, A, g, w, x, _, E)
    }
      , ct = (c,a,p,m,g,w,x,_,E)=>{
        a.slotScopeIds = _,
        c == null ? a.shapeFlag & 512 ? g.ctx.activate(a, p, m, x, E) : D(a, p, m, g, w, x, E) : J(c, a, E)
    }
      , D = (c,a,p,m,g,w,x)=>{
        const _ = c.component = Ei(c, m, g);
        if (ks(c) && (_.ctx.renderer = ft),
        xi(_),
        _.asyncDep) {
            if (g && g.registerDep(_, H),
            !c.el) {
                const E = _.subTree = ae(qe);
                k(null, E, a, p)
            }
            return
        }
        H(_, c, a, p, g, w, x)
    }
      , J = (c,a,p)=>{
        const m = a.component = c.component;
        if (Ll(c, a, p))
            if (m.asyncDep && !m.asyncResolved) {
                S(m, a, p);
                return
            } else
                m.next = a,
                Fl(m.update),
                m.update();
        else
            a.el = c.el,
            m.vnode = a
    }
      , H = (c,a,p,m,g,w,x)=>{
        const _ = ()=>{
            if (c.isMounted) {
                let {next: A, bu: T, u: F, parent: I, vnode: R} = c, K = A, U;
                Je(c, !1),
                A ? (A.el = R.el,
                S(c, A, x)) : A = R,
                T && An(T),
                (U = A.props && A.props.onVnodeBeforeUpdate) && Ce(U, I, A, R),
                Je(c, !0);
                const G = Fn(c)
                  , _e = c.subTree;
                c.subTree = G,
                O(_e, G, h(_e.el), kt(_e), c, g, w),
                A.el = G.el,
                K === null && Nl(c, G.el),
                F && he(F, g),
                (U = A.props && A.props.onVnodeUpdated) && he(()=>Ce(U, I, A, R), g)
            } else {
                let A;
                const {el: T, props: F} = a
                  , {bm: I, m: R, parent: K} = c
                  , U = $t(a);
                if (Je(c, !1),
                I && An(I),
                !U && (A = F && F.onVnodeBeforeMount) && Ce(A, K, a),
                Je(c, !0),
                T && Tn) {
                    const G = ()=>{
                        c.subTree = Fn(c),
                        Tn(T, c.subTree, c, g, null)
                    }
                    ;
                    U ? a.type.__asyncLoader().then(()=>!c.isUnmounted && G()) : G()
                } else {
                    const G = c.subTree = Fn(c);
                    O(null, G, p, m, c, g, w),
                    a.el = G.el
                }
                if (R && he(R, g),
                !U && (A = F && F.onVnodeMounted)) {
                    const G = a;
                    he(()=>Ce(A, K, G), g)
                }
                (a.shapeFlag & 256 || K && $t(K.vnode) && K.vnode.shapeFlag & 256) && c.a && he(c.a, g),
                c.isMounted = !0,
                a = p = m = null
            }
        }
          , E = c.effect = new ur(_,()=>mr(b),c.scope)
          , b = c.update = ()=>E.run();
        b.id = c.uid,
        Je(c, !0),
        b()
    }
      , S = (c,a,p)=>{
        a.component = c;
        const m = c.vnode.props;
        c.vnode = a,
        c.next = null,
        si(c, a.props, m, p),
        ii(c, a.children, p),
        wt(),
        Dr(),
        Et()
    }
      , j = (c,a,p,m,g,w,x,_,E=!1)=>{
        const b = c && c.children
          , A = c ? c.shapeFlag : 0
          , T = a.children
          , {patchFlag: F, shapeFlag: I} = a;
        if (F > 0) {
            if (F & 128) {
                Wt(b, T, p, m, g, w, x, _, E);
                return
            } else if (F & 256) {
                pe(b, T, p, m, g, w, x, _, E);
                return
            }
        }
        I & 8 ? (A & 16 && Se(b, g, w),
        T !== b && d(p, T)) : A & 16 ? I & 16 ? Wt(b, T, p, m, g, w, x, _, E) : Se(b, g, w, !0) : (A & 8 && d(p, ""),
        I & 16 && Z(T, p, m, g, w, x, _, E))
    }
      , pe = (c,a,p,m,g,w,x,_,E)=>{
        c = c || ht,
        a = a || ht;
        const b = c.length
          , A = a.length
          , T = Math.min(b, A);
        let F;
        for (F = 0; F < T; F++) {
            const I = a[F] = E ? He(a[F]) : Ie(a[F]);
            O(c[F], I, p, null, g, w, x, _, E)
        }
        b > A ? Se(c, g, w, !0, !1, T) : Z(a, p, m, g, w, x, _, E, T)
    }
      , Wt = (c,a,p,m,g,w,x,_,E)=>{
        let b = 0;
        const A = a.length;
        let T = c.length - 1
          , F = A - 1;
        for (; b <= T && b <= F; ) {
            const I = c[b]
              , R = a[b] = E ? He(a[b]) : Ie(a[b]);
            if (Tt(I, R))
                O(I, R, p, null, g, w, x, _, E);
            else
                break;
            b++
        }
        for (; b <= T && b <= F; ) {
            const I = c[T]
              , R = a[F] = E ? He(a[F]) : Ie(a[F]);
            if (Tt(I, R))
                O(I, R, p, null, g, w, x, _, E);
            else
                break;
            T--,
            F--
        }
        if (b > T) {
            if (b <= F) {
                const I = F + 1
                  , R = I < A ? a[I].el : m;
                for (; b <= F; )
                    O(null, a[b] = E ? He(a[b]) : Ie(a[b]), p, R, g, w, x, _, E),
                    b++
            }
        } else if (b > F)
            for (; b <= T; )
                Ae(c[b], g, w, !0),
                b++;
        else {
            const I = b
              , R = b
              , K = new Map;
            for (b = R; b <= F; b++) {
                const me = a[b] = E ? He(a[b]) : Ie(a[b]);
                me.key != null && K.set(me.key, b)
            }
            let U, G = 0;
            const _e = F - R + 1;
            let at = !1
              , Ar = 0;
            const Ot = new Array(_e);
            for (b = 0; b < _e; b++)
                Ot[b] = 0;
            for (b = I; b <= T; b++) {
                const me = c[b];
                if (G >= _e) {
                    Ae(me, g, w, !0);
                    continue
                }
                let Fe;
                if (me.key != null)
                    Fe = K.get(me.key);
                else
                    for (U = R; U <= F; U++)
                        if (Ot[U - R] === 0 && Tt(me, a[U])) {
                            Fe = U;
                            break
                        }
                Fe === void 0 ? Ae(me, g, w, !0) : (Ot[Fe - R] = b + 1,
                Fe >= Ar ? Ar = Fe : at = !0,
                O(me, a[Fe], p, null, g, w, x, _, E),
                G++)
            }
            const Fr = at ? fi(Ot) : ht;
            for (U = Fr.length - 1,
            b = _e - 1; b >= 0; b--) {
                const me = R + b
                  , Fe = a[me]
                  , Cr = me + 1 < A ? a[me + 1].el : m;
                Ot[b] === 0 ? O(null, Fe, p, Cr, g, w, x, _, E) : at && (U < 0 || b !== Fr[U] ? Ve(Fe, p, Cr, 2) : U--)
            }
        }
    }
      , Ve = (c,a,p,m,g=null)=>{
        const {el: w, type: x, transition: _, children: E, shapeFlag: b} = c;
        if (b & 6) {
            Ve(c.component.subTree, a, p, m);
            return
        }
        if (b & 128) {
            c.suspense.move(a, p, m);
            return
        }
        if (b & 64) {
            x.move(c, a, p, ft);
            return
        }
        if (x === ve) {
            r(w, a, p);
            for (let T = 0; T < E.length; T++)
                Ve(E[T], a, p, m);
            r(c.anchor, a, p);
            return
        }
        if (x === en) {
            Q(c, a, p);
            return
        }
        if (m !== 2 && b & 1 && _)
            if (m === 0)
                _.beforeEnter(w),
                r(w, a, p),
                he(()=>_.enter(w), g);
            else {
                const {leave: T, delayLeave: F, afterLeave: I} = _
                  , R = ()=>r(w, a, p)
                  , K = ()=>{
                    T(w, ()=>{
                        R(),
                        I && I()
                    }
                    )
                }
                ;
                F ? F(w, R, K) : K()
            }
        else
            r(w, a, p)
    }
      , Ae = (c,a,p,m=!1,g=!1)=>{
        const {type: w, props: x, ref: _, children: E, dynamicChildren: b, shapeFlag: A, patchFlag: T, dirs: F} = c;
        if (_ != null && qn(_, null, p, c, !0),
        A & 256) {
            a.ctx.deactivate(c);
            return
        }
        const I = A & 1 && F
          , R = !$t(c);
        let K;
        if (R && (K = x && x.onVnodeBeforeUnmount) && Ce(K, a, c),
        A & 6)
            $o(c.component, p, m);
        else {
            if (A & 128) {
                c.suspense.unmount(p, m);
                return
            }
            I && Ye(c, null, a, "beforeUnmount"),
            A & 64 ? c.type.remove(c, a, p, g, ft, m) : b && (w !== ve || T > 0 && T & 64) ? Se(b, a, p, !1, !0) : (w === ve && T & 384 || !g && A & 16) && Se(E, a, p),
            m && Tr(c)
        }
        (R && (K = x && x.onVnodeUnmounted) || I) && he(()=>{
            K && Ce(K, a, c),
            I && Ye(c, null, a, "unmounted")
        }
        , p)
    }
      , Tr = c=>{
        const {type: a, el: p, anchor: m, transition: g} = c;
        if (a === ve) {
            Mo(p, m);
            return
        }
        if (a === en) {
            M(c);
            return
        }
        const w = ()=>{
            s(p),
            g && !g.persisted && g.afterLeave && g.afterLeave()
        }
        ;
        if (c.shapeFlag & 1 && g && !g.persisted) {
            const {leave: x, delayLeave: _} = g
              , E = ()=>x(p, w);
            _ ? _(c.el, w, E) : E()
        } else
            w()
    }
      , Mo = (c,a)=>{
        let p;
        for (; c !== a; )
            p = v(c),
            s(c),
            c = p;
        s(a)
    }
      , $o = (c,a,p)=>{
        const {bum: m, scope: g, update: w, subTree: x, um: _} = c;
        m && An(m),
        g.stop(),
        w && (w.active = !1,
        Ae(x, c, a, p)),
        _ && he(_, a),
        he(()=>{
            c.isUnmounted = !0
        }
        , a),
        a && a.pendingBranch && !a.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === a.pendingId && (a.deps--,
        a.deps === 0 && a.resolve())
    }
      , Se = (c,a,p,m=!1,g=!1,w=0)=>{
        for (let x = w; x < c.length; x++)
            Ae(c[x], a, p, m, g)
    }
      , kt = c=>c.shapeFlag & 6 ? kt(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : v(c.anchor || c.el)
      , Pr = (c,a,p)=>{
        c == null ? a._vnode && Ae(a._vnode, null, null, !0) : O(a._vnode || null, c, a, null, null, null, p),
        Dr(),
        Hs(),
        a._vnode = c
    }
      , ft = {
        p: O,
        um: Ae,
        m: Ve,
        r: Tr,
        mt: D,
        mc: Z,
        pc: j,
        pbc: ce,
        n: kt,
        o: e
    };
    let On, Tn;
    return t && ([On,Tn] = t(ft)),
    {
        render: Pr,
        hydrate: On,
        createApp: ni(Pr, On)
    }
}
function Je({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function yr(e, t, n=!1) {
    const r = e.children
      , s = t.children;
    if (C(r) && C(s))
        for (let o = 0; o < r.length; o++) {
            const l = r[o];
            let i = s[o];
            i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = s[o] = He(s[o]),
            i.el = l.el),
            n || yr(l, i)),
            i.type === wn && (i.el = l.el)
        }
}
function fi(e) {
    const t = e.slice()
      , n = [0];
    let r, s, o, l, i;
    const u = e.length;
    for (r = 0; r < u; r++) {
        const f = e[r];
        if (f !== 0) {
            if (s = n[n.length - 1],
            e[s] < f) {
                t[r] = s,
                n.push(r);
                continue
            }
            for (o = 0,
            l = n.length - 1; o < l; )
                i = o + l >> 1,
                e[n[i]] < f ? o = i + 1 : l = i;
            f < e[n[o]] && (o > 0 && (t[r] = n[o - 1]),
            n[o] = r)
        }
    }
    for (o = n.length,
    l = n[o - 1]; o-- > 0; )
        n[o] = l,
        l = t[l];
    return n
}
const ai = e=>e.__isTeleport
  , Rt = e=>e && (e.disabled || e.disabled === "")
  , Jr = e=>typeof SVGElement < "u" && e instanceof SVGElement
  , zn = (e,t)=>{
    const n = e && e.to;
    return X(n) ? t ? t(n) : null : n
}
  , di = {
    __isTeleport: !0,
    process(e, t, n, r, s, o, l, i, u, f) {
        const {mc: d, pc: h, pbc: v, o: {insert: y, querySelector: P, createText: O, createComment: B}} = f
          , k = Rt(t.props);
        let {shapeFlag: Y, children: Q, dynamicChildren: M} = t;
        if (e == null) {
            const ie = t.el = O("")
              , de = t.anchor = O("");
            y(ie, n, r),
            y(de, n, r);
            const ue = t.target = zn(t.props, P)
              , Z = t.targetAnchor = O("");
            ue && (y(Z, ue),
            l = l || Jr(ue));
            const ne = (ce,be)=>{
                Y & 16 && d(Q, ce, be, s, o, l, i, u)
            }
            ;
            k ? ne(n, de) : ue && ne(ue, Z)
        } else {
            t.el = e.el;
            const ie = t.anchor = e.anchor
              , de = t.target = e.target
              , ue = t.targetAnchor = e.targetAnchor
              , Z = Rt(e.props)
              , ne = Z ? n : de
              , ce = Z ? ie : ue;
            if (l = l || Jr(de),
            M ? (v(e.dynamicChildren, M, ne, s, o, l, i),
            yr(e, t, !0)) : u || h(e, t, ne, ce, s, o, l, i, !1),
            k)
                Z || Qt(t, n, ie, f, 1);
            else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                const be = t.target = zn(t.props, P);
                be && Qt(t, be, null, f, 0)
            } else
                Z && Qt(t, de, ue, f, 1)
        }
        oo(t)
    },
    remove(e, t, n, r, {um: s, o: {remove: o}}, l) {
        const {shapeFlag: i, children: u, anchor: f, targetAnchor: d, target: h, props: v} = e;
        if (h && o(d),
        (l || !Rt(v)) && (o(f),
        i & 16))
            for (let y = 0; y < u.length; y++) {
                const P = u[y];
                s(P, t, n, !0, !!P.dynamicChildren)
            }
    },
    move: Qt,
    hydrate: pi
};
function Qt(e, t, n, {o: {insert: r}, m: s}, o=2) {
    o === 0 && r(e.targetAnchor, t, n);
    const {el: l, anchor: i, shapeFlag: u, children: f, props: d} = e
      , h = o === 2;
    if (h && r(l, t, n),
    (!h || Rt(d)) && u & 16)
        for (let v = 0; v < f.length; v++)
            s(f[v], t, n, 2);
    h && r(i, t, n)
}
function pi(e, t, n, r, s, o, {o: {nextSibling: l, parentNode: i, querySelector: u}}, f) {
    const d = t.target = zn(t.props, u);
    if (d) {
        const h = d._lpa || d.firstChild;
        if (t.shapeFlag & 16)
            if (Rt(t.props))
                t.anchor = f(l(e), t, i(e), n, r, s, o),
                t.targetAnchor = h;
            else {
                t.anchor = l(e);
                let v = h;
                for (; v; )
                    if (v = l(v),
                    v && v.nodeType === 8 && v.data === "teleport anchor") {
                        t.targetAnchor = v,
                        d._lpa = t.targetAnchor && l(t.targetAnchor);
                        break
                    }
                f(h, t, d, n, r, s, o)
            }
        oo(t)
    }
    return t.anchor && l(t.anchor)
}
const hi = di;
function oo(e) {
    const t = e.ctx;
    if (t && t.ut) {
        let n = e.children[0].el;
        for (; n !== e.targetAnchor; )
            n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
            n = n.nextSibling;
        t.ut()
    }
}
const ve = Symbol.for("v-fgt")
  , wn = Symbol.for("v-txt")
  , qe = Symbol.for("v-cmt")
  , en = Symbol.for("v-stc")
  , Lt = [];
let xe = null;
function lo(e=!1) {
    Lt.push(xe = e ? null : [])
}
function gi() {
    Lt.pop(),
    xe = Lt[Lt.length - 1] || null
}
let Ut = 1;
function Xr(e) {
    Ut += e
}
function io(e) {
    return e.dynamicChildren = Ut > 0 ? xe || ht : null,
    gi(),
    Ut > 0 && xe && xe.push(e),
    e
}
function sc(e, t, n, r, s, o) {
    return io(fo(e, t, n, r, s, o, !0))
}
function uo(e, t, n, r, s) {
    return io(ae(e, t, n, r, s, !0))
}
function cn(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function Tt(e, t) {
    return e.type === t.type && e.key === t.key
}
const En = "__vInternal"
  , co = ({key: e})=>e ?? null
  , tn = ({ref: e, ref_key: t, ref_for: n})=>(typeof e == "number" && (e = "" + e),
e != null ? X(e) || re(e) || $(e) ? {
    i: oe,
    r: e,
    k: t,
    f: !!n
} : e : null);
function fo(e, t=null, n=null, r=0, s=null, o=e === ve ? 0 : 1, l=!1, i=!1) {
    const u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && co(t),
        ref: t && tn(t),
        scopeId: Ks,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: oe
    };
    return i ? (wr(u, n),
    o & 128 && e.normalize(u)) : n && (u.shapeFlag |= X(n) ? 8 : 16),
    Ut > 0 && !l && xe && (u.patchFlag > 0 || o & 6) && u.patchFlag !== 32 && xe.push(u),
    u
}
const ae = mi;
function mi(e, t=null, n=null, r=0, s=null, o=!1) {
    if ((!e || e === Xs) && (e = qe),
    cn(e)) {
        const i = st(e, t, !0);
        return n && wr(i, n),
        Ut > 0 && !o && xe && (i.shapeFlag & 6 ? xe[xe.indexOf(e)] = i : xe.push(i)),
        i.patchFlag |= -2,
        i
    }
    if (Fi(e) && (e = e.__vccOpts),
    t) {
        t = vi(t);
        let {class: i, style: u} = t;
        i && !X(i) && (t.class = lr(i)),
        V(u) && (Cs(u) && !C(u) && (u = te({}, u)),
        t.style = or(u))
    }
    const l = X(e) ? 1 : jl(e) ? 128 : ai(e) ? 64 : V(e) ? 4 : $(e) ? 2 : 0;
    return fo(e, t, n, r, s, l, o, !0)
}
function vi(e) {
    return e ? Cs(e) || En in e ? te({}, e) : e : null
}
function st(e, t, n=!1) {
    const {props: r, ref: s, patchFlag: o, children: l} = e
      , i = t ? _i(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: i,
        key: i && co(i),
        ref: t && t.ref ? n && s ? C(s) ? s.concat(tn(t)) : [s, tn(t)] : tn(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: l,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ve ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && st(e.ssContent),
        ssFallback: e.ssFallback && st(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function bi(e=" ", t=0) {
    return ae(wn, null, e, t)
}
function oc(e, t) {
    const n = ae(en, null, e);
    return n.staticCount = t,
    n
}
function lc(e="", t=!1) {
    return t ? (lo(),
    uo(qe, null, e)) : ae(qe, null, e)
}
function Ie(e) {
    return e == null || typeof e == "boolean" ? ae(qe) : C(e) ? ae(ve, null, e.slice()) : typeof e == "object" ? He(e) : ae(wn, null, String(e))
}
function He(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : st(e)
}
function wr(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null)
        t = null;
    else if (C(t))
        n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1),
            wr(e, s()),
            s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !(En in t) ? t._ctx = oe : s === 3 && oe && (oe.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        $(t) ? (t = {
            default: t,
            _ctx: oe
        },
        n = 32) : (t = String(t),
        r & 64 ? (n = 16,
        t = [bi(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function _i(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class")
                t.class !== r.class && (t.class = lr([t.class, r.class]));
            else if (s === "style")
                t.style = or([t.style, r.style]);
            else if (an(s)) {
                const o = t[s]
                  , l = r[s];
                l && o !== l && !(C(o) && o.includes(l)) && (t[s] = o ? [].concat(o, l) : l)
            } else
                s !== "" && (t[s] = r[s])
    }
    return t
}
function Ce(e, t, n, r=null) {
    Te(e, t, 7, [n, r])
}
const yi = Gs();
let wi = 0;
function Ei(e, t, n) {
    const r = e.type
      , s = (t ? t.appContext : e.appContext) || yi
      , o = {
        uid: wi++,
        vnode: e,
        type: r,
        parent: t,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new zo(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(s.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: to(r, s),
        emitsOptions: Bs(r, s),
        emit: null,
        emitted: null,
        propsDefaults: q,
        inheritAttrs: r.inheritAttrs,
        ctx: q,
        data: q,
        props: q,
        attrs: q,
        slots: q,
        refs: q,
        setupState: q,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return o.ctx = {
        _: o
    },
    o.root = t ? t.root : o,
    o.emit = Ml.bind(null, o),
    e.ce && e.ce(o),
    o
}
let ee = null;
const ao = ()=>ee || oe;
let Er, dt, Qr = "__VUE_INSTANCE_SETTERS__";
(dt = Ln()[Qr]) || (dt = Ln()[Qr] = []),
dt.push(e=>ee = e),
Er = e=>{
    dt.length > 1 ? dt.forEach(t=>t(e)) : dt[0](e)
}
;
const _t = e=>{
    Er(e),
    e.scope.on()
}
  , tt = ()=>{
    ee && ee.scope.off(),
    Er(null)
}
;
function po(e) {
    return e.vnode.shapeFlag & 4
}
let Bt = !1;
function xi(e, t=!1) {
    Bt = t;
    const {props: n, children: r} = e.vnode
      , s = po(e);
    ri(e, n, s, t),
    li(e, r);
    const o = s ? Oi(e, t) : void 0;
    return Bt = !1,
    o
}
function Oi(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = Is(new Proxy(e.ctx,Jl));
    const {setup: r} = n;
    if (r) {
        const s = e.setupContext = r.length > 1 ? Pi(e) : null;
        _t(e),
        wt();
        const o = Ke(r, e, 0, [e.props, s]);
        if (Et(),
        tt(),
        hs(o)) {
            if (o.then(tt, tt),
            t)
                return o.then(l=>{
                    Zr(e, l, t)
                }
                ).catch(l=>{
                    bn(l, e, 0)
                }
                );
            e.asyncDep = o
        } else
            Zr(e, o, t)
    } else
        ho(e, t)
}
function Zr(e, t, n) {
    $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : V(t) && (e.setupState = Ls(t)),
    ho(e, n)
}
let Gr;
function ho(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && Gr && !r.render) {
            const s = r.template || br(e).template;
            if (s) {
                const {isCustomElement: o, compilerOptions: l} = e.appContext.config
                  , {delimiters: i, compilerOptions: u} = r
                  , f = te(te({
                    isCustomElement: o,
                    delimiters: i
                }, l), u);
                r.render = Gr(s, f)
            }
        }
        e.render = r.render || Oe
    }
    _t(e),
    wt(),
    Xl(e),
    Et(),
    tt()
}
function Ti(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs,{
        get(t, n) {
            return ge(e, "get", "$attrs"),
            t[n]
        }
    }))
}
function Pi(e) {
    const t = n=>{
        e.exposed = n || {}
    }
    ;
    return {
        get attrs() {
            return Ti(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function xr(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(Ls(Is(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in St)
                    return St[n](e)
            },
            has(t, n) {
                return n in t || n in St
            }
        }))
}
function Ai(e, t=!0) {
    return $(e) ? e.displayName || e.name : e.name || t && e.__name
}
function Fi(e) {
    return $(e) && "__vccOpts"in e
}
const W = (e,t)=>Tl(e, t, Bt);
function we(e, t, n) {
    const r = arguments.length;
    return r === 2 ? V(t) && !C(t) ? cn(t) ? ae(e, null, [t]) : ae(e, t) : ae(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && cn(n) && (n = [n]),
    ae(e, t, n))
}
const Ci = Symbol.for("v-scx")
  , Ii = ()=>Pe(Ci)
  , Mi = "3.3.2"
  , $i = "http://www.w3.org/2000/svg"
  , Qe = typeof document < "u" ? document : null
  , es = Qe && Qe.createElement("template")
  , Si = {
    insert: (e,t,n)=>{
        t.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,n,r)=>{
        const s = t ? Qe.createElementNS($i, e) : Qe.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple),
        s
    }
    ,
    createText: e=>Qe.createTextNode(e),
    createComment: e=>Qe.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>Qe.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, s, o) {
        const l = n ? n.previousSibling : t.lastChild;
        if (s && (s === o || s.nextSibling))
            for (; t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling)); )
                ;
        else {
            es.innerHTML = r ? `<svg>${e}</svg>` : e;
            const i = es.content;
            if (r) {
                const u = i.firstChild;
                for (; u.firstChild; )
                    i.appendChild(u.firstChild);
                i.removeChild(u)
            }
            t.insertBefore(i, n)
        }
        return [l ? l.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
function Ri(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function Li(e, t, n) {
    const r = e.style
      , s = X(n);
    if (n && !s) {
        if (t && !X(t))
            for (const o in t)
                n[o] == null && Vn(r, o, "");
        for (const o in n)
            Vn(r, o, n[o])
    } else {
        const o = r.display;
        s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
        "_vod"in e && (r.display = o)
    }
}
const ts = /\s*!important$/;
function Vn(e, t, n) {
    if (C(n))
        n.forEach(r=>Vn(e, t, r));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const r = Ni(e, t);
        ts.test(n) ? e.setProperty(yt(r), n.replace(ts, ""), "important") : e[r] = n
    }
}
const ns = ["Webkit", "Moz", "ms"]
  , In = {};
function Ni(e, t) {
    const n = In[t];
    if (n)
        return n;
    let r = $e(t);
    if (r !== "filter" && r in e)
        return In[t] = r;
    r = hn(r);
    for (let s = 0; s < ns.length; s++) {
        const o = ns[s] + r;
        if (o in e)
            return In[t] = o
    }
    return t
}
const rs = "http://www.w3.org/1999/xlink";
function ji(e, t, n, r, s) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(rs, t.slice(6, t.length)) : e.setAttributeNS(rs, t, n);
    else {
        const o = qo(t);
        n == null || o && !vs(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}
function Di(e, t, n, r, s, o, l) {
    if (t === "innerHTML" || t === "textContent") {
        r && l(r, s, o),
        e[t] = n ?? "";
        return
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
        e._value = n;
        const f = i === "OPTION" ? e.getAttribute("value") : e.value
          , d = n ?? "";
        f !== d && (e.value = d),
        n == null && e.removeAttribute(t);
        return
    }
    let u = !1;
    if (n === "" || n == null) {
        const f = typeof e[t];
        f === "boolean" ? n = vs(n) : n == null && f === "string" ? (n = "",
        u = !0) : f === "number" && (n = 0,
        u = !0)
    }
    try {
        e[t] = n
    } catch {}
    u && e.removeAttribute(t)
}
function Hi(e, t, n, r) {
    e.addEventListener(t, n, r)
}
function Ui(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
function Bi(e, t, n, r, s=null) {
    const o = e._vei || (e._vei = {})
      , l = o[t];
    if (r && l)
        l.value = r;
    else {
        const [i,u] = Ki(t);
        if (r) {
            const f = o[t] = qi(r, s);
            Hi(e, i, f, u)
        } else
            l && (Ui(e, i, l, u),
            o[t] = void 0)
    }
}
const ss = /(?:Once|Passive|Capture)$/;
function Ki(e) {
    let t;
    if (ss.test(e)) {
        t = {};
        let r;
        for (; r = e.match(ss); )
            e = e.slice(0, e.length - r[0].length),
            t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : yt(e.slice(2)), t]
}
let Mn = 0;
const Wi = Promise.resolve()
  , ki = ()=>Mn || (Wi.then(()=>Mn = 0),
Mn = Date.now());
function qi(e, t) {
    const n = r=>{
        if (!r._vts)
            r._vts = Date.now();
        else if (r._vts <= n.attached)
            return;
        Te(zi(r, n.value), t, 5, [r])
    }
    ;
    return n.value = e,
    n.attached = ki(),
    n
}
function zi(e, t) {
    if (C(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(r=>s=>!s._stopped && r && r(s))
    } else
        return t
}
const os = /^on[a-z]/
  , Vi = (e,t,n,r,s=!1,o,l,i,u)=>{
    t === "class" ? Ri(e, r, s) : t === "style" ? Li(e, n, r) : an(t) ? tr(t) || Bi(e, t, n, r, l) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : Yi(e, t, r, s)) ? Di(e, t, r, o, l, i, u) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r),
    ji(e, t, r, s))
}
;
function Yi(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && os.test(t) && $(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || os.test(t) && X(n) ? !1 : t in e
}
const Ji = te({
    patchProp: Vi
}, Si);
let ls;
function Xi() {
    return ls || (ls = ui(Ji))
}
const ic = (...e)=>{
    const t = Xi().createApp(...e)
      , {mount: n} = t;
    return t.mount = r=>{
        const s = Qi(r);
        if (!s)
            return;
        const o = t._component;
        !$(o) && !o.render && !o.template && (o.template = s.innerHTML),
        s.innerHTML = "";
        const l = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"),
        s.setAttribute("data-v-app", "")),
        l
    }
    ,
    t
}
;
function Qi(e) {
    return X(e) ? document.querySelector(e) : e
}
function ot(e, t, ...n) {
    if (e in t) {
        let s = t[e];
        return typeof s == "function" ? s(...n) : s
    }
    let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(s=>`"${s}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, ot),
    r
}
var Yn = (e=>(e[e.None = 0] = "None",
e[e.RenderStrategy = 1] = "RenderStrategy",
e[e.Static = 2] = "Static",
e))(Yn || {})
  , Zi = (e=>(e[e.Unmount = 0] = "Unmount",
e[e.Hidden = 1] = "Hidden",
e))(Zi || {});
function it({visible: e=!0, features: t=0, ourProps: n, theirProps: r, ...s}) {
    var o;
    let l = mo(r, n)
      , i = Object.assign(s, {
        props: l
    });
    if (e || t & 2 && l.static)
        return $n(i);
    if (t & 1) {
        let u = (o = l.unmount) == null || o ? 0 : 1;
        return ot(u, {
            [0]() {
                return null
            },
            [1]() {
                return $n({
                    ...s,
                    props: {
                        ...l,
                        hidden: !0,
                        style: {
                            display: "none"
                        }
                    }
                })
            }
        })
    }
    return $n(i)
}
function $n({props: e, attrs: t, slots: n, slot: r, name: s}) {
    var o, l;
    let {as: i, ...u} = Gi(e, ["unmount", "static"])
      , f = (o = n.default) == null ? void 0 : o.call(n, r)
      , d = {};
    if (r) {
        let h = !1
          , v = [];
        for (let[y,P] of Object.entries(r))
            typeof P == "boolean" && (h = !0),
            P === !0 && v.push(y);
        h && (d["data-headlessui-state"] = v.join(" "))
    }
    if (i === "template") {
        if (f = go(f ?? []),
        Object.keys(u).length > 0 || Object.keys(t).length > 0) {
            let[h,...v] = f ?? [];
            if (!eu(h) || v.length > 0)
                throw new Error(['Passing props on "template"!', "", `The current component <${s} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(u).concat(Object.keys(t)).map(O=>O.trim()).filter((O,B,k)=>k.indexOf(O) === B).sort((O,B)=>O.localeCompare(B)).map(O=>`  - ${O}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map(O=>`  - ${O}`).join(`
`)].join(`
`));
            let y = mo((l = h.props) != null ? l : {}, u)
              , P = st(h, y);
            for (let O in y)
                O.startsWith("on") && (P.props || (P.props = {}),
                P.props[O] = y[O]);
            return P
        }
        return Array.isArray(f) && f.length === 1 ? f[0] : f
    }
    return we(i, Object.assign({}, u, d), {
        default: ()=>f
    })
}
function go(e) {
    return e.flatMap(t=>t.type === ve ? go(t.children) : [t])
}
function mo(...e) {
    if (e.length === 0)
        return {};
    if (e.length === 1)
        return e[0];
    let t = {}
      , n = {};
    for (let r of e)
        for (let s in r)
            s.startsWith("on") && typeof r[s] == "function" ? (n[s] != null || (n[s] = []),
            n[s].push(r[s])) : t[s] = r[s];
    if (t.disabled || t["aria-disabled"])
        return Object.assign(t, Object.fromEntries(Object.keys(n).map(r=>[r, void 0])));
    for (let r in n)
        Object.assign(t, {
            [r](s, ...o) {
                let l = n[r];
                for (let i of l) {
                    if (s instanceof Event && s.defaultPrevented)
                        return;
                    i(s, ...o)
                }
            }
        });
    return t
}
function Gi(e, t=[]) {
    let n = Object.assign({}, e);
    for (let r of t)
        r in n && delete n[r];
    return n
}
function eu(e) {
    return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function"
}
let tu = 0;
function nu() {
    return ++tu
}
function vo() {
    return nu()
}
var bo = (e=>(e.Space = " ",
e.Enter = "Enter",
e.Escape = "Escape",
e.Backspace = "Backspace",
e.Delete = "Delete",
e.ArrowLeft = "ArrowLeft",
e.ArrowUp = "ArrowUp",
e.ArrowRight = "ArrowRight",
e.ArrowDown = "ArrowDown",
e.Home = "Home",
e.End = "End",
e.PageUp = "PageUp",
e.PageDown = "PageDown",
e.Tab = "Tab",
e))(bo || {});
function le(e) {
    var t;
    return e == null || e.value == null ? null : (t = e.value.$el) != null ? t : e.value
}
let ru = Symbol("Context");
var It = (e=>(e[e.Open = 1] = "Open",
e[e.Closed = 2] = "Closed",
e[e.Closing = 4] = "Closing",
e[e.Opening = 8] = "Opening",
e))(It || {});
function su() {
    return Pe(ru, null)
}
var ou = Object.defineProperty
  , lu = (e,t,n)=>t in e ? ou(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n
  , is = (e,t,n)=>(lu(e, typeof t != "symbol" ? t + "" : t, n),
n);
class iu {
    constructor() {
        is(this, "current", this.detect()),
        is(this, "currentId", 0)
    }
    set(t) {
        this.current !== t && (this.currentId = 0,
        this.current = t)
    }
    reset() {
        this.set(this.detect())
    }
    nextId() {
        return ++this.currentId
    }
    get isServer() {
        return this.current === "server"
    }
    get isClient() {
        return this.current === "client"
    }
    detect() {
        return typeof window > "u" || typeof document > "u" ? "server" : "client"
    }
}
let xn = new iu;
function Kt(e) {
    if (xn.isServer)
        return null;
    if (e instanceof Node)
        return e.ownerDocument;
    if (e != null && e.hasOwnProperty("value")) {
        let t = le(e);
        if (t)
            return t.ownerDocument
    }
    return document
}
let Jn = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");
var Ue = (e=>(e[e.First = 1] = "First",
e[e.Previous = 2] = "Previous",
e[e.Next = 4] = "Next",
e[e.Last = 8] = "Last",
e[e.WrapAround = 16] = "WrapAround",
e[e.NoScroll = 32] = "NoScroll",
e))(Ue || {})
  , _o = (e=>(e[e.Error = 0] = "Error",
e[e.Overflow = 1] = "Overflow",
e[e.Success = 2] = "Success",
e[e.Underflow = 3] = "Underflow",
e))(_o || {})
  , uu = (e=>(e[e.Previous = -1] = "Previous",
e[e.Next = 1] = "Next",
e))(uu || {});
function cu(e=document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(Jn)).sort((t,n)=>Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)))
}
var yo = (e=>(e[e.Strict = 0] = "Strict",
e[e.Loose = 1] = "Loose",
e))(yo || {});
function fu(e, t=0) {
    var n;
    return e === ((n = Kt(e)) == null ? void 0 : n.body) ? !1 : ot(t, {
        [0]() {
            return e.matches(Jn)
        },
        [1]() {
            let r = e;
            for (; r !== null; ) {
                if (r.matches(Jn))
                    return !0;
                r = r.parentElement
            }
            return !1
        }
    })
}
var au = (e=>(e[e.Keyboard = 0] = "Keyboard",
e[e.Mouse = 1] = "Mouse",
e))(au || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", e=>{
    e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "")
}
, !0),
document.addEventListener("click", e=>{
    e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "")
}
, !0));
function nt(e) {
    e == null || e.focus({
        preventScroll: !0
    })
}
let du = ["textarea", "input"].join(",");
function pu(e) {
    var t, n;
    return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, du)) != null ? n : !1
}
function hu(e, t=n=>n) {
    return e.slice().sort((n,r)=>{
        let s = t(n)
          , o = t(r);
        if (s === null || o === null)
            return 0;
        let l = s.compareDocumentPosition(o);
        return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
    }
    )
}
function nn(e, t, {sorted: n=!0, relativeTo: r=null, skipElements: s=[]}={}) {
    var o;
    let l = (o = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? o : document
      , i = Array.isArray(e) ? n ? hu(e) : e : cu(e);
    s.length > 0 && i.length > 1 && (i = i.filter(P=>!s.includes(P))),
    r = r ?? l.activeElement;
    let u = (()=>{
        if (t & 5)
            return 1;
        if (t & 10)
            return -1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), f = (()=>{
        if (t & 1)
            return 0;
        if (t & 2)
            return Math.max(0, i.indexOf(r)) - 1;
        if (t & 4)
            return Math.max(0, i.indexOf(r)) + 1;
        if (t & 8)
            return i.length - 1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), d = t & 32 ? {
        preventScroll: !0
    } : {}, h = 0, v = i.length, y;
    do {
        if (h >= v || h + v <= 0)
            return 0;
        let P = f + h;
        if (t & 16)
            P = (P + v) % v;
        else {
            if (P < 0)
                return 3;
            if (P >= v)
                return 1
        }
        y = i[P],
        y == null || y.focus(d),
        h += u
    } while (y !== l.activeElement);
    return t & 6 && pu(y) && y.select(),
    2
}
function Sn(e, t, n) {
    xn.isServer || Ne(r=>{
        document.addEventListener(e, t, n),
        r(()=>document.removeEventListener(e, t, n))
    }
    )
}
function gu(e, t, n=W(()=>!0)) {
    function r(o, l) {
        if (!n.value || o.defaultPrevented)
            return;
        let i = l(o);
        if (i === null || !i.getRootNode().contains(i))
            return;
        let u = function f(d) {
            return typeof d == "function" ? f(d()) : Array.isArray(d) || d instanceof Set ? d : [d]
        }(e);
        for (let f of u) {
            if (f === null)
                continue;
            let d = f instanceof HTMLElement ? f : le(f);
            if (d != null && d.contains(i) || o.composed && o.composedPath().includes(d))
                return
        }
        return !fu(i, yo.Loose) && i.tabIndex !== -1 && o.preventDefault(),
        t(o, i)
    }
    let s = z(null);
    Sn("mousedown", o=>{
        var l, i;
        n.value && (s.value = ((i = (l = o.composedPath) == null ? void 0 : l.call(o)) == null ? void 0 : i[0]) || o.target)
    }
    , !0),
    Sn("click", o=>{
        s.value && (r(o, ()=>s.value),
        s.value = null)
    }
    , !0),
    Sn("blur", o=>r(o, ()=>window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0)
}
var fn = (e=>(e[e.None = 1] = "None",
e[e.Focusable = 2] = "Focusable",
e[e.Hidden = 4] = "Hidden",
e))(fn || {});
let Xn = lt({
    name: "Hidden",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        features: {
            type: Number,
            default: 1
        }
    },
    setup(e, {slots: t, attrs: n}) {
        return ()=>{
            let {features: r, ...s} = e
              , o = {
                "aria-hidden": (r & 2) === 2 ? !0 : void 0,
                style: {
                    position: "fixed",
                    top: 1,
                    left: 1,
                    width: 1,
                    height: 0,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: "0",
                    ...(r & 4) === 4 && (r & 2) !== 2 && {
                        display: "none"
                    }
                }
            };
            return it({
                ourProps: o,
                theirProps: s,
                slot: {},
                attrs: n,
                slots: t,
                name: "Hidden"
            })
        }
    }
});
function mu() {
    return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0
}
function vu(e, t, n) {
    xn.isServer || Ne(r=>{
        window.addEventListener(e, t, n),
        r(()=>window.removeEventListener(e, t, n))
    }
    )
}
var Mt = (e=>(e[e.Forwards = 0] = "Forwards",
e[e.Backwards = 1] = "Backwards",
e))(Mt || {});
function bu() {
    let e = z(0);
    return vu("keydown", t=>{
        t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0)
    }
    ),
    e
}
function wo(e, t, n, r) {
    xn.isServer || Ne(s=>{
        e = e ?? window,
        e.addEventListener(t, n, r),
        s(()=>e.removeEventListener(t, n, r))
    }
    )
}
function Eo(e) {
    typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch(t=>setTimeout(()=>{
        throw t
    }
    ))
}
function _u(e) {
    function t() {
        document.readyState !== "loading" && (e(),
        document.removeEventListener("DOMContentLoaded", t))
    }
    typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t),
    t())
}
function xo(e) {
    if (!e)
        return new Set;
    if (typeof e == "function")
        return new Set(e());
    let t = new Set;
    for (let n of e.value) {
        let r = le(n);
        r instanceof HTMLElement && t.add(r)
    }
    return t
}
var Oo = (e=>(e[e.None = 1] = "None",
e[e.InitialFocus = 2] = "InitialFocus",
e[e.TabLock = 4] = "TabLock",
e[e.FocusLock = 8] = "FocusLock",
e[e.RestoreFocus = 16] = "RestoreFocus",
e[e.All = 30] = "All",
e))(Oo || {});
let Pt = Object.assign(lt({
    name: "FocusTrap",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        initialFocus: {
            type: Object,
            default: null
        },
        features: {
            type: Number,
            default: 30
        },
        containers: {
            type: [Object, Function],
            default: z(new Set)
        }
    },
    inheritAttrs: !1,
    setup(e, {attrs: t, slots: n, expose: r}) {
        let s = z(null);
        r({
            el: s,
            $el: s
        });
        let o = W(()=>Kt(s))
          , l = z(!1);
        rt(()=>l.value = !0),
        ze(()=>l.value = !1),
        wu({
            ownerDocument: o
        }, W(()=>l.value && !!(e.features & 16)));
        let i = Eu({
            ownerDocument: o,
            container: s,
            initialFocus: W(()=>e.initialFocus)
        }, W(()=>l.value && !!(e.features & 2)));
        xu({
            ownerDocument: o,
            container: s,
            containers: e.containers,
            previousActiveElement: i
        }, W(()=>l.value && !!(e.features & 8)));
        let u = bu();
        function f(y) {
            let P = le(s);
            P && (O=>O())(()=>{
                ot(u.value, {
                    [Mt.Forwards]: ()=>{
                        nn(P, Ue.First, {
                            skipElements: [y.relatedTarget]
                        })
                    }
                    ,
                    [Mt.Backwards]: ()=>{
                        nn(P, Ue.Last, {
                            skipElements: [y.relatedTarget]
                        })
                    }
                })
            }
            )
        }
        let d = z(!1);
        function h(y) {
            y.key === "Tab" && (d.value = !0,
            requestAnimationFrame(()=>{
                d.value = !1
            }
            ))
        }
        function v(y) {
            if (!l.value)
                return;
            let P = xo(e.containers);
            le(s)instanceof HTMLElement && P.add(le(s));
            let O = y.relatedTarget;
            O instanceof HTMLElement && O.dataset.headlessuiFocusGuard !== "true" && (To(P, O) || (d.value ? nn(le(s), ot(u.value, {
                [Mt.Forwards]: ()=>Ue.Next,
                [Mt.Backwards]: ()=>Ue.Previous
            }) | Ue.WrapAround, {
                relativeTo: y.target
            }) : y.target instanceof HTMLElement && nt(y.target)))
        }
        return ()=>{
            let y = {}
              , P = {
                ref: s,
                onKeydown: h,
                onFocusout: v
            }
              , {features: O, initialFocus: B, containers: k, ...Y} = e;
            return we(ve, [!!(O & 4) && we(Xn, {
                as: "button",
                type: "button",
                "data-headlessui-focus-guard": !0,
                onFocus: f,
                features: fn.Focusable
            }), it({
                ourProps: P,
                theirProps: {
                    ...t,
                    ...Y
                },
                slot: y,
                attrs: t,
                slots: n,
                name: "FocusTrap"
            }), !!(O & 4) && we(Xn, {
                as: "button",
                type: "button",
                "data-headlessui-focus-guard": !0,
                onFocus: f,
                features: fn.Focusable
            })])
        }
    }
}), {
    features: Oo
})
  , Ze = [];
_u(()=>{
    function e(t) {
        t.target instanceof HTMLElement && t.target !== document.body && Ze[0] !== t.target && (Ze.unshift(t.target),
        Ze = Ze.filter(n=>n != null && n.isConnected),
        Ze.splice(10))
    }
    window.addEventListener("click", e, {
        capture: !0
    }),
    window.addEventListener("mousedown", e, {
        capture: !0
    }),
    window.addEventListener("focus", e, {
        capture: !0
    }),
    document.body.addEventListener("click", e, {
        capture: !0
    }),
    document.body.addEventListener("mousedown", e, {
        capture: !0
    }),
    document.body.addEventListener("focus", e, {
        capture: !0
    })
}
);
function yu(e) {
    let t = z(Ze.slice());
    return We([e], ([n],[r])=>{
        r === !0 && n === !1 ? Eo(()=>{
            t.value.splice(0)
        }
        ) : r === !1 && n === !0 && (t.value = Ze.slice())
    }
    , {
        flush: "post"
    }),
    ()=>{
        var n;
        return (n = t.value.find(r=>r != null && r.isConnected)) != null ? n : null
    }
}
function wu({ownerDocument: e}, t) {
    let n = yu(t);
    rt(()=>{
        Ne(()=>{
            var r, s;
            t.value || ((r = e.value) == null ? void 0 : r.activeElement) === ((s = e.value) == null ? void 0 : s.body) && nt(n())
        }
        , {
            flush: "post"
        })
    }
    ),
    ze(()=>{
        nt(n())
    }
    )
}
function Eu({ownerDocument: e, container: t, initialFocus: n}, r) {
    let s = z(null)
      , o = z(!1);
    return rt(()=>o.value = !0),
    ze(()=>o.value = !1),
    rt(()=>{
        We([t, n, r], (l,i)=>{
            if (l.every((f,d)=>(i == null ? void 0 : i[d]) === f) || !r.value)
                return;
            let u = le(t);
            u && Eo(()=>{
                var f, d;
                if (!o.value)
                    return;
                let h = le(n)
                  , v = (f = e.value) == null ? void 0 : f.activeElement;
                if (h) {
                    if (h === v) {
                        s.value = v;
                        return
                    }
                } else if (u.contains(v)) {
                    s.value = v;
                    return
                }
                h ? nt(h) : nn(u, Ue.First | Ue.NoScroll) === _o.Error && console.warn("There are no focusable elements inside the <FocusTrap />"),
                s.value = (d = e.value) == null ? void 0 : d.activeElement
            }
            )
        }
        , {
            immediate: !0,
            flush: "post"
        })
    }
    ),
    s
}
function xu({ownerDocument: e, container: t, containers: n, previousActiveElement: r}, s) {
    var o;
    wo((o = e.value) == null ? void 0 : o.defaultView, "focus", l=>{
        if (!s.value)
            return;
        let i = xo(n);
        le(t)instanceof HTMLElement && i.add(le(t));
        let u = r.value;
        if (!u)
            return;
        let f = l.target;
        f && f instanceof HTMLElement ? To(i, f) ? (r.value = f,
        nt(f)) : (l.preventDefault(),
        l.stopPropagation(),
        nt(u)) : nt(r.value)
    }
    , !0)
}
function To(e, t) {
    for (let n of e)
        if (n.contains(t))
            return !0;
    return !1
}
let Rn = new Map
  , At = new Map;
function us(e, t=z(!0)) {
    Ne(n=>{
        var r;
        if (!t.value)
            return;
        let s = le(e);
        if (!s)
            return;
        n(function() {
            var l;
            if (!s)
                return;
            let i = (l = At.get(s)) != null ? l : 1;
            if (i === 1 ? At.delete(s) : At.set(s, i - 1),
            i !== 1)
                return;
            let u = Rn.get(s);
            u && (u["aria-hidden"] === null ? s.removeAttribute("aria-hidden") : s.setAttribute("aria-hidden", u["aria-hidden"]),
            s.inert = u.inert,
            Rn.delete(s))
        });
        let o = (r = At.get(s)) != null ? r : 0;
        At.set(s, o + 1),
        o === 0 && (Rn.set(s, {
            "aria-hidden": s.getAttribute("aria-hidden"),
            inert: s.inert
        }),
        s.setAttribute("aria-hidden", "true"),
        s.inert = !0)
    }
    )
}
let Po = Symbol("ForcePortalRootContext");
function Ou() {
    return Pe(Po, !1)
}
let cs = lt({
    name: "ForcePortalRoot",
    props: {
        as: {
            type: [Object, String],
            default: "template"
        },
        force: {
            type: Boolean,
            default: !1
        }
    },
    setup(e, {slots: t, attrs: n}) {
        return xt(Po, e.force),
        ()=>{
            let {force: r, ...s} = e;
            return it({
                theirProps: s,
                ourProps: {},
                slot: {},
                slots: t,
                attrs: n,
                name: "ForcePortalRoot"
            })
        }
    }
});
function Tu(e) {
    let t = Kt(e);
    if (!t) {
        if (e === null)
            return null;
        throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`)
    }
    let n = t.getElementById("headlessui-portal-root");
    if (n)
        return n;
    let r = t.createElement("div");
    return r.setAttribute("id", "headlessui-portal-root"),
    t.body.appendChild(r)
}
let Pu = lt({
    name: "Portal",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        }
    },
    setup(e, {slots: t, attrs: n}) {
        let r = z(null)
          , s = W(()=>Kt(r))
          , o = Ou()
          , l = Pe(Ao, null)
          , i = z(o === !0 || l == null ? Tu(r.value) : l.resolveTarget());
        return Ne(()=>{
            o || l != null && (i.value = l.resolveTarget())
        }
        ),
        ze(()=>{
            var u, f;
            let d = (u = s.value) == null ? void 0 : u.getElementById("headlessui-portal-root");
            d && i.value === d && i.value.children.length <= 0 && ((f = i.value.parentElement) == null || f.removeChild(i.value))
        }
        ),
        ()=>{
            if (i.value === null)
                return null;
            let u = {
                ref: r,
                "data-headlessui-portal": ""
            };
            return we(hi, {
                to: i.value
            }, it({
                ourProps: u,
                theirProps: e,
                slot: {},
                attrs: n,
                slots: t,
                name: "Portal"
            }))
        }
    }
})
  , Ao = Symbol("PortalGroupContext")
  , Au = lt({
    name: "PortalGroup",
    props: {
        as: {
            type: [Object, String],
            default: "template"
        },
        target: {
            type: Object,
            default: null
        }
    },
    setup(e, {attrs: t, slots: n}) {
        let r = mn({
            resolveTarget() {
                return e.target
            }
        });
        return xt(Ao, r),
        ()=>{
            let {target: s, ...o} = e;
            return it({
                theirProps: o,
                ourProps: {},
                slot: {},
                attrs: t,
                slots: n,
                name: "PortalGroup"
            })
        }
    }
})
  , Fo = Symbol("StackContext");
var Qn = (e=>(e[e.Add = 0] = "Add",
e[e.Remove = 1] = "Remove",
e))(Qn || {});
function Fu() {
    return Pe(Fo, ()=>{}
    )
}
function Cu({type: e, enabled: t, element: n, onUpdate: r}) {
    let s = Fu();
    function o(...l) {
        r == null || r(...l),
        s(...l)
    }
    rt(()=>{
        We(t, (l,i)=>{
            l ? o(0, e, n) : i === !0 && o(1, e, n)
        }
        , {
            immediate: !0,
            flush: "sync"
        })
    }
    ),
    ze(()=>{
        t.value && o(1, e, n)
    }
    ),
    xt(Fo, o)
}
let Iu = Symbol("DescriptionContext");
function Mu({slot: e=z({}), name: t="Description", props: n={}}={}) {
    let r = z([]);
    function s(o) {
        return r.value.push(o),
        ()=>{
            let l = r.value.indexOf(o);
            l !== -1 && r.value.splice(l, 1)
        }
    }
    return xt(Iu, {
        register: s,
        slot: e,
        name: t,
        props: n
    }),
    W(()=>r.value.length > 0 ? r.value.join(" ") : void 0)
}
function $u(e) {
    let t = Ss(e.getSnapshot());
    return ze(e.subscribe(()=>{
        t.value = e.getSnapshot()
    }
    )),
    t
}
function Co() {
    let e = []
      , t = {
        addEventListener(n, r, s, o) {
            return n.addEventListener(r, s, o),
            t.add(()=>n.removeEventListener(r, s, o))
        },
        requestAnimationFrame(...n) {
            let r = requestAnimationFrame(...n);
            t.add(()=>cancelAnimationFrame(r))
        },
        nextFrame(...n) {
            t.requestAnimationFrame(()=>{
                t.requestAnimationFrame(...n)
            }
            )
        },
        setTimeout(...n) {
            let r = setTimeout(...n);
            t.add(()=>clearTimeout(r))
        },
        style(n, r, s) {
            let o = n.style.getPropertyValue(r);
            return Object.assign(n.style, {
                [r]: s
            }),
            this.add(()=>{
                Object.assign(n.style, {
                    [r]: o
                })
            }
            )
        },
        group(n) {
            let r = Co();
            return n(r),
            this.add(()=>r.dispose())
        },
        add(n) {
            return e.push(n),
            ()=>{
                let r = e.indexOf(n);
                if (r >= 0)
                    for (let s of e.splice(r, 1))
                        s()
            }
        },
        dispose() {
            for (let n of e.splice(0))
                n()
        }
    };
    return t
}
function Su(e, t) {
    let n = e()
      , r = new Set;
    return {
        getSnapshot() {
            return n
        },
        subscribe(s) {
            return r.add(s),
            ()=>r.delete(s)
        },
        dispatch(s, ...o) {
            let l = t[s].call(n, ...o);
            l && (n = l,
            r.forEach(i=>i()))
        }
    }
}
function Ru() {
    let e;
    return {
        before({doc: t}) {
            var n;
            let r = t.documentElement;
            e = ((n = t.defaultView) != null ? n : window).innerWidth - r.clientWidth
        },
        after({doc: t, d: n}) {
            let r = t.documentElement
              , s = r.clientWidth - r.offsetWidth
              , o = e - s;
            n.style(r, "paddingRight", `${o}px`)
        }
    }
}
function Lu() {
    if (!mu())
        return {};
    let e;
    return {
        before() {
            e = window.pageYOffset
        },
        after({doc: t, d: n, meta: r}) {
            function s(l) {
                return r.containers.flatMap(i=>i()).some(i=>i.contains(l))
            }
            n.style(t.body, "marginTop", `-${e}px`),
            window.scrollTo(0, 0);
            let o = null;
            n.addEventListener(t, "click", l=>{
                if (l.target instanceof HTMLElement)
                    try {
                        let i = l.target.closest("a");
                        if (!i)
                            return;
                        let {hash: u} = new URL(i.href)
                          , f = t.querySelector(u);
                        f && !s(f) && (o = f)
                    } catch {}
            }
            , !0),
            n.addEventListener(t, "touchmove", l=>{
                l.target instanceof HTMLElement && !s(l.target) && l.preventDefault()
            }
            , {
                passive: !1
            }),
            n.add(()=>{
                window.scrollTo(0, window.pageYOffset + e),
                o && o.isConnected && (o.scrollIntoView({
                    block: "nearest"
                }),
                o = null)
            }
            )
        }
    }
}
function Nu() {
    return {
        before({doc: e, d: t}) {
            t.style(e.documentElement, "overflow", "hidden")
        }
    }
}
function ju(e) {
    let t = {};
    for (let n of e)
        Object.assign(t, n(t));
    return t
}
let Ge = Su(()=>new Map, {
    PUSH(e, t) {
        var n;
        let r = (n = this.get(e)) != null ? n : {
            doc: e,
            count: 0,
            d: Co(),
            meta: new Set
        };
        return r.count++,
        r.meta.add(t),
        this.set(e, r),
        this
    },
    POP(e, t) {
        let n = this.get(e);
        return n && (n.count--,
        n.meta.delete(t)),
        this
    },
    SCROLL_PREVENT({doc: e, d: t, meta: n}) {
        let r = {
            doc: e,
            d: t,
            meta: ju(n)
        }
          , s = [Lu(), Ru(), Nu()];
        s.forEach(({before: o})=>o == null ? void 0 : o(r)),
        s.forEach(({after: o})=>o == null ? void 0 : o(r))
    },
    SCROLL_ALLOW({d: e}) {
        e.dispose()
    },
    TEARDOWN({doc: e}) {
        this.delete(e)
    }
});
Ge.subscribe(()=>{
    let e = Ge.getSnapshot()
      , t = new Map;
    for (let[n] of e)
        t.set(n, n.documentElement.style.overflow);
    for (let n of e.values()) {
        let r = t.get(n.doc) === "hidden"
          , s = n.count !== 0;
        (s && !r || !s && r) && Ge.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n),
        n.count === 0 && Ge.dispatch("TEARDOWN", n)
    }
}
);
function Du(e, t, n) {
    let r = $u(Ge)
      , s = W(()=>{
        let o = e.value ? r.value.get(e.value) : void 0;
        return o ? o.count > 0 : !1
    }
    );
    return We([e, t], ([o,l],[i],u)=>{
        if (!o || !l)
            return;
        Ge.dispatch("PUSH", o, n);
        let f = !1;
        u(()=>{
            f || (Ge.dispatch("POP", i ?? o, n),
            f = !0)
        }
        )
    }
    , {
        immediate: !0
    }),
    s
}
var Hu = (e=>(e[e.Open = 0] = "Open",
e[e.Closed = 1] = "Closed",
e))(Hu || {});
let Zn = Symbol("DialogContext");
function Io(e) {
    let t = Pe(Zn, null);
    if (t === null) {
        let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(n, Io),
        n
    }
    return t
}
let Zt = "DC8F892D-2EBD-447C-A4C8-A03058436FF4"
  , uc = lt({
    name: "Dialog",
    inheritAttrs: !1,
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        static: {
            type: Boolean,
            default: !1
        },
        unmount: {
            type: Boolean,
            default: !0
        },
        open: {
            type: [Boolean, String],
            default: Zt
        },
        initialFocus: {
            type: Object,
            default: null
        },
        id: {
            type: String,
            default: ()=>`headlessui-dialog-${vo()}`
        }
    },
    emits: {
        close: e=>!0
    },
    setup(e, {emit: t, attrs: n, slots: r, expose: s}) {
        var o;
        let l = z(!1);
        rt(()=>{
            l.value = !0
        }
        );
        let i = z(0)
          , u = su()
          , f = W(()=>e.open === Zt && u !== null ? (u.value & It.Open) === It.Open : e.open)
          , d = z(null)
          , h = z(null)
          , v = W(()=>Kt(d));
        if (s({
            el: d,
            $el: d
        }),
        !(e.open !== Zt || u !== null))
            throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
        if (typeof f.value != "boolean")
            throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${f.value === Zt ? void 0 : e.open}`);
        let y = W(()=>l.value && f.value ? 0 : 1)
          , P = W(()=>y.value === 0)
          , O = W(()=>i.value > 1)
          , B = Pe(Zn, null) !== null
          , k = W(()=>O.value ? "parent" : "leaf")
          , Y = W(()=>u !== null ? (u.value & It.Closing) === It.Closing : !1)
          , Q = W(()=>B || Y.value ? !1 : P.value)
          , M = W(()=>{
            var D, J, H;
            return (H = Array.from((J = (D = v.value) == null ? void 0 : D.querySelectorAll("body > *")) != null ? J : []).find(S=>S.id === "headlessui-portal-root" ? !1 : S.contains(le(h)) && S instanceof HTMLElement)) != null ? H : null
        }
        );
        us(M, Q);
        let ie = W(()=>O.value ? !0 : P.value)
          , de = W(()=>{
            var D, J, H;
            return (H = Array.from((J = (D = v.value) == null ? void 0 : D.querySelectorAll("[data-headlessui-portal]")) != null ? J : []).find(S=>S.contains(le(h)) && S instanceof HTMLElement)) != null ? H : null
        }
        );
        us(de, ie),
        Cu({
            type: "Dialog",
            enabled: W(()=>y.value === 0),
            element: d,
            onUpdate: (D,J)=>{
                if (J === "Dialog")
                    return ot(D, {
                        [Qn.Add]: ()=>i.value += 1,
                        [Qn.Remove]: ()=>i.value -= 1
                    })
            }
        });
        let ue = Mu({
            name: "DialogDescription",
            slot: W(()=>({
                open: f.value
            }))
        })
          , Z = z(null)
          , ne = {
            titleId: Z,
            panelRef: z(null),
            dialogState: y,
            setTitleId(D) {
                Z.value !== D && (Z.value = D)
            },
            close() {
                t("close", !1)
            }
        };
        xt(Zn, ne);
        function ce() {
            var D, J, H;
            return [...Array.from((J = (D = v.value) == null ? void 0 : D.querySelectorAll("html > *, body > *, [data-headlessui-portal]")) != null ? J : []).filter(S=>!(S === document.body || S === document.head || !(S instanceof HTMLElement) || S.contains(le(h)) || ne.panelRef.value && S.contains(ne.panelRef.value))), (H = ne.panelRef.value) != null ? H : d.value]
        }
        let be = W(()=>!(!P.value || O.value));
        gu(()=>ce(), (D,J)=>{
            ne.close(),
            js(()=>J == null ? void 0 : J.focus())
        }
        , be);
        let ut = W(()=>!(O.value || y.value !== 0));
        wo((o = v.value) == null ? void 0 : o.defaultView, "keydown", D=>{
            ut.value && (D.defaultPrevented || D.key === bo.Escape && (D.preventDefault(),
            D.stopPropagation(),
            ne.close()))
        }
        );
        let ct = W(()=>!(Y.value || y.value !== 0 || B));
        return Du(v, ct, D=>{
            var J;
            return {
                containers: [...(J = D.containers) != null ? J : [], ce]
            }
        }
        ),
        Ne(D=>{
            if (y.value !== 0)
                return;
            let J = le(d);
            if (!J)
                return;
            let H = new ResizeObserver(S=>{
                for (let j of S) {
                    let pe = j.target.getBoundingClientRect();
                    pe.x === 0 && pe.y === 0 && pe.width === 0 && pe.height === 0 && ne.close()
                }
            }
            );
            H.observe(J),
            D(()=>H.disconnect())
        }
        ),
        ()=>{
            let {id: D, open: J, initialFocus: H, ...S} = e
              , j = {
                ...n,
                ref: d,
                id: D,
                role: "dialog",
                "aria-modal": y.value === 0 ? !0 : void 0,
                "aria-labelledby": Z.value,
                "aria-describedby": ue.value
            }
              , pe = {
                open: y.value === 0
            };
            return we(cs, {
                force: !0
            }, ()=>[we(Pu, ()=>we(Au, {
                target: d.value
            }, ()=>we(cs, {
                force: !1
            }, ()=>we(Pt, {
                initialFocus: H,
                containers: ce,
                features: P.value ? ot(k.value, {
                    parent: Pt.features.RestoreFocus,
                    leaf: Pt.features.All & ~Pt.features.FocusLock
                }) : Pt.features.None
            }, ()=>it({
                ourProps: j,
                theirProps: S,
                slot: pe,
                attrs: n,
                slots: r,
                visible: y.value === 0,
                features: Yn.RenderStrategy | Yn.Static,
                name: "Dialog"
            }))))), we(Xn, {
                features: fn.Hidden,
                ref: h
            })])
        }
    }
})
  , cc = lt({
    name: "DialogPanel",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        id: {
            type: String,
            default: ()=>`headlessui-dialog-panel-${vo()}`
        }
    },
    setup(e, {attrs: t, slots: n, expose: r}) {
        let s = Io("DialogPanel");
        r({
            el: s.panelRef,
            $el: s.panelRef
        });
        function o(l) {
            l.stopPropagation()
        }
        return ()=>{
            let {id: l, ...i} = e
              , u = {
                id: l,
                ref: s.panelRef,
                onClick: o
            };
            return it({
                ourProps: u,
                theirProps: i,
                slot: {
                    open: s.dialogState.value === 0
                },
                attrs: t,
                slots: n,
                name: "DialogPanel"
            })
        }
    }
});
var Uu = Object.defineProperty
  , Bu = Object.defineProperties
  , Ku = Object.getOwnPropertyDescriptors
  , fs = Object.getOwnPropertySymbols
  , Wu = Object.prototype.hasOwnProperty
  , ku = Object.prototype.propertyIsEnumerable
  , as = (e,t,n)=>t in e ? Uu(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n
  , qu = (e,t)=>{
    for (var n in t || (t = {}))
        Wu.call(t, n) && as(e, n, t[n]);
    if (fs)
        for (var n of fs(t))
            ku.call(t, n) && as(e, n, t[n]);
    return e
}
  , zu = (e,t)=>Bu(e, Ku(t));
function fc(e, t) {
    var n;
    const r = Ss();
    return Ne(()=>{
        r.value = e()
    }
    , zu(qu({}, t), {
        flush: (n = t == null ? void 0 : t.flush) != null ? n : "sync"
    })),
    dr(r)
}
function ds(e) {
    return typeof e == "function" ? e() : vn(e)
}
function ac(e=!1, t={}) {
    const {truthyValue: n=!0, falsyValue: r=!1} = t
      , s = re(e)
      , o = z(e);
    function l(i) {
        if (arguments.length)
            return o.value = i,
            o.value;
        {
            const u = ds(n);
            return o.value = o.value === u ? ds(r) : u,
            o.value
        }
    }
    return s ? l : [o, l]
}
z(new Date);
let Vu;
function Yu() {
    return Vu
}
function Ju(e) {
    return typeof e == "function" ? e() : vn(e)
}
function Gn(e, t="") {
    if (e instanceof Promise)
        return e;
    const n = Ju(e);
    return !e || !n ? n : Array.isArray(n) ? n.map(r=>Gn(r, t)) : typeof n == "object" ? Object.fromEntries(Object.entries(n).map(([r,s])=>r === "titleTemplate" || r.startsWith("on") ? [r, vn(s)] : [r, Gn(s, r)])) : n
}
const Xu = typeof window < "u"
  , Qu = "usehead";
function Or() {
    return ao() && Pe(Qu) || Yu()
}
function Zu(e, t={}) {
    const n = Or()
      , r = z(!1)
      , s = z({});
    Ne(()=>{
        s.value = r.value ? {} : Gn(e)
    }
    );
    const o = n.push(s.value, t);
    return We(s, i=>{
        o.patch(i)
    }
    ),
    ao() && (Ys(()=>{
        o.dispose()
    }
    ),
    zs(()=>{
        r.value = !0
    }
    ),
    qs(()=>{
        r.value = !1
    }
    )),
    o
}
function Gu(e, t={}) {
    return Or().push(e, t)
}
function dc(e, t={}) {
    var r;
    const n = Or();
    if (n) {
        const s = Xu || !!((r = n.resolvedOptions) != null && r.document);
        return t.mode === "server" && s || t.mode === "client" && !s ? void 0 : s ? Zu(e, t) : Gu(e, t)
    }
}
export {ve as F, cc as U, ic as a, sc as b, oc as c, fo as d, uo as e, ae as f, lc as g, we as h, bi as i, ac as j, fc as k, rt as l, dc as m, lr as n, lo as o, lt as p, uc as q, nc as r, z as s, ec as t, vn as u, _i as v, $l as w, rc as x, tc as y};
