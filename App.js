import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './components/Header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' }
  ]);

  const pressHandler = (key) =>{
      setTodos((prevTodo) => (
        prevTodo.filter(todo => todo.key != key)
      ))
  }

  const submitHandler = (text) =>{

    if(text.length > 3){
    setTodos((prevTodo) => {
      return [
        {text : text, key: Math.random().toString()},
        ...prevTodo
      ]
    })
  }else {
    Alert.alert('OPPS!', 'Todos must be 3 chars long', [
      {text: 'Understood', onPress: ()=> console.log('alert closed')}
    ])
  }

  }


  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log('dismiss keyoboard')
    }}>
        <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList
            data={todos}
            renderItem={({item}) => (
              <TodoItem item={item} pressHandler={pressHandler}/>
            )}
            />
          </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});