let input = `
ABcdef|e2d2c2|dGBdeg|e2d2B2
ABcdef|e2d2c2|dGBded|c2B2G2
A3Bc2|A3Bc2|B3cd2|c2B2G2
A3Bc2|A3Bc2|B3cd2|c2B2G2
A2cAcA|A2cAcA|G2BGBG|G2BGBG
A2cAcA|A2cAcA|G2BGBG|G2BGBG
ecAecA|fcAfcA|dBGdBG|eBGeBG
ecAecA|fcAfcA|dBGdBG|eBGeBG
A3Bc2|A3Bc2|B3cd2|c2B2G2
A3Bc2|A3Bc2|B3cd2|c2B2G2
`

// const key = 'Edor' // (bbb)
// const key = 'Gmin' // Bbmaj (bb)
// const key = 'Dmin' // Fmaj Gdor (b)
const key = 'Amin' // Cmaj Ddor ()
// const key = 'Emin' // Gmaj Ador (#)
// const key = 'Bmin' // Dmaj Edor (##)

// const crocheDuration = 140
// const crocheDuration = 160
const crocheDuration = 180
// const crocheDuration = 200
// const crocheDuration = 280
let t = 0
let wait = 0
let chordDuration = null
input = input.replace(/"[^"]+"/g, '') // remove chords labels
const matches = [...input.matchAll(/(\[)?([\^=])?([a-gA-Gz](?:[,']{1,2})?)([1234678\/])?(\])?/g)].flatMap(matchedGroups => {
    wait = 0
    let isChordStart = matchedGroups[1]
    let accidental = matchedGroups[2]
    let noteAndOctave = matchedGroups[3]
    let duration = matchedGroups[4]
    let isChordEnd = matchedGroups[5]

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
    if (duration === '7') {
        duree = 7
    }
    if (duration === '8') {
        duree = 8
    }
    if (noteAndOctave === 'z') {
        wait = duree
        return null
    }
    const noteLetter = noteAndOctave[0]
    const octaveModifier = noteAndOctave.slice(1)

    let octave = 4
    if (noteLetter.toLowerCase() === noteLetter) {
        octave = 5
    }
    if (octaveModifier === ',,') {
        octave = 2
    }
    if (octaveModifier === ',') {
        octave = 3
    }
    if (octaveModifier === "'") {
        octave = 6
    }
    let note = noteLetter.toUpperCase()

    if (accidental === '^') {
        note = note + '#'
    }
    if (note === 'B' && (key === 'Dmin' || key === 'Fmaj' || key === 'Gdor')) {
        note = note + 'b'
    }
    if ((note === 'B' || note === 'E') && key === 'Gmin') {
        note = note + 'b'
    }
    if ((note === 'B' || note === 'E' || note === 'A') && key === 'Cmin') {
        note = note + 'b'
    }
    if (note === 'F' && (key === 'Emin' || key === 'Ador')) {
        note = note + '#'
    }
    if ((note === 'F' || note === 'C') && (key === 'Bmin' || key === 'Edor')) {
        note = note + '#'
    }

    const ret = note + octave + '@' + t
    const noteDuration = crocheDuration * (duree + wait)
    if (isChordStart) {
        chordDuration = noteDuration
    } else if (!chordDuration) {
        t += noteDuration
    }
    if (isChordEnd) {
        t += chordDuration
        chordDuration = null
    }

    // console.log('m', m[1], '_', m[2], '_', m[3], '=>', ret)
    // if (octave === 2 || octave === 3) return // IGNORED
    return ret
})

console.log(matches.filter(Boolean).join(',') + ',end@' + t)

const allNotes = matches.filter(Boolean).map(x => x.split('@')[0])
const allUniqueNotes = [...new Set(allNotes)]
console.log(allUniqueNotes.map(n => `'${n}'`).join(','))

// B4@722,end@2256
