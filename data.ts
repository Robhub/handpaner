export const notesAll = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']
export const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export const scales = [
    // ==== OCTATONIC
    { name: 'Bebop major', ecarts: ['1', '2', '3', '4', '5', '6m', '6', '7'], special: '6m', category: 'bebop' },
    { name: 'Bebop dorian', ecarts: ['1', '2', '3m', '3', '4', '5', '6', '7m'], special: '3', category: 'bebop' },
    { name: 'Bebop dominant', ecarts: ['1', '2', '3', '4', '5', '6', '7m', '7'], special: '7', category: 'bebop' },
    // { name: 'Bebop mindor??', ecarts: ['1', '2', '3m', '4', '5', '6m', '6', '7m']},
    { name: 'Bebop phrygian dominant', ecarts: ['1', '2m', '3', '4', '5', '6m', '7m', '7'], special: '7', category: 'bebop' },
    { name: 'Bebop locrian', ecarts: ['1', '2m', '3m', '4', 'T', '5', '6m', '7m'], special: '5', category: 'bebop' },
    // TODO : les autres Bebop

    // ==== HEPTATONIC
    { name: 'Major/Ionian', ecarts: ['1', '2', '3', '4', '5', '6', '7'] },
    { name: 'Dorian', ecarts: ['1', '2', '3m', '4', '5', '6', '7m'], special: '6' },
    { name: 'Phrygian', ecarts: ['1', '2m', '3m', '4', '5', '6m', '7m'], special: '2m' },
    { name: 'Lydian', ecarts: ['1', '2', '3', 'T', '5', '6', '7'], special: 'T' },
    { name: 'Mixolydian', ecarts: ['1', '2', '3', '4', '5', '6', '7m'], special: '7m' },
    { name: 'Minor/Aeolian', ecarts: ['1', '2', '3m', '4', '5', '6m', '7m'] },
    { name: 'Locrian', ecarts: ['1', '2m', '3m', '4', 'T', '6m', '7m'] },

    { name: 'Harmonic minor', ecarts: ['1', '2', '3m', '4', '5', '6m', '7'], special: '7' },
    { name: 'Phrygian dominant/Hijaz', ecarts: ['1', '2m', '3', '4', '5', '6m', '7m'], special: '3' }, // 5eme mode Phrygian Major, Balkan, Spanish Gipsy, Ahava Rabah
    { name: 'Romanian minor/Ukrainian dorian', ecarts: ['1', '2', '3m', 'T', '5', '6', '7m'], special: 'T' }, // 4eme mode (Dorian #4)
    // TODO : autres modes harmoniques mineur ?

    // TODO : mélodique mineur ??
    { name: 'Melodic minor (asc)', ecarts: ['1', '2', '3m', '4', '5', '6', '7'], special: '3m' },

    // ==== HEXATONIC
    { name: 'Hexatonic major', ecarts: ['1', '2', '3', '4', '5', '6'] },
    { name: 'Hexatonic major Blues', ecarts: ['1', '2', '3m', '3', '5', '6'], special: '3m' },
    { name: 'Hexatonic minor', ecarts: ['1', '2', '3m', '4', '5', '7m'] },
    { name: 'Hexatonic minor Blues T', ecarts: ['1', '3m', '4', 'T', '5', '7m'], special: 'T' },
    { name: 'Hexatonic minor Blues 3', ecarts: ['1', '3m', '3', '4', '5', '7m'], special: '3' },

    // ==== PENTATONIC
    { name: 'Pentatonic major', ecarts: ['1', '2', '3', '5', '6'] },
    { name: 'Pentatonic minor', ecarts: ['1', '3m', '4', '5', '7m'] },
    { name: 'Hirajoshi', ecarts: ['1', '2', '3m', '5', '6m'] },
    { name: 'Iwato', ecarts: ['1', '2m', '4', 'T', '7m'] },
    { name: 'Insen', ecarts: ['1', '2m', '4', '5', '7m'] },
    { name: 'Yo', ecarts: ['1', '2', '4', '5', '6'] },

    // Dorian pentatonic
    { name: 'Kumoï', ecarts: ['1', '2', '3m', '5', '6'] },
    { name: 'Pygmy', ecarts: ['1', '2', '3m', '5', '7m'] },
]
// https://musicstudent101.com/67-hexatonic-scales.html
// https://www.scales-chords.com/scalefinder.php
// https://scottdavies.net/chords_and_scales/music.html
// https://www.jazz-guitar-licks.com/pages/guitar-scales-modes/pentatonic-scales/

export const ecarts = ['1', '2m', '2', '3m', '3', '4', 'T', '5', '6m', '6', '7m', '7']
export const chords = [
    {
        type: 'maj',
        chords: [{ val: '1 3 5', name: 'Major', abbr: '' }],
    },
    {
        type: 'min',
        chords: [{ val: '1 3m 5', name: 'Minor', abbr: 'm' }],
    },
    {
        type: '5th',
        chords: [{ val: '1 5', name: 'Fifth', abbr: '⁵' }],
    },
    {
        type: '7th',
        chords: [
            { val: '1 3 5 7m', name: 'Dominant seventh', abbr: '⁷' },
            { val: '1 3 5 7', name: 'Major seventh', abbr: 'M⁷' },
            { val: '1 3m 5 7m', name: 'Minor seventh', abbr: 'm⁷' },
        ],
    },
    {
        type: 'sus',
        chords: [{ val: '1 4 5', name: 'Suspended 4', abbr: '<sup>sus4</sup>' }],
    },
    {
        type: 'bad',
        chords: [
            { val: '1 2m', name: 'second minor', abbr: 'm²' },
            { val: '1 T', name: 'tritone', abbr: '<sub>tt</sub>' },
            { val: '1 3m T', name: 'Diminished', abbr: '<sub>dim</sub>' },
        ],
    },
]

export const samplesDispoShello = [
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
    'C4',
    'C#4',
    'D4',
    'D#4',
    'E4',
    'F4',
    'F#4',
    'G4',
    'G#4',
    'A4',
    'A#4',
    'B4',
    'C5',
    'C#5',
    'D5',
    'D#5',
    'E5',
    'F5',
    'F#5',
    'G5',
    'G#5',
    'A5',
]
export const samplesDispoVarious = [
    'C3',
    'C#3',
    'D3',
    'E3',
    'F3',
    'G3',
    'G#3',
    'A3',
    'B3',
    'C4',
    'C#4',
    'D4',
    'D#4',
    'E4',
    'F4',
    'F#4',
    'G4',
    'G#4',
    'A4',
    'A#4',
    'B4',
    'C5',
]

export const samplesBanks = [
    {
        name: 'Shellopan',
        website: 'www.shellopan.fr',
        folder: 'shellopan',
        samplesDispo: samplesDispoShello,
        buffer: {} as any,
        logo: '/shellopan_sm.png',
    },
    { name: 'Various', folder: 'various', samplesDispo: samplesDispoVarious, buffer: {} as any },
]
