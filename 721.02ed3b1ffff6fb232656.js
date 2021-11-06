"use strict";
(self["webpackChunkdemo"] = self["webpackChunkdemo"] || []).push([[721],{

/***/ 721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: consume shared module (default) @angular/common@=12.2.11 (strict) (singleton) (fallback: ./node_modules/@angular/common/fesm2015/common.js)
var common_js_ = __webpack_require__(5289);
// EXTERNAL MODULE: consume shared module (default) @angular/core@=12.2.11 (strict) (singleton) (fallback: ./node_modules/@angular/core/fesm2015/core.js)
var core_js_ = __webpack_require__(1426);
;// CONCATENATED MODULE: ./node_modules/@angular/platform-browser/fesm2015/platform-browser.js
/**
 * @license Angular v12.2.11
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */




/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Provides DOM operations in any browser environment.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */

class GenericBrowserDomAdapter extends common_js_["ɵDomAdapter"] {
  constructor() {
    super(...arguments);
    this.supportsDOMEvents = true;
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */

/* tslint:disable:requireParameterType no-console */


class BrowserDomAdapter extends GenericBrowserDomAdapter {
  static makeCurrent() {
    (0,common_js_["ɵsetRootDomAdapter"])(new BrowserDomAdapter());
  }

  onAndCancel(el, evt, listener) {
    el.addEventListener(evt, listener, false); // Needed to follow Dart's subscription semantic, until fix of
    // https://code.google.com/p/dart/issues/detail?id=17406

    return () => {
      el.removeEventListener(evt, listener, false);
    };
  }

  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
  }

  remove(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  createElement(tagName, doc) {
    doc = doc || this.getDefaultDocument();
    return doc.createElement(tagName);
  }

  createHtmlDocument() {
    return document.implementation.createHTMLDocument('fakeTitle');
  }

  getDefaultDocument() {
    return document;
  }

  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  isShadowRoot(node) {
    return node instanceof DocumentFragment;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */


  getGlobalEventTarget(doc, target) {
    if (target === 'window') {
      return window;
    }

    if (target === 'document') {
      return doc;
    }

    if (target === 'body') {
      return doc.body;
    }

    return null;
  }

  getBaseHref(doc) {
    const href = getBaseElementHref();
    return href == null ? null : relativePath(href);
  }

  resetBaseElement() {
    baseElement = null;
  }

  getUserAgent() {
    return window.navigator.userAgent;
  }

  getCookie(name) {
    return (0,common_js_["ɵparseCookieValue"])(document.cookie, name);
  }

}

let baseElement = null;

function getBaseElementHref() {
  baseElement = baseElement || document.querySelector('base');
  return baseElement ? baseElement.getAttribute('href') : null;
} // based on urlUtils.js in AngularJS 1


let urlParsingNode;

function relativePath(url) {
  urlParsingNode = urlParsingNode || document.createElement('a');
  urlParsingNode.setAttribute('href', url);
  const pathName = urlParsingNode.pathname;
  return pathName.charAt(0) === '/' ? pathName : `/${pathName}`;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */


const TRANSITION_ID = /*#__PURE__*/new core_js_.InjectionToken('TRANSITION_ID');

function appInitializerFactory(transitionId, document, injector) {
  return () => {
    // Wait for all application initializers to be completed before removing the styles set by
    // the server.
    injector.get(core_js_.ApplicationInitStatus).donePromise.then(() => {
      const dom = (0,common_js_["ɵgetDOM"])();
      const styles = document.querySelectorAll(`style[ng-transition="${transitionId}"]`);

      for (let i = 0; i < styles.length; i++) {
        dom.remove(styles[i]);
      }
    });
  };
}

const SERVER_TRANSITION_PROVIDERS = [{
  provide: core_js_.APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [TRANSITION_ID, common_js_.DOCUMENT, core_js_.Injector],
  multi: true
}];
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

class BrowserGetTestability {
  static init() {
    (0,core_js_.setTestabilityGetter)(new BrowserGetTestability());
  }

  addToWindow(registry) {
    core_js_["ɵglobal"].getAngularTestability = (elem, findInAncestors = true) => {
      const testability = registry.findTestabilityInTree(elem, findInAncestors);

      if (testability == null) {
        throw new Error('Could not find testability for element.');
      }

      return testability;
    };

    core_js_["ɵglobal"].getAllAngularTestabilities = () => registry.getAllTestabilities();

    core_js_["ɵglobal"].getAllAngularRootElements = () => registry.getAllRootElements();

    const whenAllStable = (callback
    /** TODO #9100 */
    ) => {
      const testabilities = core_js_["ɵglobal"].getAllAngularTestabilities();
      let count = testabilities.length;
      let didWork = false;

      const decrement = function (didWork_
      /** TODO #9100 */
      ) {
        didWork = didWork || didWork_;
        count--;

        if (count == 0) {
          callback(didWork);
        }
      };

      testabilities.forEach(function (testability
      /** TODO #9100 */
      ) {
        testability.whenStable(decrement);
      });
    };

    if (!core_js_["ɵglobal"].frameworkStabilizers) {
      core_js_["ɵglobal"].frameworkStabilizers = [];
    }

    core_js_["ɵglobal"].frameworkStabilizers.push(whenAllStable);
  }

  findTestabilityInTree(registry, elem, findInAncestors) {
    if (elem == null) {
      return null;
    }

    const t = registry.getTestability(elem);

    if (t != null) {
      return t;
    } else if (!findInAncestors) {
      return null;
    }

    if ((0,common_js_["ɵgetDOM"])().isShadowRoot(elem)) {
      return this.findTestabilityInTree(registry, elem.host, true);
    }

    return this.findTestabilityInTree(registry, elem.parentElement, true);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 */


let BrowserXhr = /*#__PURE__*/(() => {
  class BrowserXhr {
    build() {
      return new XMLHttpRequest();
    }

  }

  BrowserXhr.ɵfac = function BrowserXhr_Factory(t) {
    return new (t || BrowserXhr)();
  };

  BrowserXhr.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: BrowserXhr,
    factory: BrowserXhr.ɵfac
  });
  return BrowserXhr;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const CAMEL_CASE_REGEXP = /([A-Z])/g;
const DASH_CASE_REGEXP = /-([a-z])/g;

function camelCaseToDashCase(input) {
  return input.replace(CAMEL_CASE_REGEXP, (...m) => '-' + m[1].toLowerCase());
}

function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
/**
 * Exports the value under a given `name` in the global property `ng`. For example `ng.probe` if
 * `name` is `'probe'`.
 * @param name Name under which it will be exported. Keep in mind this will be a property of the
 * global `ng` object.
 * @param value The value to export.
 */


function exportNgVar(name, value) {
  if (typeof COMPILED === 'undefined' || !COMPILED) {
    // Note: we can't export `ng` when using closure enhanced optimization as:
    // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
    // - we can't declare a closure extern as the namespace `ng` is already used within Google
    //   for typings for angularJS (via `goog.provide('ng....')`).
    const ng = core_js_["ɵglobal"].ng = core_js_["ɵglobal"].ng || {};
    ng[name] = value;
  }
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const ɵ0 = () => ({
  'ApplicationRef': core_js_.ApplicationRef,
  'NgZone': core_js_.NgZone
});

const CORE_TOKENS = /*#__PURE__*/ɵ0();
const INSPECT_GLOBAL_NAME = 'probe';
const CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */

function inspectNativeElementR2(element) {
  return (0,core_js_["ɵgetDebugNodeR2"])(element);
}

function _createNgProbeR2(coreTokens) {
  exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElementR2);
  exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign(Object.assign({}, CORE_TOKENS), _ngProbeTokensToMap(coreTokens || [])));
  return () => inspectNativeElementR2;
}

function _ngProbeTokensToMap(tokens) {
  return tokens.reduce((prev, t) => (prev[t.name] = t.token, prev), {});
}
/**
 * In Ivy, we don't support NgProbe because we have our own set of testing utilities
 * with more robust functionality.
 *
 * We shouldn't bring in NgProbe because it prevents DebugNode and friends from
 * tree-shaking properly.
 */


const ELEMENT_PROBE_PROVIDERS__POST_R3__ = [];
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */

const ELEMENT_PROBE_PROVIDERS__PRE_R3__ = [{
  provide: core_js_.APP_INITIALIZER,
  useFactory: _createNgProbeR2,
  deps: [[core_js_.NgProbeToken, /*#__PURE__*/new core_js_.Optional()]],
  multi: true
}];
const ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__POST_R3__;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * The injection token for the event-manager plug-in service.
 *
 * @publicApi
 */

const EVENT_MANAGER_PLUGINS = /*#__PURE__*/new core_js_.InjectionToken('EventManagerPlugins');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */

let EventManager = /*#__PURE__*/(() => {
  class EventManager {
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor(plugins, _zone) {
      this._zone = _zone;
      this._eventNameToPlugin = new Map();
      plugins.forEach(p => p.manager = this);
      this._plugins = plugins.slice().reverse();
    }
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns  A callback function that can be used to remove the handler.
     */


    addEventListener(element, eventName, handler) {
      const plugin = this._findPluginFor(eventName);

      return plugin.addEventListener(element, eventName, handler);
    }
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns A callback function that can be used to remove the handler.
     * @deprecated No longer being used in Ivy code. To be removed in version 14.
     */


    addGlobalEventListener(target, eventName, handler) {
      const plugin = this._findPluginFor(eventName);

      return plugin.addGlobalEventListener(target, eventName, handler);
    }
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     */


    getZone() {
      return this._zone;
    }
    /** @internal */


    _findPluginFor(eventName) {
      const plugin = this._eventNameToPlugin.get(eventName);

      if (plugin) {
        return plugin;
      }

      const plugins = this._plugins;

      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];

        if (plugin.supports(eventName)) {
          this._eventNameToPlugin.set(eventName, plugin);

          return plugin;
        }
      }

      throw new Error(`No event manager plugin found for event ${eventName}`);
    }

  }

  EventManager.ɵfac = function EventManager_Factory(t) {
    return new (t || EventManager)(core_js_["ɵɵinject"](EVENT_MANAGER_PLUGINS), core_js_["ɵɵinject"](core_js_.NgZone));
  };

  EventManager.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: EventManager,
    factory: EventManager.ɵfac
  });
  return EventManager;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

class EventManagerPlugin {
  constructor(_doc) {
    this._doc = _doc;
  }

  addGlobalEventListener(element, eventName, handler) {
    const target = (0,common_js_["ɵgetDOM"])().getGlobalEventTarget(this._doc, element);

    if (!target) {
      throw new Error(`Unsupported event target ${target} for event ${eventName}`);
    }

    return this.addEventListener(target, eventName, handler);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


let SharedStylesHost = /*#__PURE__*/(() => {
  class SharedStylesHost {
    constructor() {
      /** @internal */
      this._stylesSet = new Set();
    }

    addStyles(styles) {
      const additions = new Set();
      styles.forEach(style => {
        if (!this._stylesSet.has(style)) {
          this._stylesSet.add(style);

          additions.add(style);
        }
      });
      this.onStylesAdded(additions);
    }

    onStylesAdded(additions) {}

    getAllStyles() {
      return Array.from(this._stylesSet);
    }

  }

  SharedStylesHost.ɵfac = function SharedStylesHost_Factory(t) {
    return new (t || SharedStylesHost)();
  };

  SharedStylesHost.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: SharedStylesHost,
    factory: SharedStylesHost.ɵfac
  });
  return SharedStylesHost;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

let DomSharedStylesHost = /*#__PURE__*/(() => {
  class DomSharedStylesHost extends SharedStylesHost {
    constructor(_doc) {
      super();
      this._doc = _doc; // Maps all registered host nodes to a list of style nodes that have been added to the host node.

      this._hostNodes = new Map();

      this._hostNodes.set(_doc.head, []);
    }

    _addStylesToHost(styles, host, styleNodes) {
      styles.forEach(style => {
        const styleEl = this._doc.createElement('style');

        styleEl.textContent = style;
        styleNodes.push(host.appendChild(styleEl));
      });
    }

    addHost(hostNode) {
      const styleNodes = [];

      this._addStylesToHost(this._stylesSet, hostNode, styleNodes);

      this._hostNodes.set(hostNode, styleNodes);
    }

    removeHost(hostNode) {
      const styleNodes = this._hostNodes.get(hostNode);

      if (styleNodes) {
        styleNodes.forEach(removeStyle);
      }

      this._hostNodes.delete(hostNode);
    }

    onStylesAdded(additions) {
      this._hostNodes.forEach((styleNodes, hostNode) => {
        this._addStylesToHost(additions, hostNode, styleNodes);
      });
    }

    ngOnDestroy() {
      this._hostNodes.forEach(styleNodes => styleNodes.forEach(removeStyle));
    }

  }

  DomSharedStylesHost.ɵfac = function DomSharedStylesHost_Factory(t) {
    return new (t || DomSharedStylesHost)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  DomSharedStylesHost.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: DomSharedStylesHost,
    factory: DomSharedStylesHost.ɵfac
  });
  return DomSharedStylesHost;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function removeStyle(styleNode) {
  (0,common_js_["ɵgetDOM"])().remove(styleNode);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const NAMESPACE_URIS = {
  'svg': 'http://www.w3.org/2000/svg',
  'xhtml': 'http://www.w3.org/1999/xhtml',
  'xlink': 'http://www.w3.org/1999/xlink',
  'xml': 'http://www.w3.org/XML/1998/namespace',
  'xmlns': 'http://www.w3.org/2000/xmlns/'
};
const COMPONENT_REGEX = /%COMP%/g;
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;

function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}

function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}

function flattenStyles(compId, styles, target) {
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i];

    if (Array.isArray(style)) {
      flattenStyles(compId, style, target);
    } else {
      style = style.replace(COMPONENT_REGEX, compId);
      target.push(style);
    }
  }

  return target;
}

function decoratePreventDefault(eventHandler) {
  // `DebugNode.triggerEventHandler` needs to know if the listener was created with
  // decoratePreventDefault or is a listener added outside the Angular context so it can handle the
  // two differently. In the first case, the special '__ngUnwrap__' token is passed to the unwrap
  // the listener (see below).
  return event => {
    // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
    // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The debug_node
    // can inspect the listener toString contents for the existence of this special token. Because
    // the token is a string literal, it is ensured to not be modified by compiled code.
    if (event === '__ngUnwrap__') {
      return eventHandler;
    }

    const allowDefaultBehavior = eventHandler(event);

    if (allowDefaultBehavior === false) {
      // TODO(tbosch): move preventDefault into event plugins...
      event.preventDefault();
      event.returnValue = false;
    }

    return undefined;
  };
}

let hasLoggedNativeEncapsulationWarning = false;
let DomRendererFactory2 = /*#__PURE__*/(() => {
  class DomRendererFactory2 {
    constructor(eventManager, sharedStylesHost, appId) {
      this.eventManager = eventManager;
      this.sharedStylesHost = sharedStylesHost;
      this.appId = appId;
      this.rendererByCompId = new Map();
      this.defaultRenderer = new DefaultDomRenderer2(eventManager);
    }

    createRenderer(element, type) {
      if (!element || !type) {
        return this.defaultRenderer;
      }

      switch (type.encapsulation) {
        case core_js_.ViewEncapsulation.Emulated:
          {
            let renderer = this.rendererByCompId.get(type.id);

            if (!renderer) {
              renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
              this.rendererByCompId.set(type.id, renderer);
            }

            renderer.applyToHost(element);
            return renderer;
          }
        // @ts-ignore TODO: Remove as part of FW-2290. TS complains about us dealing with an enum
        // value that is not known (but previously was the value for ViewEncapsulation.Native)

        case 1:
        case core_js_.ViewEncapsulation.ShadowDom:
          // TODO(FW-2290): remove the `case 1:` fallback logic and the warning in v12.
          if ((typeof ngDevMode === 'undefined' || ngDevMode) && // @ts-ignore TODO: Remove as part of FW-2290. TS complains about us dealing with an
          // enum value that is not known (but previously was the value for
          // ViewEncapsulation.Native)
          !hasLoggedNativeEncapsulationWarning && type.encapsulation === 1) {
            hasLoggedNativeEncapsulationWarning = true;
            console.warn('ViewEncapsulation.Native is no longer supported. Falling back to ViewEncapsulation.ShadowDom. The fallback will be removed in v12.');
          }

          return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);

        default:
          {
            if (!this.rendererByCompId.has(type.id)) {
              const styles = flattenStyles(type.id, type.styles, []);
              this.sharedStylesHost.addStyles(styles);
              this.rendererByCompId.set(type.id, this.defaultRenderer);
            }

            return this.defaultRenderer;
          }
      }
    }

    begin() {}

    end() {}

  }

  DomRendererFactory2.ɵfac = function DomRendererFactory2_Factory(t) {
    return new (t || DomRendererFactory2)(core_js_["ɵɵinject"](EventManager), core_js_["ɵɵinject"](DomSharedStylesHost), core_js_["ɵɵinject"](core_js_.APP_ID));
  };

  DomRendererFactory2.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: DomRendererFactory2,
    factory: DomRendererFactory2.ɵfac
  });
  return DomRendererFactory2;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

class DefaultDomRenderer2 {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.data = Object.create(null);
  }

  destroy() {}

  createElement(name, namespace) {
    if (namespace) {
      // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key
      // will result in undefined, so we just return the namespace here.
      return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
    }

    return document.createElement(name);
  }

  createComment(value) {
    return document.createComment(value);
  }

  createText(value) {
    return document.createTextNode(value);
  }

  appendChild(parent, newChild) {
    parent.appendChild(newChild);
  }

  insertBefore(parent, newChild, refChild) {
    if (parent) {
      parent.insertBefore(newChild, refChild);
    }
  }

  removeChild(parent, oldChild) {
    if (parent) {
      parent.removeChild(oldChild);
    }
  }

  selectRootElement(selectorOrNode, preserveContent) {
    let el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) : selectorOrNode;

    if (!el) {
      throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
    }

    if (!preserveContent) {
      el.textContent = '';
    }

    return el;
  }

  parentNode(node) {
    return node.parentNode;
  }

  nextSibling(node) {
    return node.nextSibling;
  }

  setAttribute(el, name, value, namespace) {
    if (namespace) {
      name = namespace + ':' + name; // TODO(FW-811): Ivy may cause issues here because it's passing around
      // full URIs for namespaces, therefore this lookup will fail.

      const namespaceUri = NAMESPACE_URIS[namespace];

      if (namespaceUri) {
        el.setAttributeNS(namespaceUri, name, value);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
    }
  }

  removeAttribute(el, name, namespace) {
    if (namespace) {
      // TODO(FW-811): Ivy may cause issues here because it's passing around
      // full URIs for namespaces, therefore this lookup will fail.
      const namespaceUri = NAMESPACE_URIS[namespace];

      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        // TODO(FW-811): Since ivy is passing around full URIs for namespaces
        // this could result in properties like `http://www.w3.org/2000/svg:cx="123"`,
        // which is wrong.
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }

  addClass(el, name) {
    el.classList.add(name);
  }

  removeClass(el, name) {
    el.classList.remove(name);
  }

  setStyle(el, style, value, flags) {
    if (flags & (core_js_.RendererStyleFlags2.DashCase | core_js_.RendererStyleFlags2.Important)) {
      el.style.setProperty(style, value, flags & core_js_.RendererStyleFlags2.Important ? 'important' : '');
    } else {
      el.style[style] = value;
    }
  }

  removeStyle(el, style, flags) {
    if (flags & core_js_.RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      el.style[style] = '';
    }
  }

  setProperty(el, name, value) {
    NG_DEV_MODE && checkNoSyntheticProp(name, 'property');
    el[name] = value;
  }

  setValue(node, value) {
    node.nodeValue = value;
  }

  listen(target, event, callback) {
    NG_DEV_MODE && checkNoSyntheticProp(event, 'listener');

    if (typeof target === 'string') {
      return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
    }

    return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
  }

}

const ɵ0$1 = () => '@'.charCodeAt(0);

const AT_CHARCODE = /*#__PURE__*/ɵ0$1();

function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new Error(`Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
  }
}

class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, component, appId) {
    super(eventManager);
    this.component = component;
    const styles = flattenStyles(appId + '-' + component.id, component.styles, []);
    sharedStylesHost.addStyles(styles);
    this.contentAttr = shimContentAttribute(appId + '-' + component.id);
    this.hostAttr = shimHostAttribute(appId + '-' + component.id);
  }

  applyToHost(element) {
    super.setAttribute(element, this.hostAttr, '');
  }

  createElement(parent, name) {
    const el = super.createElement(parent, name);
    super.setAttribute(el, this.contentAttr, '');
    return el;
  }

}

class ShadowDomRenderer extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, hostEl, component) {
    super(eventManager);
    this.sharedStylesHost = sharedStylesHost;
    this.hostEl = hostEl;
    this.shadowRoot = hostEl.attachShadow({
      mode: 'open'
    });
    this.sharedStylesHost.addHost(this.shadowRoot);
    const styles = flattenStyles(component.id, component.styles, []);

    for (let i = 0; i < styles.length; i++) {
      const styleEl = document.createElement('style');
      styleEl.textContent = styles[i];
      this.shadowRoot.appendChild(styleEl);
    }
  }

  nodeOrShadowRoot(node) {
    return node === this.hostEl ? this.shadowRoot : node;
  }

  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot);
  }

  appendChild(parent, newChild) {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }

  insertBefore(parent, newChild, refChild) {
    return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
  }

  removeChild(parent, oldChild) {
    return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
  }

  parentNode(node) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


let DomEventsPlugin = /*#__PURE__*/(() => {
  class DomEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
      super(doc);
    } // This plugin should come last in the list of plugins, because it accepts all
    // events.


    supports(eventName) {
      return true;
    }

    addEventListener(element, eventName, handler) {
      element.addEventListener(eventName, handler, false);
      return () => this.removeEventListener(element, eventName, handler);
    }

    removeEventListener(target, eventName, callback) {
      return target.removeEventListener(eventName, callback);
    }

  }

  DomEventsPlugin.ɵfac = function DomEventsPlugin_Factory(t) {
    return new (t || DomEventsPlugin)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  DomEventsPlugin.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: DomEventsPlugin,
    factory: DomEventsPlugin.ɵfac
  });
  return DomEventsPlugin;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Supported HammerJS recognizer event names.
 */


const EVENT_NAMES = {
  // pan
  'pan': true,
  'panstart': true,
  'panmove': true,
  'panend': true,
  'pancancel': true,
  'panleft': true,
  'panright': true,
  'panup': true,
  'pandown': true,
  // pinch
  'pinch': true,
  'pinchstart': true,
  'pinchmove': true,
  'pinchend': true,
  'pinchcancel': true,
  'pinchin': true,
  'pinchout': true,
  // press
  'press': true,
  'pressup': true,
  // rotate
  'rotate': true,
  'rotatestart': true,
  'rotatemove': true,
  'rotateend': true,
  'rotatecancel': true,
  // swipe
  'swipe': true,
  'swipeleft': true,
  'swiperight': true,
  'swipeup': true,
  'swipedown': true,
  // tap
  'tap': true,
  'doubletap': true
};
/**
 * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */

const HAMMER_GESTURE_CONFIG = /*#__PURE__*/new core_js_.InjectionToken('HammerGestureConfig');
/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */

const HAMMER_LOADER = /*#__PURE__*/new core_js_.InjectionToken('HammerLoader');
/**
 * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */

let HammerGestureConfig = /*#__PURE__*/(() => {
  class HammerGestureConfig {
    constructor() {
      /**
       * A set of supported event names for gestures to be used in Angular.
       * Angular supports all built-in recognizers, as listed in
       * [HammerJS documentation](https://hammerjs.github.io/).
       */
      this.events = [];
      /**
       * Maps gesture event names to a set of configuration options
       * that specify overrides to the default values for specific properties.
       *
       * The key is a supported event name to be configured,
       * and the options object contains a set of properties, with override values
       * to be applied to the named recognizer event.
       * For example, to disable recognition of the rotate event, specify
       *  `{"rotate": {"enable": false}}`.
       *
       * Properties that are not present take the HammerJS default values.
       * For information about which properties are supported for which events,
       * and their allowed and default values, see
       * [HammerJS documentation](https://hammerjs.github.io/).
       *
       */

      this.overrides = {};
    }
    /**
     * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
     * and attaches it to a given HTML element.
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */


    buildHammer(element) {
      const mc = new Hammer(element, this.options);
      mc.get('pinch').set({
        enable: true
      });
      mc.get('rotate').set({
        enable: true
      });

      for (const eventName in this.overrides) {
        mc.get(eventName).set(this.overrides[eventName]);
      }

      return mc;
    }

  }

  HammerGestureConfig.ɵfac = function HammerGestureConfig_Factory(t) {
    return new (t || HammerGestureConfig)();
  };

  HammerGestureConfig.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: HammerGestureConfig,
    factory: HammerGestureConfig.ɵfac
  });
  return HammerGestureConfig;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */


let HammerGesturesPlugin = /*#__PURE__*/(() => {
  class HammerGesturesPlugin extends EventManagerPlugin {
    constructor(doc, _config, console, loader) {
      super(doc);
      this._config = _config;
      this.console = console;
      this.loader = loader;
      this._loaderPromise = null;
    }

    supports(eventName) {
      if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
        return false;
      }

      if (!window.Hammer && !this.loader) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` + `loaded and no custom loader has been specified.`);
        }

        return false;
      }

      return true;
    }

    addEventListener(element, eventName, handler) {
      const zone = this.manager.getZone();
      eventName = eventName.toLowerCase(); // If Hammer is not present but a loader is specified, we defer adding the event listener
      // until Hammer is loaded.

      if (!window.Hammer && this.loader) {
        this._loaderPromise = this._loaderPromise || this.loader(); // This `addEventListener` method returns a function to remove the added listener.
        // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
        // than remove anything.

        let cancelRegistration = false;

        let deregister = () => {
          cancelRegistration = true;
        };

        this._loaderPromise.then(() => {
          // If Hammer isn't actually loaded when the custom loader resolves, give up.
          if (!window.Hammer) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
              this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
            }

            deregister = () => {};

            return;
          }

          if (!cancelRegistration) {
            // Now that Hammer is loaded and the listener is being loaded for real,
            // the deregistration function changes from canceling registration to removal.
            deregister = this.addEventListener(element, eventName, handler);
          }
        }).catch(() => {
          if (typeof ngDevMode === 'undefined' || ngDevMode) {
            this.console.warn(`The "${eventName}" event cannot be bound because the custom ` + `Hammer.JS loader failed.`);
          }

          deregister = () => {};
        }); // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
        // can change the behavior of `deregister` once the listener is added. Using a closure in
        // this way allows us to avoid any additional data structures to track listener removal.


        return () => {
          deregister();
        };
      }

      return zone.runOutsideAngular(() => {
        // Creating the manager bind events, must be done outside of angular
        const mc = this._config.buildHammer(element);

        const callback = function (eventObj) {
          zone.runGuarded(function () {
            handler(eventObj);
          });
        };

        mc.on(eventName, callback);
        return () => {
          mc.off(eventName, callback); // destroy mc to prevent memory leak

          if (typeof mc.destroy === 'function') {
            mc.destroy();
          }
        };
      });
    }

    isCustomEvent(eventName) {
      return this._config.events.indexOf(eventName) > -1;
    }

  }

  HammerGesturesPlugin.ɵfac = function HammerGesturesPlugin_Factory(t) {
    return new (t || HammerGesturesPlugin)(core_js_["ɵɵinject"](common_js_.DOCUMENT), core_js_["ɵɵinject"](HAMMER_GESTURE_CONFIG), core_js_["ɵɵinject"](core_js_["ɵConsole"]), core_js_["ɵɵinject"](HAMMER_LOADER, 8));
  };

  HammerGesturesPlugin.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: HammerGesturesPlugin,
    factory: HammerGesturesPlugin.ɵfac
  });
  return HammerGesturesPlugin;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * In Ivy, support for Hammer gestures is optional, so applications must
 * import the `HammerModule` at root to turn on support. This means that
 * Hammer-specific code can be tree-shaken away if not needed.
 */


