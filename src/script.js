const canvas = document.getElementById('exercise_2')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')


/*****   lesson 1   ******/

function line(x = 0, y = 0) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += 0.1
    y += 0.1
    ctx.fillStyle = "red";
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()



    //setTimeout(draw, 100)
    requestAnimationFrame(() => line(x + 10, y + 10))
}
//line();


/*****   lesson 2   ******/

function draw(i = 0) {

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // remember context state
    ctx.save()

    // define a new center
    ctx.translate(50, 50)

    //circle stroke
    ctx.beginPath()
    ctx.arc(0, 0, 25, 0, Math.PI * 2)


    ctx.stroke()

    // rotate context and draw a circle
    ctx.rotate(Math.PI / 50 * i)
    ctx.beginPath()
    ctx.arc(10, 10, 5, 0, Math.PI * 2)
    ctx.fillStyle = `rgb(${100},${Math.abs(Math.sin(i/100)*255)},${Math.abs(Math.cos(i/100)*255)})`
    ctx.fill()

    //restore context state
    ctx.restore()

    // call next draw 
    requestAnimationFrame(() => draw(i + 1))

}
//draw()


/*****   moving block   ******/
class Block {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.start();

        // Add event listener on keypress
        document.addEventListener('keypress', (event) => {
            var name = event.key;
            //console.log('key pressed', name)

            switch (name) {
                case "w":
                    this.y -= 10
                    if (this.y <= 0) this.y = 0
                    break;

                case "a":
                    this.x -= 10
                    if (this.x <= 0) this.x = 0
                    break;

                case "s":
                    this.y += 10
                    if (this.y + 50 >= canvas.height) this.y = canvas.height - 50
                    break;

                case "d":
                    this.x += 10
                    if (this.x + 50 >= canvas.width) this.x = canvas.width - 50
                    break
            }


        }, false);

    }


    start() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.beginPath()
        var w = (canvas.width - 50) / 255;
        var h = (canvas.height - 50) / 255;
        ctx.fillStyle = `rgb(0,${this.y/h},${this.x/w})`
        ctx.rect(this.x, this.y, 50, 50)
        ctx.fill()

        window.requestAnimationFrame(() => this.start())
    }

}

let player = new Block(100, 100);