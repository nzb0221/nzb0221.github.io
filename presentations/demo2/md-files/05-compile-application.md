## Invoke Angular Compiler

 In `package.json` add

```javascript
"scripts": {
  ...
  "compile": "ngc"
},
```

- Compiled code with *factory functions*.
- See instructions *Angular runtime* executes.
- Angular compiler 8.3.9
  - use View Engine;
  - no Ivy (new compiler and runtime).


## Factories

- *Angular compiler* produces `.ngfactories` files.
- *Angular runtime* calls factories to instantiate components.
1. `main.js`
1. `app.module.ngfactory.js`
2. `app.component.ngfactories.js`

- Factories are *imperative code*
  - to render and element
  - to update and element (change detection)


## Module Bootstrap

- `main.js` instantiates the Platform.
- `platformBrowserDynamic().bootstrapModule(AppModule)`

option `--aot`

- [`main-aot.ts`](https://github.com/angular/angular.io/blob/281efb9ca0d278b36e2e7fa0850a807d7005e50b/public/docs/_examples/upgrade-phonecat-3-router/ts/app/main-aot.ts#L7) replaces `bootstrapModule` with `bootstrapModuleFactory`.
- `platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);`


## Module Factory

```javascript
var AppModuleNgFactory = i0.ocmf(i1.AppModule, [i2.AppComponent], function(_l) {
  return i0.omod([
    i0.ompd(512,
      [[8, [i3.AppComponentNgFactory]],[3, i0.ComponentFactoryResolver],i0.NgModuleRef]
    ),
    ...
    i0.ompd(4608, i0.Compiler, i0.Compiler, []),
    i0.ompd(4608, i5.DomSanitizer, i5.oDomSanitizerImpl, [i4.DOCUMENT]),
    i0.ompd(6144, i0.Sanitizer, null, [i5.DomSanitizer]),
    ...
    i0.ompd(6144, i0.RendererFactory2, null, [i5.oDomRendererFactory2]),
  ]);
}
```

- `app.module.ngfactory.js` gets services injected.
- Platform browser uses `DefaultDomRenderer2` class to create elements.


## Component Factory

```javascript
export function View_AppComponent_0(_l) {
  return i1.ovid(0,[(_l()(),
      (_l()(), i1.oted(1, null, ["Welcome to ", "!"]))],
      ...
    });
}
export function View_AppComponent_Host_0(_l) {
  return i1.ovid(0,[
      (_l()(),i1.oeld(0,0,null,null,1,"app-root",[],null,null,null,View_AppComponent_0)),
      i1.odid(1, 49152, null, 0, i2.AppComponent, [], null, null)]
  );
}
var AppComponentNgFactory = i1.occf("app-root",i2.AppComponent,View_AppComponent_Host_0);
export { AppComponentNgFactory };
```

- `app.component.ngfactory.js`
- [Reference map](https://github.com/angular/angular/blob/1d429b216556911edc4b0675ece4cb9081967155/packages/platform-browser-dynamic/src/compiler_reflector.ts#L55) to resolve definition.


## Incremental DOM

<pre><code class="hljs" data-line-numbers="3-5,8-12" data-trim data-noescape>
export function View_AppComponent_0(_l) {
  return i1.ovid(0,[
      (_l()(),
      i1.oeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.oted(1, null, ["Welcome to ", "!"]))
    ],
    null,
    function(_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      _ck(_v, 1, 0, currVal_0);
    }
  );
}
</code></pre>

- *render* function, create element first time.
- *change detection* function to update.


## View Engine

- Part of the *runtime*.
- Require importing `.ngfactory` files to use `NgModuleFactory`.
- Create/update logic is in the VE.
- Execute what produced by the compiler.
- It is not *three-shakeable*.
- Ivy will replace the View Engine.


## Where DOM API Invocation?

```javascript
class ComponentFactory_ extends ComponentFactory<any> {
  create() {
    const viewDef = resolveDefinition(this.viewDefFactory);
    const view = Services.createRootView(...);
    ...
    return new ComponentRef_(view, new ViewRef_(view), component);
  }
}
```

- [`ComponentFactory_.ts`](https://github.com/angular/angular/blob/1d429b216556911edc4b0675ece4cb9081967155/packages/core/src/view/refs.ts#L84) creates a generic component.
- `create` methods loads the view definition.
- `createRootView()` creates a `ViewData` instance holding information to add the node to the DOM. 


## services.ts

```javascript
function createProdRootView(...): ViewData {
  ...
  const rendererFactory: RendererFactory2 = ngModule.injector.get(RendererFactory2);
  return createRootView(...);
}
```

- [`services.ts`](https://github.com/angular/angular/blob/1d429b216556911edc4b0675ece4cb9081967155/packages/core/src/view/services.ts#L61) init production services.
- the renderer factory will be used to produce the DOM renderer.


## view.ts

```javascript
export function createRootView(...): ViewData {
  ...
  createViewNodes(view);
  return view;
}
```

- [`view.ts`](https://github.com/angular/angular/blob/1d429b216556911edc4b0675ece4cb9081967155/packages/core/src/view/view.ts#L207) call `createViewNodes()`.


## element.ts

```javascript
export function createElement(view: ViewData, renderHost: any, def: NodeDef): ElementData {
  ...
  if (view.parent || !rootSelectorOrNode) {
    el = renderer.createElement(elDef.name, elDef.ns);
    ...
  }
}
```

- [`element.ts`](https://github.com/angular/angular/blob/1d429b216556911edc4b0675ece4cb9081967155/packages/core/src/view/element.ts#L151) finally call to the DOM API.


## dom_renderer.ts

```javascript
class DefaultDomRenderer2 implements Renderer2 {
  ...
  return document.createElement(name);
}
```

- `Render2` class is in [`api.ts`](https://github.com/angular/angular/blob/1d429b216556911edc4b0675ece4cb9081967155/packages/core/src/render/api.ts#L108).
- [`dom_renderer.ts`](https://github.com/angular/angular/blob/1d429b216556911edc4b0675ece4cb9081967155/packages/platform-browser/src/dom/dom_renderer.ts#L115).
- `DefaultDomRenderer2` instantiated during browser platform creation.