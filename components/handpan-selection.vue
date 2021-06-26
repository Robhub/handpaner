<template>
    <div>
        <div class="form-line">
            <span>Ding</span>
            <select v-model="inputDing" @change="dingChanged">
                <option v-for="ding in ALL_DINGS" v-bind:key="ding">{{ ding }}</option>
            </select>
        </div>
        <div class="form-line">
            <span>Model</span>
            <select v-model="inputPanscale" @change="modelNameChanged">
                <option v-for="genericName in allGenericNamesSorted" v-bind:key="genericName" :value="genericName">
                    {{ genericName }}
                </option>
            </select>
        </div>
        <div class="form-line">
            <span>Notes</span>
            <input type="text" v-model="inputAbsNotation" size="30" @keyup="absChanged" placeholder="Ex: C/ D E F G A B C" />
        </div>
        <div class="form-line">
            <span>Relative</span>
            <select v-model="relativeNoteBase">
                <option v-for="note in uniqueNotesAllPans" v-bind:key="note">{{ note }}</option>
            </select>
            <label><input type="checkbox" v-model="showRelative" /> show relative</label>
        </div>
        <button v-if="!inputPanscale" @click="saveModel()">💾 Save model</button>
        <div class="play-full"><nuxt-link :to="playPath">Play in full page</nuxt-link></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ALL_PANSCALES_TRANSPOSED, ALL_DINGS, HandpanUser } from '@/domain/handpan'

export default Vue.extend({
    props: {
        handpansUser: Array,
        displayedHandpanId: String,
    },
    data() {
        return {
            ignoreNextHashChange: false,
            ALL_DINGS: ALL_DINGS,
            inputAbsNotation: '',
            inputDing: '',
            inputPanscale: '',
        }
    },
    computed: {
        showRelative: {
            get() {
                return this.$store.state.selection.showRelative
            },
            set(value: boolean) {
                this.$store.commit('selection/setShowRelative', value)
            },
        },
        relativeNoteBase: {
            get() {
                return this.$store.state.selection.relativeNoteBase
            },
            set(value: string) {
                this.$store.commit('selection/setRelativeNoteBase', value)
            },
        },
        allGenericNamesSorted(): string[] {
            const allGenericNames = ALL_PANSCALES_TRANSPOSED.map(handpanModel => handpanModel.genericName)
            // TODO ajouter les pan custom generic name
            return [...new Set(allGenericNames)].sort((a: string, b: string) => a.localeCompare(b))
        },

        playPath(): string {
            // if (this.displayedHandpan) {
            // return 'play/#' + this.displayedHandpan.absNotationUser.replace(/ /g, '-')
            // } else {
            return 'play/'
            // }
        },
        uniqueNotesAllPans(): string[] {
            return [
                ...new Set(Array.from((this.handpansUser as HandpanUser[]).flatMap(handpan => handpan.handpanModel.getUniqueNotesNames()))),
            ]
        },
        displayedHandpan(): HandpanUser | undefined {
            return (this.handpansUser as HandpanUser[]).find(handpanUser => handpanUser.id === this.displayedHandpanId)
        },
    },
    methods: {
        WTF(lol: number): void {},
        dingChanged(): void {
            try {
                console.log('load', this.inputAbsNotation, this.inputDing)
                this.displayedHandpan!.loadFromDefinition(this.inputAbsNotation, this.inputDing)
                this.inputAbsNotation = this.displayedHandpan!.handpanModel.getDefinition()
                this.selectionChanged()
            } catch (err) {
                console.log('err', err)
            }
        },
        modelNameChanged(): void {
            if (!this.inputPanscale || !this.inputDing) {
                return
            }
            const found = ALL_PANSCALES_TRANSPOSED.find(handpanModel => {
                return handpanModel.genericName === this.inputPanscale && handpanModel.getDingString() === this.inputDing
            })
            if (found) {
                this.inputAbsNotation = found.getDefinition()
                this.displayedHandpan!.loadFromDefinition(this.inputAbsNotation)
                this.selectionChanged()
            }
        },
        absChanged(): void {
            try {
                this.displayedHandpan!.loadFromDefinition(this.inputAbsNotation)
                this.inputDing = this.displayedHandpan!.handpanModel.getDingString()
                this.selectionChanged()
            } catch (err) {
                console.log('err', err)
            }
        },
        saveModel(): void {
            const modelName = prompt('Model name')
            this.$store.commit('options/addCustomPanScale', {
                name: modelName,
                absoluteNotation: this.inputAbsNotation,
            })
        },
        selectionChanged(): void {
            this.$emit('selectionChanged')
        },
    },
    watch: {
        displayedHandpanId() {
            console.log('id changed !', this.displayedHandpanId)
            this.inputAbsNotation = this.displayedHandpan!.handpanModel.getDefinition()
            this.inputDing = this.displayedHandpan!.handpanModel.getDingString()
            const found = ALL_PANSCALES_TRANSPOSED.find(handpanModel => {
                return handpanModel.getDefinition() === this.displayedHandpan!.handpanModel.getDefinition()
            })
            if (found) {
                this.inputPanscale = found.genericName
            } else {
                this.inputPanscale = ''
            }
        },
    },
})
</script>

<style scoped>
.form-line {
    display: flex;
    align-items: center;
    height: 30px;
}
.form-line > span {
    width: 60px;
    padding-right: 10px;
    text-align: right;
}
.form-line select {
    min-width: 50px;
}
.form-line select,
.form-line input[type='text'] {
    height: 100%;
    box-sizing: border-box;
}
.form-line select:not(:first-of-type) {
    margin-left: 5px;
}
.form-line:not(:first-child) {
    margin-top: 5px;
}
</style>
