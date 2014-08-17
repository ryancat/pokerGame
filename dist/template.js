angular.module('pokerGameTemplate', ['pokerGame.html', 'pokerGameCardTemplate.html']);

angular.module("pokerGame.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGame.html",
    "<div></div>");
}]);

angular.module("pokerGameCardTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("pokerGameCardTemplate.html",
    "<div class=\"poker-game-card\">\n" +
    "\n" +
    "    \n" +
    "    \n" +
    "</div>\n" +
    "");
}]);
