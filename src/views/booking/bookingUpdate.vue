<template>
  <div class="app-container">
    <el-row>
    <el-col :span="16" :offset="4">
    <el-card class="box-card">

    <el-form status-icon :rules="rules" :label-position="labelPosition" label-width="120px">
      
      <el-row> 

      <el-form-item label="User Name">
        <el-col :span="24">
          <el-input :disabled="true" v-model="booking.name"/>
        </el-col>
      </el-form-item>
      
      <el-form-item label="Translator" >
        <el-col :span="24"> 
          <el-input :disabled="true" v-model="booking.name"/>
        </el-col>
      </el-form-item>

      
        <el-col :span="12">
          <el-form-item label="Language">
            <el-col :span="24">
              <el-input :disabled="true" v-model="booking.language"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Expertise">
            <el-col :span="24">
              <el-input :disabled="true" v-model="booking.bookingexpertise"/>
            </el-col>
          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item label="Date">
            <el-col :span="24">
              <el-input :disabled="true" v-model="booking.booking_date"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Time">
            <el-col :span="24">
              <el-input :disabled="true" v-model="booking.booking_time"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Duration">
            <el-col :span="24">
              <el-input :disabled="true" v-model="booking.nickname"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="End Call">
            <el-col :span="24">
              <el-input :disabled="true" v-model="booking.end_call"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Type">
            <el-col :span="24">
              <el-input :disabled="true" v-model="booking.bookingtype"/>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Status">
            <el-radio-group v-model="booking.status">
              <el-radio-button label="1">Active</el-radio-button>
              <el-radio-button label="0">Deactivated</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button style="float: right" type="warning" @click="updateBooking()">Update</el-button>
      </el-form-item>
    </el-form>

    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBookingIndex, getBookingShow, putBooking   } from '@/api/booking'
import { getUserIndex   } from '@/api/user'
import { getExpertiseIndex   } from '@/api/expertise'

export default {
  data() {
    return {
			labelPosition: 'right',
      booking: {
        id: '',
        originname: '',
        username: '',
        translatorname: '',
        booking_date: '',
        booking_time: '',
        end_call: '',
        notes: '',
        bookingexpertise: '',
        bookingtype: ''
      },
      value: '',
      user: [],
      expertise: [],
    }
  },


  mounted() {
    this.getBooking()
    this.getUser()
    this.getExpertise()
  },

  methods: {

    // get booking
    async getBooking() {

      const bookingId = this.$store.state.route.params.bookingId

      await getBookingShow(bookingId)
        .then(res => {
          this.booking = res.data.data
        })
        .catch(error => {
            console.log(error.response)
        })

      console.log(this.booking)
    },

    // get all user
    async getUser() {
      this.user = (await getUserIndex()).data.data
    },
    
    // get all expertise
    async getExpertise() {
      this.expertise = (await getExpertiseIndex()).data.data
    },

    // update booking info 
    async updateBooking() {
      console.log(this.booking)

      try {
        await putBooking(this.booking)
        console.log(this.booking)
        
        this.$message( {message: this.booking.name + ' booking ' +'is updated', type: 'success'} )

        this.$router.push({
          name: 'bookingList'
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

