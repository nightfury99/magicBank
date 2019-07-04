<template>
    <div>
        <h1> Call Log </h1>
        <el-row>
             <el-col :span="5" :offset="19">
                <el-button style="float: right" type="warning" @click="" >Add Call Log</el-button>
            </el-col>
        </el-row>

        <el-row>
            <div class="app-container">
                <el-table
                    :data="callLog"
                    style="width: 100%">

                    <el-table-column
                    label="User Nickname"
                    prop="user.nickname">
                    </el-table-column>

                    <el-table-column
                    label="Datetime"
                    prop="datetime">
                    </el-table-column>

                    <el-table-column
                    label="PIC Name"
                    prop="pic">
                    </el-table-column>
                    
                    <el-table-column
                    label="Contact No"
                    prop="phone_number">
                    </el-table-column>
                    
                    <el-table-column
                    label="Reason"
                    prop="reason">
                    </el-table-column>
                    
                    <el-table-column
                    label="Feedback"
                    prop="feedback">
                    </el-table-column>
                    
                    <el-table-column
                    label="Duration"
                    prop="duration">
                    </el-table-column>

                </el-table> 
            </div>
        </el-row>
        
    </div>
</template>


<script>
import { getCallLog } from '@/api/customer'

export default {
    name: 'CallLog',

    data() {
        return {
            callLog: [],

        }
    },

    created() {
        const customerId = this.$store.state.route.params.customerId // get customer id from params

        console.log(customerId)
        this.getCallLog(customerId)
        // this callLog = 
        // this.getCallLog
    },

    methods: {
        getCallLog(customerId) {
            getCallLog(customerId)
                .then(resp => {
                    console.log(resp)
                    this.callLog = resp.data.data
                })
            console.log(this.callLog)
        }
    }
}
</script>
