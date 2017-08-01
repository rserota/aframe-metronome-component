console.log('hi')

var bass = new Wad({
    source : 'sine',
    env : {
        attack : .02,
        decay : .1,
        sustain : .9,
        hold : .4,
        release : .1
    }
})

var clock = document.getElementById('clock')
clock.addEventListener('beat', function(event){
    console.dir(event.detail)
    
})

console.log(clock)