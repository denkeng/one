<template>
  <div class="about">
    <div class="container" @scroll="sLoadM" ref="eleScr">
    <div>
       <ul class="con-items">
          <router-link v-for="item in pagelist" :key="item.id" tag="li" :to="{name:'detail',params:{id:item.id}}">
            <img :src="item.img">
             <p>{{item.name}}</p>
             <p>{{item.price}}$</p>
          </router-link>
       </ul>
     </div>
       <div class="btnbox">
       <button @click="loadMore" class="btn">{{hasMore?'点击加载更多':'没有更多了'}}</button>
       </div>
    </div>
  </div>
</template>
<script>
  import {getPage} from '../api'
  export default{
      name:'about',
      data(){
        return{
           page:0,
           pagelist:[],
           hasMore:true
        }
      },
     created(){
     this.getList();
    },
    methods:{
      async getList(page){
       let{data:{hasMore,pagedata}}=await getPage(this.page);
       console.log(hasMore,pagedata);
       this.pagelist =this.pagelist.concat(pagedata);
       this.hasMore=hasMore;
    },
    sLoadM(){
       clearTimeout(this.timer)
       this.timer = setTimeout(()=>{
       let {clientHeight,scrollTop,scrollHeight} = this.$refs.eleScr;
       if(scrollTop+clientHeight+20>scrollHeight){
           this.loadMore();
       }
      },13)    
    },
    loadMore(){
         this.page++;
         if(!this.hasMore)return
         this.getList();
      }
    }
  }
</script>
<style lang="less" scoped>
    *{
      padding:0;
      margin:0;
    }
   .con-items{
       box-sizing:border-box;
       padding:0 20px;
       li{
          
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
       }
   }
   .btnbox{
      text-align:center;
   }
   .btn{
       display:inline-block;
       outline: none;
  appearance: none;
  width: 200px;
  height: 60px;
  line-height: 60px;
   }
</style>