const HAMMER_PROVIDERS__POST_R3__ = [];
/**
 * In View Engine, support for Hammer gestures is built-in by default.
 */

const HAMMER_PROVIDERS__PRE_R3__ = [{
  provide: EVENT_MANAGER_PLUGINS,
  useClass: HammerGesturesPlugin,
  multi: true,
  deps: [common_js_.DOCUMENT, HAMMER_GESTURE_CONFIG, core_js_["ɵConsole"], [/*#__PURE__*/new core_js_.Optional(), HAMMER_LOADER]]
}, {
  provide: HAMMER_GESTURE_CONFIG,
  useClass: HammerGestureConfig,
  deps: []
}];
const HAMMER_PROVIDERS = HAMMER_PROVIDERS__POST_R3__;
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * @publicApi
 */

let HammerModule = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class HammerModule {}

  HammerModule.ɵfac = function HammerModule_Factory(t) {
    return new (t || HammerModule)();
  };

  HammerModule.ɵmod = /*@__PURE__*/ɵngcc0.ɵɵdefineNgModule({
    type: HammerModule
  });
  HammerModule.ɵinj = /*@__PURE__*/ɵngcc0.ɵɵdefineInjector({
    providers: HAMMER_PROVIDERS__PRE_R3__
  });
  return HammerModule;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Defines supported modifiers for key events.
 */


