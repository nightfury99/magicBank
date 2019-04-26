<template>
  <div class="app-container">
    <el-row>
        <el-col :span="8">
            <el-date-picker
            v-model="range"
            type="daterange"
            range-separator="-"
            @blur="searchRecord"
            start-placeholder="Start date"
            end-placeholder="End date">
            </el-date-picker>
        </el-col>
        <el-col :span="11" :offset="1">
            <el-alert
                title="Please select date range to view your report"
                type="info"
                center
                :closable="false"
                show-icon>
            </el-alert>
        </el-col>
    </el-row>
    <el-row>
        <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        show-summary
        highlight-current-row>
        <el-table-column label="Outlet Name">
            <template slot-scope="scope">
            <router-link :to="{ name: 'BranchesRevenue', params: { id: scope.row.outlet_id }, query: { from: from, to: to }}">
                {{ scope.row.name }}
            </router-link>
            </template>
        </el-table-column>
        <el-table-column property="total" label="Applied Charges (RM)" align="center" width="180">
            <template align="center" slot-scope="scope">
            {{ scope.row.total }}
            </template>
        </el-table-column>
        <el-table-column v-if="roles.includes('admin')" property="promo_total" label="Promo (RM)" width="140" align="center">
            <template align="center" slot-scope="scope">
            {{ scope.row.promo_total }}
            </template>
        </el-table-column>
        <el-table-column property="company_revenue" label="Company (RM)" width="140" align="center">
            <template align="center" slot-scope="scope">
            {{ scope.row.company_revenue }}
            </template>
        </el-table-column>
        <el-table-column v-if="roles.includes('admin')" property="agent" class-name="status-col" label="Agent (RM)" width="140" align="center">
            <template align="center" slot-scope="scope">
            {{ scope.row.agent }}
            </template>
        </el-table-column>
        <el-table-column property="outlet_revenue" align="center" label="Outlet (RM)" width="140">
            <template align="center" slot-scope="scope">
            <span>{{ scope.row.outlet_revenue }}</span>
            </template>
        </el-table-column>
        </el-table>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOutlet, getOutlets } from '@/api/outlet'
import { getRevenueOutlet } from '@/api/revenue'
import moment from 'moment'

export default {
  data() {
    return {
      list: null,
      range: [],
      to: '',
      from: '',
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'useroutlets'
    ])
  },
  methods: {
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = 'Total Cost';
            return;
            }

            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
            sums[index] = 'RM ' + values.reduce((prev, curr) => {
                const value = Number.parseFloat(curr).toFixed(2);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
            }, 0);
            } else {
                sums[index] = 'N/A';
            }
        });

        return sums;
    },
    searchRecord: async function() {
        
        this.listLoading = true

        this.list = []

        this.from = moment(this.range[0]).format('YYYY-MM-DD')
        this.to = moment(this.range[1]).format('YYYY-MM-DD')

        if (this.roles.includes('admin')) {
            
            getOutlets()
                .then(res => {
                    var data = res.data.data

                    if (data.length > 0) {
                        this.processData(data)
                    } else {
                        this.list = [];
                    }
                })
                .catch(error => {
                    console.log(error.response)
                })

        } else if(this.roles.includes('outlet')) {
            
            var data = []
            var x
            for (x = 0; x < this.useroutlets.length; x++) {
                
                await getOutlet(this.useroutlets[x])
                    .then(res => {
                        data.push(res.data.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

            this.processData(data)
        }
    },

    processData: async function(data) {

        for (var i=0;i < data.length; i++) {
            var outlet = data[i]
            var d = {};
            d.name = outlet.name;
            
            await getRevenueOutlet(outlet.outlet_id, this.from, this.to)
                .then((r) => {
                    
                    d.outlet_id = outlet.outlet_id;
                    d.agent = (r.data.data.agent_total/100).toFixed(2);
                    d.outlet_revenue = (r.data.data.outlet_total_revenue/100).toFixed(2);
                    d.company_revenue = (r.data.data.company_total_revenue/100).toFixed(2);
                    d.total = (r.data.data.charges_total/100).toFixed(2);
                    d.promo_total = (r.data.data.promo_total/100).toFixed(2);
                    
                    this.list.push(d);
                });
        }

        this.listLoading = false
    },

    goToBranch() {

    }
  }
}
</script>

<style>
    .el-row {
        margin-bottom: 20px;
            &:last-child {
            margin-bottom: 0;
        }
    }
</style>
