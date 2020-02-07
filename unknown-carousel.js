import '../@polymer/iron-icons/image-icons.js';
import '../@polymer/paper-styles/color.js';
import '../@polymer/polymer/polymer-legacy.js';

import { IronResizableBehavior } from '../@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { Polymer } from '../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        --dot-background-color: #ffffff;
        --dot-active-extra-item: hidden;
      }

      :host::slotted(.unknown-carousel_wrapper) {
        text-align: center;
        position: relative;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-flow: row nowrap;
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -webkit-justify-content: space-around;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
        -webkit-align-content: flex-start;
        -ms-flex-line-pack: start;
        align-content: flex-start;
        width: 100%;
        z-index: 1;
        transition: -webkit-transform var(--transition-speed, 500ms) ease-in-out;
        transition: transform var(--transition-speed, 500ms) ease-in-out;
        transition: transform var(--transition-speed, 500ms) ease-in-out, -webkit-transform var(--transition-speed, 500ms) ease-in-out;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        will-change: transform;
      }

      :host::slotted(.unknown-carousel_controls) {
        position: absolute;
        width: auto;
        top: 50%;
        right: 10px;
        left: 10px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        text-align: center;
        z-index: 1;
        pointer-events: none;
      }

      :host::slotted([class*=unknown-carousel_controls_arrow]) {
        color: var(--dot-background-color);
        pointer-events: auto;
      }

      :host::slotted([class*=unknown-carousel_controls_arrow]).unknown-carousel_controls_arrow--disabled {
        pointer-events: none;
        cursor: default;
      }

      :host::slotted([class*=unknown-carousel_controls_arrow]) iron-icon {
        opacity: var(--light-secondary-opacity);
        -webkit-filter: drop-shadow(0 0 1px rgba(0, 0, 0, .4));
        filter: drop-shadow(0 0 1px rgba(0, 0, 0, .4));
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: scale(1);
        transform: scale(1);
        transition: opacity .2s ease-out, -webkit-filter .2s ease-out, -webkit-transform .2s ease-out;
        transition: opacity .2s ease-out, filter .2s ease-out, transform .2s ease-out;
        transition: opacity .2s ease-out, filter .2s ease-out, transform .2s ease-out, -webkit-filter .2s ease-out, -webkit-transform .2s ease-out;
      }

      :host::slotted([class*=unknown-carousel_controls_arrow]) iron-icon:hover {
        opacity: var(--light-primary-opacity);
        -webkit-transform: scale(1.15);
        transform: scale(1.15);
        -webkit-filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .4));
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .4));
      }

      :host::slotted(.unknown-carousel_controls_arrow-next) {
        float: right;
      }

      :host::slotted(.unknown-carousel_controls_arrow-prev) {
        float: left;
      }

      :host::slotted(.unknown-carousel_dots_wrapper) {
        position: relative;
        display: inline-block;
        margin: 0;
        padding: 0;
        z-index: 2;
      }

      :host::slotted(.unknown-carousel_dots) {
        position: absolute;
        width: 100%;
        text-align: center;
        z-index: 1;
        bottom: 10px;
        pointer-events: none;
      }

      :host::slotted(.unknown-carousel_dot-line) {
        visibility: var(--dot-active-extra-item);
        position: absolute;
        top: 0;
        padding: 6px;
        z-index: 2;
        pointer-events: none;
        transition: -webkit-transform .2s ease-in-out;
        transition: transform .2s ease-in-out;
        transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out;
      }

      :host::slotted(.unknown-carousel_dot-line::before) {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background-color: var(--color-red);
        border-radius: 10px;
      }

      :host::slotted(.unknown-carousel_dot) {
        display: inline-block;
        pointer-events: auto;
        opacity: var(--light-secondary-opacity);
        -webkit-filter: drop-shadow(0 0 2px rgba(0, 0, 0, .4));
        filter: drop-shadow(0 0 2px rgba(0, 0, 0, .4));
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transform: scale(1);
        transform: scale(1);
        transition: opacity .6s cubic-bezier(.25, .8, .25, 1), -webkit-transform .6s cubic-bezier(.25, .8, .25, 1), -webkit-filter .6s cubic-bezier(.25, .8, .25, 1);
        transition: transform .6s cubic-bezier(.25, .8, .25, 1), opacity .6s cubic-bezier(.25, .8, .25, 1), filter .6s cubic-bezier(.25, .8, .25, 1);
        transition: transform .6s cubic-bezier(.25, .8, .25, 1), opacity .6s cubic-bezier(.25, .8, .25, 1), filter .6s cubic-bezier(.25, .8, .25, 1), -webkit-transform .6s cubic-bezier(.25, .8, .25, 1), -webkit-filter .6s cubic-bezier(.25, .8, .25, 1);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }

      :host::slotted(.unknown-carousel_dot.active) {
        opacity: var(--light-primary-opacity);
        -webkit-filter: drop-shadow(0 1px 3px rgba(0, 0, 0, .4));
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, .4));
        -webkit-transform: scale(1.15);
        transform: scale(1.15);
      }

      :host::slotted(.unknown-carousel_dot) a {
        position: relative;
        display: block;
        padding: 6px;
        color: var(--dot-background-color);
        font-size: .8125em;
        line-height: 2em;
        font-weight: 400;
        text-decoration: none;
      }

      :host::slotted(.unknown-carousel_dot) a::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-color: var(--dot-background-color);
        border-radius: 8px;
      }

      :host::slotted([class*=unknown-carousel-demo]) {
        position: relative;
        height: 400px;
      }

      :host::slotted([class*=unknown-carousel-demo]::before) {
        position: absolute;
        content: attr(data-text);
        color: var(--dot-background-color);
        font-size: 3rem;
        font-weight: 700;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }

      :host::slotted(.unknown-carousel-demo-indigo) {
        background-color: var(--unknown-indigo-500);
      }

      :host::slotted(.unknown-carousel-demo-pink) {
        background-color: var(--unknown-pink-500);
      }

      :host::slotted(.unknown-carousel-demo-teal) {
        background-color: var(--unknown-teal-500);
      }

      :host::slotted(.unknown-carousel-demo-amber) {
        background-color: var(--unknown-amber-500);
      }

      :host::slotted(.unknown-carousel-demo-green) {
        background-color: var(--unknown-green-500);
      }

      :host::slotted(.unknown-carousel-demo-blue) {
        background-color: var(--unknown-blue-500);
      }
    </style>
    <div class="unknown-carousel_wrapper">
      <slot></slot>
    </div>
