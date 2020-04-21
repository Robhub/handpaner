import * as DATA from './data'
import { Handpan } from './models'

// A, 3m => C
// A, 3 => Db
export function relToAbsFlat(rootName: string, relDiff: any): string | null {
    const rootIndex = DATA.notesSharp.indexOf(rootName) !== -1 ? DATA.notesSharp.indexOf(rootName) : DATA.notesFlat.indexOf(rootName)
    return rootIndex !== -1 ? DATA.notesFlat[(rootIndex + DATA.ecarts.indexOf(relDiff) + 12) % 12] : null
}

// A, 3m => C
// A, 3 => C♯
export function relToAbsSharp(rootName: string, relDiff: any): string | null {
    const rootIndex = DATA.notesSharp.indexOf(rootName) !== -1 ? DATA.notesSharp.indexOf(rootName) : DATA.notesFlat.indexOf(rootName)
    return rootIndex !== -1 ? DATA.notesSharp[(rootIndex + DATA.ecarts.indexOf(relDiff) + 12) % 12] : null
}

// A, A / B C D => 1 / 2 3m 4
export function absToRel(ding: string, notesAsStringClean: string): string {
    let indexOfDing = DATA.notesSharp.indexOf(ding)
    if (indexOfDing === -1) {
        indexOfDing = DATA.notesFlat.indexOf(ding)
    }
    const relatives = []
    for (let i = 0; i < 12; i++) {
        relatives.push(DATA.ecarts[(12 - indexOfDing + i) % 12])
    }
    let relStr = notesAsStringClean + ' '
    for (let i = 0; i < 12; i++) {
        relStr = relStr.replace(new RegExp(DATA.notesSharp[i] + '([^♯♭])', 'g'), relatives[i] + '$1')
        relStr = relStr.replace(new RegExp(DATA.notesFlat[i] + '([^♯♭])', 'g'), relatives[i] + '$1')
    }
    return relStr
}

export const genChords = (uniqueNotes: any): any => {
    return DATA.chords.map(chordType => {
        const chordsFound: any[] = []
        uniqueNotes.forEach((note: any) => {
            chordType.chords.forEach(chord => {
                const chordNotes = chord.val.split(' ')
                const every = chordNotes.every(chordNote => {
                    return (
                        uniqueNotes.indexOf(relToAbsSharp(note, chordNote)) >= 0 || uniqueNotes.indexOf(relToAbsFlat(note, chordNote)) >= 0
                    )
                })
                if (every) {
                    chordsFound.push({
                        root: note,
                        notes: chordNotes,
                        label: note + chord.abbr,
                    })
                }
            })
        })
        return { type: chordType.type, chords: chordsFound }
    })
}

export const genPanScales = (handpan: Handpan): any[] => {
    const panScalesAbsolute = DATA.panScales.map(panScale => {
        const pan = new Handpan()
        pan.loadFromRelNotation(handpan.ding, panScale.val)
        return {
            name: panScale.name,
            notesAll: pan.notesAll,
        }
    })
    return panScalesAbsolute.filter(panScale => {
        return panScale.notesAll.every(panNote => {
            return handpan.notesAll.some(handpanNote => {
                // Car la génération de relatif => absolu ne génère que des # pour l'instant
                const flatIndex = DATA.notesFlat.indexOf(handpanNote.name)
                const sharpedNoteName = flatIndex !== -1 ? DATA.notesSharp[flatIndex] : handpanNote.name
                return panNote.octave === handpanNote.octave && panNote.name === sharpedNoteName
            })
        })
    })
}
