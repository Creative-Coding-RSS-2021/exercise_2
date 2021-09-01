const canvas = document.getElementById('exercise_2')
const ctx = canvas.getContext('2d')



function draw(i) {

    // schedule next draw call
    window.requestAnimationFrame(() => draw(i+1))
    // cleanup 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // remember context 
    ctx.save()

    // define a new center
    ctx.translate(50, 50)

    // draw a circle stroke
    ctx.beginPath()
    ctx.arc(0, 0, 25, 0, Math.PI * 2)
    ctx.stroke()
    
    // rotate context and draw a circle
    ctx.rotate(Math.PI/50 * i)    
    ctx.translate(10, 10)
    
    ctx.beginPath()
    ctx.arc(0, 0, 5, 0, Math.PI * 2)
    
    // define light power
    const lightPower1 = 255 * Math.abs(Math.sin(i/100))
    const lightPower2 = 255 * Math.abs(Math.cos(i/100))
    ctx.fillStyle = `rgb(${255 - lightPower2}, ${lightPower1}, ${lightPower2})`
    

    ctx.fill()

    
    // restore context
    ctx.restore()
    
}

draw(0)