const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
const DOM_KEY_LOCATION_NUMPAD = 3; // Map to convert some key or keyIdentifier values to what will be returned by getEventKey

const _keyMap = {
  // The following values are here for cross-browser compatibility and to match the W3C standard
  // cf https://www.w3.org/TR/DOM-Level-3-Events-key/
  '\b': 'Backspace',
  '\t': 'Tab',
  '\x7F': 'Delete',
  '\x1B': 'Escape',
  'Del': 'Delete',
  'Esc': 'Escape',
  'Left': 'ArrowLeft',
  'Right': 'ArrowRight',
  'Up': 'ArrowUp',
  'Down': 'ArrowDown',
  'Menu': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'Win': 'OS'
}; // There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...

const _chromeNumKeyPadMap = {
  'A': '1',
  'B': '2',
  'C': '3',
  'D': '4',
  'E': '5',
  'F': '6',
  'G': '7',
  'H': '8',
  'I': '9',
  'J': '*',
  'K': '+',
  'M': '-',
  'N': '.',
  'O': '/',
  '\x60': '0',
  '\x90': 'NumLock'
};

const ɵ0$2 = event => event.altKey,
      ɵ1 = event => event.ctrlKey,
      ɵ2 = event => event.metaKey,
      ɵ3 = event => event.shiftKey;
/**
 * Retrieves modifiers from key-event objects.
 */


const MODIFIER_KEY_GETTERS = {
  'alt': ɵ0$2,
  'control': ɵ1,
  'meta': ɵ2,
  'shift': ɵ3
};
/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */

let KeyEventsPlugin = /*#__PURE__*/(() => {
  class KeyEventsPlugin extends EventManagerPlugin {
    /**
     * Initializes an instance of the browser plug-in.
     * @param doc The document in which key events will be detected.
     */
    constructor(doc) {
      super(doc);
    }
    /**
     * Reports whether a named key event is supported.
     * @param eventName The event name to query.
     * @return True if the named key event is supported.
     */


    supports(eventName) {
      return KeyEventsPlugin.parseEventName(eventName) != null;
    }
    /**
     * Registers a handler for a specific element and key event.
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the key event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns The key event that was registered.
     */


    addEventListener(element, eventName, handler) {
      const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
      const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
      return this.manager.getZone().runOutsideAngular(() => {
        return (0,common_js_["ɵgetDOM"])().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
      });
    }

    static parseEventName(eventName) {
      const parts = eventName.toLowerCase().split('.');
      const domEventName = parts.shift();

      if (parts.length === 0 || !(domEventName === 'keydown' || domEventName === 'keyup')) {
        return null;
      }

      const key = KeyEventsPlugin._normalizeKey(parts.pop());

      let fullKey = '';
      MODIFIER_KEYS.forEach(modifierName => {
        const index = parts.indexOf(modifierName);

        if (index > -1) {
          parts.splice(index, 1);
          fullKey += modifierName + '.';
        }
      });
      fullKey += key;

      if (parts.length != 0 || key.length === 0) {
        // returning null instead of throwing to let another plugin process the event
        return null;
      } // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
      //       The code must remain in the `result['domEventName']` form.
      // return {domEventName, fullKey};


      const result = {};
      result['domEventName'] = domEventName;
      result['fullKey'] = fullKey;
      return result;
    }

    static getEventFullKey(event) {
      let fullKey = '';
      let key = getEventKey(event);
      key = key.toLowerCase();

      if (key === ' ') {
        key = 'space'; // for readability
      } else if (key === '.') {
        key = 'dot'; // because '.' is used as a separator in event names
      }

      MODIFIER_KEYS.forEach(modifierName => {
        if (modifierName != key) {
          const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];

          if (modifierGetter(event)) {
            fullKey += modifierName + '.';
          }
        }
      });
      fullKey += key;
      return fullKey;
    }
    /**
     * Configures a handler callback for a key event.
     * @param fullKey The event name that combines all simultaneous keystrokes.
     * @param handler The function that responds to the key event.
     * @param zone The zone in which the event occurred.
     * @returns A callback function.
     */


    static eventCallback(fullKey, handler, zone) {
      return (event
      /** TODO #9100 */
      ) => {
        if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
          zone.runGuarded(() => handler(event));
        }
      };
    }
    /** @internal */


    static _normalizeKey(keyName) {
      // TODO: switch to a Map if the mapping grows too much
      switch (keyName) {
        case 'esc':
          return 'escape';

        default:
          return keyName;
      }
    }

  }

  KeyEventsPlugin.ɵfac = function KeyEventsPlugin_Factory(t) {
    return new (t || KeyEventsPlugin)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  KeyEventsPlugin.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: KeyEventsPlugin,
    factory: KeyEventsPlugin.ɵfac
  });
  return KeyEventsPlugin;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function getEventKey(event) {
  let key = event.key;

  if (key == null) {
    key = event.keyIdentifier; // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
    // Safari cf
    // https://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces

    if (key == null) {
      return 'Unidentified';
    }

    if (key.startsWith('U+')) {
      key = String.fromCharCode(parseInt(key.substring(2), 16));

      if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
        // There is a bug in Chrome for numeric keypad keys:
        // https://code.google.com/p/chromium/issues/detail?id=155654
        // 1, 2, 3 ... are reported as A, B, C ...
        key = _chromeNumKeyPadMap[key];
      }
    }
  }

  return _keyMap[key] || key;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */


