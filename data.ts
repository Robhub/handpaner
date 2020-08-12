export const notesAll = ['C', 'C♯', 'D♭', 'D', 'D♯', 'E♭', 'E', 'F', 'F♯', 'G♭', 'G', 'G♯', 'A♭', 'A', 'A♯', 'B♭', 'B']
export const notesSharp = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
export const notesFlat = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']

// TODO : Générer les versions avec différent nombre de notes automatiquement..
export const panScales = [
    { val: '1/ 5 7m 1 2 3m 4 5', name: 'Amara 7+1' }, // = Celtic minor
    { val: '1/ 5 7m 1 2 3m 4 5 7m', name: 'Amara 8+1' }, // = Celtic minor
    { val: '1/ 3 5 7 1 3 T 5 7', name: 'Aegean 8+1' },
    { val: '1/ 4 5 6m 7m 1 2m 3m 4', name: 'Aeolian 8+1' },
    { val: '1/ 3m 4 7m 1 3m 4 5 7m', name: 'Chao Guo 8+1' },
    { val: '1/ 3m 5 6m 7m 1 2 3m', name: 'Equinox 7+1' },
    { val: '1/ 3m 5 6m 7m 1 2 3m 5', name: 'Equinox 8+1' },
    { val: '1/ 4 5 6m 7m 1 2m 3 4 5', name: 'Harmonic minor 8+1' },
    { val: '1/ 5 6m 7 1 2 3m 4 5', name: 'Hijaz 8+1' },
    { val: '1/ 4 T 6 7m 1 2m 3m 4', name: 'Hijaz (Mercury) 8+1' },
    { val: '1/ 4 T 6 7m 1 2m 3m 3', name: 'Hijaz Kar (Mercury) 8+1' },
    { val: '1/ 5 6m 1 2 3m 4 5', name: 'Insen 7+1' },
    { val: '1/ 5 6m 1 2 3m 4 5 6m', name: 'Insen 8+1' },
    { val: '1/ 5 6m 7m 1 2 3m 5 7m', name: 'Integral (Mercury) 8+1' },
    { val: '1/ 5 6m 7m 1 2 3m 5 6m', name: 'Integral (Sam) 8+1' },
    { val: '1/ 4 5 6 7m 1 2 3m 4', name: 'Jibuk 8+1' },
    { val: '1/ 5 6 1 2 3 4 5 1', name: 'Anahata' },
    { val: '1/ 4 5 6m 1 2 3m 4', name: 'Minor 7+1' }, // Pas de 7m ??
    { val: '1/ 4 5 6m 1 2 3m 4 5', name: 'Minor 8+1' }, // Pas de 7m ??
    { val: '1/ 5 6m 7m 1 2 3m 4', name: 'Kurd 7+1' }, // = Annaziska
    { val: '1/ 5 6m 7m 1 2 3m 4 5', name: 'Kurd 8+1' }, // = Annaziska
    { val: '1/ 3m 5 6 7m 1 2 3m', name: 'La Sirena 7+1' },
    { val: '1/ 3m 5 6 7m 1 2 3m 5', name: 'La Sirena 8+1' },
    { val: '1/ 3m 5 7m 1 2 3m 5', name: 'Magic Voyage 7+1' },
    { val: '1/ 3m 5 7m 1 2 3m 5 7m', name: 'Magic Voyage 8+1' },
    { val: '1/ 4 5 6 7 1 2 3', name: 'Major 7+1' },
    { val: '1/ 4 5 6 7 1 2 3 5', name: 'Major 8+1' }, // = Sabyie
    { val: '1/ 3 4 5 7 1 3 4 5', name: 'Melog Selisir 8+1' },
    { val: '1/ 3m 5 6m 1 2 3m 5', name: 'Mystic (Mercury) 7+1' },
    { val: '1/ 5 6m 1 2 3m 4 5 7m', name: 'Mystic (Sam) 8+1' },
    { val: '1/ 5 6 7m 1 2 3 5', name: 'Mixolydian 7+1' },
    { val: '1/ 5 6 7m 1 2 3 5 6', name: 'Mixolydian 8+1' },
    { val: '1/ 3 4 5 6 1 3 4 5', name: 'Oxalis 8+1' },
    { val: '1/ 4 5 6m 1 3m 4 5 6m', name: 'Pygmy 8+1' },
    { val: '1/ 2 3m 5 7m 1 2 3m 5', name: 'Low Pygmy 8+1' },
    { val: '1/ 5 7m 1 2m 3 4 5 7m', name: 'Raga Desh 8+1' }, // = Binnha
    { val: '1/ 4 5 6m 7 1 2 3m 5', name: 'Romanian Hijaz 8+1' },
    { val: '1/ 3m 5 6m 7 1 2 3m 5', name: 'Romanian Mineur harmonique 8+1' },
    { val: '1/ 4 5 6m 1 2m 4 5 6m', name: 'Akebono 8+1' }, // = Goon Kali
    { val: '1/ 5 7 1 2 3 4 5 1', name: 'Ysha Savita 8+1' },
    { val: '1/ 5 6m 1 3 4 5 6m 1', name: 'Onoleo 8+1' },
    { val: '1/ 5 7 1 2 3 T 5 7', name: 'Lydian' },
]
export const scales = [
    // ==== OCTATONIC
    { name: 'Bebop major', ecarts: ['1', '2', '3', '4', '5', '6m', '6', '7'], special: '6m' },
    { name: 'Bebop dorian', ecarts: ['1', '2', '3m', '3', '4', '5', '6', '7m'], special: '3' },
    { name: 'Bebop dominant', ecarts: ['1', '2', '3', '4', '5', '6', '7m', '7'], special: '7' },
    // { name: 'Bebop mindor??', ecarts: ['1', '2', '3m', '4', '5', '6m', '6', '7m']},
    { name: 'Bebop phrygian dominant', ecarts: ['1', '2m', '3', '4', '5', '6m', '7m', '7'] },
    { name: 'Bebop locrian', ecarts: ['1', '2m', '3m', '4', 'T', '5', '6m', '7m'], special: '5' },
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
    { name: 'Phrygian dominant/Hijaz', ecarts: ['1', '2m', '3', '4', '5', '6m', '7m'], special: '3' },
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
    'F♯2',
    'G2',
    'G♯2',
    'A2',
    'A♯2',
    'B2',
    'C3',
    'C♯3',
    'D3',
    'D♯3',
    'E3',
    'F3',
    'F♯3',
    'G3',
    'G♯3',
    'A3',
    'A♯3',
    'B3',
    'C4',
    'C♯4',
    'D4',
    'D♯4',
    'E4',
    'F4',
    'F♯4',
    'G4',
    'G♯4',
    'A4',
    'A♯4',
    'B4',
    'C5',
    'C♯5',
    'D5',
    'D♯5',
    'E5',
    'F5',
    'F♯5',
    'G5',
    'G♯5',
    'A5',
]
export const samplesDispoVarious = [
    'C3',
    'C♯3',
    'D3',
    'E3',
    'F3',
    'G3',
    'G♯3',
    'A3',
    'B3',
    'C4',
    'C♯4',
    'D4',
    'D♯4',
    'E4',
    'F4',
    'F♯4',
    'G4',
    'G♯4',
    'A4',
    'A♯4',
    'B4',
    'C5',
]

export const samplesBanks = [
    { name: 'Shellopan', website: 'www.shellopan.fr', folder: 'shellopan', samplesDispo: samplesDispoShello, buffer: {} as any, logo: 'shellopan_sm.png' },
    { name: 'Various', folder: 'various', samplesDispo: samplesDispoVarious, buffer: {} as any },
]
