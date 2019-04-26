<template>
  <div class="home">
  <div class="container">
  <div class="spinner" v-if="showLoading">
  <div class="rect1"></div>
  <div class="rect2"></div>
  <div class="rect3"></div>
  <div class="rect4"></div>
  <div class="rect5"></div>
</div>
<template v-else>
    <Banner :swiperSlides='sliders'></Banner>
    <div>
       <ul>
          <li v-for="item in homelist" :key="item.id">
            <img :src="item.img">
             <p>{{item.name}}</p>
             <p>{{item.price}}</p>
          </li>
       </ul>
    </div>
</template>
   </div>
  </div>
</template>

<script>
// @ is an alias to c
import HelloWorld from '@/components/HelloWorld.vue';
import Msg from '@/components/Msg';
import Banner from '../components/Banner'
import {getHomeAll} from '../api'   
export default {
  name: 'home',
  components:{    
     Banner
  },
  data(){
   return{
   sliders:[],
   homelist:[],
   showLoading:true
   }
  },
  created(){
    this.getAll()
  },
  methods:{
    async getAll(){
      let [{data:sliders},{data:homelist}] = await getHomeAll();
      this.sliders = sliders;
      this.homelist = homelist;
      this.showLoading = false;
    }
  }
}
</script>

<style>
   .spinner {
  margin: 100px auto;
  width: 300px;
  height: 160px;
  text-align: center;
  font-size: 100px;
}
 
.spinner > div {
  background-color: #67CF22;
  height: 100%;
  width: 50px;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
