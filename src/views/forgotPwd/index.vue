<template>
  <div class="container">
    <div class="vh-100 d-flex justify-content-center">
      <div class="form-access my-auto bg-panel">
        <form class="chk-body">
          <template v-if="step == 1">
            <div class="text-center h3 mb-4">
              <span>{{ $t('login.find-password') }}</span>
            </div>

            <!-- <span class="mt-4"></span> -->
            <div class="form-group">
              <input type="text" v-model="user.account" class="form-control" :placeholder="$t('login.enter-account')" />
            </div>
            <button type="submit" class="btn btn-primary rounded-pill" @click.prevent="step1">
              {{ $t('login.submit') }}
            </button>
          </template>
          <template v-else-if="step == 2">
            <div class="text-center h3 mb-4">
              <span>{{ $t('login.verCode') }}</span>
            </div>

            <div class="input-group mb-3">
              <el-input
                v-model="user.password"
                type="password"
                show-password
                required
                :data-has="$t('login.enterLengthPassword', { num1: 8, num2: 15 })"
                pattern1="\d{6}"
                pattern="(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,15}$"
                :data-message="$t('login.hasNumEn', { num: '8-15' })"
                :placeholder="$t('login.new-password')"
              ></el-input>
            </div>

            <div class="input-group mb-3">
              <el-input
                v-model="user.password_confirmation"
                type="password"
                data-type="repassword"
                show-password
                required
                :data-has="$t('login.enterLengthPassword', { num1: 8, num2: 15 })"
                pattern1="\d{6}"
                pattern="(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,15}$"
                :data-message="$t('login.hasNumEn', { num: '8-15' })"
                :placeholder="$t('login.confirm-password')"
              ></el-input>
            </div>

            <div class="input-group mb-3" v-if="user.google_status">
              <input
                type="text"
                v-model="codes.google_code"
                class="form-control"
                required
                pattern="\d{6}"
                data-message="code needs 6 number"
                :placeholder="$t('login.google-code')"
              />
            </div>

            <div class="input-group mb-3" v-if="user.email_status">
              <input
                type="text"
                v-model="codes.email_code"
                required
                class="form-control"
                pattern="\d{6}"
                data-message="code needs 6 number"
                :placeholder="$t('login.email-code')"
              />
              <div class="input-group-append">
                <get-code class="btn get-code btn-outline-primary" :data="{ email: user.email }" :type="7" />
              </div>
            </div>

            <!-- <div class="input-group mb-3" v-if="user.phone_status">
                        <input type="text" required v-model="codes.sms_code" class="form-control" pattern="\d{6}" data-message="code needs 6 number" :placeholder="$t('login.sms-code')" />
                        <div class="input-group-append">
                            <get-code class="btn get-code btn-outline-primary" :data="{country_code:user.country_code, phone:user.phone}" :type="6" />
                        </div>
                    </div> -->
            <button type="submit" class="btn btn-primary rounded-pill" @click.prevent="step2">
              {{ $t('login.submit') }}
            </button>
          </template>
        </form>

        <h2>
          {{ $t('login.ry-password') }}?
          <router-link to="/sign-in">{{ $t('login.toLogin') }}</router-link>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import Member from '@/api/member'

export default {
  data() {
    return {
      step: 1,
      user: {
        account: '',
        password: '',
        password_confirmation: ''
      },
      codes: {
        google_code: '',
        email_code: '',
        sms_code: ''
      }
    }
  },

  methods: {
    step1() {
      Member.forgetPasswordAttempt({
        account: this.user.account
      })
        .then((data) => {
          // 将用户信息 写入user对象中
          Object.assign(this.user, data)
          // 进入第二步验证
          this.step = 2
        })
        .catch((err) => {
          // this.$message({});
        })
    },

    step2() {
      if (utils.validate('.chk-body')) {
        Member.forgetPwdSumit(Object.assign(this.user, this.codes))
          .then((dta) => {
            this.$message({
              type: 'success',
              message: this.$t('login.reset'),
              duration: 2000,
              onClose: () => {
                // 注册完成 进入登录页
                this.$router.push('/sign-in')
              }
            })
          })
          .catch((err) => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner,
.form-control {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  height: 45px !important;
}
.get-code {
  padding-top: 11px !important;
  padding-bottom: 11px !important;
}
</style>
