<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="clickPage(pageNo-1) ">上一页</button>
        <button v-show="startNumAndEndNum.start>=2" @click="clickPage(1)" :class="{active:pageNo==1}">1</button>
        <button v-show="startNumAndEndNum.start>2">···</button>

        <button v-for="(page,index) in startNumAndEndNum.end" 
                :key="index" 
                v-show="page>=startNumAndEndNum.start"
                @click="clickPage(page)"
                :class="{active:pageNo==page}"
        >{{page}}</button>

        <button v-show="startNumAndEndNum.end<(totalPages-1)">···</button>
        <button v-show="startNumAndEndNum.end<=(totalPages-1)" @click="clickPage(totalPages)" :class="{active:pageNo==(totalPages)}">{{ totalPages }}</button>
        <button :disabled="pageNo==startNumAndEndNum.end" @click="clickPage(pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "MyPagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        },
        startNumAndEndNum() {
            const { continues, pageNo, totalPages } = this
            let start = 0,
                end = 0;
            //总页数没有连续的页码多
            if (continues > totalPages) {
                start = 1;
                end = totalPages;
            } else {
                //起始数字                
                start = pageNo - parseInt(continues/2)                
                //结束数字
                end = pageNo + parseInt(continues/2)
                //纠正不正常现象
                if(start<1){
                    start = 1
                    end = continues
                }
                if(end>totalPages){
                    end = totalPages
                    start = totalPages - continues + 1
                }
            }
            return {start,end}
        },
    },
    methods:{
        clickPage(pageNo){
           this.$emit('getPageNo',pageNo)
       }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}

</style>