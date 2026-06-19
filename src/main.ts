import './style.css'

type Track = {
  title: string
  subtitle: string
  src: string
  place: string
}

type Memory = {
  title: string
  place: string
  src: string
  note: string
}

const photos = {
  plane:
    'https://images.unsplash.com/photo-1668384263967-61ddbcd0d7bc?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
  highway:
    'https://images.unsplash.com/photo-1633281027483-21242b0f214b?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
  airport:
    'https://images.unsplash.com/photo-1757206637677-330df0d7dfe8?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
  tokyo:
    'https://images.unsplash.com/photo-1718969094833-8d44d9b818e5?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
  tower:
    'https://images.unsplash.com/photo-1731576974771-09de7ab4f6aa?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
  terminal:
    'https://images.unsplash.com/photo-1746801893410-45fd994a07fe?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600',
}

const tracks: Track[] = [
  {
    title: 'between cities',
    subtitle: 'made after a conversation i could not forget',
    src: '/assets/between-cities.mp3',
    place: '03:12 / demo archive',
  },
  {
    title: 'static memories',
    subtitle: 'for people who miss things they never had',
    src: '/assets/static-memories.mp3',
    place: '02:01 / room take',
  },
]

const memories: Memory[] = [
  {
    title: 'postcards',
    place: 'airport / 05:46',
    src: photos.plane,
    note: 'if sunsets had a sound',
  },
  {
    title: 'motion blur',
    place: 'i-10 / 19:12',
    src: photos.highway,
    note: 'songs for the drive home',
  },
  {
    title: 'neon rain',
    place: 'tokyo / 00:31',
    src: photos.tokyo,
    note: 'the city keeps the secrets',
  },
  {
    title: 'summer archive',
    place: 'terminal b / 06:03',
    src: photos.airport,
    note: 'everywhere reminds me of something',
  },
  {
    title: 'afterglow',
    place: 'minato / 02:44',
    src: photos.tower,
    note: 'this one belongs somewhere between midnight and sunrise',
  },
]

const shows = [
  ['jul 18', 'secret courtyard', 'los angeles'],
  ['aug 02', 'warehouse room 2', 'brooklyn'],
  ['sep 14', 'sunset listening party', 'goa'],
  ['oct 04', 'label scout private set', 'london'],
]

