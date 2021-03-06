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
			<el-button style="float: right" type="warning" @click="navigateTo({name: 'userRegister'})" >Register New User</el-button>
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
			<el-table-column label="Name" width="250">
				<template slot-scope="scope">
				{{ scope.row.nickname }} <br><el-tag type="info" size="mini">{{ scope.row.name}}</el-tag>
				</template>
			</el-table-column>

			<el-table-column align="center" label="Role" width="130">
				<template align="center" slot-scope="scope">
					<el-tag type="warning" size="mini">{{ scope.row.roles[0].name | capitalize }}</el-tag>
				</template>
			</el-table-column>
			
			<el-table-column align="center" label="Branch" width="140">
				<template align="center" slot-scope="scope">
				{{ scope.row.branches[0].name }}
				</template>
			</el-table-column>

			<el-table-column align="center" label="Email" width="250">
				<template slot-scope="scope">
				<el-tag type="info" size="mini">{{ scope.row.email }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column align="center" label="Status" width="100">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status == 1" type="success" size="mini">Active</el-tag>
					<el-tag v-else type="danger" size="mini">Inactive</el-tag>
				</template>
			</el-table-column>

			<el-table-column align="center" label="Action">
				<template align="center" slot-scope="scope">
					<el-tooltip :open-delay="tooltipDelay" content="Profile" placement="top">
						<el-button size="mini" icon="el-icon-search" @click="navigateTo ({name: 'userProfileManagement', params:{userId: scope.row.id}})" circle></el-button>
					</el-tooltip>
					<el-tooltip :open-delay="tooltipDelay" content="Update" placement="top">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="navigateTo ({name: 'userUpdate', params:{userId: scope.row.id}})" circle></el-button>
					</el-tooltip>
					<el-tooltip :open-delay="tooltipDelay" content="Delete" placement="top">
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="changeDeleteId(scope.row.id)" circle></el-button>
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

	<!-- Dialog for User Delete -->
    <el-dialog
      :visible.sync="dialogDelete"
      title="Delete Confirmation"
      width="30%">
      <span>Delete this user?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">Cancel</el-button>
        <el-button type="primary" @click="deleteUserId">Delete</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserIndex, deleteUser } from '@/api/user'
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  	data() {
		return {
			user: [],
			listLoading: false,
			tooltipDelay: 500,
			status: 1,
			
			idDelete: '',
			dialogDelete: false,
			
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

	filters: {
		capitalize: function (value) {
			if (!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	
  	created() {
		this.userList()
	},
	
	methods: {

		// navigate to specific route
		navigateTo (route) {
			this.$router.push(route)
		},

		// list all users
		async userList(val) {
			this.listLoading = true

			console.log(val)
			console.log(this.userQuery)


			if (val) {
				this.userQuery.page = val.page
				console.log(this.userQuery)
			}

			const meta = (await getUserIndex(this.userQuery)).data.meta.pagination

			this.user = (await getUserIndex(this.userQuery)).data.data

			this.totalUserPage = meta.total
			this.userQuery.page_count = meta.total_pages

			console.log(this.user)
			
			this.listLoading = false

		},

	// get desired user id to delete
    async changeDeleteId(id) {
      console.log(id)
      this.idDelete = id
      this.dialogDelete = true
    },

    // delete user
    async deleteUserId() {
      console.log(this.idDelete)
      try {
        await deleteUser(this.idDelete)
      } catch (err) {
        console.log(err)
      }
      this.dialogDelete = false
      this.userList()
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
