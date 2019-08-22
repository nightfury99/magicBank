<template>
  <div class="app-container">

	<el-row>
	  <el-col :span="20" >
		<el-input
		  v-model="search"
		  prefix-icon="el-icon-search"
		  placeholder="Type to search"/>
	  </el-col>
	  <el-col :span="4" >
			<el-button style="float: right" type="warning" @click="navigateTo({name: 'expertiseRegister'})" >Create New Expertise</el-button>
	  </el-col>
	</el-row>
	
	<el-row>
		<el-table
		v-loading="listLoading"
		:data="expertise.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		element-loading-text="Loading"
		border
		fit
		highlight-current-row>

			<el-table-column label="Expertise Name" width="400">
				<template slot-scope="scope">
				<el-tag type="info" size="mini">{{ scope.row.name}}</el-tag>
				</template>
			</el-table-column>

      <el-table-column label="Fee Rate" width="400">
				<!-- <template slot-scope="scope">s
				<el-tag type="info" size="mini">{{ scope.row.name}}</el-tag>
				</template> -->
			</el-table-column>

            <el-table-column align="center" label="Created Date" width="200">
				<template slot-scope="scope">
				<el-tag type="info" size="mini">{{ scope.row.created_at}}</el-tag>
				</template>
			</el-table-column>

			<el-table-column align="center" label="Action" >
				<template align="center" slot-scope="scope">
					<el-tooltip :open-delay="tooltipDelay" content="Profile" placement="top">
						<el-button size="mini" icon="el-icon-search" @click="navigateTo ({name: 'expertiseDetail', params:{expertiseId: scope.row.id}})" circle></el-button>
					</el-tooltip>
					<el-tooltip :open-delay="tooltipDelay" content="Update" placement="top">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="navigateTo ({name: 'expertiseUpdate', params:{expertiseId: scope.row.id}})" circle></el-button>
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
				:page-count="expertiseQuery.page_count"
				@pagination="expertiseList" />
		</el-col>
	</el-row>

	<!-- Dialog for Expertise Delete -->
    <el-dialog
      :visible.sync="dialogDelete"
      title="Delete Confirmation"
      width="30%">
      <span>Delete this Expertise?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">Cancel</el-button>
        <el-button type="primary" @click="deleteExpertiseId">Delete</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { getExpertiseIndex, deleteExpertise, searchExpertise } from '@/api/expertise'
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  	data() {
		return {
			expertise: [],
			listLoading: false,
			tooltipDelay: 500,
			status: 1,
			
			idDelete: '',
			dialogDelete: false,
			
			totalExpertisePage: 0,
			expertiseQuery: {
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
		this.expertiseList()
	},
	
	methods: {

		// navigate to specific route
		navigateTo (route) {
			this.$router.push(route)
		},

		// list all expertise
		async expertiseList(val) {
			this.listLoading = true

			console.log(val)
			console.log(this.expertiseQuery)


			if (val) {
				this.expertiseQuery.page = val.page
				console.log(this.expertiseQuery)
			}

			const meta = (await getExpertiseIndex(this.expertiseQuery)).data.meta.pagination

			this.expertise = (await getExpertiseIndex(this.expertiseQuery)).data.data

			this.totalExpertisePage = meta.total
			this.expertiseQuery.page_count = meta.total_pages

			console.log(this.expertise)
			
			this.listLoading = false

		},

	// get desired expertise id to delete
    async changeDeleteId(id) {
      console.log(id)
      this.idDelete = id
      this.dialogDelete = true
    },

    // delete expertise
    async deleteExpertiseId() {
      console.log(this.idDelete)
      try {
        await deleteExpertise(this.idDelete)
      } catch (err) {
        console.log(err)
      }
      this.dialogDelete = false
      this.expertiseList()
    }

  }
}
</script>

<style>

</style>

