<template>
    <div class="app-container">
        <el-row type="flex" justify="center">

            <!-- Second column -->
            <el-col :span="16">
                <div class="crm-box-container" style="overflow: scroll; height: 90vh;">

                    <div class="crm-box-content">

                    <div style="margin-bottom:10px;" v-if="customer">
                    
                        <!-- Customer profile -->
                        <el-row :gutter="20" type="flex" justify="center">

                            <div class="crm-profile-picture">   
                                <img src="http://place-puppy.com/150x150" style="border-radius: 100%">
                            </div>
                        
                        </el-row>

                        <el-row :gutter="20" type="flex" justify="center">

                            <el-col>

                                <div class="crm-profile-name" text-align="center" v-if="customer">
                                    {{ customer.name }}
                                </div>

                                <div class="crm-profile-content" v-if="customer">
                                    {{ customer.branch.name }}
                                </div>

                                <div class="crm-profile-content" v-if="customer">
                                    {{ customer.type }}
                                </div>

                                <div class="crm-profile-content" v-if="customer">
                                    {{ 'Sales Rep : ' + customer.salesperson.name }}
                                </div>

                            </el-col>

                        </el-row>

                        <!-- Customer details -->
                        <el-card shadow="hover">

                        <el-row :gutter="20" type="flex" justify="center">
                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="customer">
                                <svg-icon icon-class="international"/> {{ ' : ' + customer.website }}
                            </div>
                            </el-col>

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="customer" style="float: right;">
                                <i class="el-icon-location" /> {{ ' : ' + customer.address }}
                            </div>
                            </el-col>

                        </el-row>

                        <el-row :gutter="20" type="flex" justify="center">

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="customer">
                                <svg-icon icon-class="email"/> {{ ' : ' + customer.email }}
                            </div>
                            </el-col>

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="customer">
                                <i class="el-icon-phone"/> {{ ' : ' + customer.phone }}
                            </div>
                            </el-col>

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="customer">
                                {{ 'Fax : ' + customer.fax }}
                            </div>
                            </el-col>

                        </el-row>

                        <el-row :gutter="20" type="flex" justify="center">
                            <el-col :span="12">
                                <el-button type="primary" size="small" style="float: right" plain @click="navigateTo ({name: 'CustomerCredit', params:{customerId: customer.id}})"> CREDIT </el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" size="small" style="float: left" plain @click="navigateTo ({name: 'CustomerSales', params:{customerId: customer.id}})"> SALES </el-button>
                            </el-col>
                        </el-row>
                        </el-card>

                    </div>

                    </div>


                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>

import { getCustomer } from '@/api/customer'

export default {
    
    data() {
      return {
          customer: {},
     }
    },

    created() {
        this.getCustomer(this.$route.params.id)
    },

    methods: {
        navigateTo (route) {
			this.$router.push(route)
        },
        
        getCustomer(id) {

            getCustomer(id)
                .then(resp => {
                    this.customer = resp.data.data
                })
        },
    }
}
</script>

<style scoped>

</style>
