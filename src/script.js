const canvas = document.getElementById('exercise_2')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')


const MouseCoord = {
    offsetX: null, 
    offsetY: null,
    set: function({offsetX, offsetY}){
        this.offsetX = offsetX
        this.offsetY = offsetY
    }
}
canvas.addEventListener('mousemove', event => {
    MouseCoord.set(event)
})


function drawEyesAndSmiles () {

    const centers = [...Array(6).keys()].map(key => [50 * (2*key + 1), 50])
    
    draw(0, [
        ...centers,
        ...centers.map(([x, y]) => [x, y + 100]),
        ...centers.map(([x, y]) => [x, y + 200]),
        ...centers.map(([x, y]) => [x, y + 300]),
        ...centers.map(([x, y]) => [x, y + 400]),
    ])

}

function draw(i, centers) {

    // schedule next draw call
    window.requestAnimationFrame(() => draw(i+1, centers))
    // cleanup 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for(j in centers) {
        const center = centers[j]

         // define light power
         const lightPower1 = 255 * Math.abs(Math.sin(( (1 - j/centers.length) * i)/100))
         const lightPower2 = 255 * Math.abs(Math.cos(( j/centers.length * i)/100))
        // remember context 
        ctx.save()

        // define a new center
        ctx.translate(...center)

        // draw a circle
        ctx.beginPath()
        ctx.arc(0, 0, 25, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${255 - lightPower2},  ${lightPower2}, ${lightPower1})`
        ctx.fill()

        // rotate context and draw a circle
        ctx.rotate(Math.PI/50 * i)    
        ctx.translate(10, 10)

        ctx.beginPath()
        ctx.arc(0, 0, 5, 0, Math.PI * 2)

       
        ctx.fillStyle = `rgb(${255}, ${lightPower1}, ${lightPower2})`


        ctx.fill()

        // restore context
        ctx.restore()

        if(j%2 == 0) {

            const [fromX, fromY] = [center[0], center[1] + 50]
            const [toX, toY] = [center[0]+100, center[1] + 50]
            const [cpX, cpY] = [center[0] + 50, center[1] + 100]

            const {offsetY} = MouseCoord
            const cpYmax = cpY
            const cpYmin = cpY - 100
            const _cpY = offsetY > cpYmax 
            ? cpYmax
            : offsetY < cpYmin 
                ? cpYmin
                : offsetY

            ctx.beginPath()
            ctx.moveTo(fromX, fromY)
            ctx.quadraticCurveTo(cpX, _cpY, toX, toY)
            ctx.lineWidth = 10
            ctx.strokeStyle = `rgb(${255 - lightPower2}, ${lightPower1}, ${lightPower2})`

            ctx.stroke()

        }   
    }

    
    
}

drawEyesAndSmiles(0)