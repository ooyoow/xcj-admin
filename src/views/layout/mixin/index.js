import { newPage } from '@/utils/general'
export default {
  methods: {
    handleMenuSelect(path) {
      if (/^menu-empty-\d+$/.test(path)) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(path)) {
        newPage(path)
      } else {
        this.$router.push({
          path: path || '/'
        })
      }
    }
  }
}
