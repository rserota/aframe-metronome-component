# aframe-metronome-component
A component for [A-Frame](https://aframe.io) that fires events at a specified rhythm, to facilitate building loop-based musical VR applications. 


## Properties

| Property      | Description | Default Value |
| --------      | ----------- | ------------- |
| bpm           | Beats Per Minute. The overall speed of the loop. | 80 |
| beatsPerBar   | The number of beats contained in each bar of the loop. | 4 |
| barsPerLoop   | The number of bars in each loop. | 4 |
| startTime     | How long to wait (in milliseconds) after the page loads before the metronome starts. Can be reassigned to effectively jump to any point in the loop. | performance.now() + 500 |

### Events

| Event    | Description |
| -------- | ----------- |
| beat | Fires on every beat of the loop, according to the component's `bpm` property. Contains information about the current beat relative to the current bar, current loop, total beats, etc. |
| tick   | Contains roughly the same information as the `beat` event, but fires more frequently. Each `beat` is divided into 12 `tick`s.  |

## Installation

### Browser Installation


```html
<head>
    <title>A Musical A-Frame Scene</title>
    <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-metronome-component"></script>
</head>

<body>
    <a-scene>
        <a-entity id="clock" metronome="bpm:136;beatsPerBar:8;barsPerLoop:8"></a-entity>
    
    </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe-metronome-component
```

## Usage

```javascript
var clock = document.getElementById('clock')

clock.addEventListener('beat', function(event){
    console.log(event.detail)
    var ed = event.detail
    if (  (ed.beatInBar % 2 === 1) && (ed.barInLoop !== 1) ) {
        // code in this block will run on every other beat, except during the first bar of each loop
        // e.g. snareDrum.play() 
    }

}

clock.addEventListener('tick', function(event){
    console.log(event.detail)
}

```
