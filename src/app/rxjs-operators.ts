// https://loiane.com/2017/08/angular-rxjs-imports/
import { BehaviorSubject, Subject, Observable} from 'rxjs';
// Statics
import 'rxjs/add/observable/throw';
// Observable class extensions
import { of } from 'rxjs';
// Observable operators
import { map, switchMap, catchError, mergeMap,
     filter, debounceTime, merge, combineLatest, tap, switchAll, take } from 'rxjs/operators';
