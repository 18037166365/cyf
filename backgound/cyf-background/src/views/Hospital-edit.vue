<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="form.from"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <Editor @updateContent="updateContentTodo" :editor-content="form.content"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/editor'
import { addHospital } from '../api/index.js'

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
      save() {
        console.log('save')
      },
      onSubmit() {
        console.log('save')
        console.log(this.form)
        addHospital({...this.form}).then(res => {
          console.log(res)
        })
      },
      updateContentTodo(e) {
        console.log('updateContent', e)
        this.form.content = e;
      },
    },
  }
</script>

<style scoped>

</style>
