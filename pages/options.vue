<template>
    <div>
        <h1>Options</h1>
        <SelectVolume />
        <SelectSamplesBank />
        Sound models:
        <select v-model="selectedCustomPanScale">
            <option v-for="customPanScale in customPanScales" v-bind:key="customPanScale.name" :value="customPanScale">
                {{ customPanScale.name }}
            </option>
        </select>
        <button v-if="selectedCustomPanScale" @click="removeCustomPanScale(selectedCustomPanScale.name)">Delete</button>

        <div class="checks">
            <div>
                <label><input type="checkbox" v-model="enableClac" /> Enable clac</label>
            </div>
            <div>
                <label><input type="checkbox" v-model="showBebop" /> Show bebop scales</label>
            </div>
            <div>
                <label><input type="checkbox" v-model="flipHorizontal" /> Flip horizontally (left handed, maker view)</label>
            </div>
            <div>
                <label><input type="checkbox" v-model="hideFooter" /> Hide footer</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { default as SelectVolume } from '../components/select-volume.vue'
import { default as SelectSamplesBank } from '../components/select-samplesbank.vue'

export default Vue.extend({
    components: {
        SelectVolume,
        SelectSamplesBank,
    },
    data() {
        return {
            selectedCustomPanScale: null,
        }
    },
    computed: {
        customPanScales() {
            return this.$store.state.options.customPanScales
        },
        enableClac: {
            get() {
                return this.$store.state.options.enableClac
            },
            set(value) {
                this.$store.commit('options/enableClac', value)
            },
        },
        showBebop: {
            get() {
                return this.$store.state.options.showBebop
            },
            set(value: boolean) {
                this.$store.commit('options/setShowBebop', value)
            },
        },
        hideFooter: {
            get() {
                return this.$store.state.options.hideFooter
            },
            set(value: boolean) {
                this.$store.commit('options/setHideFooter', value)
            },
        },
        flipHorizontal: {
            get() {
                return this.$store.state.options.flipHorizontal
            },
            set(value: boolean) {
                this.$store.commit('options/setFlipHorizontal', value)
            },
        },
    },
    methods: {
        removeCustomPanScale(customPanScaleName: string): void {
            this.$store.commit('options/removeCustomPanScale', customPanScaleName)
        },
    },
})
</script>

<style scoped>
.checks {
    display: flex;
    flex-direction: column;
}
.checks > div {
    margin: 8px 0;
}
.checks label {
    padding: 6px;
    cursor: pointer;
}
</style>
