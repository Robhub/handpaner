<template>
    <div>
        <h1>About</h1>
        <div>
            Handpaner is an <a href="https://github.com/Robhub/handpaner">open source</a> project developped with ♥ by
            <a href="https://rojb.net/">Robin BERGÈRE</a>.
        </div>
        <div>Stay in touch and contact me though <a href="https://www.facebook.com/Handpaner/">Handpaner page on Facebook</a>.</div>
        <div v-if="isWeb">
            Android users can download
            <a href="https://play.google.com/store/apps/details?id=com.handpaner.pro">Handpaner on Google Play</a>, iOS version is coming
            later.
        </div>
        <div v-if="isWeb">You can support development with a <a href="https://paypal.me/robinbergere">donation</a>, thank you.</div>
        <h2>Credits</h2>
        Big thanks to the people who helped Handpaner !
        <ul>
            <li>Samples recorded by Matthieu from <a href="https://shellopan.fr/">Shellopan</a></li>
            <li>Logo drawn by <a href="https://julieguerrierepacifique.com/">Julie, guerrière pacifique</a></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Capacitor } from '@capacitor/core'
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            isWeb: false,
        }
    },
    mounted() {
        this.isWeb = Capacitor.getPlatform() === 'web'
    },
})
</script>
