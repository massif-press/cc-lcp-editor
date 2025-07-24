<template>
  <v-card>
    <v-card flat>
      <v-card-subtitle>Dependencies</v-card-subtitle>
      <v-tooltip
        v-for="(dependency, i) in item.dependencies"
        :key="`dependency_chip_${item.name}-${i}`"
        top
      >
        <template v-slot:activator="{ props }">
          <v-chip small class="mx-1" @click="edit(dependency, i)" v-bind="props">
            {{ dependency.name }}
          </v-chip>
        </template>
        {{ dependency.version }}
        <v-divider />
        <div v-if="dependency.link">Link: {{ dependency.link }}</div>
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
            title="Add Dependency"
          >
            <v-btn icon @click="dialog = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field
                  v-model="dependency.name"
                  label="Name (must match exactly)"
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="dependency.version"
                  label="Version (must be valid semantic version)"
                  hide-details
                />
              </v-col>
            </v-row>
            <v-divider />
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field
                  v-model="dependency.link"
                  label="Link (optional, strongly recommended)"
                  hide-details
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
            <div v-show="!validVersion" class="text-center text-caption text-warning">
              INVALID LCP VERSION, MUST MATCH SEMVER
            </div>
            <v-spacer />
            <v-btn
              color="success darken-2"
              :disabled="!dependency.name || !dependency.version"
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
  name: 'dependency-builder',
  props: { item: { type: Object, required: true } },
  data: () => ({
    dialog: false,
    dependency: { name: '', version: '', link: '' } as any,
    isEdit: false,
    editIndex: -1,
  }),
  computed : {
    validVersion(){
      var regex = /^(\*|0|[1-9]\d*)\.(\*|0|[1-9]\d*)\.(\*|0|[1-9]\d*)(?:-((?:\*|0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:\*|0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
      if (!this.dependency.version) return false;
      else if (this.dependency.version.startsWith("=")) return regex.test(this.dependency.version.substring(1));
      else return regex.test(this.dependency.version);
    }
  },
  methods: {
    submit() {
      if (!this.dependency) return;
      if (this.isEdit) {
        this.item.dependencies[this.editIndex] = this.dependency;
      } else {
        if (!this.item.dependencies) this.item.dependencies = [];
        this.item.dependencies.push(this.dependency);
      }
      this.dependency = {};
      this.isEdit = false;
      this.editIndex = -1;
      this.dialog = false;
    },
    edit(dependency: any, index: number) {
      this.dependency = { ...dependency };
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove() {
      this.item.dependencies.splice(this.editIndex, 1);
      this.dialog = false;
    }
  },
};
</script>
