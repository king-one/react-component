import echarts from 'echarts';
let defaultSetting = {
    el:null,
    //偏移位置
    offset:[0, 0],
    //终点元素，这时就会自动获取该元素的left、top，设置了这个参数，offset将失效
    targetEl:null,
    end:{
        width:10,
        height:10
    },
    //运动的时间，默认500毫秒
    duration:500,
    //抛物线曲率，就是弯曲的程度，越接近于0越像直线，默认0.001
    curvature:0.001,
    //运动后执行的回调函数
    callback:null,
    // 是否自动开始，默认为false
    autostart:true,
    //运动过程中执行的回调函数
    stepCallback:null
};
export default class Flyer {
    constructor(options){
        this.initialize(options)
    }
    now() {
        return +new Date();
    }
    initialize(options) {
        this.options = this.getOptions(options);
        let ops = this.options;
        if (!this.options.el) {
            return;
        }
        this.elOriginalLeft = $(ops.el).offset().left;
        this.elOriginalTop = $(ops.el).offset().top;
        let myChart = echarts.getInstanceByDom($(ops.el)[0]);
        // 如果是echarts 则导出图片
        if(myChart){
          let img = new Image();
          img.src = myChart.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
          Object.assign(img.style,
            {
              width:  $(ops.el).width() +'px',
              height: $(ops.el).height() +'px',
              left : $(ops.el).offset().left +'px',
              top : $(ops.el).offset().top + 'px',
              position:'absolute',
              border: '1px solid #eee',
            })
          this.$el = $(img).appendTo('body')
        }else{
        this.$el = $(ops.el).clone().appendTo('body');
        }
        this.timerId = null;
        if (ops.targetEl) {
            this.driftX = $(ops.targetEl).offset().left - this.elOriginalLeft;
            this.driftY = $(ops.targetEl).offset().top - this.elOriginalTop;
        } else {
            this.driftX = ops.offset[0];
            this.driftY = ops.offset[1];
        }
        this.duration = ops.duration;
        this.curvature = ops.curvature;
        // 根据两点坐标以及曲率确定运动曲线函数（也就是确定a, b的值）起始点为原点
        this.b = (this.driftY - this.curvature * this.driftX * this.driftX) / this.driftX;   
        //自动开始
        if (ops.autostart) {
            this.start();
        }
    }
    /**
     *  配置参数 
     */
    getOptions(options) {
        if (typeof options !== "object") {
            options = {};
        }
        options = $.extend(defaultSetting, options,{
            start:{
                width: $(options.el).width(),
                height: $(options.el).height()
            }
        });
        return options;
    }
    /**
     * 定位
     */
    domove(x, y) {
        console.log(this.elOriginalLeft + x,this.elOriginalTop + y);
        this.$el.css({
            position: "absolute",
            left: this.elOriginalLeft + x,
            top: this.elOriginalTop + y
        });
        return this;
    }
    /**
     * 每一步执行
     */
    step(now) {
        let ops = this.options;
        let {start,end} = this.options;
        let x, y;
        if (now > this.end) {
            // 运行结束
            x = this.driftX;
            y = this.driftY;
            this.domove(x, y);
            this.stop();
            if (typeof ops.callback === 'function') {
                ops.callback.call(this);
            }
        } else {
            let progress = (now - this.begin) / this.duration
            //x 每一步的X轴的位置
            x = this.driftX * progress;
            //每一步的Y轴的位置y = a*x*x + b*x + c;   c==0;
            y = this.curvature * x * x + this.b * x;
           if (end.width != null && end.height != null) {
            /*改变尺寸*/
            let width = start.width - (start.width - end.width)*progress,
            height = start.height - (start.height - end.height)*progress;
            this.$el.css({width: width + "px", height: height + "px", "font-size": Math.min(10,width, height) + "px"});
      }
            this.domove(x, y);
            if (typeof ops.stepCallback === 'function') {
                ops.stepCallback.call(this, x, y);
            }
        }
        return this;
    }

    setOptions(options) {
        this.reset();
        if (typeof options !== "object") {
            options = {};
        }
        this.options = $.extend(this.options, options);
        this.initialize(this.options);
        return this;
    }

    start() {
        // 设置起止时间
        this.begin = this.now();
        this.end = this.begin + this.duration;
        if (this.driftX === 0 && this.driftY === 0) {
            return;
        }
        if (!!this.timerId) {
            clearInterval(this.timerId);
            this.stop();
        }
        this.timerId = setInterval(()=>{
            let t = this.now();
            this.step(t);
        }, 13);
        return this;
    }
    reset(x, y) {
        this.stop();
        x = x ? x : 0;
        y = y ? y : 0;
        this.domove(x, y);
        return this;
    }
    stop() {
        if (!!this.timerId) {
            clearInterval(this.timerId);
        }
        return this;
    }
    destroy(){
       this.$el.remove()
    }
}
