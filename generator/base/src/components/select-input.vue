<template>
  <el-input :placeholder="inputPlaceholder"
    class="input-with-select" size="small"
    v-model="inputValue"
    @keyup.native.enter="search"
    @input="inputChange"
    @clear="clear"
    :disabled = "$props.disabled"
    clearable>
    <el-select
      v-model="select" slot="prepend"
      :disabled = "$props.disabled"
      :placeholder="selectPlaceholder"
      @change="selectChange">
      <el-option :label="item.label" :value="item.value" v-for="(item,idx) in selectList" :key="idx" ></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search" :disabled = "$props.disabled"></el-button>
  </el-input>
</template>

<script>
/**
 * ------ props
 * @param inputPlaceholder 输入框中的placeholder
 * @param selectPlaceholder 选择框中的placeholder
 * @param value 输入框中的默认值，若需双向绑定可加.sync
 * @param selectValue 选择框中的默认值，若需双向绑定可加.sync
 * @param selectList 选择框中的选项值，必填
 * ------ 绑定方法
 * @param search 搜索，返回输入框值和选择框值
 * @param selectChange 选择框选中值发生变化时触发，返回选中值
 */
export default {
  name: 'select-input',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    inputPlaceholder: {
      default: '请输入搜索内容'
    },
    selectPlaceholder: {
      default: '请选择'
    },
    value: {
      default: null
    },
    selectValue: {
      default: null
    },
    selectList: {
      required: true
    },
    id: {
      default: ''
    },
    isChache: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inputValue: this.value,
      select: '',
      prefixName: 'fe-select-input',
      chacheName: ''
    };
  },
  mounted () {
    this.chacheName = this.getStorageName();
    this.select = this.setDefault();
  },
  methods: {
    selectChange (val) {
      localStorage[this.chacheName] = val;
      this.$emit('update:selectValue', val);
      this.$emit('selectChange', val);
    },
    search () {
      if (!this.select) {
        return $tool.msg.err('请选择搜索类型');
      }
      this.$emit('search', this.inputValue, this.select);
    },
    inputChange (val) {
      this.$emit('update:value', val);
    },
    setDefault () {
      let result;
      if (this.isChache) result = localStorage[this.chacheName];
      if (this.checkIsNull(result) && result !== '0') result = this.selectValue ? this.selectValue : this.selectList[0].value;
      return result;
    },
    getStorageName () {
      let field = '';
      if (!this.id) {
        field = `${this.prefixName}_${this.$route.name}`;
      } else {
        field = `${this.prefixName}_${this.id}_${this.$route.name}`;
      }
      return field;
    },
    clear () {
      this.$emit('search', this.inputValue, this.select);
    },
    checkIsNull (result) {
      if (!result) return true;
      let isHave = this.selectList.some((val) => {
        return val.value === result;
      });
      return !isHave;
    },
    clearInput () {
      this.inputValue = '';
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-input-group__prepend{
  background-color: #fff;
}
/deep/.el-select .el-input{
  width: 100px;
}
/deep/.el-input__inner{
  border-left:0;
}
/deep/.el-input__inner:focus{
  border-color: #dcdfe6;
}
/deep/.el-input__inner:hover{
  border-color: #dcdfe6;
}
</style>