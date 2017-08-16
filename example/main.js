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
var piano = new Wad({source : 'square', volume : 1.4, env : {attack : .01, decay : .005, sustain : .2, hold : .015, release : .3}, filter : {type : 'lowpass', frequency : 1200, q : 8.5, env : {attack : .2, frequency : 600}}})
piano.globalReverb = true


clock.addEventListener('beat', function(event){
    console.dir(event.detail)
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
    if ( [8].includes(ed.beatInBar) && [1,2,3,5,6,7].includes(ed.barInLoop)) {
        hatOpen.play()
    }

// Bass //
    if ( [1,5].includes(ed.barInLoop) ) {
        if ( ed.beatInBar % 2 === 1 ) {
            bass.play({pitch:'C2', panning:[-5,0,0]})
            flash(lowBass, 300)
        }
        else {
            bass.play({pitch:'C3', panning:[5,0,0]})
            flash(highBass, 300)
        }
    }

    if ( [2,6].includes(ed.barInLoop) ) {
        if ( ed.beatInBar % 2 === 1 ) {
            bass.play({pitch:'F2', panning:[-5,0,0]})
            flash(lowBass, 200)

        }
        else {
            bass.play({pitch:'F3', panning:[5,0,0]})
            flash(highBass, 200)

        }
    }

    if ( [3,7].includes(ed.barInLoop) ) {
        if ( ed.beatInBar % 2 === 1 ) {
            bass.play({pitch:'Ab2', panning:[-5,0,0]})
            flash(lowBass, 200)

        }
        else {
            bass.play({pitch:'Ab3', panning:[5,0,0]})
            flash(highBass, 200)

        }
    }
    
    if ( [4,8].includes(ed.barInLoop) ) {
        if ( ed.beatInBar === 8 ) {
            bass.play({pitch:'Bb2', panning:[-5,0,0]})
            flash(lowBass, 200)

        }
        else if ( ed.beatInBar % 2 === 1 ) {
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
    if (  [1,1+384].includes(ed.tickInLoop) ){
        ghost.play({pitch: 'G5'})
    }
    else if ( [91,91+384].includes(ed.tickInLoop) ){
        ghost.play({pitch: 'Gb5', env : {hold :.1}})
    }
    else if ( [97,97+384].includes(ed.tickInLoop) ){
        ghost.play({pitch: 'F5'})
    }
    else if ( [194,194+384].includes(ed.tickInLoop) ){
        ghost.play({pitch: 'Ab5'})
    }
    else if ( [264,264+384].includes(ed.tickInLoop) ){
        ghost.play({pitch: 'G5', env : {hold :1.4}})
    }
    else if ( [288,288+384].includes(ed.tickInLoop) ){
        ghost.play({pitch: 'Bb5'})
    }

    if ( [19,37,115,132,211,229,307,355].includes(ed.tickInLoop) ){
        piano.play({pitch: 'C5'})
    }
    if ( [25, 121, 217, 313, 361].includes(ed.tickInLoop) ){
        piano.play({pitch: 'Eb5', filter:{q:15}})
    }
    if ( [43, 139, 235].includes(ed.tickInLoop) ){
        piano.play({pitch: 'Eb5', filter:{q:15}})
    }
})
Wad.setGlobalReverb({impulse : '/widehall.wav', wet : .5})
console.log(clock)

