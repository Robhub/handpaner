<template>
    <div class="select-arpeggio">
        Arpeggio mode:&nbsp;
        <select v-model="volume">
            <option value="up">Up</option>
            <option value="upstairs">Up stairs</option>
            <option value="down">Down</option>
            <option value="downstairs">Down stairs</option>
            <option value="updown">Up &amp; down</option>
            <option value="updownstairs">Up &amp; down stairs</option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        volume: {
            get() {
                return this.$store.state.options.arpeggioMode
            },
            set(value) {
                this.$store.commit('options/setArpeggioMode', value)
            },
        },
    },
})
</script>
