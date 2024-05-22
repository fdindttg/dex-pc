<template>
  <div class="d-flex align-items-center flex-column">
    <button
      v-if="type == 'file'"
      class="btn btn-light btn-sm change-file-button"
    >
      {{ (file && file.name) || "选择文件" }}
      <input
        type="file"
        class="file"
        :required="required"
        :placeholder="placeholder"
        ref="file"
        @change="change"
      />
      <input ref="imgValue" v-model="value" />
    </button>
    <div v-else class="el-upload-dragger mb-3 flex-shrink-0">
      <label>
        <input
          type="file"
          class="file"
          :required="required"
          :placeholder="placeholder"
          ref="file"
          @change="change"
        />
        <img class="img" v-if="uploadImg" :src="imgFilter(uploadImg)" alt />
        <template v-else>
          <i class="el-icon-upload"></i>
          <slot name="text"></slot>
        </template>
      </label>
    </div>
    <div v-if="file">
      <!-- <p>{{ file.name }}</p> -->
      <button class="btn btn-primary mr-4" @click="upload">
        {{ $t("common.upload") }}
      </button>
      <button class="btn btn-danger" @click="del">
        {{ $t("common.delete") }}
      </button>
    </div>
  </div>
</template>
<script>
import Member from "@/api/member";
import Setting from "@/api/setting";
export default {
  props: ["value", "required", "placeholder", "type", "allowSize", "detail"],
  data() {
    return {
      file: undefined,
      uploadImg: "",
      isLoad: false,
      form: {
        avatar: "",
        username: "",
      },
    };
  },
  watch: {
    value(n) {
      this.uploadImg = n;
    },
  },
  created() {},
  methods: {
    del() {
      this.uploadImg = "";
      this.file = undefined;
    },
    imgFilter(img) {
      if (img.indexOf("http") != -1 || img.indexOf("data:") != -1) {
        return img;
      } else {
        return this.Globals.Server.Path.BASE + "/storage/" + img;
      }
    },
    change(ev) {
      let file = this.$refs.file.files[0];
      let ele = this.$refs.file;

      let option = {
        ele,
        allowSize: this.allowSize || 5, // 单位为M
        allowType: ["image/png", "image/jpg", "image/jpeg", "image/pdf"],
      };
      utils
        .upload(option)
        .then((result) => {
          if (result.isIMG) {
            // 在预览区查看
            this.$nextTick(() => {
              this.uploadImg = result.data;
              this.file = file;
              // this.upload()
            });
          }
        })
        .catch((err) => {
          this.$refs.file.value = "";
          if (err.message == 102) {
            this.$message.error(`文件尺寸过大，不得超过${option.allowSize}M`);
          } else if (err.message == 101) {
            this.$message.error(`文件类型错误`);
          }
        });
    },
    async upload() {
      let data = new FormData();
      data.append("image", this.file);
      await Member.uploadImage(data).then((res) => {
        this.form.username = this.detail.username;
        this.form.avatar = res.url;
      });
      await Setting.updateUserInfo(this.form)
        this.$message.success("修改成功");
        this.$emit("change");
        this.$emit("close");
       await window.location.reload()
        
        
   
    },
  },
};
</script>
<style lang="scss" scope>
.change-file-button {
  position: relative;
  min-width: 100px;
  height: 31px;
  margin-right: 20px;
}
.file {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
}
.el-upload-dragger {
  width: 300px;
  height: 150px;
  position: relative;
  label {
    display: block;
  }

  .img {
    width: 300px;
    height: 150px;
    object-fit: cover;
  }
}
</style>
