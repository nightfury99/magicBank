<template>
    <div class="app-container">
        <el-row>
	        <el-col >
			    <el-button style="float: right" type="warning" @click="navigateTo({name: 'attributeCreate'})" >+</el-button>
            </el-col>
	    </el-row>
        <el-row>
            <el-table :data ="attributes">
                <el-table-column label="Attribute"  prop="name">			  
                </el-table-column>
            </el-table>   
        </el-row>
        <el-row>
		    <el-col :span="24" align="center">
			    <pagination
				    background
				    layout="prev, pager, next"
				    :page-count="query.page_count"
				    @pagination="attributes" />
		    </el-col>
	    </el-row>

    
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
   
    data(){
        return{
            //Dummy Data
            attributes:[
                {
                    id: 1,
                    name: "Test1"
                },
                {
                    id: 1,
                    name: "Test2"
                },
                {
                    id: 1,
                    name: "Test3"
                }
            ],
            query: {
				page: 1,
				limit: 50,
				page_count: 1
			},   
        }
    },
   

    methods:{
        // navigate to specific route
        navigateTo(route){
            this.$router.push(route)
    },

       

		
    }
}
</script>

<style scoped>
.el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
</style>
