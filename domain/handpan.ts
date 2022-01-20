import { NOTES_ALL } from '@/domain/notes'
import { splitNoteNameAndOctave, semitonesDifference, transposeNoteObj } from '@/music'

export type PanScaleData = {
    name: string
    definition: string
}

export type HandpanNote = {
    noteName: string
    octave: number
    isDing: boolean
    isBottom: boolean
    isMutant: boolean
}

export class HandpanUser {
    id: string
    handpanModel: HandpanModel
    constructor(handpanDefinition: string) {
        this.id = '' + new Date().getTime() + Math.round(Math.random() * 1000000 + 1000000)
        this.handpanModel = definitionTransposedToHandpanObj(handpanDefinition)
    }
    loadFromDefinition(handpanDefinition: string, dingWanted: string = '') {
        this.handpanModel = definitionTransposedToHandpanObj(handpanDefinition, dingWanted)
    }
}

export class HandpanModel {
    notes: HandpanNote[]
    name: string = ''
    genericName: string = ''
    constructor(notes: HandpanNote[]) {
        this.notes = notes
    }
    getDing(): HandpanNote {
        const handpanDings = this.notes.filter((handpanNote) => handpanNote.isDing === true)
        if (handpanDings.length !== 1) {
            throw new Error('need only 1 ding')
        }
        return handpanDings[0]
    }
    getDingString(): string {
        const ding = this.getDing()
        return ding.noteName + ding.octave
    }
    getRestNotes(): HandpanNote[] {
        return this.notes.filter((handpanNote) => handpanNote.isDing === false)
    }
    getRestNotesTop(): HandpanNote[] {
        return this.notes.filter((handpanNote) => handpanNote.isDing === false && !handpanNote.isBottom && !handpanNote.isMutant)
    }
    getRestNotesTopMutant(): HandpanNote[] {
        return this.notes.filter((handpanNote) => handpanNote.isDing === false && !handpanNote.isBottom && handpanNote.isMutant)
    }
    getRestNotesBottom(): HandpanNote[] {
        return this.notes.filter((handpanNote) => handpanNote.isDing === false && handpanNote.isBottom)
    }
    getDefinition(): string {
        const handpanDing = this.getDing()
        let currentNoteIndex = NOTES_ALL.indexOf(handpanDing.noteName)
        let impliedOctave = handpanDing.octave
        const ding = handpanDing.noteName + (handpanDing.octave !== 3 ? handpanDing.octave : '')
        const absNotes = this.getRestNotes().map((note) => {
            const noteIndex = NOTES_ALL.indexOf(note.noteName)
            if (noteIndex <= currentNoteIndex) {
                impliedOctave++
            }
            currentNoteIndex = noteIndex

            const noteSimplified = note.octave !== impliedOctave ? note.noteName + note.octave : note.noteName
            let noteDefinition = note.isBottom ? '(' + noteSimplified + ')' : noteSimplified
            noteDefinition = note.isMutant ? '[' + noteDefinition + ']' : noteDefinition
            return noteDefinition
        })
        return ding + '/ ' + absNotes.join(' ')
    }
    getUniqueNotesNames(): string[] {
        return [...new Set(this.notes.map((note) => note.noteName))]
    }
    getUniqueNotesString(): string[] {
        return [...new Set(this.notes.map((note) => note.noteName + note.octave))]
    }
}

export const ALL_DINGS = [
    'E2',
    'F2',
    'F#2',
    'G2',
    'G#2',
    'A2',
    'A#2',
    'B2',
    'C3',
    'C#3',
    'D3',
    'D#3',
    'E3',
    'F3',
    'F#3',
    'G3',
    'G#3',
    'A3',
    'A#3',
    'B3',
]

