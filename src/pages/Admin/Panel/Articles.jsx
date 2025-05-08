import React, { useEffect, useState } from 'react';
import slugify from '../../../utils/slugifyUtils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleThunk, fetchArticles, saveArticleThunk } from '../../../redux/articleSlice';

function Articles() {
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [topicsList, setTopicsList] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTopicsIds, setSelectedTopicsIds] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { articles, count, loading, error } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(fetchArticles({ page: page, size: size }));
  }, [dispatch, page]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleShowArticle = () => {
    setShowAddArticle(!showAddArticle);
  };

  const toggleOptionsForm = (id) => {
    setOpenOptionsId(openOptionsId === id ? null : id);
  };


  const fetchTopics = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Topics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Veri alınamadı!');
      }
      const data = await response.json(); // Burada JSON verisini alıyoruz
      setTopicsList(data); // State'e veri set etme işlemi

    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleSelect = (value) => {
    const matchedTopic = topicsList.find((topic) => topic.name === value);
    if (matchedTopic && !selectedTopicsIds.includes(matchedTopic.id)) {
      setSelectedTopics([...selectedTopics, matchedTopic.name]);
      setSelectedTopicsIds([...selectedTopicsIds, matchedTopic.id]);
    }
    setInputValue('');
  };

  const handleRemove = (topicName) => {
    const matchedTopic = topicsList.find((t) => t.name === topicName);
    if (matchedTopic) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topicName));
      setSelectedTopicsIds(selectedTopicsIds.filter((id) => id !== matchedTopic.id));
    }
  };

  const saveArticle = async () => {
    const articleName = document.querySelector('input[name="articleName"]').value;
    const articleContent = document.querySelector('textarea[name="articleContent"]').value;

    dispatch(saveArticleThunk({ articleName: articleName, articleContent: articleContent, selectedTopicsIds: selectedTopicsIds }));
    setShowAddArticle(false);
    dispatch(fetchArticles({ page: page, size: size }));
  };

  const deleteArticle = async (id) => {
    dispatch(deleteArticleThunk(id));
  }

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <div className="row p-3 align-items-center justify-content-between mb-3 rounded" style={{ backgroundColor: 'grey' }}>
        <div className="col-auto">
          <h4 className="mb-0">Articles</h4>
        </div>
        <div className="col-auto">
          <button onClick={handleShowArticle} className="btn btn-light">Add</button>
        </div>
      </div>

      <div className="row">
        {articles.map((item) => (
          <div className="col-md-4 p-2" key={item.id}>
            <div className="card mb-4 shadow-sm" style={{ position: 'relative' }}>
              <img src="https://placehold.co/400" alt="" className="card-img-top" style={{ height: '200px', width: '100%' }} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                {item.content.length > 250
                  ? item.content.substring(0, 250) + '...'
                  : item.content}

                {item.topicNames?.map((topic, index) => (
                  <span key={index} className="badge bg-secondary me-1">{topic}</span>
                ))}

                {openOptionsId === item.id && (
                  <div className='card' style={{ position: 'absolute', top: '12%', right: '5%', backgroundColor: 'white', borderRadius: '16px', padding: '10px' }}>
                    <div className="action-menu" style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <button className="btn btn-primary">Edit</button>
                      <button onClick={() => deleteArticle(item.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                )}
              </div>

              <button
                className='p-2'
                onClick={() => toggleOptionsForm(item.id)}
                style={{ position: 'absolute', top: '2%', right: '5%', fontSize: '15px', cursor: 'pointer' }}>
                &#8942;
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="row navigation">
        <div className="d-flex justify-content-center">
          <p className="mx-2" style={{cursor:'pointer'}} onClick={() => setPage(page - 1)}>Before</p>
          <p className="mx-2">{page}</p>
          <p className="mx-2" style={{cursor:'pointer'}} onClick={() => setPage(page + 1)}>After</p>
        </div>
      </div>

      {showAddArticle && (
        <>
          <div className="backdrop" style={{ position: 'fixed', top: 0, left: 0, padding: '25px', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(1px)', zIndex: 999 }}></div>

          <div className="d-flex justify-content-center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <div className="card text-dark mt-3" style={{ width: '40rem' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Add Article</h5>
                  <button
                    onClick={() => setShowAddArticle(false)}
                    style={{ fontSize: '18px', color: '#fff', backgroundColor: '#dc3545', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                    aria-label="Close"
                  >
                    <span style={{ fontSize: '20px', color: '#fff' }}>×</span>
                  </button>
                </div>
                <input name='articleName' type="text" className="form-control mb-2" placeholder="Article Title" />
                <textarea name='articleContent' cols="5" className="form-control mb-2" placeholder="Article Content" style={{ height: '350px' }} />

                <label htmlFor="multiSelectInput" className="form-label">Select Topics</label>
                <input
                  list="topics"
                  className="form-control"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={() => handleSelect(inputValue)}
                  id="multiSelectInput"
                  placeholder="Type or select a topic"
                />
                <datalist id="topics">
                  {topicsList.map((topic) => (
                    <option key={topic.id} value={topic.name} />
                  ))}
                </datalist>

                <div className="mt-2 d-flex flex-wrap gap-2">
                  {selectedTopics.map((topic) => (
                    <span key={topic} className="badge bg-primary d-flex align-items-center" style={{ gap: '5px' }}>
                      {topic}
                      <button
                        type="button"
                        className="btn-close btn-close-white btn-sm"
                        aria-label="Remove"
                        onClick={() => handleRemove(topic)}
                        style={{ marginLeft: '5px' }}
                      ></button>
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <button onClick={saveArticle} className="btn btn-success">Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Articles;