`,

  is: "unknown-carousel",
  behaviors: [IronResizableBehavior],

  listeners: {
    "iron-resize": "_onResize"
  },

  items: function () {
    var t, e, o, i, r, s;
    if (i = this,
      r = i.getBoundingClientRect(),
      null !== i.getAttribute("responsive"))
      for (o = i.getAttribute("responsive").replace(/\s/g, "").split(","),
        e = 0; e < o.length;) {
        if (t = o[e].split(":"),
          s = o[e + 1] ? o[e + 1].split(":") : {
            0: 0
          },
          r.width <= t[0] && r.width > s[0])
          return t[1];
        e++
      }
    return null !== i.getAttribute("items") ? i.getAttribute("items") : 1
  },

  _dotText: function () {
    var t, e;
    return t = this,
      e = t.getAttribute("dotText"),
      null === e || "false" !== e
  },

  _isLoop: function () {
    var t, e;
    return t = this,
      e = t.getAttribute("loop"),
      null !== e && "true" === e
  },

  _transitionSpeed: function () {
    var t, e;
    if (t = this,
      e = t.getAttribute("transitionspeed"),
      null !== e && void 0 !== e)
      return t.updateStyles({"--transition-speed": e + "ms"})
  },

  _isAutoplay: function () {
    var t, e;
    return t = this,
      e = t.getAttribute("autoplay"),
      null !== e && "true" === e
  },

  getTotalItems: function () {
    var t, e, o, i, r, s, n, a, l, h;
    if (s = this,
      n = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      h = 0,
      s._isLoop()) {
      for (a = this.shadowRoot.querySelectorAll('.unknown-carousel_wrapper > div'),
        e = 0,
        i = a.length; e < i; e++)
        t = a[e],
          "template" === t.localName || t.classList.contains("cloned") || h++; }
    else
      if (n) {
        for (l = this.shadowRoot.querySelectorAll('.unknown-carousel_wrapper > div'),
          o = 0,
          r = l.length; o < r; o++)
          t = l[o],
            "template" !== t.localName && h++;
      }

    return h
  },

  _getRealTotalItems: function () {
    var t, e, o, i, r, s, n;
    for (i = this,
      r = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      n = 0,
      s = r ? this.shadowRoot.querySelectorAll('.unknown-carousel_wrapper > div') : [],
      e = 0,
      o = s.length; e < o; e++)
      t = s[e],
        "template" !== t.localName && n++;
    return n
  },

  getPages: function () {
    var t, e, o, i;
    for (e = this,
      t = 1,
      o = [],
      i = []; t <= this.getTotalItems();)
      o.push(t - 1),
        t % this.items() === 0 && (i.push(o),
          o = []),
        t === this.getTotalItems() && i.push(o),
        t++;
    return i
  },

  getTotalPages: function () {
    var t;
    return t = this,
      Math.ceil(this.getTotalItems() / this.items())
  },

  getContainerPosition: function () {
    var t, e, o, i, r;
    return t = this,
      e = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      o = e ? e.style.transform : '',
      r = 0,
      "" !== o && (i = o.match(/translateX\((.*)/)[0],
        r = i.match(/\((.*)\)/)[0],
        r = r.substr(1, r.length - 2),
        r = parseFloat(r)),
      r
  },

  getCurrentItem: function () {
    var t, e, o, i;
    if (i = this,
      e = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      o = Math.round(100 / this._getRealTotalItems() * 1e3) / 1e3,
      t = 0,
      this._isLoop)
      for (; t <= this._getRealTotalItems();) {
        if (Math.round(o * t * 1e3) / 1e3 === -this.getContainerPosition())
          return i.currentItem = t - this.itemsToPrepend.length,
            t - this.itemsToPrepend.length;
        t++
      }
    else
      for (; t <= this.getTotalItems();) {
        if (Math.round(e * t * 1e3) / 1e3 === -this.getContainerPosition())
          return i.currentItem = t,
            t;
        t++
      }
  },

  goToItem: function (t) {
    var e, o, i, r;
    return o = this,
      i = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      this._isLoop() ? (e = Math.round(100 / this._getRealTotalItems() * 1e3) / 1e3,
        r = Math.round((t + this.itemsToPrepend.length) * -e * 1e3) / 1e3) : (e = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
          r = Math.round(t * -e * 1e3) / 1e3),
      this._isLoop() ? i.style.transform = "translateX(" + r + "%)" : t < this.getTotalItems() && t >= 0 && this.items() < this.getTotalItems() && (i.style.transform = "translateX(" + r + "%)"),
      this._setActiveDot(this.getCurrentPage()),
      this._setDisabledControls(),
      this._fireOnMoveEvent()
  },

  goToNextItem: function () {
    var t, e, o, i;
    if (o = this,
      i = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      t = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      e = Math.round(100 / this._getRealTotalItems() * 1e3) / 1e3,
      this._isLoop()) {
      if (this.goToItem(this.getCurrentItem() + 1),
        this.getCurrentItem() === this.getTotalItems())
        return i.style.transition = "none",
          this.goToItem(-1),
          i.style.transition = "",
          this.goToItem(0)
    } else if (this.getContainerPosition() > -(this.getTotalItems() - this.items() - 1) * t - 5)
      return this.goToItem(this.getCurrentItem() + 1)
  },

  goToPrevItem: function () {
    var t, e, o, i;
    if (o = this,
      i = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      t = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      e = Math.round(100 / this._getRealTotalItems() * 1e3) / 1e3,
      this._isLoop) {
      if (this.goToItem(this.getCurrentItem() - 1),
        this.getCurrentItem() === -1)
        return i.style.transition = "none",
          this.goToItem(this.getTotalItems()),
          i.style.transition = "",
          this.goToItem(this.getTotalItems() - 1)
    } else if (this.getContainerPosition() < 0)
      return this.goToItem(this.getCurrentItem() - 1)
  },

  getCurrentPage: function () {
    var t, e, o, i, r;
    for (t = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      r = t * this.items(),
      i = 0; i < this.getPages().length;) {
      if (o = this.getPages()[i],
        e = parseFloat(this.getCurrentItem()) + parseFloat(this.items()),
        e >= this.getTotalItems())
        return this._isLoop() || this.goToPage(this.getTotalPages() - 1),
          this.getTotalPages() - 1;
      if (o.indexOf(this.getCurrentItem()) !== -1)
        return i;
      i++
    }
  },

  goToPage: function (t) {
    var e, o, i, r, s, n, a, l, h;
    return i = this,
      r = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      e = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      o = Math.round(100 / this._getRealTotalItems() * 1e3) / 1e3,
      l = (this.items() - (this.getPages()[t] ? this.getPages()[t].length : 0)) * e,
      h = (this.items() - (this.getPages()[t] ? this.getPages()[t].length : 0)) * o,
      n = -e * this.items(),
      a = -o * this.items(),
      s = this._isLoop() ? Math.round(1e3 * (t * a + h)) / 1e3 + a : Math.round(1e3 * (t * n + l)) / 1e3,
      this._isLoop() ? r.style.transform = "translateX(" + s + "%)" : t < this.getTotalPages() && t >= 0 && this.items() < this.getTotalItems() && (r.style.transform = "translateX(" + s + "%)"),
      this._setActiveDot(t),
      this._setDisabledControls(),
      this._fireOnMoveEvent()
  },

  goToNextPage: function () {
    var t;
    if (t = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      this.getContainerPosition() > -(this.getTotalItems() - this.items() - 1) * t - 5)
      return this.goToPage(this.getCurrentPage() + 1)
  },

  goToPrevPage: function () {
    var t;
    if (t = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      this.getContainerPosition() < -5)
      return this.goToPage(this.getCurrentPage() - 1)
  },

  _createOnMoveEvent: function () {
    var t;
    return t = this,
      t.onMove = void 0,
      document.createEvent ? (t.onMove = document.createEvent("HTMLEvents"),
        t.onMove.initEvent("onmove", !0, !0)) : (t.onMove = document.createEventObject(),
          t.onMove.eventType = "onmove"),
      t.onMove.eventName = "onmove"
  },

  _fireOnMoveEvent: function () {
    var t;
    return t = this,
      document.createEvent ? t.dispatchEvent(t.onMove) : t.fireEvent("on" + t.onMove.eventType, t.onMove)
  },

  _setContainerSize: function () {
    var t, e, o, i, r, s, n, a, l;
    for (s = this,
      a = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      n = s.getBoundingClientRect(),
      o = this._isLoop() ? n.width * s._getRealTotalItems() / this.items() : n.width * s.getTotalItems() / this.items(),
      e = this._isLoop ? Math.round(100 / this._getRealTotalItems() * 1e4) / 1e4 : Math.round(100 / this.getTotalItems() * 1e4) / 1e4,
      l = a ? this.shadowRoot.querySelectorAll('.unknown-carousel_wrapper > div') || [] : [],
      i = 0,
      r = l.length; i < r; i++)
      t = l[i],
        "template" !== t.localName && (t.style.width = e + "%");
    return a ? a.style.minWidth = o + "px" : null
  },

  _setActiveDot: function (t) {
    var e, o, i, r;
    for (r = this,
      o = r.querySelectorAll(".unknown-carousel_dot"),
      e = r.querySelector(".unknown-carousel_dot-line"),
      i = 0; i < o.length;)
      i === parseInt(t) ? o[t].classList.add("active") : o[i].classList.removechild("active"),
        i++;
    if (e && this.items() < this.getTotalItems())
      return e.style.transform = "translateX(" + t + "00%)"
  },

  _printControls: function (t) {
    var e, o, i, r, s, n, a, l;
    if (r = this,
      i = 1,
      "false" !== r.getAttribute("controls") && (t === !0 || r.tpages !== this.items()))
      return r.querySelector(".unknown-carousel_controls") && r.querySelector(".unknown-carousel_controls").removechild(),
        e = document.createElement("div"),
        e.classList.add("unknown-carousel_controls"),
        o = document.createElement("div"),
        o.classList.add("unknown-carousel_controls_wrapper"),
        s = document.createElement("a"),
        n = document.createElement("iron-icon"),
        null !== r.getAttribute("nextIcon") ? n.setAttribute("icon", r.getAttribute("nextIcon")) : n.setAttribute("icon", "image:navigate-next"),
        a = document.createElement("a"),
        l = document.createElement("iron-icon"),
        null !== r.getAttribute("prevIcon") ? l.setAttribute("icon", r.getAttribute("prevIcon")) : l.setAttribute("icon", "image:navigate-before"),
        s.setAttribute("href", ""),
        s.classList.add("unknown-carousel_controls_arrow-next"),
        a.setAttribute("href", ""),
        a.classList.add("unknown-carousel_controls_arrow-prev"),
        s.addEventListener("click", function (t) {
          return t.preventDefault(),
            r._disableAutoPlay()
        }),
        a.addEventListener("click", function (t) {
          return t.preventDefault(),
            r._disableAutoPlay()
        }),
        r.listen(s, "tap", "goToNextItem"),
        r.listen(a, "tap", "goToPrevItem"),
        this.shadowRoot.appendChild(n),
        Polymer.dom(a).appendChild(l),
        Polymer.dom(e).appendChild(o),
        Polymer.dom(o).appendChild(a),
        Polymer.dom(o).appendChild(s),
        this.getTotalPages() > 1 && Polymer.dom(r.root).appendChild(e),
        this._setDisabledControls()
  },

  _setDisabledControls: function (t) {
    var e, o, i, r, s;
    if (s = this,
      i = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
      r = Math.round(100 / this._getRealTotalItems() * 1e3) / 1e3,
      e = s.querySelector(".unknown-carousel_controls_arrow-prev"),
      o = s.querySelector(".unknown-carousel_controls_arrow-next"),
      !this._isLoop() && null !== o && null !== e)
      return this.getContainerPosition() > -.5 ? e.classList.add("unknown-carousel_controls_arrow--disabled") : e.classList.removechild("unknown-carousel_controls_arrow--disabled"),
        this.getContainerPosition() < -(this.getTotalItems() - this.items() - 1) * i ? o.classList.add("unknown-carousel_controls_arrow--disabled") : o.classList.removechild("unknown-carousel_controls_arrow--disabled")
  },

  _printDots: function (t) {
    var e, o, i, r, s, n, a;
    if (a = this,
      n = 1,
      "false" !== a.getAttribute("dots")) {
      if (r = document.createElement("div"),
        r.classList.add("unknown-carousel_dots"),
        s = document.createElement("ul"),
        s.classList.add("unknown-carousel_dots_wrapper"),
        Polymer.dom(r).appendChild(s),
        t !== !0) {
        if (a.tpages === this.items())
          return;
        a.tpages = this.items()
      }
      for (a.querySelector(".unknown-carousel_dots") && a.querySelector(".unknown-carousel_dots").removechild(); n <= this.getTotalPages();)
        o = document.createElement("li"),
          o.classList.add("unknown-carousel_dot"),
          i = document.createElement("a"),
          i.setAttribute("href", ""),
          i.setAttribute("data-rel", n - 1),
          a.clickDotsEvent = function (t) {
            var e;
            return e = t.target.getAttribute("data-rel"),
              this.goToPage(e)
          }
          ,
          i.addEventListener("click", function (t) {
            return t.preventDefault(),
              a._disableAutoPlay()
          }),
          a.listen(i, "tap", "clickDotsEvent"),
          this._dotText() === !0 && (i.textContent = n),
          e = document.createElement("li"),
          e.classList.add("unknown-carousel_dot-line"),
          Polymer.dom(o).appendChild(i),
          this.shadowRoot.appendChild(o),
          n === this.getTotalPages() && this.shadowRoot.appendChild(e),
          n++;
      return this.getTotalPages() > 1 && Polymer.dom(a.root).appendChild(r),
        this._setActiveDot(this.getCurrentPage())
    }
  },

  _getDragState: function (t) {
    var e, o, i, r, s, n, a, l, h, u, c, g, d, m, p, f, v, _, T;
    switch (u = this,
    c = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
    g = c.getBoundingClientRect(),
    d = Math.round(100 * t.detail.dx / g.width * 1e3) / 1e3,
    s = Math.round(100 / this.getTotalItems() * 1e3) / 1e3,
    n = Math.round(100 / this._getRealTotalItems() * 1e3) / 1e3,
    l = Math.round(s * (this.getTotalItems() - this.items()) * 1e3) / 1e3,
    h = Math.round(n * (this._getRealTotalItems() - this.items()) * 1e3) / 1e3,
    i = 0,
    T = t.detail.dx,
    t.detail.state) {
      case "start":
        return u.startTime = (new Date).getTime(),
          u.dragPosition = this.getContainerPosition(),
          window.touching = !0,
          c.style.transitionDuration = "0s",
          window.addEventListener("scroll", function () {
            return clearInterval(window.scrollingInterval),
              window.scrolling = !0,
              window.touchScroll = !0,
              window.scrollingInterval = setTimeout(function () {
                if (window.scrolling = !1,
                  window.touching === !1)
                  return window.touchScroll = !1
              }, 50)
          });
      case "track":
        return p = Math.round(1e3 * (u.dragPosition + d)) / 1e3,
          p = Math.min(p, 0),
          p = this._isLoop() ? Math.max(p, -h) : Math.max(p, -l),
          window.scrolling !== !1 && void 0 !== window.scrolling || window.touchScroll !== !1 && void 0 !== window.touchScroll || (T > 2 || T < -2) && (this.items() < this.getTotalItems() && window.movingCarousel === !0 && (c.style.transform = "translateX(" + p + "%) translateY(0) translateZ(0)"),
            window.movingCarousel = !0),
          window.addEventListener("touchmove", function (t) {
            if (window.movingCarousel === !0)
              return t.preventDefault()
          });
      case "end":
        if (i = (new Date).getTime(),
          _ = i - u.startTime,
          a = Math.max(Math.min(_, 500), 100),
          r = this._isLoop() ? -1 : 0,
          this.getContainerPosition() > -5 && (a = 500),
          this._isLoop() ? this.getContainerPosition() < -(this._getRealTotalItems() - this.items()) * s + 5 && (a = 500) : this.getContainerPosition() < -(this.getTotalItems() - this.items()) * s + 5 && (a = 500),
          T < 30 && T > -30 && (a = 500),
          c.style.transitionDuration = a + "ms",
          u.resetTransition = function () {
            return u._isLoop() && (u.getCurrentItem() === u.getTotalItems() && (c.style.transition = "none",
              u.goToItem(0),
              c.style.transition = ""),
              this.getCurrentItem() === -1 && (c.style.transition = "none",
                this.goToItem(this.getTotalItems() - 1),
                c.style.transition = "")),
              c.style.transitionDuration = ""
          }
          ,
          u.listen(c, "transitionend", "resetTransition"),
          !(window.scrolling !== !1 && void 0 !== window.scrolling || window.touchScroll !== !1 && void 0 !== window.touchScroll) && (T > 2 || T < -2))
          if (this._isLoop())
            for (; r < this._getRealTotalItems();)
              f = -Math.round(n * (r + this.itemsToPrepend.length) * 1e3) / 1e3,
                e = -Math.round(n * (r + this.itemsToPrepend.length + 1) * 1e3) / 1e3,
                m = Math.round(1e3 * (f - e)) / 1e3,
                o = e + m / 2,
                v = f - m / 2,
                d < 0 && _ < 150 && this.getContainerPosition() < f && this.getContainerPosition() >= e && this.goToItem(r + 1),
                d > 0 && _ < 150 && this.getContainerPosition() < f && this.getContainerPosition() >= e && this.goToItem(r),
                this.getContainerPosition() < f && this.getContainerPosition() >= o && this.goToItem(r),
                this.getContainerPosition() < v && this.getContainerPosition() >= e && this.goToItem(r + 1),
                r++;
          else
            for (; r < this.getTotalItems();)
              f = -Math.round(s * r * 1e3) / 1e3,
                e = -Math.round(s * (r + 1) * 1e3) / 1e3,
                m = Math.round(1e3 * (f - e)) / 1e3,
                o = e + m / 2,
                v = f - m / 2,
                d < 0 && _ < 150 && this.getContainerPosition() < f && this.getContainerPosition() >= e && this.goToItem(r + 1),
                d > 0 && _ < 150 && this.getContainerPosition() < f && this.getContainerPosition() >= e && this.goToItem(r),
                this.getContainerPosition() < f && this.getContainerPosition() >= o && this.goToItem(r),
                this.getContainerPosition() < v && this.getContainerPosition() >= e && this.goToItem(r + 1),
                r++;
        return window.movingCarousel = !1,
          window.touchScroll = !1,
          window.touching = !1
    }
  },

  _loop: function () {
    var t, e, o, i, r;
    if (o = this,
      o._isLoop())
      return i = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
        r = 0,
        o.itemsToAppend = [],
        o.itemsToPrepend = [],
        e = o.querySelectorAll(".unknown-carousel_wrapper .cloned"),
        t = function () {
          var t;
          return (
            (t = []),
            [].forEach.call(
              this.shadowRoot.querySelectorAll(
                ".unknown-carousel_wrapper > div"
              ),
              function(e, i) {
                var r;
                if (
                  (i < o.items() &&
                    ((r = e.cloneNode(!0)),
                    r.classList.add("cloned"),
                    o.itemsToAppend.push(r)),
                  i >= o.getTotalItems() - o.items() && i <= o.getTotalItems())
                )
                  return t.push(e);
              }
            ),
            [].forEach.call(t, function(t, e) {
              var i;
              if (e < o.items())
                return (
                  (i = t.cloneNode(!0)),
                  i.classList.add("cloned"),
                  o.itemsToPrepend.push(i)
                );
            })
          );
        }
        ,
        e.length > 0 ? [].forEach.call(e, function (o, i) {
          if (o.parentNode.removeChild(o),
            i === e.length - 1)
            return t()
        }) : t(),
        [].forEach.call(o.itemsToAppend, function (t, e) {
          return i.appendChild(t)
        }),
        [].forEach.call(o.itemsToPrepend.reverse(), function (t, e) {
          return i.insertBefore(
            t.cloneNode(!0),
            this.shadowRoot.querySelectorAll(
              ".unknown-carousel_wrapper > div"
            )[0]
          );
        })
  },

  _autoPlay: function () {
    var t, e;
    if (e = this,
      t = null !== e.getAttribute("autoplaytime") && void 0 !== e.getAttribute("autoplaytime") ? e.getAttribute("autoplaytime") : 6e3,
      e._isAutoplay())
      return e.autoPlayInterval = setInterval(function () {
        return e._isLoop() ? e.goToNextItem() : e.getCurrentItem() + 1 < e.getTotalItems() ? e.goToNextItem() : e.goToItem(0)
      }, t)
  },

  _disableAutoPlay: function () {
    var t;
    if (t = this,
      t._isAutoplay())
      return clearInterval(t.autoPlayInterval),
        t._isAutoplay = function () {
          return !1
        }
  },

  _onDrag: function () {
    var t, e;
    return t = this,
      e = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      t.listen(this.$$(".unknown-carousel_wrapper"), "track", "_getDragState"),
      e ? e.style.touchAction = "" : null
  },

  _setInitialPosition: function () {
    var t, e;
    return t = this,
      e = this.shadowRoot.querySelector(".unknown-carousel_wrapper"),
      e ? e.style.transition = "none" : null,
      t.goToItem(0),
      e ? e.style.transition = "" : null,
      t.initialize = !0
  },

  refresh: function () {
    return this._setContainerSize(),
      this._printControls(!0),
      this._printDots(!0),
      this._onResize()
  },

  ready: function () {
    return this.itemsToAppend = [],
      this.itemsToPrepend = [],
      this._createOnMoveEvent()
  },

  attached: function () {
    var t;
    return t = this,
      this.async(function () {
        return setTimeout(function () {
          return t._onLoad()
        }, 0)
      })
  },

  _onLoad: function () {
    return this._onDrag(),
      this._onResize(),
      this._setInitialPosition(),
      this._transitionSpeed(),
      this._autoPlay()
  },

  _onResize: function () {
    if (this._loop(),
      this._setContainerSize(),
      this._printControls(),
      this._printDots(),
      this.initialize === !0)
      return this.goToItem(this.currentItem)
  }
})
