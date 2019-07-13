<template>
  <div class="app-container">

    <el-row type="flex" justify="center">
      <el-col :span="14">

        <div class="crm-box-container">
          
          <div class="crm-box-header">

            <el-row>
              <el-input
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  placeholder="Write something"
                  v-model="post.description">
              </el-input>
            </el-row>

            <el-row
              v-if="flag.isTagShow">
              <el-select 
                v-model="post.user" 
                filterable 
                multiple
                placeholder="Tag Users" 
                style="width:100%">
                
                <el-option 
                    v-for="item in users" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id"> </el-option>

              </el-select>

            </el-row>

            <el-row
              v-if="flag.isTagShow">
              <el-select 
                v-model="post.customer" 
                filterable 
                multiple
                remote
                :remote-method="remoteCustomerSearch"
                placeholder="Tag Customers" 
                style="width:100%">
                
                <el-option 
                    v-for="item in customers" 
                    :key="item.uuid" 
                    :label="item.name" 
                    :value="item.uuid"> </el-option>

              </el-select>

            </el-row>
            
            <div class="menu">

              <el-row>
                
                <!-- Media upload button -->
                <el-button size="mini" type="info" plain icon="el-icon-picture">Media</el-button>

                <!-- File upload button -->
                <el-button size="mini" type="info" plain icon="el-icon-document">File</el-button>

                <!-- File upload button -->
                <el-button size="mini" type="info" plain icon="el-icon-document" @click="flag.isTagShow = !flag.isTagShow">Tag</el-button>

                <!-- Location button -->
                <el-button v-if="!post.location" @click="dialogMap = true" size="mini" type="info" plain icon="el-icon-location-outline">Location</el-button>
                <el-button v-else @click="dialogMap = true" size="mini" type="success" plain icon="el-icon-location-outline">Location</el-button>

              </el-row>
              
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
                    <el-button @click="changeDeleteId(news.id)" type="text" size="mini" icon="el-icon-delete" v-if="news.created_by.name == name"></el-button>
                  </el-col>
                  
                </el-row>

                <el-row class="">
                  <p>{{ news.description }}</p>
                </el-row>

                <el-row class="" v-if="news.location">
                  <GmapMap
                    :center="{lat: parseFloat(news.location.latitude), lng: parseFloat(news.location.longitude) }"
                    :zoom="14"
                    :options="{
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        disableDefaultUi: false
                    }"
                    style="width: 100%; height: 200px;"
                    >
                    <gmap-marker
                      :position="{lat: parseFloat(news.location.latitude), lng: parseFloat(news.location.longitude) }">
                    </gmap-marker>
                  </GmapMap>
                </el-row>

                <div style="margin-top: 20px;" />

                <el-row v-if="news.users">
                  <el-tag size="mini" type="warning" v-for="(user, index) in news.users" :key="index">{{ user.name }}</el-tag>
                </el-row>

                <el-row v-if="news.customers">
                  <el-tag size="mini" type="success" v-for="(customer, index) in news.customers" :key="index">{{ customer.name }}</el-tag>
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

    <!-- Dialog for Location -->
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
import { getUsers } from '@/api/user'
import { searchCustomer } from '@/api/customer'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },

  data() {
    return {
      avatar: 'https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg',
      newsfeed: [],
      newsfeedFavourite: [],
      newPost: '',
      users: [],
      customers: [],
      flag: {
        isTagShow: false
      },
      fileList: [],
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
    this.getUsers()
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
      console.log(this.post.location)
      console.log("hi")
      this.dialogMap = false
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
      console.log(file);
    },

    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
    },

    getUsers() {
        getUsers()
            .then(resp => {
                this.users = resp.data.data
            })
    },

    remoteCustomerSearch(query) {
      if(query !== '') {
        this.customers = []

        searchCustomer(query)
          .then(resp => {
            this.customers = resp.data.data
          });
      }
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

.el-tag {
  margin-right: 5px;
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
