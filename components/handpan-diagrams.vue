<template>
    <div class="handpans">
        <HandpanDiagram
            v-for="handpan in handpans"
            v-bind:key="handpan.id"
            :handpan="handpan"
            :selectedChord="selectedChord"
            :selectedPanScale="selectedPanScale"
            :selectedScale="selectedScale"
            :samplesBank="samplesBank"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { default as HandpanDiagram } from '../components/handpan-diagram.vue'
import { Handpan } from '../models'
export default Vue.extend({
    components: {
        HandpanDiagram,
    },
    props: {
        handpans: Array,
        selectedChord: Object, // TODO typage chords
        selectedPanScale: Object,
        selectedScale: Object,
        samplesBank: Object,
    },
})
</script>

<style scoped>
.handpans {
    display: flex;
    flex-wrap: wrap;
}
/deep/ .handpan-shape {
    width: 200px;
    height: 200px;
    border-radius: 200px;
}
/deep/ .handpan-shape.is-bottom {
    margin-left: 25px;
    width: 150px;
    height: 150px;
    border-radius: 150px;
}
/deep/ .ding,
/deep/ .gu,
/deep/ .note span {
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -20px;
}
/deep/ .note {
    top: 90px;
    padding-left: 175px;
}
/deep/ .is-bottom .note {
    top: 65px;
    padding-left: 125px;
}
</style>
