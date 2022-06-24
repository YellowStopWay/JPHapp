<template>
  <div id="app">
    <MyHeader/>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 在home或者search下显示，在login或者register下隐藏 -->
    <MyFooter v-show="$route.meta.show"  />
  </div>
</template>

<script>
import MyHeader from './components/Header'
import MyFooter from './components/Footer'
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    MyHeader,MyFooter
  },
  mounted(){
    //通知vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
