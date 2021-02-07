import axios from "axios";

const IndexPage = () => {
  return (
    <p>
      <input
        type="file"
        onChange={(e) => {
          // https://web.dev/read-files/
          if (!e.target || !e.target.files) return;
          const file = e.target.files[0];

          console.log(file.type);
          if (file.type !== "text/html") {
            return;
          }
          const reader = new FileReader();
          reader.addEventListener("load", (event) => {
            console.log(event.target?.result);
            const content = event.target?.result;
            axios.post("/api/pages", {
              content,
              name: file.name,
            });
          });
          reader.readAsText(file, "utf-8");
        }}
      />
    </p>
  );
};

export default IndexPage;
