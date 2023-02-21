<template>
  <v-card outlined>
    <div class="text-caption px-2">TAGS</div>
    <v-card flat>
      <v-chip
        v-for="(tag, i) in item.tags"
        :key="`tag_chip_${item.id}-${i}`"
        small
        closable
        outlined
        class="mx-1"
        close-icon="mdi-close"
        @click:close="remove(i)"
      >
        {{ tag.id }}, {{ tag.val }}
      </v-chip>
      <v-menu
        v-model="menu"
        :close-on-click="false"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn size="small" icon flat v-bind="props"
            ><v-icon size="large">mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar density="compact" color="pink darken-4" title="Add Tag" />
          <v-card-text>
            <v-row justify="space-around" align="center">
              <v-col cols="7">
                <v-autocomplete
                  v-model="tag"
                  item-title="name"
                  item-value="id"
                  label="Tag"
                  :items="tags"
                  hide-details
                  return-object
                />
              </v-col>
              <v-col>
                <!-- <tiered-stat-input v-if="npc" v-model="tag.val" title="Value" /> -->
                <v-text-field
                  v-model="tag.val"
                  type="number"
                  label="Value"
                  hide-details
                  outlined
                />
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
import { tags } from 'lancer-data';
import TieredStatInput from './TieredStatInput.vue';
import { useStore } from 'vuex';

export default {
  name: 'tag-selector',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  components: { TieredStatInput },
  data: () => ({
    menu: false,
    tag: { name: '', id: '', val: '' } as any,
    isEdit: false,
    editIndex: -1,
  }),
  computed: {
    tags() {
      const localTags = useStore().getters.lcp.tags || [];
      return tags.concat(localTags);
    },
  },
  methods: {
    submit() {
      if (!this.tag) return;
      if (!isNaN(this.tag.val)) {
        this.tag.val = Number(this.tag.val);
      }
      if (this.isEdit) {
        this.item.tags[this.editIndex] = this.tag;
      } else {
        if (!this.item.tags) this.item['tags'] = [];
        this.item.tags.push(this.tag);
      }
      this.tag = { name: '', id: '', val: '' };
      this.isEdit = false;
      this.editIndex = -1;
      this.menu = false;
    },
    edit(tag: any, index: number) {
      this.tag = JSON.parse(JSON.stringify(tag));
      this.isEdit = true;
      this.editIndex = index;
      this.menu = true;
    },
    remove(index: number) {
      this.item.tags.splice(index, 1);
    },
  },
};
</script>
