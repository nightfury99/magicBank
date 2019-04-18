<template>
  <div class="app-container">
    <el-row type="flex" justify="center" :gutter="40" class="panel-group">
        <el-col :span="8" class="card-panel-col">
        <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
            <div class="card-panel-text">Active User</div>
            <div class="card-panel-num">{{ available.totalUser }}</div>
            </div>
        </div>
        </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group">
        <el-col :span="8" class="card-panel-col">
        <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
            <div class="card-panel-text">Available Balance</div>
            <div class="card-panel-num">RM {{ (available.balance/100).toFixed(2) }}</div>
            </div>
        </div>
        </el-col>
        <el-col :span="8" class="card-panel-col">
          <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
              <div class="card-panel-text">Available Deposit</div>
              <div class="card-panel-num">RM {{ (available.deposit/100).toFixed(2) }}</div>
              </div>
          </div>
        </el-col>
        <el-col :span="8" class="card-panel-col">
          <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
              <div class="card-panel-text">Available Promo</div>
              <div class="card-panel-num">RM {{ (available.promo/100).toFixed(2) }}</div>
              </div>
          </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWalletsCount } from '@/api/wallet'
import moment from 'moment'
import axios from 'axios'

export default {
  data() {
    return {
      moment: moment,  
      list: null,
      range: [],
      listLoading: false,
      available: {
          balance: 0,
          deposit: 0,
          promo: 0,
          totalUser: 0,
      },
      count: {
          balance: 0,
          deposit: 0,
          promo: 0,
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.searchRecord()
  },
  methods: {

    searchRecord: function() {
        
      this.listLoading = true

      this.list = []

        axios.all([
            getWalletsCount()
        ])
        .then(axios.spread((walletRes) => {
            this.available.balance = walletRes.data.data.total_available_balance_amount
            this.available.deposit = walletRes.data.data.total_available_deposit_amount
            this.available.promo = walletRes.data.data.total_available_promo_amount
            this.available.totalUser = walletRes.data.data.total_active_wallets
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
