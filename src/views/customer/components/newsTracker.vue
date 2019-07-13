<template>
    <div>
        <h1> News Tracker </h1>

        <div class="app-container">
            <el-row type="flex" justify="center">
                <el-col>

                    <div class="crm-box-container" style="overflow: scroll; height: 90vh;">
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

                                <div class="interaction crm-timestamp">
                                
                                <el-row>
                                    <el-col :span="24" align="end">
                                        <b>{{ news.total_comments ? news.total_comments : 0 }}</b> Comments <b>{{ news.total_likes ? news.total_likes : 0 }}</b> Likes <b>{{ news.total_favourite ? news.total_favourite : 0  }}</b> Favourites
                                    </el-col>
                                </el-row>
                            </div>
                            
                            </div>
                        </el-row>

                        <!-- Pagination -->
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
        </div>
    </div>
</template>


<script>
import { getNewsboardIndex } from '@/api/newsboard'
import Pagination from '@/components/Pagination'
import moment from 'moment'

export default {
    name: 'NewsTracker',
    components: { Pagination },

    data() {
        return {
            newsfeed: [],
            totalNewsPage: 0,
            newsfeedQuery: {
                page: 1,
                limit: 50,
                page_count: 1
            },
        }
    },

    created() {
        this.newsList()
    },

    methods: {
        moment: function (date) {
            return moment(date);
        },

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
    }
}
</script>
