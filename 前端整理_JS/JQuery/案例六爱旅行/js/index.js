// 防止变量污染 记得后面的（）
;(function () {

  $('.gotop').hide()
  //1
  $(window).scroll(function(){
    // console.log('scroll')
    let  top=$('html').scrollTop()
    // console.log('top:', top)
    if(top > 200){
      $('.gotop').fadeIn()

    }else{
      $('.gotop').fadeOut()
    }
  })

  // 2.点击返回顶部
  $('.gotop').click(function () {
    $('html').animate({
      scrollTop: 0
    })
  })
  // 意见反馈功能
  // 3.点击展开
  $('.suggest').click(function () {
    $('.sugform').slideDown()
  })
  // 4.点击收起
  $('.close').click(function () {
    $('.sugform').slideUp()
  })
  //自动轮播
  function autoPlay () {
   let $wbdesc= $('.wbdesc')
   //获得最后一个元素
   let $last = $('.wblist').last()

   //将最后一个元神提高最前面
   $wbdesc.prepend($last)
   //获得最后一个元素的整体高度
   //获得高度 计算中总是包含padding-top ,padding-bottom 和 border-top，border-bottom ；如果includeMargin参数是true，那么margin (top 和 bottom)也会被包含。
   let height =$last.outerHeight(true)
   //编写动画并且最后播放
   $wbdesc.css('top',-height)
   $wbdesc.delay(200).animate({ top: 0 }, function () {
      autoPlay()
    })

  }
  autoPlay()
})()