const socials = [
  ['instagram', 'film rolls, lyric scraps, crowd shadows'],
  ['tiktok', 'unfinished demos, voice notes, half-lit rooms'],
  ['youtube', 'visualizers, mini-docs, live archive'],
  ['spotify canvas', 'looped roads, rain glass, soft static'],
  ['merch', 'washed cotton, road-stamp typography, no logos yelling'],
]

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="grain" aria-hidden="true"></div>
  <div class="scanline" aria-hidden="true"></div>
  <div class="cursor" aria-hidden="true"></div>

  <header class="site-header">
    <a class="brand" href="#home" aria-label="2wenzy home">
      <img src="/assets/2wenzy-logo.png" alt="2wenzy music" />
    </a>
    <nav aria-label="primary">
      <a href="#music">music</a>
      <a href="#live">live</a>
      <a href="#journal">journal</a>
      <a href="#visuals">visuals</a>
      <a href="#about">about</a>
    </nav>
    <a class="header-link" href="#newsletter">newsletter</a>
  </header>

  <main>
    <section class="hero" id="home" data-reveal>
      <div class="hero-copy">
        <p class="tiny">2wenzy / memory collector</p>
        <h1 data-glitch="songs for the drive home">songs for the drive home</h1>
        <p class="hero-line">everywhere reminds me of something</p>
      </div>

      <div class="memory-stage" aria-label="cinematic memory collage">
        <figure class="scene scene-a" style="--photo: url('${photos.highway}')">
          <figcaption>i-10 / 19:12</figcaption>
        </figure>
        <figure class="scene scene-b" style="--photo: url('${photos.tokyo}')">
          <figcaption>tokyo / rain</figcaption>
        </figure>
        <figure class="scene scene-c" style="--photo: url('${photos.plane}')">
          <figcaption>window seat</figcaption>
        </figure>
        <img class="stage-logo" src="/assets/2wenzy-logo.png" alt="" />
        <canvas class="hero-wave" width="620" height="160" aria-hidden="true"></canvas>
      </div>

      <div class="hero-actions">
        <button class="primary-action" data-play-track="0" type="button">
          <span>listen</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <a class="ghost-action" href="#journal">enter the archive</a>
      </div>
    </section>

    <section class="section music-section" id="music" data-reveal>
      <div class="section-heading">
        <p class="tiny">music</p>
        <h2>this one belongs somewhere between midnight and sunrise</h2>
      </div>
      <div class="player-shell">
        <div class="player-meta">
          <p class="now-label">now holding</p>
          <h3 id="activeTrack">${tracks[0].title}</h3>
          <p id="activeSubtitle">${tracks[0].subtitle}</p>
        </div>
        <canvas id="waveform" width="920" height="260" aria-label="audio waveform"></canvas>
        <div class="track-list">
          ${tracks
            .map(
              (track, index) => `
                <button class="track-row ${index === 0 ? 'is-active' : ''}" data-play-track="${index}" type="button">
                  <span class="track-index">${String(index + 1).padStart(2, '0')}</span>
                  <span>
                    <strong>${track.title}</strong>
                    <small>${track.subtitle}</small>
                  </span>
                  <em>${track.place}</em>
                </button>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section live-section" id="live" data-reveal>
      <div class="section-heading">
        <p class="tiny">live</p>
        <h2>small rooms, big feelings, no spectacle without soul</h2>
      </div>
      <div class="show-list">
        ${shows
          .map(
            ([date, venue, city]) => `
              <a class="show-row" href="mailto:booking@2wenzy.com?subject=2wenzy%20${encodeURIComponent(city)}">
                <span>${date}</span>
                <strong>${venue}</strong>
                <em>${city}</em>
              </a>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="section journal-section" id="journal" data-reveal>
      <div class="section-heading">
        <p class="tiny">journal</p>
        <h2>not content. evidence.</h2>
      </div>
      <div class="archive-rail" aria-label="horizontal visual journal">
        ${memories
          .map(
            (memory, index) => `
              <article class="memory" style="--photo: url('${memory.src}'); --tilt: ${index % 2 === 0 ? '-1.5deg' : '1.2deg'}">
                <div class="memory-photo"></div>
                <p>${memory.place}</p>
                <h3>${memory.title}</h3>
                <small>${memory.note}</small>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="section visuals-section" id="visuals" data-reveal>
      <div class="section-heading">
        <p class="tiny">visuals</p>
        <h2>a social system that looks like a life, not a funnel</h2>
      </div>
      <div class="system-board">
        ${socials
          .map(
            ([channel, rule], index) => `
              <div class="system-line" style="--delay: ${index * 70}ms">
                <span>${channel}</span>
                <p>${rule}</p>
              </div>
            `,
          )
          .join('')}
      </div>
      <div class="merch-language">
        <span>washed black tee / burnt orange stitch</span>
        <span>postcard zine / static memories</span>
        <span>cassette usb / summer archive</span>
      </div>
    </section>

    <section class="section about-section" id="about" data-reveal>
      <div class="about-image" style="--photo: url('${photos.terminal}')"></div>
      <div class="manifesto">
        <p class="tiny">about</p>
        <h2>the machine asks for output. the body remembers weather.</h2>
        <p>2wenzy makes electronic songs like found photographs: scratched, warm, unstable, alive. the project lives between late-night drives, unfinished messages, deep house catharsis, bloghouse dirt, and the question nobody can automate cleanly.</p>
        <blockquote id="manifestoLine">what makes us beautiful?</blockquote>
      </div>
    </section>

    <section class="section newsletter-section" id="newsletter" data-reveal>
      <div>
        <p class="tiny">newsletter</p>
        <h2>send me the demos before they become memories</h2>
      </div>
      <form class="newsletter-form">
        <label for="email">email</label>
        <div>
          <input id="email" type="email" placeholder="you@afterglow.com" required />
          <button type="submit">join</button>
        </div>
        <p class="form-note" role="status"></p>
      </form>
    </section>
  </main>

  <footer>
    <span>2wenzy</span>
    <span>afterglow / motion blur / postcards / forever, maybe</span>
    <a href="mailto:hello@2wenzy.com">hello@2wenzy.com</a>
  </footer>

  <audio id="audio" preload="metadata" src="${tracks[0].src}"></audio>
`

const root = document.documentElement
const cursor = document.querySelector<HTMLDivElement>('.cursor')
const stage = document.querySelector<HTMLDivElement>('.memory-stage')
const audio = document.querySelector<HTMLAudioElement>('#audio')!
const waveform = document.querySelector<HTMLCanvasElement>('#waveform')!
const heroWave = document.querySelector<HTMLCanvasElement>('.hero-wave')!
const activeTrack = document.querySelector<HTMLHeadingElement>('#activeTrack')!
const activeSubtitle = document.querySelector<HTMLParagraphElement>('#activeSubtitle')!
const trackButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-play-track]'))
const archiveRail = document.querySelector<HTMLDivElement>('.archive-rail')!
const manifestoLine = document.querySelector<HTMLElement>('#manifestoLine')!

let audioContext: AudioContext | undefined
let analyser: AnalyserNode | undefined
let activeIndex = 0
let isPlaying = false
let fallbackPhase = 0

function initAudioGraph() {
  if (audioContext) return

  audioContext = new AudioContext()
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 256

  const source = audioContext.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioContext.destination)
}

async function playTrack(index: number) {
  const track = tracks[index]
  const shouldSwitch = activeIndex !== index

  initAudioGraph()
  await audioContext?.resume()

  if (shouldSwitch) {
    activeIndex = index
    audio.src = track.src
  }

  if (!isPlaying || shouldSwitch) {
    await audio.play()
    isPlaying = true
  } else {
    audio.pause()
    isPlaying = false
  }

  activeTrack.textContent = track.title
  activeSubtitle.textContent = track.subtitle

  trackButtons.forEach((button) => {
    const buttonIndex = Number(button.dataset.playTrack)
    button.classList.toggle('is-active', buttonIndex === activeIndex)
    button.classList.toggle('is-playing', buttonIndex === activeIndex && isPlaying)
    if (button.classList.contains('primary-action')) {
      button.querySelector('span')!.textContent = isPlaying ? 'pause' : 'listen'
    }
  })
}

function drawWave(canvas: HTMLCanvasElement, quiet = false) {
  const context = canvas.getContext('2d')!
  const width = canvas.width
  const height = canvas.height
  const bars = 96
  const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : undefined

  if (analyser && data && isPlaying) {
    analyser.getByteFrequencyData(data)
  }

  context.clearRect(0, 0, width, height)
  context.fillStyle = quiet ? 'rgba(232, 214, 188, 0.16)' : 'rgba(232, 214, 188, 0.06)'
  context.fillRect(0, height / 2 - 1, width, 2)

  for (let i = 0; i < bars; i += 1) {
    const datum = data ? data[i % data.length] / 255 : 0
    const idle = Math.sin(fallbackPhase + i * 0.34) * 0.5 + 0.5
    const energy = isPlaying ? datum : idle * 0.42
    const barHeight = Math.max(quiet ? 6 : 12, energy * height * (quiet ? 0.72 : 0.9))
    const x = (i / bars) * width
    const barWidth = width / bars - 4
    const warm = Math.round(154 + energy * 80)
    const cyan = Math.round(112 + energy * 60)

    context.fillStyle = i % 5 === 0 ? `rgba(${warm}, 88, 60, 0.76)` : `rgba(${cyan}, 158, 166, 0.68)`
    context.fillRect(x, height / 2 - barHeight / 2, barWidth, barHeight)
  }

  fallbackPhase += 0.025
  requestAnimationFrame(() => drawWave(canvas, quiet))
}

trackButtons.forEach((button) => {
  button.addEventListener('click', () => {
    void playTrack(Number(button.dataset.playTrack))
  })
})

audio.addEventListener('ended', () => {
  isPlaying = false
  trackButtons.forEach((button) => button.classList.remove('is-playing'))
})

document.addEventListener('pointermove', (event) => {
  cursor?.style.setProperty('--x', `${event.clientX}px`)
  cursor?.style.setProperty('--y', `${event.clientY}px`)

  if (!stage) return
  const bounds = stage.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  stage.style.setProperty('--mx', `${x * 18}px`)
  stage.style.setProperty('--my', `${y * 18}px`)
})

document.addEventListener('pointerdown', () => root.classList.add('is-pressing'))
document.addEventListener('pointerup', () => root.classList.remove('is-pressing'))

archiveRail.addEventListener(
  'wheel',
  (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    archiveRail.scrollLeft += event.deltaY
  },
  { passive: false },
)

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    })
  },
  { threshold: 0.01 },
)

document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
  revealObserver.observe(element)
})

const questions = [
  'what makes us beautiful?',
  'what makes us human?',
  'who owns a memory after it becomes a file?',
  'can a machine miss a place it never left?',
]

let questionIndex = 0
setInterval(() => {
  questionIndex = (questionIndex + 1) % questions.length
  manifestoLine.animate(
    [
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      { opacity: 0, transform: 'translateY(8px)', filter: 'blur(3px)' },
    ],
    { duration: 180, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
  ).onfinish = () => {
    manifestoLine.textContent = questions[questionIndex]
    manifestoLine.animate(
      [
        { opacity: 0, transform: 'translateY(-8px)', filter: 'blur(3px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
      ],
      { duration: 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    )
  }
}, 4200)

document.querySelector<HTMLFormElement>('.newsletter-form')!.addEventListener('submit', (event) => {
  event.preventDefault()
  const note = document.querySelector<HTMLParagraphElement>('.form-note')!
  note.textContent = 'saved to the summer archive.'
})

drawWave(waveform)
drawWave(heroWave, true)
