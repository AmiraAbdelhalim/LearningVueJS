
var vm = new Vue({
    el: '#app',
    data: {
        email: 'amira@example.com',
        submitted: false
    },
    methods: {
        process: function(){
            this.submitted = true;
        }
    }
});