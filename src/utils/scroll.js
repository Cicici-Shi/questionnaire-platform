export function scrollToBottom (el) {
  const container = document.getElementById('chatContainer')
  if (!el) {
    el = container
  }
  //原始值
  let startTop = el.scrollTop
  console.log("startTop : ",startTop)
  //最终值
  let endTop = el.scrollHeight - el.clientHeight
  console.log("endTop : ",endTop)
  //生成一个动画控制函数
  let scrollAnimationFn = doAnimation(startTop, endTop, 300, el)
  //执行动画，每10ms执行一次
  let interval = setInterval(() => {
    scrollAnimationFn(interval)
  }, 10)
}

function doAnimation (startValue, endValue, duration, el) {
  //使用闭包保存变量dy和step(每次动画滚动的距离)
  let dy = 0
  let step = (endValue - startValue) / (duration / 10)
  //返回动画控制函数
  return function (interval) {
    dy += step
    if (dy >= endValue - startValue) {
      clearInterval(interval)
    }
    el.scrollTop += step
  }
}
