import * as DATA from './data'
import { absToRel, genChords, genPanScales, relToAbsSharp, genScales, relToAbsFlat } from './music'

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
    notesTop: NoteDefinition[] = [] // [G#, A, B, C#, D#, E, F#, G#]
    notesBottom: NoteDefinition[] = [] // [A]
    notesAll: NoteDefinition[] = []
    chords: any[] = []
    panScales: any[] = []
    scales: any[] = []

    constructor() {
        this.id = new Date().getTime()
    }

    loadFromRelNotation(ding: string, relNotation: string) {
        this.ding = ding
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
        this.absNotationClean = this.ding + '/ ' + absNotes.join(' ')
        this.absNotationUser = this.ding.replace(/♯/g, '#').replace(/♭/g, 'b') + '/ ' + absNotes.join(' ').replace(/♯/g, '#').replace(/♭/g, 'b')
        this.genNotes(this.ding, absNotes as string[])
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
        this.ding = splitted[0].trim()
        this.absNotationClean = notesAsStringClean
        this.relNotation = absToRel(this.ding, notesAsStringClean)
        const notes = splitted[1].trim().split(' ').filter(Boolean)
        this.genNotes(this.ding, notes)
    }

    genNotes(ding: string, notes: string[]) {
        let octave = 3
        let previousNoteIndex = DATA.notesAll.indexOf(ding)
        this.notesAll = notes.map((noteName, index) => {
            const noteNameClean = noteName.replace(/\(/g, '').replace(/\)/g, '')
            const noteIndex = DATA.notesAll.indexOf(noteNameClean)
            if (noteIndex === -1) {
                throw new Error('Unknown note: ' + noteNameClean)
            }
            if (!previousNoteIndex) {
                previousNoteIndex = noteIndex
            }
            if (noteIndex < previousNoteIndex) {
                octave++
            }
            previousNoteIndex = noteIndex
            return {
                key: index,
                octave,
                name: noteNameClean,
                isBottom: noteName[0] === '(',
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
