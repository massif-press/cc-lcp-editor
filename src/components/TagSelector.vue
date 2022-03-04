<template>
  <v-card outlined>
    <div class="caption mb-n1 mt-n3">TAGS</div>
    <v-card flat>
      <v-chip
        v-for="(tag, i) in item.tags"
        :key="`tag_chip_${item.id}-${i}`"
        small
        close
        outlined
        class="mx-1"
        close-icon="mdi-close"
        @click="edit(tag, i)"
        @click:close="remove(i)">
        {{ tag.id }}, {{ tag.val }}
      </v-chip>
      <v-menu v-model="menu" :close-on-click="false" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dense color="pink darken-4" class="text-h6">Add tag</v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center">
              <v-col cols="7">
                <v-select
                  v-model="tag.id"
                  item-text="name"
                  item-value="id"
                  label="Tag"
                  :items="tags"
                  hide-details />
              </v-col>
              <v-col>
                <tiered-stat-input v-if="npc" v-model="tag.val" title="Value" />
                <v-text-field
                  v-else
                  v-model="tag.val"
                  type="number"
                  label="Value"
                  hide-details
                  outlined />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn text color="error" @click="menu = false">cancel</v-btn>
            <v-spacer />
            <v-btn color="success darken-2" :disabled="!tag.id" @click="submit">
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { tags } from 'lancer-data'
import TieredStatInput from './TieredStatInput.vue'
import { ITagData } from '@tenebrae-press/lancer-types'

type TagSelectorData = {
  menu: boolean
  tag: ITagData
  isEdit: boolean
  editIndex: number
}

export default Vue.extend({
  name: 'tag-selector',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  components: { TieredStatInput },
  data: (): TagSelectorData => ({
    menu: false,
    tag: { id: '', name: '', description: '' },
    isEdit: false,
    editIndex: -1,
  }),
  computed: {
    tags() {
      const localTags = this.$store.getters.lcp.tags || []
      return tags.concat(localTags)
    },
  },
  methods: {
    submit() {
      if (!this.tag) return
      if (this.isEdit) {
        this.$set(this.item.tags, this.editIndex, this.tag)
      } else {
        if (!this.item.tags) this.$set(this.item, 'tags', [])
        this.item.tags.push(this.tag)
      }
      this.$set(this, 'tag', {})
      this.isEdit = false
      this.editIndex = -1
      this.menu = false
    },
    edit(tag: ITagData, index: number) {
      this.tag = { ...tag }
      this.isEdit = true
      this.editIndex = index
      this.menu = true
    },
    remove(index: number) {
      this.item.tags.splice(index, 1)
    },
  },
})
</script>
