## Antonio's Cats Home

<img align="center" src="http://i.imgur.com/mv8lPf8.png" height="300px" />

Antonio's Cats Home is a skills test demonstration where I implement the same web project with three different front-end technologies:
- [Vanilla ES5 JavaScript](https://antonioredondo.github.io/AntoniosCatsHome/vanillaJavaScript/README.htm) ([source files](https://github.com/AntonioRedondo/AntoniosCatsHome/tree/master/vanillaJavaScript))
- [Angular 1.5](https://antonioredondo.github.io/AntoniosCatsHome/angular1.5/README.htm) ([source files](https://github.com/AntonioRedondo/AntoniosCatsHome/tree/master/angular1.5))
- [React](https://antonioredondo.github.io/AntoniosCatsHome/react/README.htm) ([source files](https://github.com/AntonioRedondo/AntoniosCatsHome/tree/master/react))

The starting point is the below mockup:

<img align="center" src="http://i.imgur.com/gouHjEJ.png" height="300px" />

The exercise is simple. Given I am only provided with the below mockup, four images of cats and a JSON file containing a list of cats I have to implement a UI web interface to show a list of cats which are available to be adopted from the local cats shelter "Antonio's Cats Home". The interface must contain a input text field that when typing text it will be filtering out cats cards. On the JSON feed the cats won't be ordered by name, but when shown on screen they will need to be sorted alphabetically. The interface must also be adapted to mobile devices. An attractive design is a plus.

On the below table you can compare the three different implementations:

| Implementation | JS (Kb minified) | CSS (Kb minified) | JS imports | CSS imports | Front-end framework | Other libraries | CSS Framework | Animations | Selectable cards | Building tools | Server | Tests | Readme file | Project ready out of the box
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ES5 JS | 2 | 4 | 1 | 1 | - (HTML node as template) | - | LESS (with BEM) | Yes | Yes | NPM, Gulp | Node.js | Karma, Jasmine, PhantomJS | HTML | On Dist folder |
| Angular 1.5 | 147 | 4 | 1 | 1 | Angular 1.5 (directive) | - | LESS (with BEM) | Yes | Yes | NPM, Gulp | Node.js | Karma, Jasmine, PhantomJS | HTML | On Dist folder |
| React | 160 | 4 | 1 | 1 | ES6 React 15 | Redux | LESS (with BEM) | Yes | Yes |  NPM, Gulp, Browserify | Node.js | Karma, Jasmine, PhantomJS | HTML | On Dist folder |

### How to read this test in order to best understand my skills
There are a few points where you can pay attention to find out the quality of the exercise and therefore my programming skills. The implementations contain a set of general technologies, software patterns and best practices normally applied on front-end software development.

There are a number of points to check:
- **Code simplicity:** there is a right balance between the number of technologies used to showcase skills and the low level of requirements of the test in order to avoid feature overload. The aiming balance is quality over quantity. A couple of features well implemented counts more than five features poorly implemented ([KISS principle](https://en.wikipedia.org/wiki/KISS_principle])). On the test statement there are no explicit instructions about libraries or features I can or should implement. This gives freedom of choice at the same time interviewers have less scripted results to assess.
- **Front-end framework:** when using a front-end framework like Angular or React I try to do the best use of these frameworks. Every of these front-end frameworks are a world by themselfs and getting used to its opinionated patterns, component live cycles and complex APIs takes time. A pure JavaScript approach shows how the bascis are not forgotten.
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
- **Random technical tricks and traps:** on the test the code will provide tips about the candidate seniority level:
  - Conversion of SVG images to png: common mistake. There is no need to convert SVG to png. Even old versions of Internet Explorer support SVG. Doing so the vectorial nature of SVG is lost.
  - Many CSS and/or JavaScript imports: increases number of HTTP calls and page weight affecting execution performance and loading time.
  - Lack of use of semantic HTML elements: in addition to `<div>`s and `<span>`s, elements like `<header>`, `<footer>`, `<section>`, or `<article>` should be used.
  - Many legacy/rubbish files created with a generator: the use of a generator or a reference project is a good starting base as long as the rest of not used files are removed and the files used are cleaned out from unused code.

### Extra information
Don't forget to visit the rest of my GitHub repo. My flagship website is open for business on [antonioredondo.com](http://antonioredondo.com). And its source code is available on [GitHub](https://github.com/AntonioRedondo/antonioredondo.com-v3). Ideal to better inspect my coding skills.
