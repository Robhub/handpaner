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
