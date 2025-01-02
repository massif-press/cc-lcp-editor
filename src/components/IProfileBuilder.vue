<template>
  <v-card variant="outlined" color="primary" class="pa-2 my-1">
    <v-card>
      <v-toolbar
        density="compact"
        color="primary"
        :title="isOnlyProfile ? parent.name : profile.name"
      >
        <v-chip>{{ index === 0 ? 'Default' : '' }} Weapon Profile</v-chip>

        <v-spacer />
        <v-btn v-if="index > 0" color="error" @click="remove(index)"
          >Delete</v-btn
        >
      </v-toolbar>

      <v-card-text>
        <v-row justify="space-around" align="end">
          <v-col>
            <v-text-field
              v-if="isOnlyProfile"
              label="Name"
              v-model="parent.name"
              readonly
              disabled
              persistent-hint
              hint="Single-profile weapons inherit the base object's name & effect"
            />
            <v-text-field v-else label="Name" v-model="profile.name" />
          </v-col>
          <v-col cols="auto">
            <v-text-field
              label="Use Cost"
              type="number"
              hide-details
              v-model="profile.cost"
            />
          </v-col>

          <v-col cols="auto">
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Allow Barrage"
              v-model="profile.barrage"
            />
          </v-col>
          <v-col cols="auto">
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Allow Skirmish"
              v-model="profile.skirmish"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-if="isOnlyProfile"
              label="Effect"
              readonly
              disabled
              persistent-hint
              hint="Single-profile weapons inherit the base object's effect"
            />            
            <rich-text-editor v-else label="Effect" title="Effect" v-model="profile.effect" />

            <damage-selector class="my-3" :item="profile" />

            <range-selector class="my-3" :item="profile" />
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <rich-text-editor
                  title="On Attack Effect"
                  v-model="profile.on_attack"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <rich-text-editor
                  title="On Hit Effect"
                  v-model="profile.on_hit"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <rich-text-editor
                  title="On Crit Effect"
                  v-model="profile.on_crit"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col><i-action-builder :item="profile" /></v-col>
          <v-col><i-bonus-builder :item="profile" /></v-col>
          <v-col><i-deployable-builder :item="profile" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col><i-synergy-builder :item="profile" /></v-col>
          <v-col><i-counter-builder :item="profile" /></v-col>
          <v-col><integrated-selector :item="profile" /></v-col>
          <v-col><special-equipment-selector :item="profile" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <tag-selector :item="profile" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'weapon-profile-editor',
  props: {
    parent: { type: Object, required: true },
    profile: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  computed: {
    isOnlyProfile() {
      return this.parent.profiles.length === 1;
    },
  },
  methods: {
    remove(index: number): void {
      this.parent.profiles.splice(index, 1);
    },
  },
};
</script>
