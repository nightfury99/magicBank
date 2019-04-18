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
        <el-col :span="12" :offset="1">
            <el-radio-group v-model="status" @change="searchRecord">
                <el-radio-button label="1">Currently Active</el-radio-button>
                <el-radio-button label="2">Returned</el-radio-button>
                <el-radio-button label="3">Errored</el-radio-button>
                <el-radio-button label="4">Admin Closed</el-radio-button>
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
        highlight-current-row
        :key="key">
            <el-table-column label="Created At" align="center" width="100">
                <template align="center" slot-scope="scope">
                {{ moment(scope.row.order.created_at).format('DD/MM/YYYY hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="Order ID">
                <template slot-scope="scope">
                    {{ scope.row.order.order_id }} <br><el-tag type="warning" size="mini">{{ scope.row.order.user_id }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Rented At" width="140">
                <template v-if="scope.row.transactions[0]" align="center" slot-scope="scope">
                {{ moment(scope.row.transactions[0].created_at).format('DD/MM/YYYY hh:mm') }}
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="status == 2" label="Returned At" width="140">
                <template align="center" slot-scope="scope">
                    <span v-if="scope.row.transactions[1]">{{ moment(scope.row.transactions[1].created_at).format('DD/MM/YYYY hh:mm') }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="status == 3" label="Updated At" width="140">
                <template align="center" slot-scope="scope">
                {{ moment(scope.row.order.updated_at).format('DD/MM/YYYY hh:mm') }}
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="status == 4" label="Closed At" width="140">
                <template align="center" slot-scope="scope">
                <span v-if="scope.row.transactions[1]">{{ moment(scope.row.transactions[1].created_at).format('DD/MM/YYYY hh:mm') }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Hardware" width="180">
                <template align="center" slot-scope="scope">
                    {{ scope.row.order.cabinet_id }}<el-tag v-if="scope.row.order.powerbank_id" type="info" size="mini">{{ scope.row.order.powerbank_id }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="status == 2" label="Charges" width="180">
                <template align="center" slot-scope="scope">
                {{ (scope.row.order.charged_amount/100).toFixed(2) }}
                </template>
            </el-table-column>
            <el-table-column v-if="status == 1" align="center" label="Action">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                icon="el-icon-error"
                @click="handleCloseOrder(scope.row.order)">Close Order</el-button>
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

    <el-dialog
        title="Warning"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <span><b>{{ dialog.orderId }} is a running active session.</b><p>Are your sure your want to close order?</p></span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="closeOrder">Confirm</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setCloseOrder, getActiveOrderList, getAdminOrderList, getErrorOrderList, getReturnOrderList } from '@/api/order'
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  data() {
    return {
      moment: moment,  
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 50
      },
      dialog: {
        orderId: '',
        title: '',
      },
      dialogVisible: false,
      range: [],
      listLoading: false,
      status: 1,
      key: 1
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
    
    handleCloseOrder: function(order) {
        this.dialog.orderId = order.order_id
        this.dialogVisible = true
    },

    closeOrder: function() {

        setCloseOrder(this.dialog.orderId)
            .then(res => {
                this.dialogVisible = false
                this.searchRecord()
            })
    },

    searchRecord: function() {
      this.listLoading = true

      this.list = []

      var request

      var from = moment(this.range[0]).format('YYYY-MM-DD')
      var to = moment(this.range[1]).format('YYYY-MM-DD')

      switch(this.status) {
          case "2":
            request = getReturnOrderList(from, to, this.listQuery)
          break;
          case "3": 
            request = getErrorOrderList(from, to, this.listQuery)
          break;
          case "4":
            request = getAdminOrderList(from, to, this.listQuery)
          break;
          default:
            request = getActiveOrderList(from, to, this.listQuery)
      }

      this.key = this.key + 1

      request
        .then(res => {
            var data = res.data.data
            var meta = res.data.meta

            if (data) {
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
