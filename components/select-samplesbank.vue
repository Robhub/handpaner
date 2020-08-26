<template>
    <div class="select-samplesbank">
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
</template>

<script lang="ts">
import Vue from 'vue'
import * as DATA from '../data'
export default Vue.extend({
    data() {
        return {
            handpan: null as any,
            samplesBanks: DATA.samplesBanks,
        }
    },
    computed: {
        samplesBank: {
            get() {
                return DATA.samplesBanks[this.$store.getters['options/getChosenSamplesBankIndex']]
            },
            set(value: any) {
                this.$store.commit('options/setChosenSamplesBankIndex', DATA.samplesBanks.indexOf(value))
            },
        },
        volume: {
            get() {
                return this.$store.getters['options/getVolume']
            },
            set(value) {
                this.$store.commit('options/setVolume', value)
            },
        },
    },
})
</script>

<style scoped>
.select-samplesbank {
    font-size: 11px;
    display: flex;
    align-items: center;
    height: 30px;
}
</style>
