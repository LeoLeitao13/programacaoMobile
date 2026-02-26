import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  const [display, setDisplay] = useState<string>("");

  function handlePress(valor: string) {
    setDisplay((prev) => prev + valor);
  }

  function calcular() {
    try {
      const resultado = eval(display);
      setDisplay(String(resultado));
    } catch {
      setDisplay("Erro");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display || "0"}</Text>

      <View style={styles.grid}>
        {["7","8","9","/","4","5","6","*","1","2","3","-","0","=","+"].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.botao}
            onPress={() => {
              if (item === "=") calcular();
              else handlePress(item);
            }}
          >
            <Text style={styles.textoBotao}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  display: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: "right",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  botao: {
    width: "22%",
    backgroundColor: "#d9d9d9",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: "bold",
  },
});