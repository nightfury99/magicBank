<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!-- First card -->
            <el-col :span="12">
                <el-card class="box-card; scroll" style="height: 350px;">
                    <el-row :gutter="10">
                        <div class="user-profile">
                        <el-col :span="8">        
                                <el-image :src="user.url"></el-image>
                        </el-col>
                        <el-col :span="16">
                            <el-col>
                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-s-custom"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.name }}</div>
                                </el-col>

                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-message"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.email }}</div>
                                </el-col>

                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-phone"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.phone_no }}</div>
                                </el-col>

                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-star-off"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.role }}</div>
                                </el-col>

                            </el-col>
                        </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="10">
                        <div class="user-profile">
                        <el-col :span="24">
                            <el-col :span="24">
                                    <div class="user-name text-center" >Native Languange</div>
                            </el-col>

                            <el-col class="user-name text-center" :span="2">
                                <i class="el-icon-circle-plus"></i>
                            </el-col>
                            <el-col class="user-role text-center text-muted" :span="22">
                                <div>{{ user.name }}</div>
                            </el-col>

                            <el-col :span="24">
                                    <div class="user-name text-center" >Other Languange</div>
                            </el-col>

                            <el-col class="user-name text-center" :span="2">
                                <i class="el-icon-circle-plus"></i>
                            </el-col>
                            <el-col class="user-role text-center text-muted" :span="22">
                                <div>{{ user.name }}</div>
                            </el-col>

                            <el-col class="user-name text-center" :span="8" offset="8">
                                    <el-button>UPDATE</el-button>
                                </el-col>
                                
                        </el-col>
                        </div>
                    </el-row>
                </el-card>
            </el-col>

            <!-- Second card -->
            <el-col :span="12">
                <el-card class="box-card; scroll" style="height: 350px;">
                    <el-col :span="24">
                                    <h1 class="user-name text-center" >wallet</h1>
                    </el-col>
                    <el-col class="user-name text-center" :span="2">
                                <i class="el-icon-wallet"></i>
                    </el-col>
                    <el-col class="user-role text-center text-muted" :span="22">
                                <div>RM {{ user.wallet }}</div>
                    </el-col>
                </el-card>
            </el-col>
        </el-row>

        <br>

        <el-row :gutter="20">
            <!-- Third card -->
            <el-col :span="24">
                <el-card class="box-card; scroll" style="height: 500px;">
                    <el-row :gutter="10">
                        <div class="user-profile">
                        <el-col :span="8">        
                                <el-image :src="user.url"></el-image>
                        </el-col>
                        <el-col :span="16">
                            <el-col>
                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-s-custom"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.name }}</div>
                                </el-col>

                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-message"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.email }}</div>
                                </el-col>

                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-phone"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.phone_no }}</div>
                                </el-col>

                                <el-col class="user-name text-center" :span="2">
                                    <i class="el-icon-star-off"></i>
                                </el-col>
                                <el-col class="user-name text-center" :span="22">
                                    <div>{{ user.role }}</div>
                                </el-col>

                                <!-- <el-col class="user-name text-center" :span="2">
                                    <el-button>UPDATE</el-button>
                                </el-col> -->
                            </el-col>
                        </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="10">
                        <div class="user-profile">
                        <el-col :span="24">
                            <el-col :span="24">
                                    <div class="user-name text-center" >Native Languange</div>
                            </el-col>

                            <el-col class="user-name text-center" :span="2">
                                <i class="el-icon-circle-plus"></i>
                            </el-col>
                            <el-col class="user-role text-center text-muted" :span="22">
                                <div>{{ user.name }}</div>
                            </el-col>

                            <el-col :span="24">
                                    <div class="user-name text-center" >Other Languange</div>
                            </el-col>

                            <el-col class="user-name text-center" :span="2">
                                <i class="el-icon-circle-plus"></i>
                            </el-col>
                            <el-col class="user-role text-center text-muted" :span="22">
                                <div>{{ user.name }}</div>
                            </el-col>
                                
                        </el-col>
                        </div>
                    </el-row>
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
        email: '',
        name: '',
        translatorname: '',
        phone_no: '',
        image: '',
        resume: '',
        role: '',
        wallet: '',
        userstatus: '',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        translatorstatus: ''
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
    async getUser(data) {
      const userId = this.$store.state.route.params.userId
      getUserShow(userId)
        .then(res => {
          const data = res.data.data
          this.user.id = data.id,
          this.user.email = data.email
          this.user.name = data.profiles[0].first_name,
          this.user.translatorname = data.profiles[0].last_name,
          this.user.phone_no = data.profiles[0].phone_no,
          this.user.image = data.profiles[0].avatar_file_path,
          this.user.resume = data.profiles[0].resume_file_path,
          this.user.role = data.profiles[0].roles[0].name,
          this.user.wallet = data.wallet[0].amount,
          this.user.userstatus = data.user_status_id,
          this.user.translatorstatus = data.translator_status_id
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

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
     padding-top: 10px;
   }

   .box-center {
    //  padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
//    margin-top: 10px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 5px 0;

     .user-bio-section-header {
    //    border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }
</style>