let DomSanitizer = /*#__PURE__*/(() => {
  class DomSanitizer {}

  DomSanitizer.ɵfac = function DomSanitizer_Factory(t) {
    return new (t || DomSanitizer)();
  };

  DomSanitizer.ɵprov = (0,core_js_["ɵɵdefineInjectable"])({
    factory: function DomSanitizer_Factory() {
      return (0,core_js_["ɵɵinject"])(DomSanitizerImpl);
    },
    token: DomSanitizer,
    providedIn: "root"
  });
  return DomSanitizer;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function domSanitizerImplFactory(injector) {
  return new DomSanitizerImpl(injector.get(common_js_.DOCUMENT));
}

let DomSanitizerImpl = /*#__PURE__*/(() => {
  class DomSanitizerImpl extends DomSanitizer {
    constructor(_doc) {
      super();
      this._doc = _doc;
    }

    sanitize(ctx, value) {
      if (value == null) return null;

      switch (ctx) {
        case core_js_.SecurityContext.NONE:
          return value;

        case core_js_.SecurityContext.HTML:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "HTML"
          /* Html */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          return (0,core_js_["ɵ_sanitizeHtml"])(this._doc, String(value)).toString();

        case core_js_.SecurityContext.STYLE:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "Style"
          /* Style */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          return value;

        case core_js_.SecurityContext.SCRIPT:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "Script"
          /* Script */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          throw new Error('unsafe value used in a script context');

        case core_js_.SecurityContext.URL:
          const type = (0,core_js_["ɵgetSanitizationBypassType"])(value);

          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "URL"
          /* Url */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          return (0,core_js_["ɵ_sanitizeUrl"])(String(value));

        case core_js_.SecurityContext.RESOURCE_URL:
          if ((0,core_js_["ɵallowSanitizationBypassAndThrow"])(value, "ResourceURL"
          /* ResourceUrl */
          )) {
            return (0,core_js_["ɵunwrapSafeValue"])(value);
          }

          throw new Error('unsafe value used in a resource URL context (see https://g.co/ng/security#xss)');

        default:
          throw new Error(`Unexpected SecurityContext ${ctx} (see https://g.co/ng/security#xss)`);
      }
    }

    bypassSecurityTrustHtml(value) {
      return (0,core_js_["ɵbypassSanitizationTrustHtml"])(value);
    }

    bypassSecurityTrustStyle(value) {
      return (0,core_js_["ɵbypassSanitizationTrustStyle"])(value);
    }

    bypassSecurityTrustScript(value) {
      return (0,core_js_["ɵbypassSanitizationTrustScript"])(value);
    }

    bypassSecurityTrustUrl(value) {
      return (0,core_js_["ɵbypassSanitizationTrustUrl"])(value);
    }

    bypassSecurityTrustResourceUrl(value) {
      return (0,core_js_["ɵbypassSanitizationTrustResourceUrl"])(value);
    }

  }

  DomSanitizerImpl.ɵfac = function DomSanitizerImpl_Factory(t) {
    return new (t || DomSanitizerImpl)(core_js_["ɵɵinject"](common_js_.DOCUMENT));
  };

  DomSanitizerImpl.ɵprov = (0,core_js_["ɵɵdefineInjectable"])({
    factory: function DomSanitizerImpl_Factory() {
      return domSanitizerImplFactory((0,core_js_["ɵɵinject"])(core_js_.INJECTOR));
    },
    token: DomSanitizerImpl,
    providedIn: "root"
  });
  return DomSanitizerImpl;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function initDomAdapter() {
  BrowserDomAdapter.makeCurrent();
  BrowserGetTestability.init();
}

function errorHandler() {
  return new core_js_.ErrorHandler();
}

function _document() {
  // Tell ivy about the global document
  (0,core_js_["ɵsetDocument"])(document);
  return document;
}

const ɵ0$3 = common_js_["ɵPLATFORM_BROWSER_ID"];
const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [{
  provide: core_js_.PLATFORM_ID,
  useValue: ɵ0$3
}, {
  provide: core_js_.PLATFORM_INITIALIZER,
  useValue: initDomAdapter,
  multi: true
}, {
  provide: common_js_.DOCUMENT,
  useFactory: _document,
  deps: []
}];
const BROWSER_SANITIZATION_PROVIDERS__PRE_R3__ = [{
  provide: core_js_.Sanitizer,
  useExisting: DomSanitizer
}, {
  provide: DomSanitizer,
  useClass: DomSanitizerImpl,
  deps: [common_js_.DOCUMENT]
}];
const BROWSER_SANITIZATION_PROVIDERS__POST_R3__ = [];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](https://g.co/ng/security).
 * @publicApi
 */

const BROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS__POST_R3__;
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */

const platformBrowser = /*#__PURE__*/(0,core_js_.createPlatformFactory)(core_js_.platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
const BROWSER_MODULE_PROVIDERS = [BROWSER_SANITIZATION_PROVIDERS, {
  provide: core_js_["ɵINJECTOR_SCOPE"],
  useValue: 'root'
}, {
  provide: core_js_.ErrorHandler,
  useFactory: errorHandler,
  deps: []
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: DomEventsPlugin,
  multi: true,
  deps: [common_js_.DOCUMENT, core_js_.NgZone, core_js_.PLATFORM_ID]
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: KeyEventsPlugin,
  multi: true,
  deps: [common_js_.DOCUMENT]
}, HAMMER_PROVIDERS, {
  provide: DomRendererFactory2,
  useClass: DomRendererFactory2,
  deps: [EventManager, DomSharedStylesHost, core_js_.APP_ID]
}, {
  provide: core_js_.RendererFactory2,
  useExisting: DomRendererFactory2
}, {
  provide: SharedStylesHost,
  useExisting: DomSharedStylesHost
}, {
  provide: DomSharedStylesHost,
  useClass: DomSharedStylesHost,
  deps: [common_js_.DOCUMENT]
}, {
  provide: core_js_.Testability,
  useClass: core_js_.Testability,
  deps: [core_js_.NgZone]
}, {
  provide: EventManager,
  useClass: EventManager,
  deps: [EVENT_MANAGER_PLUGINS, core_js_.NgZone]
}, {
  provide: common_js_.XhrFactory,
  useClass: BrowserXhr,
  deps: []
}, ELEMENT_PROBE_PROVIDERS];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */

let BrowserModule = /*#__PURE__*/(() => {
  class BrowserModule {
    constructor(parentModule) {
      if (parentModule) {
        throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
      }
    }
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
     */


    static withServerTransition(params) {
      return {
        ngModule: BrowserModule,
        providers: [{
          provide: core_js_.APP_ID,
          useValue: params.appId
        }, {
          provide: TRANSITION_ID,
          useExisting: core_js_.APP_ID
        }, SERVER_TRANSITION_PROVIDERS]
      };
    }

  }

  BrowserModule.ɵfac = function BrowserModule_Factory(t) {
    return new (t || BrowserModule)(core_js_["ɵɵinject"](BrowserModule, 12));
  };

  BrowserModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: BrowserModule
  });
  BrowserModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    providers: BROWSER_MODULE_PROVIDERS,
    imports: [common_js_.CommonModule, core_js_.ApplicationModule]
  });
  return BrowserModule;
})();

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

/*#__PURE__*/
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && core_js_["ɵɵsetNgModuleScope"](BrowserModule, {
    exports: function () {
      return [common_js_.CommonModule, core_js_.ApplicationModule];
    }
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Factory to create a `Meta` service instance for the current DOM document.
 */


function createMeta() {
  return new Meta(ɵɵinject(DOCUMENT));
}
/**
 * A service for managing HTML `<meta>` tags.
 *
 * Properties of the `MetaDefinition` object match the attributes of the
 * HTML `<meta>` tag. These tags define document metadata that is important for
 * things like configuring a Content Security Policy, defining browser compatibility
 * and security settings, setting HTTP Headers, defining rich content for social sharing,
 * and Search Engine Optimization (SEO).
 *
 * To identify specific `<meta>` tags in a document, use an attribute selection
 * string in the format `"tag_attribute='value string'"`.
 * For example, an `attrSelector` value of `"name='description'"` matches a tag
 * whose `name` attribute has the value `"description"`.
 * Selectors are used with the `querySelector()` Document method,
 * in the format `meta[{attrSelector}]`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 *
 *
 * @publicApi
 */


let Meta = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class Meta {
    constructor(_doc) {
      this._doc = _doc;
      this._dom = ɵgetDOM();
    }
    /**
     * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * If an existing element is found, it is returned and is not modified in any way.
     * @param tag The definition of a `<meta>` element to match or create.
     * @param forceCreation True to create a new element without checking whether one already exists.
     * @returns The existing element with the same attributes and values if found,
     * the new element if no match is found, or `null` if the tag parameter is not defined.
     */


    addTag(tag, forceCreation = false) {
      if (!tag) return null;
      return this._getOrCreateElement(tag, forceCreation);
    }
    /**
     * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * @param tags An array of tag definitions to match or create.
     * @param forceCreation True to create new elements without checking whether they already exist.
     * @returns The matching elements if found, or the new elements.
     */


    addTags(tags, forceCreation = false) {
      if (!tags) return [];
      return tags.reduce((result, tag) => {
        if (tag) {
          result.push(this._getOrCreateElement(tag, forceCreation));
        }

        return result;
      }, []);
    }
    /**
     * Retrieves a `<meta>` tag element in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching element, if any.
     */


    getTag(attrSelector) {
      if (!attrSelector) return null;
      return this._doc.querySelector(`meta[${attrSelector}]`) || null;
    }
    /**
     * Retrieves a set of `<meta>` tag elements in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching elements, if any.
     */


    getTags(attrSelector) {
      if (!attrSelector) return [];

      const list
      /*NodeList*/
      = this._doc.querySelectorAll(`meta[${attrSelector}]`);

      return list ? [].slice.call(list) : [];
    }
    /**
     * Modifies an existing `<meta>` tag element in the current HTML document.
     * @param tag The tag description with which to replace the existing tag content.
     * @param selector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     * If not supplied, matches a tag with the same `name` or `property` attribute value as the
     * replacement tag.
     * @return The modified element.
     */


    updateTag(tag, selector) {
      if (!tag) return null;
      selector = selector || this._parseSelector(tag);
      const meta = this.getTag(selector);

      if (meta) {
        return this._setMetaElementAttributes(tag, meta);
      }

      return this._getOrCreateElement(tag, true);
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param attrSelector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     */


    removeTag(attrSelector) {
      this.removeTagElement(this.getTag(attrSelector));
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param meta The tag definition to match against to identify an existing tag.
     */


    removeTagElement(meta) {
      if (meta) {
        this._dom.remove(meta);
      }
    }

    _getOrCreateElement(meta, forceCreation = false) {
      if (!forceCreation) {
        const selector = this._parseSelector(meta); // It's allowed to have multiple elements with the same name so it's not enough to
        // just check that element with the same name already present on the page. We also need to
        // check if element has tag attributes


        const elem = this.getTags(selector).filter(elem => this._containsAttributes(meta, elem))[0];
        if (elem !== undefined) return elem;
      }

      const element = this._dom.createElement('meta');

      this._setMetaElementAttributes(meta, element);

      const head = this._doc.getElementsByTagName('head')[0];

      head.appendChild(element);
      return element;
    }

    _setMetaElementAttributes(tag, el) {
      Object.keys(tag).forEach(prop => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
      return el;
    }

    _parseSelector(tag) {
      const attr = tag.name ? 'name' : 'property';
      return `${attr}="${tag[attr]}"`;
    }

    _containsAttributes(tag, elem) {
      return Object.keys(tag).every(key => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
    }

    _getMetaKeyMap(prop) {
      return META_KEYS_MAP[prop] || prop;
    }

  }

  Meta.ɵfac = function Meta_Factory(t) {
    return new (t || Meta)(ɵngcc0.ɵɵinject(DOCUMENT));
  };

  Meta.ɵprov = ɵɵdefineInjectable({
    factory: createMeta,
    token: Meta,
    providedIn: "root"
  });
  return Meta;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * Mapping for MetaDefinition properties with their correct meta attribute names
 */


const META_KEYS_MAP = {
  httpEquiv: 'http-equiv'
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Factory to create Title service.
 */

function createTitle() {
  return new Title(ɵɵinject(DOCUMENT));
}
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @publicApi
 */


let Title = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class Title {
    constructor(_doc) {
      this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     */


    getTitle() {
      return this._doc.title;
    }
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */


    setTitle(newTitle) {
      this._doc.title = newTitle || '';
    }

  }

  Title.ɵfac = function Title_Factory(t) {
    return new (t || Title)(ɵngcc0.ɵɵinject(DOCUMENT));
  };

  Title.ɵprov = ɵɵdefineInjectable({
    factory: createTitle,
    token: Title,
    providedIn: "root"
  });
  return Title;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const win = typeof window !== 'undefined' && window || {};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

class ChangeDetectionPerfRecord {
  constructor(msPerTick, numTicks) {
    this.msPerTick = msPerTick;
    this.numTicks = numTicks;
  }

}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */


class AngularProfiler {
  constructor(ref) {
    this.appRef = ref.injector.get(ApplicationRef);
  } // tslint:disable:no-console

  /**
   * Exercises change detection in a loop and then prints the average amount of
   * time in milliseconds how long a single round of change detection takes for
   * the current state of the UI. It runs a minimum of 5 rounds for a minimum
   * of 500 milliseconds.
   *
   * Optionally, a user may pass a `config` parameter containing a map of
   * options. Supported options are:
   *
   * `record` (boolean) - causes the profiler to record a CPU profile while
   * it exercises the change detector. Example:
   *
   * ```
   * ng.profiler.timeChangeDetection({record: true})
   * ```
   */


  timeChangeDetection(config) {
    const record = config && config['record'];
    const profileName = 'Change Detection'; // Profiler is not available in Android browsers without dev tools opened

    const isProfilerAvailable = win.console.profile != null;

    if (record && isProfilerAvailable) {
      win.console.profile(profileName);
    }

    const start = performanceNow();
    let numTicks = 0;

    while (numTicks < 5 || performanceNow() - start < 500) {
      this.appRef.tick();
      numTicks++;
    }

    const end = performanceNow();

    if (record && isProfilerAvailable) {
      win.console.profileEnd(profileName);
    }

    const msPerTick = (end - start) / numTicks;
    win.console.log(`ran ${numTicks} change detection cycles`);
    win.console.log(`${msPerTick.toFixed(2)} ms per check`);
    return new ChangeDetectionPerfRecord(msPerTick, numTicks);
  }

}

function performanceNow() {
  return win.performance && win.performance.now ? win.performance.now() : new Date().getTime();
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const PROFILER_GLOBAL_NAME = 'profiler';
/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @publicApi
 */

function enableDebugTools(ref) {
  exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}
/**
 * Disables Angular tools.
 *
 * @publicApi
 */


function disableDebugTools() {
  exportNgVar(PROFILER_GLOBAL_NAME, null);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function escapeHtml(text) {
  const escapedText = {
    '&': '&a;',
    '"': '&q;',
    '\'': '&s;',
    '<': '&l;',
    '>': '&g;'
  };
  return text.replace(/[&"'<>]/g, s => escapedText[s]);
}

function unescapeHtml(text) {
  const unescapedText = {
    '&a;': '&',
    '&q;': '"',
    '&s;': '\'',
    '&l;': '<',
    '&g;': '>'
  };
  return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */


function makeStateKey(key) {
  return key;
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */


let TransferState = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class TransferState {
    constructor() {
      this.store = {};
      this.onSerializeCallbacks = {};
    }
    /** @internal */


    static init(initState) {
      const transferState = new TransferState();
      transferState.store = initState;
      return transferState;
    }
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */


    get(key, defaultValue) {
      return this.store[key] !== undefined ? this.store[key] : defaultValue;
    }
    /**
     * Set the value corresponding to a key.
     */


    set(key, value) {
      this.store[key] = value;
    }
    /**
     * Remove a key from the store.
     */


    remove(key) {
      delete this.store[key];
    }
    /**
     * Test whether a key exists in the store.
     */


    hasKey(key) {
      return this.store.hasOwnProperty(key);
    }
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */


    onSerialize(key, callback) {
      this.onSerializeCallbacks[key] = callback;
    }
    /**
     * Serialize the current state of the store to JSON.
     */


    toJson() {
      // Call the onSerialize callbacks and put those values into the store.
      for (const key in this.onSerializeCallbacks) {
        if (this.onSerializeCallbacks.hasOwnProperty(key)) {
          try {
            this.store[key] = this.onSerializeCallbacks[key]();
          } catch (e) {
            console.warn('Exception in onSerialize callback: ', e);
          }
        }
      }

      return JSON.stringify(this.store);
    }

  }

  TransferState.ɵfac = function TransferState_Factory(t) {
    return new (t || TransferState)();
  };

  TransferState.ɵprov = /*@__PURE__*/ɵngcc0.ɵɵdefineInjectable({
    token: TransferState,
    factory: TransferState.ɵfac
  });
  return TransferState;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();

function initTransferState(doc, appId) {
  // Locate the script tag with the JSON data transferred from the server.
  // The id of the script tag is set to the Angular appId + 'state'.
  const script = doc.getElementById(appId + '-state');
  let initialState = {};

  if (script && script.textContent) {
    try {
      // Avoid using any here as it triggers lint errors in google3 (any is not allowed).
      initialState = JSON.parse(unescapeHtml(script.textContent));
    } catch (e) {
      console.warn('Exception while restoring TransferState for app ' + appId, e);
    }
  }

  return TransferState.init(initialState);
}
/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */


let BrowserTransferStateModule = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  class BrowserTransferStateModule {}

  BrowserTransferStateModule.ɵfac = function BrowserTransferStateModule_Factory(t) {
    return new (t || BrowserTransferStateModule)();
  };

  BrowserTransferStateModule.ɵmod = /*@__PURE__*/ɵngcc0.ɵɵdefineNgModule({
    type: BrowserTransferStateModule
  });
  BrowserTransferStateModule.ɵinj = /*@__PURE__*/ɵngcc0.ɵɵdefineInjector({
    providers: [{
      provide: TransferState,
      useFactory: initTransferState,
      deps: [DOCUMENT, APP_ID]
    }]
  });
  return BrowserTransferStateModule;
})()));

/*#__PURE__*/
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && void 0;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @publicApi
 */


class By {
  /**
   * Match all nodes.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
   */
  static all() {
    return () => true;
  }
  /**
   * Match elements by the given CSS selector.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
   */


  static css(selector) {
    return debugElement => {
      return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
    };
  }
  /**
   * Match nodes that have the given directive present.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
   */


  static directive(type) {
    return debugNode => debugNode.providerTokens.indexOf(type) !== -1;
  }

}

function elementMatches(n, selector) {
  if (ɵgetDOM().isElementNode(n)) {
    return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
  }

  return false;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @publicApi
 */


const VERSION = /*#__PURE__*/new core_js_.Version('12.2.11');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

 //# sourceMappingURL=platform-browser.js.map
// EXTERNAL MODULE: consume shared module (default) @angular/common/http@=12.2.11 (strict) (singleton) (fallback: ./node_modules/@angular/common/fesm2015/http.js)
var http_js_ = __webpack_require__(4407);
;// CONCATENATED MODULE: ./libs/ui/src/lib/ui.module.ts


let UiModule = /*#__PURE__*/(() => {
  class UiModule {}

  UiModule.ɵfac = function UiModule_Factory(t) {
    return new (t || UiModule)();
  };

  UiModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: UiModule
  });
  UiModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    imports: [[common_js_.CommonModule]]
  });
  return UiModule;
})();
;// CONCATENATED MODULE: ./libs/ui/src/index.ts

;// CONCATENATED MODULE: ./libs/shared/types/src/lib/imessage.service.ts

let IMessageService = /*#__PURE__*/(() => {
  class IMessageService {}

  IMessageService.ɵfac = function IMessageService_Factory(t) {
    return new (t || IMessageService)();
  };

  IMessageService.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: IMessageService,
    factory: IMessageService.ɵfac,
    providedIn: "root"
  });
  return IMessageService;
})();
;// CONCATENATED MODULE: ./libs/shared/types/src/index.ts


;// CONCATENATED MODULE: ./libs/shared/services/src/lib/message/message.service.ts


let MessageService = /*#__PURE__*/(() => {
  class MessageService {
    constructor() {
      this.logs = [];
    }

    log(message, severity) {
      // Do not push to the array, but create a new one, to make it possible to use a pure pipe
      this.logs = [...this.logs, {
        message,
        severity
      }];
    }

    clear() {
      this.logs = [];
    }

  }

  MessageService.ɵfac = function MessageService_Factory(t) {
    return new (t || MessageService)();
  };

  MessageService.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: MessageService,
    factory: MessageService.ɵfac,
    providedIn: "root"
  });
  return MessageService;
})();
;// CONCATENATED MODULE: ./libs/shared/services/src/lib/message/index.ts

;// CONCATENATED MODULE: ./libs/shared/services/src/lib/shared-services.module.ts


let SharedServicesModule = /*#__PURE__*/(() => {
  class SharedServicesModule {}

  SharedServicesModule.ɵfac = function SharedServicesModule_Factory(t) {
    return new (t || SharedServicesModule)();
  };

  SharedServicesModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: SharedServicesModule
  });
  SharedServicesModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    imports: [[common_js_.CommonModule]]
  });
  return SharedServicesModule;
})();
;// CONCATENATED MODULE: ./libs/shared/services/src/index.ts


// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/observable/of.js
var of = __webpack_require__(5917);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/Subscription.js + 1 modules
var Subscription = __webpack_require__(5319);
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/scheduler/Action.js

class Action extends Subscription/* Subscription */.w {
  constructor(scheduler, work) {
    super();
  }

  schedule(state, delay = 0) {
    return this;
  }

} //# sourceMappingURL=Action.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/scheduler/AsyncAction.js

class AsyncAction extends Action {
  constructor(scheduler, work) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
    this.pending = false;
  }

  schedule(state, delay = 0) {
    if (this.closed) {
      return this;
    }

    this.state = state;
    const id = this.id;
    const scheduler = this.scheduler;

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }

    this.pending = true;
    this.delay = delay;
    this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
    return this;
  }

  requestAsyncId(scheduler, id, delay = 0) {
    return setInterval(scheduler.flush.bind(scheduler, this), delay);
  }

  recycleAsyncId(scheduler, id, delay = 0) {
    if (delay !== null && this.delay === delay && this.pending === false) {
      return id;
    }

    clearInterval(id);
    return undefined;
  }

  execute(state, delay) {
    if (this.closed) {
      return new Error('executing a cancelled action');
    }

    this.pending = false;

    const error = this._execute(state, delay);

    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  }

  _execute(state, delay) {
    let errored = false;
    let errorValue = undefined;

    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = !!e && e || new Error(e);
    }

    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  }

  _unsubscribe() {
    const id = this.id;
    const scheduler = this.scheduler;
    const actions = scheduler.actions;
    const index = actions.indexOf(this);
    this.work = null;
    this.state = null;
    this.pending = false;
    this.scheduler = null;

    if (index !== -1) {
      actions.splice(index, 1);
    }

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, null);
    }

    this.delay = null;
  }

} //# sourceMappingURL=AsyncAction.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/Scheduler.js
let Scheduler = /*#__PURE__*/(() => {
  class Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
      this.SchedulerAction = SchedulerAction;
      this.now = now;
    }

    schedule(work, delay = 0, state) {
      return new this.SchedulerAction(this, work).schedule(state, delay);
    }

  }

  Scheduler.now = () => Date.now(); //# sourceMappingURL=Scheduler.js.map


  return Scheduler;
})();
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/scheduler/AsyncScheduler.js

