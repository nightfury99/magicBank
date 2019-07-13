<template>
    <div>
        <h1> Call Log </h1>

        <!-- Call Log list -->
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
                    label="Datetime">
                        <template slot-scope="scope">
                            {{ scope.row.call_datetime | moment("dddd, Do MMMM YYYY, h:mm:ss a") }}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="PIC Name"
                    prop="pic.name">
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
                    label="Duration">
                        <template slot-scope="scope">
                            {{ [+scope.row.duration, 'seconds'] | duration('humanize') }}
                        </template>
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
            newCallLog: {},
            modalCallLog: false,
        }
    },

    created() {
        const customerId = this.$store.state.route.params.customerId // get customer id from params

        this.getCallLog(customerId)

    },

    methods: {
        getCallLog(customerId) {
            getCallLog(customerId)
                .then(resp => {
                    console.log(resp)
                    this.callLog = resp.data.data
                })
            console.log(this.callLog)
        },
        
    }
}
</script>
