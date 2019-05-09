<template>
  <div class="app-container">

    <el-row>
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="font-weight:500;">
            <span>Create Post</span>
          </div>
          <div>
            <el-row>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Write something"
                v-model="textarea2">
              </el-input>
            </el-row>
            <el-row>
              <el-button size="mini" type="info" plain icon="el-icon-camera">Media</el-button>
              <el-button size="mini" type="info" plain icon="el-icon-document">File</el-button>
              <el-button size="small" type="info" plain icon="el-icon-user-solid">Tag</el-button>
              <el-button size="mini" type="info" plain icon="el-icon-location-outline">Location</el-button>
            </el-row>
            <el-row type="flex" class="row-bg" justify="end">
              <el-button type="warning">Post</el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="14">
        <el-card>
          <el-row>
            <el-card shadow="never">
              
            </el-card>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { getNewsboardIndex } from '@/api/newsboard'

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>

.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}

.line{
  text-align: center;
}

.text {
    font-size: 14px;
  }

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>

