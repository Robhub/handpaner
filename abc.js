const input = `
ABcdef|e2d2c2|dGBdeg|e2d2B2
ABcdef|e2d2c2|dGBded|c2B2G2
A3Bc2|A3Bc2|B3cd2|c2B2G2
A3Bc2|A3Bc2|B3cd2|c2B2G2
`

//const crocheDuration = 140
const crocheDuration = 180
let t = 0
const matches = [...input.matchAll(/[a-gA-G][,]?[2|3|4|6|\/]?/g)].map(m => {
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
    if (m[0][1] === '/' || m[0][2] === '/') {
        duration = 0.5
    }
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