class AsyncScheduler extends Scheduler {
  constructor(SchedulerAction, now = Scheduler.now) {
    super(SchedulerAction, () => {
      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
        return AsyncScheduler.delegate.now();
      } else {
        return now();
      }
    });
    this.actions = [];
    this.active = false;
    this.scheduled = undefined;
  }

  schedule(work, delay = 0, state) {
    if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
      return AsyncScheduler.delegate.schedule(work, delay, state);
    } else {
      return super.schedule(work, delay, state);
    }
  }

  flush(action) {
    const {
      actions
    } = this;

    if (this.active) {
      actions.push(action);
      return;
    }

    let error;
    this.active = true;

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());

    this.active = false;

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }

      throw error;
    }
  }

} //# sourceMappingURL=AsyncScheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/scheduler/async.js


const asyncScheduler = new AsyncScheduler(AsyncAction);
const async_async = asyncScheduler; //# sourceMappingURL=async.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/util/isDate.js
function isDate(value) {
  return value instanceof Date && !isNaN(+value);
} //# sourceMappingURL=isDate.js.map
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/Subscriber.js
var Subscriber = __webpack_require__(7393);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/observable/empty.js
var empty = __webpack_require__(9193);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/Observable.js + 3 modules
var Observable = __webpack_require__(7574);
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/observable/throwError.js

function throwError(error, scheduler) {
  if (!scheduler) {
    return new Observable/* Observable */.y(subscriber => subscriber.error(error));
  } else {
    return new Observable/* Observable */.y(subscriber => scheduler.schedule(dispatch, 0, {
      error,
      subscriber
    }));
  }
}

function dispatch({
  error,
  subscriber
}) {
  subscriber.error(error);
} //# sourceMappingURL=throwError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/Notification.js



var NotificationKind = /*#__PURE__*/(/* unused pure expression or super */ null && ((() => {
  (function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
  })(NotificationKind || (NotificationKind = {}));

  return NotificationKind;
})()));
class Notification {
  constructor(kind, value, error) {
    this.kind = kind;
    this.value = value;
    this.error = error;
    this.hasValue = kind === 'N';
  }

  observe(observer) {
    switch (this.kind) {
      case 'N':
        return observer.next && observer.next(this.value);

      case 'E':
        return observer.error && observer.error(this.error);

      case 'C':
        return observer.complete && observer.complete();
    }
  }

  do(next, error, complete) {
    const kind = this.kind;

    switch (kind) {
      case 'N':
        return next && next(this.value);

      case 'E':
        return error && error(this.error);

      case 'C':
        return complete && complete();
    }
  }

  accept(nextOrObserver, error, complete) {
    if (nextOrObserver && typeof nextOrObserver.next === 'function') {
      return this.observe(nextOrObserver);
    } else {
      return this.do(nextOrObserver, error, complete);
    }
  }

  toObservable() {
    const kind = this.kind;

    switch (kind) {
      case 'N':
        return (0,of.of)(this.value);

      case 'E':
        return throwError(this.error);

      case 'C':
        return (0,empty/* empty */.c)();
    }

    throw new Error('unexpected notification kind value');
  }

  static createNext(value) {
    if (typeof value !== 'undefined') {
      return new Notification('N', value);
    }

    return Notification.undefinedValueNotification;
  }

  static createError(err) {
    return new Notification('E', undefined, err);
  }

  static createComplete() {
    return Notification.completeNotification;
  }

}
Notification.completeNotification = new Notification('C');
Notification.undefinedValueNotification = new Notification('N', undefined); //# sourceMappingURL=Notification.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/_esm2015/internal/operators/delay.js




function delay(delay, scheduler = async_async) {
  const absoluteDelay = isDate(delay);
  const delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
  return source => source.lift(new DelayOperator(delayFor, scheduler));
}

class DelayOperator {
  constructor(delay, scheduler) {
    this.delay = delay;
    this.scheduler = scheduler;
  }

  call(subscriber, source) {
    return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
  }

}

class DelaySubscriber extends Subscriber/* Subscriber */.L {
  constructor(destination, delay, scheduler) {
    super(destination);
    this.delay = delay;
    this.scheduler = scheduler;
    this.queue = [];
    this.active = false;
    this.errored = false;
  }

  static dispatch(state) {
    const source = state.source;
    const queue = source.queue;
    const scheduler = state.scheduler;
    const destination = state.destination;

    while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
      queue.shift().notification.observe(destination);
    }

    if (queue.length > 0) {
      const delay = Math.max(0, queue[0].time - scheduler.now());
      this.schedule(state, delay);
    } else {
      this.unsubscribe();
      source.active = false;
    }
  }

  _schedule(scheduler) {
    this.active = true;
    const destination = this.destination;
    destination.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
      source: this,
      destination: this.destination,
      scheduler: scheduler
    }));
  }

  scheduleNotification(notification) {
    if (this.errored === true) {
      return;
    }

    const scheduler = this.scheduler;
    const message = new DelayMessage(scheduler.now() + this.delay, notification);
    this.queue.push(message);

    if (this.active === false) {
      this._schedule(scheduler);
    }
  }

  _next(value) {
    this.scheduleNotification(Notification.createNext(value));
  }

  _error(err) {
    this.errored = true;
    this.queue = [];
    this.destination.error(err);
    this.unsubscribe();
  }

  _complete() {
    this.scheduleNotification(Notification.createComplete());
    this.unsubscribe();
  }

}

class DelayMessage {
  constructor(time, notification) {
    this.time = time;
    this.notification = notification;
  }

} //# sourceMappingURL=delay.js.map
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/operators/tap.js + 1 modules
var tap = __webpack_require__(3342);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/operators/map.js
var map = __webpack_require__(8002);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/operators/catchError.js
var catchError = __webpack_require__(5304);
;// CONCATENATED MODULE: ./libs/shared/data-access/src/lib/btcRate/btc-rate.service.ts







let BtcRateService = /*#__PURE__*/(() => {
  class BtcRateService {
    constructor(http, messageService) {
      this.http = http;
      this.messageService = messageService;
      this.btcUrl = "api/btc";
      this.httpOptions = {
        headers: new http_js_.HttpHeaders({
          "Content-Type": "application/json"
        })
      };
    }

    log(message, severity) {
      this.messageService.log(`SHARED-BtcRateService: ${message}`, severity);
    }

    getRate() {
      const url = window.location.hostname === "code-star.github.io" ? `${this.btcUrl}` : `http://localhost:3333/${this.btcUrl}`;
      return this.http.get(url).pipe(delay(1000), (0,tap/* tap */.b)(() => this.log(`fetched rate`, "info")), (0,map/* map */.U)(({
        btc
      }) => [Date.now(), btc]), (0,catchError/* catchError */.K)(this.handleError(`getRate`)));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */


    handleError(operation = "operation", result) {
      return error => {
        this.log(`${operation} failed: ${error.message}`, "error");
        return (0,of.of)(result);
      };
    }

  }

  BtcRateService.ɵfac = function BtcRateService_Factory(t) {
    return new (t || BtcRateService)(core_js_["ɵɵinject"](http_js_.HttpClient), core_js_["ɵɵinject"](IMessageService));
  };

  BtcRateService.ɵprov = /*@__PURE__*/core_js_["ɵɵdefineInjectable"]({
    token: BtcRateService,
    factory: BtcRateService.ɵfac,
    providedIn: "root"
  });
  return BtcRateService;
})();
;// CONCATENATED MODULE: ./libs/shared/data-access/src/lib/btcRate/index.ts

;// CONCATENATED MODULE: ./libs/shared/data-access/src/lib/shared-data-access.module.ts


let SharedDataAccessModule = /*#__PURE__*/(() => {
  class SharedDataAccessModule {}

  SharedDataAccessModule.ɵfac = function SharedDataAccessModule_Factory(t) {
    return new (t || SharedDataAccessModule)();
  };

  SharedDataAccessModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: SharedDataAccessModule
  });
  SharedDataAccessModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    imports: [[common_js_.CommonModule]]
  });
  return SharedDataAccessModule;
})();
;// CONCATENATED MODULE: ./libs/shared/data-access/src/index.ts


// EXTERNAL MODULE: consume shared module (default) @angular/router@=12.2.11 (strict) (singleton) (fallback: ./node_modules/@angular/router/fesm2015/router.js)
var router_js_ = __webpack_require__(1358);
;// CONCATENATED MODULE: ./libs/ui/src/lib/icon/icon.component.ts


const _c0 = ["type", ""];

function IconComponent__svg_svg_0_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵnamespaceSVG"]();
    core_js_["ɵɵelementStart"](0, "svg", 2);
    core_js_["ɵɵelement"](1, "path", 3);
    core_js_["ɵɵelementEnd"]();
  }
}

function IconComponent__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵnamespaceSVG"]();
    core_js_["ɵɵelementStart"](0, "svg", 4);
    core_js_["ɵɵelement"](1, "path", 5);
    core_js_["ɵɵelementEnd"]();
  }
}

