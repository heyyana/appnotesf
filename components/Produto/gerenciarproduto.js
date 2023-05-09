import React, { useState, useEffect, useRef } from 'react'; 

import { 

    View, Text, StyleSheet, 

    TouchableOpacity, Keyboard, FlatList, ActivityIndicator 

} from 'react-native'; 

import { TextInput } from 'react-native-paper'; 

export default function GerenciarProdutos() {  

  const [name, setName] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [comment, setComment] = useState(''); 
  const [stars, setStars] = useState(''); 
  const [key, setKey] = useState(''); 

  return ( 

    <View style={styles.container}> 

        <TextInput 

            placeholder='Nome' 

            left={<TextInput.Icon icon="name" />} 

            maxLength={40} 

            style={styles.input} 

            onChangeText={(texto) => setName(texto)} 

            value={name} 

        /> 

        <TextInput 

            placeholder='Categoria' 

            left={<TextInput.Icon icon="category" />} 

            style={styles.input} 

            onChangeText={(texto) => setBrand(texto)} 

            value={brand} 

        /> 

        <TextInput 

            placeholder='Comentário' 

            left={<TextInput.Icon icon="comment" />} 

            style={styles.input} 

            onChangeText={(texto) => setPrice(texto)} 

            value={price} 

        /> 

        <TextInput 

            placeholder='Estrelas' 

            left={<TextInput.Icon icon="stars" />} 

            style={styles.input} 

            onChangeText={(texto) => setColor(texto)} 

            value={color} 

        />                  

    </View> 

); 

} 

