<template>
  <div class="app-container">
    <el-row>
      <div style="margin: 0px 100px 45px 100px">
        <el-button
          type="primary"
          icon="el-icon-back"
          v-on:click="navigateBack()"
          style="float:left"
        >Back</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          v-if="viewMode==true"
          v-on:click="deleteConfirmation()"
          style="float:right"
        >Delete</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          v-if="viewMode==true"
          v-on:click="makeEditable()"
          style="float:right"
        >Edit</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card" style="margin: 10px 100px">
          <el-form
            label-position="top"
            :rules="rules"
            ref="question"
            :model="question"
            :disabled="this.viewMode"
          >
            <el-row>
              <el-form-item label="Question Name" prop="display_text">
                <el-col :span="24">
                  <el-input placeholder="Enter Question Name" v-model="question.display_text" />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col style="width:33%">
                <el-form-item label="Section" prop="section">
                  <el-select
                    v-model="question.section"
                    value-key="question.section"
                    placeholder="Select Section"
                  >
                    <el-option
                      v-for="section in sectionOption"
                      :key="section.value"
                      :label="section.label"
                      :value="section.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="Question Description" prop="description">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="Enter Question Description"
                v-model="question.description"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col style="width:33%">
                <el-form-item label="Question Input Type" prop="input_type">
                  <el-select
                    v-model="question.input_type"
                    placeholder="Select Question Input Type"
                    v-on:change="onChange()"
                  >
                    <el-option
                      v-for="questionType in questionTypeOption"
                      :key="questionType.value"
                      :label="questionType.label"
                      :value="questionType.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col style="width:33%">
                <el-form-item label="Mandatory Question">
                  <el-switch v-model="question.is_mandatory" active-text="Mandatory"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <div
              v-if="question.input_type=='radio'||question.input_type=='checkbox'||question.input_type=='select'||question.input_type=='switch'"
            >
              <el-form-item
                v-for="(field, index) in question.fields.choice "
                :label="'Question Choice ' + (index+1)"
                :key="field.key"
                :prop="'fields.choice.' + index + '.data'"
                :rules="{
      required: true, message: 'Question Choice cannot be empty', trigger: 'blur'
    }"
              >
                <el-input v-model="field.data" placeholder="Enter Question Choice">
                  <el-button
                    slot="append"
                    icon="el-icon-minus"
                    @click="removeChoice(field)"
                    v-show="(index || (!index && question.fields.choice.length > 1 ))&&question.input_type!='switch'"
                  ></el-button>
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="addChoice()"
                    v-show="(index == question.fields.choice.length -1)&&question.input_type!='switch'"
                  ></el-button>
                </el-input>
              </el-form-item>
            </div>

            <el-form-item label="Table Properties" v-if="question.input_type=='table'">
              <el-form-item
                v-for="(field, index) in question.fields.choice "
                :label="'Column Header ' + (index+1)"
                :key="field.key"
                :prop="'fields.choice.' + index + '.data'"
                :rules="{
      required: true, message: 'Column Header cannot be empty', trigger: 'blur'
    }"
              >
                <el-input v-model="field.data" placeholder="Enter Column Header">
                  <el-button
                    slot="append"
                    icon="el-icon-minus"
                    @click="removeChoice(field)"
                    v-show="(index || (!index && question.fields.choice.length > 1 ))&&question.input_type!='switch'"
                  ></el-button>
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="addChoice()"
                    v-show="(index == question.fields.choice.length -1)&&question.input_type!='switch'"
                  ></el-button>
                </el-input>
              </el-form-item>

              <el-form-item label="Table Rows">
                <el-input-number
                  placeholder="Enter Table Row"
                  v-model.number.lazy="question.fields.row"
                  :min="1"
                ></el-input-number>
              </el-form-item>
            </el-form-item>

            <el-form-item label="Default Value (Optional)">
              <el-col :span="24">
                <el-input placeholder="Enter Default Value" v-model="question.default_data" />
              </el-col>
            </el-form-item>

            <el-row>
              <el-button type="primary" v-if="this.viewMode==false" @click="updateQuestion()">Save</el-button>
              <el-button type="primary" v-if="this.viewMode==false" @click="makeUneditable()">Cancel</el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogDelete" title="Delete Confirmation" width="30%">
      <span>Delete this Question?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">Cancel</el-button>
        <el-button type="primary" @click="deleteQuestion">Delete</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getQuestionShow,
  putQuestion,
  deleteQuestion
} from "@/api/kyc/question";

