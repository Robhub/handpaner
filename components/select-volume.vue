<template>
    <div class="select-volume">
        Volume:&nbsp;
        <select v-model="volume">
            <option :value="1">100%</option>
            <option :value="0.9">90%</option>
            <option :value="0.8">80%</option>
            <option :value="0.7">70%</option>
            <option :value="0.6">60%</option>
            <option :value="0.5">50%</option>
            <option :value="0.4">40%</option>
            <option :value="0.3">30%</option>
            <option :value="0.2">20%</option>
            <option :value="0.1">10%</option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    computed: {
        volume: {
            get() {
                return this.$store.getters['options/getVolume']
            },
            set(value) {
                this.$store.commit('options/setVolume', value)
            }
        },
    },
})
</script>

<style scoped>
.select-volume {
    font-size: 11px;
    display: flex;
    align-items: center;
    height: 30px;
}
</style>
