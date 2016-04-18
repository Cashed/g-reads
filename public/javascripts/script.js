(function() {
  $(document).ready(function(){
    $('.add-item').on('click',function(){
      var newItem = $('.new-item').val();
      var currentItems = $('.item-list').val();

      if (currentItems === '') {
        newItem += '\n';
        $('.item-list').val(newItem);
      }
      else {
        newItem = '\n' + newItem;
        $('.item-list').val(currentItems + newItem);
      }
    });

    setTimeout(function() {
      $('.loading').css('display', 'none');
    }, 1500);
  });
}());
