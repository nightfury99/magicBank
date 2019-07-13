<template>
    <div class="app-container">
        <el-row :gutter="20">

            <!-- First column -->
            <el-col :span="8">
                <div class="scroll crm-box-container" style="height: 90vh; overflow: scroll; padding-bottom: 30px;">

                    <!-- Card header         -->
                    <div class="crm-box-header">
                        <el-input v-model="search" placeholder="Search" class="filter-item" />
                    </div>

                    <!-- Customer cards list -->
                    <div v-for="(customer, i) in filteredList" :key="i">
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
                        <el-row :gutter="20" type="flex" justify="center">

                            <div class="crm-profile-picture">   
                                <img src="http://place-puppy.com/150x150" style="border-radius: 100%">
                            </div>
                        
                        </el-row>

                        <el-row :gutter="20" type="flex" justify="center">

                            <el-col>

                                <div class="crm-profile-name" text-align="center" v-if="selectCustomer">
                                    {{ selectCustomer.name }}
                                </div>

                                <div class="crm-profile-content" v-if="selectCustomer">
                                    {{ selectCustomer.branch.name }}
                                </div>

                                <div class="crm-profile-content" v-if="selectCustomer">
                                    {{ selectCustomer.type }}
                                </div>

                                <div class="crm-profile-content" v-if="selectCustomer">
                                    {{ 'Sales Rep : ' + selectCustomer.salesperson.name }}
                                </div>

                            </el-col>

                        </el-row>

                        <!-- Customer details -->
                        <el-card shadow="hover">

                        <el-row :gutter="20" type="flex" justify="center">
                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="selectCustomer">
                                <svg-icon icon-class="international"/> {{ ' : ' + selectCustomer.website }}
                            </div>
                            </el-col>

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="selectCustomer" style="float: right;">
                                <i class="el-icon-location" /> {{ ' : ' + selectCustomer.address }}
                            </div>
                            </el-col>

                        </el-row>

                        <el-row :gutter="20" type="flex" justify="center">

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="selectCustomer">
                                <svg-icon icon-class="email"/> {{ ' : ' + selectCustomer.email }}
                            </div>
                            </el-col>

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="selectCustomer">
                                <i class="el-icon-phone"/> {{ ' : ' + selectCustomer.phone }}
                            </div>
                            </el-col>

                            <el-col :span="8">
                            <div class="crm-profile-content" v-if="selectCustomer">
                                {{ 'Fax : ' + selectCustomer.fax }}
                            </div>
                            </el-col>

                        </el-row>

                        <el-row :gutter="20" type="flex" justify="center">
                            <el-col :span="12">
                                <el-button type="primary" size="small" style="float: right" plain @click="navigateTo ({name: 'customerCredit', params:{customerId: selectCustomer.id}})"> CREDIT </el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" size="small" style="float: left" plain @click="navigateTo ({name: 'customerSales', params:{customerId: selectCustomer.id}})"> SALES </el-button>
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
import { getCustomers, createCustomer } from '@/api/customer'
import Pagination from '@/components/Pagination'

export default {

    components: {
        Pagination
    },

    data() {
      return {
          search: '',
          filterType: [],
          customers: [],
          selectCustomer: {},
          query: {
            page: 1,
            page_count: 1,
            total: 0,
          },
     }
    },

    computed: {
        filteredList: function() {
        return this.customers.filter(customer => {
            return customer.name.toLowerCase().includes(this.search.toLowerCase())
        })
        return this.customers;
        }
    },

    created() {
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

    .el-row {
    margin-bottom: 20px;
  }

</style>

