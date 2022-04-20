<template>
    <div>
        <h1>Help</h1>
        <h2>Colors</h2>
        <ul>
            <li>
                <span style="color:#0ff">CYAN</span> = Ding and octaves of ding for handpan models, tonic/root note for scales and chords.
            </li>
            <li>
                <span style="color:#0f0">GREEN</span> = Note belonging to the handpan model/scale/chord, note played at least once for the
                songs.
            </li>
            <li>
                <span style="color:#ff0">YELLOW</span> = Note which is not in the handpan model, but exists in the model at a different
                octave, and should logically complete the model and sound good.
            </li>
        </ul>
        <h2>Features</h2>
        <div>
            At any time you can select another Ding and it will transpose the current sound model to this particular ding tonality. You can
            also edit the notes input field and the sound model will change in realtime.
	    <br/>
	    <br/>
            To add bottom notes, put each note individually in parenthesis ( ). For example D/ (G) A B C D E F G A (B) (C).
            <br/>
            <br/>
            To add mutant notes (Cyclops), put each note individually in square brackets [ ]. For example, E/ A B C# D# E F# G# B C# [D#] [E].
            <br/>
            <br/>
            You can also specify the octave by putting a number after the note letter. In case you want to add a bottom note which is lower than the ding, then you have to add the note with octacve number in paranthesis after the ding. For example, the notes of a handpan with D3 ding and having C3 as bottom note can be input as  D/ (C3) A B C D E F G A. 
        </div>
        <h2>Model</h2>
        <div>
            A handpan sound model is defined by a specific set of notes at specific octaves. Naming handpan sound models is more difficult
            than naming regular music scales because of the physical constraints: the number of notes is quite limited and there is a
            central note (the ding), which is not always the tonic/root of the standard music scale it is named after. For example, the Kurd
            scale is named after the first note of the tone field corresponding to the Phrygian scale. The celtic minor scale however, is
            named after the ding corresponding to the Hexatonic minor scale.
        </div>
        <h2>Scale</h2>
        <div>
            A standard musical scale is defined by a set of notes, which can be played at any octaves. The C Major scale is defined by the
            notes C D E F G A B, where C is the root/tonic. The A Minor scale is defined by the notes A B C D E F G, where A is the
            root/tonic. Every note can then be thought in term of its interval from the root/tonic. The major scale is composed of the
            following intervals: 1 2 3 4 5 6 7 (unison, major second, major third, perfect fourth, perfect fifth, major sixth, major
            seventh). The minor scale is composed of the following intervals: 1 2 3m 4 5 6m 7m (unison, major second, minor third, perfect
            fourth, perfect fifth, minor sixth, minor seventh).
        </div>
        <h2>Chord</h2>
        <div>
            A chord is also a set of notes, which can be played at any octaves, just like a scale. The particularity is that it has fewer
            notes (usually 3 or 4), but with the added benefit that all these notes sound good together and can be played at the same time.
        </div>
        <h2>Songs</h2>
        <div>
            I have put together a small set of songs, playable songs have a small music note icon next to it : just click on a song name and
            a button to start playing it will appear. The number in parenthesis is the number of semitones transposition from its original
            tonality. I have mainly generated these songs through <a href="https://abcnotation.com/">ABC Notation</a>. If you want to help
            me build this database, send me songs in this format (you can use <a href="https://editor.drawthedots.com/">this editor</a> as a
            playground).
        </div>
    </div>
</template>
