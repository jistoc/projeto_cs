<template>
	<div class="container column is-10">
		<div class="section">

			<div class="card">
				<div class="card-header"><p class="card-header-title">Dados Cadastrais</p></div>
				<div class="card-content">
					<div class="content">
						<form>
							<div class="field">
								<div class="control">
									<input class="input " type="text" placeholder="Nome Fantasia" autofocus="" v-model="nome_fantasia">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input " type="text" placeholder="Razão Social" autofocus="" v-model="razao_social">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input " type="email" placeholder="E-mail" autofocus="" v-model="email">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input " type="password" placeholder="Senha" v-model="senha">
								</div>
							</div>
							<a class="button is-danger " v-on:click="remover">Desativar</a>
							<a class="button is-info " v-on:click="alterar">Alterar</a>
						</form>
					</div>
				</div>
			</div>


		</div>
	</div>
</template>
<script>
import decode from 'jwt-decode';
export default {
	data : () => {
		return {
			nome_fantasia : '',
			razao_social : '',
			email : '',
			senha : ''
		}
	},
	methods: {
		alterar(){
			let dados = {
				nome_usuario : this.nome_usuario,
				razao_social : this.razao_social,
				email : this.email,
				nome_fantasia : this.nome_fantasia
			}
			if(this.senha.length>0){
				dados.senha = this.senha;
			}
			this.$http.put(api_url + 'parceiro', dados, { 
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {
				alert(result.body.message)
				this.atualizarDados();
			})
			.catch( err => {
				
				alert(err.body.message)

			});
		},
		remover(){
			this.$http.delete(api_url + 'parceiro', { 
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {
				alert(result.body.message)
				localStorage.clear();
				router.push({name:'login'})
			})
			.catch( err => {
				
				alert(err.body.message)

			});
		},
		atualizarDados(){
			this.$http.get(api_url + 'parceiro', { 
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {
				this.nome_fantasia = result.body.message.nome_fantasia;
				this.razao_social = result.body.message.razao_social;
				this.email = result.body.message.email;
				this.senha = result.body.message.senha;
			})
			.catch( err => {
				
				alert(err.body.message)

			});
		}
	},
	beforeMount(){
		
		this.atualizarDados();
	}
}
</script>
<style>

</style>