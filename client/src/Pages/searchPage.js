import React ,{useState, useEffect} from 'react'
import { FilmCard } from '../Components/filmCard';
import { Form } from '../Form/form';

export function SearchPage() {
  const [data, setData] = useState([{ }]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/api").then(
      res =>  res.json()
        ).then(data => {
      setData(data)
    }
    )
  }, [])

  const handleFormChange = (inputValue) => {
    setUsername(inputValue);
  }

  const handleFormSubmit = (e) => {
    setLoading(true);
    fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ content:username }),
        headers: { "Content-Type": "application/json; charset = UTF-8" },
    }).then(res => res.json()).then(data => {
        setLoading(false);
        setData(data)
      })
}


  return (
    <div id="searchPage">
      <Form userInput={ username } onFormChange={ handleFormChange } onFormSubmit={ handleFormSubmit } />
      {loading ? <img id="loading" alt='loadingGif' src={require('../Images/spinner.gif')}></img> : <FilmCard movie={ data }/>}
    </div>
  )
}

