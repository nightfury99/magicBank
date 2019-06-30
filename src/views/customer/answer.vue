<template>
    <div class="app-container">
        <h1>KYC Question</h1>
        <el-collapse v-model="activeName" accordion>
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
                        <el-input 
                        v-model="formB[index].value" 
                        :type="item.input_type" 
                        :value="item.default_data">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="Section C" name="C">
                <el-form ref="formC" :model="formC" label-width="120px">
                    <el-form-item 
                    v-for="(item, index) in questionC" 
                    :key="item.id" 
                    :label="item.display_text">
                        <el-input 
                        v-model="formC[index].value" 
                        :type="item.input_type" 
                        :value="item.default_data">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <el-row>
            <el-button type="primary" @click="submit">Submit</el-button>
        </el-row>
    </div>
</template>

<script>
import { getQuestionAll } from "@/api/kyc/question";
import { sendAnswer } from "@/api/kyc/answer";

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
        // get type params from parent
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
            const C = this.question.filter(function(item) {
                return item.section === "C"
            });
            var Cindex = []
            C.forEach(function(item, index){
                Cindex += (item, index)
                this.formC[index].kyc_question_id = item.id
            });
            return Cindex;
        },
    },
    methods: {
        // get all question
		async questionList() {
		    const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.question = this.cleanQuestion(await getQuestionAll().data.data)
            loading.close();
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
            console.log(formC)
            //formB.forEach(sendAnswer(item))
            //formC.forEach(sendAnswer(item))
        }
    }
}
</script>