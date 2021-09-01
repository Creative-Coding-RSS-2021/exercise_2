# Exercise 2. Interactive Animation

## Lesson 1

**Goal: to get to know how to animate things**

First things first: take a look at basic examples in [Basic animations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations) tutorial.

To get first filling of how it works, pack your drawing routine in a function and call it by itself ([recursively](https://en.wikipedia.org/wiki/Recursion)) by some period of time using [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) function.

````
// ... ctx initiation

function draw() {

    ctx.translate(10, 10)
    
    ctx.beginPath()
    ctx.arc(10, 10, 5, 0, Math.PI * 2)
    ctx.fill()

    setTimeout(draw, 1000)
}

draw()
`````


### Task
- make a moving point single, so you are not see any previous points rendered before. take a look at [clearRect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect) function
- try to make is smoother and play with timeout time and `translate` arguments
- try to exchange `setTimeout` through [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)



## Lesson 2

**Goal: to get to know how to animate multiple things at once**


- In order to do more complex animations you will need to [save](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save)/[restore](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore) your current drawing state.

    let's see a basic example with [rotate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate) function:

````
function draw(i = 0) {
    ...
    
    // remember context state
    ctx.save()

    // define a new center
    ctx.translate(50, 50)

    // rotate context and draw a circle
    ctx.rotate(Math.PI/50 * i)        
    ctx.beginPath()
    ctx.arc(10, 10, 5, 0, Math.PI * 2)
    ctx.fill()

    //restore context state
    ctx.restore()

    // call next draw 
    requestAnimationFrame(() => draw(i+1))

}
`````


- since we provide a `draw` function each time a new value of `i` argument, we can also use it to animate another things. 

    we will use [Modulo(Reminder) Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) to animate color

````
...
 ctx.beginPath()
 ctx.arc(10, 10, 5, 0, Math.PI * 2)
 cty.fillStyle = `rgb(255, ${i%255}, ${1 - i%255})`
 ctx.fill()

````


### Tasks
- draw a circle stoke, so that rotating circle runs exactly around it
- try `Math.sin` and `Math.cos` for color manipulation
