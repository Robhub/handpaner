<template>
    <div>
        <div class="bank-select">
            Volume:&nbsp;
            <select v-model="volume">
                <option :value="1">100%</option>
                <option :value="0.9">90%</option>
                <option :value="0.8">80%</option>
                <option :value="0.7">70%</option>
                <option :value="0.6">60%</option>
                <option :value="0.5">50%</option>
                <option :value="0.4">40%</option>
                <option :value="0.3">30%</option>
                <option :value="0.2">20%</option>
                <option :value="0.1">10%</option>
            </select>
            &nbsp;
            Samples:&nbsp;
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
            :volume="volume"
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
            volume: 0.5,
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
.bank-select {
    height: 30px;
    overflow-y: hidden;
    display: flex;
    font-size: 11px;
    align-items: center;
    justify-content: center;
}
/deep/ .handpan-diagram {
    --deg: 90deg;
    width: 100vw;
    height: calc(100vh - 90px); /* Prevoir 60px pour la barre de nav sur mobile */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-wrap: wrap;
}
@media (orientation: portrait) {
    /deep/ .handpan-diagram {
        --size: 98vw;
    }
}
@media (orientation: landscape) {
    /deep/ .handpan-diagram {
        --size: calc(98vh - 90px);
    }
}
@media (orientation: portrait) {
    /deep/ .handpan-diagram.hasBottom {
        --size: calc((98vh - 90px) / 2);
    }
}
@media (orientation: landscape) {
    /deep/ .handpan-diagram.hasBottom {
        --size: calc((98vh - 90px) / 2);
    }
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
