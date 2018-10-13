<template>
    <div>
      <div v-for="(list,index) in siYuan"
      :key="index" class="aa" :class="{ red:changeRed == index}" @click="change(index)">
          {{list.a}}
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      siYuan: [
        {'a': '田'},
        {'a': '心'},
        {'a': '水'},
        {'a': '原'}
      ],
      changeRed: -1
    }
  },
  methods: {
    change (index) {
      this.changeRed = index
    }
  }

}
</script>

<style>
  .aa{
    background-color: red;
  }
</style>
