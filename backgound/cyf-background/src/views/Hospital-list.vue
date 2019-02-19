<template>
  <div>
    <el-button type="primary" @click="addHospital">添加医院</el-button>
    医院列表
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="创建时间"
        width="180"
        prop="updatedAt">
      </el-table-column>
      <el-table-column
        label="来源"
        width="180"
        prop="from">
      </el-table-column>
       <el-table-column
        label="内容"
        width="380"
        prop="content">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pageWrap">
      {{tableData[0].content}}

      <!-- <div v-html="tableData[0].content"></div> -->
    </div>
    <!-- <div v-html="html"></div> -->
  </div>
</template>

<script>
import { getUser, getHospitalList } from '../api/index.js'
import { getDate } from '../utils/axios.js'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      getUser({}).then(res => {
        console.log('res: ' ,res)
      })
      getHospitalList().then(res => {
        console.log('res: ', res);
          this.tableData = res.data
          this.tableData.map(item => {
            item.updatedAt = getDate(item.updatedAt)
            return item
          })
      })
    },
    computed: {
      html() {
        return this.tableData[0].content
      }
    },
    methods: {
      addHospital() {
        this.$router.push('/hospitalEdit')
      },
      handleEdit(i, e) {
        console.log('i, e: ', i, e);
      },
      handleDelete() {

      }
    },
  }
</script>

<style scoped>

</style>
