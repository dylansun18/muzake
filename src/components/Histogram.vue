<template>
    <div class="Histogram">
      <div class="bars">
        <div
          class="bar"
          v-for="(item, idx) in items"
          v-bind:key="idx"
          :style="{
            // 'height': `calc(100% - {item.votes/total})`
            height: (item.votecount / maxVotes) * 100 + '%'
          }"
        >
        <div class="bar-text">
        {{ item.typedOption }}
        </div>
        <div class="bar-number">
        {{ item.votecount }}
        </div>
        </div>
      </div>
    </div>
</template>

<script>
module.exports = {

    name: "Histogram",
    data() {
        return {
            maxVotes: 0
        }
    },

    props: ['items'],
    
    beforeMount() {

        for (let i = 0; i < this.items.length; i++) {


            if (this.maxVotes < this.items[i].votecount){

                this.maxVotes = this.items[i].votecount;
            }
        }


    }


}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.Histogram {
  background: red;
}
.bars {
  background: blue;
  display: flex;
  height: 250px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}
.bar {
  width: 0.6cm;
  background: magenta;
  margin: 0 15px;
  position: relative;
}

.bar-text{
  position: relative;
  top: 100%;
  transform: translateY(10%);
  font-weight: 700;
}

.bar-number{
  position: absolute;
  top: 0px;
  font-weight: 700;
}

</style>

