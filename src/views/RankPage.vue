<template>
  <div class="com-page">
    <rank></rank>
  </div>
</template>

<script>
import rank from "@components/Rank";
export default {
  components: {
    rank: rank,
  },
};
</script>

<style>
.com-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>