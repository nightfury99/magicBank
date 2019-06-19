<template>
    <div class="app-container">
        <el-row :gutter="20">

            <!-- First column -->
            <el-col :span="8">
                <div class="scroll crm-box-container" style="height: 90vh; overflow: scroll; padding-bottom: 30px;">

                    <!-- Card header         -->
                    <div class="crm-box-header">
                        <span>Customer List</span>
                        <!-- <el-button style="float: right" size="mini" type="warning" @click="modalAssignment=true" icon="el-icon-plus" circle></el-button> -->
                    </div>

                    <!-- Customer cards list -->
                    <div v-for="(customer, i) in customers" :key="i">
                        <div type="flex assignment" @click="descriptionMethod(customer)">
                            <div 
                                class="list crm-box-content data crm-color-primary-light">
                                
                                <span class="crm-heading-medium-title">
                                    {{ customer.name }}
                                </span>

                            </div>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <el-row>
                    <el-col :span="24" align="center">
                        <pagination
                            background
                            layout="prev, pager, next"
                            :page-count="query.page_count"
                            :total="query.total"
                            @pagination="getCustomers" />
                    </el-col>
                </el-row>

                </div>
            </el-col>

            <!-- Second column -->
            <el-col :span="16">
                <div class="crm-box-container" style="overflow: scroll; height: 90vh;">

                    <div class="crm-box-content">

                    <div style="margin-bottom:10px;" v-if="selectCustomer">
                    
                        <!-- Customer profile -->
                        <el-row :gutter="20">

                            <el-col :span="3">
                                <img src="https://placekitten.com/100/100">
                            </el-col>

                            <el-col :span="12">

                                <div class="crm-heading-content" v-if="selectCustomer">
                                    {{ 'Full Name :' + selectCustomer.name }}
                                </div>

                                <div class="crm-heading-content" v-if="selectCustomer">
                                    {{ 'Branch : TLC / LGEP' }}
                                </div>

                                <div class="crm-heading-content" v-if="selectCustomer">
                                    {{ 'Type : Suspect / Prospect / Customer' }}
                                </div>

                                <div class="crm-heading-content" v-if="selectCustomer">
                                    {{ 'Sales Rep : Sales Rep   : Nicholas' }}
                                </div>

                            </el-col>

                            <el-col :span="9">
                                <el-button type="primary" plain @click="navigateTo ({name: 'customerCredit', params:{customerId: selectCustomer.id}})"> Credit </el-button>
                                <el-button type="primary" plain @click="navigateTo ({name: 'customerSales', params:{customerId: selectCustomer.id}})"> Sales </el-button>
                            </el-col>

                        </el-row>

                        <!-- Customer details -->
                        <el-row :gutter="20">

                            <div class="crm-heading-content" v-if="selectCustomer">
                                {{ 'Company     : ABCD Sdn. Bhd. (ABD-DAS)' }}
                            </div>

                            <div class="crm-heading-content" v-if="selectCustomer">
                                {{ 'Address :' + selectCustomer.address }}
                            </div>

                            <div class="crm-heading-content" v-if="selectCustomer">
                                <svg-icon icon-class="email"/> {{ ' :' + selectCustomer.email }}
                            </div>

                            <div class="crm-heading-content" v-if="selectCustomer">
                                <i class="el-icon-phone"/> {{ ' :' + selectCustomer.phone }}
                            </div>

                            <div class="crm-heading-content" v-if="selectCustomer">
                                {{ 'Fax :' + selectCustomer.fax }}
                            </div>
                            
                            <div class="crm-heading-content" v-if="selectCustomer">
                                <svg-icon icon-class="international"/> {{ ' :' + selectCustomer.website }}
                            </div>

                        </el-row>

                    </div>

                    </div>


                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import { getCustomers, createCustomer } from '@/api/customer'
import Pagination from '@/components/Pagination'

export default {

    components: {
        Pagination
    },

    data() {
      return {
          customers: [],
          selectCustomer: {},
            query: {
                page: 1,
                page_count: 1,
                total: 0,
            },
     }
    },

    mounted() {
        this.getCustomers()
    },

    methods: {
        // navigate to specific route
		navigateTo (route) {
			this.$router.push(route)
        },
        
        getCustomers(val) {

            if (val) {
                this.query.page = val.page
            }

            getCustomers(this.query)
                .then(resp => {
                    this.customers = resp.data.data
                    this.query.page_count = resp.data.meta.pagination.total_pages
                    this.query.total = resp.data.meta.pagination.total

                    this.selectCustomer = this.customers[0]
                })
        },

        descriptionMethod: function(customer) {
            this.selectCustomer = customer
        },
    }

}
</script>


<style scoped>

    .list.crm-box-content {
        border-bottom: 1px solid;
        border-color: #FFF8BC;
        cursor: pointer;
    }
    
    .data:hover, .crm-box-content.selected {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

</style>

