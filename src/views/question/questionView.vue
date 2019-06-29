<template>
  <div class="app-container">
    <el-card> 
        <h1>{{ question.display_text }}</h1>
        {{ question.section }}
        {{ question.description }}
        {{ question.origin }}
        {{ question.category }}
        {{ question.display_text }}
    </el-card>
  </div>
</template>

<script>
import { getQuestionShow } from "@/api/kyc/question";
import Pagination from "@/components/Pagination";
export default {
  name: "index",
  components: {
    Pagination
  },
  data() {
    return {
      question: {
        field_name: "aa",
        display_text: "",
        section: "",
        description: "",
        origin: "entry",
        category_id: "",
        type_id: "",
        default_data: "",
        only_default: true,
        input_type: "text",
        fields: {
          choice: [],
          column: 0,
          row: 0
        }
      }
    };
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    async getQuestion() {
      const questionId = this.$store.state.route.params.questionId

      getQuestionShow(questionId)
        .then(res => {
          const data = res.data.data;
          (this.question.field_name = data.field_name),
            (this.question.display_text = data.display_text),
            (this.question.section = data.section),
            (this.question.description = data.description),
            (this.question.origin = data.origin);
          (this.question.category = data.category),
            (this.question.type = data.type),
            (this.question.default_data = data.default_data),
            (this.question.only_default = data.only_default),
            (this.question.input_type = data.input_type),
            (this.question.fields = data.fields);
        })
        .catch(error => {
          console.log(error.response);
        });

      console.log(this.question);
    }
  }
};
</script>


<style>
</style>
