$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
  })
  getHistory()

  function getHistory() {
    var data = localStorage.getItem('searchHistory')
    var arr = []
    if (data != null) {
      var arr = JSON.parse(data)
    }
    var tmp = template('tmp', {
      data: arr
    })
    $('.search-list').html(tmp)
    $('.search-text').val('')
  }

  $('.del-history').on('click', function () {
    localStorage.removeItem('searchHistory')
    getHistory()
  })

  $('.search-btn').on('click', function () {
    var text = $('.search-text').val().trim()
    if (text == '') {
      return;
    }
    var data = localStorage.getItem('searchHistory')
    if (data == null) {
      var arr = []
      arr.push(text)
    } else {
      var arr = JSON.parse(data)
      var boo = true;
      arr.forEach(el => {
        if (el == text) {
          boo = false
        }
      });
      if (boo) arr.push(text);
    }
    localStorage.setItem('searchHistory', JSON.stringify(arr))
    getHistory()
  })

  $('.search-list').on('click','.mui-badge', function () {
    var data = localStorage.getItem('searchHistory')
    var arr = JSON.parse(data)
    var index = this.dataset['index']
    arr.splice(index, 1)
    localStorage.setItem('searchHistory', JSON.stringify(arr))
    console.log(arr);
    getHistory()
  })
})
