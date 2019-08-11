<template>
  <div class="app-container">
    <el-row>
    <el-col :span="16" :offset="4">
    <el-card class="box-card">

    <el-form status-icon :rules="rules" :label-position="labelPosition" label-width="120px">
      
      <el-row> 

      <el-form-item label="User">
        <el-col :span="24">
          <el-input :disabled="true" v-model="user.name"/>
        </el-col>
      </el-form-item>
      
      <el-form-item label="Translator" >
        <el-col :span="24"> 
          <el-input :disabled="true" v-model="user.name"/>
        </el-col>
      </el-form-item>

      
        <el-col :span="12">
          <el-form-item label="Language">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Expertise">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.phone_no"/>
            </el-col>
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="Date">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Time">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Duration">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="End Call">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Type">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Status">
            <el-radio-group v-model="user.status">
              <el-radio-button label="1">Active</el-radio-button>
              <el-radio-button label="0">Deactivated</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button style="float: right" type="warning" @click="updateUser()">Update</el-button>
      </el-form-item>
    </el-form>

    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserShow, putUser, getRoleIndex, getBranchIndex } from '@/api/user'

export default {
  data() {
    return {
			labelPosition: 'right',
      user: {
        id: '',
        name: '',
        nickname: '',
        phone_no: '',
        email: '',
        status: '',
        branch_id: '',
        role_id: ''
      },
      value: '',
      roles: [],
      branches: [],
    }
  },


  mounted() {
    this.getUser()
    this.getRoles()
    this.getBranches()
  },

  methods: {

    // get user
    async getUser() {

      const userId = this.$store.state.route.params.userId

      getUserShow(userId)
        .then(res => {
          const data = res.data.data
          this.user.name = data.name,
          this.user.id = data.id,
          this.user.nickname = data.nickname,
          this.user.phone_no = data.phone_no,
          this.user.email = data.email
          this.user.status = data.status,
          this.user.branch_id = data.branches[0].id,
          this.user.role_id = data.roles[0].id
        })
        .catch(error => {
            console.log(error.response)
        })

      console.log(this.user)
    },

    // get all roles
    async getRoles() {
      this.roles = (await getRoleIndex()).data.data
    },
    
    // get all branches
    async getBranches() {
      this.branches = (await getBranchIndex()).data.data
    },

    // update user info 
    async updateUser() {
      console.log(this.user)

      try {
        await putUser(this.user)
        console.log(this.user)
        
        this.$message( {message: this.user.name + ' profile ' +'is updated', type: 'success'} )

        this.$router.push({
          name: 'userList'
        })
      } catch (err) {
        console.log(err)
      }

    },

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

