<template>
  <div>
    <img :src="single.img">
    <p>{{single.name}}</p>
    <p>{{single.price}}</p>
  </div>
</template>

<script>
   import {getDetail} from '../api'
    export default{
       name:'datail',
       data(){
           return{
              single:{}
           }
       },
       created(){
           this.Detial()
       },
       computed:{
          deId(){
             return this.$route.params.id;
          }
       },
       methods:{
           async Detial(){
               let {data} = await getDetail(this.deId);
               this.single = data;
               if(JSON.stringify(this.single)=='{}'){
                   this.$router.push('/list')
               }
           }
       }
    }
</script>