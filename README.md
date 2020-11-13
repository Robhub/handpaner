# handpaner

Handpaner is a tool for Hang/Handpan players and makers to help them finding scales and chords with musical harmony theory.

Available on https://handpaner.com

## running on Android

Put this in capacitor.config.json with your local network ip (but do not commit this) :
```
"server": {
  "url": "http://192.168.1.34:3000",
  "cleartext": true
},
```
npx cap copy android
npm run android
npm run dev
