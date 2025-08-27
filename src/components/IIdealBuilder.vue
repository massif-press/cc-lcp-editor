<template>
  <v-card>
    <v-toolbar density="comfortable" :color="`${color}`" :title="`${title}`"/>
    <div v-for="(ideal, i) in ideals" :key="`ideal_${item.id}-${i}`">
      <v-card flat>
        <v-icon v-if="i == ideals.length-1" style="display:flex; float:left; margin-top: 0.75em;" @click="(e) => {removeIdeal(i)}">mdi-close</v-icon>
        <v-icon v-else style="display:flex; float:left; margin-top: 0.75em;">mdi-menu-right</v-icon>
        <v-text-field @input="(e) => {setIdeal(e, i)}" :label="`Ideal #${i+1}`" persistent-placeholder :value="ideal" hide-details/>
      </v-card>
    </div>
    <br/>
    <v-btn size="small" variant="flat" @click="addIdeal">Add ideal</v-btn>
    <br/>
    <v-divider />
  </v-card>
</template>

<script lang="ts">

export default {
  name: 'ideal-builder',
  props: { 
    item: { type: Object, required: true }, 
    major: { type: Boolean, default: false },
  },
  data: () => ({
    dialog: false,
    ideals: [""] as string [],
    idealValues: [""] as string [],
    currentIdeal: '',
    isEdit: false,
    editIndex: -1,
  }),
  computed : {
    // Sync ideals with parent item
    title : function() {
      return this.major ? "Major Ideals" : "Minor Ideals";
    },
    color : function() {
      return this.major ? "pink darken-4" : "deep-orange darken-4";
    }
  },
  mounted () {
    if (this.major) this.ideals = this.item.major_ideals ? JSON.parse(JSON.stringify(this.item.major_ideals)) : [];
    else this.ideals = this.item.minor_ideals ? JSON.parse(JSON.stringify(this.item.minor_ideals)) : [];
    console.log(this.ideals);
    console.log(this.item.major_ideals);
  },
  methods: {
    addIdeal() {
      this.ideals.push(this.currentIdeal);
      this.currentIdeal = "";
      this.setParent();
    },
    setIdeal(e, iIndex: number) {
      const ideal = e.target.value;
      this.ideals[iIndex] = ideal;
      this.setParent();
    },
    removeIdeal(iIndex: number) {
      this.ideals.splice(iIndex, 1);
      this.setParent();
    },
    setParent(){
      if (this.major) this.item.major_ideals = JSON.parse(JSON.stringify(this.ideals));
      else this.item.minor_ideals = JSON.parse(JSON.stringify(this.ideals));
    }
  }
};
</script>
