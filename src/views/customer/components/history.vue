<template>
    <div>
        <h1> History </h1>

        <el-row>
            <el-table
                :data="creditLog"
                style="width: 100%"
            >
            
            <el-table-column label="Field">
                <template slot-scope="scope">
                    <span>{{ scope.row.field }}</span>
                </template>
            </el-table-column>

            <el-table-column label="Date of Change" align="center">
                <template slot-scope="scope">
                    <span>{{ moment(scope.row.created_at).format('MMMM Do YYYY') }}</span>
                </template>
            </el-table-column>

            <el-table-column label="Old" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.previous_credit_detail.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="New" width="110px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.old_credit_detail.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="User" width="110px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>

            </el-table>
        </el-row>
    </div>
</template>


<script>
import { getCreditLog } from '@/api/customer'

export default {
    name: 'History',
    
    data() {
        return {
            creditLog: [],
            newCreditLog: {},
            modalCreditLog: false,
        }
    },

    methods: {
        getCreditLog(customerId) {
            getCreditLog(customerId)
                .then(resp => {
                    console.log(resp)
                    this.creditLog = resp.data.data
                })
            console.log(this.creditLog)
        },
        
    }
}
</script>
