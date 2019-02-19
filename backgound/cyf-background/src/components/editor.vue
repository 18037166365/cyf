<template>
    <quill-editor
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
    @change="onEditorChange($event)">
  </quill-editor>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor';

    export default{
      props: {
        editorContent: {
          type: String,
          default: ''
        },
      },
      data(){
          return {
            content: '',
            editorOption:{}
          }
      },
      methods:{
          onEditorBlur(){//失去焦点事件
            console.log('$emit')
            // this.$emit('updateContent', this.content)
          },
          onEditorFocus(){//获得焦点事件
          },
          onEditorChange(){//内容改变事件
            this.$emit('updateContent', this.content)
          }
      },
      mounted(){
        this.content = this.editorContent
      }
    }
</script>
