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
        fit
        highlight-current-row
      >
        <el-table-column label="Question Name" width="auto" >
          <template
            slot-scope="scope"
            @click="navigateTo ('questionCreate')"
          >{{ scope.row.display_text }}</template>
        </el-table-column>
        <el-table-column label="Section" width="80" >
          <template slot-scope="scope">{{ scope.row.section }}</template>
        </el-table-column>
        <el-table-column label="Origin" width="80" >
          <template slot-scope="scope">{{ scope.row.origin }}</template>
        </el-table-column>
        <el-table-column label="Question Category" width="150" >
          <template slot-scope="scope">{{ scope.row.category.name }}</template>
        </el-table-column>
        <el-table-column label="Question Type" width="150" >
          <template slot-scope="scope">{{ scope.row.type.name }}</template>
        </el-table-column>
        <el-table-column align="center" label="Action" width="150" >
          <template align="center" slot-scope="scope" v-if="scope.row.origin!='epicor'">
            <el-tooltip :open-delay="tooltipDelay" content="Profile" placement="top">
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="navigateTo ({name: 'questionView', params:{questionId: scope.row.id}})"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip :open-delay="tooltipDelay" content="Update" placement="top">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="navigateTo ({name: 'userUpdate', params:{questionId: scope.row.id}})"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip :open-delay="tooltipDelay" content="Delete" placement="top">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="changeDeleteId(scope.row.id)"
                circle
              ></el-button>
            </el-tooltip>
          </template>
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
      user: [],
      listLoading: false,
      tooltipDelay: 500,

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
