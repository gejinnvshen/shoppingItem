var tab = new Vue({
    el:'#tabCate',
    data:{
        items:[
            {message:'推荐'},
            {message:'母婴'},
            {message:'鞋包饰品'},
            {message:'食品'},
            {message:'数码家'},
        ],
        filters:[
            {message:'综合排序'},
            {message:'销量优先'},
            {message:'价格'},
        ],
        purchase:[

        ],
        lists:[
            {
                name:'Beats EP头戴式耳机',
                type:0,
                sales:0,
                price:0,
                img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
            },
            {
                name:'雀巢',
                type:1,
                sales:22,
                price:222,
                img: 'http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp'
            },
            {
                name:'煎炒烹饪',
                type:2,
                sales:33,
                price:333,
                img: 'http://gw.alicdn.com/tps/TB19OfQRXXXXXbmXXXXL6TaGpXX_760x760q90s150.jpg_.webp'
            },
            {
                name:'ANNE KLEIN 潮流经典美式轻奢',
                type:2,
                sales:11,
                price:111,
                img: 'http://gw.alicdn.com/tps/TB1l5psQVXXXXcXaXXXL6TaGpXX_760x760q90s150.jpg_.webp'
            },
            {
                name:'乐高EV3机器人积木玩具',
                type:2,
                sales:11,
                price:111,
                img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t6490/168/1052550216/653858/9eef28d1/594922a8Nc3afa743.jpg!q50.jpg'
            },
        ],
        cateindexs:0,   //cateindexs要放在data里
        sortIndex:0,
        priceUp:0,     
        extraLists:[]
    },
    created: function () {   //created这个钩子在vue实例被创建后就会被调用，
        this.setList();   //   因为created这个钩子在vue实例被创建后就会被调用，所以setList()马上就执行
        /*console.log(this.data)  //undefined  
        console.log(this.$data)  // {__ob__: eo} 返回的是整个data 
        console.log(this.lists)  //返回的是整个lists
        console.log(this.lists instanceof Array)  //true
        console.log(this.extraLists)  //页面刚加载是，返回的是整个lists
        console.log(this.extraLists[1].type)   //1*/
    },
    methods:{
        getIndex:function(index){
            this.cateindexs=index;
            this.setList();
        },
        setList:function(){
            var self = this;
            this.extraLists = this.lists.filter(function(item){
                return self.cateindexs !== 0 ? item.type === self.cateindexs : item
            });
        },
        defaultSort:function(index){
            console.log(typeof this.lists)
            //var self = this;
            this.sortIndex = index;
            if (index==0) {       //点击综合排序
                this.setList();   //初始化时渲染页面,  为什么要初始化页面，因为sort()方法改变了lists原始数组
            }else if(index == 1){  //点击销量优先进行排序
                this.extraLists.sort(this.sortNumber('price',true));  //注意：sortNumber前面要加this
            }else if(index == 2){   //
                this.extraLists.sort(this.priceSort('sales'));  //注意：sortNumber前面要加this
            }
        },
        sortNumber:function(property,desc){
            //降序排列
            if (desc) {       //默认销量从高到低排序
                return function (a, b) {
                    return (a[property] >  b[property]) ? -1 : (a[property] <  b[property]) ? 1 : 0;
                }   
            }
            //升序排列
            return function (a, b) {     //销量从低到高排序
                return (a[property] <  b[property]) ? -1 : (a[property] >  b[property]) ? 1 : 0;
            }
        },
        /*
            价格排序
        */
        priceSort:function(property){
            //降序排列
            if (this.priceUp == 0) {   //默认价格从高到低排序
                this.priceUp ++;
                return function (a, b) {
                    return (a[property] >  b[property]) ? -1 : (a[property] <  b[property]) ? 1 : 0;
                }   
            }else if(this.priceUp == 1){     //从低到高排序
                //升序排列
                this.priceUp --;
                return function (a, b) {
                    return (a[property] <  b[property]) ? -1 : (a[property] >  b[property]) ? 1 : 0;
                }    
            }
        },
        /*
            加入购物车
        */
        addItem:function(index){
            Vue.set(this.lists[index],'count',1)
            this.purchase.push(this.lists[index]);
            //console.log(this.count);  //1
            //console.log(this.purchase instanceof Array)  //true
        },
        increaseGoods:function(index){
            this.lists[index].count++;
        },
        decreGoods:function(index){
            this.lists[index].count--;
        }
    }
})






