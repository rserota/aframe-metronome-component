AFRAME.registerComponent('metronome', {
    schema: {
        bpm         : { type: 'number', default: 80}, // beats per minute
        beatLen     : { type: 'number' }, // length of one beat, in milliseconds
        tickLen     : { type: 'number' }, // tickLen === beatLen/12
        beatsPerBar : { type: 'number', default: 4}, // aka the time signature. 4/4, 3/4, 5/4, etc
        barsPerLoop : { type: 'number', default: 4}, // number of bars/measures in each loop
        prevBeat    : { type: 'number'},
        currentBeat : { type: 'number'},
        prevTick    : { type: 'number'},
        currentTick : { type: 'number'},
        beatInLoop  : { type: 'number'},
        tickInLoop  : { type: 'number'},
        currentLoop : { type: 'number'},
        paused      : { type: 'bool',   default: false},
        pauseOffset : { type: 'number', default: 0},
        startTime   : { type: 'number', default: performance.now() + 500 },
        pausedTime  : { type: 'number'},
    },

    update: function(){
        this.data.beatLen = 60000 / this.data.bpm
        this.data.tickLen = this.data.beatLen / 12
    },

    pause: function(){
        this.data.pausedTime = performance.now()
    },

    play: function(){
        var pauseDuration = performance.now() - this.data.pausedTime
        this.data.pauseOffset += pauseDuration
    },

    tick: function(){
        var timeElapsed = (performance.now() - (this.data.startTime + this.data.pauseOffset))
        this.data.prevBeat    = this.data.currentBeat
        this.data.prevTick    = this.data.currentTick
        this.data.currentTick = Math.floor(timeElapsed / this.data.tickLen)
        if (this.data.prevTick != this.data.currentTick){

            if ( this.data.currentTick < 1 ) {
                this.data.currentBeat = 0
                this.data.beatInLoop  = 0
                this.data.tickInLoop  = 0
            }
            else {
                this.data.tickInLoop  = ((this.data.currentTick -1) % (12 * this.data.beatsPerBar * this.data.barsPerLoop))+1
                this.data.currentBeat = Math.floor(((this.data.currentTick - 1) / 12) +1)
                this.data.beatInLoop  = ((this.data.currentBeat -1) % (this.data.beatsPerBar * this.data.barsPerLoop))+1
                this.data.beatInBar   = ((this.data.beatInLoop-1) % this.data.beatsPerBar) +1
                this.data.barInLoop   = Math.floor(((this.data.beatInLoop-1) / this.data.beatsPerBar) +1)
                if ( this.data.tickInLoop === 1 ) {
                    this.data.currentLoop++
                }
                this.el.emit('tick', {
                    currentTick : this.data.currentTick,
                    tickInLoop  : this.data.tickInLoop,
                    currentBeat : this.data.currentBeat,
                    beatInBar   : this.data.beatInBar,
                    beatInLoop  : this.data.beatInLoop,
                    barInLoop   : this.data.barInLoop,
                    currentLoop : this.data.currentLoop,
                    beatsPerBar : this.data.beatsPerBar,
                    barsPerLoop : this.data.barsPerLoop,
                })

                if ( this.data.prevBeat != this.data.currentBeat){
                    this.el.emit('beat', {
                        currentBeat : this.data.currentBeat,
                        beatInBar   : this.data.beatInBar,
                        beatInLoop  : this.data.beatInLoop,
                        barInLoop   : this.data.barInLoop,
                        currentLoop : this.data.currentLoop,
                        beatsPerBar : this.data.beatsPerBar,
                        barsPerLoop : this.data.barsPerLoop,
                    })
                }
            }
        }
    },
})