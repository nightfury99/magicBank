<template>
	<div class="app-container">
		<el-row type="flex" justify="center">
		
			<!-- First column -->
			<el-col :span="14">
				<el-card :body-style="{ padding: '0px' }" style="height: 300px;">
					<img :src="image" class="profile-image">
					<h4 align="center" class="profile-name">{{ user.name }}</h4>
					<h5 align="center" class="profile-role">{{ user.role_name }}</h5>
					
					<div style="padding: 14px;">
						<el-row type="flex" :gutter="20">
							<el-col :span="6"><div class="profile-meta">Name</div></el-col>
							<el-col :span="18"><div class="profile-value">{{ user.nickname }}</div></el-col>
						</el-row>
						<el-row type="flex" :gutter="20">
							<el-col :span="6"><div class="profile-meta">Phone No</div></el-col>
							<el-col :span="18"><div class="profile-value">{{ user.phone_no }}</div></el-col>
						</el-row>
						<el-row type="flex" :gutter="20">
							<el-col :span="6"><div class="profile-meta">Email</div></el-col>
							<el-col :span="18"><div class="profile-value">{{ user.email }}</div></el-col>
						</el-row>
						<el-row type="flex" :gutter="20">
							<el-col :span="6"><div class="profile-meta">Branch</div></el-col>
							<el-col :span="18"><div class="profile-value">{{ user.branch_name }}</div></el-col>
						</el-row>
						<el-row type="flex" :gutter="20">
							<el-col :span="6"><div class="profile-meta">Status</div></el-col>
							<el-col :span="18"><div class="profile-value">{{ user.status }}</div></el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>

			
		</el-row>
	</div>
</template>


<script>
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
	 }
	},

	mounted() {
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
