import _ from 'lodash'
import * as DATA from './data'
import SONGS from './data/songs'
import { stringifyRecord, parseRecord } from './store/recorder'
import { HandpanUser, HandpanModel, HandpanNote } from '@/domain/handpan'

// Bb4 B4 A4 => A4 Bb4 B4
// A#4 B4 A4 => A4 A#4 B4
export function sortHandpanNotes(notes: HandpanNote[]): HandpanNote[] {
    return notes.sort((a: HandpanNote, b: HandpanNote) => {
        if (a.octave === b.octave) {
            return DATA.notesSharp.indexOf(flatToSharp(a.noteName)) - DATA.notesSharp.indexOf(flatToSharp(b.noteName))
        } else {
            return a.octave - b.octave
        }
    })
}

export function uniqueHandpanNotesAsString(notes: HandpanNote[]): string[] {
    return [...new Set(notes.map((note) => note.noteName + note.octave))]
}

// F5 => {noteName:'F', octave:5}
// F#5 => {noteName:'F#', octave:5}
// G# => {noteName:'G#'}
export function splitNoteNameAndOctave(noteNameAndOctave: string, defaultOctave: number = 0) {
    const noteNameAndOctaveMatched = /([A-G][#b]?)([0-9]?)/.exec(noteNameAndOctave)
    if (noteNameAndOctaveMatched === null) {
        throw new Error('Cannot read note: ' + noteNameAndOctaveMatched)
    }
    const noteName = noteNameAndOctaveMatched[1]
    const octave = noteNameAndOctaveMatched[2]
    if (octave) {
        return { noteName, octave: parseInt(octave, 10) }
    } else if (defaultOctave) {
        return { noteName, octave: defaultOctave }
    } else {
        return { noteName }
    }
}

// A => A
// A# => Bb
// Bb => A#
export function alternateFlatSharp(noteName: string): string {
    const indexSharp = DATA.notesSharp.indexOf(noteName)
    const indexFlat = DATA.notesFlat.indexOf(noteName)
    return indexSharp !== -1 ? DATA.notesFlat[indexSharp] : DATA.notesSharp[indexFlat]
}

// A => A
// A# => A#
// Bb => A#
export function flatToSharp(noteName: string): string {
    const indexFlat = DATA.notesFlat.indexOf(noteName)
    return indexFlat !== -1 ? DATA.notesSharp[indexFlat] : noteName
}

// A, 3m => C
// A, 3 => Db
export function relToAbsFlat(rootName: string, relDiff: any): string {
    const rootIndex = DATA.notesSharp.indexOf(rootName) !== -1 ? DATA.notesSharp.indexOf(rootName) : DATA.notesFlat.indexOf(rootName)
    if (rootIndex === -1) {
        throw new Error('Unknown note: ' + rootName)
    }
    const ecartIndex = DATA.ecarts.indexOf(relDiff)
    if (ecartIndex === -1) {
        throw new Error('Unknown interval: ' + relDiff)
    }
    return DATA.notesFlat[(rootIndex + ecartIndex + 12) % 12]
}

// A, 3m => C
// A, 3 => C#
export function relToAbsSharp(rootName: string, relDiff: any): string {
    const rootIndex = DATA.notesSharp.indexOf(rootName) !== -1 ? DATA.notesSharp.indexOf(rootName) : DATA.notesFlat.indexOf(rootName)
    if (rootIndex === -1) {
        throw new Error('Unknown note: ' + rootName)
    }
    const ecartIndex = DATA.ecarts.indexOf(relDiff)
    if (ecartIndex === -1) {
        throw new Error('Unknown interval: ' + relDiff)
    }
    return DATA.notesSharp[(rootIndex + ecartIndex + 12) % 12]
}

// A2, B2 => 2
// A2, A3 => 12
// A2, B3 => 14
// B2, C3 => 1
export function semitonesDifference(noteNameA: string, octaveA: number, noteNameB: string, octaveB: number): number {
    const indexA = DATA.notesSharp.indexOf(flatToSharp(noteNameA))
    const indexB = DATA.notesSharp.indexOf(flatToSharp(noteNameB))
    return octaveB * 12 + indexB - (octaveA * 12 + indexA)
}

// A, A => 1
// A, C => 3m
// A, C# => 3
export function absToRel(noteNameBase: string, noteName: string): string {
    const indexBase = DATA.notesSharp.indexOf(flatToSharp(noteNameBase))
    const indexNote = DATA.notesSharp.indexOf(flatToSharp(noteName))
    return DATA.ecarts[(12 + indexNote - indexBase) % 12]
}

// A, A / B C D => 1 / 2 3m 4
export function absToRelModel(ding: string, notesAsString: string): string {
    let indexOfDing = DATA.notesSharp.indexOf(ding)
    if (indexOfDing === -1) {
        indexOfDing = DATA.notesFlat.indexOf(ding)
    }
    const relatives = []
    for (let i = 0; i < 12; i++) {
        relatives.push(DATA.ecarts[(12 - indexOfDing + i) % 12])
    }
    let relStr = notesAsString + ' '
    for (let i = 0; i < 12; i++) {
        relStr = relStr.replace(new RegExp(DATA.notesSharp[i] + '[0-9]?([^#b])', 'g'), relatives[i] + '$1')
        relStr = relStr.replace(new RegExp(DATA.notesFlat[i] + '[0-9]?([^#b])', 'g'), relatives[i] + '$1')
    }
    return relStr.trim()
}

export const genChords = (uniqueNotes: any): any => {
    return DATA.chords.map((chordType) => {
        const chordsFound: any[] = []
        uniqueNotes.forEach((note: any) => {
            chordType.chords.forEach((chord) => {
                const chordNotes = chord.val.split(' ')
                const every = chordNotes.every((chordNote) => {
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

export const genPanScales = (allScales: HandpanModel[], handpans: HandpanUser[]): HandpanModel[] => {
    const potentialScales = handpans.flatMap((handpanUser) =>
        allScales.filter((panScale) => {
            return panScale.getDingString() === handpanUser.handpanModel.getDingString()
        }),
    )
    const containedScales = potentialScales.filter((potentialScale) => {
        return potentialScale.notes.every((potentialScaleNote) => {
            return handpans.find((handpan) =>
                handpan.handpanModel.notes.find(
                    (note) => note.noteName === potentialScaleNote.noteName && note.octave === potentialScaleNote.octave,
                ),
            )
        })
    })
    return _.uniqBy(containedScales, (s) => s.name)
}

export const genScales = (handpans: HandpanUser[], options: any): any[] => {
    const notesAllPans = handpans.flatMap((handpan) => handpan.handpanModel.notes.map((note) => note.noteName))
    const uniqueNotesAllPans = [...new Set(notesAllPans)]
    return uniqueNotesAllPans.flatMap((tonic) => {
        const scalesWithAbs = DATA.scales
            .filter((scale) => {
                if (!options.showBebop && scale.category === 'bebop') {
                    return false
                }
                return true
            })
            .map((scale) => {
                return { ...scale, absSharp: scale.ecarts.map((ecart) => relToAbsSharp(tonic, ecart)) }
            })
        return scalesWithAbs
            .filter((scale) => {
                // Pour chaque note de la gamme, je dois trouver dans uniqueNotesAllPans cette note ou la note inversée #b
                return scale.absSharp.every((note) => {
                    const otherNote = alternateFlatSharp(note)
                    return uniqueNotesAllPans.indexOf(note) !== -1 || uniqueNotesAllPans.indexOf(otherNote) !== -1
                })
            })
            .filter((scale) => {
                // Je dois avoir deux fois la tonic (règle à optioniser ping Anton Stanton)
                const otherTonic = alternateFlatSharp(tonic)
                return notesAllPans.filter((n) => n === tonic || n === otherTonic).length >= 2
            })
            .map((scale) => ({
                id: tonic + ' ' + scale.name,
                tonic,
                noteNames: scale.absSharp,
                name: scale.name,
                totalNotes: handpans
                    .flatMap((handpan) => handpan.handpanModel.notes.map((note) => note.noteName))
                    .filter((note) => {
                        const otherNote = alternateFlatSharp(note)
                        return scale.absSharp.indexOf(note) !== -1 || scale.absSharp.indexOf(otherNote) !== -1
                    }).length,
                special: scale.special ? relToAbsSharp(tonic, scale.special) : null,
            }))
    })
}

export const genSongs = (handpans: HandpanUser[]): any[] => {
    const uniqueNotesStringAllPans = handpans.flatMap((handpan) => handpan.handpanModel.getUniqueNotesString())
    return SONGS.flatMap((song) => {
        if (!song.notes) {
            return []
        }
        const results = []
        for (let i = -30; i < 20; i++) {
            const transposedNotes = transpose(song.notes, i)
            const songComplete = transposedNotes.every((note) => {
                return uniqueNotesStringAllPans.indexOf(note) >= 0
            })
            if (songComplete) {
                let recording = null
                if (song.recording) {
                    const parsedRecording = parseRecord(song.recording)
                    recording = stringifyRecord(
                        parsedRecording.record.map((rec: any) => ({ note: transposeNote(rec.note, i), time: rec.time })),
                        parsedRecording.endTime,
                    )
                }
                results.push({
                    category: song.category,
                    name: song.name,
                    recording,
                    notes: transposedNotes,
                    transpo: i,
                })
            }
        }
        return results
    })
}

// A1 B1 C2, 1 => A#1 C2 C#2
// A1 B1 C2, 2 => B1 C#2 D2
// A1 B1 C2, 3 => C2 D2 D#2
export const transpose = (notes: string[], semitones: number): string[] => {
    if (semitones === 0) {
        return notes
    }
    return notes.map((note) => {
        return transposeNote(note, semitones)
    })
}

// A1, 1 => A#1
// A1, 2 => B1
// A1, 3 => C2
export const transposeNote = (note: string, semitones: number): string => {
    if (semitones === 0) {
        return note
    }
    const { noteName, octave } = splitNoteNameAndOctave(note)
    if (!octave) {
        throw new Error('Octave missing: ' + note)
    }
    const result = transposeNoteObj({ noteName, octave }, semitones)
    return result.noteName + result.octave
}

// {A,1},1 => {A#,1}
// {A,1},2 => {B,1}
// {A,1},3 => {C,2}
export function transposeNoteObj(note: any, semitones: number): any {
    if (semitones === 0) {
        return note
    }
    const { noteName, octave } = note
    const noteNameSharp = flatToSharp(noteName)
    const noteIndex = DATA.notesSharp.indexOf(noteNameSharp)
    let newNoteIndex = noteIndex + semitones
    let newOctave = octave
    while (newNoteIndex < 0) {
        newNoteIndex += 12
        newOctave--
    }
    while (newNoteIndex >= 12) {
        newNoteIndex -= 12
        newOctave++
    }
    return { noteName: DATA.notesSharp[newNoteIndex], octave: newOctave }
}
