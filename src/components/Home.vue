<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <h2>ManagerSystem</h2>
        </div>
        <!-- <img src="../assets/logo.jpg" alt="" class="logo"> -->
        <el-menu active-text-color="#000" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#444">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="toggle-btn">
            <i class="el-icon-d-arrow-left"></i>
          </div>
          <h2>后台管理系统</h2>
          <div class="welcome"></div>
        </el-header>
        <el-main>
          <p>
            欢迎来到后台管理系统<br>
            每一天都是新的开始...
          </p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-image: url('../assets/user.png');
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
      margin-top: 30%;
      background-color: #3ECCB5;
      font-weight: 900;
      // text-color: #fff;
      i{
        color: #444;
        font-weight: 900;
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
    align-items: center;
    p{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba($color: transparent, $alpha: 0.7);
      width: 400px;
      height: 90px;
      border-radius: 8px;
      color: #fff;
      font-size: 30px;
      font-weight: 900;
    }
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
  }
  h2 {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}

.el-submenu__title:hover {
  color: #000;
  background-color: rgba(62, 204, 181,.5) !important;
}
</style>
