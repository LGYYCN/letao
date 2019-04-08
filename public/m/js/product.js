$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
  });
  var page = 1;
  var pageSize = 2;
  // 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      console.log(r);
      // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
      return decodeURI(r[2]);
    }
    return null;
  }

  var proName = getQueryString('keyword')
  getProduct({
    proName
  })

  function getProduct(data) {
    data.page = data.page || page;
    data.pageSize = data.pageSize || pageSize;
    $.ajax({
      url: '/product/queryProduct',
      data: data,
      success: function (res) {
        var tmp = template('tmp', res)
        $('.product-list .mui-row').html(tmp)
        $('.search-header .search-text').val(proName)
      }
    })
  }

  $('.search-header .search-btn').on('click', function () {
    var text = $('.search-header .search-text').val().trim()
    if (text != '') {
      var key = new Date().getTime()
      location.search = 'keyword=' + text + '&key=' + key;
    }
  })

  $('.filtrate a').on('click', function (e) {
    e.preventDefault();
    var data = {
      proName
    };
    var type = $(this).data('type')
    var sort = $(this).data('sort')
    data[type] = sort;
    $(this).data('sort', sort == 1 ? 2 : 1).siblings().data('sort', 2);
    if ($(this).hasClass('active')) {
      $(this).find('i').toggleClass('fa-angle-down fa-angle-up');
    }
    $(this).addClass('active').siblings().removeClass('active').find('i').removeClass(' fa-angle-up').addClass('fa-angle-down')
    getProduct(data)
  })

  $('.mui-row').on('click','.mui-btn', function () {
    location.href = 'detail.html?id=' + $(this).data('id')
  })

  mui.init({
    pullRefresh: {
      container: '#refreshContainer',
      down: {
        callback: pulldownRefresh
      },
      up: {
        contentrefresh: '正在加载...',
        callback: pullupRefresh
      }
    }
  });
  /**
   * 下拉刷新具体业务实现
   */
  function pulldownRefresh() {
    setTimeout(function () {
      page = 1
      getProduct({
        proName
      })
      mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
      mui('#refreshContainer').pullRefresh().refresh(true)
    }, 1500);
  }
  var count = 0;
  /**
   * 上拉加载具体业务实现
   */
  function pullupRefresh() {
    setTimeout(function () {
      page++
      $.ajax({
        url: '/product/queryProduct',
        data: {
          proName: proName,
          page: page,
          pageSize: pageSize,
        },
        success: function (res) {
          if (res.data.length > 0) {
            var tmp = template('tmp', res)
            $('.product-list .mui-row').append(tmp)
            $('.search-header .search-text').val(proName)
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
          } else {
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
          }
        }
      })
    }, 1500);
  }
  // if (mui.os.plus) {
  //   mui.plusReady(function() {
  //     setTimeout(function() {
  //       mui('#refreshContainer').pullRefresh().pullupLoading();
  //     }, 1000);

  //   });
  // } else {
  //   mui.ready(function() {
  //     mui('#refreshContainer').pullRefresh().pullupLoading();
  //   });
  // }
})
