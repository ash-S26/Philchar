import React, { useEffect, useState } from "react";
import "./css/animate.css";
import "./css/bootstrap.css";
import "./css/superfish.css";
import "./css/style.css";
import Footer from "../../Components/Footer/Footer";
import bc1 from "./images/cover_bg_1.jpg";
import bc2 from "./images/cover_bg_2.jpg";
import bc3 from "./images/cover_bg_3.jpg";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import Count from "../../Components/Counter/Count";

const Home = () => {
  const [statistic, setstatistic] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getstats() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}homepagedata`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      const { data } = await response.json();
      setstatistic(data.details);
    }

    setIsLoading(true);
    getstats();
    console.log(statistic);

    setIsLoading(false);
    console.log(statistic);
  }, []);

  if (isloading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

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
            <span>
              "ALONE WE CAN DO SO LITTLE, TOGETHER WE CAN DO SO MUCH."
            </span>
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
                The inception of the PhilChar platform was driven by a shared
                vision to bridge the gap between NGOs and philanthropists,
                creating a powerful ecosystem for impactful collaboration and
                sustainable social change. The founders recognized the need for
                a centralized platform that would empower donors to easily
                discover and support NGOs working in their areas of interest.
                Fuelled by a passion for philanthropy and technology, the team
                embarked on a journey to develop an innovative solution that
                leverages the latest advancements in web development, AI, and
                secure payment gateways. Through relentless dedication and a
                deep commitment to social welfare, the PhilChar platform was
                born, providing a seamless and efficient means for donors to
                connect with NGOs, contribute funds, and collectively make a
                difference in the lives of individuals and communities around
                the world.
              </p>
            </div>
          </div>
          <div class="row row-bottom-padded-md">
            <div class="col-md-12 text-center animate-box">
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    "https://media.istockphoto.com/id/1344903849/photo/paper-people-chain-with-hearts-teamwork-and-love-concept.jpg?s=612x612&w=0&k=20&c=GOdcg8KptYmQa6ETVrHBZe0c8aIrxv5Vv_zl3aZ8fr4="
                  }
                  alt="Free HTML5 Bootstrap Template"
                  class="img-responsive"
                  style={{
                    borderRadius: "10px",
                    height: "80%",
                    width: "80%",
                  }}
                />
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="feature-text">
                <h3 style={{ color: "white" }}>Love</h3>
                <p>
                  In a world that often seems divided and chaotic, love remains
                  a beacon of hope. It reminds us of our shared humanity and the
                  inherent goodness that resides within each of us. Love has the
                  power to uplift, to heal wounds, and to create a more
                  compassionate and inclusive society.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-text">
                <h3 style={{ color: "white" }}>Compassion</h3>
                <p>
                  Compassion is a transformative force that has the ability to
                  heal wounds, bridge divides, and foster a sense of belonging.
                  It challenges us to step outside of our comfort zones, embrace
                  our shared humanity, and connect with others in meaningful and
                  authentic ways.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-text">
                <h3 style={{ color: "white" }}>Charity</h3>
                <p>
                  At its core, charity is a reflection of our shared humanity.
                  It recognizes that we are all interconnected and that by
                  extending a helping hand to others, we can create a more
                  compassionate and inclusive society.
                </p>
              </div>
            </div>
          </div>
          <br />
          <div class="col-md-6 text-center animate-box">
            <p>
              <img
                src={bc2}
                alt="Free HTML5 Bootstrap Template"
                class="img-responsive"
                style={{ borderRadius: "10px" }}
              />
            </p>
          </div>
          <div class="col-md-6 text-center animate-box">
            <p>
              <img
                src={bc3}
                alt="Free HTML5 Bootstrap Template"
                class="img-responsive"
                style={{ borderRadius: "10px" }}
              />
            </p>
          </div>
        </div>
        <br />
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            fontSize: "30px",
            fontWeight: "20px",
          }}
        >
          Contribute To Any
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST79jPqUU27p4YlTtorS-vStUWPLihluAIlINJCmeZkDuZRWkfJs0VYby9syUqEdKMAhU&usqp=CAU"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              margin: "10px",
            }}
          ></img>

          <img
            src="https://img.freepik.com/free-photo/book-with-green-board-background_1150-3836.jpg"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              margin: "10px",
            }}
          ></img>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw5jBC6TMMLsM8mYYj7X7hnjxoVpg6glvpqA&usqp=CAU"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              margin: "10px",
            }}
          ></img>

          <img
            src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              margin: "10px",
            }}
          ></img>

          <img
            src="https://img.freepik.com/free-photo/medium-shot-smiley-kids-posing-together_23-2149073581.jpg"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              margin: "10px",
            }}
          ></img>
        </div>
        <br />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            fontSize: "30px",
            fontWeight: "20px",
          }}
        >
          Join Our Community
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            padding: "5%",
            paddingTop: "0px",
          }}
        >
          <Count
            endCount={statistic ? statistic.totalngos : 0}
            text={"Registered NGOs"}
            src={
              "https://assets.vakilsearch.com/live-images/ngo-registration.jpg.jpg"
            }
          />
          <Count
            endCount={statistic ? statistic.totalphils : 0}
            text={"Total Philantrophist"}
            src={
              "https://cdnwp.tonyrobbins.com/wp-content/uploads/2018/08/jk-rowling-philanthropist-550x368.jpg"
            }
          />
          <Count
            endCount={statistic ? statistic.totalstate : 0}
            text={"Our Spread Across States"}
            src={
              "https://thumbs.dreamstime.com/b/cute-earth-character-waving-hand-cartoon-mascot-globe-personage-save-planet-concept-isolated-vector-illustration-177087114.jpg"
            }
          />
          <Count
            endCount={statistic ? statistic.totaldonation : 0}
            text={"Total Donation"}
            src={
              "https://img.freepik.com/free-vector/people-carrying-donation-charity-related-icons_53876-43091.jpg"
            }
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