function IconComponent__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵnamespaceSVG"]();
    core_js_["ɵɵelementStart"](0, "svg", 4);
    core_js_["ɵɵelement"](1, "path", 6);
    core_js_["ɵɵelementEnd"]();
  }
}

function IconComponent__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵnamespaceSVG"]();
    core_js_["ɵɵelementStart"](0, "svg", 4);
    core_js_["ɵɵelement"](1, "path", 7);
    core_js_["ɵɵelementEnd"]();
  }
}

let IconComponent = /*#__PURE__*/(() => {
  class IconComponent {
    constructor() {
      /**
       * Name of the icon to display
       */
      this.type = "home";
    }

  }

  IconComponent.ɵfac = function IconComponent_Factory(t) {
    return new (t || IconComponent)();
  };

  IconComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: IconComponent,
    selectors: [["star-icon", "type", ""]],
    inputs: {
      type: "type"
    },
    attrs: _c0,
    decls: 4,
    vars: 4,
    consts: [["focusable", "false", "viewBox", "0 0 24 24", "aria-hidden", "true", "width", "100%", 4, "ngIf"], ["viewBox", "0 0 24 24", "width", "100%", 4, "ngIf"], ["focusable", "false", "viewBox", "0 0 24 24", "aria-hidden", "true", "width", "100%"], ["d", "M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"], ["viewBox", "0 0 24 24", "width", "100%"], ["d", "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"], ["d", "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"], ["d", "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"]],
    template: function IconComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵtemplate"](0, IconComponent__svg_svg_0_Template, 2, 0, "svg", 0);
        core_js_["ɵɵtemplate"](1, IconComponent__svg_svg_1_Template, 2, 0, "svg", 1);
        core_js_["ɵɵtemplate"](2, IconComponent__svg_svg_2_Template, 2, 0, "svg", 1);
        core_js_["ɵɵtemplate"](3, IconComponent__svg_svg_3_Template, 2, 0, "svg", 1);
      }

      if (rf & 2) {
        core_js_["ɵɵproperty"]("ngIf", ctx.type === "loading");
        core_js_["ɵɵadvance"](1);
        core_js_["ɵɵproperty"]("ngIf", ctx.type === "home");
        core_js_["ɵɵadvance"](1);
        core_js_["ɵɵproperty"]("ngIf", ctx.type === "code");
        core_js_["ɵɵadvance"](1);
        core_js_["ɵɵproperty"]("ngIf", ctx.type === "star");
      }
    },
    directives: [common_js_.NgIf],
    styles: [""]
  });
  return IconComponent;
})();
;// CONCATENATED MODULE: ./libs/ui/src/lib/app-template/app-template.component.ts


const app_template_component_c0 = ["title", ""];
const _c1 = ["*"];
let AppTemplateComponent = /*#__PURE__*/(() => {
  class AppTemplateComponent {
    constructor() {
      this.title = "";
    }

  }

  AppTemplateComponent.ɵfac = function AppTemplateComponent_Factory(t) {
    return new (t || AppTemplateComponent)();
  };

  AppTemplateComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: AppTemplateComponent,
    selectors: [["star-app-template", "title", ""]],
    inputs: {
      title: "title"
    },
    attrs: app_template_component_c0,
    ngContentSelectors: _c1,
    decls: 14,
    vars: 1,
    consts: [[1, "root"], ["title", "home"], ["type", "home"], ["title", "code"], ["type", "code"], ["title", "star"], ["type", "star"], [1, "root-column"]],
    template: function AppTemplateComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵprojectionDef"]();
        core_js_["ɵɵelementStart"](0, "div", 0);
        core_js_["ɵɵelementStart"](1, "nav");
        core_js_["ɵɵelementStart"](2, "button", 1);
        core_js_["ɵɵelement"](3, "star-icon", 2);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](4, "button", 3);
        core_js_["ɵɵelement"](5, "star-icon", 4);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](6, "button", 5);
        core_js_["ɵɵelement"](7, "star-icon", 6);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](8, "div", 7);
        core_js_["ɵɵelementStart"](9, "header");
        core_js_["ɵɵelementStart"](10, "h1");
        core_js_["ɵɵtext"](11);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](12, "main");
        core_js_["ɵɵprojection"](13);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        core_js_["ɵɵadvance"](11);
        core_js_["ɵɵtextInterpolate"](ctx.title);
      }
    },
    directives: [IconComponent],
    styles: ["[_nghost-%COMP%] {\n  --star-default-bg: #002042;\n  --star-card-bg: #001329;\n  --star-primary: #e87e00;\n  font-family: sans-serif;\n}\n\n.root[_ngcontent-%COMP%] {\n  background-color: var(--star-default-bg);\n  color: white;\n  display: flex;\n  height: 100vh;\n}\n\n.root-column[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\na[_ngcontent-%COMP%] {\n  color: var(--star-primary);\n}\n\nnav[_ngcontent-%COMP%] {\n  background-color: var(--star-primary);\n  width: 64px;\n  padding-top: calc(96px + 1rem);\n}\n\nnav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 4px;\n  background-color: #cf7000;\n  padding: 4px;\n  margin: 2px 4px;\n  width: 56px;\n  height: 56px;\n  cursor: pointer;\n}\n\nnav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #b56200;\n}\n\nheader[_ngcontent-%COMP%] {\n  background-color: var(--star-card-bg);\n  height: calc(96px - 2rem);\n  padding: 1rem;\n}\n\nheader[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}"]
  });
  return AppTemplateComponent;
})();
;// CONCATENATED MODULE: ./libs/ui/src/lib/paper/paper.component.ts

const paper_component_c0 = ["*"];
/**
 * A Card to group other components together. This is an atom, a UI component. Presentational, without state.
 *
 * Usage: `<star-paper><h1>Card Title</h1><p>card content</p></star-paper>`
 *
 * @example `<star-paper><h1>Card Title</h1><p>card content</p></star-paper>`
 */

let PaperComponent = /*#__PURE__*/(() => {
  class PaperComponent {}

  PaperComponent.ɵfac = function PaperComponent_Factory(t) {
    return new (t || PaperComponent)();
  };

  PaperComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: PaperComponent,
    selectors: [["star-paper"]],
    ngContentSelectors: paper_component_c0,
    decls: 2,
    vars: 0,
    template: function PaperComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵprojectionDef"]();
        core_js_["ɵɵelementStart"](0, "section");
        core_js_["ɵɵprojection"](1);
        core_js_["ɵɵelementEnd"]();
      }
    },
    styles: ["[_nghost-%COMP%] {\n  --star-paper-bg: #001329;\n}\n\nsection[_ngcontent-%COMP%] {\n  background-color: var(--star-paper-bg);\n  color: white;\n  margin: 1rem;\n  padding: 1rem;\n  border-radius: 8px;\n}\n\nsection[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\nsection[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}"]
  });
  return PaperComponent;
})();
;// CONCATENATED MODULE: ./libs/ui/src/lib/primary-button/primary-button.component.ts

const primary_button_component_c0 = ["*"];
/**
 * Some primary button documentation. This is an atom, a UI component. Presentational, without state.
 *
 * Usage: `<star-primary-button>label</star-primary-button>`
 *
 * @example
 * `<star-primary-button>label</star-primary-button>`
 */

let PrimaryButtonComponent = /*#__PURE__*/(() => {
  class PrimaryButtonComponent {
    constructor() {
      /**
       * When true, clicking the button has no effect
       */
      this.disabled = false;
    }

  }

  PrimaryButtonComponent.ɵfac = function PrimaryButtonComponent_Factory(t) {
    return new (t || PrimaryButtonComponent)();
  };

  PrimaryButtonComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: PrimaryButtonComponent,
    selectors: [["star-primary-button"]],
    inputs: {
      disabled: "disabled"
    },
    ngContentSelectors: primary_button_component_c0,
    decls: 2,
    vars: 1,
    consts: [[3, "disabled"]],
    template: function PrimaryButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵprojectionDef"]();
        core_js_["ɵɵelementStart"](0, "button", 0);
        core_js_["ɵɵprojection"](1);
        core_js_["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        core_js_["ɵɵproperty"]("disabled", ctx.disabled);
      }
    },
    styles: ["button[_ngcontent-%COMP%] {\n  background: #e87e00;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  color: black;\n  padding: 0.5rem 1rem;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  text-transform: uppercase;\n  font-weight: bold;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  background: #533106;\n  cursor: not-allowed;\n}"]
  });
  return PrimaryButtonComponent;
})();
;// CONCATENATED MODULE: ./libs/ui/src/lib/loading-button/loading-button.component.ts





function LoadingButtonComponent_star_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵelement"](0, "star-icon", 3);
  }
}

const loading_button_component_c0 = ["*"];
/**
 * Button with a loading state, to show when an an action is keeping this button disabled.
 */

let LoadingButtonComponent = /*#__PURE__*/(() => {
  class LoadingButtonComponent {
    constructor() {
      /**
       * When loading is true, the button is disabled and a loading animation is displayed.
       */
      this.loading = false;
    }

  }

  LoadingButtonComponent.ɵfac = function LoadingButtonComponent_Factory(t) {
    return new (t || LoadingButtonComponent)();
  };

  LoadingButtonComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: LoadingButtonComponent,
    selectors: [["star-loading-button"]],
    inputs: {
      loading: "loading"
    },
    ngContentSelectors: loading_button_component_c0,
    decls: 5,
    vars: 2,
    consts: [[3, "disabled"], [1, "flex"], ["class", "img-spin", "type", "loading", 4, "ngIf"], ["type", "loading", 1, "img-spin"]],
    template: function LoadingButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵprojectionDef"]();
        core_js_["ɵɵelementStart"](0, "star-primary-button", 0);
        core_js_["ɵɵelementStart"](1, "div", 1);
        core_js_["ɵɵelementStart"](2, "div");
        core_js_["ɵɵprojection"](3);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵtemplate"](4, LoadingButtonComponent_star_icon_4_Template, 1, 0, "star-icon", 2);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        core_js_["ɵɵproperty"]("disabled", ctx.loading);
        core_js_["ɵɵadvance"](4);
        core_js_["ɵɵproperty"]("ngIf", ctx.loading);
      }
    },
    directives: [PrimaryButtonComponent, common_js_.NgIf, IconComponent],
    styles: [".flex[_ngcontent-%COMP%] {\n  display: flex;\n  grid-gap: 0.4rem;\n  gap: 0.4rem;\n}\n\n.img-spin[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  animation: spin 2s linear infinite;\n  transform-origin: center;\n}\n\n@keyframes spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}"]
  });
  return LoadingButtonComponent;
})();
;// CONCATENATED MODULE: ./libs/ui/src/lib/rates-table/rates-table.component.ts



function RatesTableComponent_tr_8_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵelementStart"](0, "tr");
    core_js_["ɵɵelementStart"](1, "td");
    core_js_["ɵɵtext"](2);
    core_js_["ɵɵpipe"](3, "date");
    core_js_["ɵɵelementEnd"]();
    core_js_["ɵɵelementStart"](4, "td");
    core_js_["ɵɵtext"](5);
    core_js_["ɵɵelementEnd"]();
    core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const rate_r1 = ctx.$implicit;
    core_js_["ɵɵadvance"](2);
    core_js_["ɵɵtextInterpolate"](core_js_["ɵɵpipeBind2"](3, 2, rate_r1[0], "HH:mm:ss"));
    core_js_["ɵɵadvance"](3);
    core_js_["ɵɵtextInterpolate"](rate_r1[1]);
  }
}

