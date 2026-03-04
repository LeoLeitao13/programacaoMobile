import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {

  const [display, setDisplay] = useState<string>("0");
  const [numeroAnterior, setNumeroAnterior] = useState<number | null>(null);
  const [operador, setOperador] = useState<string | null>(null);

  function pressionarNumero(valor: string) {
    if (display === "0") {
      setDisplay(valor);
    } else {
      setDisplay(display + valor);
    }
  }

  function pressionarOperador(op: string) {
    setNumeroAnterior(Number(display));
    setOperador(op);
    setDisplay("0");
  }

  function limpar() {
    setDisplay("0");
    setNumeroAnterior(null);
    setOperador(null);
  }

  function calcular() {

    if (numeroAnterior === null || operador === null) return;

    const numeroAtual = Number(display);
    let resultado = 0;

    switch (operador) {
      case "+":
        resultado = numeroAnterior + numeroAtual;
        break;

      case "-":
        resultado = numeroAnterior - numeroAtual;
        break;

      case "*":
        resultado = numeroAnterior * numeroAtual;
        break;

      case "/":
        resultado = numeroAnterior / numeroAtual;
        break;

      default:
        return;
    }

    setDisplay(String(resultado));
    setNumeroAnterior(null);
    setOperador(null);
  }

  function tratarEntrada(valor: string) {

    if (!isNaN(Number(valor))) {
      pressionarNumero(valor);
      return;
    }

    switch (valor) {
      case "C":
        limpar();
        break;

      case "=":
        calcular();
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        pressionarOperador(valor);
        break;
    }
  }

  const botoes = [
    "C","/","*","-",
    "7","8","9","+",
    "4","5","6","=",
    "1","2","3","0"
  ];

  return (
    <View style={styles.container}>

      <View style={styles.calculadora}>

        <Text style={styles.display}>{display}</Text>

        <View style={styles.grid}>
          {botoes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.botao}
              onPress={() => tratarEntrada(item)}
            >
              <Text style={styles.textoBotao}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },

  calculadora: {
    width: "80%",
    maxWidth: 320,
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 20,
  },

  display: {
    fontSize: 44,
    textAlign: "right",
    color: "#fff",
    padding: 15,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  botao: {
    width: "23%",
    height: 65,
    backgroundColor: "#bfbfbf",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 12,
  },

  textoBotao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },

});