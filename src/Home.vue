<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo">
          <h2>OA</h2>
        </div>
        <!-- <img src="../assets/logo.jpg" alt="" class="logo"> -->
        <!--  :collapse="true" -->
        <el-menu active-text-color="#000" default-active="1-1" :unique-opened="true" :router="true" Login.vue class="el-menu-admin" @open="handleOpen" @close="handleClose" :collapse="isCollapse" text-color="#444">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-search"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="/usertable">
                用户列表
              </el-menu-item>
              <el-menu-item index="/adduser">
                添加用户
              </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-share"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="toggle-btn" @click='toggleCollapse'>
            <i class="el-icon-d-arrow-left" :style="{transform:[isCollapse? 'rotateZ(180deg)' :'rotateZ(0deg)']}"></i>
          </div>
          <h2>后台管理系统</h2>
          <div class="hellow">
            你好：
          </div>
        </el-header>
        <el-main>
          <!-- <p>
            欢迎来到后台管理系统<br>
            每一天都是新的开始...
          </p> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import usertable from './components/Usertable.vue'
export default {
  // components: {
  //   usertable
  // },
  data () {
    return {
      isCollapse: false,
      red: 'red',
      blue: 'blue'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-image: url('./assets/user.png');
  background-size: cover;
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;

  }
  .el-aside {
    background-color: rgba($color: transparent, $alpha: 0.3);
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    .el-menu {
      margin-top: 0;
      background-color: #3ECCB5;
      font-weight: 900;
      // text-color: #fff;
      i{
        color: #444;
        font-weight: 900;
        border-radius: 50%;
      }
      .el-menu-item{
        background-color: #3ECCB5;
      }
    }
    ul{
      border: 0;
    }
  }
  .el-header {
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(62, 204, 181,.5);
  }
  .el-main {
    display: flex;
    justify-content: center;
    // align-items: center;
    // background-color: rgba($color: transparent, $alpha: 0.3)
  }
  .logo {
    background-color: #3ECCB5;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    // margin-left: 17px;
    // background: url(../assets/pornhub.png);
    // background-size: cover;
    // background-color: #989898;
    h2{
      font-size: 28px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet   MS', sans-serif;
      font-weight: 400;
    }

  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #3ECCB5;
      color: #000 !important
    }
    i{
      transition: all 1s ease-out;
    }
  }
  h2 {
    font-size: 28px;
    color: white;
  }
  .hellow {
    color: white;
  }
}

.el-submenu__title:hover {
  color: #000;
  background-color: rgba(62, 204, 181,.5) !important;
}
</style>
