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
| beat | The Entity is about to start moving along the path |
| movingended   | The Entity has completed moving along the path         |
| alongpath-trigger-activated   | The Entity has activated a Trigger-Point (Fired on the corresponding 'curve-point') |
| alongpath-trigger-deactivated   | The Entity has deactivated a Trigger-Point (Fired on the corresponding 'curve-point')          |