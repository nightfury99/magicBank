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
		<el-button style="float: right" type="warning">Add New User</el-button>
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
			<el-table-column label="NRIC" >
				<template slot-scope="scope">
				{{ }}
				</template>
			</el-table-column>
			<el-table-column label="Phone. No">
				<template slot-scope="scope">
				{{ }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="Email" width="270">
				<template slot-scope="scope">
				{{ scope.row.email }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="Role" width="150">
				<template align="center" slot-scope="scope">
					<el-tag type="warning" size="mini">{{ scope.row.roles[0].name }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="Branch" width="140">
				<template align="center" slot-scope="scope">
				{{ }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="Action" width="200">
				<template align="center" slot-scope="scope">
					<el-tooltip content="View" placement="top">
						<el-button icon="el-icon-search" circle></el-button>
					</el-tooltip>
					<el-tooltip content="Edit" placement="top">
						<el-button type="primary" icon="el-icon-edit" circle></el-button>
					</el-tooltip>
					<el-tooltip content="Delete" placement="top">
						<el-button type="danger" icon="el-icon-delete" circle></el-button>
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
				:total="total" 
				:current-page.sync="listQuery.page"
				@pagination="searchRecord" />
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
	  moment: moment,  
	  user: null,
	  range: [],
	  listLoading: false,
	  status: 1,
	  total: 0,
	  listQuery: {
		page: 1,
		limit: 50
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
	
	if(this.$route.query.from) {
	  this.range.push(this.$route.query.from)
	  this.range.push(this.$route.query.to)
	} else {
	  this.defaultRange()
	}

	this.searchRecord()
  },
  methods: {

	searchRecord: async function() {
		
	  this.listLoading = true

	  this.user = []

	  getUserIndex()
		.then(res => {
			var data = res.data.data
			var meta = res.data.meta

			console.log(data)

			if (data.length > 0) {
				this.user = data
				this.total = meta.total_records
			} else {
				this.user = []
			}

			this.listLoading = false
		})
		.catch(error => {
			console.log(error.response)
		})
	},

	defaultRange: function() {
	  var start = new Date()
	  start.setDate(1)

	  var end = new Date()

	  this.range.push(start)
	  this.range.push(end)
	}

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
