<template>
  <div class="app-container">
    <el-row>
    <el-col :span="16" :offset="4">
    <el-card class="box-card">

    <el-form status-icon :rules="rules" :label-position="labelPosition" label-width="120px">
      <el-form-item label="User">
        <el-col :span="24">
          <el-input v-model="newUser.name"/>
        </el-col>
      </el-form-item>

      <el-form-item label="Translator">
        <el-col :span="24">
          <el-input v-model="newUser.name"/>
        </el-col>
      </el-form-item>

      <el-row>      
        <el-col :span="12">
          <el-form-item label="Language" prop="email">
            <el-input v-validate="'required|email'" name="email" type="text" v-model="newUser.email" autocomplete="off"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Expertise" prop="checkEmail">
            <el-input v-model="newUser.checkEmail" autocomplete="off"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Date">
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
            <el-form-item label="Time">
              <el-row>
              <el-col :span="24">
              <el-select v-model="newUser.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="Call Duration">
              <el-row>
              <el-col :span="24">
              <el-select v-model="newUser.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="End Call">
              <el-row>
              <el-col :span="24">
              <el-select v-model="newUser.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

           <el-col :span="12">
            <el-form-item label="Type">
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
import { getRoleIndex, getBranchIndex, postUserStore } from '@/api/user'

export default {
  data() {
    return {
			labelPosition: 'right',
      newUser: {
        name: '',
				email: '',
				checkEmail: '',
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

    // register/post new user info 
    async registerNewUser() {
      console.log(this.newUser)

      try {
        await postUserStore(this.newUser)
        console.log(this.newUser)
      } catch (err) {
        console.log(err)
      }

      this.$message( this.newUser.name + ' ' +'is registered' )
      this.newUser = ''

      this.$router.push({
        name: 'userList'
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

