export const notesAll = ['C', 'C♯', 'D♭', 'D', 'D♯', 'E♭', 'E', 'F', 'F♯', 'G♭', 'G', 'G♯', 'A♭', 'A', 'A♯', 'B♭', 'B']

// TODO : Générer les versions avec différent nombre de notes automatiquement..
export const panScales = [
    { val: '1/ 5 7m 1 2 3m 4 5', name: 'Amara 8' }, // = Celtic minor
    { val: '1/ 5 7m 1 2 3m 4 5 7m', name: 'Amara 9' }, // = Celtic minor
    { val: '1/ 3 5 7 1 3 T 5 7', name: 'Aegean 9' },
    { val: '1/ 4 5 6m 7m 1 2m 3m 4', name: 'Aeolian 9' },
    { val: '1/ 3m 4 7m 1 3m 4 5 7m', name: 'Chao Guo 9' },
    { val: '1/ 3m 5 6m 7m 1 2 3m', name: 'Equinox 8' },
    { val: '1/ 3m 5 6m 7m 1 2 3m 5', name: 'Equinox 9' },
    { val: '1/ 5 6m 7 1 2 3m 4 5', name: 'Hijaz (Sam) 9' },
    { val: '1/ 4 T 6 7m 1 2m 3m 4', name: 'Hijaz (Mercury) 9' },
    { val: '1/ 4 T 6 7m 1 2m 3m 3', name: 'Hijaz Kar (Mercury) 9' },
    { val: '1/ 5 6m 1 2 3m 4 5', name: 'Insen 8' },
    { val: '1/ 5 6m 1 2 3m 4 5 6m', name: 'Insen 9' },
    { val: '1/ 5 6m 7m 1 2 3m 5 7m', name: 'Integral (Mercury) 9' },
    { val: '1/ 5 6m 7m 1 2 3m 5 6m', name: 'Integral (Sam) 9' },
    { val: '1/ 4 5 6 7m 1 2 3m 4', name: 'Jibuk 9' },
    { val: '1/ 4 5 6m 1 2 3m 4', name: 'Minor 8' }, // Pas de 7m ??
    { val: '1/ 4 5 6m 1 2 3m 4 5', name: 'Minor 9' }, // Pas de 7m ??
    { val: '1/ 5 6m 7m 1 2 3m 4', name: 'Kurd 8' }, // = Annaziska
    { val: '1/ 5 6m 7m 1 2 3m 4 5', name: 'Kurd 9' }, // = Annaziska
    { val: '1/ 3m 5 6 7m 1 2 3m', name: 'La Sirena 8' },
    { val: '1/ 3m 5 6 7m 1 2 3m 5', name: 'La Sirena 9' },
    { val: '1/ 3m 5 7m 1 2 3m 5', name: 'Magic Voyage 8' },
    { val: '1/ 3m 5 7m 1 2 3m 5 7m', name: 'Magic Voyage 9' },
    { val: '1/ 4 5 6 7 1 2 3', name: 'Major 8' },
    { val: '1/ 4 5 6 7 1 2 3 5', name: 'Major 9' }, // = Sabyie
    { val: '1/ 3 4 5 7 1 3 4 5', name: 'Melog Selisir 9' },
    { val: '1/ 3m 5 6m 1 2 3m 5', name: 'Mystic (Mercury) 8' },
    { val: '1/ 5 6m 1 2 3m 4 5 7m', name: 'Mystic (Sam) 9' },
    { val: '1/ 5 6 7m 1 2 3 5', name: 'Mixolydian 8' },
    { val: '1/ 5 6 7m 1 2 3 5 6', name: 'Mixolydian 9' },
    { val: '1/ 3 4 5 6 1 3 4 5', name: 'Oxalis 9' },
    { val: '1/ 4 5 6m 1 3m 4 5 6m', name: 'Pygmy (Mercury) 9' },
    { val: '1/ 2 3m 5 7m 1 2 3m 5', name: 'Pygmy (Sam) 9' },
    { val: '1/ 5 7m 1 2m 3 4 5 7m', name: 'Raga Desh 9' }, // = Binnha
    { val: '1/ 4 5 6m 7 1 2 3m 5', name: 'Romanian Hijaz 9' },
    { val: '1/ 4 5 6m 1 2m 4 5 6m', name: 'Akebono 9'}, // = Goon Kali
    { val: '1/ 5 7 1 2 3 4 5 1', name: 'Ysha Savita 9'},
    { val: '1/ 5 6m 1 3 4 5 6m 1', name: 'Onoleo 9'},
    { val: '1/ 5 7 1 2 3 T 5 7', name: 'Lydian'},

]
export const scales = [
    { nom: 'Phrygian', ecarts: ['1', '2m', '3m', '5', '6m', '7m'] },
    { nom: 'Minor/Aeolian', ecarts: ['1', '2', '3m', '5', '6m', '7m'] },
    { nom: 'Dorian', ecarts: ['1', '2', '3m', '5', '6', '7m'] },
    { nom: 'Mixolydian', ecarts: ['1', '2', '3', '5', '6', '7m'] },
    { nom: 'Major', ecarts: ['1', '2', '3', '5', '6', '7'] },
]
export const notesSharp = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
export const notesFlat = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
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
            { val: '1 3 5 7M', name: 'Major seventh', abbr: 'M⁷' },
            { val: '1 3m 5 7m', name: 'Minor seventh', abbr: 'm⁷' },
        ],
    },
    {
        type: 'sus',
        chords: [
            { val: '1 4 5', name: 'Suspended 4', abbr: '<sup>sus4</sup>' },
        ],
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
