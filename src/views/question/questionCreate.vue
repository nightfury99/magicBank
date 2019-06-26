<template>
  <div class="app-container">
    <el-form label-position="top">

      <el-form-item label="Name">
        <el-col :span="24">
          <el-input placeholder="Enter Name" v-model="newQuestion.name"/>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="24">
          <el-switch v-model="newQuestion.hidden" active-text="Hidden"></el-switch>
        </el-col>
      </el-form-item>

      <el-form-item label="Category">
        <el-select v-model="newQuestion.category" placeholder="Select Category">
          <el-option
            v-for="category in categoryOption"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Type">
        <el-select v-model="newQuestion.type" placeholder="Select Type">
          <el-option
            v-for="type in typeOption"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Section">
        <el-select v-model="newQuestion.sectionOption" placeholder="Select Section">
          <el-option
            v-for="section in sectionOption"
            :key="section.value"
            :label="section.label"
            :value="section.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Question Type">
        <el-select
          v-model="newQuestion.questionType"
          placeholder="Select Question Type"
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
      
      <el-form-item label="Question Text">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="Enter Question Text"
          v-model="newQuestion.questionText"
        ></el-input>
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

      <el-row>
        <el-button type="primary">Save</el-button>
        <el-button type="primary">Cancel</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getCategory } from '@/api/kyc/category'
export default {
  data() {
    return {
      categoryOption: [],

      typeOption: [
        {
          value: "sales",
          label: "Sales"
        },
        {
          value: "credit",
          label: "Credit"
        },
        {
          value: "profile",
          label: "Profile"
        }
      ],

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
        name: "",
        hidden: true,
        category: "",
        type: "",
        questionType: "text",
        questionText: "",
        questionChoices: [],
        section: ""
      }
    };
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
