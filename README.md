## Antonio's Cats Home

. <img src="readmeImages/final.png" height="600px" />
<img src="readmeImages/finalMobile.png" height="600px" />

Antonio's Cats Home is a skills demonstration exercise where I implement the same web project with three different front-end technologies:
- [Vanilla ES5 JavaScript](https://antonioredondo.github.io/AntoniosCatsHome/vanillaJavaScript/README.htm) ([source code](https://github.com/AntonioRedondo/AntoniosCatsHome/tree/master/vanillaJavaScript)): no dependencies, tiny size, pure functions, functional programming.
- [AngularJS 1.5](https://antonioredondo.github.io/AntoniosCatsHome/angular1.5/README.htm) ([source code](https://github.com/AntonioRedondo/AntoniosCatsHome/tree/master/angular1.5)): services, directives, isolated scopes, [UI-Router](https://www.npmjs.com/package/angular-ui-router) and [ngAnimate](https://docs.angularjs.org/api/ngAnimate).
- [React 15.6](https://antonioredondo.github.io/AntoniosCatsHome/react/README.htm) ([source code](https://github.com/AntonioRedondo/AntoniosCatsHome/tree/master/react)): ES6 features (modules, classes, arrows, template literals), Redux, React Router and [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html).

Visually the implementations are identical. Behind the hood there are important differences. These implementations solve common front-end problems like model/scope/state creation, routing and animations based on component entering/leaving. All three implementations are a Single-Page Application (SPA). They have been developed following a TDD approach.

This project is intended to help recruiters and hiring IT managers when time comes to assess my coding skills.


### Exercise statement

The starting point is the below mockup:

<img align="center" src="https://github.com/AntonioRedondo/AntoniosCatsHome/raw/master/readmeImages/mockup.png" height="600px" />

Given I am only provided with the above mockup representing a common use case, four images of cats and a JSON file containing a list of cat names and descriptions I have to implement an UI web interface to show a list of cats which are available to be adopted from the local cats shelter "Antonio's Cats Home".

The interface must contain an input text field that when typing text it will be filtering cats cards out. On the JSON feed the cats won't be ordered by name, but when shown on screen they will need to be sorted alphabetically.

A card at a time need to be selectable and show to the user that that card is selected.

The interface must be also responsive and adapt to mobile devices. An attractive design is a plus.


### Comparison between implementations

On the below table you can see technical differences (SCROLL RIGHT TO SEE THE REST OF THE TABLE):

| Implementation | JS (Kb minified) | CSS (Kb minified) | JS imports | CSS imports | Front-end framework | Routing | Animations | Other relevant libraries | CSS framework | Building tools | Linting | Tests | Server | Readme file | Ready out of the box
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Vanilla ES5 JavaScript | 2 | 5 | 1 | 1 (plus fonts) | - (HTML attached to nodes) | - | - | - | Less (with BEM) | npm, Gulp | [JSHint](https://www.npmjs.com/package/gulp-jshint), [HTMLLint](https://www.npmjs.com/package/gulp-htmllint), [lesshint](https://www.npmjs.com/package/lesshint) | Jasmine, Karma, PhantomJS | Node.js | [HTML](https://antonioredondo.github.io/AntoniosCatsHome/vanillaJavaScript/README.htm) | On [`dist`](vanillaJavaScript/dist) folder |
| AngularJS | 222 | 5 | 1 | 1 (plus fonts) | Angular 1.5 (directive) | [UI-Router](https://www.npmjs.com/package/angular-ui-router) | [ngAnimate](https://docs.angularjs.org/api/ngAnimate) | - | Less (with BEM) | npm, Gulp | JSHint, HTMLLint, lesshint | Jasmine, Karma, PhantomJS | Node.js | [HTML](https://antonioredondo.github.io/AntoniosCatsHome/angular1.5/README.htm) | On [`dist`](angular1.5/dist) folder |
| React | 341 | 3 | 1 | 1 (plus fonts) | ES6 React 15.6 | [React Router](https://www.npmjs.com/package/react-router) | [ReactTransitionGroup](https://www.npmjs.com/package/react-transition-group) | Redux, Reselect | [styled-components](https://www.npmjs.com/package/styled-components), Less (with BEM) | npm, Gulp, Browserify | [ESLint](https://www.npmjs.com/package/gulp-eslint), lesshint | Jest, Enzyme, Node.js | Node.js | [HTML](https://antonioredondo.github.io/AntoniosCatsHome/react/README.htm) | On [`dist`](react/dist) folder |


### How to best understand my skills with the test

There are a few points where can be paid attention to find out the quality of the exercise and therefore my programming skills. The implementations contain a set of general technologies, software patterns and best practices normally applied on front-end software development.

There are a number of points to check:
- **Code simplicity:** there is a right balance between the number of technologies used to showcase skills and the low level of requirements of the test in order to avoid feature overload. The aiming balance is quality over quantity. A couple of features well implemented counts more than five features poorly implemented ([KISS principle](https://en.wikipedia.org/wiki/KISS_principle])). On the test statement there are no explicit instructions about libraries or features I can or should implement. This gives freedom of choice at the same time interviewers have less scripted results to assess.
- **Front-end framework:** when using a front-end framework like Angular or React I try to do the best use of these frameworks. Every of these front-end frameworks are a world by themselves and getting used to its opinionated patterns, component live cycles and complex APIs takes time. A pure JavaScript approach shows how the basics are not forgotten.
- **Animations:** CSS animations is a must have in modern front-end development. They add interface continuity and provide extra feedback to the user about the expected behaviour of the interface. There are three basic ways animations can be added to HTML elements: with transitions, with key frames and with JavaScript changing element properties. A not so good way to add animations to these elements would be to use JavaScript and a library like [`jQuery.animate()`](http://api.jquery.com/animate). In a test like this a bad way to animate would be using key frames.
- **Folder structure:** a basic folder structure organises files in a way it is easier to find files when the project grows in size. Often front-end libraries have its own folder structure guidelines. For Angular [this](http://stackoverflow.com/questions/18542353/angularjs-folder-structure) is a good guideline. A general approach would be the below one. More folders would be unnecessary and overcomplicated. Also, source code should be separated from distributable/build code. This approach is followed on each of the implementations.
```
    root
      dist
      src
        assets
          images
          fonts
        components/templates
        data
        style
      tests
```
- **`Readme` file:** a readme file with explanations and instructions must be always present on the root folder. The instructions should suffice when building or opening the project. A readme file without some brief explanations makes harder for interviewers to understand a candidate approach.
- **Technical tricks and traps:** on the test the code will provide tips about the candidate seniority level:
  - Conversion of SVG images to png: common mistake. There is no need to convert SVG to png. Even old versions of Internet Explorer support SVG. Doing so the vectorial nature of SVG is lost.
  - Many CSS and/or JavaScript imports: increases number of HTTP calls and page weight affecting execution performance and loading time.
  - Lack of use of semantic HTML elements: in addition to `<div>`s and `<span>`s, elements like `<header>`, `<footer>`, `<section>`, or `<article>` should be used.
  - Many legacy/rubbish files created with a generator: the use of a generator or a reference project is a good starting base as long as the rest of not used files are removed and the files used are cleaned out from unused code.


### Extra information

Don't forget to visit the rest of my GitHub repo. My flagship website is open for business on [antonioredondo.com](http://antonioredondo.com). And its source code is available on [GitHub](https://github.com/AntonioRedondo/antonioredondo.com-v3). Ideal to better inspect my coding skills.
