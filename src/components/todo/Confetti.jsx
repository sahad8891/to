import React, { useEffect } from 'react'

export default function Confetti({ active }) {
  useEffect(() => {
    if (!active) return
    // simple JS confetti using DOM canvas
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = 9999
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const pieces = []
    const colors = ['#ff6b6b', '#ffd93d', '#6bffb8', '#6bc1ff', '#c56bff']
    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: 6 + Math.random() * 8,
        dx: (Math.random() - 0.5) * 6,
        dy: 2 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI
      })
    }
    let raf = null
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pieces) {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
        ctx.restore()
        p.x += p.dx
        p.y += p.dy
        p.rot += 0.05
        if (p.y > canvas.height + 20) {
          p.y = -40
          p.x = Math.random() * canvas.width
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // stop after 4s
    const t = setTimeout(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.body.removeChild(canvas)
    }, 4000)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      if (canvas.parentNode) document.body.removeChild(canvas)
    }
  }, [active])

  return null
}
