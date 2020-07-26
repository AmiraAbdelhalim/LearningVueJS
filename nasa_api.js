var apiKey= 'Ak9EBvGnKf8abqdkP6Jod0DuJtoCPocoGvt1HseU';
var url = 'https://api.nasa.gov/planetary/apod?api_key='+apiKey+'&date=2017-07-12';
var vm = new Vue({
    el: '#app',
    data: {
        imgSrc: '',
        imgTitle: ''
    },
    
});

axios.get(url).then(function(res){
    vm.imgSrc=res.data.url;
    vm.imgTitle= res.data.title;
});