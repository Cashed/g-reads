(function() {
  $(document).ready(function(){
    $('#add-author').on('click',function(){
      var newAuthor = $('#new-author').val();
      var currentAuthors = $('#authors').val();

      newAuthor += '\n';

      if (currentAuthors === '') {
        $('#authors').val(newAuthor);
        $('#new-author').val('');
      }
      else {
        $('#authors').val(currentAuthors + newAuthor);
        $('#new-author').val('');
      }
    });

    setTimeout(function() {
      $('.loading').css('display', 'none');
    }, 1500);
  });
}());
