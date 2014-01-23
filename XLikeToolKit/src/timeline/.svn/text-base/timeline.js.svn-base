/**
* Timeline plugin for jQuery
* @class Timeline
*/
(function ($) {

  /**
   * Default options for this plugin
   */
  var defaults = {

  };
   /**
  * Plugin main function.
  * @method timeline
  * @param options {Object} setting parameters in an object.
  * @return {Object} jQuery object
  */
  $.fn.timeline = function (options) {
    var opts = $.extend({}, defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      //alert($this.attr("id"));

      drawTimelineChart(opts);
    });
  };
})(jQuery);
