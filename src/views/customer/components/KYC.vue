<template>
  <div>
    <h1> KYC History </h1>

    <div class="app-container">
      <el-table
        :data="tableData.filter(data => !search || data.user.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">

        <el-table-column
          label="Title"
          prop="title">
        </el-table-column>

        <el-table-column
          label="Date"
          prop="date">
        </el-table-column>

        <el-table-column
          label="User"
          prop="user">
        </el-table-column>

        <el-table-column
          align="right">
          <!-- Search bar -->
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"/>
          </template>

          <template slot-scope="scope">
            <!-- Download Excel button -->
            <el-button
              size="mini"
              type="success"
              @click="handleExcel(scope.$index, scope.row)">Excel</el-button>
            
            <!-- Download PDF button -->
            <el-button
              size="mini"
              type="primary"
              @click="handlePDF()">PDF</el-button>
          </template>
        </el-table-column>

      </el-table> 
    </div>
  </div>
</template>

<script>
  import jspdf from 'jspdf'

  export default {

    name: 'KYC',

    data() {
      return {
        pdfname: '',
        tableData: [{
          title: 'KYC 2019.05',
          date: '03/05/2019',
          user: 'Nicholas'
        }, {
          title: 'KYC 2019.03',
          date: '01/03/2019',
          user: 'Nicholas'
        }, {
          title: 'KYC 2018.10',
          date: '10/10/2018',
          user: 'Kent'
        }, {
          title: 'KYC 2018.08',
          date: '07/08/2018',
          user: 'Kent'
        }],
        search: '',
      }
    },

    methods: {

      handleExcel(index, row) {
        console.log(index, row);
      },

      handlePDF() {
        let pdfName = 'test'; 
        var doc = new jspdf();
        doc.text(this.pdfname, 10, 10);
        doc.save(pdfName + '.pdf');
      }
    },

  }
</script>