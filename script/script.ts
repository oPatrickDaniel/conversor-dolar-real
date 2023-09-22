// elementos DOM
const h1Element = document.querySelector('#h1')! as HTMLElement
const dateTime = document.querySelector('#date-time')! as HTMLElement
const inputUsd = document.querySelector('#input-usd')! as HTMLInputElement
const inputBrl = document.querySelector('#input-brl')! as HTMLInputElement

fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        // dados iniciais
        let usd: number = Number(data.USDBRL.high)
        let formattedUsd: string = usd.toFixed(2)

        // preenchimento do cabeçalho
        h1Element.innerText = `${formattedUsd} Real Brasileiro`
        dateTime.innerText = data.USDBRL.create_date;

        // estado inicial dos inputs
        inputUsd.value = '1'
        inputBrl.value = formattedUsd

        // atualizando os inputs; modificações no primeiro input modificam o segundo e vice versa
        inputUsd.addEventListener('input', () => {
            inputBrl.value = (Number(inputUsd.value) * usd).toFixed(2)
        })

        inputBrl.addEventListener('input', () => {
            inputUsd.value = (Number(inputBrl.value) / usd).toFixed(2)
        })
    })
