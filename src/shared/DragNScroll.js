import React, { useState } from 'react'

/* 
THIS WAS WRITTEN BY GOOGLE AI
https://www.google.com/search?q=react+touch+drag+and+release&sca_esv=b9bb74a202f30561&sca_upv=1&sxsrf=ADLYWIK9jjrBVnTi2qZokk0gy-lBUZcfdg%3A1727578005737&ei=lb_4ZrrhLLbHp84P6N6BqAc&ved=0ahUKEwj6_-nKkeeIAxW248kDHWhvAHUQ4dUDCA8&uact=5&oq=react+touch+drag+and+release&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHJlYWN0IHRvdWNoIGRyYWcgYW5kIHJlbGVhc2UyCBAhGKABGMMESK4_UJcSWKA9cAV4AZABAJgBdKAB5waqAQM2LjO4AQPIAQD4AQGYAg6gAo8HwgIKEAAYsAMY1gQYR8ICChAhGKABGMMEGArCAggQABiiBBiJBcICCBAAGIAEGKIEmAMAiAYBkAYIkgcEMTAuNKAHtBk&sclient=gws-wiz-serp
*/

function DraggableItem() {
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleTouchStart = (event) => {
    setDragging(true)
    const touch = event.touches[0]
    setPosition({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchMove = (event) => {
    if (!dragging) return

    const touch = event.touches[0]
    const deltaX = touch.clientX - position.x
    const deltaY = touch.clientY - position.y

    setPosition({ x: position.x + deltaX, y: position.y + deltaY })
  }

  const handleTouchEnd = () => {
    setDragging(false)
  }

  const style = {
    position: 'absolute',
    left: position.x,
    top: position.y,
  }

  return (
    <div
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      Drag me!
    </div>
  )
}
