import './app.scss';
import { useEffect, useState } from 'react';

function App() {
  //store users searched
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    results: []
  });
  const {results} = data;

  const [searchData, setSearchData] = useState('');


  useEffect(() => {
    // fetch('https://randomuser.me/api/?inc=name,picture&results=50')
    // .then(data =>  data.json())
    // .then(data => setData(data))
    // .catch(err => console.log(err))

    //IIFE
    (async() => {
        const rawData = await fetch('https://randomuser.me/api/?inc=name,picture&results=60');
        const data = await rawData.json();
        setData(data);
    })();
      
  },[])

  useEffect(() => {
      const newUsers = results?.filter( user => {
        const fullName = `${user.name.title}${user.name.first}${user.name.last}`
        if(fullName.toLowerCase().includes(searchData)) {
          return true;
        }
        return false;
      });
      setUsers(newUsers);
  }, [searchData])

  return (
    <div id="app">
    <h1>List of users</h1>

    <div className="container">
    <input id="filter" 
        className="form-control mb-3 form-control-lg" 
        placeholder="Type to filer..."
        onChange={ event => {
          setSearchData(event.target.value.toLowerCase());
        }}
     />      
      <div className="users row">
        {          
          (users || results)?.map((item, index) => {
            const finalname = `${item.name.title} ${item.name.first} ${item.name.last}`;
            return <div className="col-2 user" key={`item-${index}`}>
                <img src={item.picture.thumbnail} 
                    alt={finalname}/>
                <h3>{finalname}</h3>
                {/* <button
                    onClick={async() => console.log('hello')}
                >
                  Show me
                </button> */}
             </div>
          })
        }

      </div>
    </div>
  </div>
  );
}

export default App;
