<template>
  <v-card>
    <v-toolbar density="compact" color="primary" title="Counters" />
    <v-card flat>
      <v-tooltip
        v-for="(counter, i) in item.counters"
        :key="`counter_chip_${item.id}-${i}`"
        top
      >
        <template v-slot:activator="{ props }">
          <v-chip
            small
            close
            outlined
            class="mx-1"
            close-icon="mdi-close"
            @click="edit(counter, i)"
            @click:close="remove(i)"
            v-bind="props"
          >
            {{ counter.name }}
          </v-chip>
        </template>
        {{ counter.id }}
        <v-divider />
        <div v-if="counter.min">Min: {{ counter.min }}</div>
        <div v-if="counter.max">Max: {{ counter.max }}</div>
        <div v-if="counter.default_value">
          Starts At: {{ counter.default_value }}
        </div>
      </v-tooltip>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn size="small" icon variant="flat" v-bind="props"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar
            density="compact"
            color="pink darken-4"
            title="Add Counter"
          />
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <id-input v-model="counter.id" />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="counter.name"
                  label="Name"
                  hide-details
                />
              </v-col>
            </v-row>
            <v-divider />
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field
                  v-model="counter.min"
                  type="number"
                  label="Min"
                  hide-details
                  outlined
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="counter.max"
                  type="number"
                  label="Max"
                  hide-details
                  outlined
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="counter.default_value"
                  type="number"
                  label="Starting Value"
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
              :disabled="!counter.name || !counter.id"
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
  name: 'counter-builder',
  props: { item: { type: Object, required: true } },
  data: () => ({
    dialog: false,
    counter: {} as any,
    isEdit: false,
    editIndex: -1,
  }),
  methods: {
    submit() {
      if (!this.counter) return;
      if (this.isEdit) {
        this.item.counters[this.editIndex] = this.counter;
      } else {
        if (!this.item.counters) this.item.counters = [];
        this.item.counters.push(this.counter);
      }
      this.counter = {};
      this.isEdit = false;
      this.editIndex = -1;
      this.dialog = false;
    },
    edit(counter: any, index: number) {
      this.counter = JSON.parse(JSON.stringify(counter));
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove(index: number) {
      this.item.counters.splice(index, 1);
    },
  },
};
</script>
