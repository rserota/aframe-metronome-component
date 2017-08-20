var flash = function(el, time){
    time = time || 100
    el.setAttribute('color', '#eee')
    setTimeout(function(){
        el.setAttribute('color', '#222')
    }, time)

}

// use 3d panning instead of stereo panning for all presets
for ( var inst in Wad.presets ) {
    Wad.presets[inst].panning = [0,0,0]
}

var kick = new Wad({source : 'kick.mp3', panning:[0, 0, 5]})
kick.globalReverb = true

var bass = new Wad({
    source       : 'sine',
    volume       : .9,
    globalReverb : true,
    panning      : [-5, 0, 0],
    env : {
        attack  : .02,
        decay   : .1,
        sustain : .9,
        hold    : .4,
        release : .1
    }
})

var hat = new Wad(Wad.presets.hiHatClosed)
hat.setVolume(.4)
hat.globalReverb = true

var hatOpen = new Wad(Wad.presets.hiHatOpen)
hatOpen.globalReverb = true

var snare = new Wad(Wad.presets.snare)
snare.setVolume(9)
snare.globalReverb = true

var piano = new Wad({source : 'square', volume : 1.4, panning: [-3, 3, 3], env : {attack : .01, decay : .005, sustain : .2, hold : .015, release : .3}, filter : {type : 'lowpass', frequency : 1200, q : 8.5, env : {attack : .2, frequency : 600}}})
piano.globalReverb = true

var ghost = new Wad(Wad.presets.ghost)

// Wad.setGlobalReverb({impulse : 'widehall.wav', wet : .5})


var clock     = document.getElementById('clock')

var snareEl   = document.getElementById('snare')
var lowBass   = document.getElementById('lowBass')
var highBass  = document.getElementById('highBass')
var kickEl    = document.getElementById('kick')
var hatEl     = document.getElementById('hiHatClosed')
var hatOpenEl = document.getElementById('hiHatOpen')
var ghostEl   = document.getElementById('ghost')
var pianoEl   = document.getElementById('piano')




var startMusic = function(){

    clock.setAttribute('metronome', 'startTime', performance.now() + 500)

    clock.addEventListener('beat', function(event){
        console.dir(event.detail)
        var ed = event.detail


        if (ed.currentLoop > 0 ) {

        // kick // 
            if ( ed.beatInBar === 1 || ed.beatInBar === 5 ) {
                kick.play({panning: [0, 0, 5]})
                flash(kickEl,100)
            }
            if ( ed.barInLoop === 4 && ed.beatInBar === 8 ) {
                kick.play({panning: [0, 0, 5]})
                flash(kickEl,100)
            }
        // snare //
            if ( ed.beatInBar === 3 || ed.beatInBar === 7 ) {
                snare.play({panning:[0, 3, 5]})
                flash(snareEl,100)
            }

        // closed hat //
            if ( [2,4,6,7].includes(ed.beatInBar) ){
                hat.play({panning: [2, 3, 5]})
                flash(hatEl, 75)
            }

        // open hat //
            if ( [8].includes(ed.beatInBar) && [1,2,3,5,6,7].includes(ed.barInLoop)) {
                hatOpen.play({panning: [-2, 3, 5]})
                flash(hatOpenEl, 250)
            }
        }

        if ( ed.currentLoop > 1 ) {

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
            
        }
    })

    clock.addEventListener('tick',function(event){
        var ed = event.detail
        if ( ed.tickInLoop %96 === 56 && ed.currentLoop > 0 ) {
            snare.play({panning:[0, 3, 5]})
            flash(snareEl,100)
        }

        if ( ed.currentLoop > 2 ) {

            if (  [1,1+384].includes(ed.tickInLoop) ){
                ghost.play({pitch: 'G5', panning: [3,3,3]})
                flash(ghostEl, 2000)
            }
            else if ( [91,91+384].includes(ed.tickInLoop) ){
                ghost.play({pitch: 'Gb5', env : {hold :.1}, panning: [3,3,3]})
                flash(ghostEl, 100)
            }
            else if ( [97,97+384].includes(ed.tickInLoop) ){
                ghost.play({pitch: 'F5', panning: [3,3,3]})
                flash(ghostEl, 2000)
            }
            else if ( [194,194+384].includes(ed.tickInLoop) ){
                ghost.play({pitch: 'Ab5', panning: [3,3,3]})
                flash(ghostEl, 2000)
            }
            else if ( [264,264+384].includes(ed.tickInLoop) ){
                ghost.play({pitch: 'G5', env : {hold :1.4}, panning: [3,3,3]})
                flash(ghostEl, 400)
            }
            else if ( [288,288+384].includes(ed.tickInLoop) ){
                ghost.play({pitch: 'Bb5', panning: [3,3,3]})
                flash(ghostEl, 2000)
            }
        }

        if ( ed.currentLoop > 3 ) {

            if ( [19, 19+384,37,37+384,115,115+384,132,132+384,211,211+384,229,229+384,307,307+384,355].includes(ed.tickInLoop) ){
                piano.play({pitch: 'C5', panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [25, 121, 217, 313, 361, 409, 505, 601].includes(ed.tickInLoop) ){
                piano.play({pitch: 'Eb5', filter:{q:15}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [43, 139, 235, 427, 523, 619].includes(ed.tickInLoop) ){
                piano.play({pitch: 'F5', filter:{release:.2}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [649].includes(ed.tickInLoop) ){
                piano.play({pitch: 'F5', panning: [-3,3,3]})
                flash(pianoEl, 80)
            }

            if ( [373].includes(ed.tickInLoop) ){
                piano.play({pitch: 'G5', filter:{q:15}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [673].includes(ed.tickInLoop) ){
                piano.play({pitch: 'G5', panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [667].includes(ed.tickInLoop) ){
                piano.play({pitch: 'Gb5', filter:{q:15}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [697].includes(ed.tickInLoop) ){
                piano.play( {volume : .6, pitch : 'D6', filter : { q : 15}, panning: [-3,3,3]})
                piano.play( {volume : .6, pitch : 'G5', filter : { q : 15}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [703].includes(ed.tickInLoop) ){
                piano.play( {volume : .6, pitch : 'D6', filter : { q : 15}, panning: [-3,3,3]})
                piano.play( {volume : .6, pitch : 'G5', filter : { q : 15}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [709].includes(ed.tickInLoop) ){
                piano.play( {volume : .6, pitch : 'C6', filter : { q : 15}, panning: [-3,3,3]})
                piano.play( {volume : .6, pitch : 'F6', filter : { q : 15}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
            if ( [715].includes(ed.tickInLoop) ){
                piano.play( {volume : .6, pitch : 'D6', filter : { q : 15}, panning: [-3,3,3]})
                piano.play( {volume : .6, pitch : 'G5', filter : { q : 15}, panning: [-3,3,3]})
                flash(pianoEl, 80)
            }
        }
    })

}

// window.addEventListener('touchstart', startMusic) // should theoretically help with mobile audio restrictions
startMusic()
