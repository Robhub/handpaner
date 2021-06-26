<template>
    <div>
        <template v-if="showRelative">
            {{ relative }}
        </template>
        <template v-else>
            {{ note.noteName.replace('#', '♯').replace('b', '♭') }}<sub>{{ note.octave }}</sub>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { absToRel } from '@/music'

export default Vue.extend({
    props: {
        note: Object,
    },
    computed: {
        showRelative(): boolean {
            return this.$store.state.selection.showRelative
        },
        relativeNoteBase(): string {
            return this.$store.state.selection.relativeNoteBase
        },
        relative(): string {
            return absToRel(this.relativeNoteBase, this.note.noteName)
        },
    },
})
</script>

<style scoped>
sub {
    margin-bottom: -10px;
    font-size: 0.7em;
}
</style>
