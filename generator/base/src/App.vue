<template>
  <div id="app">
    <%_ if(options.router){ _%>
    <router-view/>
    <%_ } _%>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>
