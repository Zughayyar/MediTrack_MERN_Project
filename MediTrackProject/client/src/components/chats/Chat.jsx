import React, { useState, useContext } from 'react';
import { Layout, Menu, Avatar, Input, Button } from 'antd';
import "antd/dist/reset.css"
import '../../styles/Chat.css'; 
const { Sider, Content } = Layout;
import { useOutletContext } from 'react-router-dom';

const Chat = () => {
    const { user } = useOutletContext() || {}; 
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const chats = user ? [
        { id: 1, name: `${user.firstName}`, message: 'Hello there!' },
        { id: 2, name: 'Jane Smith', message: 'How are you?' },
        { id: 3, name: 'John Doe', message: 'Hello there!' },
        { id: 4, name: 'Jane Smith', message: 'How are you?' }
        // ...more chats
    ] : [];

    const handleSendMessage = () => {
        if (selectedChat && message) {
            // Logic to send the message
            console.log(`Message sent to ${selectedChat.name}: ${message}`);
            setMessage('');
        }
    };

    const menuItems = chats.map(chat => (
        <Menu.Item 
            key={chat.id}
            onClick={() => setSelectedChat(chat)} 
            className={`chat-item ${selectedChat && selectedChat.id === chat.id ? 'selected-chat' : ''}`} 
            style={{ minHeight: '50px', display: 'flex', alignItems: 'center' }} // Increase minHeight to 100px
        >
            <div>
                <div style={{ fontWeight: 'bold' }}>{chat.name}</div>
            </div>
        </Menu.Item>
    ));

    return (
        <Layout style={{ height: '100vh', backgroundColor: '#fff' }}> {/* Change theme to white */}
            <Sider width={300} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {menuItems}
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#fff' }}> {/* Change theme to white */}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, backgroundColor: '#fff' }}> {/* Change theme to white */}
                        {selectedChat ? (
                            <div>
                                <h2>{selectedChat.name}</h2>
                                <p>{selectedChat.message}</p>
                                {/* Chat window content goes here */}
                                <div style={{ position: 'fixed', bottom: 0,minWidth: '50px', width: 'calc(60% - 300px)', padding: '10px', background: '#fff', borderTop: '1px solid #e8e8e8', display: 'flex', alignItems: 'center' }}>
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
                        ) : (
                            <h2>Select a chat to start messaging</h2>
                        )}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Chat;