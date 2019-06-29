<template>
    <div class="app-container">
        <h1>KYC Question</h1>
        <el-collapse v-model="activeName" accordion v-loading="loading">
            <el-collapse-item title="Section A" name="A">
                <el-form ref="formA" :model="formA" label-width="120px" disabled>
                    <el-form-item 
                    v-for="item in questionA" 
                    :key="item.id"
                    :label="item.display_text">
                        <el-input :type="item.input_type" :value="item.default_data"></el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="Section B" name="B">
                <el-form ref="formB" :model="formB" label-width="120px">
                    <el-form-item
                    v-for="(item, index) in questionB"
                    :key="item.id"
                    :label="item.display_text">
                        <el-input v-model="formB[index].value" :type="item.input_type" :value="item.default_data"></el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="Section C" name="C">
                <el-form ref="formC" :model="formC" label-width="120px">
                    <el-form-item 
                    v-for="item in questionC" 
                    :key="item.id" 
                    :label="item.display_text"></el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <el-row>
            <el-button type="primary" @click="submit">Submit</el-button>
        </el-row>
    </div>
</template>

<script>
import { getQuestionIndex } from "@/api/kyc/question";

export default {
    data() {
      return {
        activeName: 'A',
        loading: false,
        type,
        question: [],
        formA: [],
        formB: [],
        formC: []
      };
    },
    created() {
        // TODO: get type from parent
        this.type = this.$route.params.type; 
        // load questions
        this.questionList()
    },
    computed:{
        questionA: function() {
            return this.question.filter(function(item) {
                return item.section === "A"
            })
        },
        questionB: function() {
            const B = this.question.filter(function(item) {
                return item.section === "B"
            });
            var Bindex = []
            B.forEach(function(item, index){
                Bindex += (item, index)
                this.formB[index].kyc_question_id = item.id
            });
            return Bindex;
        },
        questionC: function() {
            return this.question.filter(function(item) {
                return item.section === "C"
            })
        },
    },
    methods: {
        // get all question
		async questionList() {
			this.loading = true
            this.question = this.cleanQuestion(await getQuestionIndex(3).data.data)
            this.loading = false
        },
        // clean question based on hidden and type
        cleanQuestion: function (list) {
            return list.filter(function(item){
                return (item.hidden != true) && (item.type.slug == this.type)
            })
        },
        // submit answers
        submit() {
            console.log(formB)
        }
    }
}
</script>