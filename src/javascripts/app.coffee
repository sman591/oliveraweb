$(document).ready ->
  $('.main').introduce()
  $('a').mouseHovers()
  $('a').pageIntent()
  $('form').ajaxForm
    beforeSubmit: disableSubmits
    success: enableSubmits
    resetForm: true
    timeout:   1000

  $('.modal').on 'hide', ->
    window.location.hash = '#home'

$.fn.serializeObject = ->
  o = {}
  a = @serializeArray()
  $.each a, ->
    if o[@name] isnt `undefined`
      o[@name] = [o[@name]]  unless o[@name].push
      o[@name].push @value or ""
    else
      o[@name] = @value or ""

  o

$.fn.introduce = ->
  if (window.location.hash == '' || window.location.hash == '#home')
    $('#bg-main').delay(200).fadeIn(1400, 'swing')
    $(this).delay(1000).fadeIn(1400, 'swing')
  else
    $('#bg-main').show()
    $(this).show()

$.fn.mouseHovers = ->
  $(this).hover ->
    $(this).clearQueue().animate({
      opacity: 0.7
    }, 80)
  , ->
    $(this).animate({
      opacity: 1
    }, 200)

$.fn.pageIntent = ->
  $(this).each ->
    href = $(this).attr('href')
    if href.indexOf('#') != -1
      page = href.substring(href.indexOf('#') + 1)
      $(this).on 'click', ->
        $("##{page}-modal").modal('show')
      if window.location.hash == href
        $("##{page}-modal").modal('show')



disableSubmits = (formData, jqForm, options) ->
  $(jqForm).find('.error').removeClass('error')
  $(jqForm).find('.response').remove()

  $(jqForm).find('button[type=submit], input[type=submit]').each ->
    $(this).data('original-text', $(this).text())
    $(this).attr("disabled", "disabled").text('Please Wait...')

  error = false
  emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if $(jqForm).find('input[name="name"]').val().trim().length == 0
    $(jqForm).find('input[name="name"]').parents('.control-group').addClass('error')
    error = true
  if !emailFilter.test($(jqForm).find('input[name="email"]').val())
    $(jqForm).find('input[name="email"]').parents('.control-group').addClass('error')
    error = true
  if $(jqForm).find('textarea[name="comments"]').val().trim().length == 0
    $(jqForm).find('textarea[name="comments"]').parents('.control-group').addClass('error')
    error = true

  if error
    $(jqForm).find('button[type=submit], input[type=submit]').each ->
      $(this).removeAttr("disabled").text($(this).data('original-text')).after('<span class="response"><span class="label label-important">Please fill in the required fields</span></span>')
    $(jqForm).find('.response').fadeIn(300)
    return false

enableSubmits = (responseText, statusText, xhr, $form) ->
  $form.find('button[type=submit], input[type=submit]').each ->
    $(this).removeAttr("disabled").text($(this).data('original-text')).after('<span class="response"><span class="label label-success">Sent, thank you!</span></span>')
  $form.find('.response').fadeIn(300)
