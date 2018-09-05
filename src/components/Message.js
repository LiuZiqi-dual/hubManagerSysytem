export const message = (params) => {
  params.obj.$message(
    {
      showClose: true,
      message: params.msg,
      type: params.type || ''
    }
  )
}
// open5() {
//   this.$message({
//     showClose: true,
//     message: '这是一条消息提示'
//   });
// },
// exports.open2 () {
//   this.$message({
//     message: '恭喜你，这是一条成功消息',
//     type: 'success'
//   })
// }
// exports.open3 () {
//   this.$message({
//     message: '警告哦，这是一条警告消息',
//     type: 'warning'
//   })
// }
// exports.open4 () {
//   this.$message.error('错了哦，这是一条错误消息')
// }
