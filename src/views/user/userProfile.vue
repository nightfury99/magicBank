<template>
	<div class="app-container">
		<el-row type="flex" justify="center">
		
			<!-- User Details -->
			<el-col :span="20">
				<el-card :body-style="{ padding: '50px' }" style="height: 400px;">
					<el-row>

					<el-col :span="5">
						<el-avatar shape="square" :size="200" :fit="fill" :src="image"></el-avatar>
					</el-col>

					<el-col :span="19">
					<div class="crm-profile-name">{{ user.name }} ( {{ user.nickname }} )</div>
					<div class="crm-profile-content">{{ user.role_name }} of {{ user.branch_name}} </div>
					
					
					</el-col>

					</el-row>

					<el-row style="padding-top: 10px;">
						<el-card shadow="hover" style="height: 104px;">
							<div style="padding: 14px;">
								<el-row type="flex" :gutter="20">
									<el-col :span="8">
										<div class="crm-profile-content">
											<svg-icon icon-class="email"/> {{ ' : ' + user.email }}
										</div>
									</el-col>

									<el-col :span="8">
										<div class="crm-profile-content">
											<i class="el-icon-phone"/> {{ ' : ' + user.phone_no }}
										</div>
									</el-col>

									<el-col :span="8">
										<div class="crm-profile-content">
        									<el-button style="float: right" type="warning" @click="">Edit Profile</el-button>
										</div>
									</el-col>
								</el-row>
							</div>
						</el-card>
					</el-row>

				</el-card>
			</el-col>
		</el-row>

		<div style="margin-top: 20px;" />

		<el-row type="flex" justify="center" :gutter="20">

			<!-- Recent Activity  -->
			<el-col :span="10">
				<div class="crm-box-container" style="overflow: scroll; height: 90vh;">

					<el-row>

						<div class="crm-box-header">
							<span>Recent Activity</span>
						</div>

						<el-timeline :reverse="reverse">
							<el-timeline-item
							v-for="(activity, index) in activities"
							:key="index"
							:timestamp="activity.timestamp">
							{{activity.content}}
							</el-timeline-item>
						</el-timeline>

					</el-row>

					<div class="crm-box-content">
						
					</div>

				</div>
			</el-col>

			<!-- Favourite Newsfeed -->
			<el-col :span="10">
				<div class="crm-box-container" style="overflow: scroll; height: 90vh;">

					<el-row>

						<div class="crm-box-header">
							<span>Newsfeed</span>
						</div>

						    <el-row type="flex" justify="center">
								<el-col :span="22">

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

					</el-row>

					<div class="crm-box-content">
						
					</div>

				</div>
			</el-col>

		</el-row>
	</div>
</template>


<script>
import { mapGetters } from 'vuex'
import { getNewsboardFavourite, deleteNewsboard } from '@/api/newsboard'
import { getUserShow } from '@/api/user'
import moment from 'moment'
import Pagination from '@/components/Pagination'

  export default {
	
	name: 'index',
	components: {
		Pagination
	},
	  
	data() {
	  return {
		
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
		},

		user: {
			id: '',
			name: '',
			nickname: '',
			phone_no: '',
			email: '',
			status: '',
			branch_name: '',
			role_name: ''
      	}, 
		image: 'https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg',

		// fake data recent activity
		reverse: false,
        activities: [{
          content: 'Add call log',
          timestamp: '2018-04-15'
        }, {
          content: 'Updated user profile',
          timestamp: '2018-04-13'
        }, {
          content: "You likes Amin's post",
          timestamp: '2018-04-11'
        }]

	 	}	
	},

	computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
	},
	  
	mounted() {
    	this.newsFavouriteList()
		this.getUser()
	},

	methods: {
		// get user
			async getUser() {

			const userId = this.$store.state.route.params.userId

			getUserShow(userId)
				.then(res => {
					const data = res.data.data
					this.user.name = data.name,
					this.user.id = data.id,
					this.user.nickname = data.nickname,
					this.user.phone_no = data.phone_no,
					this.user.email = data.email
					this.user.status = data.status,
					this.user.branch_name = data.branches[0].name,
					this.user.role_name = data.roles[0].name
				})
				.catch(error => {
						console.log(error.response)
				})

			console.log(this.user)
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
	
	}
}
</script>

<style scoped>

.profile-image{
	border-radius: 6px;
	display: block;
	margin: 40px;
	/* margin-top: 30px; */
	/* margin-left: auto; */
	/* margin-right: auto; */
	/* width: 100%; */
	max-height: 20%;
	max-width: 	20%;
}

.profile-name{
	padding: 0px;
	margin-top: 6px;
	margin-bottom: 0px;
	 
}

.profile-role{
 	padding: 0px;
	margin: 0px;
	color: #104663;
}

.profile-meta{
 	padding: 0px;
	margin: 0px;
	color: #767778;
}

.profile-value{
 	padding: 0px;
	margin: 0px;
}
</style>
