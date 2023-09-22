const url = "https://economia.awesomeapi.com.br/last/USD-BRL"
const h1Element = document.querySelector('#h1')! as HTMLElement
const dateTime = document.querySelector('#date-time')! as HTMLElement
const inputUsd = document.querySelector('#input-usd')! as HTMLInputElement
const inputBrl = document.querySelector('#input-brl')! as HTMLInputElement

fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((data) => {

        let usd = Number(data.USDBRL.high)
        let brl = Number(inputBrl.value) * usd

        let decimalUsd = String(usd).split('.')
        let decimalBrl = String(brl).split('.')

        let formattedUsd = (): string => {
            if (decimalUsd.length === 1) {
                return `${decimalUsd[0]},00`
                console.log(0)
            } else {
                return `${decimalUsd[0]},${decimalUsd[1].padEnd(2, '0')}`
                console.log(1)
            }
        }

        let formattedBrl = (): string => {
            if (decimalBrl.length === 1) {
                return `${decimalBrl[0]},00`
                console.log(0)
            } else {
                return `${decimalBrl[0]},${decimalBrl[1].padEnd(2, '0')}`
                console.log(1)
            }
        }

        // preenchimento do cabeçalho
        h1Element.innerText = `${formattedUsd()} Real Brasileiro`
        dateTime.innerText = data.USDBRL.create_date;

        // estado inicial dos inputs
        inputUsd.value = '1'
        inputBrl.value = formattedBrl()

        // atualizando os inputs; modificações no primeiro input modificam o segundo e vice versa
        inputUsd.addEventListener('input', () => {
            inputBrl.value = formattedBrl()
        })

        inputBrl.addEventListener('input', () => {
            inputUsd.value = formattedUsd()
        })

    })

