<template>
  <div class="com-page">
      <trend></trend>
  </div>
</template>

<script>
import trend from '@components/Trend'
export default {
    components:{
        trend:trend
    }

}
</script>

<style>
.com-page{
     width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>