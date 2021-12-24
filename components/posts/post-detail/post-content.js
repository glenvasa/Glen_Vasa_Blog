import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import Image from 'next/image'

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  // user renderers prop in ReactMarkdown to tell Next how we want to treat certain elements if found, instead of default behavior
  // by default ReactMarkdown will treat an image found as regular <img> element
  const customRenderers = {
    // img(image) {
    //     // image.alt text is already available as text in [] in md file next to image
    //     return <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300}/>
    // },
    p(paragraph) {
        const { node } = paragraph;
        // we only want to override paragraph if it is an img paragraph (in markdown images rendered inside paragraphs by default)
        if (node.children[0].tagName === 'img') {
          const image = node.children[0];

          return (
            <div className={classes.image}>
              <Image
                src={`/images/posts/${post.slug}/${image.properties.src}`}
                alt={image.alt}
                width={600}
                height={300}
              />
            </div>
          );
        }

        return <p>{paragraph.children}</p>
  }}


  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
