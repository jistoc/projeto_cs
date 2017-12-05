<template>
		
	
		<div class="container column">
			<div class="section">
				<div class="card">
					

					<div class="card-header"><p class="card-header-title">Títulos</p></div>
					<div class="card-content">
						<form >
							<div class="field">
								<label>CPF</label>
								<div class="control">
									<input v-model="cpf" type="text" class="input" id="cpf-i">
								</div>
							</div>
							
							<a class="is-primary button" @click="consultar()">Consultar</a>
						</form>
						<br><br>
						<table class="table is-fullwidth is-striped">
							<thead>
								<th>ID Titulo</th><!-- 
								<th>ID Parceiro</th> -->
								<th>Valor</th>
								<th>Descrição</th><!-- 
								<th>Data Emissão</th>
								<th>Data Pagamento</th> -->
								<th>Situacão</th>
							</thead>
							<tbody>
								<tr v-for="lista in listaTitulos">
									<td>{{lista.id_titulo}}</td>
									<!-- <td>{{lista.id_paceiro}}</td> -->
									<td>{{lista.valor}}</td>	
									<td>{{lista.descricao}}</td>	
									<!-- <td>{{lista.data_emissao}}</td>	
									<td>{{lista.data_pagamento}}</td> -->
									<td>{{descricaoTitulo(lista.situacao)}}</td>						
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

</template>
<script>
export default {
	data : () => {
		return {
			cpf : '',
			listaTitulos : []
		}
	},
	methods : {
		consultar() {
			if(this.cpf !== '' && this.cpf.length >3){
				this.$http.get(api_url + 'consulta/cliente/' + this.cpf, {
						headers : {
							Authorization : localStorage.getItem('token')
						}
					})
					.then( result => {
						if(!result.body || result.body.length==0){
							alert("Nenhum titulo encontrado");
						}
						this.listaTitulos = result.body;
					})
					.catch( err => {
						this.listaTitulos = [];
					});
			} else {
				alert('CPF muito curto!');
			}
			
		},
		descricaoTitulo(situ) {
			var situ_desc;
			switch(situ){
				case 0 : situ_desc = "Cancelado"; break;
				case 1 : situ_desc = "Aberto"; break;
				case 2 : situ_desc = "Quitado"; break;
				case 3 : situ_desc = "Vencido"; break;
				default : situ_desc = "Não identificado"; break;

			}
			return situ_desc;
		}
	}
}
</script>
<style>
#cpf-i{
	width: 200px;
}
</style>