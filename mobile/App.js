import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Cabecalho from "./src/components/Cabecalho";
import Creditos from "./src/components/Creditos";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.tela}>
        <StatusBar style="light" />
        <Cabecalho />
        <View style={styles.conteudo} />
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#141414",
  },
  conteudo: {
    flex: 1,
  },
});
