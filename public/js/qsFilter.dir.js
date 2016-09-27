(function () {
  'use strict';

  angular
    .module( 'qsApp' )

    .directive( 'qsFilter', qsFilter )
  ;


  function qsFilter () {
      return {
        restrict    : "E",
        replace     : true,
        templateUrl : "templates/qsFilter.tpl.html",
        scope       : { caption  : "@",
                        show     : "=",
                        filter   : "=",
                        click    : "&" },

        link: function (scope, element, attrs) {

          console.log('qsFilter.link()...');

          // console.log(scope);
          // console.log(element);
          // console.log(attrs);

          console.log(scope.filter);

        }
      
      }

  }//end of  qsFilter()    

})();