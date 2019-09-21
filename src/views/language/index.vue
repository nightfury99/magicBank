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
			<!-- <el-button style="float: right" type="warning" @click="navigateTo({name: 'languageRegister'})" >Create New Language</el-button> -->
	  </el-col>
	</el-row>
	
	<el-row>
		<el-table
		v-loading="listLoading"
		:data="language.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		element-loading-text="Loading"
		border
		fit
		highlight-current-row>

			<el-table-column label="Language Name" width="400">
				<!-- <template slot-scope="scope">
				<el-tag type="info" size="mini">{{ scope.row.language_name}}</el-tag>
				</template> -->
			</el-table-column>

      <el-table-column label="Language Code" width="400">
				<!-- <template slot-scope="scope">s
				<el-tag type="info" size="mini">{{ scope.row.name}}</el-tag>
				</template> -->
			</el-table-column>

            <el-table-column align="center" label="Status" width="200">
				<template slot-scope="scope">
				<el-tag type="info" size="mini">{{ scope.row.created_at}}</el-tag>
				</template>
			</el-table-column>

			<el-table-column align="center" label="Action" >
				<template align="center" slot-scope="scope">
					<el-tooltip :open-delay="tooltipDelay" content="Profile" placement="top">
						<el-button size="mini" icon="el-icon-search" @click="navigateTo ({name: 'languageDetail', params:{languageId: scope.row.id}})" circle></el-button>
					</el-tooltip>
					<el-tooltip :open-delay="tooltipDelay" content="Update" placement="top">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="navigateTo ({name: 'languageUpdate', params:{languageId: scope.row.id}})" circle></el-button>
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
				:page-count="languageQuery.page_count"
				@pagination="languageList" />
		</el-col>
	</el-row>

	<!-- Dialog for Language Delete -->
    <el-dialog
      :visible.sync="dialogDelete"
      title="Delete Confirmation"
      width="30%">
      <span>Delete this Language?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">Cancel</el-button>
        <el-button type="primary" @click="deleteLanguageId">Delete</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { getLanguageIndex, deleteLanguage, searchLanguage } from '@/api/language'
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  	data() {
		return {
			language: [],
			listLoading: false,
			tooltipDelay: 500,
			status: 1,
			
			idDelete: '',
			dialogDelete: false,
			
			totalLanguagePage: 0,
			languageQuery: {
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
		this.languageList()
	},
	
	methods: {

		// navigate to specific route
		navigateTo (route) {
			this.$router.push(route)
		},

		// list all language
		async languageList(val) {
			this.listLoading = false    //tukar jadi true semula

			console.log(val)
			console.log(this.languageQuery)


			if (val) {
				this.languageQuery.page = val.page
				console.log(this.languageQuery)
			}

			const meta = (await getLanguageIndex(this.languageQuery)).data.meta.pagination

			this.language = (await getLanguageIndex(this.vQuery)).data.data

			this.totalLanguagePage = meta.total
			this.languageQuery.page_count = meta.total_pages

			console.log(this.language)
			
			this.listLoading = false

		},

	// get desired language id to delete
    async changeDeleteId(id) {
      console.log(id)
      this.idDelete = id
      this.dialogDelete = true
    },

    // delete language
    async deleteLanguageId() {
      console.log(this.idDelete)
      try {
        await deleteLanguage(this.idDelete)
      } catch (err) {
        console.log(err)
      }
      this.dialogDelete = false
      this.languageList()
    }

  }
}
</script>

<style>

</style>

