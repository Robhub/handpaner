const input = `
Bd|b2b2a2|e4ce|c'2c'2d'2|c'2b2 df|d'2d'2e'2|g4eg|c'2c'2^a2|b2z2
`

// const key = 'Gmin' // Bbmaj (bb)
// const key = 'Dmin' // Fmaj Gdor (b)
// const key = 'Amin' // Cmaj Ddor ()
// const key = 'Emin' // Gmaj Ador (#)
const key = 'Bmin' // Dmaj Edor (##)

//const crocheDuration = 140
const crocheDuration = 280
let t = 0
let wait = 0
const matches = [...input.matchAll(/([\^=])?([a-gA-Gz][,']?)([123468\/])?/g)].map(m => {
    wait = 0
    let accidental = m[1]
    let note = m[2]
    let duration = m[3]

    let duree = 1
    if (duration === '/') {
        duree = 0.5
    }
    if (duration === '1') {
        duree = 1
    }
    if (duration === '2') {
        duree = 2
    }
    if (duration === '3') {
        duree = 3
    }
    if (duration === '4') {
        duree = 4
    }
    if (duration === '6') {
        duree = 6
    }
    if (duration === '8') {
        duree = 8
    }
    if (note === 'z') {
        wait = duree
        return ''
    }

    let octave = 4
    if (note.toLowerCase() === note) {
        octave = 5
    }
    if (note[note.length - 1] === ',') {
        octave = 3
        note = note.slice(0, -1)
    }
    if (note[note.length - 1] === "'") {
        octave = 6
        note = note.slice(0, -1)
    }
    note = note.toUpperCase()

    if (accidental === '^') {
        note = note + '#'
    }
    if (note === 'B' && (key === 'Dmin' || key === 'Fmaj' || key === 'Gdor')) {
        note = note + 'b'
    }
    if ((note === 'B' || note === 'E') && key === 'Gmin') {
        note = note + 'b'
    }
    if (note === 'F' && (key === 'Emin' || key === 'Ador')) {
        note = note + '#'
    }
    if ((note === 'F' || note === 'C') && (key === 'Bmin' || key === 'Edor')) {
        note = note + '#'
    }

    const ret = note + octave + '@' + t
    t += crocheDuration * (duree + wait)

    // console.log('m', m[1], '_', m[2], '_', m[3], '=>', ret)
    return ret
})

console.log(matches.filter(Boolean).join(',') + ',end@' + t)

// B4@722,end@2256
