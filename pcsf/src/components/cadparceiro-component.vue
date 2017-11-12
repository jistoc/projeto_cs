<template>
	<section class="hero is-success is-fullheight">
		<div class="hero-body">
			<div class="container has-text-centered is-fullheight">
				<div class="column is-4 is-offset-4">

					<div class="box">
						<form>	
							<div id="caption">Novo Parceiro</div>
							<div v-if="falha.status" class="message is-danger">
								<div class="message-header">
									<p>Falha</p>
								</div>
								<div class="message-body text-left"  v-html="falha.mensagem">

								</div>
							</div>
							<div v-if="sucesso"class="message is-success">

								<div class="message-body text-left">
									{{msg}}<br>
									<router-link to="lista-parceiros">Listar Parceiros</router-link>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input is-large" 
									type="text" 
									placeholder="Nome Fantasia" 
									autofocus
									v-model="nome_fantasia"
									:class="{'is-danger': validation.hasError('nome_fantasia')}">

									<span v-if="validation.firstError('nome_fantasia_a')" class="text-danger">{{ validation.firstError('nome_fantasia_a') }}</span>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input  class="input is-large" 
									type="text" 
									placeholder="Razão Social"
									v-model="razao_social" 
									:class="{'is-danger': validation.hasError('razao_social')}">

									<span v-if="validation.firstError('razao_social_a')" class="text-danger">{{ validation.firstError('razao_social_a') }}</span>
								</div>
							</div>
							<div class="field">
								<div class="control" >
									<input class="input is-large" 
									v-mask="'##.###.###/####-##'" 
									type="text" 
									placeholder="CNPJ"
									v-model="cnpj"
									:class="{'is-danger': validation.hasError('cnpj_a')}">

									<span v-if="validation.firstError('cnpj_a')" class="text-danger">{{ validation.firstError('cnpj') }}</span>
								</div>
							</div>
							<div class="field">
								<div class="control" >
									<input class="input is-large" 
									type="email" 
									placeholder="E-mail"
									v-model="email"
									:class="{'is-danger': validation.hasError('email_a')}" >

									<span v-if="validation.firstError('email_a')" class="text-danger">{{ validation.firstError('email') }}</span>
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input is-large" 
									type="text" 
									placeholder="Usuário"
									v-model="nome_usuario" 
									:class="{'is-danger': validation.hasError('nome_usuario_a')}" >

									<span v-if="validation.firstError('nome_usuario_a')" class="text-danger">{{ validation.firstError('nome_usuario_a') }}</span>
								</div>
							</div>

							<div class="field">
								<div class="control">
									<input class="input is-large" 
									type="password" 
									placeholder="Senha"
									v-model="senha"
									:class="{'is-danger': validation.hasError('senha_a')}" >

									<span v-if="validation.firstError('senha_a')" class="text-danger">{{ validation.firstError('senha') }}</span>
								</div>
							</div>
							<a class="button is-block is-info is-large" 
							v-on:click="validateBeforeSubmit">Cadastrar</a>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data : () => {
		return {
			email : '', 
			razao_social : '', 
			nome_fantasia : '', 
			nome_usuario : '', 
			senha : '', 
			cnpj : '',
			falha : {
				status : false,
				mensagem : 'Falha ao enviar formuário'
			},
			sucesso : false,
			msg : ''	
		}
	},
	validators: {
		cnpj: function (value) {
			return Validator.value(value).required().length(18);
		},
		email: function (value) {
			return Validator.value(value).required().email().maxLength(255);
		},
		nome_usuario: function (value) {
			return Validator.value(value).required().maxLength(255);
		},
		nome_fantasia: function (value) {
			return Validator.value(value).required().maxLength(255);
		},
		razao_social: function (value) {
			return Validator.value(value).required().maxLength(255);
		},
		senha: function (value) {
			return Validator.value(value).required().lengthBetween(3,255);
		}
	},
	methods: {
		validateBeforeSubmit() {
			/*this.$validate()
			.then( (success) => {
				if (success) {
					this.enviarForm();
				}
			})
			.catch(err => {	
				console.log(err);
			});*/

					this.enviarForm();		
		},
		enviarForm(){
			let dados = {
				cnpj : this.cnpj,
				email : this.email,
				nome_usuario : this.nome_usuario,
				nome_fantasia : this.nome_fantasia,
				razao_social : this.razao_social,
				senha : this.senha
			}
			this.$http.post(api_url + 'parceiro', dados)
			.then( result => {
				if(result.status == 200){
					this.falha.status = false;
					this.sucesso = true;
					this.msg = result.body.message;
					console.log(result)

				}
			})
			.catch( err => {
				if(err.status){
					this.sucesso = false;
					this.falha.status = true;
					this.falha.mensagem = err.body.message;
				}
			});
		}
	}
}
</script>
<style>
body {
	background: #F2F6FA;
}
#caption{
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 20px;

}
.text-danger{
	color:red;
	padding-left:2px;
}
.text-left{
	text-align: left;
}
.box{
	margin-top: 0;
}
.hero-body{
	padding-top: 0;
}
.hero{
	padding: 0;
	margin: 0;
}
</style>