document.addEventListener("DOMContentLoaded", function() {
  const Home = Barba.BaseView.extend({
    namespace: 'home',
    onEnter: function() {
      render()
    },
    onEnterCompleted: function() {

    },
    onLeave: function() {
      clearCanvas()
    },
    onLeaveCompleted: function() {

    }
  })

  Home.init()

  const About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function() {
      
    },
    onEnterCompleted: function() {

    },
    onLeave: function() {

    },
    onLeaveCompleted: function() {

    }
  })

  About.init()

  Barba.Pjax.start()
  Barba.Prefetch.init()
})

