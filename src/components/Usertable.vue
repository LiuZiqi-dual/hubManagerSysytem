<template>
  <div class="usertable">
    <!-- 面包屑和搜索框 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入搜索内容" @select="handleSelect">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-autocomplete>
    </el-breadcrumb>
    <!-- 面包屑和搜索框 -->
    <el-table :data="tableData" stripe style="width: 100%" align="center" header-align="center">
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="role_name" label="职位" width="180">
      </el-table-column>
      <el-table-column label="激活开关" prop="mg_state" width="100">
        <template slot-scope="scope">
          <el-tooltip :content="'账户状态: ' + scope.row.mg_state" placement="top">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="switchUserStatus(scope.row.id, scope.row.mg_state)">
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogFormVisible = true">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[1, 5, 10, 30, 50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal-0">
      </el-pagination>
    </div>
    <!-- 分页栏 -->

    <!-- 编辑用户 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
  </div>
</template>

<script>
import { getUserdata, switchUserStatus } from '@/api/index.js'
export default {
  data () {
    return {
      tableData: [
        {
          id: '',
          username: '',
          role_name: '',
          mg_state: ''
        }
      ],
      pageData: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      value1: true,
      // 搜索框的数据
      restaurants: [],
      state4: '',
      timeout: null,

      // 分页数据
      pageTotal: '',
      pageNuml: '',
      currentPage1: 1,

      // 编辑用户提交
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 重载数据函数
    reloadData (pageData) {
      var self = this
      getUserdata(pageData)
        .then(function (res) {
          var data = res.data.data
          console.log(data)
          self.tableData = data.users
          self.pageTotal = data.total
          self.pageNum = data.pagenum
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 编辑与删除函数
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 搜索框的事件
    loadAll () {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号'
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海长宁区金钟路968号9号楼地下一层'
        },
        { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
        { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
        {
          value: '快乐柠檬（神州智慧店）',
          address: '上海市长宁区天山西路567号1层R117号店铺'
        },
        {
          value: 'Merci Paul cafe',
          address: '上海市普陀区光复西路丹巴路28弄6号楼819'
        },
        {
          value: '猫山王（西郊百联店）',
          address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
        },
        { value: '枪会山', address: '上海市普陀区棕榈路' },
        { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
        { value: '钱记', address: '上海市长宁区天山西路' },
        { value: '壹杯加', address: '上海市长宁区通协路' },
        {
          value: '唦哇嘀咖',
          address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第12A单元'
        },
        { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
        {
          value: '爱茜茜里(近铁广场)',
          address:
            '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
        },
        {
          value: '鲜果榨汁（金沙江路和美广店）',
          address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
        },
        {
          value: '开心丽果（缤谷店）',
          address: '上海市长宁区威宁路天山路341号'
        },
        { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
        { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
        { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
        {
          value: '凡仔汉堡（老真北路店）',
          address: '上海市普陀区老真北路160号'
        },
        { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
        { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
        {
          value: '饭典*新简餐（凌空SOHO店）',
          address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
        },
        {
          value: '焦耳·川式快餐（金钟路店）',
          address: '上海市金钟路633号地下一层甲部'
        },
        { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
        { value: '浏阳蒸菜', address: '天山西路430号' },
        { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
        {
          value: '樱花食堂（凌空店）',
          address: '上海市长宁区金钟路968号15楼15-105室'
        },
        { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
        {
          value: '福荣祥烧腊（平溪路店）',
          address: '上海市长宁区协和路福泉路255弄57-73号'
        },
        {
          value: '速记黄焖鸡米饭',
          address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
        },
        { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
        {
          value: '(小杨生煎)西郊百联餐厅',
          address: '长宁区仙霞西路88号百联2楼'
        },
        { value: '阳阳麻辣烫', address: '天山西路389号' },
        {
          value: '南拳妈妈龙虾盖浇饭',
          address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
        }
      ]
    },
    querySearchAsync (queryString, cb) {
      this.restaurants = this.loadAll()
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect (item) {
      console.log(item)
    },

    // 修改用户状态
    switchUserStatus (uId, type) {
      console.log(uId)
      console.log(type)
      switchUserStatus(uId, type)
    },

    // 分页栏的事件
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageData.pagesize = (` ${val} `) - 0
      console.log(this.pageData.pagesize)
      this.reloadData(this.pageData)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      console.log(` ${val} `)
      this.pageData.pagenum = ` ${val} `
      this.reloadData(this.pageData)
      // console.log(this.tableData)
    }
  },
  mounted () {
    this.reloadData(this.pageData)
  }
}
</script>

<style lang="scss">
.usertable {
  width: 100%;
  .el-breadcrumb {
    border-radius: 8px;
    margin-bottom: -10px;
    height: 60px;
    line-height: 50px;
    font-size: 16px;
    padding-right: 10px;
    overflow: hidden;
    .el-autocomplete {
      float: right;
      .el-button {
        border-radius: 0;
        color: #000;
        background-color: #00e6bf;
      }
    }
  }
  .el-table {
    // border-radius: 8px;
    position: static !important;
    th {
      text-align: center;
    }
    td {
      text-align: center;
    }
  }
  .block{
    height: 50px;
    margin-top: -10px;
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 8px 8px;
    background-color: #f5f5f5;
    .el-pagination{
      width:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      // line-height: 50px;

    }
  }

}
</style>
