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
                    :rules="[{required: item.is_mandatory, message: 'field is required'}]">

                        <el-radio-group
                        v-if="item.input_type === 'radio' || item.input_type === 'switch'"
                        v-model="formB[index].value">
                            <el-radio
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-radio>
                        </el-radio-group>

                        <el-checkbox-group
                        v-else-if="item.input_type === 'checkbox'"
                        v-model="formB[index].value">
                            <el-checkbox 
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data">
                            {{option.data}}
                            </el-checkbox>
                        </el-checkbox-group>

                        <el-select
                        v-else-if="item.input_type === 'select'"
                        v-model="formB[index].value">
                            <el-option
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data"
                            :value="option.data">
                            </el-option>
                        </el-select>

                        <el-input 
                        v-else
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
                    :label="item.display_text"
                    :rules="[{required: item.is_mandatory, message: 'field is required'}]">

                        <el-select
                        v-if="item.input_type === 'select'"
                        v-model="formC[index].value">
                            <el-option
                            v-for="option in item.fields.choice"
                            :key="option.data"
                            :label="option.data"
                            :value="option.data">
                            </el-option>
                        </el-select>

                        <el-input 
                        v-else
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
        typeParams: '',
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
            return this.question.filter(item => item.section === "A")
        },
        questionB() {
            const B = this.question.filter(item => item.section === "B" )
            B.map(item => item.fields = JSON.parse(item.fields))
            B.forEach((item, i) => {
                this.formB[i] = {}
                this.formB[i].kyc_question_id = item.id
                this.formB[i].assignment_id = ''
                this.formB[i].customer_id = ''
                this.formB[i].value = ''
                this.formB[i].index = i
                if (item.input_type === "checkbox") {
                    this.formB[i].value = []
                }
                //console.log(this.formB[index])
            })
            return B
        },
        questionC() {
            const C = this.question.filter(item => item.section === "C")
            C.map(item => item.fields = JSON.parse(item.fields))
            C.forEach((item, index) => {
                this.formC[index] = {}
                this.formC[index].kyc_question_id = item.id
                this.formC[index].assignment_id = ''
                this.formC[index].customer_id = ''
                this.formB[index].value = ''
                this.formC[index].index = index
                if (item.input_type === "checkbox") {
                    this.formC[index].value = []
                }
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
            this.question = data.filter(item => 
            item.is_hidden === false  && ((item.type.slug === this.typeParams) || (item.type.slug === 'profile'))
            )
        },
        // submit answers   
        submit() {
            console.log('validate')
            console.log(this.formB)
            this.$refs['formB', 'formC'].validate((valid) => {
                console.log('validated')
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