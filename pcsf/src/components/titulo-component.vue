<template>
		
	
		<div class="container column">
			<div class="section">

				<div class="card">
					<div class="card-header"><p class="card-header-title">Título</p></div>
					<div class="card-content">
						<div class="content">
							<form>
								<div class="field">
									<label>Cliente</label>

									<div class="control">
										<div class="select">
											<select v-model="id_cliente"  class="select" :disabled="disabled">
												<option v-for="cliente in listaCliente" :value="cliente.id_cliente ? cliente.id_cliente : cliente.id ">{{cliente.nome_cliente}}</option>
											</select>
										</div>
									</div>
								</div>
								<div class="field" v-if="sem_parca">
									<label>ID Parceiro</label>
									<div class="control">
										<input v-model="parca" type="text" class="input">
									</div>
								</div>
								<div class="field">
									<label>Valor</label>
									<div class="control">
										<input v-model="valor" type="text" class="input">
									</div>
								</div>
								<div class="field">
									<label>Data Emissão</label>
									<div class="control">
										<input v-model="data_emissao" type="text" class="input">
									</div>
								</div>
								<div class="field">
									<label>Data Pagamento</label>
									<div class="control">
										<input v-model="data_pagamento" type="text" class="input">
									</div>
								</div>
								<div class="field">
									<label>Situação</label>
									<div class="control">
										<div class="select">
											<select v-model="situacao"  >
												<option value="1">Aberto</option>
												<option value="2">Quitado</option>
												<option value="3">Vencido</option>
												<option value="0">Cancelado</option>
											</select>
										</div>
									</div>
								</div>
								<div class="field">
									<label>Descrição</label>
									<div class="control">
										<input v-model="descricao" type="text" class="input">
									</div>
								</div>
								<a class="button is-warning" v-if="op" v-on:click="cancelar()">Cancelar</a>
								<a class="button is-info " v-on:click="salvar()">Salvar</a>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="section" id="tab">
				<div class="card">
					<div class="card-header"><p class="card-header-title">Títulos</p></div>
					<div class="card-content">
						<table class="table is-fullwidth is-striped">
							<thead>
								<th>ID Cliente</th>
								<th>ID Parceiro</th>
								<th>Valor</th>
								<th>Descrição</th>
								<th>Data Emissão</th>
								<th>Data Pagamento</th>
								<th>Situacão</th>
								<th>Opções</th>
							</thead>
							<tbody>
								<tr v-for="lista in listaTitulos">
									<td>{{lista.id_cliente}}</td>
									<td>{{lista.id_parceiro}}</td>	
									<td>{{lista.valor}}</td>	
									<td>{{lista.descricao}}</td>	
									<td>{{lista.data_emissao}}</td>	
									<td>{{lista.data_pagamento}}</td>
									<td>{{lista.situacao}}</td>	
									<td>
										<a class="button is-success " v-on:click="alterar(lista)">Alterar</a>
										&nbsp;
										<a class="button is-danger " v-on:click="remover(lista)">Remover</a>
									</td>					
								</tr>
							</tbody>
						</table>
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
			id_cliente : '',
			listaCliente : [],
			listaTitulos : [],
			valor : '',
			data_emissao : '',
			data_pagamento : '',
			situacao : '',
			descricao : '',
			op : false,
			id : '',
			disabled : false,
			sem_parca : false,
			parca : ''
		}
	},
	methods : {
		cancelar(){
			this.op = !this.op;
			this.id_cliente = '';
			this.valor = '';
			this.situacao = '';
			this.descricao = '';
			this.data_emissao = '';
			this.data_pagamento = '';
			this.disabled = false;

		},
		listar(){
			this.$http.get(api_url + 'cliente', {
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {
				this.listaCliente = result.body;
			})
			.catch( err => {
				
				this.listaCliente = [];
			});

			this.$http.get(api_url + 'titulo', {
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {
				this.listaTitulos = result.body;
			})
			.catch( err => {
				this.listaTitulos = [];
			});
		},
		salvar(){
			if(!this.op){
				var id_do_parca = this.sem_parca ? this.parca : parseInt(localStorage.getItem("id_parceiro"));
				let dados = {
					id_cliente : this.id_cliente,
					id_parceiro : id_do_parca,
					valor : this.valor,
					descricao : this.descricao,
					data_emissao : this.data_emissao,
					situacao : this.situacao
				};
				if(this.data_pagamento!==''){
					dados.data_pagamento = this.data_pagamento;
				}
				console.log(dados);
				this.$http.post(api_url + 'titulo', dados, {
					headers : {
						Authorization : localStorage.getItem('token')
					}
				})
				.then( result => {
					if(result.status == 200){
						this.id_cliente = '';
						this.valor = '';
						this.situacao = '';
						this.descricao = '';
						this.data_emissao = '';
						this.data_pagamento = '';
						this.parca = '';
						this.listar();
						alert("Titulo inserido com sucesso!");


					}
				})
				.catch( err => {
					if(err.body.mensagem)
						alert(err.body.mensagem);
					else
						alert('falha');
				});
			} else {
				let dados = {
					
					valor : this.valor,
					descricao : this.descricao,
					data_emissao : this.data_emissao,
					situacao : this.situacao
				}
				
				if(this.data_pagamento!==''){
					dados.data_pagamento = this.data_pagamento;
				}
				this.$http.put(api_url + 'titulo/'+this.id, dados, {
					headers : {
						Authorization : localStorage.getItem('token')
					}
				})
				.then( result => {
					if(result.status == 200){
						this.cpf = '';
						this.nome_cliente = '';
						this.listar();
						alert("Titulo alterado com sucesso!");
						this.cancelar();
					}
				})
				.catch( err => {
					if(err){
						alert(err.body.mensagem);
					}
				});
			}
		},
		remover(id){
			console.log(id);
			let aux = id.id_titulo ? id.id_titulo : id.id;
			console.log(aux);
			this.$http.delete(api_url + 'titulo/'+aux, { 
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {

				alert(result.body.mensagem)
				this.listar();
			})
			.catch( err => {
				this.listar();

			});

		},
		alterar(titulo){
			this.id_cliente = titulo.id_cliente;
			this.valor = titulo.valor;
			this.situacao = titulo.situacao;
			this.descricao = titulo.descricao;
			this.data_emissao = titulo.data_emissao;
			this.data_pagamento = titulo.data_pagamento;
			this.id = titulo.id_titulo ? titulo.id_titulo : titulo.id ;
			this.op = true;
			this.disabled = true;
		},
	},

	created(){
		this.listar()
		if(localStorage.getItem("id_parceiro")=='undefined' || localStorage.getItem("id_parceiro") == 'null'){
			this.sem_parca = true;
		} 
	}
}
</script>
<style>
#tab{
	margin-top : -70px;
}
</style>