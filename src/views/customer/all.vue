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
        :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
          <el-table-column align="left" label="Action">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleGroup(scope.row)" type="info">Groups</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-row>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialogVisible"
      width="40%">
      <el-row>
        <el-col align="center" :span="24">
          <el-select v-model="selectedGroup" placeholder="Select">
            <el-option
              v-for="group in groups"
              :key="group.id"
              :label="group.name.toUpperCase()"
              :value="group.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="success" @click="changeGroup">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, getUser, updateUser } from '@/api/user'
import { getGroups, getUserGroups } from '@/api/group'
import axios from 'axios'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      search: '',
      groups: [],
      selectedGroup: [],
      dialog: {
        userId: '',
        title: '',
      },
      dialogVisible: false,
    }
  },
  created() {
      this.loadAllUsers()
  },
  methods: {

    loadAllUsers: function() {
        this.listLoading = true

        getUsers()
           .then(res => {

                var data = res.data
                
                if(data.length > 0) {
                    
                    var i
                    for (i = 0; i < data.length; i++) {
                        
                        let r = data[i]
                        r.username = data[i].username
                        r.id = data[i]._id

                        this.list.push(r)
                    }
                }

                this.listLoading = false
            })
            .catch(error => {
                this.listLoading = false
                console.log(error.response)
            }) 
    },

    handleGroup: async function(row) {
      
      this.groups = []
      this.selectedGroup = []

      axios.all([
        getGroups(),
        getUser(row.id)
      ])
      .then(axios.spread((groupRes, userRes) => {
        this.groups = groupRes.data
        this.dialogVisible = true

        if(userRes.data.groups) {
          this.selectedGroup = userRes.data.groups.id
        }

        this.dialog = {
          userId: row.id,
          title: `Assign group to ${row.username}`
        }

      }));

    },

    changeGroup: function() {

      updateUser(this.dialog.userId, {
          groups: this.selectedGroup
        })
        .then(res => {
          console.log(res)
        })

      this.dialogVisible = false
    }
  }
}
</script>

<style>
    .el-select {
      display: block;
    }
</style>
