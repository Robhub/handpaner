<template>
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
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        displayedPanScales: Array,
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
            this.selectedPanScale = null
        },
    },
})
</script>
