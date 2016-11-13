$( document ).ready(function() {
  var defaultSearchVal = 'Search Documentation';

  $('.js-search_box-input').val(defaultSearchVal);

  $('.js-search_box').on('click', function() {
    $('.search_layout').fadeIn().addClass('show');
    $('.js-search_box-input').val(defaultSearchVal)
    $('.js-search_box-input').focus();
    $('.js-search_layout-results').html('');
  })

  $('.js-search_box-close').on('click', function() {
    $('.search_layout').fadeOut('slow', function() {
      $('.search_layout').removeClass('show');
    })
  })

  $('.js-search_box-input').on('keydown', function(e, el) {
    var val = $('.js-search_box-input').val();
    if(val == defaultSearchVal) {
      $('.js-search_box-input').val('')
      return;
    }
  })

  $('.js-search_box-input').on('keyup', function(e, el) {
    //TODO: Refactor to service
    var val = $('.js-search_box-input').val();
    document.AlgoliaIndex.search(val, function searchDone(err, content) {
      $('.js-search_layout-results').html('');

      content.hits.forEach(function(result) {
        var li = $('<li></li>');
        var div = $('<div class="result"></div>');
        var titleContent = result.title;
        if(result._highlightResult.title.matchLevel !== 'none') {
          titleContent = result._highlightResult.title.value;
        }
        var h1 = $('<h1 class="result-name">' + titleContent + '</h1>');

        div.append(h1)
        div.append($(result.content));

        li.append(div);

        $('.js-search_layout-results').append(li)
      })
    });
  })
});
