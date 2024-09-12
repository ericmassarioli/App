const { select, input } = require('@inquirer/prompts')

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
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()
