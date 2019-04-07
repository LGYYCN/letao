$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
  });
  getHistory();

  function getHistory() {
    var data = localStorage.getItem('searchHistory');
    var arr = [];
    if (data != null) {
      arr = JSON.parse(data);
    }
    var tmp = template('tmp', {
      data: arr
    });
    $('.search-list').html(tmp);
    $('.search-text').val('');
  }

  $('.del-history').on('click', function () {
    localStorage.removeItem('searchHistory');
    getHistory();
  });

  $('.search-btn').on('click', function () {
    var text = $('.search-text').val().trim();
    if (text == '') {
      return;
    }
    var data = localStorage.getItem('searchHistory');
    var arr = [];
    if (data == null) {
      arr.push(text);
    } else {
      arr = JSON.parse(data);
      var boo = true;
      arr.forEach(el => {
        if (el == text) {
          boo = false;
          return;
        }
      });
      if (boo) arr.unshift(text);
    }
    setLocalStorage(arr);
    // getHistory();

    var key = new Date().getTime()
    location.href = 'product.html?keyword='+text+'&key='+key;

  });

  $('.search-list').on('click', '.mui-badge', function () {
    var data = localStorage.getItem('searchHistory');
    var arr = JSON.parse(data);
    var index = this.dataset[index];
    arr.splice(index, 1);
    setLocalStorage(arr);
    // getHistory();
  });
  $('.search-list').on('click', 'li', function () {
    var data = localStorage.getItem('searchHistory');
    var arr = JSON.parse(data);
    var index = $(this).children('.mui-badge').data('index');
    var text = $(this).children('.search-history-text').text();
    arr.splice(index,

      1);
    arr.unshift(text)
    setLocalStorage(arr);
    var key = new Date().getTime()
    location.href = 'product.html?keyword='+text+'&key='+key;
    // getHistory();
  });
});

function getLocalStorage() {

}
function setLocalStorage(arr) {
  localStorage.setItem('searchHistory', JSON.stringify(arr));
}
