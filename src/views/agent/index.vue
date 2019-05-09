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
                {{ scope.row.name }}
            </template>
        </el-table-column>
        <el-table-column property="total" label="Applied Charges (RM)" align="center" width="180">
            <template align="center" slot-scope="scope">
            {{ scope.row.total }}
            </template>
        </el-table-column>
        <el-table-column property="agent" class-name="status-col" label="Agent (RM)" width="140" align="center">
            <template align="center" slot-scope="scope">
            {{ scope.row.agent }}
            </template>
        </el-table-column>
        <el-table-column property="branch" align="center" label="Branch (RM)" width="140">
            <template align="center" slot-scope="scope">
            <span>{{ scope.row.branch }}</span>
            </template>
        </el-table-column>
        </el-table>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getBranchAgent } from '@/api/outlet'
// import { getRevenueBranch } from '@/api/revenue'
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
      'useroutlets',
      'user_id'
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

        // getBranchAgent(this.user_id)
        //     .then(res => {
        //         var data = res.data.data

        //         if (data.length > 0) {
        //             this.processData(data)
        //         } else {
        //             this.list = [];
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.response)
        //     })
    },

    processData: async function(data) {

        for (var i=0;i < data.length; i++) {
            
            var branch = data[i]
            var d = {};
            d.name = branch.name;
            
        //   await getRevenueBranch(branch.branch_id, moment(this.range[0]).format('YYYY-MM-DD'), moment(this.range[1]).format('YYYY-MM-DD'))
        //       .then((r) => {
                  
        //           d.agent = (r.data.data.agent_total/100).toFixed(2);
        //           d.branch = (r.data.data.branch_total_revenue/100).toFixed(2);
        //           d.total = (r.data.data.charges_total/100).toFixed(2);
                  
        //           this.list.push(d);
        //       });
        }

        this.listLoading = false
    },

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