let RatesTableComponent = /*#__PURE__*/(() => {
  class RatesTableComponent {
    constructor() {
      /**
       * A list of tuples of dates (in milliseconds since epoch) and rates (number)
       */
      this.rates = [];
    }

  }

  RatesTableComponent.ɵfac = function RatesTableComponent_Factory(t) {
    return new (t || RatesTableComponent)();
  };

  RatesTableComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: RatesTableComponent,
    selectors: [["star-rates-table"]],
    inputs: {
      rates: "rates"
    },
    decls: 9,
    vars: 1,
    consts: [[4, "ngFor", "ngForOf"]],
    template: function RatesTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵelementStart"](0, "table");
        core_js_["ɵɵelementStart"](1, "thead");
        core_js_["ɵɵelementStart"](2, "tr");
        core_js_["ɵɵelementStart"](3, "th");
        core_js_["ɵɵtext"](4, "Time");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](5, "th");
        core_js_["ɵɵtext"](6, "EUR / BTC");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](7, "tbody");
        core_js_["ɵɵtemplate"](8, RatesTableComponent_tr_8_Template, 6, 5, "tr", 0);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        core_js_["ɵɵadvance"](8);
        core_js_["ɵɵproperty"]("ngForOf", ctx.rates);
      }
    },
    directives: [common_js_.NgForOf],
    pipes: [common_js_.DatePipe],
    styles: ["table[_ngcontent-%COMP%] {\n  color: white;\n}\n\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  width: 150px;\n}\n\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  text-align: left;\n}\n\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  text-align: right;\n}\n\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  border-bottom: 2px solid white;\n}\n\ntable[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:not(:last-child)   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid white;\n}"]
  });
  return RatesTableComponent;
})();
;// CONCATENATED MODULE: ./libs/ui/src/lib/alert/alert.component.ts


const alert_component_c0 = ["item", ""];
let AlertComponent = /*#__PURE__*/(() => {
  class AlertComponent {
    constructor() {
      /**
       * LogItem contains the message and severity to show in an alert block
       */
      this.item = {
        message: "",
        severity: "info"
      };
    }

    getPrefix() {
      return this.item.severity.toUpperCase();
    }

  }

  AlertComponent.ɵfac = function AlertComponent_Factory(t) {
    return new (t || AlertComponent)();
  };

  AlertComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: AlertComponent,
    selectors: [["star-alert", "item", ""]],
    inputs: {
      item: "item"
    },
    attrs: alert_component_c0,
    decls: 4,
    vars: 3,
    consts: [[3, "ngClass"]],
    template: function AlertComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵelementStart"](0, "div", 0);
        core_js_["ɵɵelementStart"](1, "span");
        core_js_["ɵɵtext"](2);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵtext"](3);
        core_js_["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        core_js_["ɵɵproperty"]("ngClass", ctx.item.severity);
        core_js_["ɵɵadvance"](2);
        core_js_["ɵɵtextInterpolate"](ctx.getPrefix());
        core_js_["ɵɵadvance"](1);
        core_js_["ɵɵtextInterpolate1"](" ", ctx.item.message, "");
      }
    },
    directives: [common_js_.NgClass],
    styles: [".error[_ngcontent-%COMP%] {\n  color: #fab3ae;\n  background-color: #180605;\n  padding: 1rem;\n}\n\n.info[_ngcontent-%COMP%] {\n  color: #a6d5fa;\n  background-color: #030e18;\n  padding: 1rem;\n}\n\nspan[_ngcontent-%COMP%] {\n  font-weight: bold;\n}"]
  });
  return AlertComponent;
})();
;// CONCATENATED MODULE: ./libs/ui/src/lib/by-severity.pipe.ts

let BySeverityPipe = /*#__PURE__*/(() => {
  class BySeverityPipe {
    transform(value, severity) {
      return value.filter(item => item.severity === severity);
    }

  }

  BySeverityPipe.ɵfac = function BySeverityPipe_Factory(t) {
    return new (t || BySeverityPipe)();
  };

  BySeverityPipe.ɵpipe = /*@__PURE__*/core_js_["ɵɵdefinePipe"]({
    name: "bySeverity",
    type: BySeverityPipe,
    pure: true
  });
  return BySeverityPipe;
})();
;// CONCATENATED MODULE: ./apps/demo/src/app/app.component.ts














function AppComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵelementStart"](0, "div");
    core_js_["ɵɵelement"](1, "star-alert", 6);
    core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const logItem_r2 = ctx.$implicit;
    core_js_["ɵɵadvance"](1);
    core_js_["ɵɵproperty"]("item", logItem_r2);
  }
}

function AppComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    core_js_["ɵɵelementStart"](0, "div");
    core_js_["ɵɵelement"](1, "star-alert", 6);
    core_js_["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const logItem_r3 = ctx.$implicit;
    core_js_["ɵɵadvance"](1);
    core_js_["ɵɵproperty"]("item", logItem_r3);
  }
}

let AppComponent = /*#__PURE__*/(() => {
  class AppComponent {
    constructor(messageService, btcRateService) {
      this.messageService = messageService;
      this.btcRateService = btcRateService;
      this.title = "Rx Reference";
      this.loading = false;
      this.rates = [];
    }

    getRate() {
      this.loading = true;
      this.btcRateService.getRate().subscribe(item => {
        this.rates.push(item);
        this.loading = false;
      });
    }

    ngOnInit() {
      this.getRate();
    }

  }

  AppComponent.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(core_js_["ɵɵdirectiveInject"](MessageService), core_js_["ɵɵdirectiveInject"](BtcRateService));
  };

  AppComponent.ɵcmp = /*@__PURE__*/core_js_["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["star-root"]],
    decls: 23,
    vars: 11,
    consts: [[3, "title"], [3, "loading", "click"], [3, "rates"], [4, "ngFor", "ngForOf"], [2, "margin-top", "0"], ["href", "http://code-star.github.io"], [3, "item"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        core_js_["ɵɵelementStart"](0, "star-app-template", 0);
        core_js_["ɵɵelement"](1, "router-outlet");
        core_js_["ɵɵelementStart"](2, "star-paper");
        core_js_["ɵɵelementStart"](3, "h2");
        core_js_["ɵɵtext"](4, "Exchange rates");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](5, "div");
        core_js_["ɵɵelementStart"](6, "div");
        core_js_["ɵɵelementStart"](7, "star-loading-button", 1);
        core_js_["ɵɵlistener"]("click", function AppComponent_Template_star_loading_button_click_7_listener() {
          return ctx.getRate();
        });
        core_js_["ɵɵtext"](8, "get new exchange rate");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](9, "h3");
        core_js_["ɵɵtext"](10, "Exchange rates");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelement"](11, "star-rates-table", 2);
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵtemplate"](12, AppComponent_div_12_Template, 2, 1, "div", 3);
        core_js_["ɵɵpipe"](13, "bySeverity");
        core_js_["ɵɵtemplate"](14, AppComponent_div_14_Template, 2, 1, "div", 3);
        core_js_["ɵɵpipe"](15, "bySeverity");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](16, "star-paper");
        core_js_["ɵɵelementStart"](17, "p", 4);
        core_js_["ɵɵtext"](18, " A reference example monorepo with Nx + Storybook + Atomic Design in Angular ");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementStart"](19, "h4");
        core_js_["ɵɵtext"](20, "Made by ");
        core_js_["ɵɵelementStart"](21, "a", 5);
        core_js_["ɵɵtext"](22, "Codestar");
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
        core_js_["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        core_js_["ɵɵproperty"]("title", ctx.title);
        core_js_["ɵɵadvance"](7);
        core_js_["ɵɵproperty"]("loading", ctx.loading);
        core_js_["ɵɵadvance"](4);
        core_js_["ɵɵproperty"]("rates", ctx.rates);
        core_js_["ɵɵadvance"](1);
        core_js_["ɵɵproperty"]("ngForOf", core_js_["ɵɵpipeBind2"](13, 5, ctx.messageService.logs, "error"));
        core_js_["ɵɵadvance"](2);
        core_js_["ɵɵproperty"]("ngForOf", core_js_["ɵɵpipeBind2"](15, 8, ctx.messageService.logs, "info"));
      }
    },
    directives: [AppTemplateComponent, router_js_.RouterOutlet, PaperComponent, LoadingButtonComponent, RatesTableComponent, common_js_.NgForOf, AlertComponent],
    pipes: [BySeverityPipe],
    styles: ["[_nghost-%COMP%] {\n  --star-default-bg: #002042;\n  --star-card-bg: #001329;\n  --star-primary: #e87e00;\n  font-family: sans-serif;\n}\n\n.root[_ngcontent-%COMP%] {\n  background-color: var(--star-default-bg);\n  color: white;\n  display: flex;\n  height: 100vh;\n}\n\n.root-column[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\na[_ngcontent-%COMP%] {\n  color: var(--star-primary);\n}\n\nnav[_ngcontent-%COMP%] {\n  background-color: var(--star-primary);\n  width: 64px;\n  padding-top: calc(96px + 1rem);\n}\n\nnav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 4px;\n  background-color: #cf7000;\n  padding: 4px;\n  margin: 2px 4px;\n  width: 56px;\n  height: 56px;\n  cursor: pointer;\n}\n\nnav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #b56200;\n}\n\nheader[_ngcontent-%COMP%] {\n  background-color: var(--star-card-bg);\n  height: calc(96px - 2rem);\n  padding: 1rem;\n}\n\nheader[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}"]
  });
  return AppComponent;
})();
;// CONCATENATED MODULE: ./apps/demo/src/app/app.module.ts









 // import { RemoteEntryModule } from "portfolio/Module"; -> this is not possible because Angular only allows lazy loading in RouterModule ? Maybe, see https://medium.com/@ckyidr9/lazy-load-feature-modules-without-routing-in-angular-9-ivy-220851cc7751

let AppModule = /*#__PURE__*/(() => {
  class AppModule {}

  AppModule.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };

  AppModule.ɵmod = /*@__PURE__*/core_js_["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [AppComponent]
  });
  AppModule.ɵinj = /*@__PURE__*/core_js_["ɵɵdefineInjector"]({
    providers: [{
      provide: IMessageService,
      useExisting: MessageService
    }],
    imports: [[BrowserModule, UiModule, http_js_.HttpClientModule, SharedServicesModule, SharedDataAccessModule, router_js_.RouterModule.forRoot([{
      path: "portfolio",
      loadChildren: () => __webpack_require__.e(/* import() */ 478).then(__webpack_require__.t.bind(__webpack_require__, 2478, 23)).then(m => m.RemoteEntryModule)
    }], {
      initialNavigation: "enabledBlocking"
    })]]
  });
  return AppModule;
})();
;// CONCATENATED MODULE: ./apps/demo/src/environments/environment.ts
const environment = {
  production: true
};
;// CONCATENATED MODULE: ./apps/demo/src/bootstrap.ts





if (environment.production) {
  (0,core_js_.enableProdMode)();
}

platformBrowser().bootstrapModule(AppModule).catch(err => console.error(err));

/***/ })

}]);