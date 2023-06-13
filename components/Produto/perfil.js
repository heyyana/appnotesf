import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from '../../services/connectionFirebase';

const Separator = () => {
    return <View style={styles.separator} />;
}

export default function Perfil() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [genero, setGenero] = useState('');
    const [bio, setBio] = useState('');
    const [favoritos, setFavoritos] = useState('');
    const [key, setKey] = useState('');

    //implementação dos métodos update ou insert  
    async function insertUpdate() {
        //editar dados  
        if (nome !== '' & telefone !== '' & genero !== '' & bio !== '' & favoritos !== '' & key !== '') {
            firebase.database().ref('perfil').child(key).update({
                nome: nome,
                telefone: telefone,
                genero: genero,
                bio: bio,
                favoritos: favoritos,
            })

            Keyboard.dismiss();

            alert('Perfil Cadastrado!');

            clearFields();

            setKey('');

            return;

        }



        //cadastrar dados  

        let perfil = await firebase.database().ref('perfil');

        let chave = perfil.push().key; //comando para salvar é o push  



        perfil.child(chave).set({

            nome: nome,

            telefone: telefone,

            genero: genero,

            bio: bio,

            favoritos: favoritos,

        });



        Keyboard.dismiss();



        alert('Perfil Cadastrado!');

        clearFields();



        //método para limpar os campos com valores 

        function clearFields() {

            setNome('');

            setTelefone('');

            setGenero('');

            setBio('');

            setFavoritos('');

        }

    }



    return (

        <View style={styles.container}>

            <TextInput

                placeholder='Nome'

                left={<TextInput.Icon icon="id-card" />}

                maxLength={40}

                style={styles.input}

                onChangeText={(text) => setNome(text)}

                value={nome}

            />



            <Separator />



            <TextInput

                placeholder='Genero'

                left={<TextInput.Icon icon="face-woman" />}

                style={styles.input}

                onChangeText={(text) => setGenero(text)}

                value={genero}

            />



            <Separator />



            <TextInput

                placeholder='Telefone'

                left={<TextInput.Icon icon="phone-classic" />}

                style={styles.input}

                onChangeText={(text) => setTelefone(text)}

                value={telefone}

            />



            <Separator />



            <TextInput

                placeholder='Bio'

                left={<TextInput.Icon icon="pencil-plus-outline" />}

                style={styles.input}

                onChangeText={(text) => setBio(text)}

                value={bio}

            />



            <Separator />



            <TextInput

                placeholder='Favoritos'

                left={<TextInput.Icon icon="heart" />}

                style={styles.input}

                onChangeText={(text) => setFavoritos(text)}

                value={favoritos}

            />



            <View style={styles.button}>

                <Button

                    onPress={insertUpdate}

                    title="Salvar"

                    color="#AB3C3C"

                />

            </View>

        </View>



    );



}



const styles = StyleSheet.create({

    container: {

        flex: 1,

        margin: 10,

    },



    input: {

        borderWidth: 1,

        borderColor: '#121212',

        height: 40,

        fontSize: 13,

        borderRadius: 8,

        marginBottom: 10

    },



    separator: {

        marginVertical: 5,

    },



    button: {

        flexDirection: 'column',

        alignItems: 'center',

        backgroundColor: '#AB3C3C',

        borderWidth: 0.5,

        borderColor: '#fff',

        height: 40,

        borderRadius: 5,

        margin: 5,

    },



    buttonImageIconStyle: {



        padding: 10,



        margin: 5,



        height: 25,



        width: 25,



        resizeMode: 'stretch',



    },



    buttonTextStyle: {



        color: '#fff',



        marginBottom: 4,



        marginLeft: 100,



        fontSize: 20



    },



    buttonIconSeparatorStyle: {



        backgroundColor: '#fff',



        width: 1,



        height: 20,



    },



    listar: {



        fontSize: 20,
        textAlign: 'center'
    }
});  