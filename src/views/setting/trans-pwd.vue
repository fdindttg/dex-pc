<template>
  <div class="edit-payword">
    <div class="form-group">
      <label>{{ $t('setting.newPassword') }}</label>
      <el-input
        type="password"
        :name="$t('setting.newPassword')"
        required
        show-password
        pattern="\d{6}"
        :data-message="$t('setting.passwordIs', { num: 6 })"
        :data-has="$t('setting.enterNewPassword')"
        v-model="password"
        :placeholder="$t('setting.enterNewPassword')"
      />
    </div>
    <div class="form-group">
      <label>{{ $t('setting.confirmPassword') }}</label>
      <el-input
        type="password"
        show-password
        required
        v-model="password_confirmation"
        :placeholder="$t('setting.pleaseConfirmPassword')"
      />
    </div>
    <!-- <div class="form-group" v-if="detail.phone_status==1">
      <label>{{$t('setting.smsVer')}}</label>
      <div class="input-group mb-3">
        <input type="number" required v-model="sms_code" class="form-control" :placeholder="$t('setting.enterCode')" />
        <div class="input-group-append">
          <get-code class="btn btn-outline-primary" :data="{type:1}" :type="1" />
        </div>
      </div>
    </div> -->
    <div class="form-group" v-if="detail.email_status == 1">
      <label>{{ $t('setting.emailVer') }}</label>
      <div class="input-group mb-3">
        <input
          type="number"
          v-model="email_code"
          required
          class="form-control"
          :placeholder="$t('setting.enterEmailVer')"
        />
        <div class="input-group-append">
          <get-code class="btn btn-outline-primary" :data="{ type: 2 }" :type="1" />
        </div>
      </div>
    </div>
    <div class="form-group" v-if="detail.google_status == 1">
      <label>Google {{ $t('setting.ver') }}</label>
      <div class="input-group mb-3">
        <input
          type="number"
          v-model="google_code"
          class="form-control"
          required
          :placeholder="$t('setting.enterNameCode', { name: 'Google' })"
        />
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn w-25 btn-secondary" @click="$emit('close')">{{ $t('common.cancelBtn') }}</button>
      <button type="button" class="btn w-25 btn-primary" @click="setPassword">{{ $t('common.confirmBtn') }}</button>
    </div>
  </div>
</template>

<script>
import Setting from '../../api/setting'
export default {
  props: ['detail'],
  data() {
    return {
      password: '',
      password_confirmation: '',
      sms_code: '',
      email_code: '',
      google_code: ''
    }
  },
  methods: {
    setPassword() {
      let data = {
        password: this.password,
        password_confirmation: this.password_confirmation,
        sms_code: this.sms_code,
        email_code: this.email_code,
        google_code: this.google_code
      }
      if (utils.validate('.edit-payword')) {
        Setting.setOrResetPaypwd(data).then((res) => {
          this.$message.success(this.$t('setting.operationSuccess'))
          this.$emit('close')
          this.$emit('change')
        })
      }
    }
  },
  created() {}
}
</script>

<style></style>
