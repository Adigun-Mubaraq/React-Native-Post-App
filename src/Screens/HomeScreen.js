import { StyleSheet } from 'react-native';
import { Div, Button, Icon } from 'react-native-magnus';

export default function HomeScreen({ navigation: { navigate } }) {
  return (
    <Div row style={styles.container}>
      <Button
        block
        h={48}
        bg='green700'
        fontWeight='500'
        style={styles.blockButton}
        onPress={() => navigate("Add Post")}
        suffix={<Icon name="add-circle" position='absolute' fontFamily='Ionicons' color='white' fontSize={24} right={8} />}
      >
        Create Post
      </Button>
      <Button
        block
        h={48}
        bg='green700'
        fontWeight='500'
        style={styles.blockButton}
        onPress={() => navigate("Manage Posts")}
        suffix={<Icon name="briefcase" position='absolute' fontFamily='Ionicons' color='white' fontSize={24} right={8} />}
      >
        Manage Posts
      </Button>
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#ddd",
    padding: 40,
    flexDirection: "column",
    justifyContent: "center",
    gap: 40
  },
  blockButton: {
    backgroundColor: "#2f855a",
    color: "white",
    fontWeight: "500",
    justifyContent: "flex-start"
  }
});