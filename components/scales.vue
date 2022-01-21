<template>
    <div class="scales">
        <div
            class="scale"
            v-for="scale in displayedScalesSorted"
            v-bind:key="scale.id"
            @click.stop="selectScale(scale)"
            v-bind:class="{
                highlight: scale.id === selectedScale.id,
            }"
        >
            {{ scale.tonic }} {{ scale.name }}
        </div>
        <div v-if="!displayedScales.length">Nothing…</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        displayedScales: Array,
    },
    computed: {
        selectedScale: {
            get(): any {
                return this.$store.state.selection.selectedScale
            },
            set(scale: any) {
                this.$store.commit('selection/setSelectedScale', scale)
            },
        },
        displayedScalesSorted(): any[] {
            return this.displayedScales.sort((a: any, b: any) => b.totalNotes - a.totalNotes)
        },
    },
    methods: {
        selectScale(scale: any) {
            if (scale.id === this.selectedScale.id) {
                this.unselectScale()
            } else {
                this.selectedScale = scale
            }
        },
        unselectScale(): void {
            this.selectedScale = {}
        },
    },
})
</script>
