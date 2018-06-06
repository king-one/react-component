import MdLoader from '../components/MdLoader';
 export default class Fn extends MdLoader {
   constructor(componentTitle){
     super()
     this.componentTitle = componentTitle;
   }
    getDoc() {
      return require(`../docs/${this.componentTitle}.md`);
    }
  }
