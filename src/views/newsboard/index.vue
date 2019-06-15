<template>
  <div class="app-container">

    <el-row type="flex" justify="center">
      <el-col :span="14">

        <div class="crm-box-container">
          
          <div class="crm-box-header">
            <el-input
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  placeholder="Write something"
                  v-model="post.description">
            </el-input>
            <div class="menu">
              <el-button size="mini" type="info" plain icon="el-icon-camera">Media</el-button>
              <el-button size="mini" type="info" plain icon="el-icon-document">File</el-button>
              <el-button size="mini" type="info" plain icon="el-icon-user-solid">Tag</el-button>
              
              <el-button v-if="!post.location" @click="dialogMap = true" size="mini" type="info" plain icon="el-icon-location-outline">Location</el-button>
              <el-button v-else @click="dialogMap = true" size="mini" type="success" plain icon="el-icon-location-outline">Location</el-button>
              
            </div>
            <el-row type="flex" class="row-bg" justify="end">
              <el-button type="warning" @click="postMessage" >Post</el-button>
            </el-row>
          </div>
          
        </div>

        <div class="crm-box-container">

          <el-row class="news crm-box-content" v-for="(news, index) in newsfeed" :key="index">
            <div>
                <el-row>
                  
                  <el-col :span="23">
                    <router-link :to="{ name: 'SingleNews', params: { id: news.id }}">
                      <span class="crm-heading-medium-title">{{ news.created_by.name }}</span>
                    </router-link>
                      <span class="crm-timestamp clearfix" justify="end">{{ news.created_at | moment("from", "now") }}</span>
                  </el-col>
                  <el-col :span="1">
                    <el-button @click="changeDeleteId(news.id)" type="text" size="mini" icon="el-icon-delete"></el-button>
                  </el-col>
                  
                </el-row>

                <el-row class="">
                  <p>{{ news.description }}</p>
                </el-row>

                <div class="interaction">
                  
                  <el-row>
                      <el-col :span="24" align="end">
                        <el-button type="text">{{ news.total_comments }} Comments</el-button>
                        <el-button @click="triggerLike" type="text">{{ news.total_likes }} Likes</el-button>
                        <el-button @click="triggerFavourite" type="text">{{ news.total_favourite }} Favourites</el-button> 
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
                :page-count="newsfeedQuery.page_count"
                @pagination="newsList" 
                :total="0"/>
            </el-col>
          </el-row>
          
        </div>

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

    <el-dialog
      custom-class="dialog-map"
      :visible.sync="dialogMap"
      width="35%"
      @open="geolocate"
      top="5vh">

      <el-card
        :body-style="{padding: '10px'}"
        style="margin-bottom:10px;">
        <gmap-autocomplete
          @place_changed="setCenter"
          class="places-search"
          style="width:100%">
        </gmap-autocomplete>
      </el-card>

      <GmapMap
        :center="center.latLng"
        :zoom="center.zoom"
        :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false
        }"
        style="width: 100%; height: 350px;"
        >
        <gmap-marker
          :position="center.latLng">
        </gmap-marker>
      </GmapMap>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setLocation">Set Location</el-button>
        <el-button @click="dialogMap = false">Cancel</el-button>
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
      dialogMap: false,
      center: {
        latLng: {lat:10, lng:10},
        zoom: 7,
        marker: {},
        params: '',
      },
      post: {
        description: '',
        location: '',
        media: '',
        user: '',
        customer: '',
      },

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

    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude
      });
    },

    setCenter: function(place) {
      this.center.latLng.lat = place.geometry.location.lat()
      this.center.latLng.lng = place.geometry.location.lng()
      this.center.zoom = 15 
    },

    setLocation: function() {
      this.post.location = this.center.latLng.lat + ',' + this.center.latLng.lng
      this.dialogMap = false
    }
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
}

</style>
