import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type buttonProperties = {
    name?: string,
    tocaAi?: ()=> void,
    color: string
}

export function ButtonComponent({ name, color, tocaAi }: buttonProperties){
    return(
        <TouchableOpacity style={styles.container} onPress={tocaAi}>
            <Text style={{color: color}}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            height: 80,
            width: 80,
            backgroundColor: "green"
        },

        titleText: {
            color: 'white'
        }
    }
)