import { BehaviorSubject, Observable, map } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export class Store<T> {
  state$!: Observable<T>;
  private _state$!: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
  }

  select<T>(selectorFn: any): Observable<T> {
    return this.state$.pipe(distinctUntilChanged(), map(selectorFn));
  }

  get state() {
    return this._state$.getValue();
  }

  protected setState(nextState: T): void {
    console.log('-------------------');
    console.log('previous state', this.state);

    this._state$.next(nextState);

    console.log('current state', this.state);
    console.log('-------------------');
  }
}
