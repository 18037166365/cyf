<template>
  <div class="home">
    <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/">医院列表</el-menu-item>
      <!-- <el-menu-item index="/hospitalList">医院列表</el-menu-item> -->
      <el-menu-item index="/hospitalEdit">新建医院</el-menu-item>
      <el-menu-item index="/about" >About</el-menu-item>
    </el-menu>
    <router-view/>
    <!-- <Editor @updateContent="updateContentTodo" :editor-content="editorContent"/> -->


  </div>
</template>

<script>
import Editor from '@/components/editor'

export default {
  name: 'home',
  components: {
    Editor
  },
  data() {
    return {
      editorContent: 'hahaah',
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    updateContentTodo(e) {
      console.log('updateContent', e)
      // this.form.content = e;
    },
  },
}
</script>
