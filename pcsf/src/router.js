import VueRouter from 'vue-router';
import LoginComponent from './components/login-component.vue';
import CadParceiroComponent from './components/cadparceiro-component.vue';
import ListaParceirosComponent from './components/listaparceiros-component.vue';
import AppComponent from './components/app-component.vue';
import InfoComponent from './components/info-component.vue';
import AlterarComponent from './components/alterar-component.vue';
import ClienteComponent from './components/cliente-component.vue';
import TituloComponent from './components/titulo-component.vue';


const router = new VueRouter({
   routes : [
    { name : 'login', path : '/login', component: LoginComponent },
    { name : 'cadastro', path : '/cadastro', component: CadParceiroComponent },
    { name : 'lista-parceiros', path : '/lista-parceiros', component: ListaParceirosComponent },
    { name : 'home', path : '/inicio', component: AppComponent ,
 		children: [
            { path: '/inicio/info', name: 'info', component: InfoComponent },

            { path: '/inicio/alterar', name: 'cad', component: AlterarComponent },

            { path: '/inicio/cliente', name: 'cliente', component: ClienteComponent },

            { path: '/inicio/titulo', name: 'titulo', component: TituloComponent }
        ],
    }
  ],
  mode : 'hash'
});

// router.beforeEach( (to,from,next) => {
// 	if(to.path == '/login'){
// 		if(usuario.nome_usuario){
// 			next('/inicio')
// 		} else {
// 			next();
// 		}
// 	}
// 	else if(!usuario.nome_usuario){
// 		next('/login');
// 	}
// })
export default router;