<template>
    <div class="select-speed">
        Playback speed:&nbsp;
        <select v-model="volume">
            <option :value="0.1">10%</option>
            <option :value="0.2">20%</option>
            <option :value="0.3">30%</option>
            <option :value="0.4">40%</option>
            <option :value="0.5">50%</option>
            <option :value="0.6">60%</option>
            <option :value="0.7">70%</option>
            <option :value="0.8">80%</option>
            <option :value="0.9">90%</option>
            <option :value="1">100%</option>
            <option :value="1.1">110%</option>
            <option :value="1.2">120%</option>
            <option :value="1.3">130%</option>
            <option :value="1.4">140%</option>
            <option :value="1.5">150%</option>
            <option :value="1.6">160%</option>
            <option :value="1.7">170%</option>
            <option :value="1.8">180%</option>
            <option :value="1.9">190%</option>
            <option :value="2.0">200%</option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        volume: {
            get() {
                return this.$store.state.options.playbackSpeed
            },
            set(value) {
                this.$store.commit('options/setPlaybackSpeed', value)
                this.$store.dispatch('player/restartRecordPlaying')
            },
        },
    },
})
</script>

<style scoped>
.select-speed {
    font-size: 11px;
    display: flex;
    align-items: center;
    height: 30px;
}
</style>
