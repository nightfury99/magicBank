<template>
  <div class="app-container">
    <el-row>
    <el-col :span="16" :offset="4">
    <el-card class="box-card">

    <el-form :label-position="labelPosition" label-width="120px">
      <el-form-item label="Name">
        <el-col :span="24">
          <el-input v-model="newUser.name"/>
        </el-col>
      </el-form-item>

      <el-row>      
        <el-col :span="12">
          <el-form-item label="Email">
            <el-input v-model="newUser.email"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Retype Email">
            <el-input v-model="newUser.reemail"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Role">
              <el-row>
              <el-col :span="24">
              <el-select v-model="newUser.role_id" placeholder="Please select role" style="width:100%">
                <el-option v-for="(item, index) in roles" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
            <el-form-item label="Branch">
              <el-row>
              <el-col :span="24">
              <el-select v-model="newUser.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button style="float: right" type="warning" @click="registerNewUser()">Register</el-button>
      </el-form-item>
    </el-form>

    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import { postUser, getRoleIndex, getBranchIndex, postUserstore } from '@/api/user'

export default {
  data() {
    return {
			labelPosition: 'right',
      newUser: {
        name: '',
				email: '',
				reemail: '',
				role_id: '',
				status: 1,
				branch_id: '',
      },
      value: '',
      roles: [],
      branches: [],
    }
  },


  mounted() {
    this.getRoles()
    this.getBranches()
  },

  methods: {
    // get all roles
    async getRoles() {
      this.roles = (await getRoleIndex()).data.data
    },
    
    // get all branches
    async getBranches() {
      this.branches = (await getBranchIndex()).data.data
    },

    async registerNewUser() {
      console.log(this.newUser)
      try {
        await postUserstore(this.newUser)
        console.log(this.newUser)
      } catch (err) {
        console.log(err)
      }
      this.newUser = ''
      this.$message('submit!')

      this.$router.push({
        name: 'allUsers'
      })
    },

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

