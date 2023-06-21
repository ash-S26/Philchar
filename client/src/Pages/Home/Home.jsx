import React from "react";
import "./css/animate.css";
import "./css/bootstrap.css";
import "./css/superfish.css";
import "./css/style.css";
import bc1 from "./images/cover_bg_1.jpg";
import bc2 from "./images/cover_bg_2.jpg";
import bc3 from "./images/cover_bg_3.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div class="fh5co-hero">
        <div class="fh5co-overlay"></div>
        <div
          class="fh5co-cover text-center"
          data-stellar-background-ratio="0.5"
          style={{ backgroundImage: `url(${bc1})` }}
        >
          <div class="desc animate-box">
            <h2>
              We Are <strong>Non-profit</strong>
            </h2>
            <span>DONATE FOR THE POOR CHILDREN</span>
            <span>
              <Link to={"/ngos"} class="btn btn-primary btn-lg">
                Donate Now
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div id="fh5co-feature-product" class="fh5co-section-gray">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center heading-section">
              <h3>How we started.</h3>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          </div>

          <div class="row row-bottom-padded-md">
            <div class="col-md-12 text-center animate-box">
              <p>
                <img
                  src={bc1}
                  alt="Free HTML5 Bootstrap Template"
                  class="img-responsive"
                />
              </p>
            </div>
            <div class="col-md-6 text-center animate-box">
              <p>
                <img
                  src={bc2}
                  alt="Free HTML5 Bootstrap Template"
                  class="img-responsive"
                />
              </p>
            </div>
            <div class="col-md-6 text-center animate-box">
              <p>
                <img
                  src={bc3}
                  alt="Free HTML5 Bootstrap Template"
                  class="img-responsive"
                />
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="feature-text">
                <h3>Love</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-text">
                <h3>Compassion</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-text">
                <h3>Charity</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
