
const h1 = document.getElementById("h1");
const data_hora = document.getElementById("data_hora");
const inputs = document.getElementsByClassName("inputs");
const url = "https://economia.awesomeapi.com.br/last/USD-BRL";

fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {

        function dolar_atual() {
            let dolar = parseFloat(data.USDBRL.high);
            let dolar_formatado = dolar.toFixed(2);
            let partes = dolar_formatado.split(".");

            if (partes.length === 1) {
                return partes[0] + ".00";
            } else {
                return partes[0] + "." + partes[1].padEnd(2, "0");
            }
        }

        // preenchimento do cabeçalho
        h1.innerText = dolar_atual() + " Real Brasileiro";
        data_hora.innerText = data.USDBRL.create_date;

        // inputs: estado inicial do segundo input
        let valor_moeda2 = (inputs[0].value * dolar_atual()).toFixed(2);
        let partes = valor_moeda2.split(".");

        // formatando valor para o padrão moeda(1,99)
        if (partes.length === 1) {
            inputs[1].value = partes[0] + ".00";
        } else {
            inputs[1].value = partes[0] + "." + partes[1].padEnd(2, "0");
        }

        // evento do primeiro input(modifica o segundo input)
        inputs[0].addEventListener("input", () => {
            let valor_moeda2 = (inputs[0].value * dolar_atual()).toFixed(2);
            let partes = valor_moeda2.split(".");

            // formatando valor para o padrão moeda(1,99)
            if (partes.length === 1) {
                inputs[1].value = partes[0] + ".00";
            } else {
                inputs[1].value = partes[0] + "." + partes[1].padEnd(2, "0");
            }
        })

        // evento do segundo input(modifica o primeiro input)
        inputs[1].addEventListener("input", () => {
            let valor_moeda1 = (inputs[1].value / dolar_atual()).toFixed(2);
            let partes = valor_moeda1.split(".");

            // formatando valor para o padrão moeda(1,99)
            if (partes.length === 1) {
                inputs[0].value = partes[0] + ".00";
            } else {
                inputs[0].value = partes[0] + "." + partes[1].padEnd(2, "0");
            }
        })
    })