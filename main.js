
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

function getDistance(x1, y1, x2, y2) {
   let xDistance = x2 - x1;
   let yDistance = y2 - y1;
   let Distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

   return Distance;
}


// Implementation
let particles

function init() {
  particles = []
  for (let i = 0; i < 400; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let radius = 10;
    let color = 'blue'

    // to find out if the particles initially overlap
    if(i !== 0) {
      // comparing aparticles placement with the others
      for(let j = 0; j < particles.length; j++){
        if(getDistance(x, y, particles[j].x, particles[j].y) - radius*2 < 0) {
          x = Math.random() * innerWidth;
          y = Math.random() * innerHeight;

          // resets the loop by 1 literal
          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, color))
  }
  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  
  particles.forEach(particle => {
   particle.update()
  })
}

init()
animate()