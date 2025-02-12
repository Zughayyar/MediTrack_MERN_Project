import { useState, useEffect } from 'react';
import { Layout, Menu, Input, Button, Form, Select } from 'antd';
import axios from 'axios';
import "antd/dist/reset.css"
import '../../styles/Chat.css'; 
const { Sider, Content } = Layout;
import { useOutletContext } from 'react-router-dom';
import { usePatients } from '../listData/PatientsList';

const Chat = (props) => {
    const context = useOutletContext() || {};
    const user = props.user || context.user; // Prioritize user from props

    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [newChatUser, setNewChatUser] = useState('');
    const { patients, loading: patientsLoading } = usePatients();

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/chats/user/${user._id}`, { withCredentials: true })
                .then(response => {
                    const fetchedChats = response.data.map(chat => ({
                        id: chat._id,
                        name: chat.participants.find(participant => participant._id !== user._id).name
                    }));
                    setChats(fetchedChats);
                })
                .catch(error => {
                    console.error("There was an error fetching the chats!", error);
                });
        }
    }, [user]);

    const handleSendMessage = () => {
        if (selectedChat && message) {
            // Logic to send the message
            console.log(`Message sent to ${selectedChat.name}: ${message}`);
            setMessage('');
        }
    };

    const handleStartNewChat = () => {
        if (newChatUser) {
            axios.post(
                'http://localhost:8000/api/chats/create',
                { participants: [user._id, newChatUser] },
                { withCredentials: true }
            )
            .then(response => {
                const chatData = response.data;
    
                // Ensure the response includes populated user data
                if (chatData.participants.length > 1) {
                    const otherParticipant = chatData.participants.find(p => p._id !== user._id);
                    
                    const newChat = {
                        _id: chatData._id, 
                        name: otherParticipant?.name || "New Chat" // Fallback if name isn't available
                    };
    
                    setChats([...chats, newChat]);
                    setNewChatUser('');
                }
            })
            .catch(error => {
                console.error("There was an error starting the new chat!", error);
            });
        }
    };

    const menuItems = chats.map(chat => ({
        key: chat.id,
        label: (
            <div
                onClick={() => setSelectedChat(chat)}
                className={`chat-item ${selectedChat && selectedChat.id === chat.id ? 'selected-chat' : ''}`}
                style={{ minHeight: '50px', display: 'flex', alignItems: 'center' }}
            >
                <div>
                    <div style={{ fontWeight: 'bold' }}>{chat.name}</div>
                </div>
            </div>
        )
    }));

    return (
        <Layout style={{ height: 'auto', backgroundColor: '#fff' }}> {/* Change theme to white */}
            <Sider width={300} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={menuItems}
                />
                <Form layout="inline" style={{ marginTop: '20px' }}>
                    {user && user.role === "assistant" && (
                        <>
                            <Form.Item>
                                <Select
                                    value={newChatUser}
                                    onChange={(value) => setNewChatUser(value)}
                                    placeholder="Select a patient to start chat"
                                    loading={patientsLoading}
                                    style={{ width: '200px' }}
                                >
                                    {patients.map(patient => (
                                        <Select.Option key={patient._id} value={patient._id}>
                                            {patient.firstName} {patient.lastName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleStartNewChat}>
                                    New
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#fff' }}> {/* Change theme to white */}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* Change theme to white */}
                        {selectedChat ? (
                            <div style={{ flex: 1 }}>
                                <h2>{selectedChat.name}</h2>
                                <p>{selectedChat.message}</p>
                                {/* Chat window content goes here */}
                            </div>
                        ) : (
                            <h2>Select a chat to start messaging</h2>
                        )}
                        <div style={{ minWidth: '50px', width: '100%', padding: '10px', background: '#fff', borderTop: '1px solid #e8e8e8', display: 'flex', alignItems: 'center' }}>
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onPressEnter={handleSendMessage}
                                placeholder="Type your message here..."
                                style={{ flex: 1, marginRight: '10px' }}
                            />
                            <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={handleSendMessage}>
                                Send
                            </Button>
                        </div>
                        
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Chat;