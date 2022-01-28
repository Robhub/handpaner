<template>
    <div class="zone-panscales">
        <div class="panscales">
            <div
                v-for="panScale in displayedPanScales"
                v-bind:key="panScale.name"
                class="panscale"
                @click.stop="selectPanScale(panScale)"
                v-bind:class="{
                    highlight: selectedPanScale && panScale.name === selectedPanScale.name,
                }"
            >
                {{ panScale.name }}
            </div>
            <div v-if="!displayedPanScales.length">Nothing…</div>
        </div>
        <div class="actions">
            <Arpegiator v-if="selectedPanScale" :arpegiatedNotes="notesMatchingPanScale" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Arpegiator from '@/components/arpegiator.vue'
import { HandpanUser } from '@/domain/handpan'
import { sortHandpanNotes, uniqueHandpanNotesAsString } from '@/music'
export default Vue.extend({
    props: {
        displayedPanScales: Array,
        handpansUser: Array,
    },
    components: {
        Arpegiator,
    },
    computed: {
        selectedPanScale: {
            get(): any {
                return this.$store.state.selection.selectedPanScale
            },
            set(panScale: any) {
                this.$store.commit('selection/setSelectedPanScale', panScale)
            },
        },
        notesMatchingPanScale(): string[] {
            return this.selectedPanScale ? uniqueHandpanNotesAsString(sortHandpanNotes([...this.selectedPanScale.notes])) : []
        },
    },
    beforeDestroy() {
        this.$store.commit('player/setRecordPlaying', null)
        this.unselectPanScale()
    },
    methods: {
        selectPanScale(panScale: any) {
            if (panScale.name === this.selectedPanScale?.name) {
                this.unselectPanScale()
            } else {
                this.selectedPanScale = panScale
            }
        },
        unselectPanScale() {
            this.$store.commit('player/setRecordPlaying', null)
            this.selectedPanScale = null
        },
    },
})
</script>

<style scoped>
.zone-panscales {
    padding: 8px;
}
</style>
