const input = `
e2A2A4|e2A2A3B|c2c2B2c2|d2d2c2d2
e2A2e2A2|e2A2A3B|c2c2BAG2|A4A4
A2c2A2c2|B2G2G4|A2c2A2c2|d6cd
e2e2d2d2|c2c2B4|ABc2B2G2|A4A4
`

const crocheDuration = 140
let t = 0
const matches = [...input.matchAll(/[a-gA-G][,]?[2|3|4|6]?/g)].map(m => {
    // console.log(m[0])
    let note = m[0][0]
    let octave = 4
    if (note.toLowerCase() === note) {
        octave = 5
    }
    note = note.toUpperCase()
    // if (note === 'F') {
    //     note = 'F♯' // Edor
    // }
    // if (note === 'C') {
    //     note = 'C♯' // Edor
    // }
    let duration = 1
    if (m[0][1] === '2' || m[0][2] === '2') {
        duration = 2
    }
    if (m[0][1] === '3' || m[0][2] === '3') {
        duration = 3
    }
    if (m[0][1] === '4' || m[0][2] === '4') {
        duration = 4
    }
    if (m[0][1] === '6' || m[0][2] === '6') {
        duration = 6
    }

    const ret = note + octave + '@' + t
    t += crocheDuration * duration
    return ret
})

console.log(matches.join(',') + ',end@' + t)

// B4@722,end@2256
