import { Button, Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import React from 'react';


class TelaPrincipal extends React.Component {
  render() {
  return (
    <View style={styles.container}>      
      <Image style ={styles.logo}
      source={require('../../assets/NOTESF.png')} />      
      <Text style={styles.paragraph}>        
        Sua agenda de filmes e séries.
      </Text>      
      <SafeAreaView>        
      <Button 
          onPress={() =>this.props.navigation.navigate('Login')}
          title="Entre"
          color="#B8860B"
         />        <hr/>        
         <Button onPress={'onPressLearnMore'}
          title="Ajuda"
          color="#DAA520"
        />      </SafeAreaView>    </View>  );
  }
}
    const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#000000',
     padding: 8,
    },
    paragraph: {
     margin: 24,
     fontSize: 18,
     color: '#FFFFFF',
     fontWeight: 'bold',
     textAlign: 'center',
    },

    
  logo:{
    width: 300,
    height: 400,
  },
});

export default TelaPrincipal;


