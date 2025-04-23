<template>
  <div class="loading-wrapper">
    <div class="particle-container">
      <div
          v-for="(particle, index) in particles"
          :key="index"
          :style="getParticleStyle(particle)"
          class="particle">
        <img :alt="'particle-' + index" :src="particle.image">
      </div>
    </div>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
      <span class="ma-shan-zheng-regular loading-text translate-x-[-10%]">少女洗牌中...</span>
      <span class="ma-shan-zheng-regular loading-text-sub text-secondary ">Now loading...</span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'

const images = [
  '/assets/images/particle1.png',
  '/assets/images/particle2.png',
  '/assets/images/particle3.png',
  '/assets/images/particle4.png',
]

class Particle {
  constructor() {
    this.x = Math.random() * 100 // percentage
    this.y = Math.random() * 100 // percentage
    this.size = 20 + Math.random() * 10 // Reduced size range
    this.velocity = 0.15 + Math.random() * 0.2 // Reduced vertical speed
    this.Xvelocity = 0.1 - Math.random() * 0.12 // Reduced horizontal speed
    this.rotationX = 0
    this.rotationY = 0
    this.rotationZ = Math.random() * 2 * Math.PI
    this.rotationSpeedX = Math.max(0.1, Math.random()) * 0.02 // Reduced rotation speed
    this.rotationSpeedY = Math.max(0.1, Math.random()) * 0.02
    this.rotationSpeedZ = Math.max(0.1, Math.random()) * 0.02
    this.initialRotationAccY = 0.0002 * (Math.max(0.1, Math.random()) - 0.5) // Reduced acceleration
    this.initialRotationAccZ = 0.0002 * (Math.max(0.1, Math.random()) - 0.5)
    this.period = 60 + Math.random() * 50 // Increased period for slower oscillation
    this.rotationAccY =
        this.rotationAccZ =
            this.frame = 0
    this.opacity = 1
    this.fadeInSpeed = 0.005 + Math.random() * 0.01 // Reduced fade speed
    this.fadeOutSpeed = 0.005 + Math.random() * 0.01
    this.image = images[Math.floor(Math.random() * images.length)]
    this.maskStrength = 20 + Math.random() * 10
    this.maskPower = 4 + Math.random() * 5
    this.weakness = 1.5 + Math.random()
  }

  update() {
    this.y += this.velocity
    this.x += this.Xvelocity
    this.frame++

    const shouldNegative = Math.floor(this.frame / this.period) % 2 === 1 ? 1 : -1

    this.rotationAccY = this.initialRotationAccY * shouldNegative
    this.rotationAccZ = this.initialRotationAccZ * shouldNegative

    this.rotationSpeedY += this.rotationAccY
    this.rotationSpeedZ += this.rotationAccZ

    this.rotationX += this.rotationSpeedX
    this.rotationY += this.rotationSpeedY
    this.rotationZ += this.rotationSpeedZ

    // Reset particle when it goes off screen
    if (this.y > 100) {
      this.y = -20
      this.x = Math.random() * 100
      this.image = images[Math.floor(Math.random() * images.length)]
      this.opacity = 0
    } else {
      let distanceFromBorder = Math.min(
          this.y,
          100 - this.y,
          this.x,
          100 - this.x
      )
      if (distanceFromBorder < 0) {
        this.opacity = 0
      } else {
        let a = Math.pow(distanceFromBorder / this.maskStrength, this.maskPower)
        this.opacity = Math.min(a, 1) / this.weakness
      }
    }
  }
}

const particles = ref([])

const getParticleStyle = (particle) => {
  return {
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    opacity: particle.opacity,
    transform: `perspective(1000px) 
                rotateX(${particle.rotationX}rad) 
                rotateY(${particle.rotationY}rad) 
                rotateZ(${particle.rotationZ}rad)`
  }
}

let animationFrameId = null

const animate = () => {
  particles.value.forEach(particle => particle.update())
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  particles.value = Array.from({length: 35}, () => new Particle())
  animate()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style lang="postcss" scoped>
.loading-wrapper {
  @apply fixed right-[-20px] sm:right-0 md:right-6 bottom-0 w-[400px] h-[250px] z-[999] pointer-events-none;
}

.particle-container {
  @apply w-full h-full;
  position: relative;
  overflow: hidden;
  perspective: 200px;
}

.particle {
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform, opacity;
}

.particle img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-style: preserve-3d;
}

.loading-text {
  @apply text-[40px] text-white;
  text-shadow: 1px 1px black,
  -1px 1px black,
  1px -1px black,
  -1px -1px black,
  1px 0px black,
  0px 1px black,
  1px 1px 5px black;
  animation: slow-blink 1s linear infinite;
}

@keyframes slow-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.loading-text-sub {
  @apply absolute top-[54%] right-[14%] text-[30px];
  text-shadow: 1px 1px black,
  -1px 1px black,
  1px -1px black,
  -1px -1px black,
  1px 0px black,
  0px 1px black,
  1px 1px 5px black;
}

/* Transition styles */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
