requirejs.config({
    baseUrl: '.',
    paths:   {
        es6:    "vendor/requirejs-babel/es6",
        babel:  "vendor/requirejs-babel/babel-5.8.22.min",
        jquery: "vendor/jquery/dist/jquery.min",

        app: "./js"
    }
});

define('modernizr', [], Modernizr);

requirejs(["es6!app/main"], function () {
    console.log('es6loaded')
});