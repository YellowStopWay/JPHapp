<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
              <!-- 设置节流 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1ID="c1.categoryId"
                    >{{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 二、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2ID="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3ID="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//按需引入节流，throttle是默认暴露的，不需要加引号
import throttle from "lodash/throttle";
import router from "@/router";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移到哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    //throttle回调函数别用箭头函数，会出现this错乱的问题
    //节流回调
    changeIndex: throttle(function (index) {
      return (this.currentIndex = index);
    }, 50),
    //一级分类鼠标移出事件回调
    leaveIndex() {
      //路径不为home时才触发鼠标移出隐藏效果
      if (this.$route.path !== "/home") {
        this.show = false;
      }
      this.currentIndex = -1;
    },
    //跳转到search的回调函数
    goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //有categoryname属性的才是a
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        if(this.$route.params){
            location.params = this.$route.params
        }
        location.query = query;
        //整理完参数，开始跳转
        this.$router.push(location);
      }
    },
    //鼠标移入的时候，让商品列表进行展示
    enterShow() {
      this.show = true;
    },
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    
    //当组件挂载完毕后，判断组件是否为home，如果不是，隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //当使用这个计算属性时，右侧函数会立即执行一次
      //这个参数state即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  a {
    cursor: pointer;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px; //461
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画的样式
    //过渡动画开始状态(进入)
    .sort-enter{
        height: 0px;
    }
    //过渡动画结束状态(进入)
    .sort-enter-to{
        height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active{
        transition: all .5s linear
    }
  }
}
</style>