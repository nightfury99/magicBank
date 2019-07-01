<template>
    <div class="app-container" style="margin: 10px 100px">

        <h1 class="crm-heading-title">{{typeTitle}} KYC Question</h1>

        <el-collapse v-model="activeName" accordion>

            <el-collapse-item style="line-height: 50px" name="A">
                <template slot="title">
                    <el-row class="section" type="flex" justify="center">Section A</el-row>
                </template>
                <el-form label-position="top" label-width="200px" disabled>
                    <el-form-item
                    v-for="item in questionA"
                    :key="item.id"
                    :label="item.display_text">
                        <el-input :type="item.input_type" :value="item.default_data"></el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>

            <el-collapse-item name="B">
                <template slot="title">
                    <el-row class="section" type="flex" justify="center">Section B</el-row>
                </template>
                <el-form ref="formB" label-position="top" label-width="200px">
                    <el-form-item
                    v-for="(item, index) in questionB"
                    :key="item.id"
                    :label="item.display_text"
                    :rules="[
                    { required: item.is_mandatory, message: 'age is required'},
                    { type: item.input_type, message: 'age must be a number'}
                    ]">
                        <el-input 
                        v-model="formB[index].value" 
                        :type="item.input_type" 
                        :value="item.default_data">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>

            <el-collapse-item  name="C">
                <template slot="title">
                    <el-row class="section" type="flex" justify="center">Section C</el-row>
                </template>
                <el-form ref="formC" label-position="top" label-width="200px">
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

        <el-row type="flex" justify="center" style="margin-top: 20px">
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
        typeTitle() {
            return this.typeParams.charAt(0).toUpperCase() + this.typeParams.slice(1)
        },
        questionA() {
            return this.question.filter(item => item.section === 'A')
        },
        questionB() {
            const B = this.question.filter(item => item.section === "B" )
            B.forEach((item, index) => {
                this.formB[index] = {}
                this.formB[index].kyc_question_id = item.id
                this.formB[index].assignment_id = null
                this.formB[index].customer_id = null
                this.formB[index].index = null
                //console.log(this.formB[index])
            })
            return B
        },
        questionC() {
            const C = this.question.filter(item => item.section === "C")
            C.forEach((item, index) => {
                this.formC[index] = {}
                this.formC[index].kyc_question_id = item.id
                this.formC[index].assignment_id = null
                this.formC[index].customer_id = null
                this.formC[index].index = null
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
        async submit() {
            console.log('try')
            this.$refs['formB'].validate((valid) => {
            console.log('valid')
            if (valid) {
                try {
                    console.log('hi')
                    this.formB.forEach((item) => {
                        if (item.value) sendAnswer(item)
                    })
                    this.formC.forEach((item) => {
                        if (item.value) sendAnswer(item)
                    })
                    this.$notify({
                        title: 'Success',
                        message: 'Answer submitted'
                    })
                    this.$router.push("index")
                } catch (error) {
                    this.$notify.error({
                        title: 'Error',
                        message: error.message
                    })
                }
            } else {
                this.$message.error('error')
                return false;
            }
            });
        }
    }
}
</script>

<style scoped>
.section {
    margin: 0px 60px;
    font-size: 20px;
    color: slategray;
}

.el-form {
    margin: 10px 60px;
}
</style>