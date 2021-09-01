const canvas = document.getElementById('exercise_2')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')


const MouseCoord = {
    offsetX: null, 
    offsetY: null,
    set: function ({offsetX, offsetY}) {
        this.offsetX = offsetX
        this.offsetY = offsetY
    }
}

canvas.addEventListener('mousemove', (event) => {
    
    MouseCoord.set(event)

})


function drawEyesAndSmiles () {


    const centers = [...Array(10).keys()].map(key => [50 * (key*2 + 1), 50])
    draw(0, [
        ...centers,
        ...centers.map(([x, y]) => ([x, y + 150])),
        ...centers.map(([x, y]) => ([x, y + 300])),
        ...centers.map(([x, y]) => ([x, y + 450])),
        ...centers.map(([x, y]) => ([x, y + 600]))
    ])
    
  

}

function draw(i, centers) {

    // schedule next draw call
    window.requestAnimationFrame(() => draw(i+1, centers))
   
    // cleanup 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for(j in centers) {
        const center = centers[j]

        const lightPower1 = Math.abs(Math.sin(i/100)) * 255
        const lightPower2 = Math.abs(Math.cos(i/100)) * 255

        ctx.save()

            ctx.translate(...center)

            ctx.beginPath()
            ctx.arc(0, 0, 30, 0, Math.PI * 2)
            ctx.fillStyle = `rgb(${lightPower1}, ${lightPower2}, ${lightPower1})`
            ctx.fill()

            ctx.rotate(Math.PI/90 * i)
            
            ctx.beginPath()
            ctx.arc(15, 15, 5, 0, Math.PI * 2)
            ctx.fillStyle = `rgb(${lightPower2}, ${lightPower1}, ${lightPower2})`
            ctx.fill()


        ctx.restore()

        if(j%2 == 0) {
            
            const x1 = center[0]
            const y1 = center[1] + 50

            const x2 = center[0] + 100
            const y2 = center[1] + 50

            const cpx = x1 + 50

            const offsetY = MouseCoord.offsetY
            const cpyMax = center[1] + 100
            const cpyMin = center[1]
            
            const cpy = offsetY > cpyMax 
                ? cpyMax
                : offsetY < cpyMin
                    ? cpyMin
                    : offsetY


            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.quadraticCurveTo(cpx, cpy, x2, y2)
            ctx.lineWidth = 10
            ctx.strokeStyle = `rgb(${255 - lightPower2}, ${lightPower1}, ${lightPower2})`
            ctx.stroke()


        }

    }

  
}

drawEyesAndSmiles()