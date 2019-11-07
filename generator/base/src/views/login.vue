<template>

</template>

<script>
export default {
  name: 'Login',
  methods: {
    login () {
      this.$store.dispatch('login', {});
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
