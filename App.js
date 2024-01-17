import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('window');

const App = () => {
  const [estado, setEstado] = useState('leitura');
  const [anotacao, setAnotacao] = useState('');

  useEffect(() => {
    (async () => {
      const anotacaoArmazenada = await AsyncStorage.getItem('anotacao');
      if (anotacaoArmazenada) {
        setAnotacao(anotacaoArmazenada);
      }
    })();
  }, []);

  const salvarAnotacao = async () => {
    await AsyncStorage.setItem('anotacao', anotacao);
    setEstado('leitura');
  };

  const Header = () => (
    <View style={styles.header}>
      <StatusBar backgroundColor="#3b08c7" barStyle="light-content" />
      <Text style={styles.headerText}>Aplicativo Anotação</Text>
    </View>
  );

  if (estado === 'leitura') {
    return (
      <View style={styles.container}>
        <Header/>
        {
          (anotacao != '')?
          <View style={styles.padding}><Text style={styles.anotacao}>{anotacao}</Text></View>
          :
          <View style={styles.vazio}><Text style={styles.vazioTexto}>Nenhuma anotação encontrada :(</Text></View>
        }
        <TouchableOpacity onPress={() => setEstado('atualizar')} style={styles.btnAnotacao}>
          <Text style={styles.btnAnotacaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (estado === 'atualizar') {
    return (
      <View style={styles.container}>
        <Header />
        <TextInput 
          value={anotacao} 
          multiline={true} 
          autoFocus={true}
          onChangeText={(text) => setAnotacao(text)} 
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => setEstado('leitura')} style={styles.btnSalvar}>
          <Text style={styles.btnSalvarTexto}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  header: {
    width: '100%',
    padding: height * 0.01,
    backgroundColor: '#3b08c7'
  },
  headerText: {
    textAlign: 'center', 
    color: 'white', 
    fontSize: 18
  },
  padding: {
    padding: 20
  },
  anotacao: {
    color: 'white',
    fontSize: width * 0.03
  },
  btnAnotacao: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50, 
    height: 50,
    backgroundColor: '#3b08c7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAnotacaoTexto: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  },
  textInput: {
    textAlignVertical: 'top', 
    padding: 20, 
    height: 300,
    color: 'white'
  },
  btnSalvar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50, 
    height: 50,
    backgroundColor: '#3b08c7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnSalvarTexto: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  vazio: {
    padding: 15
  },
  vazioTexto: {
    color: 'white',
    fontSize: 16,
    opacity: 0.5
  }
});

export default App;