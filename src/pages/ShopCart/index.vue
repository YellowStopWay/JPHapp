<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" 
        :checked="isAllChecked&&cartInfoList.length>0" 
        @change='updateAllCartChecked'/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart" >删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push({path:'/trade'})">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  methods: {
    //发送action，获取个人购物车数据。
    getData() {
      this.$store.dispatch("getShopCartList");
    },
    //派发action，通知服务器修改了个数
    handler: throttle(async function (type, num, cart) {
      //type区分触发类型
      //num是状态
      //id则是被修改商品的id
      switch (type) {
        case "add":
          num = 1;
          break;
        case "minus":
          if (cart.skuNum >= 2) num = -1;
          else num = 0;
          break;
        case "change":
          //如果用户输入非法，应该不改变原来的数值
          if (isNaN(num) || num < 1) {
            num = 0;
          } else {
            //正常情况下
            num = parseInt(num) - cart.skuNum;
          }
          break
      }
      try {
        // 代表修改成功
      await  this.$store.dispatch("addOrUpdateShopCar", {
          skuId: cart.skuId,
          skuNum: num,
        });
        //再一次获取服务器的最新数据进行展示
        this.getData();
      } catch (error) {}
    }, 500),
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //派发action，通知服务器购物车状态被修改
    async updateChecked(cart,$event) {
      //接口参数要求 isChecked要么为0，要么为1     
      try {
        let isChecked = $event.target.checked? '1':'0'
        await this.$store.dispatch("updateCheckedById", {skuId:cart.skuId,isChecked});
        //成功了需要再次获取服务器数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除全部选中的商品，这个回调没有参数可以传递
    async deleteAllCheckedCart() {
      //接口参数要求 isChecked要么为0，要么为1     
      try {
        
        await this.$store.dispatch("deleteAllCheckedCart");
        //成功了需要再次获取服务器数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改“全选”状态，要传参表明勾选状态给服务器做判断
    async updateAllCartChecked(event){
      try{
        let isChecked = event.target.checked?"1":"0"
        await this.$store.dispatch('updateAllCartIsChecked',isChecked)
        this.getData()
      }catch(error) {
        alert(error.message )
      }      
    }
  },
  mounted() {
    this.getData();
    
  },
  computed: {
    ...mapGetters(["ShopCarList"]),
    cartInfoList() {
      return this.ShopCarList.cartInfoList || [];
    },
    //计算总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if(item.isChecked)
        sum += item.skuNum * item.skuPrice;
      });
      return sum
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 30%;
      }
      .cart-th3 {
        width: 20%;
      }
      .cart-th4 {
        width: 12%;
      }
      .cart-th5 {
        width: 10%;
      }
      .cart-th6 {
        width: 13%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 30%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 20%;
        }

        .cart-list-con5 {
          width: 12%;
          :hover{
              color: skyblue;
            } 
          a{
            text-decoration: none;
            
          }
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>