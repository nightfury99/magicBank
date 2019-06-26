<template>
  <div class="app-container">
    <el-form label-position="top">
      <el-form-item label="Question Name">
        <el-col :span="24">
          <el-input placeholder="Enter Question Name" v-model="newQuestion.display_text"/>
        </el-col>
      </el-form-item>

      <el-form-item label="Section">
        <el-select v-model="newQuestion.section" placeholder="Select Section">
          <el-option
            v-for="section in sectionOption"
            :key="section.value"
            :label="section.label"
            :value="section.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Question Description">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="Enter Question Description"
          v-model="newQuestion.description"
        ></el-input>
      </el-form-item>

      <el-form-item label="Category">
        <el-select v-model="newQuestion.category_id" placeholder="Select Category">
          <el-option
            v-for="(category,index) in categoryOption"
            :key="index"
            :label="category.name"
            :value="category.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Type">
        <el-select v-model="newQuestion.type_id" placeholder="Select Type">
          <el-option
            v-for="(type,index) in typeOption"
            :key="index"
            :label="type.name"
            :value="type.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Question Input Type">
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

      <el-form-item
        label="Question Choice"
        v-if="newQuestion.questionType=='radio'||newQuestion.questionType=='checkbox'||newQuestion.questionType=='select'"
      >
        <div v-for="(qchoices,k) in newQuestion.questionChoices" :key="k">
          <el-col :span="24" class="qChoice">
            <el-input placeholder="Enter Question Choice" v-model="qchoices.choice">
              <el-button
                slot="append"
                icon="el-icon-minus"
                @click="remove(k)"
                v-show="k || (!k && newQuestion.questionChoices.length > 1 )"
              ></el-button>
              <el-button
                slot="append"
                icon="el-icon-plus"
                @click="add(k)"
                v-show="k == newQuestion.questionChoices.length -1"
              ></el-button>
            </el-input>
          </el-col> 
        </div>
      </el-form-item>

      <el-form-item label="Question Choice" v-if="newQuestion.questionType=='switch'">
        <div v-for="(qchoices,k) in newQuestion.questionChoices" :key="k">
          <el-col :span="24" class="qChoice">
            <el-input placeholder="Enter Question Choice " v-model="qchoices.choice"></el-input>
          </el-col>
        </div>
      </el-form-item>

      <el-form-item label="Table Properties" v-if="newQuestion.questionType=='table'">
        <div>
          <el-col :span="24" class="">
            <el-input placeholder="Enter Table Column">
          <el-col>
        </div>
      <el-form-item>

      <el-form-item>
        <el-col :span="24">
          <el-switch v-model="newQuestion.is_hidden" active-text="Hidden"></el-switch>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="24">
          <el-switch v-model="newQuestion.is_mandatory" active-text="Mandatory"></el-switch>
        </el-col>
      </el-form-item>
      
      <el-row>
        <el-button type="primary" @click="createNewQuestion()">Save</el-button>
        <el-button type="primary">Cancel</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getCategory } from "@/api/kyc/category";
import { getType } from "@/api/kyc/type";
import { createQuestion } from "@/api/kyc/question";
export default {
  data() {
    return {
      categoryOption: [],
      typeOption: [],
      branches: [],
      sectionOption: [
        {
          value: "b",
          label: "B"
        },
        {
          value: "c",
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
        field_name:"",
        display_text:"",
        section: "",
        description:"",
        origin:"entry",
        category_id: "",
        type_id: "",
        default_data:"",
        only_default:true,
        input_type: "text",
        fields: [],
        is_hidden: true,
        is_mandatory: true
        
      }
    };
  },
  mounted() {
    this.getCategory();
    this.getType();
   
  },
  methods: {
    async getCategory() {
      this.categoryOption = (await getCategory()).data.data;
    },
    async getType() {
      this.typeOption = (await getType()).data.data;
    },
    async createNewQuestion() {
      console.log(this.newUser)

      try {
        await createQuestion(this.newQuestion)
        console.log(this.newUser)
      } catch (err) {
        console.log(err)
      }

      this.$message( this.newQuestion.name + ' ' +'is registered' )
      this.newQuestion = ''

      this.$router.push({
        name: 'index'
      })
    },
 
    onChange() {
      if (
        this.newQuestion.questionType == "radio" ||
        this.newQuestion.questionType == "checkbox" ||
        this.newQuestion.questionType == "select"
      ) {
        this.newQuestion.questionChoices = [
          {
            choice: ""
          }
        ];
      } else if (this.newQuestion.questionType === "switch") {
        this.newQuestion.questionChoices = [
          {
            choice: ""
          },
          {
            choice: ""
          }
        ];
      } else {
        this.newQuestion.questionChoices = [];
      }
    },
    add(index) {
      this.newQuestion.questionChoices.push({ choice: "" });
    },
    remove(index) {
      this.newQuestion.questionChoices.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.qChoice {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
