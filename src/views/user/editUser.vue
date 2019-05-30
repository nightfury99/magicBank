<template>
  <div class="app-container">
    <el-row>
    <el-col :span="16" :offset="4">
    <el-card class="box-card">

    <el-form status-icon :rules="rules" :label-position="labelPosition" label-width="120px">
      <el-form-item label="Name">
        <el-col :span="24">
          <el-input :disabled="true" v-model="user.name"/>
        </el-col>
      </el-form-item>

      <el-row> 
        <el-col :span="12">
          <el-form-item label="Nickname">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Phone No.">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.phone_no"/>
            </el-col>
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="Role">
              <el-row>
              <el-col :span="24">
              <el-select v-model="user.role_id" placeholder="Please select role" style="width:100%">
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
              <el-select v-model="user.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
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
        
        this.$message( this.user.name + ' profile ' +'is updated ' )

        this.$router.push({
          name: 'allUsers'
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

