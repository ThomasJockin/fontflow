import About from './about.mdx'
import remark from 'remark';
import html from 'remark-html';
 
export default function Page() {
  return (
  <div>
      <nav><a href="/Thesis.pdf">MFA Thesis <img src="/download-icon.svg" alt="download" className="icon" /></a> <a href="../">Try Font Flow <img src="/explore-icon.svg" alt="explore" className="icon" /></a></nav>
      <About />
    </div>
      ) 
}