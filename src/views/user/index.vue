<template>
  <div class="app-container">

	<el-row>
	  <el-col :span="13" :offset="5">
		<el-input
		  v-model="search"
		  prefix-icon="el-icon-search"
		  placeholder="Type to search"/>
	  </el-col>
	  <el-col :span="5" :offset="1">
		<el-button style="float: right" type="warning" @click="navigateTo({name: 'registerUser'})" >Register New User</el-button>
	  </el-col>
	</el-row>
	
	<el-row>
		<el-table
		v-loading="listLoading"
		:data="user.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		element-loading-text="Loading"
		border
		fit
		highlight-current-row>
			<el-table-column label="Name" width="310">
				<template slot-scope="scope">
				{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="Nickname" >
				<template slot-scope="scope">
				{{ scope.row.nickname}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="Role" width="150">
				<template align="center" slot-scope="scope">
					<el-tag type="warning" size="mini">{{ scope.row.roles[0].name }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="Branch" width="140">
				<template align="center" slot-scope="scope">
				{{ scope.row.branches[0].name }}
				</template>
			</el-table-column>

			<el-table-column align="center" label="Email" width="270">
				<template slot-scope="scope">
				{{ scope.row.email }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="Status">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status == 1" type="success" size="mini">Active</el-tag>
					<el-tag v-else type="danger" size="mini">Inactive</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="Action" width="200">
				<template align="center" slot-scope="scope">
					<el-tooltip content="View" placement="top">
						<el-button size="mini" icon="el-icon-search" circle></el-button>
					</el-tooltip>
					<el-tooltip content="Edit" placement="top">
						<el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
					</el-tooltip>
					<el-tooltip content="Delete" placement="top">
						<el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
	</el-row>

	<el-row>
		<el-col :span="24" align="center">
			<pagination
				background
				layout="prev, pager, next"
				:page-count="userQuery.page_count"
				@pagination="userList" />
		</el-col>
	</el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserIndex } from '@/api/user'
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  data() {
	return {
	  user: [],
	  listLoading: false,
	  status: 1,
		
		totalUserPage: 0,
	  userQuery: {
			page: 1,
			limit: 50,
			page_count: 1
		},
	  search: ''
	}
  },
  components: { Pagination },
  computed: {
	...mapGetters([
	  'roles'
	])
  },
  created() {
	this.userList()
	},
	

  methods: {

	navigateTo (route) {
		this.$router.push(route)
	},

	async userList(val) {
	  this.listLoading = true

		if (val) {
			this.userQuery.page = val.page
		}

		const meta = (await getUserIndex(this.userQuery)).data.meta.pagination

		this.user = (await getUserIndex(this.userQuery)).data.data
		this.totalUserPage = meta.total
		this.userQuery.page_count = meta.total_pages

		console.log(this.totalUserPage)

		this.listLoading = false

	},

	// searchRecord: async function() {
		
	//   this.listLoading = true

	//   this.user = []

	//   getUserIndex()
	// 	.then(res => {
	// 		var data = res.data.data
	// 		var meta = res.data.meta.pagination

	// 		console.log(meta)

	// 		console.log(data)

	// 		if (data.length > 0) {
	// 			this.user = data
	// 			this.totalUserPage = meta.total
	// 			this.userQuery.page_count = meta.total_pages
	// 		} else {
	// 			this.user = []
	// 		}

	// 		this.listLoading = false
	// 	})
	// 	.catch(error => {
	// 		console.log(error.response)
	// 	})
	// },


  }
}
</script>

<style>
  .el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
</style>
