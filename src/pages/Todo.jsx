import React, { useState } from "react";
import Header from '../components/Header'

const Todo = () => {

    // Input için state
    //const [inputValue, setInputValue] = useState("");
    // Todo listesi için state
    const [todos, setTodos] = useState([]);


    const [inputValue, setInputValue] = useState('');
    const [cardContent, setCardContent] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    // Input değeri değiştiğinde çağrılacak fonksiyon
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Space tuşuna basıldığında metni card olarak eklemek
    const handleKeyPress = (e) => {
        if (e.key === ' ' && inputValue.trim() !== '') { // Space tuşuna basıldığında
            setCardContent(inputValue); // Card içerisine ekle
            //setIsDisabled(true); // Input'u disabled yap
            setInputValue(''); // Input'u temizle
        }
    };

    // Input değeri değiştiğinde çağrılacak fonksiyon


    // Ekle butonuna tıklandığında çağrılacak fonksiyon
    const addTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos([...todos, inputValue]);  // Yeni todo'yu listeye ekle
            setInputValue("");  // Input alanını temizle
        }
    };

    return (
        <div>
            <Header />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 d-flex align-items-center justify-content-center flex-column flex-md-row mt-4">
                        {/* Input alanı */}
                        <input
                            type="text"
                            className="form-control w-75 w-md-50 mb-2 mb-md-0 me-md-2"
                            placeholder="Enter an event..."
                            value={inputValue}  // Input'un değeri state'e bağlı
                            onChange={handleInputChange}  // Değişiklikleri yakala
                            style={{ border: '2px solid #000', borderRadius: '8px' }}
                        />
                        {/* Button */}
                        <button
                            className="btn btn-primary w-25 w-md-auto p-2"
                            onClick={addTodo}  // Butona tıklanında addTodo fonksiyonunu çağır
                        >
                            Ekle
                        </button>
                    </div>
                </div>

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-center flex-column">
                                {/* Input Alanı */}
                                <input
                                    type="text"
                                    className="form-control w-75 mb-3"
                                    placeholder="Enter text and press space"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress} // Space tuşunu dinliyoruz
                                />

                                {/* Todo Listesi ve Card'lar */}
                                {todos.length > 0 && (
                                    <div className="w-75">
                                        {todos.map((todo, index) => (
                                            <div key={index} className="card mb-2 shadow-sm">
                                                <div className="card-body">
                                                    <p>{todo}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Todo listesi */}

                <div className="row">
                    <div className="mt-4 mx-auto justify-content-center col-12 col-md-8">
                        <h3 className="text-center mb-3">Todo List</h3>
                        <ul className="list-group">
                            {todos.map((todo, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded"
                                    style={{ backgroundColor: '#f8f9fa' }}
                                >
                                    <span>{todo}</span>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Sil
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );

}

export default Todo
