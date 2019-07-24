<template>
  <div class="app-container">
    <el-row>
      
        <div style="margin: 0px 80px 40px 80px">
        <h1>Question List</h1>
        <el-button
          style="float: right"
          type="primary"
          @click="navigateTo({name: 'questionCreate'})"
          icon="el-icon-plus"
        >Create Question</el-button>
        </div>
      
    </el-row>
    <el-row style="margin: 10px 80px">
      <el-table
        
        v-loading="listLoading"
        :data="question.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column label="Question Name" width="auto">
          <template
            slot-scope="scope"
            @click="navigateTo ('questionCreate')"
          >{{ scope.row.display_text }}</template>
        </el-table-column>
        
        <el-table-column label="Section" width="150">
          <template slot-scope="scope">{{ scope.row.section }}</template>
        </el-table-column>
        <el-table-column align="center" label="Action" width="150">
          <template align="center" slot-scope="scope" v-if="scope.row.origin!='epicor'">
            <el-tooltip :open-delay="tooltipDelay" content="View Question" placement="top">
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="navigateTo ({name: 'questionView', params:{questionId: scope.row.id}})"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="margin: 10px 80px">
      <el-col :span="24" align="center">
        <pagination
          background
          layout="prev, pager, next"
          :page-count="questionQuery.page_count"
          @pagination="questionList"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getQuestionIndex } from "@/api/kyc/question";
export default {
  data() {
    return {
      question: [],
      listLoading: false,
      tooltipDelay: 500,

      totalQuestionPage: 0,
      questionQuery: {
        page: 1,
        limit: 50,
        page_count: 1
      }
    };
  },
  components: { Pagination },
  created() {
    this.questionList();
  },

  methods: {
    // navigate to specific route
    navigateTo(route) {
      this.$router.push(route);
    },
    async questionList(val) {
      this.listLoading = true;

      console.log(val);
      console.log(this.questionQuery);

      if (val) {
        this.questionQuery.page = val.page;
        console.log(this.questionQuery);
      }

      const meta = (await getQuestionIndex(this.questionQuery)).data.meta
        .pagination;

      this.question = (await getQuestionIndex(this.questionQuery)).data.data;

      this.totalQuestionPage = meta.total;
      this.questionQuery.page_count = meta.total_pages;

      console.log(this.question);

      this.listLoading = false;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px; 
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
