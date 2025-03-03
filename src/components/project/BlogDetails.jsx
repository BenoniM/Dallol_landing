import { useParams } from "react-router-dom";
import blognew from "../../assets/img/bolgnew.png";
import bloghero from "../../assets/img/herohenok.png";
import function1 from "../../assets/img/lefthenok.png";
import function2 from "../../assets/img/righthenok.png";
import Nabbar2 from "../Nabbar2";

const blogPosts = [
  {
    id: 1,
    category: "Hotel",
    title: "Tranzit Hotel",
    content:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s, is residential establishment with a sizable portion of the artist's priceless works created over the course of his lifeti..",
    author: "John Doe",
  },
  {
    id: 2,
    category: "Hotel",
    title: "Yeshowa Birhan Hotel and Mall",
    content:
      "The design shows a large, imposing hotel and business structure. The front has a large central entrance, arched windows, and a symmetrical layout, all of which are characteristics of classic architecture. A sense of elegance and grandeur is created by the building's exterior's use of warm, earthy tones.",
    author: "Sarah Smith",
  },
  {
    id: 3,
    category: "School",
    title: "School of Tomorrow",
    content:
      "This School design depicts a modern school building with a bold, contemporary aesthetic. The facade features a vibrant combination of colors, primarily white with accents of blue, yellow, and red, creating a dynamic visual appeal.",
    author: "Mike Johnson",
  },
  {
    id: 4,
    category: "Residence",
    title: "Henok T. ResidenceB+G+2+T Residence Building",
    content:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s, is residential establishment with a sizable portion of the artist's priceless works created over the course of his lifeti..",
    author: "Emily Davis",
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogPosts.find((post) => post.id === parseInt(id));

  if (!blog) {
    return <p className="text-center text-red-500">Blog post not found.</p>;
  }

  return (
    <article>
      <Nabbar2 />
      <div className="flex items-center justify-center">
        <div
          style={{ backgroundImage: `url(${bloghero})` }}
          className="h-[450px] bg-cover bg-center flex flex-col items-center justify-center max-w-[90%] mx-auto"
        >
          <h1 className="text-8xl font-bold text-white text-center">
            {blog.title}
          </h1>
          <p className="text-white w-1/2 my-2 text-center">
            The design shows a large, imposing hotel and business structure. The
            front has a large central entrance, arched windows, and a
            symmetrical layout, all of which are characteristics of classic
            architecture. A sense of elegance and grandeur is created by the
            building's exterior's use of warm, earthy tones.
          </p>
        </div>
      </div>

      <section className="flex flex-row items-center  p-5">
        <div className="flex flex-col  items-center w-1/2 h-[500px] gap-20 pt-20 p-5 border border-primary ">
          <h1 className="text-8xl font-bold">Features</h1>
          <p className="w-[66%]">
            The Hotel design, while modern and sleek, might not fully align with
            the expectations of a typical hotel. The minimalist aesthetic, while
            visually appealing, could potentially lack a warmer and more
            inviting atmosphere required in hospitality spaces.
          </p>
        </div>
        <img src={blognew} alt="" className="w-1/2" />
      </section>

      <section>
        <div className="flex flex-row items-center justify-between p-5">
          <h1 className="text-8xl font-bold">Function</h1>
          <p className="w-[55%]">
            The Hotel design, while modern and sleek, might not fully align with
            the expectations of a typical hotel. The minimalist aesthetic, while
            visually appealing, could potentially lack a warmer and more
            inviting atmosphere required in hospitality spaces.
          </p>
        </div>

        <div className="flex flex-row items-center justify-center p-5 mx-auto w-[85%] gap-10">
          {/* Ensure both images take equal width and maintain aspect ratio */}
          <img
            src={function1}
            alt=""
            className="w-1/2 h-[500px] object-cover rounded-lg"
          />
          <img
            src={function2}
            alt=""
            className="w-1/2 h-[500px] object-cover rounded-lg"
          />
        </div>
      </section>
    </article>
  );
};

export default BlogDetails;
