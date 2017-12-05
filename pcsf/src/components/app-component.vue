<template>
		

		<section class="main-content columns is-fullheight">

			<aside class="column is-2 is-fullheight section ">
				<p class="menu-label is-hidden-touch">Navegação</p>
				<ul class="menu-list">
					<li>
						<router-link to="info" exact-active-class="is-active">
							<span class="icon"><i class="fa fa-home"></i></span> Início
						</router-link>
					</li>
					<li>
						<router-link to="alterar" exact-active-class="is-active">
							<span class="icon"><i class="fa fa-table"></i></span> Dados Cadastrais
						</router-link>
					</li>
					<li>
						<router-link to="cliente" exact-active-class="is-active">
							<span class="icon"><i class="fa fa-user"></i></span> Cliente
						</router-link>
					</li>
					<li>
						<router-link to="titulo" exact-active-class="is-active">
							<span class="icon"><i class="fa fa-barcode"></i></span> Títulos
						</router-link>
					</li>
					<li>
						<router-link to="consulta-p" exact-active-class="is-active">
							<span class="icon"><i class="fa fa-search"></i></span> Consulta
						</router-link>
					</li>
					<li>
						<a href="#" class="" v-on:click="logout">
							<span class="icon"><i class="fa fa-sign-out"></i></span> Sair
						</a>
					</li>
				</ul>
			</aside>

			<router-view></router-view>

		</section>

</template>

<script>
export default {
	data : () => {
		return {	
		}
	},
	methods: {
		logout(){
			this.$http.put(api_url + 'logout', null, { 
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {
				alert(result.body.mensagem)
				localStorage.clear();
				router.push({name:'login'})
			})
			.catch( err => {
				
				alert(err.body.mensagem)

			});
		}
	},
	computed : {
		isActive() {
			return router.history.current.name;
		}
	},
	beforeMount(){
		if(!localStorage.getItem('token')){
			router.push({name:'login'})
		}
	}
}
</script>
<style>
.router-link-active{
	background-color: hsl(171, 100%, 41%);
	
}
</style>