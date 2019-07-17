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

                <el-form :model=sectionB ref="formB" label-position="top" label-width="200px">
                    <el-form-item
                    v-for="(item, index) in sectionB.questionB"
                    :key="item.question_id"
                    :label="item.display_text"
                    :prop="'questionB.'+ index + '.default_data'"
                    :rules="{required: item.is_mandatory, message: 'this field is required', trigger: 'change'}">

                        <el-radio-group
                        v-if="(item.input_type === 'radio' || item.input_type === 'switch') && item.fields !== null"
                        v-model="item.default_data">
                            <el-radio
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-radio>
                        </el-radio-group>

                        <el-checkbox-group
                        v-else-if="item.input_type === 'checkbox' && item.fields !== null"
                        v-model="item.default_data">
                            <el-checkbox 
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-checkbox>
                        </el-checkbox-group>

                        <el-select
                        v-else-if="item.input_type === 'select' && item.fields !== null"
                        v-model="item.default_data">
                            <el-option
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data"
                            :value="option.data">
                            </el-option>
                        </el-select>

                        <el-input 
                        v-else-if="item.input_type === 'text' || item.input_type === 'textarea'"
                        v-model="item.default_data"
                        :type="item.input_type">
                        </el-input>

                        <el-input
                        v-else
                        v-model="item.default_data"
                        disabled>
                        </el-input>

                    </el-form-item>
                </el-form>
            </el-collapse-item>

            <el-collapse-item  name="C">

                <template slot="title">
                    <el-row class="section" type="flex" justify="center">Section C</el-row>
                </template>

                <el-form :model="sectionC" ref="formC" label-position="top" label-width="200px">
                    <el-form-item
                    v-for="(item, index) in sectionC.questionC"
                    :key="item.question_id"
                    :label="item.display_text"
                    :prop="'questionC.'+ index + '.default_data'"
                    :rules="{required: item.is_mandatory, message: 'this field is required', trigger: 'change'}">

                        <el-radio-group
                        v-if="(item.input_type === 'radio' || item.input_type === 'switch') && item.fields !== null"
                        v-model="item.default_data">
                            <el-radio
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-radio>
                        </el-radio-group>

                        <el-checkbox-group
                        v-else-if="item.input_type === 'checkbox' && item.fields !== null"
                        v-model="item.default_data">
                            <el-checkbox 
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-checkbox>
                        </el-checkbox-group>

                        <el-select
                        v-if="item.input_type === 'select' && item.fields !== null"
                        v-model="item.default_data">
                            <el-option
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data"
                            :value="option.data">
                            </el-option>
                        </el-select>

                        <el-input 
                        v-else-if="item.input_type === 'text' || item.input_type === 'textarea'"
                        v-model="item.default_data"
                        :type="item.input_type">
                        </el-input>

                        <el-input
                        v-else
                        v-model="item.default_data"
                        disabled>
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
        questionA: [],
        sectionB: {
            questionB: []
        },
        sectionC: {
            questionC: []
        },
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
        this.form.customer_id = this.$route.params.customerId // assign customer id
        this.questionList() // load questions
    },
    computed:{
        typeTitle() {
            return this.typeParams.charAt(0).toUpperCase() + this.typeParams.slice(1)
        }
    },
    methods: {
        // get all questions
		async questionList() {

            // get section A questions
            await getQuestionSet(this.typeParams, 'a').then(result => {
                this.form.kyc_question_set_id = result.data.data.id // assign question set id
                this.questionA = result.data.data.questions
                })
            //console.log(this.setId)

            // get section B questions
            await getQuestionSet(this.typeParams, 'b').then(result => {
                this.form.kyc_question_set_id = result.data.data.id // assign question set id
                this.sectionB.questionB = result.data.data.questions
            })

            // check for checkbox input type
            this.sectionB.questionB = this.sectionB.questionB.map(item => {
                if (item.input_type === "checkbox" && item.default_data === "") {
                    item.default_data = [] // need array for checkbox value
                }
                return item
            })

            // get section C questions
            await getQuestionSet(this.typeParams, 'c').then(result => {
                this.form.kyc_question_set_id = result.data.data.id // assign question set id
                this.sectionC.questionC = result.data.data.questions
            })

            // check for checkbox input type
            this.sectionC.questionC = this.sectionC.questionC.map(item => {
                if (item.input_type === "checkbox" && item.default_data === "") {
                    item.default_data = [] // need array for checkbox value
                }
                return item
            })
        },
        // submit form
        submit() {
            // assign answers to form object
            this.sectionB.questionB.forEach(item => {
                this.form.answers[item.question_id] = item.default_data
            })
            this.sectionC.questionC.forEach(item => {
                this.form.answers[item.question_id] = item.default_data
            })
            console.log(this.form.answers)

            // validation
            this.$refs['formB','formC'].validate(valid => {
                //console.log('validated')
                if (valid) {
                    sendAnswer(this.form).then(response => {
                        this.$notify.success({
                            title: 'Success',
                            message: 'Form submitted'
                        })
                        this.$router.go(-1)
                    }).catch(err => {
                        this.$notify.error({
                            title: 'Error',
                            message: err.message
                        })
                    })
                } else {
                    this.$message.error('Please fill in the required fields.')
                    return false;
                }
            })
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