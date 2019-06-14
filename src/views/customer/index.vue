<template>
    <div class="app-container">

        <el-row :gutter="20">

            <!-- First column -->
            <el-col :span="8">
                <el-card class="box-card; scroll" style="height: 910px;">

                    <!-- Card header         -->
                    <div slot="header" class="clearfix">
                        <span>Customer List</span>
                        <!-- <el-button style="float: right" size="mini" type="warning" @click="modalAssignment=true" icon="el-icon-plus" circle></el-button> -->
                    </div>

                    <!-- Assignment cards list -->
                    <div v-for="o in 20" :key="o">
                        <el-card shadow="hover" class="box-card">
                            <div>
                                
                                <div class="name">
                                    {{ 'Customer Name ' + o}}
                                </div>

                            </div>
                        </el-card>
                    </div>

                </el-card>
            </el-col>

            <!-- Second column -->
            <el-col :span="16">
                <el-card class="box-card; scroll" style="height: 910px;">

                    <!-- Container content -->
                    <el-main>

                        <!-- Customer profile -->
                        <el-row :gutter="20">

                            <el-col :span="6">
                                <img src="https://placekitten.com/200/200">
                            </el-col>

                            <el-col :span="12">
                                <h3> Full Name </h3>
                                <p> Branch      : TLC / LGEP </p>
                                <p> Type        : Suspect / Prospect / Customer </p>
                                <p> Sales Rep   : Nicholas </p>
                            </el-col>

                            <el-col :span="6">
                                <el-button type="primary" plain @click="navigateTo ({name: 'customerCredit'})"> Credit </el-button>
                                <el-button type="primary" plain @click="navigateTo ({name: 'customerSales'})"> Sales </el-button>
                            </el-col>

                        </el-row>

                        <!-- Customer details -->
                        <el-row :gutter="20">

                            <p> Company     : ABCD Sdn. Bhd. (ABD-DAS) </p>
                            <p> Address     : 12, Jalan ABC, Taman Indah, Penang </p>
                            <p> <svg-icon icon-class="email" /> : abc@example.com </p>
                            <p> <i class="el-icon-phone" />     : (+60) 12 3456789 </p>
                            <p> Fax      : (+60) 3 12345678 </p>
                            <p> <svg-icon icon-class="international" /> : www.abc.com.my </p>

                        </el-row>

                    </el-main>

                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>

export default {
    
    methods: {
        // navigate to specific route
		navigateTo (route) {
			this.$router.push(route)
		},
    }

}
</script>


<style scoped>
    .el-card {
        margin-bottom: 10px;
        overflow-y: auto;
    }
</style>

