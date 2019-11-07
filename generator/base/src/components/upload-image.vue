<template>
  <div class="upload-image" v-loading="loading">
    <label v-if="!value" :for="inputId" class="upload-image__uploadLabel">
      <i class="iconfont ic_upload icon"></i>
    </label>
    <div class="upload-image__uploadDiv" v-else @mouseenter="isEnter = true" @mouseleave="isEnter = false">
      <img :src="computedvalue">
      <label v-if="isEnter" :for="inputId" class="upload-image__uploadLabel upload-image__uploadHideLabel">
        <i class="iconfont ic_upload icon"></i>
      </label>
    </div>
    <input @change="handleInput"
      :id="inputId"
      type="file"
      name="File"
      accept="image/jpg,image/jpeg,image/png"
      style="display: none;">
    <!-- 图片裁剪-->
    <the-dialog :dialogObj="cropperDialog">
      <div slot="content"
        class="cropper-image-box">
        <img ref="cropperImage"
          src=""
          class="cropper-image">
      </div>
    </the-dialog>
  </div>
</template>
<script>
import theDialog from '@/components/the-dialog';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
const defaultCropperOptions = {
  dragMode: 'move',
  // 自动显示裁剪框
  autoCropArea: 1,
  // 容器，图片，裁剪框的层叠关系
  viewMode: 0,
  // 裁剪框比例
  aspectRatio: 1
};
export default {
  name: 'upload-image',
  data () {
    const that = this;
    return {
      cropperDialog: {
        title: '图片裁剪',
        dialogVisible: false,
        type: 'normal',
        modal: that.shadowLayer,
        hasBottomButton: true,
        isNeedCancel: true,
        confirmCall () {
          if (that.cropperDialog.locked) {
            return;
          }
          that.cropperDialog.locked = true;
          that.crop();
          // that.cropperDialog.dialogVisible = false;
        },
        cancelCall () {},
        init () {
          that.cropperDialog.locked = false;
          that.cropperDialog.dialogVisible = true;
        }
      },
      cropper: null,
      imageType: '', // 被裁剪图片的 MIME 类型
      inputId: 'upload-image_' + Math.random().toString().replace('.', ''),
      isEnter: false,
      loading: false
    };
  },
  props: {
    value: {
      required: true
    },
    // 是否需要弹窗的遮罩层
    shadowLayer: {
      type: Boolean,
      default: true
    },
    // 需要上传的图片的张数，不传默认1张
    limit: {
      type: Number,
      default: 1
    },
    // 限定上传图片的大小，默认1M
    maxSize: {
      type: Number,
      default: 1
    },
    // 裁剪框参数，选填
    cropperOptions: {
      type: Object,
      default: null
    },
    // 上传地址,如果有则上传，无则不上传
    uploadApi: {
      default: null
    }
  },
  methods: {
    crop () { // 确认裁剪图片
      if (this.cropper) {
        const src = this.cropper.getCroppedCanvas().toDataURL(this.imageType);
        // this.value = src;
        if (this.uploadApi) return this.uploadImg(src);
        else {
          this.$emit('input', src);
          this.cropperDialog.dialogVisible = false;
        }
      }
    },
    handleInput (event) {
      const file = event.target.files[0];
      event.target.value = '';
      // 在ie中会触发两次上传，如果file为null就不执行下面的流程
      if (!file) return;
      if (!file.type.match(new RegExp('^image/(png|jpeg|jpg)'))) {
        return $tool.msg.warn('请选择图片（格式仅限：png、jpeg和jpg）');
      }
      this.cropper && this.cropper.destroy();
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = e => {
        const max = 1024 * 1024 * this.maxSize;
        if (e.total >= max) {
          return $tool.msg.warn(`请上传小于${this.maxSize}M的图片`);
        }
        this.imageType = file.type;
        this.cropperDialog.init();
        this.$nextTick(() => {
          const image = this.$refs.cropperImage;
          image.removeAttribute('src');
          image.onload = () => {
            // 对高度过高的图片处理
            if (image.height > 440) {
              image.parentElement.style.width = 440 / image.height * image.width + 'px';
            } else if (image.width < 920) {
              if (image.width / image.height < 2) {
                image.parentElement.style.width = 440 / image.height * image.width + 'px';
              } else {
                image.parentElement.style.width = null;
              }
            } else {
              image.parentElement.style.width = null;
            }
            this.cropper = new Cropper(image, Object.assign({}, defaultCropperOptions, this.cropperOptions));
          };
          image.setAttribute('src', e.target.result);
        });
      };
    },
    uploadImg (image) {
      this.loading = true;
      $http.post(this.uploadApi, {
        bass64: image
      }).then((res) => {
        this.$emit('input', res.data.url);
        this.cropperDialog.dialogVisible = false;
      }).catch((err) => {
        $tool.handleCommonError(err);
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    computedvalue () {
      if (this.value && /^data:image/.test(this.value)) return this.value;
      else return `https://cdn.meishakeji.com/${this.value}`;
    }
  },
  components: {
    theDialog
  }
};
</script>
<style lang="scss" scoped>
.circleSize{
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
}
@include b(upload-image) {
  display: inline-block;
  @include e(uploadDiv){
    @extend .circleSize;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      background:white;
    }
  }
  @include e(uploadLabel){
    @extend .circleSize;
    display:inline-block;
    border:1px dashed #C4C7CC;
    color: #3D7AF8;
  }
  @include e(uploadHideLabel){
    position: absolute;
    left:0;
    top:0;
    background: rgba(0,0,0,0.40);
    border:0;
    color: white;
  }
  .cropper-image-box {
    margin: 0 auto;
  }
  .cropper-image {
    width:100%;
    // max-width: 100%;
    // max-height: 440px;
  }
  .view-image-container {
    text-align: center;
  }
  .view-image {
    max-width: 100%;
  }
  .icon{
    font-size: 14px;
  }
}
</style>
