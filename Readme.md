# Exercise 2. Interactive Animation

## Lesson 1

*Goal: to get to know how to animate things 

First things first: take a look at basic examples in [Basic animations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations) tutorial.

To get first filling of how it works, pack your drawing routine in a function and call it by itself ([recursively](https://en.wikipedia.org/wiki/Recursion)) by some period of time like, using [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) function.

````
...

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
- make a moving point single, so you are not see any previous points redered before. take a look at [clearRect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect) function
- try to make is smoother and play with timeout time and `translate` arguments
- try to exchange `setTimeout` through [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)









