<template>
    <div>
        <h1>Options</h1>
        <SelectVolume />
        <SelectSamplesBank />
        <div class="checks">
            <div>
                <label><input type="checkbox" v-model="enableClac" /> Enable clac</label>
            </div>
            <div>
                <label><input type="checkbox" v-model="showBebop" /> Show bebop scales</label>
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
    computed: {
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
            set(value) {
                this.$store.commit('options/setShowBebop', value)
            },
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
