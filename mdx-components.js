export function useMDXComponents(components) {
  return {
    ...components, p:paragraph, h2:subhead, h3:section, ul:list, img:image, a:link, blockquote:quote
  }
}
    
const paragraph =(stuff)=> <p {...stuff} className="blog-p" /> 
    
const subhead =(stuff) => <h2 {...stuff} className="blog-subhead" />
    
const section =(stuff) => <h3 {...stuff} className="blog-section" />
    
const list =(stuff) => <ul {...stuff} className="blog-list" />

const image = (stuff) => <img {...stuff} className="blog-img" />
    
const link = (stuff) => <a {...stuff} className="blog-link" />

const quote = (stuff) => <blockquote {...stuff} className="blog-quote" />