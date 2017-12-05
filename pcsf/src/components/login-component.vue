<template>
	<section class="hero is-success is-fullheight">
		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="column is-4 is-offset-4">
					<input v-model="url" type="text" class="input" :disabled="sit"><br><br>
					<a class="button is-block is-primary" v-on:click="definir()" >{{texto}}</a>
					<br><br>
					
					<router-link to='consulta-cli' class="button is-default is-block">Consultar Titulos - Cliente</router-link>  
					<div class="box">1
						<figure class="avatar">
							<img src="img/credit.png" width="150">
						</figure>
						<div v-if="falha.status" class="message is-danger">
							<div class="message-header">
								<p>Falha</p>
							</div>
							<div class="message-body text-left"  v-html="falha.mensagem">

							</div>
						</div>

						<form v-on:submit.prevent="login">
							<div class="field">
								<div class="control">
									<input class="input is-large" type="text" placeholder="Usuário" autofocus="" v-model="nome_usuario">
								</div>
							</div>

							<div class="field">
								<div class="control">
									<input class="input is-large" type="password" placeholder="Senha" v-model="senha">
								</div>
							</div>
							<a class="button is-block is-info is-large" v-on:click="login">Login</a>
						</form>
					</div>
					<p class="has-text-grey">
						<router-link to='cadastro'> Cadastro</router-link>  &nbsp;
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data : () => { 
		return {
			nome_usuario : '',
			senha : '',
			falha : {
				status : false,
				mensagem : 'Falha ao enviar formuário'
			},
			url : window.api_url,
			sit : false,
			texto : 'Definir url'
		}

	},
	methods: {
		login() {
			let dados = {
				nome_usuario : this.nome_usuario,
				senha : this.senha
			}
			this.$http.put(api_url + 'login', dados)
			.then( result => {
				if(result.status == 200){
					usuario.nome_usuario = this.nome_usuario;
					localStorage.setItem('token',result.body.token);
					this.$http.get(api_url + 'parceiro', { 
						headers : {
							Authorization : localStorage.getItem('token')
						}
					})
					.then( result => {
						localStorage.setItem('id_parceiro',result.body.id_parceiro);
					})
					.catch( err => {
						
						alert(err.body.mensagem)

					});
					router.push({name:'info'})
				}
			})
			.catch( err => {
				if(err.status){
					this.sucesso = false;
					this.falha.status = true;
					this.falha.mensagem = err.body.mensagem;
				}
			});
		},
		definir(){
			window.api_url = this.url;
			this.sit = !this.sit

		}
	},
	beforeMount(){
		if(localStorage.getItem('token')){
			router.push({name:'info'})
		}
	}
}
</script>

<style>
.hero.is-success {
	background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
	-webkit-box-shadow: none;
	box-shadow: none;
}
.box {
	margin-top: 5rem;
}
.avatar {
	margin-top: -70px;
	padding-bottom: 20px;
}
.avatar img {
	padding: 5px;
	background: #fff;
	border-radius: 50%;
	-webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
	box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
	font-weight: 300;
}
p {
	font-weight: 700;
}
p.subtitle {
	padding-top: 1rem;
}
</style>