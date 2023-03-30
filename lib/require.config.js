var requireConfig = {
  waitSeconds: 60,
  paths: {
    'angular': 'angular/angular.min',
    'angular-mocks': 'angular/angular-mocks',
    'angular-resource': 'angular/angular-resource.min',
    'angular-route': 'angular/angular-route.min',
    'angular-animate': 'angular/angular-animate.min',
    'bootstrap': 'bootstrap/js/bootstrap.min',
    'cobis': 'cobis',
    'jquery': 'jquery/jquery-2.1.1.min',
    'jquery.validate': 'jquery.validate/jquery.validate.min',
    'kendo': 'kendo-2015.1.429/js/kendo.all.min',
    //'kendo': 'http://kendo.cdn.telerik.com/2016.1.406/js/kendo.all.min',
    'kendo.cultures': 'kendo-2015.1.429/js/cultures',
    'kendo.lang': 'kendo-2015.1.429/js/lang',
    'kiui': 'kiui/kiui-0.0.5',
    'misc': 'misc',
    'text': 'require/text',
    'urijs': 'urijs'
  },
  shim: {
    'angular': {
      'exports': 'angular',
      deps: ['jquery']
    },
    'angular-resource': ['angular'],
    'angular-route': ['angular'],
    'angular-mocks': ['angular'],
    'angular-animate': ['angular'],
    'bootstrap': ['jquery'],
    'kendo': {
      deps: ["angular"]
    },
    'kiui': ['kendo'],
    'cobis/messages': ['kendo'],
    'jquery.validate': ['jquery'],
    'misc/json-formatter.min': ['angular'],
    'misc/dropzone': ['jquery']
  }
};
if (librariesUrl) {
  for (var key in requireConfig.paths) {
    if (requireConfig.paths[key].indexOf('http://') == -1) {
      requireConfig.paths[key] = librariesUrl + requireConfig.paths[key];
    }
  }
}
if (sessionStorage.theme) {
  document.querySelector('link').href = document.querySelector('link').href.replace('theme.css', 'theme-'+sessionStorage.theme+'.css')
}
