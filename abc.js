const input = `
D2|F4G2|A3BA2|G4E2|C3DE2|F4D2|D3C#D2
E4C#2|A,4D2|F4G2|A3BA2|G4E2|C3DE2
F3ED2|C#3B,C#2|D6|D6|c6|c3BA2|G4E2
C3DE2|F4D2|D3C#D2|E4C#2|A,6|c6|
c3BA2|G4E2|C3DE2|F3ED2|C#3B,C#2|D6|D6
`

//const crocheDuration = 140
const crocheDuration = 180
let t = 0
const matches = [...input.matchAll(/([a-gA-G][#]?[,]?)([2|3|4|6|\/])?/g)].map(m => {
    let note = m[1].replace('#', '♯')
    let octave = 4
    if (note.toLowerCase() === note) {
        octave = 5
    }
    if (note[note.length - 1] === ',') {
        octave = 3
        note = note.slice(0, -1)
    }
    note = note.toUpperCase()
    // console.log(m[1], '=>', note, octave)

    // if (note === 'F') {
    //     note = 'F♯' // Edor
    // }
    // if (note === 'C') {
    //     note = 'C♯' // Edor
    // }
    // if (note === 'G') {
    //     note = 'G♯' // Aminharmo
    // }
    let duration = 1
    if (m[2] === '/') {
        duration = 0.5
    }
    if (m[2] === '2') {
        duration = 2
    }
    if (m[2] === '3') {
        duration = 3
    }
    if (m[2] === '4') {
        duration = 4
    }
    if (m[2] === '6') {
        duration = 6
    }

    const ret = note + octave + '@' + t
    t += crocheDuration * duration
    return ret
})

console.log(matches.join(',') + ',end@' + t)

// B4@722,end@2256
