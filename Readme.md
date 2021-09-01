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



## Lesson3

**Goal: use javascript to scale the scene**

- let make `translate` arguments `x` and `y` dynamic with a [spread opeator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

````
// define an array [x, y]
const center = [50, 50]

// and provide using spread opeator
ctx.translate(...center)

````

- for an array of array it would work like that:

````
const centers = [[50, 50], [150, 50], [250, 50]]
for(j in centers){
    const center = centers[j]
    ctx.translate(...center)
}

````

- you can also create it dynamically with a [map](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function

```
// equal to [[50, 50], [150, 50], [250, 50]]
[...Array(3).keys()].map(key => [50 * (2*key + 1), 50])
```

- you can even build upon it an extended array 

```
    const centers = [...Array(3).keys()].map(key => [50 * (2*key + 1), 50)

    const moreCenters = [
        ...centers,
        ...centers.map(([x, y]) => [x, y+100]),
        ...centers.map(([x, y]) => [x, y+200]),
    ]


```


### Tasks

- draw multple circles using array of `[x, y]` coordinates
- draw a smily curve on each second circle using [ctx.quadraticCurveTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo)



## Lesson 4

**Goal: Use browser events to make a drawing more interactive **

- `canvas` like every other html element can listen for a bunch of events that are out there, for example mouse movements. To make our `canvas` element listen for it, we can define the following expression:


```
canvas.addEventListener('mousemove', event => {
    // do smth with the event
    console.log(e)
})
```


- in order to be able to do smth with this `event` somewhere else in our code, we will need to store events values we need. To do that, we can use a global object:

```
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

```


### Task

- let a smile react to position of mouse on `y` axis.