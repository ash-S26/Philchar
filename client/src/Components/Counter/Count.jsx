import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const Counter = ({ endCount, text, src }) => {
  const countUpRef = useRef(null);
  const [startCountUp, setStartCountUp] = useState(false);

  useEffect(() => {
    if (countUpRef.current && startCountUp) {
      countUpRef.current.start();
    }
  }, [startCountUp]);

  useEffect(() => {
    setStartCountUp(true);
  }, []);

  return (
    <div
      class="card"
      style={{
        width: "23rem",
        borderRadius: "20px",
        backgroundColor: "#101010",
        margin: "20px",
        color: "white",
      }}
    >
      <div
        class="card-body"
        style={{ textAlign: "center", color: "black", marginTop: "0px" }}
      >
        <img
          style={{ height: "200px", width: "200px", borderRadius: "50%" }}
          src={src}
        />
        <br />
        <br />
        <h2 class="card-title" style={{ color: "white" }}>
          {text}
        </h2>
        <CountUp
          ref={countUpRef}
          end={endCount}
          duration={2.75}
          separator=" "
          decimal=","
          prefix=""
          suffix=""
          style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}
          onMount={() => setStartCountUp(true)}
          enableScrollSpy={true}
        />
      </div>
    </div>
  );
};

export default Counter;
