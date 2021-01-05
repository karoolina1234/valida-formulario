
$('#formularioDadosPessoais').submit(function(){
    $('.btn.validar').siblings('.btn.btn-primary.dados-pessoais-btn').addClass('hidden');
    $('.btn.validar.valido').siblings('.btn.btn-primary.dados-pessoais-btn.hidden').removeClass('hidden');
})

$('#formularioDadosPessoais').submit(function(){
    $('.btn.validar').siblings('.btn.btn-primary.endereco-btn').addClass('hidden');
    $('.btn.validar.valido').siblings('.btn.btn-primary.endereco-btn.hidden').removeClass('hidden');
})
$('#formularioDadosPessoais').ready(function(){
    $('.btn.validar').siblings('.btn.btn-primary.dados-pessoais-btn').addClass('hidden');
    $('.btn.validar.valido').siblings('.btn.btn-primary.dados-pessoais-btn.hidden').removeClass('hidden');
})
$('.btn.btn-primary.dados-pessoais-btn').click(function(){
   $('.container.dados-pessoais').addClass('desativada');
   $('.container.endereco').addClass('active');
   $('.nav-item.aba-dadosPessoais .nav-link').addClass('active')
    
})

$('.btn.btn-primary.endereco-btn').click(function(){
    $('.container.endereco.active').removeClass('active')
    $('.container.complemento').addClass('active');
    $('.nav-item.aba-endereco .nav-link').addClass('active')
})

$('.vFinalizar').click(function(){
    $('.container.dados-enviados').addClass('active')
    $('.container.complemento.active').removeClass('active');
    $('.nav-item.aba-complemento .nav-link').addClass('active')
})
jQuery.validator.addMethod("cpf", function(value, element) {
   value = jQuery.trim(value);

    value = value.replace('.','');
    value = value.replace('.','');
    cpf = value.replace('-','');
    while(cpf.length < 11) cpf = "0"+ cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i=0; i<11; i++){
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
    b = 0;
    c = 11;
    for (y=0; y<10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

    return this.optional(element) || retorno;

}, "Informe um CPF válido");
jQuery.validator.addMethod('celular', function (value, element) {
    value = value.replace("(","");
    value = value.replace(")", "");
    value = value.replace("-", "");
    value = value.replace(" ", "").trim();
    if (value == '0000000000') {
        return (this.optional(element) || false);
    } else if (value == '00000000000') {
        return (this.optional(element) || false);
    }
    if (["00", "01", "02", "03", , "04", , "05", , "06", , "07", , "08", "09", "10"]
    .indexOf(value.substring(0, 2)) != -1) {
        return (this.optional(element) || false);
    }
    if (value.length < 10 || value.length > 11) {
        return (this.optional(element) || false);
    }
    if (["6", "7", "8", "9"].indexOf(value.substring(2, 3)) == -1) {
        return (this.optional(element) || false);
    }
    return (this.optional(element) || true);
}, 'Informe um número de telefone celular válido!');

$.validator.addMethod("cRequired", $.validator.methods.required,
   "campo obrigatorio");
$("#formularioDadosPessoais").validate({
    debug:true,
    rules:{
        name: {
            cRequired:true,
        },
        campo_cpf: {
          cRequired:true, 
            cpf:true,
        },
        data_nascimento: {
            cRequired: true,
            date:true,
        },
        campo_celular: {
            cRequired:true,
                celular:true
        },
        campo_email: {
            cRequired: true,
             email:true
        },
        cep: {
            cRequired:true
        },
        numero: {
            cRequired:true,
            number:true
        },
        bio: {
            cRequired:true
        },
        success: function() {
            input.addClass("valid")
            
    } 

}

});

var form = $( "#formularioDadosPessoais" );
form.validate();
$( ".validar" ).click(function() {
  if( form.valid() == true){
      $(this).addClass('valido')
  }
});


$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }
    
    //Quando o campo cep perde o foco.
    $("#cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});


var form = $( "#formularioDadosPessoais" );
form.validate();
$( ".validar" ).click(function() {
  if( form.valid() == true){
    var nome = $("#name").val();
    var cpf =$("#campo_cpf").val();
    var email = $("#campo_email").val();
    var date = $("#data_nascimento").val();
    var celular = $("#campo_celular").val();
    var cep = $("#cep").val();
    var rua = $("#rua").val();
    var numero = $("#numero").val();
    var cidade = $("#cidade").val();
    var bairro = $("#bairro").val();
    var bio = $("#bio").val();
     
    var texto = nome  +" "+ cpf+" " + email+" " + date+" " + celular+" " + cep +" "+ rua +" "+ numero +" " + bairro+" " + cidade+" " + bio;
     console.log("dados corretos "+texto);
    return true;
  }
});
