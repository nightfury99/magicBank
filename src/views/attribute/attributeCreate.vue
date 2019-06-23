<template>
    <div class="app-container">
        <el-form label-position="top"> 
            <el-form-item label="Name">
                <el-col :span="24">
                    <el-input 
                        placeholder="Enter Name"
                        v-model="newAttribute.name"/>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="24">
                    <el-switch 
                        v-model="newAttribute.hidden"
                        active-text="Hidden">
                    </el-switch>
                </el-col>
            </el-form-item>
            
            <el-form-item label="Category">
                
                    <el-select v-model="newAttribute.category" placeholder="Select Category">
                        <el-option
                            v-for= "category in categoryOption"
                            :key= "category.value"
                            :label= "category.label"
                            :value = "category.value">
                        </el-option>
                    </el-select>
                
            </el-form-item>
            <el-form-item label="Type">
                
                    <el-select v-model="newAttribute.type" placeholder="Select Type">
                        <el-option
                            v-for= "type in typeOption"
                            :key= "type.value"
                            :label= "type.label"
                            :value = "type.value">
                        </el-option>
                    </el-select>
                
            </el-form-item>
            <el-form-item label="Question Type" >
                    <el-select v-model= "newAttribute.questionType" placeholder="Select Question Type" v-on:change= "onChange()" >
                        <el-option
                            v-for= "questionType in questionTypeOption"
                            :key= "questionType.value"
                            :label= "questionType.label"
                            :value = "questionType.value">
                        </el-option>
                    </el-select>

            </el-form-item>
            
            <el-form-item label="Question Text"  v-if= "newAttribute.questionType!='none'" >
                <el-input
                    type="textarea"
                    :rows= "3"
                    placeholder="Enter Question Text"
                    v-model= "newAttribute.questionText">
                </el-input>
            </el-form-item>

            <el-form-item label="Question Choice"  v-if= "newAttribute.questionType=='radio'||newAttribute.questionType=='checkbox'||newAttribute.questionType=='select'" >
                <div  v-for= "(qchoices,k) in newAttribute.questionChoices" :key="k">
                    <el-col :span="24" class = "qChoice">
                        <el-input 
                            placeholder="Enter Question Choice"
                            v-model= "qchoices.choice">
                            <el-button slot="append" icon="el-icon-minus" @click= "remove(k)" v-show="k || (!k && newAttribute.questionChoices.length > 1 )"></el-button>
                            <el-button slot="append" icon="el-icon-plus" @click= "add(k)" v-show="k == newAttribute.questionChoices.length -1"></el-button>
                        </el-input>
                    </el-col>
                </div>
            </el-form-item>

            <el-form-item label="Question Choice"  v-if= "newAttribute.questionType=='switch'">
                <div  v-for= "(qchoices,k) in newAttribute.questionChoices" :key="k" >
                    <el-col :span="24" class = "qChoice">
                        <el-input 
                            placeholder= "Enter Question Choice " 
                            v-model= "qchoices.choice">
                        </el-input>
                    </el-col>
                </div>
            </el-form-item>
            {{newAttribute.questionChoices}}
            {{newAttribute.questionChoices.length}}
            {{newAttribute.questionType}}
        </el-form>

    </div>
</template>

<script>
export default {
    data(){
        return{
            
            categoryOption:[{
                value:'note',
                label:'Note'
            },
            {
                value:'business',
                label:'Business'
            },
            {
                value:'contact',
                label:'Contact'
            },
            {
                value:'call log',
                label:'Call Log'
            },
            {
                value:'credit application',
                label:'Credit Application'
            },
            {
                value:'credit log',
                label:'Credit Log'
            },
            {
                value:'other',
                label:'Other'
            }
            
            
            ],
            typeOption:[{
                value:'sales',
                label:'Sales'
            },
            {
                value:'credit',
                label:'Credit'
            },
            {
                value:'profile',
                label:'Profile'
            }],

            questionTypeOption:[{
                value:'none',
                label:'None'
            },
            {
                value:'text',
                label:'Text'
            },
            {
                value:'textarea',
                label:'Text Area'
            },
            {
                value:'radio',
                label:'Radio'
            },
            {
                value:'checkbox',
                label:'Checkbox'
            },
            {
                value:'select',
                label:'Select'
            },
            {
                value:'switch',
                label:'Switch'
            },
            {
                value:'table',
                label:'Table'
            }],

            newAttribute: {
                name: '',
                hidden: true,
                category: '',
                type: '',
                questionType: 'none',
                questionText: '',
                questionChoices:[],
                section:''

            }
        }
    },
    
    methods:{
        onChange() {
            if(this.newAttribute.questionType=='radio'||this.newAttribute.questionType=='checkbox'||this.newAttribute.questionType=='select'){
                this.newAttribute.questionChoices=[
                    {
                        choice:''
                    }
                ]
            }else if(this.newAttribute.questionType ==='switch'){
            this.newAttribute.questionChoices=[
                    {
                        choice:''
                    },
                    {
                        choice:''
                    }
                ]
            }else{
                this.newAttribute.questionChoices=[]
            }
        },  
        
        add(index,){
            this.newAttribute.questionChoices.push({choice:""})
        },
        remove(index,){
            this.newAttribute.questionChoices.splice(index,1)
        }
       
    }


 

}
</script>

<style scoped>
.qChoice{
    margin-bottom: 20px;
	&:last-child {
	    margin-bottom: 0;
	}
}
</style>
