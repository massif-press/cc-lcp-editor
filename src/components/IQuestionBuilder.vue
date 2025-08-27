<template>
  <v-card>
    <v-toolbar density="comfortable" color="green darken-2" title="Questions" />
    <div v-for="(question, i) in questions" :key="`question_${item.id}-${i}`">
      <v-text-field v-model="question.question" :label="`Question ${i+1}`" hide-details />
      <v-card flat>
        <div v-for="(option, j) in question.options" :key="`question_${item.id}-${i}-${j}`">
          <v-icon v-if="j == question.options.length-1" style="display:flex; float:left; margin-top: 0.75em;" @click="(e) => {removeOption(i, j)}">mdi-close</v-icon>
          <v-icon v-else style="display:flex; float:left; margin-top: 0.75em;">mdi-menu-right</v-icon>
          <v-text-field @input="(e) => {setOption(e, i, j)}" label="Option" :value="option" persistent-placeholder hide-details/>
        </div>
        <br/>
        <v-btn size="small" variant="flat" @click="addOption(i)">Add Option</v-btn>
        <v-btn size="small" variant="flat" @click="removeQuestion(i)">Remove Question</v-btn>
      </v-card>
      <br/>
      <v-divider />
    </div>
    <br/>
    <div style="text-align:center"><v-btn size="medium" variant="flat" @click="addQuestion">Add Question</v-btn></div>
    <br/>
    <v-divider />
  </v-card>
</template>

<script lang="ts">

export default {
  name: 'question-builder',
  props: { item: { type: Object, required: true } },
  data: () => ({
    dialog: false,
    questions: [{question: "" as string, options: [""] as string[]}],
    currentQuestion: {question: "", options: [""] as string[]},
    currentOption: '',
    isEdit: false,
    editIndex: -1,
  }),
  mounted () {
    this.questions = this.item.questions ? JSON.parse(JSON.stringify(this.item.questions)) : [{question: "" as string, options: [""] as string[]}];
  },
  methods: {
    addQuestion() {
      this.questions.push(this.currentQuestion);
      this.currentQuestion = {question: "", options: []};
      this.setParent();
    },
    addOption(index: number){
      this.questions[index].options.push("" as string);
      this.currentOption = '';
      this.setParent();
    },
    setOption(e, qIndex: number, oIndex: number) {
      const option = e.target.value;
      this.questions[qIndex].options[oIndex] = option;
      this.setParent();
    },
    removeOption(qIndex: number, oIndex: number) {
      this.questions[qIndex].options.splice(oIndex, 1);
      this.setParent();
    },
    removeQuestion(qIndex) {
      this.questions.splice(qIndex, 1);
      this.setParent();
    },
    setParent(){
      this.item.questions = JSON.parse(JSON.stringify(this.questions));
    }
  }
};
</script>
