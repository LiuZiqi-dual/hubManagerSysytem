<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    align="center"
    header-align="center">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="职位"
      width="180">
    </el-table-column>
    <el-table-column label="权限开关" prop="mg_state" width="100">
      <template slot-scope="scope">
      <el-tooltip :content="'管理权限: ' + scope.row.mg_state" placement="top">
        <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-tooltip>
      </template>
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
</template>

<script>
import { getUserdata } from '@/api/index.js'
export default {
  data () {
    return {
      tableData: [{
        id: '',
        username: '',
        role_name: '',
        mg_state: ''
      }],
      pageData: {
        query: '',
        pagenum: '1',
        pagesize: '40'
      },
      value1: true
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  mounted () {
    var self = this
    getUserdata(this.pageData)
      .then(
        function (res) {
          console.log(res.data.data.users)
          self.tableData = res.data.data.users
          // console.log(self.brand[0].isDelete);
          // self.brand = JSON.parse(res.data).brand
          // console.log(self.brand)
          // console.log(self.brand[0].isDelete);
        }
      )
      .catch(
        function (err) {
          console.log(err)
        }
      )
  }
}
</script>

<style lang="scss">
  .el-table{
    border-radius: 8px;
    top: -120px;
    th{
      text-align: center;
    }
    td{
      text-align: center;
    }
  }
</style>
