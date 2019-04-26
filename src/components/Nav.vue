<template>
    <div id="nav">
      <router-link to="/" exact>
       <i class="iconfont icon-shouye-"></i>
      <span>首页</span>
      </router-link>
      <router-link to="/about">
        <i class="iconfont icon-Group-"></i>
        <span>列表</span>
      </router-link>
       <router-link to="/pp">
       <i class="iconfont icon-gouwuche"></i>
       <span>购物车</span>
       </router-link>
       <router-link to="/my">
       <i class="iconfont icon-user"></i>
       <span>我的</span>
       </router-link>
    </div>
</template>


 <style lang="less" scoped>
 #nav{
      display:flex;
      justify-content:center;
      align-items:center;
      position:fixed;
      width:100%;
      height:56px;
      border-top:1px solid #e3e3e3;
      bottom:0;
      a{
       flex:1;
       text-align:center;
       display: flex;
       flex-direction: column;
       text-decoration:none;
       &.router-link-active{
         color:red;
       }
       i{
         font-size:26px;
       }
     }
    }
</style>

