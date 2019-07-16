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
                    :key="item.question_id"
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
                    v-for="item in questionB"
                    :key="item.question_id"
                    :label="item.display_text"
                    :required="item.is_mandatory"
                    :rules="[{required: true, message: 'field is required'}]">

                        <el-radio-group
                        v-if="item.input_type === 'radio' || item.input_type === 'switch'"
                        v-model="form.answers[item.question_id]">
                            <el-radio
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-radio>
                        </el-radio-group>

                        <el-checkbox-group
                        v-else-if="item.input_type === 'checkbox'"
                        v-model="form.answers[item.question_id]">
                            <el-checkbox 
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-checkbox>
                        </el-checkbox-group>

                        <el-select
                        v-else-if="item.input_type === 'select'"
                        v-model="form.answers[item.question_id]">
                            <el-option
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data"
                            :value="option.data">
                            </el-option>
                        </el-select>

                        <el-input 
                        v-else
                        v-model="form.answers[item.question_id]" 
                        :type="item.input_type"
                        :value="item.default_data"
                        >
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
                    v-for="item in questionC" 
                    :key="item.question_id" 
                    :label="item.display_text"
                    :required="item.is_mandatory"
                    :rules="[{required: true, message: 'field is required'}]">

                        <el-select
                        v-if="item.input_type === 'select'"
                        v-model="form.answers[item.question_id]">
                            <el-option
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data"
                            :value="option.data">
                            </el-option>
                        </el-select>

                        <el-input 
                        v-else
                        v-model="form.answers[item.question_id]" 
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
import { getQuestionSet } from "@/api/kyc/question";
import { sendAnswer } from "@/api/kyc/answer";

export default {
    data() {
      return {
        activeName: 'A',
        typeParams: '',
        customerId: '',
        questionA: [],
        questionB: [],
        questionC: [],
        form: {
            kyc_question_set_id: "",
            origin_type: "entry",
            origin_id: "null",
            customer_id: "",
            answers: {}
        }
      };
    },
    created() {
        // get params from parent
        this.typeParams = this.$route.params.type
        this.form.customer_id = this.$route.params.customerId
        // load questions
        this.questionList()
    },
    computed:{
        typeTitle() {
            return this.typeParams.charAt(0).toUpperCase() + this.typeParams.slice(1)
        }
    },
    methods: {
        // get all question
		async questionList() {
            await getQuestionSet(this.typeParams, 'a').then(result => {
                this.form.kyc_question_set_id = result.data.data.id
                this.questionA = result.data.data.questions
                })
            //console.log(this.setId)
            this.questionB = ((await getQuestionSet(this.typeParams, 'b')).data.data.questions)
            //console.log(this.sectionB)
            this.questionB.forEach(item => {
                this.form.answers[item.question_id] = ""
                if (item.input_type === "checkbox") {
                    this.form.answers[item.question_id] = []
                }
            })
            //console.log(this.sectionB.map(item => {if (item.fields !== null) item.fields = JSON.parse(item.fields)}))
            this.questionC = (await getQuestionSet(this.typeParams, 'c')).data.data.questions
            //console.log(this.sectionC)
            this.questionC.forEach(item => {
                this.form.answers[item.question_id] = ""
                if (item.input_type === "checkbox") {
                    this.form.answers[item.question_id] = []
                }
            })
            //console.log(this.sectionC.map(item => {if (item.fields !== null) item.fields = JSON.parse(item.fields)}))
        },
        // submit answers   
        submit() {
            console.log(this.form.answers)
            this.$refs['formB', 'formC'].validate(valid => {
                console.log('validated')
                if (valid) {
                    try {
                        console.log('hi')
                        sendAnswer(form)
                        this.$notify({
                            title: 'Success',
                            message: 'Answer submitted'
                        })
                        this.$router.push("index")
                    } catch (err) {
                        this.$notify.error({
                            title: 'Error',
                            message: err.message
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
    margin: 0px 80px;
    font-size: 20px;
    color: slategray;
}

.el-form {
    margin: 10px 80px;
}
</style>