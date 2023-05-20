import { Alert, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { useState } from 'react';
import { Post, PostStatus } from '../models';
import { Div, Button, Input } from 'react-native-magnus';

const initialPostState = {
    title: "",
    content: "",
    rating: Math.floor(Math.random() * (5 - 0 + 1)) + 0,
    status: PostStatus.ACTIVE
}

export default function CreatePostScreen({ navigation: { navigate } }) {
    const [postData, setPostData] = useState(initialPostState);
    const [isLoading, setIsLoading] = useState(false);
    const isButtonDisabled = !postData.title || !postData.content;

    const handleTextChange = (key, value) => {
        setPostData({ ...postData, [key]: value });
    }

    const cleanupPostData = () => {
        setIsLoading(false);
        setPostData(initialPostState);
    }

    const createNewPost = async () => {
        console.log("Post to submit:", postData);
        setIsLoading(true);
        try {
            const _post = await DataStore.save(
                new Post({
                    ...postData,
                })
            );
            console.log("Post Created Successfully:", _post);
            setPostData(initialPostState);
            Alert.alert('Success!!!', 'Post Created Successfully', [{
                text: "View Post",
                onPress: () => navigate("Manage Posts"),
            }])
        } catch (err) {
            console.log("error creating post:", err);
            Alert.alert('Error!!!', "An Error Occured", [{
                text: "Cancel",
                onPress: () => setPostData(initialPostState)
            }])
        } finally {
            cleanupPostData();
        }
    }

    return (
        <Div row style={styles.container}>
            <Input
                placeholder="The Post Title"
                p={10}
                focusBorderColor="blue700"
                borderColor='blue700'
                fontSize={18}
                cvalue={postData.title}
                onChangeText={text => handleTextChange("title", text)}
            />
            <Input
                placeholder="Enter The Post Description"
                multiline
                numberOfLines={6}
                fontSize={18}
                p={10}
                textAlignVertical='top'
                focusBorderColor="blue700"
                borderColor='blue700'
                value={postData.content}
                onChangeText={text => handleTextChange("content", text)}
            />
            <Button
                block
                h={48}
                bg='blue700'
                fontWeight='500'
                onPress={() => createNewPost()}
                disabled={isButtonDisabled}
                loading={isLoading}
            >
                Create Post
            </Button>
        </Div>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#ddd",
        padding: 20,
        flexDirection: "column",
        justifyContent: "center",
        gap: 32
    },
    blockButton: {
        backgroundColor: "#2f855a",
        color: "white",
        fontWeight: "500",
        justifyContent: "flex-start"
    },
    suffixIcons: {
        right: 8,
        fontSize: 24,
        color: "#fff"
    },
    textField: {
        backgroundColor: '#ddd',
        marginBottom: 30,
        borderRadius: 27,
        padding: 10,
        fontSize: 18
    }
});

