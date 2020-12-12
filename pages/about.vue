<template>
    <div>
        <h1>About</h1>
        Handpaner is an <a href="//github.com/Robhub/handpaner">open source</a> project developped with ♥ by
        <a href="//rojb.net/">Robin BERGÈRE</a>.
        <div v-if="showDonationLink" class="support">
            You can support development with a <a href="https://paypal.me/robinbergere">donation</a>, thank you.
        </div>

        <h2>Credits</h2>
        Big thanks to the people who helped Handpaner !
        <ul>
            <li>Samples recorded by <a href="https://shellopan.fr/">Shellopan</a></li>
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
            showDonationLink: false,
        }
    },
    mounted() {
        this.showDonationLink = Capacitor.getPlatform() === 'web'
    },
})
</script>
