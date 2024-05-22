<template>
  <div class="edit-password">
    <div class="form-group">
      <label>{{ $t('common.updateNickName') }}</label>
      <el-input v-model="form.username" :placeholder="$t('application.pleaseEnter')"></el-input>
    </div>
    <div class="text-center">
      <button type="button" class="btn  btn-primary mr-4" @click="submit">{{ $t('common.confirmBtn') }}</button>
      <button type="button" class="btn btn-secondary" @click="$emit('close')">{{ $t('common.cancelBtn') }}</button>
    </div>
  </div>
</template>

<script>
import Setting from '../../api/setting'
export default {
  props: ['detail'],
  data() {
    return {
      form: {
        avatar: '',
        username: ''
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      console.log(this.detail.username)
      this.form.username = this.detail.username
      this.form.avatar = this.detail.avatar
    },
    submit() {
      Setting.updateUserInfo(this.form).then(() => {
        this.$message.success('修改成功')
        this.$emit('change')
        this.$emit('close')
      })
    }
  }
}
</script>

<style></style>
