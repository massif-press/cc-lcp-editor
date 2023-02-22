<template>
  <v-card>
    <v-toolbar density="compact" color="primary" title="Clocks" />

    <v-card flat>
      <v-tooltip
        v-for="(clock, i) in item.clocks"
        :key="`clock_chip_${item.id}-${i}`"
        top
      >
        <template v-slot:activator="{ props }">
          <v-chip
            small
            outlined
            class="mx-1"
            @click="edit(clock, i)"
            v-bind="props"
          >
            {{ clock.title }}
          </v-chip>
        </template>
        <div v-if="clock.min">Min: {{ clock.min }}</div>
        <div v-if="clock.max">Max: {{ clock.max }}</div>
      </v-tooltip>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn size="small" icon variant="flat" v-bind="props"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar density="compact" color="pink darken-4" title="Add Clock">
            <v-btn icon @click="dialog = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field
                  v-model="clock.title"
                  label="Title"
                  hide-details
                />
              </v-col>
              <v-col cols="auto">
                <v-text-field
                  v-model="clock.segments"
                  type="number"
                  label="Segments"
                  hide-details
                  outlined
                />
              </v-col>
              <v-col cols="auto">
                <v-switch v-model="clock.linear" label="Linear" hide-details />
              </v-col>
            </v-row>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col cols="12">
                <rich-text-editor
                  title="Description"
                  v-model="clock.description"
                />
              </v-col>
              <v-col cols="12">
                <rich-text-editor
                  title="Resolution"
                  v-model="clock.resolution"
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
            <v-btn
              color="success darken-2"
              :disabled="!clock.title || !clock.id"
              @click="submit"
            >
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-card>
</template>

<script lang="ts">
export default {
  title: 'clock-builder',
  props: { item: { type: Object, required: true } },
  data: () => ({
    dialog: false,
    clock: {} as any,
    isEdit: false,
    editIndex: -1,
  }),
  methods: {
    submit() {
      if (!this.clock) return;
      if (this.isEdit) {
        this.item.clocks[this.editIndex] = this.clock;
      } else {
        if (!this.item.clocks) this.item.clocks = [];
        this.item.clocks.push(this.clock);
      }
      this['clock'] = {};
      this.isEdit = false;
      this.editIndex = -1;
      this.dialog = false;
    },
    edit(clock: any, index: number) {
      this.clock = { ...clock };
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove() {
      this.item.clocks.splice(this.editIndex, 1);
      this.dialog = false;
    },
  },
};
</script>
