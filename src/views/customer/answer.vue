<template>
    <div class="app-container">

        <h1>KYC Question</h1>

        <el-collapse v-model="activeName" accordion>

            <el-collapse-item title="Section A" name="A">
                <el-form label-width="200px" disabled>
                    <el-form-item
                    v-for="item in questionA"
                    :key="item.id"
                    :label="item.display_text">
                        <el-input :type="item.input_type" :value="item.default_data"></el-input>
                    </el-form-item> 
                </el-form>
            </el-collapse-item>

            <el-collapse-item title="Section B" name="B">
                <el-form label-width="200px">
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
                <el-form label-width="200px">
                    <el-form-item 
                    v-for="(item, index) in questionC" 
                    :key="item.id" 
                    :label="item.display_text">
                        <el-input 
                        v-model="formC[index].value" 
                        :type="item.input_type">
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
        typeParams: null,
        question: [],
        formB: [],
        formC: []
      };
    },
    created() {
        // get type params from parent
        this.typeParams = this.$route.params.type; 
        //console.log("params assigned: " + this.typeParams)
        // load questions
        this.questionList()
    },
    computed:{
        questionA() {
            return this.question.filter(item => item.section === 'A')
        },
        questionB() {
            const B = this.question.filter(item => item.section === "B" )
            B.forEach((item, index) => {
                this.formB[index] = {}
                this.formB[index].kyc_question_id = item.id
                //console.log(this.formB[index])
            })
            return B
        },
        questionC() {
            const C = this.question.filter(item => item.section === "C")
            C.forEach((item, index) => {
                this.formC[index] = {}
                this.formC[index].kyc_question_id = item.id
            })
            return C
        }
    },
    methods: {
        // get all question
		async questionList() {
            this.cleanQuestion((await getQuestionAll()).data.data)
            //console.log(this.question)
        },
        // clean question based on hidden and type
        cleanQuestion(data) {
            this.question = data.filter(item => (item.hidden != true) && ((item.type.slug === this.typeParams) || (item.type.slug === 'profile')))
        },
        // submit answers
        submit() {
            console.log(this.formB)
            console.log(this.formC)
            this.formB.forEach((item) => sendAnswer(item))
            this.formC.forEach((item) => sendAnswer(item))
        }
    }
}
</script>