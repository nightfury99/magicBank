<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="branchQuery.name" placeholder="Name" style="width: 400px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <br>

    <el-table
      :key="tableKey"
      :data="branch"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column label="Name" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date Created" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ moment(scope.row.created_at).format('MMMM Do YYYY') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Code" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.is_active | statusFilter">
            {{ row.is_active }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="branchQuery.page" :limit.sync="branchQuery.limit" @pagination="getBranch" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="newBranch" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Name" prop="name">
          <el-input v-model="newBranch.name" />
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="newBranch.created_at" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Code" prop="code">
          <el-input v-model="newBranch.code" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="newBranch.is_active" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {createBranch, getBranch, fetchBranch, updateBranch } from '@/api/branch'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import moment from 'moment'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      branch: null,
      total: 0,
      branchLoading: true,
      branchQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        code: undefined,
      },
      statusOptions: ['Active', 'Inactive', 'Deleted'],
      newBranch: {
        id: undefined,
        created_at: new Date(),
        name: '',
        code: '',
        is_active: 'Active'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        created_at: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getBranch()
  },

  methods: {

    moment: function (date) {
      return moment(date);
    },

    date: function (date) {
      return moment(date).format('MMMM Do YYYY');
    },

    getBranch() {
        getBranch()
             .then(resp => {
                this.branch = resp.data.data
            })
    },

    resetTemp() {
      this.newBranch = {
        id: undefined,
        created_at: new Date(),
        name: '',
        code: '',
        is_active: 'active'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createBranch(this.newBranch)
            .then(resp => {
                this.branch.unshift(this.newBranch)
                this.dialogFormVisible = false
                this.$notify({
                    title: 'Success',
                    message: 'Created Successfully',
                    type: 'success',
                })
                this.getBranch()
          })
        }
      })
    },
    handleUpdate(row) {
      this.resetTemp()
      this.newBranch = Object.assign({}, row) // copy obj
      this.newBranch.created_at = new Date(this.newBranch.created_at)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.newBranch)
          tempData.updated_at = +new Date(tempData.updated_at) 
          updateBranch(tempData)
            .then(resp => {
                for (const v of this.branch) {
                if (v.id === this.newBranch.id) {
                    const index = this.branch.indexOf(v)
                    this.branch.splice(index, 1, this.newBranch)
                    break
                }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
            })
            this.getBranch()
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
      })
      const index = this.branch.indexOf(row)
      this.branch.splice(index, 1)
    },
  },
  
  filters: {
    statusFilter(is_active) {
      const statusMap = {
        active: 'success',
        inactive: 'info',
        deleted: 'danger'
      }
      return statusMap[is_active]
    },

    moment: function (date) {
    return moment(date).format('MMMM Do YYYY');
    }
  }

}

</script>
