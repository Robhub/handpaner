import { notesAll } from './data'
import { absToRel, genChords, genPanScales, relToAbsSharp } from './music'

export interface NoteDefinition {
    key: number // 0
    octave: number // 3
    name: string // C#
    isBottom: boolean
}

export class Handpan {
    absNotationUser = '' // C# / G# A B C# D# E F# G# (A)
    absNotationClean = '' // pareil mais avec les vrais #
    relNotation = '' // 1 / 5 6m 7m 1 2 3m 4 5 (6m)
    ding = '' // C#
    notesTop: NoteDefinition[] = [] // [G#, A, B, C#, D#, E, F#, G#]
    notesBottom: NoteDefinition[] = [] // [A]
    notesAll: NoteDefinition[] = []
    chords: any[] = []
    panScales: any[] = []

    loadFromRelNotation(ding: string, relNotation: string) {
        this.ding = ding
        this.relNotation = relNotation
        const splitted = relNotation.split('/')
        if (splitted.length < 2) {
            return
        }
        const relNotes = splitted[1].trim().split(' ')
        const absNotes = relNotes.map(relNote => {
            return relToAbsSharp(this.ding, relNote)
        })
        this.absNotationClean = this.ding + '/ ' + absNotes.join(' ')
        this.absNotationUser = this.ding + '/ ' + absNotes.join(' ').replace(/♯/g, '#').replace(/♭/g, 'b')
        this.genNotes(absNotes as string[])
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
        const notes = splitted[1].trim().split(' ')
        this.genNotes(notes)
    }

    genNotes(notes: string[]) {
        let octave = 3
        let previousNoteIndex: number
        this.notesAll = notes.map((noteName, index) => {
            const noteNameClean = noteName.replace(/\(/g, '').replace(/\)/g, '')
            const noteIndex = notesAll.indexOf(noteNameClean)
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

    genChords() {
        const uniqueNotes = [...new Set(Array.from(this.absNotationClean.matchAll(/[A-G][♯♭]?/g)).map(m => m[0]))]
        this.chords = genChords(uniqueNotes)
    }

    genPanScales() {
        this.panScales = genPanScales(this)
    }
}
