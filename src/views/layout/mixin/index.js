export default {
  methods: {
    handleMenuSelect(path) {
      if (/^menu-empty-\d+$/.test(path)) {
        this.$message.warning('临时菜单')
      } else {
        console.log(path, 'onMenuClick')
        this.$router.push({
          path: path || '/'
        })
      }
    }
  }
}
