<template>
    <div>
        <nuxt />
        <footer>
            Handpaner is an <a href="//github.com/Robhub/handpaner">open source</a> project developped with ♥ by
            <a href="//rojb.net/">Robin BERGÈRE</a>.
            <span v-if="showDonationLink" class="support"
                >You can support this project's devlopment with a <a href="https://paypal.me/robinbergere">donation</a>, thank you.</span
            >
        </footer>
    </div>
</template>

<script lang="ts">
import { Capacitor } from '@capacitor/core'
import Vue from 'vue'
export default Vue.extend({
    computed: {
        showDonationLink(): boolean {
            return Capacitor.getPlatform() === 'web' || !Capacitor.isNative
        }
    }
})
</script>

<style>
body {
    font-family: sans-serif;
    background: #f5f5f5;
}

h1,
h2,
h3 {
    margin: 16px 0 4px 0;
}

#app {
    margin: auto;
    border-radius: 3px;
    padding: 8px;
    --deg: 90deg;
    --nbnotes: 6;
}
footer {
    margin-top: 24px;
    text-align: center;
    font-size: 10px;
}
@media screen and (min-width: 500px) {
    #app {
        max-width: 1000px;
        padding: 16px;
    }
}
@media screen and (max-width: 500px) {
    .support {
        display: block;
    }
}
</style>
