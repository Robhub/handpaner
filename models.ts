import * as DATA from './data'
import { absToRel, genChords, genPanScales, relToAbsSharp, genScales, relToAbsFlat, splitNoteNameAndOctave } from './music'

export interface NoteDefinition {
    key: number // 0
    octave: number // 3
    name: string // C#
    isBottom: boolean
}

export class Handpan {
    id: number
    absNotationUser = '' // C# / G# A B C# D# E F# G# (A)
    absNotationClean = '' // pareil mais avec les vrais #
    relNotation = '' // 1 / 5 6m 7m 1 2 3m 4 5 (6m)
    ding = '' // C#
    dingOctave = 3
    notesTop: NoteDefinition[] = [] // [G#, A, B, C#, D#, E, F#, G#]
    notesBottom: NoteDefinition[] = [] // [A]
    notesAll: NoteDefinition[] = []
    chords: any[] = []
    panScales: any[] = []
    scales: any[] = []

    constructor() {
        this.id = new Date().getTime()
    }

    loadFromRelNotation(ding: string, relNotation: string, dingOctave: number) {
        this.ding = ding
        this.dingOctave = dingOctave
        this.relNotation = relNotation
        const splitted = relNotation.split('/')
        if (splitted.length < 2) {
            return
        }
        const relNotes = splitted[1].trim().split(' ').filter(Boolean)
        const absNotes = relNotes.map(relNote => {
            const isBottom = relNote[0] === '('
            const relNoteClean = relNote.replace(/\(|\)/g, '')
            const preferSharp = DATA.notesSharp.indexOf(this.ding) !== -1
            const absNote = preferSharp ? relToAbsSharp(this.ding, relNoteClean) : relToAbsFlat(this.ding, relNoteClean)
            return isBottom ? '(' + absNote + ')' : absNote
        })
        const dingWithOctave = dingOctave === 3 ? this.ding : this.ding + dingOctave
        this.absNotationClean = dingWithOctave + '/ ' + absNotes.join(' ')
        this.absNotationUser = dingWithOctave.replace(/♯/g, '#').replace(/♭/g, 'b') + '/ ' + absNotes.join(' ').replace(/♯/g, '#').replace(/♭/g, 'b')
        this.genNotes(this.ding, absNotes as string[], dingOctave)
    }

    loadFromAbsNotation(absNotation: string) {
        this.absNotationUser = absNotation
        const notesAsStringClean = this.absNotationUser
            .replace(/#/g, '♯')
            .replace(/b/g, '♭')
            .replace(/ {1,}/g, ' ')
        const splitted = notesAsStringClean.split('/')
        if (splitted.length < 2) {
            return
        }
        const dingNameAndOctaveMatched = splitNoteNameAndOctave(splitted[0].trim())
        this.ding = dingNameAndOctaveMatched.noteName
        this.dingOctave = dingNameAndOctaveMatched.octave ? dingNameAndOctaveMatched.octave : 3
        this.absNotationClean = notesAsStringClean
        this.relNotation = absToRel(this.ding, notesAsStringClean)
        const notes = splitted[1].trim().split(' ').filter(Boolean)
        this.genNotes(this.ding, notes, 3) // TODO
    }

    genNotes(ding: string, notes: string[], dingOctave: number) {
        let octave = dingOctave
        let previousNoteIndex = DATA.notesAll.indexOf(ding)
        this.notesAll = notes.map((noteNameAndOctave, index) => {
            const noteNameAndOctaveClean = noteNameAndOctave.replace(/\(/g, '').replace(/\)/g, '')
            const noteNameAndOctaveMatched = splitNoteNameAndOctave(noteNameAndOctaveClean)
            const noteName = noteNameAndOctaveMatched.noteName
            const noteOctave = noteNameAndOctaveMatched.octave
            const noteIndex = DATA.notesAll.indexOf(noteName)
            if (noteIndex === -1) {
                throw new Error('Unknown note: ' + noteName)
            }
            if (!previousNoteIndex) {
                previousNoteIndex = noteIndex
            }
            if (noteOctave) {
                octave = noteOctave
            } else if (noteIndex < previousNoteIndex) {
                octave++
            }
            previousNoteIndex = noteIndex
            return {
                key: index,
                octave,
                name: noteName,
                isBottom: noteNameAndOctave[0] === '(',
            }
        })
        this.notesTop = this.notesAll.filter(note => !note.isBottom)
        this.notesBottom = this.notesAll.filter(note => note.isBottom)
    }

    getUniqueNotes() {
        return [...new Set(Array.from(this.absNotationClean.matchAll(/[A-G][♯♭]?/g)).map(m => m[0]))]
    }

    genChords(): void {
        this.chords = genChords(this.getUniqueNotes())
    }

    genPanScales(): void {
        this.panScales = genPanScales([this])
    }

    genScales(): void {
        this.scales = genScales([this])
    }
}
