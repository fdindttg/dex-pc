<template>
  <div class="setting-page">
    <div class="container">
      <div class="w-100 d-flex justify-content-between align-items-center mb-3 mt-4">
        <div class="h3">{{ $t('common.userInformation') }}</div>
      </div>
      <div class="row">
        <!-- 登录密码 -->
        <div class="col-md-4 d-flex">
          <div style="position: relative;height: 150px;" class="panel-box bg-panel shadow-sm mb-4 w-100 d-flex flex-column">
            <div class="heading">{{ $t('common.avatar') }}:
              <img style="width: 80px;height: 80px;border-radius: 50%;margin-left: 10px;" :src="detail.avatar" mode="aspectFit|aspectFill|widthFix" lazy-load="false" />
              </div>
              
            <div style="position: absolute;bottom: 0;" class="tab-content flex-fill d-flex flex-column justify-content-between align-items-start">
              <button class="btn btn-primary btn-sm" @click="avatarShow = true">
                {{ $t('common.updateAvatar') }}
              </button>
            </div>
          </div>
        </div>
        <!-- 个人信息 -->
        <div class="col-md-4 d-flex">
                    <div class="panel-box bg-panel shadow-sm mb-4 w-100 d-flex flex-column justify-content-between">
                        <div class="heading">{{$t('common.nickName')}}:  </div>
                        <div style="flex: 1;" class="ml-4">{{ detail.username }}</div>
                        <div class="tab-content">
                                <button  class="btn btn-primary btn-sm" @click="userInfoShow=true">
                                    <template>{{$t('common.updateNickName')}}</template>
                                </button>
                        </div>
                    </div>
                </div>
      </div>
    </div>
    <!-- 登录密码 -->
    <v-box v-model="avatarShow" :title="$t('common.updateAvatar')">
      <changeAvatar @close="cancel" @change="getUserInfo" :detail="detail" id="loginPwd" />
    </v-box>
    <v-box v-model="userInfoShow" :title="$t('common.updateNickName')">
      <change-nickname @close="cancel" @change="getUserInfo" :detail="detail" id="loginPwd" />
    </v-box>
    <!-- 校验开关 -->
  </div>
</template>

<script>

import changeAvatar from './change-avatar'
import changeNickname from './change-nickname'
import Setting from '@/api/setting'
import Member from '@/api/member'
import UploadImg from '@/components/UploadImg.vue'
export default {
  components: {
    changeNickname,
    changeAvatar,
    UploadImg
  },
  data() {
    return {
      detail: {},
      userInfoShow: false,
      avatarShow: false,
      // 变更校验开关的对象
      changeVerificationObj: {
        status: '',
        type: '',
        name: ''
      }
    }
  },
  filters: {
    //显示（手机号|邮箱号）过滤
    userFilter(val) {
      return val.replace(/(^\w{3})\w*(@|\w{3}$)/g, '$1***$2')
    }
  },
  methods: {
    cancel() {
     this.avatarShow = false
     this.userInfoShow = false
    },
    // 获取用户信息
    getUserInfo() {
      Setting.getUserInfo()
        .then((res) => {
          this.detail = res
          console.log(112,res);
        })
        .catch((err) => {})
    },
    // 校验开关
    verificationChange(type, status) {
      this.changeVerificationObj.status = status
      this.changeVerificationObj.type = type
      this.$nextTick(() => {
        if (type == 1) {
          this.detail.phone_status = !status
          this.changeVerificationObj.name = this.$t('setting.smsVer')
        } else if (type == 2) {
          this.detail.email_status = !status
          this.changeVerificationObj.name = this.$t('setting.emailVer')
        } else if (type == 3) {
          this.detail.google_status = !status
          this.changeVerificationObj.name = 'Google ' + this.$t('setting.ver')
        }
      })
      this.verification = true
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style></style>