const ALL_PANSCALES_DATA = [
    { definition: 'F/ A C E F A B C E', name: 'Aegean' },
    { definition: 'E/ A B C D E F G A', name: 'Aeolian' },
    { definition: 'E/ A B C E F A B C', name: 'Akebono' },
    { definition: 'A/ E G A B C D E', name: 'Amara' },
    { definition: 'A/ E G A B C D E G', name: 'Amara' },
    { definition: 'A/ E G A B C D E A', name: 'Amara triple' },
    { definition: 'A/ (C) (D) E (F) G A B C D E (F) (G)', name: 'Amarakurd mini' },
    { definition: 'A/ (C) (D) E (F) G (G#) A B C D E (F) G A (B) (C)', name: 'Amarakurdhijaz' },
    { definition: 'C/ G A C D E F G C', name: 'Anahata' },
    { definition: 'A/ E F G A C E F G', name: 'Arboreal' },
    { definition: 'C/ (D) (E) F G A B C D E (F) G A (B) (C) (D) (E)', name: 'Ashakiran' },
    { definition: 'A/ C D E F G A C D', name: 'Avalon' },
    { definition: 'A/ C D E F G A C D E', name: 'Avalon' },
    { definition: 'A/ D F G G# A C D F', name: 'Blues' },
    { definition: 'A/ C D G A C D E G', name: 'Chao Guo' },
    { definition: 'A/ C E G A B C D E', name: 'Deep Shello' },
    { definition: 'E/ A B C D E F A B C', name: 'DaNaYo' },
    { definition: 'D/ A B C D E F G A', name: 'Dorian' },
    { definition: 'A/ C E F G A B C', name: 'Equinox' },
    { definition: 'A/ C E F G A B C E', name: 'Equinox' },
    { definition: 'F/ (C#3) (G) G# C C# D# F G G# C', name: 'Equinox bottomised' },
    { definition: 'A/ (B) (C) E F (F#) G A B C (D) E', name: 'Equinox lowpygkurdorian mini' },
    { definition: 'C/ E G A B C D F# G', name: 'Golden Gate' },
    { definition: 'A/ (B) (C) (D) E F G# A B C D E (G#) A (B) (C)', name: 'Harmonic Lora' },
    { definition: 'E/ A B C D E F G# A', name: 'Harmonic minor' },
    { definition: 'A/ C D E F A C D E', name: 'High Avalon' },
    { definition: 'B/ E F G# A B C D E', name: 'Hijaz (Mercury)' },
    { definition: 'A/ E F G# A B C D E', name: 'Hijaz' },
    { definition: 'B/ E F G# A B C D D#', name: 'Hijaz Kar (Mercury)' },
    { definition: 'E/ B C D E F G# A B', name: 'Hijaz Major' },
    { definition: 'D/ A A# C D D# F# G A C D', name: 'Hijaz Tarznauyn' },
    { definition: 'A/ E F A B C D E', name: 'Insen' },
    { definition: 'A/ E F A B C D E F', name: 'Insen' },
    { definition: 'A/ E F G A B C E G', name: 'Integral (Mercury)' },
    { definition: 'A/ E F G A B C E F', name: 'Integral (Sam)' },
    { definition: 'D/ G A B C D E F G', name: 'Jibuk' },
    { definition: 'A/ (B) (C) D E F (G) G# A B C D E (F) A', name: 'Kamaji' },
    { definition: 'A/ E F G A B C D', name: 'Kurd' },
    { definition: 'A/ E F G A B C D E', name: 'Kurd' },
    { definition: 'A/ (C) (D) E F G A B C D E F G (A) (B) (C) (D)', name: 'Kurd extended' },
    { definition: 'A/ (F3) (G) (C) (D) E F G A B C D E F G A', name: 'Kurd extended (Gio)' },
    { definition: 'A/ (F3) (G) (B) (C) (D) E F G A B C D E F G A', name: 'Kurd extended (Gio)' },
    { definition: 'D/ F A B C D E F', name: 'La Sirena' },
    { definition: 'D/ F A B C D E F A', name: 'La Sirena' },
    { definition: 'A/ C E F A B C E', name: 'Low Mystic' },
    { definition: 'A/ B C E G A B C E', name: 'Low Pygmy' },
    { definition: 'A2/ A3 B C E G A B C', name: 'Low Pygmy Octave' },
    { definition: 'F/ C E F G A B C E', name: 'Lydian' },
    { definition: 'A/ C E G A B C E', name: 'Magic Voyage' },
    { definition: 'A/ C E G A B C E G', name: 'Magic Voyage' },
    { definition: 'C/ F G A B C D E', name: 'Major' },
    { definition: 'C/ F G A B C D E G', name: 'Major' },
    { definition: 'C/ E F G B C E F G', name: 'Melog Selisir' },
    { definition: 'A/ D E F A B C D', name: 'Minor' },
    { definition: 'A/ D E F A B C D E', name: 'Minor' },
    { definition: 'G/ D E F G A B D', name: 'Mixolydian (-4)' },
    { definition: 'G/ D E F G A B D E', name: 'Mixolydian (-4)' },
    { definition: 'G/ D E G A B C D E', name: 'Mixolydian (-7m)' },
    { definition: 'A/ E F A B C E G', name: 'Mystic (Hagane)' },
    { definition: 'A/ E F A B C D E G', name: 'Mystic (Sam)' },
    { definition: 'A/ E F A C# D E F A', name: 'Onoleo' },
    { definition: 'C/ E F G A C E F G', name: 'Oxalis' },
    { definition: 'C/ E G B C D E G', name: 'Paradise (v1)' },
    { definition: 'C/ E F G C D E G', name: 'Paradise (v2)' },
    { definition: 'C/ F G A C D F G A', name: 'Pentatonic Major' },
    { definition: 'A/ D E F A C D E F', name: 'Pygmy' },
    { definition: 'A/ E G A C# D E G A', name: 'Raga Desh' },
    { definition: 'A/ D E F G# A B C E', name: 'Romanian Hijaz' },
    { definition: 'A/ D E F G# A B C D E', name: 'Romanian Hijaz' },
    { definition: 'A/ C E F G# A B C E', name: 'Romanian mineur harmonique' },
    { definition: 'C/ (D) (E) F G A B C D E (F) G (A) (B) (C) (D)', name: 'Sabye' },
    { definition: 'A/ E F A B C D E A', name: 'Ursa minor' },
    { definition: 'C/ G B C D E F G C', name: 'Ysha Savita' },
] as PanScaleData[]

