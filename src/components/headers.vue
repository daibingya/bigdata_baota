<template>
  <div class="headers">
  	 <span class="text_title">宝塔区"智慧党建"大数据系统</span>
  	 <ul class="ul_box">
	  	 	<li v-for="(val,key) in myData" :class="{active:key==indexs}" @click="change(key)">
	  	 		<router-link :to="{name:`${val.url}`,params:{id:a}}">{{val.name}}</router-link>
	  	 	</li>
  	 </ul>
  </div>
</template>

<script>
export default {
  name: 'Headers',
  data(){
  	return{
  		a:"小微是笨蛋",
  		indexs:0,
  		myData:[
  		 {
  		 	"name":"党建大数据",
  		  "url":"dangjian"
  		 },{
  		 	"name":"组织数据",
  		  "url":"zuzhi"
  		 },{
  		 	"name":"党员数据",
  		  "url":"dangyuan"
  		 },{
  		 	"name":"党务数据",
  		 	"url":"dangwu"
  		 },{
  		 	"name":"互动数据",
  		 	"url":"hudong"
  		 },{
  		 	"name":"学习数据",
  		 	"url":"xuexi"
  		 },{
  		 	"name":"服务信息",
  		 	"url":"fuwu"
  		 },{
  		 	"name":"项目统计",
  		 	"url":"xiangmu"
  		 },{
  		 	"name":"特色数据",
  		 	"url":"tese"
  		 },{
  		 	"name":"标准化党组织数据",
  		 	"url":"biaozhun"
  		 },{
  		 	"name":"评选数据",
  		 	"url":"pingxuan"
  		 	}
  		]
  	}
  },
 
  methods:{
  	change(x){
				this.indexs=x;
				window.sessionStorage.setItem("index",x);
  	},
  	pan(){
  		if(window.sessionStorage.getItem("index")){
  			 this.indexs=window.sessionStorage.getItem("index");
  		}else{
  			console.log("start");
  		}
  	}
  },
  created:function(){
  	function getCookie(c_name){
  		var c_start,c_end;
			//判断document.cookie对象里面是否存有cookie
			if (document.cookie.length>0){
			  c_start=document.cookie.indexOf(c_name + "=")
				//如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
			  if (c_start!=-1){ 
				    c_start=c_start + c_name.length+1 
				    c_end=document.cookie.indexOf(";",c_start)
				    if (c_end==-1) c_end=document.cookie.length
				    return unescape(document.cookie.substring(c_start,c_end))
			    } 
			  }
				return ""
			}
			if(getCookie('Verification')!='true'){
//					document.querySelector("html").style.display="block";
					window.location.href="http://113.137.27.18:9000/BaoTaBigData/index.action";
			}else{
					//通过验证后html才会打开;
					document.querySelector("html").style.display="block";
			};
  	 this.pan();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a{
		color:white;
		text-decoration:none;
		display:inline-block;
	}
  .headers{ 
  	width:100%;
  	height:68px;
  	background-color:#012760;
  	padding-left:32px;
  	box-sizing:border-box;
  	vertical-align:top;
  	font-size:0;
  }
  .headers .text_title{
  	font-size:26px;
  	display:inline-block;
  	height:100%;
  	line-height:68px;
  	color:white;
  	display:inline-block;
  	letter-spacing:2px;
  	vertical-align:top;
  	font-weight:bold;
  	text-shadow:0 0 15px blue;
  }
  .headers .ul_box {
  	height:100%;
  	font-size:0;
  	display:inline-block;
  	margin-left:38px
  }
  .headers .ul_box li{
  	height:100%;
  	font-size:18px;
  	text-align:center;
  	line-height:68px;
  	display:inline-block;
  	vertical-align:top;
  	color:white;
  }
  .headers .ul_box li a{
  	width:100%;
  	height:100%;
  	padding:0 15px;
  	box-sizing:border-box;
  }
  .active{
  	background:url("../../static/images/03.png") no-repeat center center /100% 100%;
  }
</style>
