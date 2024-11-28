import React from 'react';
import '/src/Styling/FilterTutor.css'; // Optional: for component-specific styling

// IMPORTING PICTURES
import photo1 from '../assets/26.png';
import photo2 from '../assets/21.png';
import photo3 from '../assets/22.png';
import photo4 from '../assets/23.png';
import photo5 from '../assets/24.png';
import photo6 from '../assets/25.png';


const FilterTutor = () => {
    return (
        <>
            <div id="nav-placeholder"></div>

            <div className="content">
            <div className="search">
                <button type="button" className="btn btn-primary"><h4>🔍</h4></button>
            </div>
            <div className="right">
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Day
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" aria-label="Action 1">Action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Another action">Another action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Something else here">Something else here</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Separated link">Separated link</a></li>
                    </ul>
                </div>
    
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Time
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" aria-label="Action 1">Action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Another action">Another action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Something else here">Something else here</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Separated link">Separated link</a></li>
                    </ul>
                </div>

                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Subject
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" aria-label="Action 1">Action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Another action">Another action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Something else here">Something else here</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Separated link">Separated link</a></li>
                    </ul>
                </div>

                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Price
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" aria-label="Action 1">Action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Another action">Another action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Something else here">Something else here</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Separated link">Separated link</a></li>
                    </ul>
                </div>

                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Rating
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" aria-label="Action 1">Action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Another action">Another action</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Something else here">Something else here</a></li>
                        <li><a className="dropdown-item" href="#" aria-label="Separated link">Separated link</a></li>
                    </ul>
                </div>
                <div className="reset">
                    <button type="button" className="btn btn-primary">Reset</button>
                </div>
            </div>
        </div>

        <div className="cardsGallery">
            <div className="card" style="width: 18rem;">
                <img src={photo1} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">Indu</h5>
                    <div className="star">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                  <p className="card-text">I am passionate mathematics tutor with 5+ years of experience helping students excel in algebra and calculus</p>
                  <div className="category">
                    <a href="#" className="btn btn-primary">About</a>
                    <a href="#" className="btn btn-primary">Booking</a>
                </div>
                </div>
            </div>

            <div className="card" style="width: 18rem;">
                <img src={photo2} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">Seth</h5>
                    <div className="star">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                    <p className="card-text">I am an experienced computer science tutor specializing in coding, algorithms, and software development</p>
                    <div className="category">
                        <a href="#" className="btn btn-primary">About</a>
                        <a href="#" className="btn btn-primary">Booking</a>
                    </div>
                </div>
            </div>

            <div className="card" style="width: 18rem;">
                <img src={photo3} className="card-img-top" alt="..."></img>
                <div className="card-body">
                  <h5 className="card-title">Ava</h5>
                  <div className="star">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
                  <p className="card-text">I am skilled English tutor with expertise in grammar, creative writing, and public speaking</p>
                  <div className="category">
                    <a href="#" className="btn btn-primary">About</a>
                    <a href="#" className="btn btn-primary">Booking</a>
                </div>
                </div>
            </div>

            <div className="card" style="width: 18rem;">
                <img src={photo4} className="card-img-top" alt="..."></img>
                <div className="card-body">
                  <h5 className="card-title">Kesh</h5>
                  <div className="star">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                </div>
                  <p className="card-text">I am physics enthusiast dedicated to simplifying complex concepts in mechanics and electromagnetism</p>
                  <div className="category">
                    <a href="#" className="btn btn-primary">About</a>
                    <a href="#" className="btn btn-primary">Booking</a>
                </div>
                </div>
            </div>

            <div className="card" style="width: 18rem;">
                <img src={photo5} className="card-img-top" alt="..."></img>
                <div className="card-body">
                  <h5 className="card-title">Anna</h5>
                  <div className="star">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
                  <p className="card-text">I am chemistry tutor with a focus on organic chemistry and lab techniques for academic success</p>
                  <div className="category">
                    <a href="#" className="btn btn-primary">About</a>
                    <a href="#" className="btn btn-primary">Booking</a>
                </div>
                </div>
            </div>

            <div className="card" style="width: 18rem;">
                    <img src={photo6} className="card-img-top" alt="..."></img>
                <div className="card-body">
                  <h5 className="card-title">Mia</h5>
                  <div className="star">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                </div>
                  <p className="card-text">I am professional SAT coach with a proven track record of boosting students' test scores</p>
                  <div className="category">
                    <a href="#" className="btn btn-primary">About</a>
                    <a href="#" className="btn btn-primary">Booking</a>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default FilterTutor;