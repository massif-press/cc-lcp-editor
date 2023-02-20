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
            closable
            outlined
            class="mx-1"
            close-icon="mdi-close"
            @click="edit(clock, i)"
            @click:close="remove(i)"
            v-bind="props"
          >
            {{ clock.name }}
          </v-chip>
        </template>
        <div v-if="clock.min">Min: {{ clock.min }}</div>
        <div v-if="clock.max">Max: {{ clock.max }}</div>
      </v-tooltip>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar density="compact" color="pink darken-4" class="text-h6"
            >Add clock</v-toolbar
          >
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field v-model="clock.name" label="Name" hide-details />
              </v-col>
            </v-row>
            <v-divider />
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field
                  v-model="clock.min"
                  type="number"
                  label="Min"
                  hide-details
                  outlined
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="clock.max"
                  type="number"
                  label="Max"
                  hide-details
                  outlined
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn text color="error" @click="dialog = false">cancel</v-btn>
            <v-spacer />
            <v-btn
              color="success darken-2"
              :disabled="!clock.name || !clock.id"
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
  name: 'clock-builder',
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
        if (!this.item.clocks) this.item['clocks'] = [];
        this.item.clocks.push(this.clock);
      }
      this['clock'] = {};
      this.isEdit = false;
      this.editIndex = -1;
      this.dialog = false;
    },
    edit(clock: any, index: number) {
      this.clock = JSON.parse(JSON.stringify(clock));
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove(index: number) {
      this.item.clocks.splice(index, 1);
    },
  },
};
</script>
