<template>
  <div class="app-container">
    <el-row>
    <el-col :span="16" :offset="4">
    <el-card class="box-card">

    <el-form status-icon :rules="rules" :label-position="labelPosition" label-width="120px">
        <el-col :span="24">
            <el-form-item label="Type">
              <el-row>
              <el-col :span="24">
              <el-select v-model="newBooking.branch_id" placeholder="Please select Booking Type" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select>
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

      <el-form-item label="User">
        <el-col :span="24">
          <!-- <el-input v-model="newBooking.name"/> -->
          <el-select v-model="newBooking.request_name" placeholder="Please select User" style="width:100%">
                <el-option v-for="(item, index) in user" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="Translator">
        <el-col :span="24">
          <!-- <el-input v-model="newBooking.name"/> -->
          <el-select v-model="newBooking.request_name" placeholder="Please select Translator" style="width:100%">
                <el-option v-for="(item, index) in user" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-row>      
        <el-col :span="12">
          <el-form-item label="Language" prop="email">
            <!-- <el-input v-validate="'required|email'" name="email" type="text" v-model="newBooking.email" autocomplete="off"/> -->
            <el-select v-model="newBooking.request_name" placeholder="Please select Language" style="width:100%">
                <el-option v-for="(item, index) in user" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Expertise" prop="checkEmail">
            <!-- <el-input v-model="newBooking.checkEmail" autocomplete="off"/> -->
            <el-select v-model="newBooking.request_name" placeholder="Please select Expertise" style="width:100%">
                <el-option v-for="(item, index) in user" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Date">
              <el-row>
              <el-col :span="24">
              <!-- <el-select v-model="newBooking.role_id" placeholder="Please select role" style="width:100%">
                <el-option v-for="(item, index) in roles" :key="index" :label="item.name" :value="item.id" />
              </el-select> -->
              </el-col>
              </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="Time">
              <el-row>
              <el-col :span="24">
              <!-- <el-select v-model="newBooking.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select> -->
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="Call Duration">
              <el-row>
              <el-col :span="24">
              <!-- <el-select v-model="newBooking.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select> -->
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="End Call">
              <el-row>
              <el-col :span="24">
              <!-- <el-select v-model="newBooking.branch_id" placeholder="Please select branch" style="width:100%">
                <el-option v-for="(item, index) in branches" :key="index" :label="item.name" :value="item.id" />
              </el-select> -->
              </el-col>
              </el-row>
            </el-form-item>
        </el-col>

           
      </el-row>

      <el-form-item>
        <el-button style="float: right" type="warning" @click="createNewBooking()">Register</el-button>
      </el-form-item>
    </el-form>

    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBookingIndex, createBooking } from '@/api/booking'
import { getUserIndex, } from '@/api/user'
import { getLanguageIndex, } from '@/api/language'
import { getExpertiseIndex, } from '@/api/expertise'

export default {
  data() {
    return {
			labelPosition: 'right',
      newBooking: {
        type: '',
        creator_name: '',
        request_name: '',
        translator_name: '',
				language: '',
				expertise: '',
        date: '',
        time: '',
        date: '',
        call_duration: '',
        end_call: '',
				status: 1,
      },
      value: '',
      user: [],
      language: [],
      expertise: [],
    }
  },


  mounted() {
    this.getUser()
    this.getLanguage()
    this.getExpertise()

  },

  methods: {
    // get all user
    async getUser() {
      this.user = (await getUserIndex()).data.data
      console.log(this.data)
      console.log("HOHOHO")
    },
    
    // get all Language
    async getLanguage() {
      this.language = (await getLanguageIndex()).data.data
    },

    // get all Expertise
    async getExpertise() {
      this.expertise = (await getExpertiseIndex()).data.data
    },

    // create new booking info 
    async createNewBooking() {
      console.log(this.newBooking)

      try {
        await createBooking(this.newBooking)
        console.log(this.newBooking)
      } catch (err) {
        console.log(err)
      }

      this.$message( this.newBooking.name + ' ' +'is registered' )
      this.newBooking = ''

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

