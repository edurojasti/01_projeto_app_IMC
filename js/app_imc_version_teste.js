$(document).ready(()=>{
    $("#msg, #msgSucess").hide()

    let descIMC = [
        'Baixo peso, muito grave',
        'Baixo peso, grave',
        'Baixo peso',
        'Peso normal',
        'Sobrepeso',
        'Obesidade grau I',
        'Obesidade grau II',
        'Obesidade grau III'
    ]

    $("#telaRegistrosIMC").addClass("classeDisplayNONE")    
    
    // botao tela consulta
    $("#exibirHistorico").click(()=>{
       // $("#telaRegistrosIMC").toggleClass("styleTop")
       $("#telaIMC").addClass("classeDisplayNONE")
       $("#telaRegistrosIMC").removeClass("classeDisplayNONE")
       $("#telaRegistrosIMC").addClass("animated bounceInRight")

    })

    // botao para exibir voltar tela inicial
    $("#voltarTelaInicial").click(()=>{    
       $("#telaIMC").removeClass("classeDisplayNONE")
       $("#telaRegistrosIMC").addClass("classeDisplayNONE")
       $("#telaRegistrosIMC").addClass("animated bounceInRight")
       $("#telaIMC").addClass("animated bounceInLeft")
    })

    // Calculando IMC
    $("#calcIMC").click(()=>{
        //FORM DO MODAL
        let imcValor = document.getElementById('imcValor')
        let imcDesc = document.getElementById('imcDesc')

        let peso = document.getElementById("peso").value
        let altura = document.getElementById("altura").value

        if(peso == '' || peso == null || altura == '' || altura == null){
            $("#msg").show()
            $("#exibindoIMC").hide()
            $("#modalAlert").modal()
        }else{
            $("#modalAlert").modal()
            $("#msg").hide()
            $("#exibindoIMC").show()

            altura = altura / 100
            //gerando o IMC
            let imc = peso / (altura*altura)

            //exibindo dados...
                if(imc < 16){imcDesc.value = descIMC[0]}
                if(imc >= 16.00 && imc <=16.99){imcDesc.value = descIMC[1]}
                if(imc >= 17.00 && imc <=18.49){imcDesc.value = descIMC[2]}
                if(imc >= 18.50 && imc <=24.99){imcDesc.value = descIMC[3]}
                if(imc >= 25.00 && imc <=29.99){imcDesc.value = descIMC[4]}
                if(imc >= 30.00 && imc <=34.99){imcDesc.value = descIMC[5]}
                if(imc >= 35.00 && imc <=39.99){imcDesc.value = descIMC[6]}
                if(imc >= 40.00){imcDesc.value = descIMC[7]}

                imcValor.value = imc.toFixed(2)
            
            //data do dia para registrar
            let objData = new Date()
            let dia = objData.getDate()
            let mes = objData.getMonth() + 1
            let ano = objData.getFullYear()

            if(dia < 10 || mes < 10){
                dia = '0'+ dia
                mes = '0'+ mes
            }
            let fecha = `${dia}/${mes}/${ano}`

            //objeto para salvar IMC
            let salvarDados = {
                dReg : fecha,
                peso : peso,
                altura: altura,
                imc : imcValor.value,
                inf : imcDesc.value
            }

            let bdIMC = JSON.stringify(salvarDados)

            //SALVAR e PEGAR O REGISTRO DOS IMCS
            let salvar = document.getElementById("salvar")

            salvar.onclick = (()=>{
                let pegarKeyID = localStorage.getItem('keyID')
                if(pegarKeyID ==  null){
                    pegarKeyID = 1
                    localStorage.setItem('keyID', pegarKeyID)
                }
                else{
                    pegarKeyID = parseInt(pegarKeyID)
                    pegarKeyID++
                    localStorage.setItem('keyID', pegarKeyID)
                }
                console.log(pegarKeyID)
                localStorage.setItem(pegarKeyID, bdIMC)
                
                $("#msgSucess").fadeIn()
            })
         

            $("#fecharModal").click(()=>{
                $("#msgSucess").fadeOut()
                $("#peso, #altura, #imcValor, #imcDesc").val("")
            })
        }        
    })

    //RECUPERANDO OS IMCS
    $("#exibirHistorico").click(()=>{
        let xKey = localStorage.getItem('keyID')
        let listarTudo = []
        for(let i = 1; i <= xKey; i++){
            listarTudo.push(JSON.parse(localStorage.getItem(i)))
        }
        
        for(let e = 0; e < listarTudo.length; e++){
            //tbody da tabela
            let tabelaIMCS = document.getElementById('corpoTableRegistrosIMC')

            //criando a linha <tr>
            let linhaTabela =  tabelaIMCS.insertRow()
                
            //colunas
            linhaTabela.insertCell(0).innerHTML = `${listarTudo[e].dReg}`
            linhaTabela.insertCell(1).innerHTML = `${listarTudo[e].peso}`
            linhaTabela.insertCell(2).innerHTML = `${listarTudo[e].altura}`
            linhaTabela.insertCell(3).innerHTML = `${listarTudo[e].imc}`
            linhaTabela.insertCell(4).innerHTML = `${listarTudo[e].inf}`

        //     dReg : fecha,
        //     peso : peso,
        //     altura: altura,
        //     imc : imcValor.value,
        //     inf : imcDesc.value
        }
    })
})