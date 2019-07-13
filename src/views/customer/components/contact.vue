<template>
    <div>
        <h1> Contact </h1>

            <div class="app-container">
                <el-table
                    :data="picContact"
                    style="width: 100%">

                    <el-table-column
                    label="Name"
                    prop="name">
                    </el-table-column>

                    <el-table-column
                    label="Position"
                    prop="position">
                    </el-table-column>

                    <el-table-column
                    label="Title"
                    prop="title">
                    </el-table-column>
                    
                    <el-table-column
                    label="Email"
                    prop="email">
                    </el-table-column>
                    
                    <el-table-column
                    label="Mobile"
                    prop="mobile_no">
                    </el-table-column>
                    
                    <el-table-column
                    label="Primary">
                    <template align="center" slot-scope="scope">
                        <el-tag type="warning" size="mini">{{ scope.row.type }}</el-tag>
                    </template>
                    </el-table-column>

                </el-table> 
            </div>
    </div>
</template>


<script>
import { getPicContact } from '@/api/customer'

export default {
    name: 'Contact',

    data() {
        return {
            picContact: [],
        }
    },

    created() {
        const customerId = this.$store.state.route.params.customerId // get customer id from params

		this.getPicContact(customerId)
	},

    methods: {
        getPicContact (customerId) {
            getPicContact(customerId)
                .then(resp => {
                    console.log(resp)
                    this.picContact = resp.data.data
                })
            console.log(this.picContact)
        }
    }


}
</script>
