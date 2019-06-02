<template>
  <div class="app-container">

    <el-row type="flex" justify="center">
      <el-col :span="14">

        <!-- Create Post Panel -->
        <el-row>
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
                  v-model="newPost">
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
        </el-row>

        <!-- Newsfeed -->
        <el-row>
          <el-col :span="24"><el-row>
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
                      <el-row type="flex" class="row-bg" justify="end">
                        <el-button type="text" class="icon-news" @click="dialogVisible = true"><svg-icon icon-class="tag-outline" /></el-button>
                        <el-button type="text" class="icon-news" icon="el-icon-delete" @click="changeDeleteId(news.id)" v-if="news.created_by.name == name"/>
                      </el-row>
                    </el-col>
                  </el-row>

                  <el-row>
                    <p>{{ news.description }}</p>
                  </el-row>

                </el-card>
              </el-row>

              <el-row>
                <el-col :span="24" align="center">
                  <pagination
                    background
                    layout="prev, pager, next"
                    :page-count="newsfeedQuery.page_count"
                    @pagination="newsList" />
                </el-col>
              </el-row>

            </el-card></el-row>
          </el-col>
        </el-row>
      </el-col>

    </el-row>

    <!-- Dialog for Specific News Post-->
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <!-- Dialog for News Delete -->
    <el-dialog
      :visible.sync="dialogDelete"
      title="Delete Confirmation"
      width="30%">
      <span>Delete this post?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">Cancel</el-button>
        <el-button type="primary" @click="deleteMessage">Delete</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNewsboardIndex, getNewsboardFavourite, postNewsboardStore, deleteNewsboard } from '@/api/newsboard'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },

  data() {
    return {
      avatar: 'https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg',
      newsfeed: [],
      newsfeedFavourite: [],
      newPost: '',
      dialogVisible: false,
      dialogDelete: false,
      idDelete: '',

      totalNewsPage: 0,
      newsfeedQuery: {
        page: 1,
        limit: 50,
        page_count: 1
      },

      totalNewsFavouritePage: 0,
      newsFavouriteQuery: {
        page: 1,
        limit: 50,
        page_count: 1
      }
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },

  created() {
    this.newsList()
    // this.newsFavouriteList()
  },

  methods: {

    // get newsboard list
    async newsList(val) {
      if (val) {
        this.newsfeedQuery.page = val.page
      }

      const meta = (await getNewsboardIndex(this.newsfeedQuery)).data.meta.pagination

      this.newsfeed = (await getNewsboardIndex(this.newsfeedQuery)).data.data
      this.totalNewsPage = meta.total
      this.newsfeedQuery.page_count = meta.total_pages
    },

    // get favourite newsboard list
    async newsFavouriteList(val) {
      if (val) {
        this.newsFavouriteQuery.page = val.page
      }

      const meta = (await getNewsboardFavourite(this.newsFavouriteQuery)).data.meta.pagination

      this.newsfeedFavourite = (await getNewsboardFavourite(this.newsFavouriteQuery)).data.data
      this.totalNewsFavouritePage = meta.total
      this.newsFavouriteQuery.page_count = meta.total_pages
    },

    // post message from Create Post panel
    async postMessage() {
      
      try {
        await postNewsboardStore(this.newPost)
      } catch (err) {
        console.log(err)
      }
      this.newPost = ''
      this.newsList()
    },

    // get desired newsboard id to delete
    async changeDeleteId(id) {
      // console.log(id)
      this.idDelete = id
      this.dialogDelete = true
    },

    // delete newsboard
    async deleteMessage() {
      console.log(this.idDelete)
      try {
        await deleteNewsboard(this.idDelete)
      } catch (err) {
        console.log(err)
      }
      this.dialogDelete = false
      this.newsList()
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

.icon-news {
  font-size: 20px;
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