function transposeScales(customScales: PanScaleData[]): HandpanModel[] {
    return customScales.flatMap((customScale) => {
        return ALL_DINGS.map((ding) => {
            return definitionTransposedToHandpanObj(customScale.definition, ding, customScale.name)
        })
    })
}

const ALL_PANSCALES_TRANSPOSED = transposeScales(ALL_PANSCALES_DATA)

export function ALL_PANSCALES_TRANSPOSED_WITH_CUSTOM(customScales: any): HandpanModel[] {
    return [...ALL_PANSCALES_TRANSPOSED, ...transposeScales(customScales)]
}

export function definitionTransposedToHandpanObj(handpanDefinition: string, dingWanted: string = '', name: string = ''): HandpanModel {
    const [definitionDing, definitionRestNotes] = handpanDefinition.split('/')
    const definitionDingObj = splitNoteNameAndOctave(definitionDing, 3)
    const dingWantedObj = dingWanted ? splitNoteNameAndOctave(dingWanted) : definitionDingObj
    const transposeBy = semitonesDifference(
        definitionDingObj.noteName,
        definitionDingObj.octave!!,
        dingWantedObj.noteName,
        dingWantedObj.octave!!,
    )

    const handpanDing = {
        noteName: dingWantedObj.noteName,
        octave: dingWantedObj.octave!!,
        isDing: true,
        isBottom: false,
        isMutant: false,
    }
    let previousNoteOctave = dingWantedObj.octave!!
    let previousNoteIndex = NOTES_ALL.indexOf(dingWantedObj.noteName)
    const definitionNotesArray = definitionRestNotes.trim().replace(/\s\s+/g, ' ').split(' ')
    const handpanRestNotes = definitionNotesArray.map((noteOctaveParen) => {
        const noteOctave = noteOctaveParen.replace(/[()\[\]]/g, '')
        const noteObj = splitNoteNameAndOctave(noteOctave)
        const noteObjTransposed = transposeNoteObj(noteObj, transposeBy)
        const noteIndex = NOTES_ALL.indexOf(noteObjTransposed.noteName)
        const impliedOctave = noteIndex <= previousNoteIndex ? previousNoteOctave + 1 : previousNoteOctave
        const octave = noteObjTransposed.octave ? noteObjTransposed.octave : impliedOctave
        previousNoteOctave = octave
        previousNoteIndex = noteIndex
        return {
            noteName: noteObjTransposed.noteName,
            octave,
            isDing: false,
            isBottom: noteOctaveParen[0] === '(',
            isMutant: noteOctaveParen[0] === '[',
        }
    })
    const handpanNotes = [handpanDing, ...handpanRestNotes]
    const generatedHandpanModel = new HandpanModel(handpanNotes)
    if (name) {
        const nbTop = handpanRestNotes.filter((n) => !n.isBottom).length
        const nbBot = handpanRestNotes.filter((n) => n.isBottom).length
        const nbRecap = nbTop + (nbBot ? '+' + nbBot : '') + '+1'
        const genericName = name + ' ' + nbRecap
        const handpanFullName = handpanDing.noteName + (handpanDing.octave !== 3 ? handpanDing.octave : '') + ' ' + genericName
        generatedHandpanModel.name = handpanFullName
        generatedHandpanModel.genericName = genericName
    }
    return generatedHandpanModel
}
