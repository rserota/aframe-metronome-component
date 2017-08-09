var flash = function(el, time){
    time = time || 100
    el.setAttribute('color', 'white')
    setTimeout(function(){
        el.setAttribute('color', 'gray')
    }, time)
    // el.setAttribute('light', "type: point; intensity: 0.75; distance: 50; decay: 2")
    // setTimeout(function(){
    //     el.setAttribute('light', "type: point; intensity: 0; distance: 50; decay: 2")
    // }, time)
}

var kick = new Wad({source : '/kick.mp3', panning:[0, 0, 5]})
kick.globalReverb = true
var bass = new Wad({
    source : 'sine',
    volume: .9,
    globalReverb : true,
    panning : [-5, 0, 0],
    env : {
        attack : .02,
        decay : .1,
        sustain : .9,
        hold : .4,
        release : .1
    }
})
var hat = new Wad(Wad.presets.hiHatClosed)
hat.setVolume(.4)
hat.globalReverb = true

var snare = new Wad(Wad.presets.snare)
snare.setVolume(9)
snare.globalReverb = true
var snareEl = document.getElementById('snare')
var clock = document.getElementById('clock')
var lowBass = document.getElementById('lowBass')
var highBass = document.getElementById('highBass')
var kickEl = document.getElementById('kick')
var hatOpen = new Wad(Wad.presets.hiHatOpen)
hatOpen.globalReverb = true
var ghost = new Wad(Wad.presets.ghost)
clock.addEventListener('beat', function(event){
    console.dir(event.detail.currentLoop)
    var ed = event.detail

// kick // 
    if ( ed.beatInBar === 1 || ed.beatInBar === 5 ) {
        kick.play()
        flash(kickEl,100)
    }
    if ( ed.beatInBar === 3 || ed.beatInBar === 7 ) {
        snare.play({panning:[0, 3, 5]})
        flash(snareEl,100)
    }
    if ( ed.barInLoop === 4 && ed.beatInBar === 8 ) {
        kick.play()
        flash(kickEl,100)
    }

    if ( [2,4,6,7].includes(ed.beatInBar) ){
        hat.play()
    }
    if ( [8].includes(ed.beatInBar) && ed.barInLoop !== 4 ) {
        hatOpen.play()
    }

// Bass //
    if ( ed.barInLoop === 1 ) {
        if ( ed.beatInBar % 2 === 1 ) {
            bass.play({pitch:'C3', panning:[-5,0,0]})
            flash(lowBass, 300)
        }
        else {
            bass.play({pitch:'C4', panning:[5,0,0]})
            flash(highBass, 300)
        }
    }

    if ( ed.barInLoop === 2 ) {
        if ( ed.beatInBar % 2 === 1 ) {
            bass.play({pitch:'Eb3', panning:[-5,0,0]})
            flash(lowBass, 200)

        }
        else {
            bass.play({pitch:'Eb4', panning:[5,0,0]})
            flash(highBass, 200)

        }
    }

    if ( ed.barInLoop === 3 ) {
        if ( ed.beatInBar % 2 === 1 ) {
            bass.play({pitch:'Bb2', panning:[-5,0,0]})
            flash(lowBass, 200)

        }
        else {
            bass.play({pitch:'Bb3', panning:[5,0,0]})
            flash(highBass, 200)

        }
    }
    
    if ( ed.barInLoop === 4 ) {
        if ( ed.beatInBar % 2 === 1 ) {
            bass.play({pitch:'G2', panning:[-5,0,0]})
            flash(lowBass, 200)

        }
        else {
            bass.play({pitch:'G3', panning:[5,0,0]})
            flash(highBass, 200)

        }
    }



})

clock.addEventListener('tick',function(event){
    var ed = event.detail
    if ( ed.tickInLoop %96 === 56 ) {
        snare.play()
        flash(snareEl,100)
    }
    if ( ed.tickInLoop === 1 ){
        ghost.play({pitch: 'G5'})
    }
    else if ( ed.tickInLoop === 91 ){
        ghost.play({pitch: 'Gb5', env : {hold :.1}})
    }
    else if ( ed.tickInLoop === 97 ){
        ghost.play({pitch: 'F5'})
    }
    else if ( ed.tickInLoop === 194 ){
        ghost.play({pitch: 'Ab5'})
    }
    else if ( ed.tickInLoop === 264 ){
        ghost.play({pitch: 'G5'})
    }
    else if ( ed.tickInLoop === 288 ){
        ghost.play({pitch: 'Bb5'})
    }
})
Wad.setGlobalReverb({impulse : '/widehall.wav', wet : .5})
console.log(clock)