import Pagination from "@/components/Pagination";
export default {
  name: "index",
  components: {
    Pagination
  },
  data() {
    return {
      jsonstring: "",
      dialogDelete: false,
      viewMode: true,
      sectionOption: [
        {
          value: "B",
          label: "B"
        },
        {
          value: "C",
          label: "C"
        }
      ],
      questionTypeOption: [
        {
          value: "text",
          label: "Text"
        },
        {
          value: "textarea",
          label: "Text Area"
        },
        {
          value: "radio",
          label: "Radio"
        },
        {
          value: "checkbox",
          label: "Checkbox"
        },
        {
          value: "select",
          label: "Select"
        },
        {
          value: "switch",
          label: "Switch"
        },
        {
          value: "table",
          label: "Table"
        }
      ],
      question: {
        id: "",
        field_name: "",
        display_text: "",
        section: "",
        description: "",

        default_data: "",
        only_default: true,
        input_type: "",
        fields: {
          choice: [
            {
              data: "",
              key: ""
            }
          ],
          column: 0,
          row: 0
        },
        is_mandatory: true
      },
      rules: {
        display_text: [
          {
            required: true,
            message: "Please Enter Question Name",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "Please Enter Question Description",
            trigger: "blur"
          }
        ],
        choice: [
          {
            required: true,
            message: "Please Enter Question Choice",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    navigateBack() {
      this.$router.go(-1);
    },
    navigateTo(route) {
      this.$router.push(route);
    },

    async getQuestion() {
      this.question.id = this.$store.state.route.params.questionId;

      getQuestionShow(this.question.id)
        .then(res => {
          const data = res.data.data;
          (this.question.field_name = data.field_name),
            (this.question.display_text = data.display_text),
            (this.question.section = data.section),
            (this.question.description = data.description),
            (this.question.default_data = data.default_data),
            (this.question.only_default = data.only_default),
            (this.question.input_type = data.input_type.toLowerCase()),
            (this.question.fields = JSON.parse(data.fields)),
            (this.question.is_mandatory = data.is_mandatory);
        })
        .catch(error => {
          console.log(error.response);
        });

      console.log(this.question);
    },
    async updateQuestion() {
      console.log(this.question);
      this.question.field_name = this.question.display_text;
      this.question.fields = JSON.stringify(this.question.fields);
      try {
        await putQuestion(this.question);
        console.log(this.question);

        this.$message({
          message: this.question.display_text + " field " + "is updated",
          type: "success"
        });
        this.question.fields = JSON.parse(this.question.fields);
        this.viewMode = true;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteQuestion() {
      console.log();
      try {
        await deleteQuestion(this.question.id);
      } catch (err) {
        console.log(err);
        alert(err);
      }
      this.dialogDelete = false;
      this.navigateBack();
    },
    async deleteConfirmation() {
      this.dialogDelete = true;
    },
    makeEditable() {
      this.viewMode = false;
    },
    makeUneditable() {
      this.viewMode = true;
    },
    onChange() {
      if (
        this.question.input_type == "radio" ||
        this.question.input_type == "checkbox" ||
        this.question.input_type == "select" ||
        this.question.input_type == "table"
      ) {
        this.question.fields.choice = [
          {
            data: "",
            key: 1
          }
        ];
      } else if (this.question.input_type === "switch") {
        this.question.fields.choice = [
          {
            data: "",
            key: 1
          },
          {
            data: "",
            key: 2
          }
        ];
      } else {
        this.question.fields.choice = [];
      }
    },

    removeChoice(item) {
      var index = this.question.fields.choice.indexOf(item);
      if (index !== -1) {
        this.question.fields.choice.splice(index, 1);
      }
    },
    addChoice() {
      this.question.fields.choice.push({
        key: Date.now(),
        data: ""
      });
    }
  }
};
</script>


<style>
.qChoice {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
