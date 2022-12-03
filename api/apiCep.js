//consulta CEP

$("#cep").blur(function () {

    let cep = this.value.replace(/[^0-9]/, "");

    if (cep.length != 8) {
        return false;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;
    $.getJSON(url, function (response) {
        try {
            $("#rua").val(response.logradouro);
            $("#bairro").val(response.bairro);
            $("#uf").val(response.uf);
            $("#municipio").val(response.localidade);
        } catch (err) {
            //CEP não Encontrado.
            alert("CEP não encontrado.");

        }
    });
});
