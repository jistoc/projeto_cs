<template>
		
	
		<div class="container column">
			<div class="section">

				<div class="card">
					<div class="card-header"><p class="card-header-title">Cliente</p></div>
					<div class="card-content">
						<div class="content">
							<form>
								<div class="field">
									<div class="control">
										<input class="input " type="text" placeholder="Nome Cliente" autofocus="" v-model="nome_cliente">
									</div>
								</div>
								<div class="field">
									<div class="control">
										<input class="input " type="text" placeholder="CPF" autofocus="" v-model="cpf">
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
					<div class="card-header"><p class="card-header-title">Clientes</p></div>
					<div class="card-content">
						<table class="table is-fullwidth is-striped">
							<thead>
								<th>Nome</th>
								<th>CPF</th>
								<th>Opções</th>
							</thead>
							<tbody>
								<tr v-for="cliente in listaCliente">
									<td>{{cliente.nome_cliente}}</td>
									<td>{{cliente.cpf}}</td>
									<td>
										<a class="button is-success " v-on:click="alterar(cliente)">Alterar</a>
										&nbsp;
										<a class="button is-danger " v-on:click="remover(cliente.id_cliente)">Remover</a>
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
			nome_cliente : '',
			cpf : '',
			listaCliente : [],
			op : false,
			id : ''
		}
	},
	methods : {
		cancelar(){
			this.op = !this.op;
			this.nome_cliente = '';
			this.cpf = '';

		},
		salvar() {
			if(!this.op){
				let dados = {
					cpf : this.cpf,
					nome_cliente : this.nome_cliente
				}
				this.$http.post(api_url + 'cliente', dados, {
					headers : {
						Authorization : localStorage.getItem('token')
					}
				})
				.then( result => {
					if(result.status == 200){
						this.cpf = '';
						this.nome_cliente = '';
						this.listar();
						alert("Cliente inserido com sucesso!");


					}
				})
				.catch( err => {
					
				});
			} else {
				let dados = {
					cpf : this.cpf,
					nome_cliente : this.nome_cliente
				}
				this.$http.put(api_url + 'cliente/'+this.id, dados, {
					headers : {
						Authorization : localStorage.getItem('token')
					}
				})
				.then( result => {
					if(result.status == 200){
						this.cpf = '';
						this.nome_cliente = '';
						this.listar();
						alert("Cliente alterado com sucesso!");
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
				if(err){
					console.log(err);
					alert(err.body.mensagem);
				}
			});
		},
		alterar(cliente){
			console.log(cliente)
			this.nome_cliente = cliente.nome_cliente;
			this.cpf = cliente.cpf;
			this.op = true;
			this.id = cliente.id_cliente;
		},
		remover(id){
			this.$http.delete(api_url + 'cliente/'+id, { 
				headers : {
					Authorization : localStorage.getItem('token')
				}
			})
			.then( result => {
				alert(result.body.mensagem)
				this.listar();
			})
			.catch( err => {
				
				alert(err.body.mensagem)

			});

		}
	},
	created(){
		this.listar();
	}
}
</script>
<style>
#tab{
	margin-top : -70px;
}
</style>