document.addEventListener("DOMContentLoaded", function() {
  Barba.Pjax.start()

  const hideShowTransition = Barba.BaseTransition.extend({
    start() {
      clearCanvas()
      this.newContainerLoading.then(this.finish.bind(this))
    },

    finish() {
      document.body.scrollTop = 0
      render()
      this.done()
    }
  })

  Barba.Pjax.getTransition = () => hideShowTransition
})


