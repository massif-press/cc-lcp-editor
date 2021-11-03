<template>
  <div>
    <v-card class="my-2">
      <v-card-text>
        <v-row>
          <v-col v-for="(item, i) in sourcelessItems" :key="`item_${i}`">
            <v-btn block :color="colorByType(item)" @click="openByType(item)">
              {{ item.name }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider class="mt-4" />
    <v-row justify="space-between" class="mt-1">
      <v-col>
        <v-btn block large color="deep-orange darken-4" @click="newItem('weapons')">
          <v-icon left>mdi-plus</v-icon>
          add new weapon
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block large color="teal darken-4" @click="newItem('systems')">
          <v-icon left>mdi-plus</v-icon>
          add new system
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block large color="cyan darken-3" @click="newItem('mods')">
          <v-icon left>mdi-plus</v-icon>
          add new mod
        </v-btn>
      </v-col>
    </v-row>
    <system-editor
      ref="systems"
      @save="saveItem('systems', $event)"
      @remove="removeItem('systems', $event)"
    />
    <mod-editor ref="mods" @save="saveItem('mods', $event)" @remove="removeItem('mods', $event)" />
    <weapon-editor
      ref="weapons"
      @save="saveItem('weapons', $event)"
      @remove="removeItem('weapons', $event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SystemEditor from './_SystemEditor.vue'
import ModEditor from './_ModEditor.vue'
import WeaponEditor from './_WeaponEditor.vue'

export default Vue.extend({
  name: 'sourceless-editor',
  components: { SystemEditor, ModEditor, WeaponEditor },
  computed: {
    lcp(): any {
      return this.$store.getters.lcp
    },
    sourcelessItems(): any[] {
      let items = (this.lcp.weapons || [])
        .concat(this.lcp.systems || [])
        .concat(this.lcp.mods || [])
      return items.filter((x: any) => !x.source)
    },
  },
  methods: {
    getType(item: any) {
      if (item.mount) return 'weapons'
      if (item.mounts) return 'frames'
      if (item.allowed_types) return 'mods'
      return 'systems'
    },
    colorByType(item: any) {
      const type = this.getType(item)
      if (type === 'weapons') return 'deep-orange darken-4'
      if (type === 'frames') return 'deep-purple darken-4'
      if (type === 'mods') return 'cyan darken-3'
      return 'teal darken-4'
    },
    openByType(item: any) {
      this.openItem(this.getType(item), item)
    },
    newItem(type: string) {
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any
        r.reset()
        r.open()
      }
    },
    openItem(type: string, item: any) {
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any
        r.edit(item)
      }
    },
    saveItem(type: string, item: any) {
      if (!this.lcp[type]) this.$set(this.lcp, type, [])
      const idx = this.lcp[type].findIndex((x: any) => x.id === item.id)
      if (idx < 0) {
        this.lcp[type].push(item)
      } else this.$set(this.lcp[type], idx, item)
    },
    removeItem(type: string, id: string) {
      const idx = this.lcp[type].findIndex((x: any) => x.id === id)
      if (idx > -1) this.lcp[type].splice(idx, 1)
    },
  },
})
</script>
