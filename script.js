const config = {
  container: document.querySelector('.slide-text'),
  words: ["ARCHLINUX", "GENTOO"],
  speed: 100,
  duration: 4000,
  idle: 2000,
}

window.onload = function() {
  // settings
  const NUMBER_OF_SLIDES = 2

  // our canvas container
  const canvasContainer = document.getElementById("canvas")

  // here we will handle which texture is visible and the timer to transition between images
  const slider = {
    activeTexture: 1,
    nextTexture: 1, // this will change only when we will click
    transitionTimer: 0,
    isAnimating: false // flag to know if we are animating
  }

  // set up our WebGL context and append the canvas to our wrapper
  const webGLCurtain = new Curtains("canvas")

  // get our plane element
  const planeElements = document.querySelector(".multi-textures")

  // could be useful to get pixel ratio
  const pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0

  // some basic parameters
  // we don't need to specifiate vertexShaderID and fragmentShaderID because we already passed it via the data attributes of the plane HTML element
  const params = {
    uniforms: {
      resolution: {
        name: "uResolution",
        type: "2f",
        value: [pixelRatio * planeElements.clientWidth, pixelRatio * planeElements.clientHeight],
      },
      transitionTimer: {
        name: "uTransitionTimer",
        type: "1f",
        value: 0,
      },
      activeTexture: {
        name: "uActiveTexture",
        type: "1i", // int
        value: slider.activeTexture,
      },
      nextTexture: {
        name: "uNextTexture",
        type: "1i", // int
        value: slider.nextTexture,
      },
    },
  }

  const multiTexturesPlane = webGLCurtain.addPlane(planeElements, params)

  // create our plane
  multiTexturesPlane
    .onReady(() => {
      multiTexturesPlane.playVideos()

      freakOut(config.words[0], config)

      setInterval(() => {
        if (!slider.isAnimating) {
          slider.nextTexture = ((slider.activeTexture + 1) % NUMBER_OF_SLIDES) || NUMBER_OF_SLIDES
          slider.isAnimating = true

          const word = config.words[slider.nextTexture - 1]
          freakOut(word, config) 
        }

        multiTexturesPlane.uniforms.nextTexture.value = slider.nextTexture
      }, 5000)

      
      // on resize, update the resolution uniform
      window.onresize = function() {
        multiTexturesPlane.uniforms.resolution.value = [pixelRatio * planeElements.clientWidth, pixelRatio * planeElements.clientHeight]
      }
    })
    .onRender(() => {
      // handling the slideshow
      if(slider.isAnimating) {
        // increase timer
        slider.transitionTimer = Math.min(120, slider.transitionTimer + 1);

        // if time is up
        if(slider.transitionTimer >= 120) {
          // stop animation
          slider.isAnimating = false;

          // update the active texture
          slider.activeTexture = slider.nextTexture;

          // update our active texture uniform
          multiTexturesPlane.uniforms.activeTexture.value = slider.activeTexture;

          // reset timer
          slider.transitionTimer = 0;
        }
      }

      // update our transition timer uniform
      multiTexturesPlane.uniforms.transitionTimer.value = slider.transitionTimer;
    })
}

function addAnimationClasses() {

}

function removeAnimationClasses() {

}

function freakOut(word, { container, speed, duration, idle }) {
  return new Promise(resolve => {
    const id = setInterval(() => {
      container.innerHTML = randomize(word)
    }, speed)

    setTimeout(() => {
      clearInterval(id)
      container.innerHTML = word
      
      setTimeout(resolve, idle)
    }, duration - idle)
  })
}

function randomize(word) {
  const letters = word.split('')
  const rand = new Array()
  
  letters.forEach(() => {
    let index = Math.floor(Math.random() * letters.length)

    while (rand.includes(index)) {
      index = (index + 1) % letters.length
    }

    rand.push(index)
  })
  
  return rand
    .map(i => letters[i])
    .join('')
}
