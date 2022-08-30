//elements

const buttonPlay = document.querySelector('.buttonPlay')
const buttonPause = document.querySelector('.buttonPause')
const buttonStop = document.querySelector('.buttonStop')
const buttonPlus = document.querySelector('.buttonPlus')
const buttonMinus = document.querySelector('.buttonMinus')
const buttonLightTheme = document.querySelector('.lightTheme')
const buttonDarkTheme = document.querySelector('.darkTheme')

const buttonSoundOn = document.querySelector('.sound-on')
const buttonSoundOff = document.querySelector('.sound-off')

const forestCard = document.querySelector('.forest')
const rainCard = document.querySelector('.rain')
const fireCard = document.querySelector('.fire')
const coffeeCard = document.querySelector('.coffee-shop')

const forestButton = forestCard.querySelector('.cardButton')
const rainButton = rainCard.querySelector('.cardButton')
const fireButton = fireCard.querySelector('.cardButton')
const coffeeButton = coffeeCard.querySelector('.cardButton')

const forestVolume = forestCard.querySelector('input')
const rainVolume = rainCard.querySelector('input')
const fireVolume = fireCard.querySelector('input')
const coffeeVolume = coffeeCard.querySelector('input')

const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')


//index
const controls = Controls({
    buttonPlay,
    buttonPause
  })
  
  const timer = Timer({
    minutesDisplay,
    secondsDisplay,
    resetControls: controls.pause
  })
  
  const sounds = Sound()
  
  const theme = Theme()

  const music = Music()


  //theme 

  export default function Theme() {
    function setTheme(themeName) {
      localStorage.setItem('theme', themeName)
      document.documentElement.className = themeName
    }
  
    function toggle(hideButton, showButton) {
      if (localStorage.getItem('theme') === 'theme-dark') {
        showButton.classList.remove('hide')
        hideButton.classList.add('hide')
        setTheme('theme-light')
      } else {
        showButton.classList.remove('hide')
        hideButton.classList.add('hide')
        setTheme('theme-dark')
      }
    }
  
    ;(function () {
      if (localStorage.getItem('theme') === 'theme-dark') {
        buttonLightTheme.classList.remove('hide')
        buttonDarkTheme.classList.add('hide')
        setTheme('theme-light')
      } else {
        buttonDarkTheme.classList.remove('hide')
        buttonLightTheme.classList.add('hide')
        setTheme('theme-dark')
      }
    })()
    return {
      toggle
    }
  }


  //controls 
  function play() {
    hideShowButton(buttonPlay, buttonPause)
  }

  function pause() {
    hideShowButton(buttonPause, buttonPlay)
  }

  function toggle(card) {
    card.classList.toggle('active')
  }


// audios 

const kitchenTimerAudio = new Audio(
    'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true'
  )
  const buttonPressAudio = new Audio(
    'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true'
  )
  const forestAudio = new Audio('./sounds/Floresta.wav')
  const coffeeAudio = new Audio('./sounds/Cafeteria.wav')
  const rainAudio = new Audio('./sounds/Chuva.wav')
  const fireAudio = new Audio('./sounds/Lareira.wav')

  buttonPressAudio.volume = 0.02
  kitchenTimerAudio.volume = 0.05

  function pressButton(button) {
    button.play()
  }

  function timeEnd() {
    pressButton(kitchenTimerAudio)
  }

  function playAudio(sound, card) {
    sound.loop = true
    let isActive = card.classList.contains('active')
    isActive === false ? sound.pause() : sound.play()
  }

  function adjustVolume(sound, volume) {
    sound.volume = volume
  }

  
  //const buttonSoundOn = new Audio ('./sounds/audios_bg-audio.mp3')
  //buttonSoundOn.loop = true

//funções

let timerTimeOut
  let minutes = Number(minutesDisplay.textContent)

  function updateDisplay(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes
    seconds = seconds === undefined ? 0 : seconds
    minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
    secondsDisplay.textContent = String(seconds).padStart(2, '0')
  }

  function countdown() {
    timerTimeOut = setTimeout(function () {
      let seconds = Number(secondsDisplay.textContent)
      let minutes = Number(minutesDisplay.textContent)
      let isFinished = minutes <= 0 && seconds <= 0

      updateDisplay(minutes, 0)

      if (isFinished) {
        timeEnd()
        resetControls()
        updateDisplay()
        return
      }

      if (seconds <= 0) {
        seconds = 60
        --minutes
      }
      --seconds

      updateDisplay(minutes, seconds)
      countdown()
    }, 1000)
  }

  function plus() {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    if (minutes >= 56) {
      updateDisplay(minutes, seconds)
      return
    } else {
      updateDisplay(String(minutes + 5), seconds)
    }
  }

  function minus() {
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)

    if (minutes > 5) {
      updateDisplay(minutes - 5, seconds)
    } else {
      updateDisplay(minutes, seconds)
    }
  }

  function reset() {
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
  }

  function hold() {
    clearTimeout(timerTimeOut)
  }

/* Buttons de eventos */

  buttonPlay.addEventListener('click', function () {
    sounds.pressButton(sounds.buttonPressAudio)
    controls.play()
    timer.countdown()
  })

  buttonPause.addEventListener('click', function () {
    sounds.pressButton(sounds.buttonPressAudio)
    controls.pause()
    timer.hold()
  })

  buttonStop.addEventListener('click', function () {
    sounds.pressButton(sounds.buttonPressAudio)
    controls.pause()
    timer.reset()
  })

  buttonPlus.addEventListener('click', function () {
    sounds.pressButton(sounds.buttonPressAudio)
    timer.plus()
  })

  buttonMinus.addEventListener('click', function () {
    sounds.pressButton(sounds.buttonPressAudio)
    timer.minus()
  })

  forestButton.addEventListener('click', function () {
    controls.toggle(forestCard)
    sounds.playAudio(sounds.forestAudio, forestCard)
  })

  forestVolume.addEventListener('input', function () {
    sounds.adjustVolume(sounds.forestAudio, forestVolume.value)
  })

  rainButton.addEventListener('click', function () {
    controls.toggle(rainCard)
    sounds.playAudio(sounds.rainAudio, rainCard)
  })

  rainVolume.addEventListener('input', function () {
    sounds.adjustVolume(sounds.rainAudio, rainVolume.value)
  })

  fireButton.addEventListener('click', function () {
    controls.toggle(fireCard)
    sounds.playAudio(sounds.fireAudio, fireCard)
  })

  fireVolume.addEventListener('input', function () {
    sounds.adjustVolume(sounds.fireAudio, fireVolume.value)
  })

  coffeeButton.addEventListener('click', function () {
    controls.toggle(coffeeCard)
    sounds.playAudio(sounds.coffeeAudio, coffeeCard)
  })

  coffeeVolume.addEventListener('input', function () {
    sounds.adjustVolume(sounds.coffeeAudio, coffeeVolume.value)
  })

  buttonLightTheme.addEventListener('click', function () {
    theme.toggle(buttonLightTheme, buttonDarkTheme)
  })

  buttonDarkTheme.addEventListener('click', function () {
    theme.toggle(buttonDarkTheme, buttonLightTheme)
  })


  //music
  //som ligado
buttonSoundOn.addEventListener('click', function () {
    buttonSoundOn.classList.add('hide')
    buttonSoundOff.classList.remove('hide')
    buttonSoundOn.pause()
})

//som desligado
buttonSoundOff.addEventListener('click', function () {
    buttonSoundOn.classList.remove('hide')
    buttonSoundOff.classList.add('hide')
    buttonSoundOn.play()
})
