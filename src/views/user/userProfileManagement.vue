<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!-- First column -->
            <el-col :span="12">
                <el-card class="box-card; scroll" style="height: 300px;">
                </el-card>
            </el-col>

            <!-- Second column -->
            <el-col :span="12">
                <el-card class="box-card; scroll" style="height: 300px;">
                </el-card>
            </el-col>
        </el-row>

        <br>

        <el-row :gutter="20">
            <!-- Third column -->
            <el-col :span="24">
                <el-card class="box-card; scroll" style="height: 300px;">
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { getUserShow, getUsers, putUser, getRoleIndex, } from '@/api/user'
import moment from 'moment'

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
        userstatus: '',
        translatorstatus: '',
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

    // get user details
    async getUser() {

      const userId = this.$store.state.route.params.userId

      getUserShow(userId)
        .then(res => {
          console.log(data)
          const data = res.data.data
          this.user.name = data.profiles[0].first_name,
          this.user.id = data.id,
          this.user.nickname = data.social_google_id,
          this.user.phone_no = data.phone_no,
          this.user.email = data.email
          this.user.userstatus = data.user_status_id,
          this.user.translatorstatus = data.translator_status_id,
          this.user.role_id = data.roles[0].id
          console.log(data)
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

</style>
