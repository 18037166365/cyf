<template>
  <div>
    <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form> -->
    <!-- <Editor @updateContent="updateContentTodo" :editor-content="editorContent"/> -->
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script>
import Editor from '@/components/editor'

console.log('Editor',Editor)
  export default {
    components: {
      Editor
    },
    data() {
      return {
        editorContent: 'hahaah',
        form: {
          title: '',
          content: '',
          from: '爱泰健康'
        }
      }
    },
    methods: {
      updateContentTodo(e) {
        console.log('updateContent', e)
        this.form.content = e;
      },
      save() {
        console.log('save')
      }
    },

  }
</script>

<style scoped>

</style>




<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
