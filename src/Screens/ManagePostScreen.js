import { Alert, ScrollView, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { useEffect, useState } from 'react';
import { Post } from '../models';
import { Div, Button, Icon, Text, Modal, Input } from 'react-native-magnus';


const initialPost = [];

export default function ManagePostScreen() {
    const [posts, setPosts] = useState(initialPost);
    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState({});


    async function fetchPostData() {
        try {
            const posts = await DataStore.query(Post);
            setPosts(posts)
        } catch (error) {
            console.log('Error retrieving posts', error);
            Alert.alert('Error!!!', "An Error Occured", [{
                text: "Cancel",
                onPress: () => setPosts([])
            }])
        }
    }

    useEffect(() => {
        const sub = DataStore.observe(Post).subscribe(() => fetchPostData());
        return () => {
            sub.unsubscribe();
        };
    }, []);

    useEffect(() => {
        async function fetchData() {
            await fetchPostData()
        }

        fetchData();
    }, []);

    const deletePost = async (id) => {
        const toDelete = await DataStore.query(Post, id);
        await DataStore.delete(toDelete);
        Alert.alert('Success!!!', 'Post Deleted Successfully');
    }

    const updateCurrentPost = async (data) => {
        const toUpdate = await DataStore.query(Post, data.id);
        await DataStore.save(Post.copyOf(toUpdate, item => {
            item.title = data.title,
                item.content = data.content
        }))
        Alert.alert('Success!!!', 'Post Updated Successfully', [{
            text: "Ok",
            onPress: () => setVisible(false),
        }]);
    }

    const handleModalVisibility = (postData) => {
        setVisible(true);
        setModalData({ ...postData });
    }

    const handleTextChange = (key, value) => {
        setModalData({ ...modalData, [key]: value });
    }

    return (
        <ScrollView>
            <Div flex={1} style={styles.container}>
                {posts.map(post => (
                    <Div flexDir='column' gap={16} bg='white' shadow="md" p={24} key={post.id}>
                        <Text fontWeight='bold' fontSize={24}>{post.title}</Text>
                        <Text fontSize={16} fontWeight='400'>{post.content}</Text>
                        <Div style={styles.buttonContainer}>
                            <Button block fontWeight='bold' onPress={() => handleModalVisibility(post)} suffix={<Icon name="create" position='absolute' fontFamily='Ionicons' color='white' fontSize={24} right={8} />}>Edit Post</Button>
                            <Button block fontWeight='bold' bg='red500' onPress={() => deletePost(post.id)} suffix={<Icon name="trash" position='absolute' fontFamily='Ionicons' color='white' fontSize={24} right={8} />}>Delete Post</Button>
                        </Div>
                    </Div>
                ))}
            </Div>
            <Modal bg='#ddd' h="90%" isVisible={visible}>
                <Button
                    bg="gray400"
                    h={35}
                    w={35}
                    position="absolute"
                    top={15}
                    right={15}
                    rounded="circle"
                    onPress={() => {
                        setVisible(false);
                    }}
                >
                    <Icon color="black" name="close" />
                </Button>
                <Div style={styles.modalView}>
                    <Text textAlign='center' fontWeight='bold' fontSize={32}>Edit Post</Text>
                    <Input
                        placeholder="The Post Title"
                        p={10}
                        focusBorderColor="blue700"
                        borderColor='blue700'
                        fontSize={18}
                        value={modalData.title}
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
                        value={modalData.content}
                        onChangeText={text => handleTextChange("content", text)}
                    />
                    <Button
                        block
                        h={48}
                        bg='blue700'
                        fontWeight='500'
                        onPress={() => updateCurrentPost(modalData)}
                    >
                        Update Post
                    </Button>
                </Div>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#ddd",
        padding: 20,
        flexDirection: "column",
        justifyContent: "center",
        gap: 40
    },
    buttonContainer: {
        flexDirection: "column",
        gap: 16
    },
    modalView: {
        flexDirection: "column",
        marginTop: 40,
        gap: 20,
        padding: 20,
        height: "100%"
    }
});

