<template>
    <div>
        <Record />
        <HandpanDiagram
            v-if="handpanUser"
            :handpan="handpanUser.handpanModel"
            :selectedChord="selectedChord"
            :selectedPanScale="null"
            :selectedScale="null"
        />
        <div class="back-btn"><nuxt-link to="/">back</nuxt-link></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HandpanDiagram from '../components/handpan-diagram.vue'
import Record from '../components/record.vue'
import { HandpanUser } from '@/domain/handpan'

export default Vue.extend({
    components: {
        HandpanDiagram,
        Record,
    },
    layout: 'empty',
    head() {
        return {
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' }],
        }
    },
    data() {
        return {
            handpanUser: null as any,
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
            },
        },
    },
    mounted() {
        if (this.$nuxt.$route.hash) {
            const panString = this.$nuxt.$route.hash.substr(1)
            this.handpanUser = new HandpanUser(panString.replace(/-/g, ' '))
        } else {
            this.handpanUser = new HandpanUser('D/ A C D E F G A C')
        }
    },
})
</script>

<style scoped>
/deep/ .handpan-diagram {
    --deg: 174deg;
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
        --size: calc(98vh - 90px);
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
    width: calc(var(--size) * 0.22);
    height: calc(var(--size) * 0.22);
    /* margin-left: calc(var(--size) * (-0.1)); */
    /* margin-top: calc(var(--size) * (-0.1)); */
    font-size: calc(var(--size) * 0.05);
}
/deep/ .gu {
    margin-left: calc(var(--size) * (-0.11));
    margin-top: calc(var(--size) * (-0.11));
}
/deep/ .note {
    height: 100%;
    /* top: calc(var(--size) * 0.432); */
    /* padding-left: calc(var(--size) * 0.432 * 2); */
}

/deep/ .notes-mutant .note span {
    width: calc(var(--size) * 0.15);
    height: calc(var(--size) * 0.15);
}

/deep/ .notes-mutant .note {
    height: 53%;
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

/deep/ .handpan-diagram.hasMutant .ding {
    width: calc(var(--size) * 0.28);
    height: calc(var(--size) * 0.28);
    margin-left: calc(var(--size) * (-0.14));
    margin-top: calc(var(--size) * (-0.06));
}

.back-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 5px 10px;
}
</style>
