import React, { useEffect, useState } from 'react';
import { database } from '../../../firebase'; // Firebase yapılandırma dosyasını buraya ekleyin
import { ref, onValue, push, set } from 'firebase/database';

function Messages() {
    const [messages, setMessages] = useState({});
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        if (currentUserId && messages[currentUserId]) {
            setSelectedMessage(messages[currentUserId]);
        }
    }, [messages, currentUserId]);

    // Firebase'den mesajları gerçek zamanlı olarak dinleme
    useEffect(() => {
        const messagesRef = ref(database, "messages");
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messagesByUser = {};

                // Mesajları userId'ye göre grupla
                Object.keys(data).forEach((user) => {
                    Object.keys(data[user]).forEach((messageId) => {
                        const message = data[user][messageId];
                        if (!messagesByUser[user]) {
                            messagesByUser[user] = [];
                        }

                        messagesByUser[user].push({
                            ...message,
                            id: messageId,
                        });
                    });
                });

                setMessages(messagesByUser);
            } else {
                setMessages({});
            }
        });

        // Cleanup (onValue dinleyicisini durdurma) - component unmount olduğunda
        return () => unsubscribe();
    }, []);

    // Mesaj detayını seçme
    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        console.log(`Selected message: ${JSON.stringify(message)}`);
    };

    const replyMessage = () => {
        const replyText = document.getElementById('reply').value;

        // Eğer replyText ve currentUserId mevcutsa
        if (replyText && currentUserId) {
            const messagesRef = ref(database, `messages/${currentUserId}`);
            const newMessageRef = push(messagesRef);

            set(newMessageRef, {
                text: replyText,
                timestamp: new Date().toISOString(), // Mesajın gönderilme zamanı
                userId: 1, // Admin ID'sini burada kullanabilirsiniz
            });

            // Mesaj kutusunu temizle
            document.getElementById('reply').value = '';
        }
    };

    return (
        <>
            <div style={{ minHeight: '600px' }}>
                <div className="row">
                    <div className="col-md-2">
                        <h4>Messages</h4>
                        <ul className="list-group">
                            {Object.keys(messages).length > 0 ? (
                                Object.keys(messages).map((userId) => (
                                    <div key={userId}>
                                        <li className="mb-2">
                                            <div className="card">
                                                <h5 onClick={() => {
                                                    handleMessageClick(messages[userId]);
                                                    setCurrentUserId(userId);
                                                }}>User ID: {userId}</h5>
                                            </div>
                                        </li>
                                    </div>
                                ))
                            ) : (
                                <li className="list-group-item">No messages found</li>
                            )}
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <h4>Message Details</h4>
                        <div className="card">
                            <div className="card-body">
                                {selectedMessage ? (
                                    <div
                                        style={{
                                            minHeight: '550px',
                                            backgroundColor: '#f8f9fa',
                                            padding: '20px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        {selectedMessage.map((message) => (
                                            <li
                                                key={message.id}
                                                className="list-group-item border-0"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: message.userId === 1 ? 'flex-end' : 'flex-start',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor: message.userId === 1 ? '#d1e7dd' : '#e9ecef',
                                                        padding: '10px 15px',
                                                        borderRadius: '15px',
                                                        maxWidth: '60%',
                                                        whiteSpace: 'pre-wrap',
                                                    }}
                                                >
                                                    {message.text}
                                                </div>
                                            </li>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No message selected</p>
                                )}
                                <div className="d-flex mt-2">
                                    <textarea className="form-control" id="reply" rows="2"></textarea>
                                    <label onClick={replyMessage} className="mx-2 my-auto" htmlFor="reply">
                                        Reply
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messages;
