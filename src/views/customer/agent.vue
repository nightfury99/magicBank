<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :offset="16">
        <el-input
          v-model="search"
          placeholder="Type to search"/>
      </el-col>
    </el-row>
    <el-row>
        <el-table
        v-loading="listLoading"
        :data="users"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row>
          <el-table-column label="Username" width="200">
              <template slot-scope="scope">
                {{ scope.row.username }}
              </template>
          </el-table-column>
          <el-table-column label="Id" width="200">
              <template slot-scope="scope">
                <el-tag type="warning" size="mini">{{ scope.row.id }}</el-tag>
              </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="Email" width="240" align="center">
              <template align="center" slot-scope="scope">
              {{ scope.row.email }}
              </template>
          </el-table-column>
          <el-table-column align="center" label="Action">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="assignOutlet(scope.row)" type="info">Assign Outlet</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-row>

  </div>
</template>

<script>
import { getUsersGroupAgent } from '@/api/group'
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      listLoading: false,
      search: '',
    }
  },
  created() {
      this.loadUserAgentType()
  },
  methods: {

    loadUserAgentType: function() {
        this.listLoading = true

        getUsersGroupAgent()
           .then((res) => {

              this.users = res.data.users
              this.listLoading = false

            })
            .catch(error => {
                this.listLoading = false
            }) 
    },

  }
}
</script>

<style>
    .el-select {
      display: block;
    }
</style>
