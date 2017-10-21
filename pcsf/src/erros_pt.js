module.exports = {
	error: 'Erro.',
	required: 'Campo obrigatório.',
	float: 'Valor deve ser numérico.',
	integer: 'Valor deve ser inteiro.',
	number: 'Valor deve ser numérico.',
	lessThan: 'Deve ser menor que {0}.',
	lessThanOrEqualTo: 'Deve ser menor ou igual a {0}.',
	greaterThan: 'Deve ser maior que {0}.',
	greaterThanOrEqualTo: 'Deve ser maior ou igual a {0}.',
	between: 'Deve estar entre {0} e {1}.',
	size: 'Tamanho deve ser {0}.',
	length: 'Deve ter {0} caracteres.',
	minLength: 'Deve ter ao menos {0} caracteres.',
	maxLength: 'Deve ter ao máximo {0} caracteres.',
	lengthBetween: 'Tamanho deve ser entre {0} e {1}.',
	in: 'Deve estar en {0}.',
	notIn: 'Não pode ser {0}.',
	match: 'Não combina.',
	regex: 'Formato inválido.',
	digit: 'Deve ser um digito.',
	email: 'E-mail inválido.',
	url: 'URL inválida.',
	optionCombiner: function (options) {
	if (options.length > 2) {
		options = [options.slice(0, options.length - 1).join(', '), options[options.length - 1]];
	}
		return options.join(' ou ');
	}
}