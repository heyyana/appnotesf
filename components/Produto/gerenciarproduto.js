import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../../services/connectionFirebase';
import Listagem from './listagem';

const Separator = () => {
    return <View style={styles.separator} />;
}

export default function GerenciarProdutos() {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [cor, setCor] = useState('');
    const [key, setKey] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        async function search() {
            await firebase.database().ref('produtos').on('value', (snapshot) => {
                setProdutos([]);
                snapshot.forEach((chilItem) => {
                    let data = {
                        //de acordo com a chave de cada item busca os valores 
                        //cadastrados na relação e atribui nos dados 
                        key: chilItem.key,
                        nome: chilItem.val().nome,
                        marca: chilItem.val().marca,
                        preco: chilItem.val().preco,
                        cor: chilItem.val().cor,
                    };
                    setProdutos(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
            })
        }
        search();
    }, []);

    //implementação dos métodos update ou insert 
    async function insertUpdate() {
        //editar dados 
        if (nome !== '' & marca !== '' & cor !== '' & preco !== '' & key !== '') {
            firebase.database().ref('produtos').child(key).update({
                nome: nome, marca: marca, cor: cor, preco: preco
            })
            Keyboard.dismiss();
            alert('Produto Editado!');
            clearFields();
            setKey('');
            return;
        }

        //cadastrar dados 
        let produtos = await firebase.database().ref('produtos');
        let chave = produtos.push().key; //comando para salvar é o push 
        produtos.child(chave).set({
            nome: nome,
            marca: marca,
            preco: preco,
            cor: cor
        });
        Keyboard.dismiss(); //para o teclado do celular não subir e atrapalhar.
        alert('Produto Cadastrado!');
        clearFields();
    }

    // método para limpar os campos com valores
    function clearFields() {
        setNome('');
        setMarca('');
        setPreco('');
        setCor('');
    }

    //função para excluir um item  
    function handleDelete(key) {
        firebase.database().ref('produtos').child(key).remove()
            .then(() => {
                //todos os itens que forem diferentes daquele que foi deletado 
                //serão atribuidos no array 
                const findProdutos = produtos.filter(item => item.key !== key)
                setProdutos(findProdutos)
            })
    }

    //função para editar  
    function handleEdit(data) {
        setKey(data.key),
            setNome(data.nome),
            setMarca(data.marca),
            setPreco(data.preco),
            setCor(data.cor)
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Nome'
                left={<TextInput.Icon icon="file-video" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(text) => setNome(text)}
                value={nome}
                ref={inputRef} 
            />

            <Separator />

            <TextInput

                placeholder='Resenha'
                left={<TextInput.Icon icon="read" />}
                style={styles.input}
                onChangeText={(text) => setMarca(text)}
                value={marca}
                ref={inputRef} 
            />

            <Separator />

            <TextInput
                placeholder='Pontuação'
                left={<TextInput.Icon icon="star" />}
                style={styles.input}
                onChangeText={(text) => setPreco(text)}
                value={preco}
                ref={inputRef} 
            />

            <Separator />

            <TextInput
                placeholder='Favoritar'
                left={<TextInput.Icon icon="heart" />}
                style={styles.input}
                onChangeText={(text) => setCor(text)}
                value={cor}
                ref={inputRef} 
            />

            <View style={styles.button}>
                <Button
                    onPress={insertUpdate}
                    title="Salvar"
                    color="#AB3C3C"
                />
            </View>

            <View>
                <Text style={styles.listar}>Listagem de Produtos</Text>
            </View>

            {loading ?
                (
                    <ActivityIndicator color="#121212" size={45} />
                ) :
                (
                    <FlatList
                        keyExtractor={item => item.key}
                        data={produtos}
                        renderItem={({ item }) => (
                            <Listagem data={item} deleteItem={handleDelete}
                                editItem={handleEdit} />
                        )}
                    />
                )
            }
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