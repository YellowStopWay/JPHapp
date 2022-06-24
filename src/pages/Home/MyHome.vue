<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <GoodsRank/>
        <GuestLike/>
        <HomeFloor v-for="(floor,index) in floorList" :key="floor.id" :list='floor'/>
        <HomeBrand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import GoodsRank from '@/pages/Home/GoodsRank'
import GuestLike from '@/pages/Home/GuestLike'
import HomeFloor from '@/pages/Home/Floor'
import HomeBrand  from '@/pages/Home/Brand'
import { mapState } from 'vuex'

export default {
    name:'MyHome',
    components:{
        ListContainer,
        TodayRecommend,
        GoodsRank,
        GuestLike,
        HomeFloor,
        HomeBrand
    },
    mounted(){
        //派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList');
        
    },
    computed:{
        ...mapState({
            floorList:(state) => state.home.floorList    
        })
    }
}
</script>

<style>

</style>