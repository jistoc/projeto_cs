<template>

	<section class="hero is-success is-fullheight">
		<div class="container has-text-centered">
			<div class="column is-10 is-offset-1">
				<div v-if="falha.status" class="message is-danger">
					<div class="message-header">
						<p>Falha</p>
					</div>
					<div class="message-body text-left"  v-html="falha.mensagem">

					</div>
				</div>
				<table class="table is-fullwidth">
					<thead>
						<tr>
							<th>Nome Fantasia</th>
							<th>Nome Social</th>
							<th>CNJP</th>
							<th>E-mail</th>
							<th>Usuáio</th>
							<th>Senha</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="p in parceiros">
							<td>{{p.nome_fantasia}}</td>
							<td>{{p.nome_social}}</td>
							<td>{{p.cnpj}}</td>
							<td>{{p.email}}</td>
							<td>{{p.nome_usuario}}</td>
							<td>{{p.senha}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data : () => { 
		return {
			parceiros : [],
			falha : {
				status : false,
				mensagem : ''
			}
		}

	},
	beforeMount(){
		this.$http.get(api_url + 'parceiro/all')
		.then( result => {
			if(result.status == 200){
				this.parceiros = result.body;
			}
		})
		.catch( err => {
			if(err.status){
				this.falha.status = true;
				this.falha.mensagem = 'Falha interna';
			}
		});
	}
}
</script>

<style>
.hero.is-fullheight{
	margin-top: 0;
}
.text-left{
	text-align: left
}
</style>