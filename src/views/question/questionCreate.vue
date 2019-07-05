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
      </div>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card" style="margin: 10px 100px">
          <el-form label-position="top" :rules="rules" ref="newQuestion" :model="newQuestion">
            <el-form-item label="Question Name" prop="display_text">
              <el-col :span="24">
                <el-input placeholder="Enter Question Name" v-model="newQuestion.display_text" />
              </el-col>
            </el-form-item>

            <el-row>
              <el-col style="width:33%">
                <el-form-item label="Section" prop="section">
                  <el-select v-model="newQuestion.section" placeholder="Select Section">
                    <el-option
                      v-for="section in sectionOption"
                      :key="section.value"
                      :label="section.label"
                      :value="section.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col style="width:33%">
                <el-form-item label="Category" prop="category_id">
                  <el-select v-model="newQuestion.category_id" placeholder="Select Category">
                    <el-option
                      v-for="(category,index) in categoryOption"
                      :key="index"
                      :label="category.name"
                      :value="category.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col style="width:33%">
                <el-form-item label="Type" prop="type_id">
                  <el-select v-model="newQuestion.type_id" placeholder="Select Type">
                    <el-option
                      v-for="(type,index) in typeOption"
                      :key="index"
                      :label="type.name"
                      :value="type.id"
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
                v-model="newQuestion.description"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col style="width:33%">
                <el-form-item label="Question Input Type" prop="input_type">
                  <el-select
                    v-model="newQuestion.input_type"
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
                <el-form-item label="Hidden Question">
                  <el-switch v-model="newQuestion.is_hidden" active-text="Hidden"></el-switch>
                </el-form-item>
              </el-col>
              <el-col style="width:33%">
                <el-form-item label="Mandatory Question">
                  <el-switch v-model="newQuestion.is_mandatory" active-text="Mandatory"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <div
              v-if="newQuestion.input_type=='radio'||newQuestion.input_type=='checkbox'||newQuestion.input_type=='select'||newQuestion.input_type=='switch'"
            >
              <el-form-item
                v-for="(field, index) in newQuestion.fields.choice "
                :label="'Question Choice ' + (index+1)"
                :key="field.key"
                :prop="'fields.choice.' + index + '.data'"
                :rules="{
      required: true, message: 'Question Choice cannot be empty', trigger: 'blur'
    }"
              >
                <el-input v-model="field.data" placeholder="Enter Question Choice" class="qChoice">
                  <el-button
                    slot="append"
                    icon="el-icon-minus"
                    @click="removeChoice(field)"
                    v-show="(index || (!index && newQuestion.fields.choice.length > 1 ))&&newQuestion.input_type!='switch'"
                  ></el-button>
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="addChoice()"
                    v-show="(index == newQuestion.fields.choice.length -1)&&newQuestion.input_type!='switch'"
                  ></el-button>
                </el-input>
              </el-form-item>
            </div>

            <el-form-item label="Table Properties" v-if="newQuestion.input_type=='table'">
              <el-form-item
                v-for="(field, index) in newQuestion.fields.choice "
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
                    v-show="(index || (!index && newQuestion.fields.choice.length > 1 ))&&newQuestion.input_type!='switch'"
                  ></el-button>
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="addChoice()"
                    v-show="(index == newQuestion.fields.choice.length -1)&&newQuestion.input_type!='switch'"
                  ></el-button>
                </el-input>
              </el-form-item>

              <el-form-item label="Table Rows">
                <el-input-number
                  placeholder="Enter Table Row"
                  v-model.number.lazy="newQuestion.fields.row"
                  :min="1"
                ></el-input-number>
              </el-form-item>
            </el-form-item>

            <el-form-item label="Default Value (Optional)">
              <el-col :span="24">
                <el-input placeholder="Enter Default Value" v-model="newQuestion.default_data" />
              </el-col>
            </el-form-item>

            <el-row>
              <el-button type="primary" @click="submitForm('newQuestion')">Save</el-button>
              <el-button type="primary" @click="navigateTo('index')">Cancel</el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategory } from "@/api/kyc/category";
import { getType } from "@/api/kyc/type";
import { createQuestion } from "@/api/kyc/question";
export default {
  data() {
    return {
      rowCount: 0,
      rows: [],
      categoryOption: [],
      typeOption: [],
      branches: [],
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

      newQuestion: {
        field_name: "",
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
          choice: [
            {
              data: "",
              key: 1
            }
          ],
          row: 0
        },
        is_hidden: false,
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
        section: [
          {
            required: true,
            message: "Please Enter a Section",
            trigger: "change"
          }
        ],
        category_id: [
          {
            required: true,
            message: "Please Select Question Category",
            trigger: "change"
          }
        ],
        type_id: [
          {
            required: true,
            message: "Please Select Question Type",
            trigger: "change"
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
    this.getCategory();
    this.getType();
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    navigateBack() {
      this.$router.go(-1);
    },
    async getCategory() {
      this.categoryOption = (await getCategory()).data.data;
    },
    async getType() {
      this.typeOption = (await getType()).data.data;
    },
    async createNewQuestion() {
      try {
        await createQuestion(this.newQuestion);
        this.$message(this.newQuestion.display_text + " field " + "is saved");

        this.$router.push("index");
        console.log(this.newQuestion);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },

    onChange() {
      if (
        this.newQuestion.input_type == "radio" ||
        this.newQuestion.input_type == "checkbox" ||
        this.newQuestion.input_type == "select" ||
        this.newQuestion.input_type == "table"
      ) {
        this.newQuestion.fields.choice = [
          {
            data: "",
            key: 1
          }
        ];
      } else if (this.newQuestion.input_type === "switch") {
        this.newQuestion.fields.choice = [
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
        this.newQuestion.fields.choice = [];
      }
    },

    removeChoice(item) {
      var index = this.newQuestion.fields.choice.indexOf(item);
      if (index !== -1) {
        this.newQuestion.fields.choice.splice(index, 1);
      }
    },
    addChoice() {
      this.newQuestion.fields.choice.push({
        key: Date.now(),
        data: ""
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newQuestion.field_name = this.newQuestion.display_text;
          this.newQuestion.fields = JSON.stringify(this.newQuestion.fields);
          this.createNewQuestion();
        } else {
          console.log("error submit!!");
          alert("The Form is not complete!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.qChoice {
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
