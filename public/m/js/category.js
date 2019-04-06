$(function () {
  var letao = new Letao()
  letao.initLeft()
  letao.initRight()
  letao.getRight()
  letao.getLeft()
})
var Letao = function () {}
Letao.prototype = {
  current: 1,
  initLeft() {
    mui('.category-left .mui-scroll-wrapper').scroll({
      indicators: false,
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  initRight() {
    mui('.category-right .mui-scroll-wrapper').scroll({
      indicators: true,
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  getLeft() {
    var _this = this;
    $.ajax({
      url: '/category/queryTopCategory',
      success: function (res) {
        var tmpLeft = template('tpl-left', res)
        $('.category-left .mui-table-view').html(tmpLeft)
        $('.category-left-list').on('click', function () {
          // var id = $(this).attr('data-id')
          // var id = $(this).data('id')
          _this.current = this.dataset['id']
          _this.getRight()
          $(this).addClass('active').siblings().removeClass('active')
        })
      }
    })
  },
  getRight() {
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: this.current
      },
      success: function (res) {
        var tmpRight = template('tpl-right', res)
        $('.category-right .mui-row').html(tmpRight)
      }
    })
  }
}
