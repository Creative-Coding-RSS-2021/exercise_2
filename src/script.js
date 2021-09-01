const canvas = document.getElementById('exercise_2')
const ctx = canvas.getContext('2d')



function draw() {

    ctx.translate(10, 10)
    
    ctx.beginPath()
    ctx.arc(10, 10, 5, 0, Math.PI * 2)
    ctx.fill()

    setTimeout(draw, 1000)
}

draw()