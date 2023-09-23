// elementos DOM
const h1Element = document.querySelector('#h1')! as HTMLElement
const dateElement = document.querySelector('#date-time')! as HTMLElement
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

        // formatação data e hora
        let date = new Date(data.USDBRL.create_date)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        let hour = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()

        // Para formatar a data de volta para uma string:
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

        // preenchimento do cabeçalho
        h1Element.innerText = `${formattedUsd} Real Brasileiro`
        dateElement.innerText = dateString

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
