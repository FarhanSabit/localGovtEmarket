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
  // If on /index, clear the stored active link
  if (window.location.pathname === "/index" || window.location.pathname === "/index.html") {
    localStorage.removeItem("activeLink");
  }

  // Restore from localStorage if available
  var currentHref = localStorage.getItem('activeLink');
  if (currentHref) {
    $(".sub-menu .nav-link").each(function () {
      if ($(this).attr('href') === currentHref) {
        $(this).addClass('active');
        $(this).closest('.collapse').addClass('show');
      }
    });
  }

  // On click, store the active link
  $(".sub-menu .nav-link").on("click", function () {
    $(".sub-menu .nav-link").removeClass("active");
    $(this).addClass("active");
    localStorage.setItem('activeLink', $(this).attr('href'));
  });
});

