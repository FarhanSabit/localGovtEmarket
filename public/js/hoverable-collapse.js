(function($) {
  'use strict';
  //Open submenu on hover in compact sidebar mode and horizontal menu mode
  $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function(ev) {
    var body = $('body');
    var sidebarIconOnly = body.hasClass("sidebar-icon-only");
    var sidebarFixed = body.hasClass("sidebar-fixed");
    if (!('ontouchstart' in document.documentElement)) {
      if (sidebarIconOnly) {
        if (sidebarFixed) {
          if (ev.type === 'mouseenter') {
            body.removeClass('sidebar-icon-only');
          }
        } else {
          var $menuItem = $(this);
          if (ev.type === 'mouseenter') {
            $menuItem.addClass('hover-open')
          } else {
            $menuItem.removeClass('hover-open')
          }
        }
      }
    }
  });
})(jQuery);



$(document).ready(function () {
  // Restore from localStorage
  var currentHref = localStorage.getItem('activeLink');
  if (currentHref) {
    $(".sub-menu .nav-link").each(function () {
      if ($(this).attr('href') === currentHref) {
        $(this).addClass('active');
        // expand the parent collapse div
        $(this).closest('.collapse').addClass('show');
      }
    });
  }

  // On click, add active and store
  $(".sub-menu .nav-link").on("click", function () {
    $(".sub-menu .nav-link").removeClass("active");
    $(this).addClass("active");

    // Save active link href
    localStorage.setItem('activeLink', $(this).attr('href'));
  });
});
