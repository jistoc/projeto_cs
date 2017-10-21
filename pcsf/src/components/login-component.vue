<template>
	<section class="hero is-success is-fullheight">
		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="column is-4 is-offset-4">
						
					<div class="box">
						<figure class="avatar">
							<img src="img/credit.png" width="150">
						</figure>
						<form>
							<div class="field">
								<div class="control">
									<input class="input is-large" type="text" placeholder="Usuário" autofocus="">
								</div>
							</div>

							<div class="field">
								<div class="control">
									<input class="input is-large" type="password" placeholder="Senha">
								</div>
							</div>
							<a class="button is-block is-info is-large">Login</a>
						</form>
					</div>
					<p class="has-text-grey">
						<router-link to='cadastro'> Cadastro</router-link> &nbsp;·&nbsp;
						<a href="../">Recuperar Senha</a> &nbsp;
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
				login : '',
				senha : ''
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