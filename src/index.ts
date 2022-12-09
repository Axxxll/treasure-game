import * as PIXI from "pixi.js"

const Application = PIXI.Application

const app = new Application({
    height: innerHeight,
    width: innerWidth
})

// @ts-ignore
document.body.appendChild(app.view)

const c = new PIXI.Graphics()

const bg = PIXI.Sprite.from('./images/bg.png')
bg.width = app.screen.width
bg.height = app.screen.width / 2
bg.position.y = (innerHeight - bg.height) / 2
app.stage.addChild(bg)

const door = PIXI.Sprite.from('./images/door.png')
door.width = bg.width / 3
door.height = bg.height / 1.65
door.anchor.set(0.5)
door.position.set(innerWidth / 1.96, innerHeight / 2.05)
app.stage.addChild(door)
const handle = PIXI.Sprite.from('./images/handle.png')
handle.anchor.set(0.5, 0.5)
handle.interactive = true
handle.cursor = 'pointer'
handle.on('pointerdown', startGame);

const handleShadow = PIXI.Sprite.from('./images/handleShadow.png')
handleShadow.anchor.set(0.5, 0.5)
handleShadow.position.x += 4
handleShadow.position.y += 20


const container = new PIXI.Container()
container.width = door.width / 10
container.height = container.width
container.addChild(handleShadow)
container.addChild(handle)
app.stage.addChild(container)
container.position.set(innerWidth / 2.019, innerHeight / 2.05)
container.width = 0.0026 * door.width
container.height = 0.011 * door.height

let rotation = {
    left: false,
    right: false,
    leftSpin: false,
    rightSpin: false,
    degrees: 0,
    isAlive: false
}


document.onkeydown = e => {
    switch (e.key) {
        case 'ArrowLeft':
            rotation.degrees -= Math.PI / 3
            if (rotation.isAlive) {
                renderGame('ArrowLeft')
            }
            break
        case 'ArrowRight':
            rotation.degrees += Math.PI / 3
            if (rotation.isAlive) {
                renderGame('ArrowRight')
            }
            break
    }
}

const blurFilter = new PIXI.filters.BlurFilter()
blurFilter.blur = 0



app.ticker.add(animate)
function animate() {
    // Animating the handle spinnig wildly
    if (rotation.leftSpin) {
        handle.rotation -= Math.PI / 12
        handleShadow.rotation -= Math.PI / 12
        rotation.degrees -= Math.PI / 12
    }
    if (rotation.rightSpin) {
        blurFilter.blur += 0.03
        handle.filters = [blurFilter]
        handleShadow.filters = [blurFilter]
        handle.rotation += Math.PI / 6
        handleShadow.rotation += Math.PI / 6
        rotation.degrees += Math.PI / 6
    }

    // Logic for tha player to be able to rotate the handle
    if (handle.rotation == 1.3877787807814457e-16 || handle.rotation == -1.3877787807814457e-16 || handle.rotation == -0.0698131700797731 || handle.rotation == 0.0698131700797731) {
        handle.rotation = 0
        handleShadow.rotation = 0
    }
    if (rotation.degrees === -4.440892098500626e-16 || rotation.degrees === 4.440892098500626e-16) {
        rotation.degrees = 0
    }
    if (rotation.left && rotation.right) {
        handle.rotation = rotation.degrees
        handleShadow.rotation = rotation.degrees
    }
    if (rotation.left) {
        handle.rotation -= Math.PI / 30
        handleShadow.rotation -= Math.PI / 30
    }
    if (rotation.right) {
        handle.rotation += Math.PI / 30
        handleShadow.rotation += Math.PI / 30
    }
    if (rotation.degrees.toPrecision(3) === handle.rotation.toPrecision(3)) {
        rotation.left = false
        rotation.right = false
    }
    else if (rotation.degrees < handle.rotation) {
        rotation.left = true
    }
    else if (rotation.degrees > handle.rotation) {
        rotation.right = true
    }

}


class Cipher {
    number: number;
    direction: string;
    originalNumber: number;
    constructor() {
        this.number = Math.floor((Math.random() * 9) + 1)
        this.direction = this.generateDirection()
        this.originalNumber = this.number
    }
    generateDirection() {
        const num = Math.random() - 0.5
        if (num < 0) {
            return 'ArrowLeft'
        }
        else {
            return 'ArrowRight'
        }
    }
}

let cipherArray: any[] = []
let index = 0

function startGame() {
    spin()
    cipherArray = []
    for (let i = 0; i < 3; i++) {
        cipherArray.push(new Cipher)
    }
    rotation.isAlive = true
    index = 0
    drawCircleCipher(cipherArray[index].originalNumber)
    renderGame(null)
}


function renderGame(direction: string | null) {
    if (direction) {
        if (cipherArray[index].direction === direction) {
            cipherArray[index].number -= 1
            console.log(cipherArray[index])
            if (cipherArray[index].number === 0) {
                index++
                console.log(cipherArray[index])
                if (index === cipherArray.length) {
                    console.log('You win')
                }
                else {
                    drawCircleCipher(cipherArray[index].originalNumber)
                }
            }
        }
        else {
            console.log('Wrong direction. You are out')
            rotation.isAlive = false
            spin()
        }
    }
    else {
        console.log(cipherArray[index])
    }
}

function spin() {
    rotation.leftSpin = true
    setTimeout(() => {
        rotation.leftSpin = false
        setTimeout(() => {
            rotation.rightSpin = true
            setTimeout(() => {
                rotation.rightSpin = false
                handle.rotation = 0
                handleShadow.rotation = 0
                rotation.degrees = 0
                blurFilter.blur = 0
            }, 1300)
        }, 100)
    }, 1000)
}


