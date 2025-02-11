import React, { useState } from 'react';
import { Layout, Menu, List, Avatar, Select, Input, Button } from 'antd';
import "antd/dist/reset.css"

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const Chat = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const chats = [
        { id: 1, name: 'John Doe', message: 'Hello there!' },
        { id: 2, name: 'Jane Smith', message: 'How are you?' },
        // ...more chats
    ];

    const handleSendMessage = () => {
        if (selectedChat && message) {
            // Logic to send the message
            console.log(`Message sent to ${selectedChat.name}: ${message}`);
            setMessage('');
        }
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={300} className="site-layout-background">
                <Select
                    placeholder="Select a chat"
                    style={{ margin: '16px', width: 'calc(100% - 32px)' }}
                    onChange={(value) => setSelectedChat(chats.find(chat => chat.id === value))}
                >
                    {chats.map(chat => (
                        <Option key={chat.id} value={chat.id}>
                            {chat.name}
                        </Option>
                    ))}
                </Select>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={chats}
                        renderItem={chat => (
                            <List.Item onClick={() => setSelectedChat(chat)}>
                                <List.Item.Meta
                                    avatar={<Avatar>{chat.name[0]}</Avatar>}
                                    title={chat.name}
                                    description={chat.message}
                                />
                            </List.Item>
                        )}
                    />
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {selectedChat ? (
                            <div>
                                <h2>{selectedChat.name}</h2>
                                <p>{selectedChat.message}</p>
                                {/* Chat window content goes here */}
                                <div style={{ position: 'fixed', bottom: 0, width: 'calc(95% - 300px)', padding: '10px', background: '#fff', borderTop: '1px solid #e8e8e8', display: 'flex', alignItems: 'center' }}>
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