$(document).ready(()=>{
    // $("#telaIMC").css('animated fadeIn')
    //pegando os dados do dia atual
    let pegarDate = new Date()
    let diaAtual = pegarDate.getDate()
    let mes = pegarDate.getMonth() + 1
    let ano = pegarDate.getUTCFullYear()

    if(mes < 10){ mes = '0'+ mes}
    let dataAtual = diaAtual + '/' + mes + '/' + ano

    // console.log(dataAtual)

    $("#telaRegistrosIMC").addClass("classeDisplayNONE")
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

    // objeto IMC
    class Imc{
        constructor(peso, altura){
            this.peso = peso
            this.altura = altura
            this.desc = null
            this.dataRegistro = dataAtual
        }

        calcularIMC(){
            let valorIMC = 0
            let descx = null
            valorIMC = this.peso / (this.altura * this.altura)
            valorIMC = valorIMC.toFixed(2)
            
            if(valorIMC < 16){this.desc = descIMC[0]}
            if(valorIMC >= 16.00 && valorIMC <=16.99){this.desc = descIMC[1]}
            if(valorIMC >= 17.00 && valorIMC <=18.49){this.desc = descIMC[2]}
            if(valorIMC >= 18.50 && valorIMC <=24.99){this.desc = descIMC[3]}
            if(valorIMC >= 25.00 && valorIMC <=29.99){this.desc = descIMC[4]}
            if(valorIMC >= 30.00 && valorIMC <=34.99){this.desc = descIMC[5]}
            if(valorIMC >= 35.00 && valorIMC <=39.99){this.desc = descIMC[6]}
            if(valorIMC >= 40.00){this.desc = descIMC[7]}
            
            descx = this.desc

            let arrayDados = [valorIMC , descx]

            return arrayDados
        }

        pegarID(){
            // let valueKey = 0
            let valueKey = localStorage.getItem('numerosKEY')

            if(valueKey == undefined){
                valueKey = 0
            }
            else{
                valueKey = parseInt(valueKey)
            }

            return valueKey + 1
        }

        saveIMC(x){
            let idAtual = this.pegarID()

            // setando ID
            localStorage.setItem('numerosKEY', idAtual)

            //setando elementos
            localStorage.setItem(idAtual, x)
        }

        getIMC(){
            let valorID = localStorage.getItem('numerosKEY')
            console.log(valorID)

            let arrayIMC = []
            for(var i = 1; i <= valorID; i++){
                var itemIMC = JSON.parse(localStorage.getItem(i))
                arrayIMC.push(itemIMC)
            }
            return arrayIMC
        }
    }

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
    
    //limpar os campos
    $("#limpar").click(()=>{
        let vPeso = $("#peso").val('')
        let vAltura = $("#altura").val('')
    })

    //calcular o IMC
    $("#calcIMC").click(()=>{
        let vPeso = $("#peso").val().replace(",", ".")
        let vAltura = $("#altura").val().replace(",", ".")
        
        if(vAltura == "" || vPeso == ""){
            $("#msg").text('Verifique os campos não preenchidos!')
            $("#descricaoIMC").text(' ')
            $("#salvar").hide()
            $("#modalAlert").modal()
            return false
        }

        vPeso = parseFloat(vPeso)
        vAltura = parseFloat(vAltura)

        if(vPeso > 200){
            $("#msg").text("Peso exagerado!")
            $("#modalAlert").modal()
            $("#salvar").hide()
        }

        else if(vAltura > 300){
            $("#msg").text("Altura exagerada!")
            $("#modalAlert").modal()
            $("#salvar").hide()
        }

        else{
            $("#salvar").show()
            vAltura = vAltura / 100
        }
        
            let calc = new Imc(vPeso, vAltura)
            let resultado = calc.calcularIMC()
            // let x = JSON.stringify(calc)

            $("#msg").text("Seu IMC é: " + resultado[0])
            $("#descricaoIMC").text(`Descrição: ${resultado[1]}`)
            
            // console.log(calc)
            // console.log(x)

            $("#modalAlert").modal()
            vPeso = $("#peso").val(' ')
            vAltura = $("#altura").val(' ')

            //salvando no LocalStorage
            $("#salvar").click(()=>{
                calc.saveIMC(JSON.stringify(calc))
                console.log(calc)
                // console.log(x)
            })
    })


    // criando o card de Consulta de IMC



    //pegando os dados e salvando
    $("#exibirHistorico").click(()=>{
        let pegarHistorico = new Imc()
        console.log(pegarHistorico.getIMC())
    })

})