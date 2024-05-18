let input = `

"^Swing" z"_5" E |"Am""_7" A"_6'"B"_8" c"_7'"d"_9" e"_8'"f |"E7/G#""_7'" e4 z"_7'" e | %3
"G""_7'" e"_8"d"_6'" c"_7"B"_6'" c"_7'"e |"D/F#""_7'" d4 z"_7'" d | %5
"F""_7'" d"_8"c"_6'" B"_7"A"_6'" B"_8"c |"E7""_7" B4 z"_8" d | %7
"Dm""_7'" d"_8"c"_6'" B"_7"A"_6'" B"_8"c |"E7""_7" B4 z"_4'" E | %9
"A""_7" A"_6'"B"_8" c"_7'"d"_9" e"_8'"f |"E/G#""_7'" e4 z"_7'" e | %11
"G""_7'" e"_8"d"_6'" c"_7"B"_6'" c"_7'"e |"D/F#""_7'" d4 z"_7'" d | %13
"F""_7'" d"_8"c"_6'" B"_7"A"_6'" B"_8"c |"E""_7" B4 z"_8" d | %15
"D""_7'" d"_8"c"_6'" B"_7"A"E""_7" B"_6'"c |"A""_7" A2 z"_9" e"_9" e"_9"e | %17
"D""_9" e2"_7'" d"_8"c"_7'" d"_9"e |"G""_8" d6 |"C""_6" G"_5''"A"_7" B"_6'"c"_8" d"_7'"e | %20
"F""_8" c2 z"_8" c"_8" c"_8"c |"D""_8" c2"_6'" B"_8"c- c"_7'"d | %22
"E""_7" B2 z"_5''" A"_4''" ^G"_7"B |"A""_6'" B2"_7" A2 z2 |"A" z2 z"_9" e"_9" e"_9"e | %25
"D""_9" e2"_7'" d"_8"c"_7'" d"_9"e |"G""_8" d6 |"C""_6" G"_5''"A"_7" B"_6'"c"_8" d"_7'"e | %28
"F""_8" c2 z"_8" c"_8" c"_8"c |"D""_8" c2"_6'" B"_8"c- c"_7'"d | %30
"E""_7" B2 z"_5''" A"_4''" ^G"_7"B |"A""_6'" B2"_7" A2 z2 | z4 z"_5" E | %33
"A""_7" A"_6'"B"_8" c"_7'"d"_9" e"_8'"f |"E/G#""_7'" e4 z"_7'" e | %35
"G""_7'" e"_8"d"_6'" c"_7"B"_6'" c"_7'"e |"D/F#""_7'" d4 z"_7'" d | %37
"F""_7'" d"_8"c"_6'" B"_7"A"_6'" B"_8"c |"E""_7" B4 z"_8" d | %39
"D""_7'" d"_8"c"_6'" B"_7"A"_6'" B"_8"c |"E""_7" B4 z"_4'" E | %41
"A""_7" A"_6'"B"_8" c"_7'"d"_9" e"_8'"f |"E/G#""_7'" e4 z"_7'" e | %43
"G""_7'" e"_8"d"_6'" c"_7"B"_6'" c"_7'"e |"D/F#""_7'" d4 z"_7'" d | %45
"F""_7'" d"_8"c"_6'" B"_7"A"_6'" B"_8"c |"E""_7" B4 z"_8" d | %47
"D""_7'" d"_8"c"_6'" B"_7"A"E""_7" B"_6'"c |"A""_7" A2 z"_9" e"_9" e"_9"e | %49
"D""_9" e2"_7'" d"_8"c"_7'" d"_9"e |"G""_8" d6 |"C""_6" G"_5''"A"_7" B"_6'"c"_8" d"_7'"e | %52
"F""_8" c2 z"_8" c"_8" c"_8"c |"D""_8" c2"_6'" B"_8"c- c"_7'"d | %54
"E""_7" B2 z"_5''" A"_4''" ^G"_7"B |"A""_6'" B2"_7" A2 z2 |"A" z2 z"_9" e"_9" e"_9"e | %57
"D""_9" e2"_7'" d"_8"c"_7'" d"_9"e |"G""_8" d6 |"C""_6" G"_5''"A"_7" B"_6'"c"_8" d"_7'"e | %60
"F""_8" c2 z"_8" c"_8" c"_8"c |"D""_8" c2"_6'" B"_8"c- c"_7'"d | %62
"E""_7" B2 z"_5''" A"_4''" ^G"_7"B |"A""_6'" B2"_7" A2 z2 | [EAc]4 z2 | %65

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
// const crocheDuration = 300
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
const matches = [...input.matchAll(/(\[)?([\^=_])?([a-gA-Gz](?:[,']{1,2})?)([1234678\/]{1,3})?([\-\>\<])?(\])?(\|)?/g)].flatMap(
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
        if (duration === '3/2') {
            duree = 1.5
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
