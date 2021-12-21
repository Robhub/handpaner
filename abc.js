let input = `
!mp! d>!<(!e fg | a2- ab/c'/ | ba g>a | fe dc!<)! |!f! d>!>(!e fg | a2- ab/c'/ | ba a^g!>)! | %7
!mp! a2- a3/2 z/ |!mf! d>!<(!e fg | a2- ab/c'/ | ba g>a | fe dc!<)! |!ff! f>!>(!f g/f/e/d/ | %13
 ca e>g | fe ee!>)! |!mf! d2- d3/2 z/ |!f! d'2 ad' | c'>b ag | af/g/ ab | c'2 c'3/2 z/ | d'2 ad' | %21
 c'>b ag | fa ed/^c/ | d2 d3/2 z/ |!fff! d'2 ad' | c'>b ag | af/g/ ab | c'2 c'3/2 z/ | d'2 ad' | %29
 c'>b ag | fa ed/^c/ | d2- d z |!mp! d>!<(!e fg | a2- ab/c'/ | ba g>a | fe dc!<)! |!f! d>!>(!e fg | %37
 a2- ab/c'/ | ba a^g!>)! |!mp! a2- a3/2 z/ |!mf! d>!<(!e fg | a2- ab/c'/ | ba g>a | fe dc!<)! | %44
!ff! f>!>(!f g/f/e/d/ | ca e>g | fe ee!>)! |!mf! d2- d3/2 z/ |!f! d'2 ad' | c'>b ag | af/g/ ab | %51
 c'2 c'3/2 z/ | d'2 ad' | c'>b ag | fa ed/^c/ | d2 d3/2 z/ |!fff! d'2 ad' | c'>b ag | af/g/ ab | %59
 c'2 c'3/2 z/ | d'2 ad' | c'>b ag | fa ed/^c/ | d2- d z | %64
`

// const key = 'Cmin' // Ebmaj (bbb)
// const key = 'Gmin' // Bbmaj (bb)
// const key = 'Dmin' // Fmaj Gdor (b)
const key = 'Amin' // Cmaj Ddor ()
// const key = 'Emin' // Gmaj Ador (#)
// const key = 'Bmin' // Dmaj Edor (##)

// const crocheDuration = 140
// const crocheDuration = 160
// const crocheDuration = 180
// const crocheDuration = 200
const crocheDuration = 240
// const crocheDuration = 280
// const crocheDuration = 360
let t = 0
let wait = 0
let chordDuration = null
let ignoreNext = false
let nextDuree = null
let measureAccidentals = {}
input = input.replace(/\![^\!]+\!/g, '') // remove annotations
input = input.replace(/"[^"]+"/g, '') // remove chords labels
input = input.replace(/ /g, '') // remove spaces
const matches = [...input.matchAll(/(\[)?([\^=_])?([a-gA-Gz](?:[,']{1,2})?)([1234678\/])?([\-\>\<])?(\])?(\|)?/g)].flatMap(
    (matchedGroups) => {
        let isChordStart = matchedGroups[1]
        let accidental = matchedGroups[2]
        let noteAndOctave = matchedGroups[3]
        let duration = matchedGroups[4]
        let linkers = matchedGroups[5]
        let isChordEnd = matchedGroups[6]
        let isMeasureEnd = matchedGroups[7]
        let isSlur = false
        let isDotCroch = false
        let isCrochDot = false
        if (linkers) {
            isSlur = linkers.indexOf('-') !== -1
            isDotCroch = linkers.indexOf('>') !== -1
            isCrochDot = linkers.indexOf('<') !== -1
        }

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
        if (nextDuree) {
            duree = nextDuree
            nextDuree = null
        }
        if (isCrochDot) {
            duree = 0.5
            nextDuree = 1.5
        }
        if (isDotCroch) {
            duree = 1.5
            nextDuree = 0.5
        }

        if (noteAndOctave === 'z') {
            wait += duree
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
        if (measureAccidentals[note]) {
            note = note + measureAccidentals[note]
        }
        if (accidental === '^') {
            measureAccidentals[note] = '#'
            note = note + '#'
        }
        // TODO becare
        else if (accidental === '_') {
            measureAccidentals[note] = 'b'
            note = note + 'b'
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

        t += crocheDuration * wait // Handle previous cumulative wait
        wait = 0 // reset used wait
        const ret = note + octave + '@' + t
        const noteDuration = crocheDuration * duree
        if (isChordStart) {
            chordDuration = noteDuration
        } else if (!chordDuration) {
            t += noteDuration
        }
        if (isChordEnd) {
            t += chordDuration
            chordDuration = null
        }

        if (isMeasureEnd) {
            measureAccidentals = {}
        }
        if (ignoreNext) {
            ignoreNext = isSlur
            return null
        }
        if (isSlur) {
            ignoreNext = true
        }

        // console.log('m', m[1], '_', m[2], '_', m[3], '=>', ret)
        // if (octave === 2 || octave === 3) return // IGNORED
        return ret
    },
)

const endTime = t + wait * crocheDuration

console.log(matches.filter(Boolean).join(',') + ',end@' + endTime)

const allNotes = matches.filter(Boolean).map((x) => x.split('@')[0])
const allUniqueNotes = [...new Set(allNotes)]
console.log(allUniqueNotes.map((n) => `'${n}'`).join(','))

// B4@722,end@2256
