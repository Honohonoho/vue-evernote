<template>
    <div id="note-detail">
        <h1>{{msg}}</h1>
        <p>当前为笔记本{{$route.params.note_id}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "笔记详情页"
        };
    }
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>