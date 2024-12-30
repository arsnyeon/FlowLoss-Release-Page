new Vue({
    el: '#app',
    data: {
		FlowLoss: {
            UrlList: [
                {title: '访问通道 1(推荐)', website:'https://net.arsn.cn/', color:null, ms:'Loading...'},
				{title: '访问通道 2(主用)', website:'https://net.u3o.cn/', color:null, ms:'Loading...'},
				{title: '访问通道 3(备用)', website:'https://net.uos.cx/', color:null, ms:'Loading...'}
            ]
        }
	},
    mounted() {
        let that = this;
        let allowedDomains = ["%6c%6f%63%61%6c%68%6f%73%74", "%61%72%73%6e%2E%63%6e", "%75%33%6f%2E%63%6e", "%75%6f%73%2E%63%78", "%72%75%6e%2E%6e%65%74%73%2E%68%6b"];
        let decodedAllowedDomains = allowedDomains.map(encodedDomain => decodeURIComponent(encodedDomain));
        if (!decodedAllowedDomains.includes(window.location.hostname)) {
            window.location.href = decodeURIComponent('%68%74%74%70%73%3A%2F%2F%72%75%6e%2E%6e%65%74%73%2E%68%6b%2F');
        }
		setTimeout(() => {this.getPing();}, 1500);
    },
    watch: {

    },
    methods: {
        async getPing() {
            let that = this;
            that.FlowLoss.UrlList.forEach(async (aisles, index) => {
                try {
                    /*const start_timestamp = new Date().getTime();*/
                    const response = await fetch(aisles.website, { 
                        method: "GET", 
                        cache: "no-store", 
                        mode: 'no-cors', 
                        referrerPolicy: 'no-referrer' 
                    });
					aisles.ms = '正常';
					aisles.color = 'green';
                    /*aisles.ms = new Date().getTime() - start_timestamp;
                    aisles.color = parseInt(aisles.ms) < 200 ? 'green' : aisles.ms < 400 ? 'orange' : 'red';*/
                } catch (error) {
                    aisles.ms = "异常";
                    aisles.color = 'red';
                }
            });
        },
        travelLing(link) {
            window.open(link);
        }
    }
})