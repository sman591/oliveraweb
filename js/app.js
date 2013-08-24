// Generated by CoffeeScript 1.6.2
(function() {
  var disableSubmits, enableSubmits;

  $(document).ready(function() {
    $('.main').introduce();
    $('a').mouseHovers();
    $('a').pageIntent();
    $('form').ajaxForm({
      beforeSubmit: disableSubmits,
      success: enableSubmits,
      resetForm: true,
      timeout: 1000
    });
    return $('.modal').on('hide', function() {
      return window.location.hash = '#home';
    });
  });

  $.fn.serializeObject = function() {
    var a, o;

    o = {};
    a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        return o[this.name].push(this.value || "");
      } else {
        return o[this.name] = this.value || "";
      }
    });
    return o;
  };

  $.fn.introduce = function() {
    if (window.location.hash === '' || window.location.hash === '#home') {
      $('#bg-main').delay(200).fadeIn(1400, 'swing');
      return $(this).delay(1000).fadeIn(1400, 'swing');
    } else {
      $('#bg-main').show();
      return $(this).show();
    }
  };

  $.fn.mouseHovers = function() {
    return $(this).hover(function() {
      return $(this).clearQueue().animate({
        opacity: 0.7
      }, 80);
    }, function() {
      return $(this).animate({
        opacity: 1
      }, 200);
    });
  };

  $.fn.pageIntent = function() {
    return $(this).each(function() {
      var href, page;

      href = $(this).attr('href');
      if (href.indexOf('#') !== -1) {
        page = href.substring(href.indexOf('#') + 1).replace("/", "");
        $(this).on('click', function() {
          return $("#" + page + "-modal").modal('show');
        });
        if (window.location.hash.replace("/", "") === href) {
          return $("#" + page + "-modal").modal('show');
        }
      }
    });
  };

  disableSubmits = function(formData, jqForm, options) {
    var emailFilter, error;

    $(jqForm).find('.error').removeClass('error');
    $(jqForm).find('.response').remove();
    $(jqForm).find('button[type=submit], input[type=submit]').each(function() {
      $(this).data('original-text', $(this).text());
      return $(this).attr("disabled", "disabled").text('Please Wait...');
    });
    error = false;
    emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ($(jqForm).find('input[name="name"]').val().trim().length === 0) {
      $(jqForm).find('input[name="name"]').parents('.control-group').addClass('error');
      error = true;
    }
    if (!emailFilter.test($(jqForm).find('input[name="email"]').val())) {
      $(jqForm).find('input[name="email"]').parents('.control-group').addClass('error');
      error = true;
    }
    if ($(jqForm).find('textarea[name="comments"]').val().trim().length === 0) {
      $(jqForm).find('textarea[name="comments"]').parents('.control-group').addClass('error');
      error = true;
    }
    if (error) {
      $(jqForm).find('button[type=submit], input[type=submit]').each(function() {
        return $(this).removeAttr("disabled").text($(this).data('original-text')).after('<span class="response"><span class="label label-important">Please fill in the required fields</span></span>');
      });
      $(jqForm).find('.response').fadeIn(300);
      return false;
    }
  };

  enableSubmits = function(responseText, statusText, xhr, $form) {
    $form.find('button[type=submit], input[type=submit]').each(function() {
      return $(this).removeAttr("disabled").text($(this).data('original-text')).after('<span class="response"><span class="label label-success">Sent, thank you!</span></span>');
    });
    return $form.find('.response').fadeIn(300);
  };

}).call(this);