function drawCircleCipher(position: number) {
    c.clear()
    switch (position) {
        case 1:
            c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.4, innerHeight / 2.03, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 2: c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.3, innerHeight / 2.03, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 3: c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.2, innerHeight / 2.03, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 4:
            c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.4, innerHeight / 1.97, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 5:
            c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.3, innerHeight / 1.97, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 6: c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.2, innerHeight / 1.97, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 7: c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.4, innerHeight / 1.91, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 8: c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.3, innerHeight / 1.91, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
        case 9: c.lineStyle(3, 0x8B0000, 1)
            c.drawCircle(innerWidth / 3.2, innerHeight / 1.91, innerWidth / 400)
            c.endFill()
            app.stage.addChild(c)
            break
    }

}

const style = new PIXI.TextStyle({
    fontFamily: 'Courier New',
    fill: "#538673",
    // stroke: '#4a1850',
    // strokeThickness: 2,
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    // dropShadow: true,
    // dropShadowColor: '#000000',
    // dropShadowBlur: 4,
    // dropShadowAngle: Math.PI / 6,
    // dropShadowDistance: 6,
})

const text = new PIXI.Text('Click the handle', style)
text.anchor.set(0.5, 0)
text.x = bg.width / 2
text.y = bg.position.y + (bg.height / 100)
text.width = bg.width / 3
text.height = bg.height / 10

app.stage.addChild(text)
console.log(bg)
console.log(text.y)

const timerStyle = new PIXI.TextStyle({
    fontFamily: 'Courier New',
    fill: "#538673",
    fontSize: 36,
    fontWeight: 'bold'
})


let timer = new PIXI.Text("00:00", timerStyle)
timer.x = 100
timer.y = 850
app.stage.addChild(timer)

class StopWatch {
    seconds: number;
    minutes: number;
    duration: number;
    intervalID: any;
    constructor() {
        this.seconds = 0
        this.minutes = 0
        this.duration = 0
        this.intervalID;
    }
    start(direction: string) {
        this.stop()
        this.intervalID = setInterval(() => {
            this.duration += 1
            if (direction === 'ArrowRight') {
                this.seconds += 1
                if (this.seconds <= 9 && this.minutes >= 0) {
                    timer.text = `0${this.minutes}:0${this.seconds}`
                }
                if (this.seconds < 0 && this.seconds >= -9) {
                    timer.text = `-0${-this.minutes}:0${-this.seconds}`
                }
                if (this.seconds > 9 && this.minutes >= 0) {
                    timer.text = `0${this.minutes}:${this.seconds}`
                }
                if (this.seconds < -9) {
                    timer.text = `-0${-this.minutes}:${-this.seconds}`
                }
                if (this.seconds === 60) {
                    this.seconds = 0
                    this.minutes += 1
                    if (this.minutes < 9 && this.minutes >= 0) {
                        timer.text = `0${this.minutes}:0${this.seconds}`
                    }
                    if (this.minutes < 0 && this.minutes > -9) {
                        timer.text = `-0${-this.minutes}:0${-this.seconds}`
                    }
                    if (this.minutes < -9) {
                        timer.text = `-${-this.minutes}:0${this.seconds}`
                    }
                    else {
                        timer.text = `0${this.minutes}:0${this.seconds}`
                    }
                }
                if (this.seconds === 0 && this.minutes < 0) {
                    this.seconds = -59
                    this.minutes += 1
                    if (this.minutes >= 0) {
                        timer.text = `-0${this.minutes}:${-this.seconds}`
                    }
                    else {
                        timer.text = `-0${-this.minutes}:0${-this.seconds}`
                    }
                }
            }
            if (direction === 'ArrowLeft') {
                this.seconds -= 1
                if (this.seconds <= 9 && this.minutes >= 0) {
                    timer.text = `0${this.minutes}:0${this.seconds}`
                }
                if (this.seconds < 0 && this.seconds >= -9) {
                    timer.text = `-0${-this.minutes}:0${-this.seconds}`
                }
                if (this.seconds > 9 && this.minutes >= 0) {
                    timer.text = `0${this.minutes}:${this.seconds}`
                }
                if (this.seconds < -9) {
                    timer.text = `-0${-this.minutes}:${-this.seconds}`
                }
                if (this.seconds === -60) {
                    this.seconds = 0
                    this.minutes -= 1
                    if (this.minutes < 9 && this.minutes >= 0) {
                        timer.text = `0${this.minutes}:0${this.seconds}`
                    }
                    if (this.minutes < 0 && this.minutes > -9) {
                        timer.text = `-0${-this.minutes}:0${-this.seconds}`
                    }
                    if (this.minutes < -9) {
                        timer.text = `-${-this.minutes}:0${this.seconds}`
                    }
                    else {
                        timer.text = `0${this.minutes}:0${this.seconds}`
                    }
                }
                if (this.seconds === 0 && this.minutes < 0) {
                    this.seconds = 59
                    this.minutes -= 1
                    if (this.minutes >= 0) {
                        timer.text = `-0${this.minutes}:${-this.seconds}`
                    }
                    else {
                        timer.text = `-0${-this.minutes}:0${-this.seconds}`
                    }
                }
            }
        }, 1000)
    }
    stop() {
        clearInterval(this.intervalID)
    }
    refresh = () => {
        this.duration = 0
        this.minutes = 0
        this.seconds = 0
    }
}

const sw = new StopWatch