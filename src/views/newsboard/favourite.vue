<template>
  <div class="app-container">

    <el-row type="flex" justify="center">
      <el-col :span="14">

        <div class="crm-box-container">

          <el-row class="news crm-box-content" v-for="(news, index) in newsfeedFavourite" :key="index">
            <div>
                <el-row>
                  
                  <el-col :span="23">
                    <router-link :to="{ name: 'SingleNews', params: { id: news.id }}">
                      <span class="crm-heading-medium-title">{{ news.newsboard.created_by }}</span>
                    </router-link>
                      <span class="crm-timestamp clearfix" justify="end">{{ news.created_at | moment("from", "now") }}</span>
                  </el-col>
                  <el-col :span="1">
                    <el-button @click="changeDeleteId(news.id)" type="text" size="mini" icon="el-icon-delete" v-if="news.newsboard.created_by == name"></el-button>
                  </el-col>
                  
                </el-row>

                <el-row class="">
                  <p>{{ news.description }}</p>
                </el-row>

                <div class="interaction crm-timestamp">
                  
                  <el-row>
                      <el-col :span="24" align="end">
                        <b>{{ news.total_comments ? news.total_comments : 0 }}</b> Comments <b>{{ news.total_likes ? news.total_likes : 0 }}</b> Likes <b>{{ news.total_favourite ? news.total_favourite : 0  }}</b> Favourites
                      </el-col>
                  </el-row>
              </div>
              
            </div>
          </el-row>

          <el-row>
            <el-col :span="24" align="center">
              <pagination
                background
                layout="prev, pager, next"
                :page-count="newsFavouriteQuery.page_count"
                @pagination="newsFavouriteList" 
                :total="0"/>
            </el-col>
          </el-row>
          
        </div>

      </el-col>

    </el-row>

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
import { getNewsboardFavourite, deleteNewsboard } from '@/api/newsboard'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },

  data() {
    return {
      avatar: 'https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg',
      newsfeedFavourite: [],
      newPost: '',
      dialogVisible: false,
      dialogDelete: false,
      dialogMap: false,

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
    this.newsFavouriteList()
  },

  methods: {

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
        await postNewsboardStore(this.post)
      } catch (err) {
        console.log(err)
      }
      
      this.post.description = ''
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
      try {
        await deleteNewsboard(this.idDelete)
      } catch (err) {
      }
      this.dialogDelete = false
      this.newsList()
    },
   
  }
}
</script>

<style scoped>

.menu {
  margin-top: 10px;
}



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

.news.crm-box-content {
  border-bottom: 1px solid;
  border-color: #e3e3e3;
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

.dialog-map {
  z-index: 39;
}

.places-search {
  border:none;
  padding: 10px;
}

.interaction {
  margin-top: 10px;
  font-size:13px;
}

</style>
