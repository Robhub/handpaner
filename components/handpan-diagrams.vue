<template>
    <div class="handpans">
        <HandpanDiagram
            v-for="handpan in handpans"
            v-bind:key="handpan.id"
            :handpan="handpan.handpanModel"
            :selectedChord="selectedChord"
            :selectedPanScale="selectedPanScale"
            :selectedScale="selectedScale"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { default as HandpanDiagram } from '../components/handpan-diagram.vue'

export default Vue.extend({
    components: {
        HandpanDiagram,
    },
    props: {
        handpans: Array,
        selectedChord: Object, // TODO typage chords
        selectedPanScale: Object,
        selectedScale: Object,
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
/deep/ .ding {
    width: 76px;
    height: 76px;
    margin-left: -38px;
    margin-top: -38px;
}
/deep/ .handpan-diagram.hasMutant .ding {
    width: 64px;
    height: 64px;
    margin-left: -32px;
    margin-top: -12px;
}

/deep/ .gu {
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -20px;
}

/deep/ .note span {
    width: 40px;
    height: 40px;
}
/deep/ .notes-mutant .note span {
    width: 30px;
    height: 30px;
}
/deep/ .note {
    height: 100%;
}
/deep/ .is-bottom .note {
    height: 100%;
}
/deep/ .inside {
    width: 24px;
    height: 24px;
    border-radius: 24px;
}

/deep/ .ding .inside {
    width: 32px;
    height: 32px;
    border-radius: 32px;
}
</style>
