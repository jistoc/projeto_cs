import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import LoginComponent from './components/login-component.vue';
import CadParceiroComponent from './components/cadparceiro-component.vue';
import ListaParceirosComponent from './components/listaparceiros-component.vue';
import VueMask from 'v-mask';
import SimpleVueValidation from 'simple-vue-validator';
import erros_pt from './erros_pt';

window.api_url = 'http://localhost:8085/api/v1/';

SimpleVueValidation.extendTemplates(erros_pt);
window.Validator = SimpleVueValidation.Validator;
Vue.use(SimpleVueValidation);

Vue.use(VueMask);
Vue.use(VueResource);
Vue.use(VueRouter);


window.router = new VueRouter({
  routes : [
    { name : 'login', path : '/login', component: LoginComponent },
    { name : 'cadastro', path : '/cadastro', component: CadParceiroComponent },
    { name : 'lista-parceiros', path : '/lista-parceiros', component: ListaParceirosComponent }

  ],
  mode : 'hash'
});

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

//https://github.com/hootlex/vuejs-form-validation-example/blob/master/src/App.vue