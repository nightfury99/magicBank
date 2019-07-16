<template>
    <div class="app-container">

    <el-row type="flex" justify="center">
      <el-col :span="14">

        <!-- Create Post Panel -->
        <div v-if="news" class="crm-box-container">
            
            <el-row class="crm-box-header">
                <span v-if="news.created_by" style="display:block; font-weight: 500">{{ news.created_by.name }}</span>

                <el-col class="crm-timestamp" :span="5">
                    <span>{{ news.created_at | moment("from", "now") }}</span>
                </el-col>
            </el-row>

            <el-row class="crm-box-content description">
                {{ news.description }}
            </el-row>

            <el-row v-if="news.location">
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
                style="width: 100%; height: 300px;"
                >
                <gmap-marker
                    :position="{lat: parseFloat(news.location.latitude), lng: parseFloat(news.location.longitude) }">
                </gmap-marker>
                </GmapMap>
            </el-row>

            <el-row v-if="news.media" class="crm-box-content" style="margin-top: 5px;">
                <el-image
                style="width: 100px; height: 100px; margin-right: 5px"
                v-for="(image, index) in news.media"
                :key="index"
                :src="`${path.image}/${image}`"
                fit="fit"></el-image>

                <div style="margin-top: 20px;" />

                <el-row v-if="news.users">
                    <el-tag size="mini" type="warning" v-for="(user, index) in news.users" :key="index">{{ user.name }}</el-tag>
                </el-row>

                <el-row v-if="news.customers">
                    <el-tag size="mini" type="success" v-for="(customer, index) in news.customers" :key="index">{{ customer.name }}</el-tag>
                </el-row>
            </el-row>

            
            <div class="crm-box-content interaction">
                <el-row>
                    <el-col :span="8" align="center">
                        <el-button v-if="isLike" @click="triggerLike" type="text" size="medium" icon="el-icon-s-opportunity">Like</el-button>
                        <el-button v-else @click="triggerLike" type="text" size="medium" icon="el-icon-s-opportunity">Like</el-button>
                    </el-col>
                    <el-col :span="8" align="center">
                        <el-button v-if="isFavourite" @click="triggerFavourite" type="text" size="medium" icon="el-icon-star-on">Favourite</el-button>
                        <el-button v-else @click="triggerFavourite" type="text" size="medium" icon="el-icon-star-off">Favourite</el-button>
                    </el-col>
                    <el-col :span="8" align="center">
                        <el-button @click="dialogVisible = true" type="text" size="medium" icon="el-icon-share">Share</el-button>
                    </el-col>
                </el-row>
            </div>

            <div class="divider"/>
            
            <div class="crm-box-content comments">
                <div class="comment divider" v-for="(comment, index) in comments" :key="index">
                    <el-row>
                        <el-col :span="23">
                            <span class="crm-heading-medium-title">{{ comment.name }}</span>
                            <span class="crm-timestamp flex" justify="end">{{ comment.created_at | moment("from", "now") }}</span>
                        </el-col>
                        <el-col :span="1">
                            <el-button @click="deleteComment(comment.id)" type="text" size="mini" icon="el-icon-delete"></el-button>
                        </el-col>
                    </el-row>

                    <div class="body">{{ comment.body }}</div>
                </div>
            </div>

            <div class="crm-box-content form">
                <text-area-emoji-picker 
                    v-model="data.body"
                    placeholder="Insert a comment"
                    @handleEnter="submitComment"
                    :disable="isSubmitted"
                    />
            </div>

        </div>
      </el-col>

    </el-row>

    <el-dialog
        title="Share"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <vue-good-share />
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNews, addComment, deleteComment, favourite, like } from '@/api/newsboard'
import VueGoodShare from 'vue-goodshare'
import TextAreaEmojiPicker from '@/components/TextAreaEmojiPicker'

export default {
    data() {
        return {
            news: {},
            data: {
                id: this.$route.params.id,
                body: '',
            },
            comments: [],
            isSubmitted: false,
            isLike: false,
            isFavourite: false,
            dialogVisible: false,
            path: {
                image: process.env.MEDIA_PATH + '/' + process.env.STORAGE_FOLDER,
            }
        }
    },

    components: { TextAreaEmojiPicker, VueGoodShare },

    created() {
        this.loadNews()
    },

    methods: {

        loadNews: function() {
            
            this.news = {}
            this.comments = {}

            getNews(this.data.id)
                .then(resp => {
                    this.news = resp.data.data
                    this.comments = this.news.comments
                    this.isLike = this.news.is_liked
                    this.isFavourite = this.news.is_favourited
                })
        },

        submitComment: function() {
            
            this.isSubmitted = true

            addComment(this.data)
                .then(resp => {

                    if(resp.status >= 200 && resp.status <= 299) {
                        this.data.body = ''
                        this.loadNews();
                    }

                    this.isSubmitted = false
                })
        },

        deleteComment: function(id) {
            deleteComment(id)
                .then(resp => {
                    this.loadNews();
                })
        },

        triggerFavourite: function() {

            favourite(this.data.id)
                .then(resp => {
                   if(resp.status >= 200 && resp.status <= 299) {
                        this.isFavourite = !this.isFavourite
                    }
                })
        },

        triggerLike: function() {

            like(this.data.id)
                .then(resp => {
                    if(resp.status >= 200 && resp.status <= 299) {
                        this.isLike = !this.isLike
                    }
                })
        },

    }
}
</script>

<style scoped>

    .form {
        position:relative;
        background-color: #FFFDD0;
    }

    .description {
        margin-bottom: 30px;
    }

    .comments {
        background-color: #FFFFE0;
        font-size: 14px;
    }

    .comment {
        padding-top:10px;
        padding-bottom: 20px;
    }

    .divider {
        border-bottom: 1px solid;
        border-color: #FFF8BC;
        padding-left: 5px;
        padding-right: 5px;
    }

    .body {
        margin-top: 10px;
        color: #7f7f70;
    }

    .top-right {
    }
</style>
