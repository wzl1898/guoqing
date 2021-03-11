<script>
import Layout from '@layouts/main'
import { getProjectTitle } from '@utils/'

const title = getProjectTitle()

export default {

  components: { Layout },
  page: {
    title,
    meta: [{ name: 'description', content: `登录到 ${title}` }]
  }
}
</script>

<template>
  <Layout>
    <!-- router-view in routes.js -->
  </Layout>
</template>
