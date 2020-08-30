<template>
    <div>
        <div class="play-options">
            <SelectVolume/>
            <SelectSamplesBank/>
        </div>
        <HandpanDiagram
            v-if="handpan"
            :handpan="handpan"
            :selectedChord="selectedChord"
            :selectedPanScale="null"
            :selectedScale="null"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { default as HandpanDiagram } from '../components/handpan-diagram.vue'
import { default as SelectVolume } from '../components/select-volume.vue'
import { default as SelectSamplesBank } from '../components/select-samplesbank.vue'
import { Handpan } from '../models'
import * as DATA from '../data'

export default Vue.extend({
    components: {
        HandpanDiagram,
        SelectVolume,
        SelectSamplesBank,
    },
    layout: 'empty',
    head() {
        return {
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' }],
        }
    },
    data() {
        return {
            handpan: null as any,
            selectedChord: {
                label: '',
                root: '',
                type: '',
                noteNames: <any[]>[],
            },
        }
    },
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
    mounted() {
        this.handpan = new Handpan()
        if (this.$nuxt.$route.hash) {
            const panString = this.$nuxt.$route.hash.substr(1)
            this.handpan.loadFromAbsNotation(panString.replace(/-/g, ' '))
        } else {
            this.handpan.loadFromAbsNotation('D/ G A C D E F G A C D')
        }
    },
})
</script>

<style scoped>
.play-options {
    display: flex;
    justify-content: center;
}
.play-options > * {
    margin: 0 8px;
}
/deep/ .handpan-diagram {
    --deg: 90deg;
    width: 100vw;
    height: calc(100vh - 90px); /* Prevoir 60px pour la barre de nav sur mobile */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-wrap: wrap;
}
@media (orientation: portrait) {
    /deep/ .handpan-diagram {
        --size: 98vw;
    }
}
@media (orientation: landscape) {
    /deep/ .handpan-diagram {
        --size: calc(98vh - 90px);
    }
}
@media (orientation: portrait) {
    /deep/ .handpan-diagram.hasBottom {
        --size: calc((98vh - 90px) / 2);
    }
}
@media (orientation: landscape) {
    /deep/ .handpan-diagram.hasBottom {
        --size: calc((98vh - 90px) / 2);
    }
}
/deep/ .handpan-shape {
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
}
/deep/ .ding,
/deep/ .gu,
/deep/ .note span {
    width: calc(var(--size) * 0.23);
    height: calc(var(--size) * 0.23);
    margin-left: calc(var(--size) * (-0.1));
    margin-top: calc(var(--size) * (-0.1));
    font-size: calc(var(--size) * 0.05);
}
/deep/ .note {
    top: calc(var(--size) * 0.432);
    padding-left: calc(var(--size) * 0.432 * 2);
}

/deep/ .inside {
    width: calc(var(--size) * 0.1);
    height: calc(var(--size) * 0.1);
    border-radius: calc(var(--size) * 0.1);
}

/deep/ .ding .inside {
    width: calc(var(--size) * 0.12);
    height: calc(var(--size) * 0.12);
    border-radius: calc(var(--size) * 0.12);
}
/deep/ .ding {
    width: calc(var(--size) * 0.34);
    height: calc(var(--size) * 0.34);
    margin-left: calc(var(--size) * (-0.17));
    margin-top: calc(var(--size) * (-0.17));
}
</style>
