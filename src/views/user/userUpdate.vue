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
          <el-form-item label="Email">
            <el-col :span="24">
              <el-input :disabled="true" v-model="user.email"/>
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
        
        <el-col :span="24">
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
          <el-form-item label="User Status">
            <el-radio-group v-model="user.userstatus">
              <el-radio-button label="1">Active</el-radio-button>
              <el-radio-button label="0">Deactivated</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Translator Status">
            <el-radio-group v-model="user.userstatus">
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
import { getUserShow, putUser, getRoleIndex, } from '@/api/user'

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
        role_id: ''
      },
      value: '',
      roles: [],
    }
  },


  mounted() {
    this.getUser()
    this.getRoles()
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

