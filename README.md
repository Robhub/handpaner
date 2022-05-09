# handpaner

Handpaner is a tool for Hang/Handpan players and makers to help them finding scales and chords with musical harmony theory.

Available on https://handpaner.com

## Contributing

### Model
A handpan sound model is defined by a specific set of notes at specific octaves. Naming handpan sound models is more difficult than naming regular music scales because of the physical constraints: the number of notes is quite limited and there is a central note (the ding), which is not always the tonic/root of the standard music scale it is named after. For example, the Kurd scale is named after the first note of the tone field corresponding to the Phrygian scale. The celtic minor scale however, is named after the ding corresponding to the Hexatonic minor scale.

`domain/handpan.ts`

### Scale
A standard musical scale is defined by a set of notes, which can be played at any octaves. The C Major scale is defined by the notes C D E F G A B, where C is the root/tonic. The A Minor scale is defined by the notes A B C D E F G, where A is the root/tonic. Every note can then be thought in term of its interval from the root/tonic. The major scale is composed of the following intervals: 1 2 3 4 5 6 7 (unison, major second, major third, perfect fourth, perfect fifth, major sixth, major seventh). The minor scale is composed of the following intervals: 1 2 3m 4 5 6m 7m (unison, major second, minor third, perfect fourth, perfect fifth, minor sixth, minor seventh).

`data.ts`

### Chord
A chord is also a set of notes, which can be played at any octaves, just like a scale. The particularity is that it has fewer notes (usually 3 or 4), but with the added benefit that all these notes sound good together and can be played at the same time.

`data.ts`

### Songs
I have put together a small set of songs, playable songs have a small music note icon next to it : just click on a song name and a button to start playing it will appear. The number in parenthesis is the number of semitones transposition from its original tonality. I have mainly generated these songs through ABC Notation. If you want to help me build this database, send me songs in this format (you can use this editor as a playground).

`data/songs.ts`

### Samples

`static/<Handpan manufactor>/<key>.flac` + `data.ts`

## running Locally
`npm install`

`npm run dev`

## Android
Android relies on Android Studio (or, optionally, the Android CLI tools) to build the app:

Put this in capacitor.config.json with your local network ip (but do not commit this) :
```
"server": {
  "url": "http://192.168.1.34:3000",
  "cleartext": true
},
```

`npm run android-build`

`npm run android`

Once Android Studio launches, you can build your app through the standard Android Studio workflow.

Prebuild APK can be found on `static/handpaner.apk`.
