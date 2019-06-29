<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-button
          style="float: right"
          type="primary"
          @click="navigateTo({name: 'questionCreate'})"
          icon="el-icon-plus"
        ></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="user.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="Question Name" width=auto >
          <template slot-scope="scope">{{ scope.row.display_text }}</template>
        </el-table-column>
        <el-table-column label="Section" width="80">
          <template slot-scope="scope">{{ scope.row.section }}</template>
        </el-table-column>
        <el-table-column label="Origin" width="80">
          <template slot-scope="scope">{{ scope.row.origin  }}</template>
        </el-table-column>
        <el-table-column label="Question Category" width="150">
          <template slot-scope="scope">{{ scope.row.category.name }}</template>
        </el-table-column>
        <el-table-column label="Question Type" width="150">
          <template slot-scope="scope">{{ scope.row.type.name }}</template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row>
      <el-col :span="24" align="center">
        <pagination
          background
          layout="prev, pager, next"
          :page-count="userQuery.page_count"
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
      //Dummy Data
      user: [],
      listLoading: false,
      tooltipDelay: 500,
      status: 1,

      idDelete: "",
      dialogDelete: false,

      totalUserPage: 0,
      userQuery: {
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
      console.log(this.userQuery);

      if (val) {
        this.userQuery.page = val.page;
        console.log(this.userQuery);
      }

      const meta = (await getQuestionIndex(this.userQuery)).data.meta
        .pagination;

      this.user = (await getQuestionIndex(this.userQuery)).data.data;

      this.totalUserPage = meta.total;
      this.userQuery.page_count = meta.total_pages;

      console.log(this.user);

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
