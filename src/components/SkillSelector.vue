<template>
  <v-card outlined>
    <div class="text-caption px-2">SKILLS</div>
    <v-card flat>
      <v-chip
        v-for="(skill, i) in item.skills"
        :key="`skill_chip_${item.id}-${i}`"
        small
        class="mx-1"
        @click="edit(skill, i)"
      >
        {{ (skill.name)}}
      </v-chip>
      <v-menu
        v-model="menu"
        :close-on-click="false"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn size="small" icon flat @click="addNew()" v-bind="props"
            ><v-icon size="large">mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar density="comfortable" color="pink darken-4" title="Add Skill" style="width: 20rem">
            <v-btn icon @click="menu = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center">
              <v-col cols="20">
                <v-autocomplete
                  v-model="skill"
                  item-title="name"
                  item-value="id"
                  label="Skill"
                  :items="skills"
                  hide-details
                  return-object
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn
              v-show="isEdit"
              variant="tonal"
              color="error"
              @click="remove()"
              >delete</v-btn
            >
            <v-spacer />
            <v-btn color="success darken-2" :disabled="!skill.id" @click="submit">
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { skills } from '@massif/lancer-data';
import { useStore } from 'vuex';

export default {
  name: 'skill-selector',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  data: () => ({
    menu: false,
    skill: { name: '', id: '', description: '' , detail : ''} as any,
    isEdit: false,
    editIndex: -1,
  }),
  computed: {
    skills() {
      const localSkills = useStore().getters.lcp.skills || [];
      if(this.item.skills){
        return [...skills, ...localSkills].filter(
          (x) => !this.item.skills.some((y) => x.id === y.id)
        );
      } else {
        return [...skills, ...localSkills];
      }
    },
  },
  methods: {
    submit() {
      if (!this.skill) return;
      if (this.isEdit) {
        this.item.skills[this.editIndex] = this.skill;
      } else {
        if (!this.item.skills) this.item['skills'] = [];
          this.item.skills.push({ ...this.skill });
      }
      this.skill = { name: '', id: '', description: '', detail : ''};
      this.isEdit = false;
      this.editIndex = -1;
      this.menu = false;
    },
    addNew() {
      this.skill = { name: '', id: '', description: '', detail : ''};
      this.isEdit = false;
      this.editIndex = -1;
      this.menu = true;
    },
    edit(skill: any, index: number) {
      this.skill = { ...skill };
      this.isEdit = true;
      this.editIndex = index;
      this.menu = true;
    },
    remove() {
      this.item.skills.splice(this.editIndex, 1);
      this.menu = false;
      this.isEdit = false;
      this.editIndex = -1;
    },
  },
};
</script>
