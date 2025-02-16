<template>
    <div class="layout-default">
        <div class="header">
            <nuxt-link to="/"><img src="../static/handpaner.png" /></nuxt-link>
            <div class="menu" :class="{ 'is-open': menuOpened }">
                <nuxt-link to="/">Home</nuxt-link>
                <nuxt-link to="help">Help</nuxt-link>
                <nuxt-link to="options">Options</nuxt-link>
                <nuxt-link to="about">About</nuxt-link>
            </div>
            <div class="burger" ref="burger" @click="toggleMenu()">☰</div>
        </div>
        <nuxt />
        <div class="overlay" v-if="menuOpened"></div>
        <div class="footer" v-if="isWeb && !hideFooter">
            <a href="https://play.google.com/store/apps/details?id=com.handpaner.pro" target="_blank"
                ><img src="~/assets/google-play-sm.png"
            /></a>
            <a href="https://www.facebook.com/Handpaner/" target="_blank"><img src="~/assets/facebook-sm.png" /><span>Handpaner</span></a>
        </div>
    </div>
</template>

<script lang="ts">
import { Capacitor } from '@capacitor/core'
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            menuOpened: false,
            isWeb: false,
        }
    },
    mounted() {
        // TODO : ces data ne devraient pas être enregistrées dans le localstorage...
        this.$store.commit('selection/setSelectedPanScale', null)
        this.$store.commit('player/setRecordPlaying', null)
        this.isWeb = Capacitor.getPlatform() === 'web'
        document.addEventListener('click', this.onClickDocument)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.onClickDocument)
    },
    computed: {
        hideFooter(): boolean {
            return this.$store.state.options.hideFooter
        },
    },
    methods: {
        toggleMenu() {
            this.menuOpened = !this.menuOpened
        },
        onClickDocument(evt: MouseEvent) {
            if (evt.target !== this.$refs.burger) {
                this.menuOpened = false
            }
        },
    },
})
</script>

<style>
body {
    font-family: sans-serif;
    background: #f5f5f5;
}

.header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.toggle {
    font-size: 32px;
}

h1,
h2,
h3 {
    margin: 16px 0 4px 0;
}

.layout-default {
    margin: auto;
    border-radius: 3px;
    padding: 8px;
    --deg: 174deg;
    --nbnotes: 6;
}
.burger {
    text-align: center;
    cursor: pointer;
    position: absolute;
    width: 60px;
    height: 40px;
    right: 0;
    font-size: 26px;
}
.burger:hover {
    color: #0cc;
}
@media screen and (min-width: 500px) {
    .menu > * {
        padding: 20px;
        margin: 0 10px;
        font-size: 20px;
        font-weight: bold;
    }
    .burger {
        display: none;
    }
    .layout-default {
        max-width: 1000px;
        padding: 16px;
    }
}
@media screen and (max-width: 500px) {
    .menu:not(.is-open) {
        display: none;
    }
    .menu {
        position: absolute;
        right: 0;
        top: 100%;
        z-index: 1;
        display: flex;
        flex-direction: column;
        background: white;
        border: 1px solid black;
        font-size: 18px;
        font-weight: bold;
    }
    .menu > * {
        padding: 18px 50px;
    }
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 0;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
.footer a {
    margin: 0 10px;
    display: flex;
    align-items: center;
}
.footer span {
    margin-left: 5px;
}
</style>
