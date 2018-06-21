import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params } from '@angular/router';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams };
  }
}

export class Utils {

    /**
   * Removes invalid/empty data from DTO
   *
   * @static
   * @param {Array<any>} [records]
   * @param {number} [size]
   * @returns
   * @memberof SelectByChunk
   */
  public static chunkBy(records: Array<any>, size: number) {
    const result = [];
    if (!records) { return result; }
    const length = records.length;
    let cumCount = 0;
    for (let _i = size; _i < length; _i += size) {
      cumCount += 4;
      const item = records.splice(0, _i);
      result.push(item);
      if (cumCount > length) {
        break;
      }
      _i -= size;
    }
    return result;
  }

  /**
   * Removes invalid/empty data from DTO
   *
   * @static
   * @param {any} [actualData={}]
   * @returns
   * @memberof SearchService
   */
  public static sanitizeData(actualData = {}): any {
    const keys = Object.keys(actualData);

    if (!keys.length) { return actualData; }

    keys.forEach(key => {
      const filterVal = actualData[key];
      const typeOfFilterVal = Object.prototype.toString.call(filterVal).match(/\s(:?\w+)/)[1];

      if (
        [null, undefined, ''].indexOf(filterVal) > -1 ||
        (typeOfFilterVal === 'Array' && !filterVal.length) ||
        (typeOfFilterVal === 'Object' && !Object.keys(filterVal).length)
      ) {
        delete actualData[key];
      }

      if (typeOfFilterVal === 'Object' && Object.keys(filterVal).length) {
        actualData[key] = this.sanitizeData(filterVal);
      }
    });

    return { ...actualData };
  }
  public jscssfileExists(filename, filetype) {
    const targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none';
    // determine element type to create nodelist from
    const targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none';
    // determine corresponding attribute to test for
    const allsuspects = document.getElementsByTagName(targetelement);
    for (let i = allsuspects.length; i >= 0; i--) { // search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null
        && allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) { return true; }
    }
    return false;
  }

  public removejscssfile(filename, filetype) {
    const targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none';
    // determine element type to create nodelist from
    const targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none';
    // determine corresponding attribute to test for
    const allsuspects = document.getElementsByTagName(targetelement);
    for (let i = allsuspects.length; i >= 0; i--) {
      // search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null
        && allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
        allsuspects[i].parentNode.removeChild(allsuspects[i]);
        // remove element by calling parentNode.removeChild()
      }
    }
  }

  // removejscssfile("somescript.js", "js") //remove all occurences of "somescript.js" on page
  // removejscssfile("somestyle.css", "css") //remove all occurences "somestyle.css" on page

  public createjscssfile(filename, filetype) {
    let fileref;
    if (filetype === 'js') { // if filename is a external JavaScript file
      fileref = document.createElement('script');
      fileref.setAttribute('type', 'text/javascript');
      fileref.setAttribute('src', filename);
    } else if (filetype === 'css') { // if filename is an external CSS file
      fileref = document.createElement('link');
      fileref.setAttribute('rel', 'stylesheet');
      fileref.setAttribute('type', 'text/css');
      fileref.setAttribute('href', filename);
    }
    return fileref;
  }

  public replacejscssfile(oldfilename, newfilename, filetype) {
    const targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none';
    // determine element type to create nodelist using
    const targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none';
    // determine corresponding attribute to test for
    const allsuspects = document.getElementsByTagName(targetelement);
    for (let i = allsuspects.length; i >= 0; i--) { // search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)
        != null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) !== -1) {
        const newelement = this.createjscssfile(newfilename, filetype);
        allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
      }
    }
  }

  public loadScript(url, crossOrigin = null, integrity = null) {
    if (this.jscssfileExists(url, 'js')) { return; }
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    if (crossOrigin) {
      node.crossOrigin = crossOrigin;
      node.integrity = integrity;
    }
    document.getElementsByTagName('footer')[0].appendChild(node);
  }


  public loadStyle(url, id = null, integrity = null) {
    if (this.jscssfileExists(url, 'css')) { return; }
    console.log('preparing to load...');
    const node = document.createElement('link');
    node.href = url;
    node.rel = 'stylesheet';
    if (integrity) {
      node.integrity = integrity;
    }
    if (id) {
      node.id = id;
    }
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  // replacejscssfile("oldscript.js", "newscript.js", "js") //Replace all occurences of "oldscript.js" with "newscript.js"
  // replacejscssfile("oldstyle.css", "newstyle", "css") //Replace all occurences "oldstyle.css" with "newstyle.css"

  public flatten<U>(source: U[][]): U[] {
    return (<U[]>[]).concat(...source);
  }
  public update<U extends V, V>(old: U, changes: V): U {
    const result = Object.create(Object.getPrototypeOf(old));
    for (const key of Object.keys(old)) {
      result[key] = (<any>old)[key];
    }
    for (const key of Object.keys(changes)) {
      result[key] = (<any>changes)[key];
    }
    return result;
  }

  public randomInt(min: number, max: number) {
    return min + Math.floor(Math.round(
      Math.random() * (max - min + 1)
    ));
  }
  public chance(x: number) {
    return Math.random() < x;
  }


}
