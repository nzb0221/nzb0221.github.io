## Welcome to Angular

```javascript
@Component({
  selector: "app-root",
  template: `
    <div style="text-align:center">
      <h1> Welcome to {{ title }}!</h1>
    </div>`,
  styleUrls: [...]
})
export class AppComponent {
    @Input() title = "Angular!";
}
```

- `ng build --aot`
- `npx http-server dist/my-app`
- Compile/bundle the application to be executed.


## Angular parts

- **Angular compiler**, JIT or AOT, build utility.
  - Transform templates into code *runtime* can execute.
  - Use interfaces methods.
  - Code is a kind of independent representation.
- **Angular runtime**, framework code that ships with the application.
  - Interface implementation.
  - *Execute application code.*


## Incremental DOM

>Every component gets compiled into a series of instructions.
>These instructions create DOM trees and update them in-place when the data changes.

- [Fast](http://google.github.io/incremental-dom/#why-incremental-dom) **view creation** and **change detection**.
- [Better](https://medium.com/google-developers/introducing-incremental-dom-e98f79ce2c5f) *bundle size* and *memory footprint*.
- Other technique then Virtual DOM.


## Bootstrap Sequence

<img src="./images/angular-platform.png" width="45%">

- `main-es2015.js` IIEF bootstraps the platform.
- Platform instantiates application.
- Application bootstraps root component.