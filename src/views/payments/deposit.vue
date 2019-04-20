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
        <el-col :span="8" :offset="1">
            <el-radio-group v-model="status" @change="searchRecord">
            <el-radio-button label="1">Completed</el-radio-button>
            <el-radio-button label="0">Pending</el-radio-button>
            </el-radio-group>
        </el-col>
    </el-row>
    <el-row>
        <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row>
            <el-table-column label="Date" align="center" width="120">
                <template align="center" slot-scope="scope">
                {{ moment(scope.row.created_at).format('DD/MM/YYYY') }}
                </template>
            </el-table-column>
            <el-table-column label="User ID" >
                <template slot-scope="scope">
                {{ scope.row.user_id }}
                </template>
            </el-table-column>
            <el-table-column label="Reference No" width="220">
                <template slot-scope="scope">
                {{ scope.row.ref_no }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Transaction ID" width="140">
                <template align="center" slot-scope="scope">
                {{ scope.row.transaction_id }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Currency" width="140">
                <template v-if="scope.row.currency_code" align="center" slot-scope="scope">
                    <el-tag type="info">{{ scope.row.currency_code }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Amount" width="140">
                <template align="center" slot-scope="scope">
                {{ (scope.row.amount/100).toFixed(2) }}
                </template>
            </el-table-column>
        </el-table>
    </el-row>

    <el-row>
        <el-col :span="24" align="center">
            <pagination
                background
                layout="prev, pager, next"
                :total="total" 
                :current-page.sync="listQuery.page"
                @pagination="searchRecord" />
        </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDepositList } from '@/api/payment'
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  data() {
    return {
      moment: moment,  
      list: null,
      range: [],
      listLoading: false,
      status: 1,
      total: 0,
      listQuery: {
        page: 1,
        limit: 50
      },
    }
  },
  components: { Pagination },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    
    if(this.$route.query.from) {
      this.range.push(this.$route.query.from)
      this.range.push(this.$route.query.to)
    } else {
      this.defaultRange()
    }

    this.searchRecord()
  },
  methods: {

    searchRecord: async function() {
        
      this.listLoading = true

      this.list = []

      getDepositList(moment(this.range[0]).format('YYYY-MM-DD'), moment(this.range[1]).format('YYYY-MM-DD'), this.status, this.listQuery)
        .then(res => {
            var data = res.data.data
            var meta = res.data.meta

            if (data.length > 0) {
                this.list = data
                this.total = meta.total_records
            } else {
                this.list = []
            }

            this.listLoading = false
        })
        .catch(error => {
            console.log(error.response)
        })
    },

    defaultRange: function() {
      var start = new Date()
      start.setDate(1)

      var end = new Date()

      this.range.push(start)
      this.range.push(end)
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
