<template>
  <v-card>
    <v-toolbar dense>Community LCP Metadata Editor</v-toolbar>
    <v-card-text>
      <p>
        This tool will automatically update the metadata of your LCP linked in COMP/CON's community
        content section. You can get your passcode by contacting Beef via the usual means.
      </p>
      <v-row dense align="center">
        <v-col>
          <v-text-field
            v-model="passcode"
            outlined
            dense
            hide-details
            label="Passcode"
            :readonly="connected"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn color="warning darken-1" :loading="connect_loading" @click="connect">
            Connect
          </v-btn>
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="title"
              outlined
              dense
              hide-details
              label="Item Title"
              :disabled="!connected"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="link"
              outlined
              dense
              hide-details
              label="itch.io URL"
              :disabled="!connected"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="image"
              outlined
              dense
              hide-details
              label="itch Image URL"
              :disabled="!connected"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="website"
              outlined
              dense
              hide-details
              label="Author Site"
              :disabled="!connected"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="author"
              outlined
              dense
              hide-details
              label="Author"
              :disabled="!connected"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="cost"
              outlined
              dense
              hide-details
              label="Cost"
              :disabled="!connected"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="description"
              outlined
              dense
              hide-details
              label="Short Description"
              :disabled="!connected"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="name"
              outlined
              dense
              hide-details
              label="LCP Name"
              hint="Must match exactly"
              persistent-hint
              :disabled="!connected"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="version"
              outlined
              dense
              hide-details
              label="LCP Version"
              hint="Must match exactly"
              persistent-hint
              :disabled="!connected"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-btn large block color="indigo" :disabled="!connected">Submit Changes</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'lcp-meta-form',
  data: () => ({
    passcode: '',
    connect_loading: false,
    connected: false,
    submit_loading: false,
    title: '',
    link: '',
    website: '',
    author: '',
    cost: '',
    name: '',
    description: '',
    version: '',
  }),
  methods: {
    connect() {
      console.log(this.passcode)
      this.connect_loading = true
      this.connected = true
      this.connect_loading = false
      this.$emit('emit-toast', {
        color: 'success darken-2',
        text: `Connected! LCP metadata load successful`,
      })
    },
  },
})
</script>
