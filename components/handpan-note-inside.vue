<template>
    <div>
        <template v-if="showRelative">
            {{ relative }}
        </template>
        <template v-else>
            {{ noteName }}<sub>{{ noteOctave }}</sub>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { absToRel } from '@/music'
export default Vue.extend({
    props: {
        noteName: String,
        noteOctave: Number,
    },
    computed: {
        showRelative(): boolean {
            return this.$store.state.selection.showRelative
        },
        relativeNoteBase(): string {
            return this.$store.state.selection.relativeNoteBase
        },
        relative(): string {
            return absToRel(this.relativeNoteBase, this.noteName)
        },
    },
})
</script>
