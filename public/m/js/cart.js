$(function () {
  var page = 1
  var pageSize = 5
  var data = {
    id: getQueryString('id'),
    num: getQueryString('num'),
    size: getQueryString('size')
  }
  // mui('.mui-scroll-wrapper').scroll({
  //   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  // })
  $.ajax({
    url: '/cart/queryCart',
    success: function (res) {
      console.log(res);
    }
  })


  mui.init({
    pullRefresh: {
      container: '#refreshContainer',
      down: {
        auto: true,
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
    page = 1
    setTimeout(function () {
      $.ajax({
        url: '/cart/queryCartPaging',
        data: {
          page: page,
          pageSize: pageSize
        },
        success: function (res) {
          var tmp = template('tmp', res)
          $('#main .mui-table-view').html(tmp)
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
          mui('#refreshContainer').pullRefresh().refresh(true)
        }
      })
    }, 500);
  }
  /**
   * 上拉加载具体业务实现
   */
  function pullupRefresh() {
    page++
    setTimeout(function () {
      $.ajax({
        url: '/cart/queryCartPaging',
        data: {
          page: page,
          pageSize: pageSize
        },
        success: function (res) {
          console.log(res.data);
          if (res.data) {
            var tmp = template('tmp', res)
            $('#main .mui-table-view').append(tmp)
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
          } else {
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
          }
        }
      })
    }, 500);
  }

})

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
