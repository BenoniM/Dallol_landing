import { useState } from "react";
import blognew from "../../assets/img/bolgnew.png";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    category: "Hotel",
    title: "Tranzit Hotel",
    content:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s, is residential establishment with a sizable portion of the artist's priceless works created over the course of his lifeti..",
    author: "John Doe",
    link: "/blogdetails",
  },
  {
    category: "Hotel",
    title: "Yeshowa Birhan Hotel and Mall",
    content:
      "The design shows a large, imposing hotel and business structure. The front has a large central entrance, arched windows, and a symmetrical layout, all of which are characteristics of classic architecture. A sense of elegance and grandeur is created by the building's exterior's use of warm, earthy tones.",
    author: "Sarah Smith",
    link: "/hotelmall",
  },
  {
    category: "School",
    title: "School of Tomorrow",
    content:
      "This School design depicts a modern school building with a bold, contemporary aesthetic. The facade features a vibrant combination of colors, primarily white with accents of blue, yellow, and red, creating a dynamic visual appeal...",
    author: "Mike Johnson",
    link: "/schooldetails",
  },
  {
    category: "Residence",
    title: "Henok T. Residence B+G+2+T Residence Building",
    content:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s, is residential establishment with a sizable portion of the artist's priceless works created over the course of his lifeti..",
    author: "Emily Davis",
    link: "/henok-t-residence",
  },
];

const BlogPost = () => {
  const [activeTab, setActiveTab] = useState("All Projects");
  const navigate = useNavigate();

  const handleReadMore = (link) => {
    navigate(link);
  };

  const filteredBlogs =
    activeTab === "All Projects"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeTab);

  return (
    <article className="relative min-h-screen p-10">
      {/* Dropdown Filter */}
      <div className="absolute left-10 top-5">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white text-black font-semibold"
        >
          {["All Projects", "Hotel", "School", "Residence"].map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>

      <section className="p-10">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <div
              key={blog.title}
              className={`flex flex-col md:flex-row items-center gap-10 mb-10 pb-5 ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <img
                src={blognew}
                alt="Blog"
                className="w-full md:w-1/2 rounded-lg"
              />

              <div className="flex flex-col gap-5 w-full md:w-1/2">
                <h2 className="font-semibold text-4xl">{blog.title}</h2>
                <p>{blog.content}</p>

                <div className="flex items-center">
                  <button
                    onClick={() => handleReadMore(blog.link)}
                    className="bg-primary text-white flex items-center gap-2 px-5 py-2 rounded-full"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blog posts available.</p>
        )}
      </section>
    </article>
  );
};

export default BlogPost;
