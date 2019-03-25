<template>
  <div class="bod">
    <div class="main">
      <div class="headerbar">
				<div class="header1">
          <div class="symbolCircle">
					衝
          </div>
          <div class="title">
          Müzakere
          </div>
				</div>
				<div class="header2">
					<div class="h2t">Dirty Dan</div>
					<div class="h2p">
						<img class="pfp" height="45px" width="45px" src="https://i.ytimg.com/vi/dh9NrzHE9tQ/hqdefault.jpg">
					</div>
				</div>
			</div>
      <div class="desc">Müzakere - Start conversations about important decisions and share your points in an organized matter.</div>
      <div class="mainbody">
        <div class="subbody1">
    	  	<div class="popt">Popular Discussions</div>
    	  	<div class="popl">
            <ul>
              <li class="listitem" v-for="(decision, idx) in decisions" v-bind:key="idx">
                <router-link :to="decision.title">
                  {{decision.title}}?
                </router-link>
              </li>
              <router-link to="/What javascript framework should we use for our project?!"> <li class="listitem">What javascript framework should we use for our project?!</li> </router-link>
              <router-link to="/what css framework should we use for our project?"><li class="listitem">What css framework should we use for our project?!</li></router-link>
            </ul>
          </div>
        </div>
        <div class="subbody2">
          <div class="searcht">Search for discussion:</div>

          <div class="searchb">
            <input class="search-bar" type = "text" v-model = "search" placeholder= "search blogs"/>
          </div>
          <div class="popl2">
            <ul>
              <li v-for="(blog,idx) in filterBlogs" v-bind:key = "idx" class="listitem"> {{blog.title}} </li>
            </ul>
          </div>
          <div class="searcht above">
            Start a discussion:
          </div>
          <div class="searchb">
            <div class="sbw">
              <input v-model="add" class="search-bar" type="text">
            </div>
            <div class="submitw">
              <button v-on:click="addDecision()" type="button" class="submit"><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div class="searcht">
            <div class="nick">Log in</div>
            <div class="nick">Register</div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

import { db } from '../main'

export default {
  name: 'Home',
  data () {
    return {
      decisions: [],
      blogs: [],
      title: '',
      add: '',
      remove:'',
      search: ''
    }
  },
  beforeMount()
  {
    this.blogs.push({title : "What javascript framework should we use for our project?!"});
    this.blogs.push({title : "What css framework should we use for our project?!"});
    this.blogs.push({title : "How tall is Sriram?"});
    this.blogs.push({title : "Where should I buy a house?"});

  },
  computed: {
    filterBlogs:function()
    {
      return this.blogs.filter((blog)=>{return blog.title.toLowerCase().match(this.search);});
    }
  },

  firestore () {
    return {
      decisions: db.collection('decisions')
    }
  },
  methods: {
    addDecision () {
      var title = this.add.replace(/\?/g,"");
      const createdAt = new Date();
      db.collection('decisions').doc(title).set({ title, createdAt });
      // Clear values
      this.add = '';
      console.log(title);
    },
    removeDecision(){
      var title = this.remove;
      db.collection('decisions').doc(title).delete().then(function(){
        console.log("Document successfully deleted");
      });
    }
    // deleteLocation (id) {
    //   db.collection('decisions').doc(id).delete()
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bod {
  font-family: sans-serif;
  background-color: black;
  color: #D7BF83;
  font-family: 'Catamaran', sans-serif;
}

.main {
  width:700px;
  margin:0 auto;
}

.headerbar {
  width: 100%;
  height: 56px;
  font-size:1rem;
  margin-bottom:40px;
  padding-top:10px;
}

.header1 {
  width: 12rem;
  height: 100%;
  float:left;
  padding-top:16px;
  box-sizing:border-box;
}

.symbolCircle {
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  color: black;
  background-color: #D7BF83;
  text-align: center;
  float:left;
  margin-right: 0.75rem;
  padding-top:3px;
  padding-left:1px;
  font-size: 1.5rem;
  box-sizing:border-box;
}

.header2 {
  height: 100%;
  float:right;
  padding-top:16px;
  box-sizing:border-box;
}

.h2t{
  padding-top:0.5rem;
  height:100%;
  float:left;
  font-size:18px;
  margin-right:10px;
}

.h2p{
  width:45px;
  height:45px;
  height:100%;
  float:left;
}

.pfp{
  border-radius:50%;
  height:45px;
  width:45px;
}

.desc{
  padding-top:3px;
  margin-bottom:19px;
  font-size:17px;
}

.title {
  font-family: 'Cormorant', serif;
  font-weight:400;
  font-size:28px;
  margin-top:3px;
  color:#D7BF83;
}

.mainbody{
  display:flex;
}

.subbody1{
  flex:1;
  height:400px;
}

.subbody2{
  flex:1;
  height:400px;
  padding:5px;
}

.popt {
  width: 100%;
  font-size: 32px;
  text-align: center;
  line-height:45px;
  margin-bottom:15px;
  font-family: 'Roboto Slab', sans-serif;
}

.popl{
  height:500px;
  margin:0 auto;
  font-size:17px;
  padding-bottom:15px;
}

.popl2{
  margin:0px auto;
  font-size:15px;
}

.listitem{
  padding:5px;
}

.searcht{
  width:80%;
  margin:0 auto;
  font-size:20px;
  font-family: 'Roboto Slab', sans-serif;
}

.nick{
  margin-top:6px;
}

.sbw{
  float:left;
  z-index:5;
  position:relative;
}

.searchb{
  margin:10px auto;
  width:280px;
  height:32px;
}

.submit{
  border:none;
  margin-left:7px;
  height:32px;
  width:30px;
  color: black;
  background-color:inherit;
  font-size:17px;
  border-radius:6px;
}

.submitw{
  float:left;
  background-color:#D7BF83;
  height:32px;
  width:44px;
  margin-left:-10px;
  padding-left:6px;
  z-index:3;
  position:relative;
  border-radius:6px;
}

.above{
  margin-top:16px;
}

.up{
  top:-6px;
}

.search-bar{
  width:220px;
  height:32px;
  padding-left:15px;
  border-radius:6px;
  border:none;
  color:#0F0D0D;
  font-weight:500;
  background-color:#cbcbcb;
}

a{
  text-decoration: none;
}

a:visited{
  text-decoration: underline;
  color:#D7BF83;
}

</style>
