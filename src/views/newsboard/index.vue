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
                v-model="new_post">
              </el-input>
            </el-row>
            <el-row>
              <el-button size="mini" type="info" plain icon="el-icon-camera">Media</el-button>
              <el-button size="mini" type="info" plain icon="el-icon-document">File</el-button>
              <el-button size="mini" type="info" plain icon="el-icon-user-solid">Tag</el-button>
              <el-button size="mini" type="info" plain icon="el-icon-location-outline">Location</el-button>
            </el-row>
            <el-row type="flex" class="row-bg" justify="end">
              <el-button type="warning" @click="postMessage" >Post</el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="14">
        <el-card>
          <el-row v-for="(news, index) in newsfeed" :key="index">
            <el-card shadow="never">
              <el-row>
                <el-col :span="2">
                  <img :src="avatar" class="user-avatar">
                </el-col>
                <el-col :span="10">
                  <h4>{{ news.created_by.name }}</h4>
                  <h5>{{ news.created_at | moment("from", "now") }}</h5>
                </el-col>
                <el-col :span="11">
                  <i class="el-icon-collection-tag"></i>
                </el-col>
              </el-row>
              <el-row>
                <p>{{ news.description }}</p>
              </el-row>
            </el-card>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNewsboardIndex, postNewsboardStore } from '@/api/newsboard'

export default {
  name: 'Dashboard',

  data() {
    return {
      avatar: "https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg",
      newsfeed: [],
      new_post: ''
    }
  },

  async mounted () {
    this.newsfeed = (await getNewsboardIndex()).data.data
    // console.log(this.newsfeed)
    // console.log(this.newsfeed.length)

    // for (const key in this.newsfeed) {
      // console.log(this.newsfeed[key].id)
    // }
  },

  async updated () {
    this.newsfeed = (await getNewsboardIndex()).data.data
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },

  methods: {

    async postMessage () {
      console.log(this.new_post)
      try {
        await postNewsboardStore(this.new_post)
      } catch (err) {
        console.log(err)
      }
      this.new_post = ''
      // this.message = (await AssetService.message()).data
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

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

h4 {
  display: block;
  /* font-size: 0.83em; */
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

h5 {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: grey;
  font-weight: normal;
}
</style>

