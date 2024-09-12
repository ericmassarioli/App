const { select, input , checkbox} = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3L de água por dia",
    checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )    
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar e ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas]
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return
    }
    // forEach é para cada um
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Metas finalizadas")
}
// sempre que usamos o await na função temos que usar o async
// assincrona é porque as informações podem aguardar uma resposta por exemplo 
const start = async() => {
    let count = 0
    while(true){
        
        // await faz esperar a selecao do usuario
        // await é uma promessa - que deve voltar uma resposta
        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(option) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()
