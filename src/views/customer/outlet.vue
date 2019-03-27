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
                @click="handleOutlet(scope.row)" type="info">Assign Outlet</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-row>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialogVisible"
      width="45%">
      <el-row>
        <el-col justify="center">
          <el-transfer
            v-model="selectedOutlets"
            :data="outlets">
          </el-transfer>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">Cancel</el-button>
        <el-button type="success" @click="submitChanges">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOutlets, getOutlet } from '@/api/outlet'
import { getUsersGroupOutlet } from '@/api/group'
import { getUser, setUserOutlet, removeUserOutlet } from '@/api/user'
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      listLoading: false,
      search: '',
      selectedOutlets: [],
      defaultUserOutlets: [],
      outlets: [],
      dialogVisible: false,
      dialog: {
        userId: '',
        title: '',
      },
    }
  },
  created() {
      this.loadUserOutletType()
      this.loadAllOutlets()
  },
  methods: {

    loadUserOutletType: function() {
        this.listLoading = true

        getUsersGroupOutlet()
           .then((res) => {
              this.users = res.data.users
              this.listLoading = false
            })
            .catch(error => {
                this.listLoading = false
            }) 
    },

    loadAllOutlets: function() {
      
      getOutlets()
        .then((res) => {
          var data = res.data.data;

          var x
          for (x = 0; x < data.length; x++) {
            this.outlets.push({
              label: data[x].name,
              key: data[x].outlet_id,
            })  
          }

        })
    },

    handleOutlet: async function(row) {
      
      this.defaultUserOutlets = []
      this.selectedOutlets = []

      await getUser(row.id)
        .then((res) => {

          this.defaultUserOutlets = res.data.useroutlets
          this.getOutletsInfo()
        });
      
      this.dialog = {
        userId: row.id,
        title: `Assign outlet to ${row.username}`
      }

    },

    getOutletsInfo: async function() {

      var i

      for(const item of this.defaultUserOutlets) {
        
        await getOutlet(item.outlet_id)
          .then((res) => {
            this.selectedOutlets.push(res.data.data.outlet_id)
          })
          .catch(error => {
            console.log(error)
          })
      }

      this.dialogVisible = true
    },

    submitChanges: async function() {
      
      // remove current data
      for(const item of this.defaultUserOutlets) {
        await removeUserOutlet(item._id)
      }

      // add new data
      for(const item of this.selectedOutlets) {
        await setUserOutlet(this.dialog.userId, item)
          .then((res) => {
            console.log(res.data)
          })
      }

      this.dialogVisible = false
    },

  }
}
</script>

<style>
    .el-select {
      display: block;
    }
</style>
