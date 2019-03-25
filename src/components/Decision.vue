<template>

  <div class="bod">
    <div class="main">
      <div class="headerbar">
        <router-link to="/">
          <div class="header1">
            <div class="symbolCircle">
              衝
            </div>
            <div class="title">
              Müzakere
            </div>
          </div>
        </router-link>
        <div class="header2">
          <div class="h2t">Dirty Dan</div>
          <div class="h2p">
            <img class="pfp" height="45px" width="45px" src="https://i.ytimg.com/vi/dh9NrzHE9tQ/hqdefault.jpg">
          </div>
          <!-- <router-link to="/auth">Sign in</router-link> -->
        </div>
      </div>
      <div class="thesis">{{ $route.params.title.concat("?") }}</div>

      <div class="option" v-for="(option, idx) in options" v-bind:key="idx">
        <div class="optionTitle"><b>{{ option.typedOption }}</b></div>

        <div class="mainbody">
          <div class="subbody1">
            <div class="for">For</div>
            <div class="pointblock" v-for="(pro, idx) in option.pros" v-bind:key="idx">
              {{pro}}
            </div>

						<form class="add">
							<input class="search-bar" v-model="addP[idx]" placeholder="">
							<button class="button2" v-on:click="addPro(option, idx)" type="submit">Add pro</button>
						</form>

          </div>


          <div class="subbody2">
            <div class="for">Against</div>
            <div class="pointblock" v-for="(con, idx) in option.cons" v-bind:key="idx">
							{{con}}
						</div>
            <form>
							<input class="search-bar" v-model="addC[idx]" placeholder="">
							<button class="button2" v-on:click="addCon(option, idx)" type="submit">Add con</button>
						</form>

          </div>
        </div>
      </div>


      <form class="add" style="margin-top:10px;" @submit="addOption(typedOption)">
        <input class="search-bar" v-model="typedOption" placeholder="">
        <button class="button3" type="submit">Add new option</button>
      </form>

      <hr>
      <div class="poll">
        Vote!
      </div>
      <div class="form">

        <div class="vote-form" v-if="!hasVoted">
          <form action="#">

            <div class="polloption" v-for="(option, idx) in options" v-bind:key="idx">
              <input type="checkbox" @click="handlecheck(idx)" id=idx name="check">
              <label for="check">{{ option.typedOption }}</label>
            </div>

            <div class="vsub">
              <button type="button" class="button" v-on:click="submitvote()">Vote</button>
            </div>


          </form>

        </div>

      </div>
      <div class="vote-results" v-if="hasVoted">
        <div style="font-size:1.3rem; margin-left:1.1rem;" v-for="(option, idx) in options" v-bind:key="idx">
          <p>{{ option.typedOption }}: {{ option.votecount }} </p>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
  import * as firebase from 'firebase';

  import {
    db
  } from '../main'

  export default {
    name: 'Decision',
    components: {
    },
    data() {
      return {
        options: [],
        typedOption: '',
        votestatus: [],
        hasVoted: false,
        inputs:[],
        addP:[],
        addC:[],
      }
    },
    firestore() {

      // console.log(this.$route.params.title)

      const ref = db.collection('decisions').doc();

      console.log(ref);
      return {
        // db.collection('decisions').get()
        // options: db.collection('decisions').doc( this.$route.params.title ).collection('options')
        options: db.collection('decisions').doc(this.$route.params.title).collection('options')
      }
    },
    methods: {
      addOption(typedOption) {
        const createdAt = new Date()
        db.collection('decisions').doc(this.$route.params.title).collection('options').doc(typedOption).set({
          typedOption,
          createdAt,
          votecount: 0,
          pros:[],
          cons:[]
        })
        // Clear values
        this.typedOption = ''
			},
			dylan(){
				console.log(this.options);
      },
      addPro(lul, idx){
        const ref = db.collection('decisions').doc(this.$route.params.title).collection('options').doc(lul.id);

        var newtext = this.addP[idx];
        console.log(newtext);
        ref.get().then(function(doc) {
          if (doc.exists) {
            var newpros = doc.data().pros;
            newpros.push(newtext);
            console.log(newpros);
            console.log(ref);
            ref.set({
              pros:newpros,
              typedOption:doc.data().typedOption,
              votecount: doc.data().votecount,
              cons:doc.data().cons,
            })
          }
        })
        // ref.update({
        //   pros: firebase.firestore.FieldValue.arrayUnion(newtext)
        // })

      },
      addCon(lul, idx){
        const ref = db.collection('decisions').doc(this.$route.params.title).collection('options').doc(lul.id);

        var newtext = this.addC[idx];
        console.log(newtext);
        ref.get().then(function(doc) {
          if (doc.exists) {
            var newcons = doc.data().cons;
            newcons.push(newtext);
            console.log(newcons);
            console.log(ref);
            ref.set({
              pros:doc.data().pros,
              typedOption:doc.data().typedOption,
              votecount: doc.data().votecount,
              cons:newcons,
            })
          }
        })
        // ref.update({
        //   pros: firebase.firestore.FieldValue.arrayUnion(newtext)
        // })

      },

      async submitvote() {
        for (var i = 0; i < this.options.length; i++) {
          if (this.votestatus.indexOf(i) > -1) {
            var ref = db.collection('decisions').doc(this.$route.params.title).collection('options').doc(this.options[i].typedOption);
            await db.runTransaction(function (transaction) {
              return transaction.get(ref).then(function (doc) {
                var newVotecount = doc.data().votecount + 1;
                transaction.update(ref, {
                  votecount: newVotecount
                });
              });
            });
          }
        }
        this.hasVoted = true;
      },

      handlecheck(id) {
        if (this.votestatus.indexOf(id) < 0) {
          this.votestatus.push(id);
        } else {
          this.votestatus.splice(this.votestatus.indexOf(id), 1);
        }

        console.log(this.votestatus);
      }
      // deleteLocation (id) {
      //   db.collection('decisions').doc(id).delete()
      // }
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
  width:800px;
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

.thesis {
  width: 100%;
  font-size: 32px;
  text-align: left;
  line-height:45px;
  margin-bottom:35px;
  font-family: 'Roboto Slab', sans-serif;
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

.mainbody {
  width: 100%;
  background-color: black;
  color: #D7BF83;
  display:flex;
}

.subbody1{
  flex:1;
  margin-bottom:14px;
}

.subbody2{
  flex:1;
}

.mainbody1 {
  width: 100%;
  height: 20rem;
  background-color: black;
  color: #D7BF83;
  display:flex;
}

.optionTitle {
  width: 100%;
  background-color: black;
  font-size: 25px;
}

.for{
  padding-top:5px;
  font-weight:bold;
  margin-top:2px;
}

.pointblock{
  width:85%;
  border-radius:5px;
  background-color:#D7BF83;
  line-height:22px;
  margin-top:5px;
  margin-left:2px;
  padding-left:12px;
  padding-top:8px;
  padding-right:12px;
  padding-bottom:10px;
  margin-bottom:10px;
  color:black;
}

.add{
  margin-left:3px;
}

.button
{
  background-color: #B92E48;
  text-align : center;
  border : none;
  color : white;
  width: 118px;
  height: 34px;
  font-size : 16px;
  display: block;
  padding-bottom:3px;
  border-radius:5px;
  box-sizing:border-box;
}

.button2{
  background-color: #B92E48;
  text-align : center;
  border : none;
  color : white;
  width: 78px;
  height: 34px;
  font-size : 16px;
  padding-bottom:3px;
  border-radius:5px;
  box-sizing:border-box;
}

.button3{
  background-color: #B92E48;
  text-align : center;
  border : none;
  color : white;
  width: 150px;
  height: 34px;
  font-size : 16px;
  padding-bottom:3px;
  border-radius:5px;
  box-sizing:border-box;
}

.search-bar{
  width:220px;
  height:34px;
  padding-left:15px;
  border-radius:6px;
  border:none;
  color:#0F0D0D;
  font-weight:500;
  background-color:#cbcbcb;
}

.polloption{
  font-size:22px;
}

.center{
  margin:auto;
}

.under{
  margin-bottom:30px;
}

.form{
  margin-left:26px;
}

.poll {
  margin-left:20px;
  margin-top:15px;
  font-size: 42px;
  padding-top: 10px;
  font-family: 'Roboto Slab', sans-serif;
}

.vsub{
  margin-top:10px;
}

.es{
  height:70px;
}

</style>
