/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [mode, setmode] = useState("light")
  const [Url, setUrl] = useState("");
  const [urldata, seturldata] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    rating: "",
    reviews_count: '',

  })
  const toggleMode = () => {
    if (mode === "light") {
      setmode("dark")
      document.body.style.backgroundColor = "#042743";
    }
    else {
      setmode("light")
      document.body.style.backgroundColor = "white"
    }
  }
  const onchange = (e) => {
    setUrl(e.target.value)

  }
  const submit = async (e) => {

    e.preventDefault();
    setUrl('');
    try {
      const response = await fetch("http://localhost:5000/api/data/getdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('scrap')
        },
        body: JSON.stringify({
          url: Url,
        })
      });
      const json = await response.json();
      console.log(json);
      seturldata({
        title: json.title,
        description: json.description,
        image: json.image,
        price: json.price,
        rating: json.rating,
        reviews_count: json.review
      })

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
      <Modal />
      <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white ">
        <div className="container-fluid ">
          <a className="navbar-brand h3 text-white" href="#">URL Scraping</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item ">
                <a className="nav-link text-white " aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">About</a>
              </li>
            </ul>
            <div className='d-flex justify-content-between align-items-center
' style={{
                width: '100px'
              }}>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={
                  toggleMode
                } />
                <label className="form-check-label" for="flexSwitchCheckChecked"></label>
              </div>
              <div>
                <button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="hello">
                  <i className="fa-solid fa-user fa-2xl" style={{
                    cursor: 'pointer'
                  }}></i>
                </button>

              </div>

            </div>
          </div>
        </div>
      </nav>

      <div className="container my-3">
        <form>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className={`form-label ${mode === "light" ? "text-dark" : "text-white"}`}>ENTER THE URL</label>
            <input type="email" className="form-control border border-dark shadow p-3  bg-body rounded" id="exampleInputEmail1" aria-describedby="emailHelp" value={Url} onChange={onchange} />

          </div>
          <button type="submit" onClick={
            submit
          } className="btn btn-primary">Submit</button>
        </form>
      </div>
      {
        urldata.price && <div className="card mb-3 container" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={
                urldata.image
              } className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Title:{urldata.title}</h5>

                <p className="card-text">Descrition:{urldata.description}</p>

                <p className="card-text">Price:{urldata.price}</p>

                <p className="card-text">Rating:{urldata.rating ? urldata.rating : "no rating"}/5.0<i className="fa-solid fa-star"></i></p>

                <p className="card-text">Reviews:{urldata.reviews_count.slice(0, 30)}</p>

              </div>
            </div>
          </div>
        </div>
      }


    </>
  );
}

export default App;
