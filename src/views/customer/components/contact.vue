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
                    prop="mobileNo">
                    </el-table-column>
                    
                    <el-table-column
                    label="Primary"
                    prop="primary">
                    </el-table-column>

                </el-table> 
            </div>
    </div>
</template>


<script>
export default {
    name: 'Contact',

    data() {
        return {
            picContact: [],
            picContactApi: [
                {
                    name: 'Saiful',
                    position: 'Finance',
                    title: 'Director',
                    email: 'epul@example.com',
                    mobileNo: '601129328307',
                    primary: 'Billing'
                },
                {
                    name: 'Saifulullah',
                    position: 'Warehouse',
                    title: 'Director',
                    email: 'epul4@example.com',
                    mobileNo: '601127828307',
                    primary: 'Purchasing'
                },
                {
                    name: 'Ahmad Saiful',
                    position: 'Finance',
                    title: 'Director',
                    email: 'epul2@example.com',
                    mobileNo: '601143528307',
                    primary: 'Shipping'
                },
                {
                    name: 'Epul',
                    position: 'Buyer',
                    title: 'Director',
                    email: 'epul5@example.com',
                    mobileNo: '6011293435427',
                    primary: 'None'
                }
            ]
        }
    },

    created() {
		this.getPicContact()
	},

    methods: {
        getPicContact () {
            this.picContact = this.picContactApi
        }
    }


}
</script>
