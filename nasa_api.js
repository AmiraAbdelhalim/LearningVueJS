var apiKey= 'Ak9EBvGnKf8abqdkP6Jod0DuJtoCPocoGvt1HseU';

var vm = new Vue({
    el: '#app',
    data: {
        imgSrc: '',
        imgTitle: '',
        asteroids: [],
    },
    computed: {
        numAsteroids: function(){
            return this.asteroids.length;
        },
        closestObject: function(){
            let neosHavingData= this.asteroids.filter(function(neo){
                return neo.close_approach_data.length > 0;
            });
            let simpleNeos = neosHavingData.map(function(neo){
                return {name: neo.name, miles: neo.close_approach_data[0].miss_distance.miles};
            });
            let sortedNeos= simpleNeos.sort(function(a,b){
                return a.miles - b.miles;
            });
            return sortedNeos[0].name;
        }
    },
    created: function(){ //hook 
        this.fetchApod();
        this.fetchAsteroids();
    },
    methods: {
        fetchApod: function() {
            
            let url = 'https://api.nasa.gov/planetary/apod?api_key='+apiKey+'&date=2017-07-12';
            axios.get(url).then(function(res){
                vm.imgSrc=res.data.url;
                vm.imgTitle= res.data.title;
            });
        },
        fetchAsteroids: function() {
            let url ='https://api.nasa.gov/neo/rest/v1/neo/browse?api_key='+apiKey;
            axios.get(url).then(function(res){
               vm.asteroids = res.data.near_earth_objects.slice(0,10);
            });
        },
        getCloseApproachDate: function(a){
            if(a.close_approach_data.length > 0){
                return a.close_approach_data[0].close_approach_date;
            }
            return 'N/A';
        },
        remove: function(index){
            this.asteroids.splice(index, 1)
        }
    }
});

