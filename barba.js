document.addEventListener("DOMContentLoaded", function() {
  const Home = Barba.BaseView.extend({
    namespace: 'home',
    onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log('entrou na home');
      render()
    },
    onEnterCompleted: function() {
      // The Transition has just finished.
      console.log('entrou e completou na home');
    },
    onLeave: function() {
      // A new Transition toward a new page has just started.
      console.log('partiu da home');
      clearCanvas()
    },
    onLeaveCompleted: function() {
      // The Container has just been removed from the DOM.
      console.log('partiu e nunca mais voltou da home');
    }
  })

  Home.init()

  const About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log('entrou na about');
    },
    onEnterCompleted: function() {
      // The Transition has just finished.
      console.log('entrou e completou na about');
    },
    onLeave: function() {
      // A new Transition toward a new page has just started.
      console.log('partiu da about');
    },
    onLeaveCompleted: function() {
      // The Container has just been removed from the DOM.
      console.log('partiu e nunca mais voltou da about');
    }
  })

  About.init()

  Barba.Pjax.start()
  Barba.Prefetch.init()
})

