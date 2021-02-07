import axios from "axios";

const IndexPage = () => {
  return (
    <p>
      Hello World
      <button
        onClick={async () => {
          const res = await axios.post("/api/pages", {
            data: "hoge",
          });
          console.log(res);
        }}
      >
        Create
      </button>
    </p>
  );
};

export default IndexPage;
