<template>
    <div>
        <div>
            Sample bank
            <select v-model="samplesBank">
                <option v-for="samplesBank in samplesBanks" v-bind:key="samplesBank.name" :value="samplesBank">
                    {{ samplesBank.name }}
                </option>
            </select>
            <span v-if="samplesBank.website && samplesBank.logo">
                <a v-if="samplesBank.website" :href="'//' + samplesBank.website"><img v-if="samplesBank.logo" :src="samplesBank.logo"/></a>
            </span>
            <span v-if="samplesBank.website && !samplesBank.logo">
                <a v-if="samplesBank.website" :href="'//' + samplesBank.website">{{ samplesBank.website }}</a>
            </span>
        </div>
        <HandpanDiagram
            v-if="handpan"
            :handpan="handpan"
            :selectedChord="selectedChord"
            :selectedPanScale="null"
            :selectedScale="null"
            :samplesBank="samplesBank"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { default as HandpanDiagram } from '../components/handpan-diagram.vue'
import { Handpan } from '../models'
import * as DATA from '../data'

export default Vue.extend({
    components: {
        HandpanDiagram,
    },
    layout: 'empty',
    head() {
        return {
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' }],
        }
    },
    data() {
        return {
            handpan: null as any,
            samplesBank: DATA.samplesBanks[0],
            samplesBanks: DATA.samplesBanks,
            selectedChord: {
                label: '',
                root: '',
                type: '',
                noteNames: <any[]>[],
            },
        }
    },
    mounted() {
        this.handpan = new Handpan()
        if (this.$nuxt.$route.hash) {
            const panString = this.$nuxt.$route.hash.substr(1)
            this.handpan.loadFromAbsNotation(panString.replace(/-/g, ' '))
        } else {
            this.handpan.loadFromAbsNotation('D/ G A C D E F G A C D')
        }
    },
})
</script>

<style scoped>
/deep/ .handpan-diagram {
    --size: min(98vw, 90vh);
    --deg: 90deg;
    width: 100vw;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
/deep/ .handpan-shape {
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
}
/deep/ .ding,
/deep/ .gu,
/deep/ .note span {
    width: calc(var(--size) * 0.23);
    height: calc(var(--size) * 0.23);
    margin-left: calc(var(--size) * (-0.1));
    margin-top: calc(var(--size) * (-0.1));
    font-size: calc(var(--size) * 0.05);
}
/deep/ .note {
    top: calc(var(--size) * 0.432);
    padding-left: calc(var(--size) * 0.432 * 2);
}
</style>