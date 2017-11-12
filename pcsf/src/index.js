import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueMask from 'v-mask';
import SimpleVueValidation from 'simple-vue-validator';
import erros_pt from './erros_pt';
import router from './router';

//window.api_url = 'http://10.20.8.42:80/parceiro';

window.api_url = 'http://192.168.25.6:3000/api/v1/';

SimpleVueValidation.extendTemplates(erros_pt);
window.Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);
Vue.use(VueMask);
Vue.use(VueResource);
Vue.use(VueRouter);

window.usuario = { nome_usuario : false };
window.router = router;
window.Vue = new Vue({
	el: "#app",
	router : router,
	data : {
		logged : 0
	},
	beforeMount() {
		if(this.logged==0){
			router.push({name:'login'});
		}
	}
});
