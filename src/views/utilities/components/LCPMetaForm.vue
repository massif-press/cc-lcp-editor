<template>
  <v-card>
    <v-card-title>Community LCP Metadata Editor</v-card-title>
    <v-card-text>
      <p>
        This tool will automatically update the metadata of your LCP linked in
        COMP/CON's community content section. You can get your passcode by
        contacting Beef via the usual means.
      </p>
      <v-row density="compact" align="center" class="px-10 my-4">
        <v-col cols="3">
          <v-text-field
            v-model="passcode"
            :outlined="!connected"
            density="compact"
            hide-details
            label="Passcode"
            :disabled="connected"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="warning darken-1"
            :loading="connect_loading"
            @click="connect"
          >
            Connect
          </v-btn>
        </v-col>
      </v-row>
      <v-fade-transition>
        <v-card v-if="connected">
          <v-card-text>
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="title"
                      density="compact"
                      hide-details
                      outlined
                      label="Item Title"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="link"
                      density="compact"
                      hide-details
                      outlined
                      label="itch.io URL"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="img"
                      density="compact"
                      hide-details
                      outlined
                      label="itch Image URL"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="website"
                      density="compact"
                      hide-details
                      outlined
                      label="Author Site"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="author"
                      density="compact"
                      hide-details
                      outlined
                      label="Author"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="cost"
                      density="compact"
                      hide-details
                      outlined
                      label="Cost"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="description"
                      density="compact"
                      hide-details
                      outlined
                      label="Short Description"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="name"
                      density="compact"
                      hide-details
                      outlined
                      label="LCP Name"
                      hint="Must match exactly"
                      persistent-hint
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="version"
                      density="compact"
                      hide-details
                      outlined
                      label="LCP Version"
                      hint="Must match exactly"
                      persistent-hint
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col v-if="img" cols="2" align-self="center">
                <v-img :src="img" />
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <v-btn
              large
              block
              color="indigo"
              :loading="submit_loading"
              @click="updatePack"
            >
              Submit Changes
            </v-btn>
          </v-card-text>
        </v-card>
      </v-fade-transition>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { getPack, putPack, scan } from './lcp_api';

export default {
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
    img: '',
  }),
  methods: {
    async connect() {
      // eslint-disable-next-line
      const self = this;
      this.connect_loading = true;
      await getPack(this.passcode)
        .then((res) => {
          const item = res.data.Item;
          this.connect_loading = false;
          if (!Object.keys(item).length) {
            this.$emit('emit-toast', {
              color: 'error darken-2',
              text: `No LCP found matching this passcode`,
            });
          } else {
            this.connected = true;
            this.$emit('emit-toast', {
              color: 'success darken-2',
              text: `Connected! LCP metadata load successful`,
            });
            Object.keys(item).forEach((e) => {
              self[e] = item[e];
            });
          }
        })
        .catch((err) => {
          this.connect_loading = false;
          console.error(err);
          this.$emit('emit-toast', {
            color: 'error darken-2',
            text: `ERR: ${err}`,
          });
        });

      this.connect_loading = false;
    },
    async updatePack() {
      this.submit_loading = true;
      putPack({
        passcode: this.passcode,
        title: this.title,
        link: this.link,
        website: this.website,
        author: this.author,
        cost: this.cost,
        name: this.name,
        description: this.description,
        version: this.version,
        img: this.img,
      })
        .then(() => {
          this.submit_loading = false;
          this.$emit('emit-toast', {
            color: 'success',
            text: `Data Upload Successful!`,
          });
          this.connected = false;
        })
        .catch((err) => {
          this.$emit('emit-toast', {
            color: 'error darken-2',
            text: `ERR: ${err}`,
          });
          this.submit_loading = false;
        });
    },
  },
};
</script>
