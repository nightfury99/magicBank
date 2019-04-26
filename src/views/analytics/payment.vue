<template>
  <div class="app-container">
    <el-row type="flex" justify="center">
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
    </el-row>
    <el-row :gutter="40" class="panel-group">
        <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="goTo('PaymentDeposit')">
            <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
            <div class="card-panel-text">Total Deposit</div>
            <div class="card-panel-num">RM {{ (amount.deposit/100).toFixed(2) }}</div>
            </div>
        </div>
        </el-col>
        <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="goTo('PaymentReload')">
            <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
            <div class="card-panel-text">Total Reload</div>
            <div class="card-panel-num">RM {{ (amount.reload/100).toFixed(2) }}</div>
            </div>
        </div>
        </el-col>
        <el-col :span="8" class="card-panel-col">
          <div class="card-panel" @click="goTo('PaymentPromo')">
              <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
              <div class="card-panel-text">Total Promo Used</div>
              <div class="card-panel-num">RM {{ (amount.promo/100).toFixed(2) }}</div>
              </div>
          </div>
        </el-col>
        <el-col :span="8" class="card-panel-col">
          <div class="card-panel" @click="goTo('PaymentCharges')">
              <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
              <div class="card-panel-text">Total Charges</div>
              <div class="card-panel-num">RM {{ (amount.charges/100).toFixed(2) }}</div>
              </div>
          </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDepositCount, getPromoCount, getReloadCount } from '@/api/payment'
import { getOrderCount } from '@/api/order'
import moment from 'moment'
import axios from 'axios'

export default {
  data() {
    return {
      moment: moment,  
      list: null,
      range: [],
      listLoading: false,
      amount: {
          deposit: 0,
          reload: 0,
          promo: 0,
          charges: 0,
      },
      count: {
          deposit: 0,
          reload: 0,
          promo: 0,
          charges: 0,
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    
    var start = new Date()
    start.setDate(1)

    var end = new Date()

    this.range.push(start)
    this.range.push(end)
    this.searchRecord()
  },
  methods: {

    goTo: function(tag) {
      this.$router.push({name: tag, query: { from: moment(this.range[0]).format('YYYY-MM-DD'), to: moment(this.range[1]).format('YYYY-MM-DD') }})
    },

    searchRecord: function() {
        
      this.listLoading = true

      this.list = []

        axios.all([
            getDepositCount(moment(this.range[0]).format('YYYY-MM-DD'), moment(this.range[1]).format('YYYY-MM-DD')),
            getReloadCount(moment(this.range[0]).format('YYYY-MM-DD'), moment(this.range[1]).format('YYYY-MM-DD')),
            getPromoCount(moment(this.range[0]).format('YYYY-MM-DD'), moment(this.range[1]).format('YYYY-MM-DD')),
            getOrderCount(moment(this.range[0]).format('YYYY-MM-DD'), moment(this.range[1]).format('YYYY-MM-DD'))
        ])
        .then(axios.spread((depoRes, reloadRes, promoRes, orderRes) => {
            
            this.amount.deposit = depoRes.data.data.total_amount
            this.amount.reload = reloadRes.data.data.total_amount
            this.amount.promo = promoRes.data.data.total_amount
            this.amount.charges = orderRes.data.data.total_charged_amount
        }))
        
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
