export default {
  data() {
    return {
      debounceTimer: null,
    }
  },
  methods: {
    /**
     * 立即执行防抖
     * @param {函数} func 
     * @param  {...参数} args 
     */
    debounceMethod(func, ...args) {
      let callNow = !this.debounceTimer;//如果非空
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null;
      }, 200);
      //则执行
      if(callNow) func.apply(this, args);
    }
  }
}