## Platform

<pre><code class="hljs" data-line-numbers="3,5" data-trim data-noescape>
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
</code></pre>

- `BrowserModule` is the platform browser.
- Each page has only one platform.
- Platform and services created by a factory.


## PlatormRef

```javascript
class PlatformRef {
    // Creates an instance of an `\@NgModule` for the given platform
    bootstrapModuleFactory(moduleFactory, options) {
      // Note: We need to create the NgZone _before_ we instantiate the module,
      return ngZone.run((
        // from here the ApplicationRef is created and available to be injected
        this._moduleDoBootstrap(moduleRef); // moduleType: *class AppModule*
        return moduleRef;
      ));
    }

     // Bootstrap all the components of the module
    _moduleDoBootstrap(moduleRef) {
      const appRef = moduleRef.injector.get(ApplicationRef) as ApplicationRef;
      moduleRef._bootstrapComponents.forEach((
        f => appRef.bootstrap(f))); // bootstrap the root component *AppComponent* with selector *app-root*
      ));
    }
}
```

- [`PlatfromRef`](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/application_ref.ts#L235) instanciates `ApplicationRef`and the injectable providers.
- Application bootstraps the `AppComponent`.


## Application

```javascript
class ApplicationRef {
      // Bootstrap a new component at the root level of the application.
      bootstrap(componentOrFactory, rootSelectorOrNode) {
        ...
        /**
         * Use the componentFactory to create the root element app-root having this information:
         * componentType: class AppComponent
         * viewDefFactory: View_AppComponent_Host_0()
         * selector: app-root
         */
        const compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);
      }
  }
```

- [`ApplicationRef`](https://github.com/angular/angular/blob/d2222541e8acf0c01415069e7c6af92b2acbba4f/packages/core/src/application_ref.ts#L503) 
 reference represents the Angular application *running on page*.