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
						<img class="pfp" height="45px" width="45px" src="https://i.ytimg.com/vi/dh9NrzHE9tQ/hqdefault.jpg"></img>
					</div>
				</div>
			</div>
      <div class="mainbody">

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
      title: '',
      add: ''
    }
  },
  methods: {
    addDecision () {

    },
  }
}
</script>

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

</style>
