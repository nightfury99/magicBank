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
              <el-input :disabled="true" v-model="user.name"/>
            </el-col>
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="Role">
              <el-row>
              <el-col :span="24">
              <el-select v-model="user.roles[0].id" placeholder="Please select role" style="width:100%">
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
              <el-select v-model="user.branches[0].id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Status">
            <el-radio-group v-model="user.status" @change="searchRecord">
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
import { getUserShow, postUserStore, getRoleIndex, getBranchIndex } from '@/api/user'

export default {
  data() {
    return {
			labelPosition: 'right',
      user: {
        name: null,
				email: null,
				checkEmail: null,
				roles: null,
				status: null,
				branches: null,
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

      this.user = (await getUserShow(userId)).data.data

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

    // register/post new user info 
    async registerNewUser() {
      console.log(this.user)

      try {
        await postUserStore(this.user)
        console.log(this.user)
      } catch (err) {
        console.log(err)
      }

      this.$message( this.user.name + ' ' +'is registered' )
      this.user = ''

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

