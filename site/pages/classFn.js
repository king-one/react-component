import MdLoader from '../components/MdLoader';
const Fn = (v) => {
  const a = class demo extends MdLoader {
    getDoc() {
      return require(`../docs/${v}.md`)
    }
  }
  return {
    "default": a
  }
}
export default Fn;
