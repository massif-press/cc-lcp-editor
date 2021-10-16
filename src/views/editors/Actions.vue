<template>
  <v-container>
    <div>
      <div class="overline">Quick Navigation</div>
      <v-btn v-for="a in lcp.actions" :key="`btn${a.id}`">
        {{ a.name }}
      </v-btn>
    </div>
    <v-divider class="my-3" />
    <v-row>
      <v-col cols="6" v-for="action in lcp.actions" :key="`action_${action.id}`">
        <v-card>
          <v-toolbar dense color="primary" class="white--text text-h6">{{ action.name }}</v-toolbar>
          <v-card-text>
            <v-row>
              <v-col><v-text-field label="ID" v-model="action.id" /></v-col>
              <v-col><v-text-field label="Action Name" v-model="action.name" /></v-col>
              <v-col><v-select label="Activation" v-model="action.activation" /></v-col>
            </v-row>
            <v-text-field label="Short Description" v-model="action.terse" />
            <v-textarea label="Long Description" v-model="action.detail" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn>Duplicate</v-btn>
            <v-btn color="error darken-2">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <div class="px-8">
      <v-btn color="primary darken-2" block x-large>
        <v-icon large>mdi-plus</v-icon>
        Add New Action
      </v-btn>
    </div>
    <v-divider class="my-3" />
    <v-alert
      prominent
      :icon="errors.length ? 'mdi-alert' : 'mdi-check'"
      :color="errors.length ? 'error darken-2' : 'success darken-2'"
      class="text-center"
    >
      <code class="error-msg">
        <span v-html="errors.length ? errors.join('<br>') : 'No errors detected!'" />
      </code>
    </v-alert>
    <v-footer fixed>
      <v-btn text to="/">
        <v-icon>mdi-chevron-left</v-icon>
        back
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

function getDuplicateProperties(arr: any[], prop: string) {
  let sorted = arr.map(x => x[prop]).sort()
  let results = []
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] == sorted[i]) {
      results.push(sorted[i])
    }
  }
  console.log(results)
  return results
}

export default Vue.extend({
  name: 'action-editor',
  computed: {
    loaded() {
      return this.$store.getters.loaded
    },
    lcp() {
      return this.$store.getters.lcp
    },
    errors() {
      const arr = []
      getDuplicateProperties(this.lcp.actions, 'id').forEach(id => {
        arr.push(`Duplicate ID detected:   ${id}`)
      })
      getDuplicateProperties(this.lcp.actions, 'name').forEach(id => {
        arr.push(`Duplicate Item name detected:   ${id}`)
      })
      return arr
    },
  },
})
</script>

<style scoped>
.error-msg {
  font-size: 18px !important;
}
</style>
